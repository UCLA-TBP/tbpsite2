import React, { useState } from 'react';
import axios from 'axios';
import './LogTutoring.css';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';

function LogTutoring ({candidate, setCandidate}) {

    const [weekOption, setWeekOption] = useState(2);
    function handleWeekOptionChange(event) {
        console.log(event.target.value)
        setWeekOption(Number(event.target.value));
    }

    const [numHours, setNumHours] = useState(0);
    function handleNumHoursChange(event) {
        console.log(event.target.value)
        setNumHours(Number(event.target.value));
    }

    const [secretPhrase, setSecretPhrase] = useState("");
    function handleSecretPhraseChange(event) {
        console.log(event.target.value)
        setSecretPhrase(event.target.value);
    }
    
    function handleSubmit() {

        const updatedCandidate = {
            ...candidate,
            tutoringLog: [
                ...candidate.tutoringLog,
                {
                    week: weekOption,
                    hours: numHours,
                    secretPhrase: secretPhrase
                }
            ],
          };

          axios
            .put('/api/user/update-user/' + candidate._id, updatedCandidate)
            .then((res) => {

                setCandidate(updatedCandidate)
                console.log(updatedCandidate)
                //setSnackbarMessage('Induction requirement updated!');
                //setShowSnackbar(true);
            })
            .catch((err) => {
              console.log(err);
              //setSnackbarMessage('Save error!');
              //setShowSnackbar(true);
            });

        setNumHours(0);
        setWeekOption(2);
        setSecretPhrase("");
    }

    return (
        <div>
            <div>
                <FormControl sx={{ m: 1, minWidth: 80 }} size="small" >
                    <InputLabel id="week-select-label" style={{color: 'gold'}}>Week</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weekOption}
                        label="Week"
                        onChange={handleWeekOptionChange}
                        style={{color: 'white'}}
                    >
                        <MenuItem value={2}>Week 2</MenuItem>
                        <MenuItem value={3}>Week 3</MenuItem>
                        <MenuItem value={4}>Week 4</MenuItem>
                        <MenuItem value={5}>Week 5</MenuItem>
                        <MenuItem value={6}>Week 6</MenuItem>
                        <MenuItem value={7}>Week 7</MenuItem>
                        <MenuItem value={8}>Week 8</MenuItem>
                        <MenuItem value={9}>Week 9</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <div>
                <TextField
                    id="outlined-number"
                    label="Hours"
                    type="number"
                    size="small"
                    onChange={handleNumHoursChange}
                    style={{ paddingBottom: '10px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <div>
                <TextField
                    id="outlined-input"
                    label="Secret Phrase"
                    size="small"
                    defaultValue=""
                    onChange={handleSecretPhraseChange}
                    style={{ paddingBottom: '10px' }}
                    InputProps={{
                        shrink: true,
                    }}
                />
            </div>

            <Button variant="contained"
                    size="small"
                    onClick={handleSubmit}>Submit
            </Button>

        </div>
        
    );
};

export default LogTutoring;
