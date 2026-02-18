import React from "react";
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
      {
        name: "Dino Di Carlo, CA Epsilon '06",
        website: "https://samueli.ucla.edu/people/dino-di-carlo/",
      },
      {
        name: "Daniel Kamei, CA Epsilon '95",
        website: "https://samueli.ucla.edu/people/daniel-kamei/",
      },
      {
        name: "Aaron Meyer, CA Epsilon '09",
        website: "https://samueli.ucla.edu/people/aaron-meyer/",
      },
      {
        name: "Jaimie Stewart, IL Zeta '13",
        website: "https://samueli.ucla.edu/people/jaimie-stewart/",
      },
      {
        name: "Jennifer Wilson, VA Alpha '10",
        website: "https://samueli.ucla.edu/people/jennifer-wilson/",
      },
    ],
  },
  {
    department: "Chemical and Biomolecular Engineering",
    members: [
      {
        name: "Carissa Eisler, CA Epsilon '10",
        website: "https://samueli.ucla.edu/people/carissa-eisler/",
      },
      {
        name: "Yuzhang Li, CA Alpha '13",
        website: "https://samueli.ucla.edu/people/yuzhang-li/",
      },
      {
        name: "Harold Monbouquette, CA Epsilon '82",
        website: "https://samueli.ucla.edu/people/harold-monbouquette/",
      },
      {
        name: "Aditya Nandy, CA Alpha '17",
        website: "https://samueli.ucla.edu/people/aditya-nandy/",
      },
      {
        name: "Alissa Park, CA Epsilon '05",
        website: "https://samueli.ucla.edu/people/ah-hyung-alissa-park/",
      },
      {
        name: "Dante Simonetti, IN Gamma '03",
        website: "https://samueli.ucla.edu/people/dante-simonetti/",
      },
    ],
  },
  {
    department: "Civil and Environmental Engineering",
    members: [
      {
        name: "Steven Margulis, CA Delta '95",
        website: "https://samueli.ucla.edu/people/steven-margulis/",
      },
      {
        name: "Regan Patterson, CA Epsilon '12",
        website: "https://samueli.ucla.edu/people/regan-patterson/",
      },
      {
        name: "Michael Stenstrom, SC Alpha '71",
        website: "https://samueli.ucla.edu/people/michael-stenstrom/",
      },
      {
        name: "Jonathan Stewart, CA Alpha '90",
        website: "https://samueli.ucla.edu/people/jonathan-stewart/",
      },
      {
        name: "John Wallace, VT Alpha '83",
        website: "https://samueli.ucla.edu/people/john-wallace/",
      },
    ],
  },
  {
    department: "Computer Science",
    members: [
      {
        name: "Paul Eggert, TX Gamma '75",
        website: "https://samueli.ucla.edu/people/paul-eggert/",
      },
      {
        name: "Blaise Pascal-Tine, NY Theta '01",
        website: "https://samueli.ucla.edu/people/blaise-pascal-tine/",
      },
      {
        name: "J.D. Zamfirescu-Pereira, MA Beta '05",
        website: "https://samueli.ucla.edu/people/j-d-zamfirescu-pereira/",
      },
    ],
  },
  {
    department: "Electrical and Computer Engineering",
    members: [
      {
        name: "Abeer Alwan, MA Epsilon '83",
        website: "https://samueli.ucla.edu/people/abeer-alwan/",
      },
      {
        name: "Robert Candler, AL Alpha '00",
        website: "https://samueli.ucla.edu/people/robert-candler/",
      },
      {
        name: "Lara Dolecek, CA Alpha '99",
        website: "https://samueli.ucla.edu/people/lara-dolecek/",
      },
      {
        name: "Warren Mori, CA Alpha '81",
        website: "https://samueli.ucla.edu/people/warren-mori/",
      },
      {
        name: "Henry Samueli, CA Epsilon '75",
        website: "https://samueli.ucla.edu/people/henry-samueli/",
      },
      {
        name: "John Villasenor, VA Alpha '96",
        website: "https://samueli.ucla.edu/people/john-villasenor/",
      },
      {
        name: "Richard Wesel, MA Beta '89",
        website: "https://samueli.ucla.edu/people/richard-wesel/",
      },
      {
        name: "Chee-Wei Wong, CA Alpha '99",
        website: "https://samueli.ucla.edu/people/chee-wei-wong/",
      },
      {
        name: "CK Ken Yang, CA Gamma '92",
        website: "https://samueli.ucla.edu/people/chih-kong-yang/",
      },
    ],
  },
  {
    department: "Materials Science and Engineering",
    members: [
      {
        name: "Bruce Dunn, NJ Beta '70",
        website: "https://samueli.ucla.edu/people/bruce-dunn/",
      },
      {
        name: "Mark Goorsky, IL Gamma '84",
        website: "https://samueli.ucla.edu/people/mark-goorsky/",
      },
      {
        name: "Aaron Moment, NY Gamma '94",
        website: "https://samueli.ucla.edu/people/aaron-moment/",
      }
    ],
  },
  {
    department: "Mechanical and Aerospace Engineering",
    members: [
      {
        name: "Gregory Carman, VA Beta '81",
        website: "https://samueli.ucla.edu/people/gregory-carman/",
      },
      {
        name: "Vijay Gupta, MA Beta '90",
        website: "https://samueli.ucla.edu/people/vijay-gupta/",
      },
      {
        name: "Dennis Hong, WI Alpha '94",
        website: "https://samueli.ucla.edu/people/dennis-hong/",
      },
      {
        name: "Anya Jones, NY Gamma '04",
        website: "https://samueli.ucla.edu/people/anya-jones/",
      },
      {
        name: "Ann Karagozian, CA Epsilon '78",
        website: "https://samueli.ucla.edu/people/ann-karagozian/",
      },
      {
        name: "Chang-Jin Kim, CA Epsilon '81",
        website: "https://samueli.ucla.edu/people/chang-jin-kim/",
      },
      {
        name: "Veronica Santos, CA Alpha '99",
        website: "https://samueli.ucla.edu/people/veronica-santos/",
      },
    ],
  },
];


function FacultyList({ id, opacity = 1 }) {
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
        mb="16px"
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
            component="a"
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.85)",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            {member.name}
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
        sx={{
          display: "flex",
          gap: 4,
          overflowX: "auto",
          pb: 2,
          scrollBehavior: "smooth",
        }}
      >
        {facultyData.map((dept, index) => (
          <DepartmentTile key={index} dept={dept}/>
        ))}
      </Box>
    </FloatingContainer>
  );
}

export default FacultyList;
