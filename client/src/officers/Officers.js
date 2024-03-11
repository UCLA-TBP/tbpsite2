import React from "react";
import { Box, Grid, Typography, alpha } from "@mui/material";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(position, email) {
	return { position, email };
}

const HEADSHOT_LINK =
	"https://media.licdn.com/dms/image/D5603AQH4oejoODZa1g/profile-displayphoto-shrink_800_800/0/1671194852878?e=2147483647&v=beta&t=akMT2ttozjF3arWJXFQCBZDnNa989eRIgnlu2mJE7f4";

const TESTING_HEADSHOTS = [
	{
		name: "John Doe",
		position: "President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
	{
		name: "Jane Doe",
		position: "Vice President",
		headshot: HEADSHOT_LINK,
	},
];

const rows = [
	createData(
		"President",
		<a href="mailto:uclatbp.president@gmail.com">uclatbp.president@gmail.com</a>
	),
	createData(
		"VP (Vice president)",
		<a href="mailto:uclatbp.vp@gmail.com">uclatbp.vp@gmail.com</a>
	),
	createData(
		"AO (Academic outreach)",
		<a href="mailto:uclatbp.ao@gmail.com">uclatbp.ao@gmail.com</a>
	),
	createData(
		"Corporate",
		<a href="mailto:uclatbp.corporate@gmail.com">uclatbp.corporate@gmail.com</a>
	),
	createData(
		"EMCC (Education outreach)",
		<a href="mailto:uclatbp.educoutreach@gmail.com">
			uclatbp.educoutreach@gmail.com
		</a>
	),
	createData(
		"MC (Member coordinator)",
		<a href="mailto:uclatbp.mc@gmail.com">uclatbp.mc@gmail.com</a>
	),
	createData(
		"Publicity",
		<a href="mailto:uclatbp.publicity@gmail.com">uclatbp.publicity@gmail.com</a>
	),
	createData(
		"Secretary",
		<a href="mailto:uclatbp.secretary@gmail.com">uclatbp.secretary@gmail.com</a>
	),
	createData(
		"Social",
		<a href="mailto:uclatbp.social@gmail.com">uclatbp.social@gmail.com</a>
	),
	createData(
		"Treasurer",
		<a href="mailto:uclatbp.treasurer@gmail.com">uclatbp.treasurer@gmail.com</a>
	),
	createData(
		"Tutoring",
		<a href="mailto:uclatbp.tutoring@gmail.com">uclatbp.tutoring@gmail.com</a>
	),
	createData(
		"Webmaster",
		<a href="mailto:uclatbp.webmaster@gmail.com">uclatbp.webmaster@gmail.com</a>
	),
];

function Officers() {
	return (
		<Container sx={{ paddingBottom: "100px" }}>
			<Typography variant="h2" mt={10}>
				Officers
			</Typography>

			<div>
				<Typography variant="p" mt={5}>
					For any questions or comments, feel free to email us at{" "}
					<a href="mailto:ucla.tbp@gmail.com">ucla.tbp@gmail.com</a>.
				</Typography>
				<Typography variant="p">
					Having issues with the site? Send an email to the webmasters at{" "}
					<a href="mailto:uclatbp.webmaster@gmail.com">
						uclatbp.webmaster@gmail.com
					</a>
					.
				</Typography>
				<Typography variant="p">
					You can also stop by the Tau Beta Pi tutoring room on the 6th floor of
					Boelter (Room 6266) if you want to say hi!
				</Typography>
			</div>
			<br></br>

			<Typography variant="p" mt={5}>
				Need to contact a specific officer?
			</Typography>
			<br></br>

			<TableContainer style={{ background: "#5b5b5b" }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant="highlight" style={{ fontSize: "150%" }}>
									<b>Position</b>
								</Typography>
							</TableCell>
							<TableCell align="left">
								<Typography variant="highlight" style={{ fontSize: "150%" }}>
									<b>Email</b>
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.position}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									style={{ color: "white", fontSize: "100%" }}
								>
									{row.position}
								</TableCell>
								<TableCell align="left">{row.email}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Grid
				// 4 columns, 16px of space between each item
				container
				spacing={4}
				mt={5}
			>
				{TESTING_HEADSHOTS.map((person, index) => {
					return (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Box
								sx={{
									borderRadius: "20px",
									backgroundColor: "black",
								}}
								p={1}
							>
								<img
									src={person.headshot}
									alt="headshot"
									style={{
										width: "100%",
										aspectRatio: "1/1",
										objectFit: "cover",
										borderRadius: "12px",
									}}
								/>

								<Box
									sx={
										{
											// backgroundColor: "black",
										}
									}
									p={1}
									pt={1}
								>
									<Typography
										variant="h3"
										mt={0}
										mb={0.5}
										color="primary"
										sx={{
											fontWeight: "bold",
											fontSize: "1.5rem",
										}}
									>
										{person.name}
									</Typography>

									<Typography
										variant="h6"
										color="secondary"
										sx={{
											// fontWeight: "bold",
											fontSize: "1rem",
										}}
									>
										{person.position}
									</Typography>
								</Box>
							</Box>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
}

export default Officers;
