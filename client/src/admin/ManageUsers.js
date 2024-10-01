import React, { useEffect, useState } from "react";
import {
	alpha,
	Autocomplete,
	Box,
	Button,
	Container,
	Grid,
	Snackbar,
	TextField,
	Typography,
	createFilterOptions,
} from "@mui/material";
import SubmittedTests from "../components/SubmittedTests";
import { positions } from "../permissions/PermissionsUtils";
import UploadHeadshot from "../components/UploadHeadshot.js";
import UserInfo from "../components/UserInfo.js";
import axios from "axios";
import TBPBackground from "../components/TBPBackground";
import DistinguishedActiveMemberReqs from "../components/DistinguishedActiveMemberReqs";
import {
	OfficerCommitteeSelector,
} from "../components/OfficerCommitteeHelpers";

const filterOptions = createFilterOptions({
	ignorecase: true,
});

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	useEffect(() => {
		axios
			.get("/api/user/get-non-candidates")
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSave = (e) => {
		axios
			.put("/api/user/update-user/" + selectedUser._id, selectedUser)
			.then((res) => {
				axios
					.get("/api/user/get-non-candidates")
					.then((res) => {
						setUsers(res.data);
						setSnackbarMessage("Save successful!");
						setShowSnackbar(true);
					})
					.catch((err) => {
						console.log(err);
						setSnackbarMessage("Save error!");
						setShowSnackbar(true);
					});
			})
			.catch((err) => console.log(err));
	};

	const handleDelete = (e) => {
		axios
			.put("/api/user/delete-user/" + selectedUser._id, selectedUser)
			.then((res) => {
				axios
					.get("/api/user/get-non-candidates")
					.then((res) => {
						setUsers(res.data);
						setSelectedUser(null);
						let newUsers = users.filter(
							(user) => user._id !== selectedUser._id
						);
						setUsers(newUsers);

						setSnackbarMessage("Deletion successful!");
						setShowSnackbar(true);
					})
					.catch((err) => {
						console.log(err);
						setSnackbarMessage("Deletion error!");
						setShowSnackbar(true);
					});
			})
			.catch((err) => console.log(err));
	};

	const handleSnackbarClose = (event, reason) => {
		setShowSnackbar(false);
	};

	return (
		<>
			<TBPBackground />
			<Container sx={{ paddingTop: "85px !important" }}>
				<Box
					sx={{
						backgroundColor: (theme) => alpha(theme.palette.custom.main, 0.95),
						borderRadius: "12px",
					}}
					p={5}
				>
					<Typography
						variant="h2"
						mb={3}
						color="primary"
						sx={{
							fontWeight: "bold",
						}}
					>
						Manage Users
					</Typography>
					<Typography variant="h3" color="primary" mt={3} mb={1}>
						User Name
					</Typography>
					<Autocomplete
						disablePortal
						options={users}
						getOptionLabel={(user) =>
							`${user.name?.first} ${user.name?.last}`
						}
						onChange={(e, val) => {
							setSelectedUser(val);
						}}
						value={selectedUser}
						sx={{
							backgroundColor: (theme) => theme.palette.primary.main,
							borderRadius: "0.2rem",
						}}
						filterOptions={filterOptions}
						isOptionEqualToValue={(option, value) =>
							option.email === value.email
						}
						renderInput={(params) => {
							return <TextField {...params} />;
						}}
					/>
				</Box>
				{selectedUser && (
					<Box
						mt={4}
						mb={4}
						sx={{
							backgroundColor: (theme) => theme.palette.custom.main,
							padding: "1px 40px 10px",
							borderRadius: "12px",
						}}
					>

						<Typography variant="h4" color="secondary" mt={3} mb={1}>
							Membership Status
						</Typography>
						<select
							value={selectedUser.position}
							onChange={(e) => {
								setSelectedUser({
									...selectedUser,
									position: e.target.value,
								});
							}}
						>
							{Object.values(positions).map((position) => (
								<option key={position} value={position}>
									{position}
								</option>
							))}
						</select>

						{selectedUser.position === positions.officer || selectedUser.position === positions.admin ? (
							<div>
								<Typography variant="h4" color="secondary" mt={3} mb={1}>
									Officer Committees
								</Typography>

								<OfficerCommitteeSelector
									committeeOptions={selectedUser.committees}
									selectedCandidate={selectedUser}
									setSelectedCandidate={setSelectedUser}
								/>
							</div>
						) : null}

						{selectedUser.position === positions.member ? (
							<div>
								<Typography variant="h4" color="secondary" mt={3} mb={1}>
									Distinguished Active Member Progress
								</Typography>

								<Typography
									variant="p"
									sx={{
										color: (theme) => theme.palette.primary.main,
										fontSize: "1rem",
									}}
								>
									Quarter 1
								</Typography>

								<DistinguishedActiveMemberReqs
									requirements={
										selectedUser.distinguishedActiveMember
											.quarterOneRequirements
									}
									selectedCandidate={selectedUser}
									setSelectedCandidate={setSelectedUser}
								/>

								<br />

								<Typography
									variant="p"
									sx={{
										color: (theme) => theme.palette.primary.main,
										fontSize: "1rem",
									}}
								>
									Quarter 2
								</Typography>

								<DistinguishedActiveMemberReqs
									requirements={
										selectedUser.distinguishedActiveMember
											.quarterTwoRequirements
									}
									selectedCandidate={selectedUser}
									setSelectedCandidate={setSelectedUser}
								/>
							</div>
						) : null}

						<Grid
							container
							pt={3}
							sx={{ display: "flex", justifyContent: "left" }}
						>
							<Grid item xs={12} sm={3} lg={2}>
								<Button
									color="secondary"
									variant="contained"
									onClick={handleSave}
									sx={{ width: "100%" }}
								>
									Save Changes
								</Button>
							</Grid>
						</Grid>

						<Typography variant="h4" color="secondary" mt={3} mb={1}>
							Submitted Tests
						</Typography>
						<SubmittedTests candidate={selectedUser} />

						<Typography variant="h4" color="secondary" mt={3} mb={1}>
							User Info
						</Typography>
                        <UserInfo
                            selectedUser={selectedUser}
                        />

						<Typography variant="h4" color="secondary" mt={3}>
							Upload Headshot
						</Typography>

						<UploadHeadshot
							candidate={selectedUser}
							setCandidate={setSelectedUser}
						/>

						<Grid
							container
							pt={3}
							sx={{ display: "flex", justifyContent: "left" }}
						>
							<Grid item xs={12} sm={3} lg={2} mb={2}>
								<Button
									color="secondary"
									variant="contained"
									onClick={handleDelete}
									sx={{ width: "100%" }}
								>
									Delete User
								</Button>
							</Grid>
						</Grid>
					</Box>
				)}

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
			</Container>
		</>
	);
};

export default ManageUsers;
