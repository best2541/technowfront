import React from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";


const AccountAdd = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
                  <MDInput name='username' type="text" label="Username" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='password' type="password" label="Password" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='confirmPassword' type="password" label="Confirm Password" variant="standard" fullWidth />
                </MDBox>
                {/* <MDBox mb={2}> */}
                <FormControl variant="standard" sx={{ mb: 2, minWidth: 120 }} fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    fullWidth
                  >
                    <MenuItem value={10}>Monitor</MenuItem>
                    <MenuItem value={20}>Maintenance Technician</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="success" fullWidth>
                  Create
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