// App.tsx or App.jsx
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  TextField,
  Box,
  Modal,
  Fade,
} from "@mui/material";
import Confetti from "react-confetti"; // You'll need to install this: npm install react-confetti

function App() {
  const [names, setNames] = useState([
    { name: "Brandon", probability: 100 },
    { name: "Camille", probability: 100 },
    { name: "Ho Sang", probability: 100 },
    { name: "Jonas", probability: 100 },
    { name: "Jason", probability: 100 },
    { name: "Jon", probability: 100 },
    { name: "Chin Kuan", probability: 100 },
    { name: "Yun Chi", probability: 100 },
    { name: "Chuen", probability: 100 },
    { name: "Aliff", probability: 100 },
    { name: "Prince", probability: 100 },
    { name: "Raymond", probability: 100 },
    { name: "Dasuki", probability: 1 },
    { name: "Syahirah", probability: 100 },
    { name: "Suhaimi", probability: 100 },
    { name: "Shaun", probability: 100 },
  ]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [newName, setNewName] = useState("");
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const colors = ["#FF4136", "#0074D9", "#2ECC40", "#FFDC00"]; // Red, Blue, Green, Yellow

  // Add useEffect for continuous slow rotation
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isSpinning) {
        setRotation((prev) => (prev + 0.2) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpinning]);

  // Add keyboard handler to the useEffect
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        spinWheel();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowModal(false);

    // First, calculate the winning index based on probabilities
    const randomValue = Math.random() * totalSegments;
    let currentSegment = 0;
    let winningIndex = 0;

    for (let i = 0; i < names.length; i++) {
      currentSegment += names[i].probability;
      if (currentSegment > randomValue) {
        winningIndex = i;
        break;
      }
    }

    // Calculate the rotation needed to land on the winning segment
    const previousSegments = names
      .slice(0, winningIndex)
      .reduce((sum, n) => sum + n.probability, 0);
    const segmentDegrees =
      (names[winningIndex].probability / totalSegments) * 360;
    const targetRotation = -(
      (previousSegments / totalSegments) * 360 +
      segmentDegrees / 2
    );

    // Add extra rotations and adjust to ensure it spins multiple times
    const extraSpins = 5; // Number of complete rotations
    const newRotation = targetRotation - 360 * extraSpins;

    setRotation(newRotation);
    setWinner(names[winningIndex].name);

    setTimeout(() => {
      setShowModal(true);
    }, 3000);
  };

  const addName = () => {
    const trimmedName = newName.trim();
    if (trimmedName && !names.some((entry) => entry.name === trimmedName)) {
      setNames([...names, { name: trimmedName, probability: 100 }]);
      setNewName("");
    } else if (names.some((entry) => entry.name === trimmedName)) {
      alert("This name is already in the list!");
    }
  };

  const removeName = (indexToRemove) => {
    setNames(names.filter((_, index) => index !== indexToRemove));
  };
  // Calculate total segments for the wheel
  const totalSegments = names.reduce(
    (sum, entry) => sum + entry.probability,
    0
  );

  return (
    <Container
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          mb: { xs: 3, sm: 6 },
          fontSize: { xs: "2rem", sm: "3rem" },
          fontWeight: "bold",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Wheel of Names
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 4 },
          alignItems: "center",
          width: "100%",
          mx: "auto",
        }}
      >
        {/* Left Side: Names List and Input */}
        <Box
          sx={{
            width: { xs: "100%", md: "auto" },
            order: { xs: 2, md: 1 },
          }}
        >
          {/* Names List */}
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              maxHeight: { xs: "200px", md: "none" },
              overflowY: { xs: "auto", md: "visible" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#666", width: "100%" }}
            >
              Registered Names
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  names.length > 8 ? "repeat(2, 1fr)" : "1fr",
                gap: 1,
                width: "100%",
              }}
            >
              {names.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 1,
                    bgcolor: `hsl(${(360 / names.length) * index}, 70%, 95%)`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => removeName(index)}
                      sx={{ minWidth: "auto", color: "#666" }}
                    >
                      ×
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Input Section */}
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              mb: 2,
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              label="Enter name"
              variant="outlined"
              size="medium"
              fullWidth
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addName();
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addName}
              fullWidth
              sx={{
                borderRadius: "8px",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              }}
            >
              Add Name
            </Button>
          </Box>
        </Box>

        {/* Center: Wheel and Spin Button */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            order: { xs: 1, md: 2 },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Wheel Container */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 3, md: 6 },
              position: "relative",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: { xs: "300px", sm: "400px", md: "600px" },
                height: { xs: "300px", sm: "400px", md: "600px" },
                position: "relative",
                maxWidth: "100%",
                aspectRatio: "1/1",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  transform: `rotate(${rotation + 90}deg)`,
                  border: "2px solid #000",
                  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                }}
              >
                {names.map((entry, index) => {
                  const previousSegments = names
                    .slice(0, index)
                    .reduce((sum, n) => sum + n.probability, 0);
                  const segmentDegrees =
                    (entry.probability / totalSegments) * 360;
                  const startAngle = (previousSegments / totalSegments) * 360;

                  return (
                    <Box
                      key={index}
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        clipPath: `polygon(50% 50%, ${
                          50 +
                          50 * Math.cos(((startAngle - 90) * Math.PI) / 180)
                        }% ${
                          50 +
                          50 * Math.sin(((startAngle - 90) * Math.PI) / 180)
                        }%, ${
                          50 +
                          50 *
                            Math.cos(
                              ((startAngle + segmentDegrees - 90) * Math.PI) /
                                180
                            )
                        }% ${
                          50 +
                          50 *
                            Math.sin(
                              ((startAngle + segmentDegrees - 90) * Math.PI) /
                                180
                            )
                        }%)`,
                        background: colors[index % colors.length],
                      }}
                    >
                      <Typography
                        sx={{
                          position: "absolute",
                          left: "44%",
                          top: "48.5%",
                          transform: `
                            rotate(${startAngle + segmentDegrees / 2}deg)
                            translateY(${
                              window.innerWidth < 600 ? "-120px" : "-240px"
                            })
                            rotate(-${startAngle + segmentDegrees / 2}deg)
                          `,
                          transformOrigin: "center bottom",
                          fontWeight: "bold",
                          fontSize: {
                            xs: names.length > 12 ? "0.6rem" : "0.8rem",
                            sm: names.length > 12 ? "0.7rem" : "0.9rem",
                            md: names.length > 12 ? "0.8rem" : "1rem",
                          },
                          textAlign: "center",
                          userSelect: "none",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: { xs: "120px", sm: "150px", md: "180px" },
                          color: "#000",
                          padding: "4px 12px",
                          borderRadius: "4px",
                          backgroundColor: "rgba(255,255,255,0.95)",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                          zIndex: 1,
                          transition: "transform 0.2s ease-in-out",
                        }}
                      >
                        {entry.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Update pointer style */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: -20,
                  transform: "translateY(-50%)",
                  width: 0,
                  height: 0,
                  borderTop: "20px solid transparent",
                  borderBottom: "20px solid transparent",
                  borderRight: "40px solid #333",
                  filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
                }}
              />
            </Box>
          </Box>

          {/* Spin Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={spinWheel}
            disabled={isSpinning}
            size="large"
            sx={{
              borderRadius: "25px",
              px: 6,
              py: 1.5,
              fontSize: "1.2rem",
              background: isSpinning
                ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                : "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              },
              "&:disabled": {
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                opacity: 0.7,
              },
            }}
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel!"}
          </Button>
        </Box>

        {/* Right Side: Remove on mobile */}
        <Box
          sx={{
            width: { xs: 0, md: "250px" },
            display: { xs: "none", md: "block" },
            order: { xs: 3, md: 3 },
          }}
        />
      </Box>

      {showModal && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={2000}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        />
      )}

      {/* Winner Modal */}
      <Modal
        open={showModal}
        onClose={() => {
          setIsSpinning(false);
          setShowModal(false);
        }}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 0 },
        }}
      >
        <Fade in={showModal}>
          <Box
            sx={{
              position: "relative",
              bgcolor: "background.paper",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              minWidth: 300,
              textAlign: "center",
              animation: "bounce 0.5s",
              "@keyframes bounce": {
                "0%": {
                  transform: "scale(0.3)",
                },
                "50%": {
                  transform: "scale(1.05)",
                },
                "70%": {
                  transform: "scale(0.9)",
                },
                "100%": {
                  transform: "scale(1)",
                },
              },
              background: "linear-gradient(135deg, #fff 0%, #f5f5f5 100%)",
              border: "3px solid #gold",
              width: { xs: "90%", sm: "auto" },
              maxWidth: "500px",
              "& h3": {
                fontSize: { xs: "1.8rem", sm: "2.5rem" },
              },
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              And the winner is...
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: "bold",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "reveal 1s",
                "@keyframes reveal": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              🎉 {winner} 🎉
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setIsSpinning(false);
                setShowModal(false);
              }}
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                borderRadius: "25px",
                px: 4,
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}

export default App;
