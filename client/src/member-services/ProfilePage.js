import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import SubmittedTests from '../components/SubmittedTests';
import { positions } from '../permissions/PermissionsUtils';
import axios from 'axios';
import _ from 'lodash';
import TBPBackground from '../components/TBPBackground';
import UploadHeadshot from "../components/UploadHeadshot.js";

const filterOptions = createFilterOptions({
    ignorecase: true,
});

function ProfilePage({
    user,
    setUser,
}) {
    const [candidates, setCandidates] = useState([]);
    let [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        axios
            .get('/api/user/get-all-users')
            .then((res) => {
                setCandidates(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSave = (e) => {
        axios
            .put('/api/user/update-user/' + selectedCandidate._id, selectedCandidate)
            .then((res) => {
                axios
                    .get('/api/user/get-all-users')
                    .then((res) => {
                        setCandidates(res.data);
                        setSnackbarMessage('Save successful!');
                        setShowSnackbar(true);
                    })
                    .catch((err) => {
                        console.log(err);
                        setSnackbarMessage('Save error!');
                        setShowSnackbar(true);
                    });
            })
            .catch((err) => console.log(err));
    };

    const handleSnackbarClose = (event, reason) => {
        setShowSnackbar(false);
    };
    selectedCandidate = user;
    return (
        <>
            <TBPBackground />
            <Container sx={{ paddingTop: '85px !important' }}>
                {selectedCandidate && (
                    <Box
                        mt={4}
                        mb={4}
                        sx={{
                            backgroundColor: (theme) => theme.palette.custom.main,
                            padding: '1px 40px 10px',
                            borderRadius: '12px',
                        }}
                    >
                        {selectedCandidate.position === positions.candidate && (
                            <>
                                <Typography variant='h4' color='secondary' mt={3} mb={1}>
                                    Candidate Requirements
                                </Typography>
                                {selectedCandidate.requirements &&
                                    Object.entries(selectedCandidate.requirements).map(
                                        ([requirement, status]) => {
                                            return (
                                                <Grid container key={requirement}>
                                                    <Grid item xs={9} md={2}>
                                                        <Typography
                                                            variant='p'
                                                            color='primary'
                                                            sm={3}
                                                            sx={{
                                                                fontSize: '1rem',
                                                                width: '15rem',
                                                            }}
                                                        >
                                                            {_.startCase(requirement)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <input
                                                            id={requirement}
                                                            type='checkbox'
                                                            checked={status}
                                                            onChange={(e) => {
                                                                setSelectedCandidate({
                                                                    ...selectedCandidate,
                                                                    requirements: {
                                                                        ...selectedCandidate.requirements,
                                                                        [e.target.id]: e.target.checked,
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            );
                                        }
                                    )}
                            </>
                        )}
                        <Typography variant='h4' color='secondary' mt={3} mb={1}>
                            Membership Status:
                        </Typography>
                        <Typography
                            variant='p'
                            mt={1}
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                                fontSize: '1rem',
                            }}
                        >
                            {selectedCandidate.position}
                        </Typography>

                        <Typography variant='h4' color='secondary' mt={3} mb={1}>
                            Tutoring Logs
                        </Typography>

                        {selectedCandidate.tutoringLog?.length ? (
                            selectedCandidate.tutoringLog.map((entry, index) => (
                                <Grid
                                    key={index}
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 15, sm: 2, md: 3 }}
                                >
                                    <Grid style={{ color: 'white' }} item xs={2}>
                                        Week: {entry.week}
                                    </Grid>
                                    <Grid style={{ color: 'white' }} item xs={2}>
                                        Hours: {entry.hours}
                                    </Grid>
                                    <Grid style={{ color: 'white' }} item xs={3}>
                                        Secret Phrase: {entry.secretPhrase}
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <Typography
                                variant='p'
                                mt={1}
                                sx={{
                                    color: (theme) => theme.palette.primary.main,
                                    fontSize: '1rem',
                                }}
                            >
                                None
                            </Typography>
                        )}
                        <Typography variant='h4' color='secondary' mt={3} mb={1}>
                            Submitted Tests
                        </Typography>
                        <SubmittedTests candidate={selectedCandidate} />

                        <Typography variant='h4' color='secondary' mt={3} mb={1}>
                            Candidate Info
                        </Typography>
                        <Typography
                            variant='p'
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                                fontSize: '1rem',
                            }}
                        >
                            Name
                        </Typography>
                        <Typography
                            variant='p'
                            mb={1}
                            sx={{
                                fontSize: '1rem',
                            }}
                        >
                            {selectedCandidate.name?.first} {selectedCandidate.name?.last}
                        </Typography>
                        <Typography
                            variant='p'
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                                fontSize: '1rem',
                            }}
                        >
                            Email
                        </Typography>
                        <Typography
                            variant='p'
                            mb={1}
                            sx={{
                                fontSize: '1rem',
                            }}
                        >
                            {selectedCandidate.email}
                        </Typography>
                        <Typography
                            variant='p'
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                                fontSize: '1rem',
                            }}
                        >
                            Major
                        </Typography>
                        <Typography
                            variant='p'
                            mb={1}
                            sx={{
                                fontSize: '1rem',
                            }}
                        >
                            {selectedCandidate.major}
                        </Typography>
                        <Typography
                            variant='p'
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                                fontSize: '1rem',
                            }}
                        >
                            Graduation Year
                        </Typography>
                        <Typography
                            variant='p'
                            mb={1}
                            sx={{
                                fontSize: '1rem',
                            }}
                        >
                            {selectedCandidate.graduationYear}
                        </Typography>
                        <Typography
                            variant='p'
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                                fontSize: '1rem',
                            }}
                        >
                            Initiation Quarter
                        </Typography>
                        <Typography
                            variant='p'
                            mb={1}
                            sx={{
                                fontSize: '1rem',
                            }}
                        >
                            {selectedCandidate.initiationQuarter?.year}{' '}
                            {selectedCandidate.initiationQuarter?.quarter}
                        </Typography>

                        <Typography variant="h4" color="secondary" mt={3}>
                            Upload Headshot
                        </Typography>

                        <UploadHeadshot
                            candidate={selectedCandidate}
                            setCandidate={selectedCandidate}
                        />
                    </Box>
                )}

                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={4000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    sx={{
                        '& .MuiSnackbarContent-root': {
                            color: 'black', //your custom color here
                            backgroundColor: (theme) => theme.palette.secondary.main, //your custom color here
                        },
                    }}
                />
            </Container>
        </>
    );
};

export default ProfilePage;
