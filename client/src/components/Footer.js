import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const FooterLinks = [
  { name: "Facebook", href: "https://www.facebook.com/tbp.ucla" },
  { name: "Instagram", href: "https://www.instagram.com/uclatbp" },
  { name: "TBP National", href: "https://www.tbp.org/home.cfm" },
  { name: "UCLA HSSEAS", href: "https://samueli.ucla.edu/" },
  { name: "Website Feedback", href: "https://forms.gle/y5bZUNxvtAY4Y6Ws6" },
];

function Footer() {
  return (
    <Box component="footer" id="footer" sx={{ backgroundColor: "#000", py: 4 }}>
      <Container sx={{ textAlign: "center" }}>
        <Grid container spacing={2} justifyContent="center">
          {FooterLinks.map((link) => (
            <Grid item key={link.name}>
              <Button
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                color="secondary"
                variant="outlined"
                size="small"
              >
                {link.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography variant="p" mt={3}>
          6266 Boelter Hall |{" "}
          <a href="mailto:ucla.tbp@gmail.com">ucla.tbp@gmail.com</a>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
