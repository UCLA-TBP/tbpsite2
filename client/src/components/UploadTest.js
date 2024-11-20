import React, { useState } from "react";
import axios from "axios";
import {
	Button,
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Snackbar,
	Grid,
	Typography,
} from "@mui/material";
import SubmittedTests from "./SubmittedTests";
import { subjects, testTypes, testNums, quarters } from "../utils/TestUtils";
import _ from "lodash";

function UploadTest({ candidate, setCandidate }) {
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [loadingTest, setLoadingTest] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		setShowSnackbar(false);
	};

	const [subject, setSubject] = useState("");
	function handleSubjectChange(event) {
		setSubject(event.target.value);
	}

	const [professor, setProfessor] = useState("");
	function handleProfessorChange(event) {
		setProfessor(event.target.value);
	}

	const [classNumber, setClassNumber] = useState("");
	function handleClassNumberChange(event) {
		setClassNumber(event.target.value);
	}

	const [testType, setTestType] = useState("");
	function handleTestTypeChange(event) {
		setTestType(event.target.value);
	}

	const [testNum, setTestNum] = useState("");
	function handleTestNumChange(event) {
		setTestNum(event.target.value);
	}

	const [term, setTerm] = useState({ quarter: "", year: -1 });

	function handleUpload(event) {
		setLoadingTest(true);
		event.preventDefault(); // prevent default form submission behavior

		// Get the file input element and the selected PDF file
		const fileInput = document.querySelector('input[name="pdf"]');
		const file = fileInput.files[0];
		if (!file) {
			setSnackbarMessage("Please select a PDF");
			setShowSnackbar(true);
			setLoadingTest(false);
			return;
		}
		if (file.size >= 8 * 1024 * 1024) {
			setSnackbarMessage("PDF too big! PDFs are limited to 8MB");
			setShowSnackbar(true);
			setLoadingTest(false);
			return;
		}
		if (
			!subject ||
			!professor ||
			!classNumber ||
			!testNum ||
			!testType ||
			!term.quarter ||
			!term.year
		) {
			setSnackbarMessage("Please fill out all inputs");
			setShowSnackbar(true);
			setLoadingTest(false);
			return;
		}
		if (term.year.length !== 4) {
			setSnackbarMessage("Please enter year in YYYY format, e.g. 2023");
			setShowSnackbar(true);
			setLoadingTest(false);
			return;
		}
		axios
			.get("/api/user/get-user/" + candidate._id)
			.then((response) => {
				const user = response.data; // get the user object from the response

				// Create a new FormData object to send the file data and user reference to the server
				const formData = new FormData();
				formData.append("pdf", file);
				formData.append("userRef", JSON.stringify(user)); // pass the user object as a JSON string
				formData.append("subject", subject);
				formData.append("professor", _.startCase(professor));
				formData.append("classNumber", classNumber.toUpperCase());
				formData.append("testType", testType);
				formData.append("testNum", testNum);
				formData.append("termQuarter", term.quarter);
				formData.append("termYear", term.year);

				// Send a POST request to the server with the form data using Axios
				axios
					.post("/api/pdf/upload", formData)
					.then((response) => {
						// This might need to be of type mongoose.Schema.Types.ObjectId
						const testId = response.data.pdfId;

						const updatedCandidate = {
							...candidate,
							submittedTests: [...candidate.submittedTests, testId],
						};
						// Associate the newly uploaded PDF's id with the current user
						axios
							.put("/api/user/update-user/" + candidate._id, updatedCandidate)
							.then((res) => {
								setCandidate(updatedCandidate);
							})
							.catch((err) => {
								console.log(err);
							});

						setSnackbarMessage("Test uploaded successfully!");
						setShowSnackbar(true);
						setLoadingTest(false);
					})
					.catch((error) => {
						setLoadingTest(false);
						console.error(error);
						setSnackbarMessage("Upload failed!");
						setShowSnackbar(true);
					});
			})
			.catch((error) => {
				setLoadingTest(false);
				console.error(error);
				setSnackbarMessage("Upload failed!");
				setShowSnackbar(true);
			});
	}

	return (
		<Grid
			container
			spacing={{ xs: 1, md: 2 }}
			rowSpacing={1}
			pt={2}
			sx={
				{
					// width: { xs: "100%", sm: "75%", md: "65%", lg: "55%" },
				}
			}
		>
			<Grid item xs={4}>
				<FormControl
					sx={{
						minWidth: "100%",
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: (theme) => theme.palette.custom2.main,
						},
					}}
					size="small"
				>
					<InputLabel
						id="subject-select-label"
						sx={{ color: (theme) => theme.palette.secondary.main }}
					>
						Subject
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={subject}
						label="Subject"
						onChange={handleSubjectChange}
						sx={{
							color: (theme) => theme.palette.primary.main,
							borderColor: (theme) => theme.palette.custom2.main,
						}}
					>
						{subjects.map((subjectName) => (
							<MenuItem key={subjectName} value={subjectName}>
								{subjectName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={4}>
				<TextField
					id="outlined-input"
					label="Class Code"
					size="small"
					defaultValue=""
					onChange={handleClassNumberChange}
					InputProps={{ placeholder: "e.g. 35L for CS 35L" }}
					sx={{
						"& .MuiInputLabel-root": {
							color: (theme) => theme.palette.secondary.main,
						},
						"& input": {
							color: (theme) => theme.palette.primary.main,
						},
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: (theme) => theme.palette.custom2.main,
						},
						minWidth: "100%",
					}}
				/>
			</Grid>

			<Grid item xs={4}>
				<TextField
					id="outlined-input"
					label="Professor"
					size="small"
					defaultValue=""
					onChange={handleProfessorChange}
					InputProps={{}}
					sx={{
						"& .MuiInputLabel-root": {
							color: (theme) => theme.palette.secondary.main,
						},
						"& input": {
							color: (theme) => theme.palette.primary.main,
						},
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: (theme) => theme.palette.custom2.main,
						},
						paddingBottom: "10px",
						minWidth: "100%",
					}}
				/>
			</Grid>

			<Grid item xs={4}>
				<FormControl
					sx={{
						minWidth: "100%",
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: (theme) => theme.palette.custom2.main,
						},
					}}
					size="small"
				>
					<InputLabel
						id="test-type-select-label"
						sx={{ color: (theme) => theme.palette.secondary.main }}
					>
						Type
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={testType}
						label="testType"
						onChange={handleTestTypeChange}
						sx={{
							color: (theme) => theme.palette.primary.main,
							borderColor: (theme) => theme.palette.custom2.main,
						}}
					>
						{testTypes.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={4}>
				<FormControl
					sx={{
						minWidth: "100%",
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: (theme) => theme.palette.custom2.main,
						},
					}}
					size="small"
				>
					<InputLabel
						id="test-num-select-label"
						sx={{ color: (theme) => theme.palette.secondary.main }}
					>
						Number
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={testNum}
						label="testNum"
						onChange={handleTestNumChange}
						sx={{
							color: (theme) => theme.palette.primary.main,
							borderColor: (theme) => theme.palette.custom2.main,
						}}
					>
						{testNums.map((num) => (
							<MenuItem key={num} value={num}>
								{num}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{/* )} */}
			</Grid>

			<Grid item xs={4} />

			<Grid item xs={4} mt={1}>
				<FormControl
					sx={{
						minWidth: "100%",
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: (theme) => theme.palette.custom2.main,
						},
					}}
					size="small"
				>
					<InputLabel
						id="quarter-select-label"
						sx={{ color: (theme) => theme.palette.secondary.main }}
					>
						Quarter
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={term.quarter}
						label="Quarter"
						onChange={(e) => {
							setTerm({ ...term, quarter: e.target.value });
						}}
						sx={{
							color: (theme) => theme.palette.primary.main,
							borderColor: (theme) => theme.palette.custom2.main,
						}}
					>
						{quarters.map((quarter) => (
							<MenuItem key={quarter} value={quarter}>
								{quarter}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={4} mt={1}>
				<TextField
					id="outlined-input"
					label="Year"
					size="small"
					defaultValue=""
					onChange={(e) => setTerm({ ...term, year: e.target.value })}
					InputProps={{ placeholder: "YYYY" }}
					sx={{
						"& .MuiInputLabel-root": {
							color: (theme) => theme.palette.secondary.main,
						},
						"& input": {
							color: (theme) => theme.palette.primary.main,
						},
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							borderColor: (theme) => theme.palette.custom2.main,
						},
						paddingBottom: "10px",
						minWidth: "100%",
					}}
				/>
			</Grid>

			<Grid item xs={4} />

			<Grid item xs={4} md={3} lg={2}>
				<Typography sx={{ fontSize: "1rem" }} variant="p" color="secondary">
					Select PDF:
				</Typography>
			</Grid>

			<Grid item xs={8} md={9} lg={10}>
				<input
					type="file"
					name="pdf"
					accept="application/pdf"
					style={{ color: "#fff", marginBottom: "1rem" }}
				/>
				<br />
			</Grid>

			<Grid item xs={12} pt={0}>
				<Button
					variant="contained"
					size="small"
					color="secondary"
					onClick={handleUpload}
				>
					{loadingTest ? (
						<CircularProgress
							size="1.4rem"
							sx={{ color: "#000", marginLeft: "2rem", marginRight: "2rem" }}
						/>
					) : (
						"Submit Test"
					)}
				</Button>
			</Grid>

			<Grid
				item
				xs={12}
				width="100%"
				mt={2}
				maxHeight={300}
				style={{ overflowY: "scroll", overflowX: "auto" }}
			>
				<SubmittedTests candidate={candidate}></SubmittedTests>
			</Grid>

			<Snackbar
				open={showSnackbar}
				autoHideDuration={4000}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				onClose={handleSnackbarClose}
				message={snackbarMessage}
				sx={{
					"& .MuiSnackbarContent-root": {
						color: "black", //your custom color here
						backgroundColor: (theme) => theme.palette.secondary.main, //your custom color here
					},
				}}
			/>
		</Grid>
	);
}

export default UploadTest;
