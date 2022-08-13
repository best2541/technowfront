import React, { useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

const StationAdd = () => {
  const [input, setInput] = useState({})

  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value
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
                Create New Station
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput name='name' type="text" label="Station Name" variant="standard" fullWidth onChange={inputChange} />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='url' type="text" label="Url" variant="standard" fullWidth onChange={inputChange} />
                </MDBox>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <MDBox mb={2}>
                      <MDInput name='long' type="number" label="Longtitude" variant="standard" fullWidth onChange={inputChange} />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox mb={2}>
                      <MDInput name='lati' type="number" label="Latitude" variant="standard" fullWidth onChange={inputChange} />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="success" onClick={() => console.log(input)} fullWidth>
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