/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useRef, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
// import MDAlert from "components/MDAlert";

function Basic() {
  const usernameRef = useRef()
  const [input, setInput] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState(false)

  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value
    })
  }

  const loginClick = async (event) => {
    event.preventDefault()
    await setMsg(false)
    axios.post(`${process.env.REACT_APP_API}/auth/login`, {
      username: input.username,
      password: input.password
    }).then(result => {
      if (!result.data.err) {
        window.localStorage.setItem('accessToken', result.data.token)
        window.localStorage.setItem('role', result.data.role)
        window.localStorage.setItem('users', result.data.users)
        window.localStorage.setItem('contract', result.data.contract)
        window.localStorage.setItem('cctv', result.data.cctv)
        window.localStorage.setItem('maintain', result.data.maintain)
        window.localStorage.setItem('remember', input.username)
        window.location.href = '/map/*'
      } else {
        setMsg(true)
      }
    })
      .catch(err => console.log(err))
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            TECHNOW
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography  href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        {msg &&
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="error">
              username or password is incorrect
            </MDTypography>
          </MDBox>
        }
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={loginClick}>
            <MDBox mb={2}>
              <MDInput name='username' ref={usernameRef} type="text" label="Username" fullWidth onChange={inputChange} value={input.username} onFocus={() => setInput({ username: window.localStorage?.getItem('remember') || null })} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput name='password' type="password" label="Password" fullWidth onChange={inputChange} />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type='submit'>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
