import React, { useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { Container } from "@mui/material";
import styled from "@emotion/styled";

const FloatingContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.custom.main,
  [theme.breakpoints.up("xs")]: {
    marginBottom: "20px",
    borderRadius: "0",
  },
  [theme.breakpoints.up("sm")]: {
    marginBottom: "100px",
    borderRadius: "12px",
  },
}));

const facultyData = [
  {
    department: "Bioengineering",
    members: [
      "Dino Di Carlo, CA Epsilon '06",
      "Daniel Kamei, CA Epsilon '95",
      "Aaron Meyer, CA Epsilon '09",
      "Jaimie Stewart, IL Zeta '13",
      "Jennifer Wilson, VA Alpha '10",
    ],
  },
  {
    department: "Chemical and Biomolecular Engineering",
    members: [
      "Carissa Eisler, CA Epsilon '10",
      "Yuzhang Li, CA Alpha '13",
      "Harold Monbouquette, CA Epsilon '82",
      "Aditya Nandy, CA Alpha '17",
      "Alissa Park, CA Epsilon '05",
      "Dante Simonetti, IN Gamma '03",
    ],
  },
  {
    department: "Civil and Environmental Engineering",
    members: [
      "Steven Margulis, CA Delta '95",
      "Regan Patterson, CA Epsilon '12",
      "Michael Stenstrom, SC Alpha '71",
      "Jonathan Stewart, CA Alpha '90",
      "John Wallace, VT Alpha '83",
    ],
  },
  {
    department: "Computer Science",
    members: [
      "Paul Eggert, TX Gamma '75",
      "Blaise Pascal-Tine, NY Theta '01",
      "J.D. Zamfirescu-Pereira, MA Beta '05",
    ],
  },
  {
    department: "Electrical and Computer Engineering",
    members: [
      "Abeer Alwan, MA Epsilon '83",
      "Robert Candler, AL Alpha '00",
      "Lara Dolecek, CA Alpha '99",
      "Warren Mori, CA Alpha '81",
      "Henry Samueli, CA Epsilon '75",
      "John Villasenor, VA Alpha '96",
      "Richard Wesel, MA Beta '89",
      "Chee-Wei Wong, CA Alpha '99",
      "CK Ken Yang, CA Gamma '92",
    ],
  },
  {
    department: "Materials Science and Engineering",
    members: [
      "Bruce Dunn, NJ Beta '70",
      "Mark Goorsky, IL Gamma '84",
      "Aaron Moment, NY Gamma '94",
    ],
  },
  {
    department: "Mechanical and Aerospace Engineering",
    members: [
      "Gregory Carman, VA Beta '81",
      "Vijay Gupta, MA Beta '90",
      "Dennis Hong, WI Alpha '94",
      "Anya Jones, NY Gamma '04",
      "Ann Karagozian, CA Epsilon '78",
      "Chang-Jin Kim, CA Epsilon '81",
      "Veronica Santos, CA Alpha '99",
    ],
  },
];

function FacultyList({ id, opacity = 1 }) {
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollSpeed = 0.75; // pixels per frame

  const duplicatedData = [...facultyData, ...facultyData];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;

    const animate = () => {
      if (scrollContainer) {
        const totalWidth = scrollContainer.scrollWidth;
        const singleSetWidth = totalWidth / 2;

        scrollPosition += scrollSpeed;

        if (scrollPosition >= singleSetWidth) {
          scrollPosition = scrollPosition - singleSetWidth;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => {
      if (scrollContainer) {
        const totalWidth = scrollContainer.scrollWidth;
        const singleSetWidth = totalWidth / 2;
        scrollPosition = Math.random() * singleSetWidth;
        scrollContainer.scrollLeft = scrollPosition;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const DepartmentTile = ({ dept, index }) => (
    <Box
      key={index}
      sx={{
        minWidth: { xs: "280px", sm: "300px", md: "320px" },
        flexShrink: 0,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "8px",
        padding: 3,
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        mb={"16px"}
        sx={{
          fontSize: "1.4rem",
          fontWeight: 600,
          color: "white",
          lineHeight: 1.3,
        }}
      >
        {dept.department}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {dept.members.map((member, memberIndex) => (
          <Typography
            key={memberIndex}
            component="div"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            {member}
          </Typography>
        ))}
      </Box>
    </Box>
  );

  return (
    <FloatingContainer
      className="section-container"
      id={id || "faculty"}
      sx={{
        opacity: opacity,
      }}
    >
      <Typography variant="h2" mb={"20px"}>
        UCLA Engineering Faculty Members
      </Typography>
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "hidden",
          overflowY: "hidden",
          pb: 2,
          mt: 2,
          scrollBehavior: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {duplicatedData.map((dept, index) => (
          <DepartmentTile key={index} dept={dept} index={index} />
        ))}
      </Box>
    </FloatingContainer>
  );
}

export default FacultyList;
