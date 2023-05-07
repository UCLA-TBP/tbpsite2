import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { subjects, testTypes, testNums, quarters } from '../utils/TestUtils';

const TestForm = ({ testFormData, setTestFormData }) => {
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      rowSpacing={1}
      pt={2}
      sx={{
        width: { xs: '100%', sm: '75%', md: '65%', lg: '55%' },
      }}
    >
      <Grid item xs={4}>
        <FormControl
          sx={{
            minWidth: '100%',
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
          }}
          size='small'
        >
          <InputLabel
            id='subject-select-label'
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            Subject
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Subject'
            defaultValue=''
            value={testFormData.subject}
            onChange={(e) =>
              setTestFormData({ ...testFormData, subject: e.target.value })
            }
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
          id='outlined-input'
          label='Class Code'
          size='small'
          // defaultValue=''
          value={testFormData.classNumber}
          onChange={(e) =>
            setTestFormData({ ...testFormData, classNumber: e.target.value })
          }
          InputProps={{ placeholder: 'e.g. 35L for CS 35L' }}
          sx={{
            '& .MuiInputLabel-root': {
              color: (theme) => theme.palette.secondary.main,
            },
            '& input': {
              color: (theme) => theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
            minWidth: '100%',
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          id='outlined-input'
          label='Professor'
          size='small'
          // defaultValue=''
          value={testFormData.professor}
          onChange={(e) =>
            setTestFormData({ ...testFormData, professor: e.target.value })
          }
          InputProps={{}}
          sx={{
            '& .MuiInputLabel-root': {
              color: (theme) => theme.palette.secondary.main,
            },
            '& input': {
              color: (theme) => theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
            paddingBottom: '10px',
            minWidth: '100%',
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <FormControl
          sx={{
            minWidth: '100%',
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
          }}
          size='small'
        >
          <InputLabel
            id='test-type-select-label'
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            Type
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='testType'
            defaultValue=''
            value={testFormData.testType}
            onChange={(e) =>
              setTestFormData({ ...testFormData, testType: e.target.value })
            }
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
            minWidth: '100%',
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
          }}
          size='small'
        >
          <InputLabel
            id='test-num-select-label'
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            Number
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='testNum'
            value={testFormData.testNum}
            onChange={(e) =>
              setTestFormData({ ...testFormData, testNum: e.target.value })
            }
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
            minWidth: '100%',
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
          }}
          size='small'
        >
          <InputLabel
            id='quarter-select-label'
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            Quarter
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Quarter'
            defaultValue=''
            value={testFormData.termQuarter}
            onChange={(e) => {
              setTestFormData({ ...testFormData, termQuarter: e.target.value });
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
          id='outlined-input'
          label='Year'
          size='small'
          // defaultValue=''
          value={testFormData.termYear}
          onChange={(e) =>
            setTestFormData({ ...testFormData, termYear: e.target.value })
          }
          InputProps={{ placeholder: 'YYYY' }}
          sx={{
            '& .MuiInputLabel-root': {
              color: (theme) => theme.palette.secondary.main,
            },
            '& input': {
              color: (theme) => theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
            paddingBottom: '10px',
            minWidth: '100%',
          }}
        />
      </Grid>

      <Grid item xs={4} />

      {/* <Snackbar
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
      /> */}
    </Grid>
  );
};

export default TestForm;
