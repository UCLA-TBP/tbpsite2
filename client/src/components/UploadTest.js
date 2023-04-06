import React, { useState } from 'react';

const UploadTest = () => {

    const classes = ['BE', 'CEE', 'CHEM', 'CHEME', 'CS', 'ECON', 'EE', 'ENGR', 'LS', 'MAE', 'MATH', 'MGMT', 'MSE', 'PHYSICS', 'STATS'];

    const [professorName, setProfessorName] = useState("");
    function handleProfessorNameChange(event) {
        setProfessorName(event.target.value);
    }

    const [classNumber, setClassNumber] = useState(0);
    function handleClassNumberChange(event) {
        setClassNumber(event.target.value);
    }

    function handleSubmit() {
        
    }

    return (
        <div>
            <div>
                <label htmlFor="dropdown">What subject is this test?</label>
                <select id="dropdown" value={weekOption} onChange={handleWeekOptionChange}>
                    {classes.map(className => (
                        <option key={className} value={className}>
                            {className}
                        </option>
                    ))}
                </select>
                <p>Your choice: {className} </p>
            </div>

            <div>
                <label htmlFor="number-input">Which class is this test?</label>
                <input
                    type="number"
                    id="number-input"
                    value={classNumber}
                    onChange={handleClassNumberChange}
                />
                <p>You entered: {classNumber} </p>
            </div>

            <div>
                <label htmlFor="string-input">Enter professor's last name</label>
                <input
                    type="text"
                    id="string-input"
                    value={professorName}
                    onChange={handleProfessorNameChange}
                />
                <p>You entered: {professorName} </p>
            </div>
            
            <button onClick={handleSubmit}>
                Submit
            </button>

        </div>
        
    );
};

export default UploadTest;
