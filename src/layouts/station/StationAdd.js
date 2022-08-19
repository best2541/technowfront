import React, { useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';

const StationAdd = () => {
  const [input, setInput] = useState({})

  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value
    })
  }
  const addClick = () => {
    let formData = new FormData()
    formData.append('name', input?.name)
    formData.append('tel', input?.tel)
    formData.append('url', input?.url)
    formData.append('long', input?.long || 0)
    formData.append('lati', input?.lati || 0)
    formData.append('key', input?.key)
    formData.append('img_name', input?.name)
    formData.append('file', input?.img)
    axios.post(`${process.env.REACT_APP_API}/station/new`, formData, {
      headers: {
        'authorization': `token ${localStorage.getItem('accessToken')}`
      }
    }).then(result => {
      if (!result?.data?.err)
        window.location.href = `/station/edit/${result.data}`
      else
        console.log(result.data)
    })
      .catch(() => {
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
                Create New Station
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput name='name' type="text" label="Station Name" variant="standard" fullWidth onChange={inputChange} />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput name='tel' type="tel" label="Tel" variant="standard" fullWidth onChange={inputChange} />
                </MDBox>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <MDBox mb={2}>
                      <MDInput name='url' type="text" label="Url" variant="standard" value={input.url} fullWidth onChange={inputChange} />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox mb={2}>
                      <MDInput name='key' type="text" label="Key" variant="standard" value={input.key} fullWidth onChange={inputChange} />
                    </MDBox>
                  </Grid>
                </Grid>
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
              {/* <MDBox>
                <span style={{ color: 'white' }}>IMG : </span>
                <input name='img' type="file" style={{ color: 'white' }} onChange={(event) => setInput({
                  ...input,
                  img: event.target.files[0]
                })} />
              </MDBox> */}
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="success" onClick={() => addClick()} fullWidth>
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