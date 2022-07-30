import React from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

const StationAdd = () => {
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
                Create New Station
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput name='name' type="text" label="Station Name" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='url' type="text" label="Url" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='address' type="text" label="Address" variant="standard" fullWidth />
                </MDBox>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="success" fullWidth>
                  Create
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  )
}

export default StationAdd