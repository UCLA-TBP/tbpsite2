import React, { useState } from 'react';
import axios from 'axios';

function LogTutoring ({authenticatedUser}) {

    const [weekOption, setWeekOption] = useState("");
    function handleWeekOptionChange(event) {
        setWeekOption(event.target.value);
    }

    const [numHours, setNumHours] = useState(0);
    function handleNumHoursChange(event) {
        setNumHours(event.target.value);
    }

    const [secretPhrase, setSecretPhrase] = useState("");
    function handleSecretPhraseChange(event) {
        setSecretPhrase(event.target.value);
    }
    
    function handleSubmit() {
        const update = {
            $push: {
                tutoringLog: {
                    week: weekOption,
                    hours: numHours,
                    secretPhrase: secretPhrase
                }
            }
        };
        axios.put('/user/update-user/' + authenticatedUser._id, update)
            .then(response => {
            console.log(response.data);
            })
            .catch(error => {
            console.error(error);
            });
    }

    return (
        <div>
            <div>
                <label htmlFor="dropdown">Which week are you logging?</label>
                <select id="dropdown" value={weekOption} onChange={handleWeekOptionChange}>
                    <option value="Week 2">Week 2</option>
                    <option value="Week 3">Week 3</option>
                    <option value="Week 4">Week 4</option>
                    <option value="Week 5">Week 5</option>
                    <option value="Week 6">Week 6</option>
                    <option value="Week 7">Week 7</option>
                    <option value="Week 8">Week 8</option>
                    <option value="Week 9">Week 9</option>
                </select>
                <p>Your choice: {weekOption} </p>
            </div>

            <div>
                <label htmlFor="number-input">How many hours did you tutor for?</label>
                <input
                    type="number"
                    id="number-input"
                    value={numHours}
                    onChange={handleNumHoursChange}
                />
                <p>You entered: {numHours} </p>
            </div>

            <div>
                <label htmlFor="string-input">Secret Phrase</label>
                <input
                    type="text"
                    id="string-input"
                    value={secretPhrase}
                    onChange={handleSecretPhraseChange}
                />
                <p>You entered: {secretPhrase} </p>
            </div>
            
            <button onClick={handleSubmit}>
                Submit
            </button>

        </div>
        
    );
};

export default LogTutoring;
