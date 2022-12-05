import React, { useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';


const AccountAdd = () => {
  const [input, setInput] = useState({ users: 0, contract: 0, cctv: 0, maintain: 0, form: 0 })


  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: name == 'username' || name == 'passowrd' ? value.replace(/[^\w]/g, '') : value
    })
  }

  const createClick = (event) => {
    event.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/account/new`, input, {
      headers: {
        'authorization': `token ${localStorage.getItem('accessToken')}`
      }
    }).then(result => {
      if (!result.data.err) {
        alert('Creted')
      } else
        alert('Cannot Create')
    }).catch(() => {
      localStorage.removeItem('accessToken')
      window.location.href = '/'
    })
  }
  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Create New User
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput name='username' type="text" label="Username" value={input?.username} variant="standard" fullWidth required
                    onChange={inputChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='password' type="password" label="Password" value={input?.password} variant="standard" fullWidth required
                    onChange={inputChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='confirmPassword' type="password" label="Confirm Password" value={input?.confirmPassword} variant="standard" fullWidth required
                    onChange={inputChange}
                  />
                </MDBox>
                <FormControl variant="standard" sx={{ mb: 2, minWidth: 120 }} fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                  <Select
                    name='role'
                    className='text'
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={inputChange}
                    label="Role"
                    fullWidth
                  >
                    <MenuItem value={1}><MDTypography variant="button">Monitor</MDTypography></MenuItem>
                    <MenuItem value={2}><MDTypography variant="button">Maintenance Technician</MDTypography></MenuItem>
                  </Select>
                </FormControl>
                {input.role == 1 &&
                  <>
                    <FormControl variant="standard" sx={{ mb: 2, minWidth: 120 }} fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">Account setting</InputLabel>
                      <Select
                        name='users'
                        className='text'
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={inputChange}
                        label="users"
                        value={input.users}
                        fullWidth
                      >
                        <MenuItem value={0}><MDTypography variant="button">Denied</MDTypography></MenuItem>
                        <MenuItem value={1}><MDTypography variant="button">Accessible</MDTypography></MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ mb: 2, minWidth: 120 }} fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">Form setting</InputLabel>
                      <Select
                        name='form'
                        className='text'
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={inputChange}
                        label="form"
                        value={input.form}
                        fullWidth
                      >
                        <MenuItem value={0}><MDTypography variant="button">Denied</MDTypography></MenuItem>
                        <MenuItem value={1}><MDTypography variant="button">Accessible</MDTypography></MenuItem>
                      </Select>
                    </FormControl>
                  </>
                }
                {input.role == 2 &&
                  <>
                    <FormControl variant="standard" sx={{ mb: 2, minWidth: 120 }} fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">Contract</InputLabel>
                      <Select
                        name='contract'
                        className='text'
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={inputChange}
                        label="contract"
                        value={input.contract}
                        fullWidth
                      >
                        <MenuItem value={0}><MDTypography variant="button">Denied</MDTypography></MenuItem>
                        <MenuItem value={1}><MDTypography variant="button">Read only</MDTypography></MenuItem>
                        <MenuItem value={2}><MDTypography variant="button">Read/Edit</MDTypography></MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ mb: 2, minWidth: 120 }} fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">CCTV</InputLabel>
                      <Select
                        name='cctv'
                        className='text'
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={inputChange}
                        label="cctv"
                        value={input.cctv}
                        fullWidth
                      >
                        <MenuItem value={0}><MDTypography variant="button">Denied</MDTypography></MenuItem>
                        <MenuItem value={1}><MDTypography variant="button">Read only</MDTypography></MenuItem>
                        <MenuItem value={2}><MDTypography variant="button">Read/Edit</MDTypography></MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ mb: 2, minWidth: 120 }} fullWidth>
                      <InputLabel id="demo-simple-select-standard-label">Maintain</InputLabel>
                      <Select
                        name='maintain'
                        className='text'
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={inputChange}
                        label="maintain"
                        value={input.maintain}
                        fullWidth
                      >
                        <MenuItem value={0}><MDTypography variant="button">Denied</MDTypography></MenuItem>
                        <MenuItem value={1}><MDTypography variant="button">Accessible</MDTypography></MenuItem>
                      </Select>
                    </FormControl>
                  </>
                }
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color={input.password != input.confirmPassword ? "error" : "success"} fullWidth onClick={createClick} disabled={input.password != input.confirmPassword || !input.password}>
                  {input.password == input.confirmPassword ? "Create" : "Password is not same"}
                </MDButton>
                {/* </MDBox> */}
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  )
}

export default AccountAdd