import React, { useEffect, useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from 'components/MDBadge';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AccountEdit = () => {
  const { username } = useParams()
  // const [input, setInput] = useState({})
  const [datas, setDatas] = useState()
  const [btn, setBtn] = useState(false)

  const inputChange = (event) => {
    const { name, value } = event.target
    setDatas({
      ...datas,
      [name]: value
    })
    setBtn(true)
  }

  const badgeClick = (status) => {
    setDatas(({
      ...datas,
      status: status
    }))
    setBtn(true)
  }
  const createClick = (event) => {
    event.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/account/edit/submit/${username}`, datas, {
      headers: {
        'authorization': `token ${localStorage.getItem('accessToken')}`
      }
    }).then(result => {
      if (!result.data.err) {
        setBtn(false)
      }
    }).catch(() => {
      localStorage.removeItem('accessToken')
      window.location.href = '/'
    })
  }

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API}/account/edit/get/${username}`, '', {
      headers: {
        'authorization': `token ${localStorage.getItem('accessToken')}`
      }
    }).then(result => {
      if (!result.data.err) {
        setDatas(result.data[0])
      }
    }).catch(() => {
      localStorage.removeItem('accessToken')
      window.location.href = '/'
    })
  }, [])
  return (
    <MDBox pt={6} pb={3}>
      {datas &&
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
                  {username}
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <MDTypography>
                      USERNAME
                    </MDTypography>
                  </Grid>
                  <Grid item xs={10}>
                    <MDTypography>
                      : {datas?.username}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography>
                      ROLE
                    </MDTypography>
                  </Grid>
                  <Grid item xs={10}>
                    <MDTypography variant='span'>
                      :
                    </MDTypography>
                    <FormControl variant="standard" sx={{ minWidth: 120, width: '99%' }}>
                      <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                      <Select
                        name='role'
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={inputChange}
                        label="role"
                        style={{ 'color': 'white' }}
                        value={datas?.role}
                      >
                        <MenuItem value={'1'}>Monitor</MenuItem>
                        <MenuItem value={'2'}>Maintenance Technician</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {datas.role == 1 &&
                    <>
                      <Grid item xs={2}>
                        <MDTypography>
                          Account Setting
                        </MDTypography>
                      </Grid>
                      <Grid item xs={10}>
                        <MDTypography variant='span'>
                          :
                        </MDTypography>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '99%' }}>
                          <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                          <Select
                            name='users'
                            className='text'
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={inputChange}
                            label="users"
                            value={datas.users}
                            fullWidth
                          >
                            <MenuItem value={0}>Denied</MenuItem>
                            <MenuItem value={1}>Accessible</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <MDTypography>
                          Form Setting
                        </MDTypography>
                      </Grid>
                      <Grid item xs={10}>
                        <MDTypography variant='span'>
                          :
                        </MDTypography>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '99%' }}>
                          <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                          <Select
                            name='form'
                            className='text'
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={inputChange}
                            label="form"
                            value={datas.form}
                            fullWidth
                          >
                            <MenuItem value={0}>Denied</MenuItem>
                            <MenuItem value={1}>Accessible</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </>
                  }
                  {datas.role == 2 &&
                    <>
                      <Grid item xs={2}>
                        <MDTypography>
                          Contract
                        </MDTypography>
                      </Grid>
                      <Grid item xs={10}>
                        <MDTypography variant='span'>
                          :
                        </MDTypography>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '99%' }}>
                          <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                          <Select
                            name='contract'
                            className='text'
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={inputChange}
                            label="contract"
                            value={datas.contract}
                            fullWidth
                          >
                            <MenuItem value={0}>Denied</MenuItem>
                            <MenuItem value={1}>Read only</MenuItem>
                            <MenuItem value={2}>Read/Edit</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <MDTypography>
                          CCTV
                        </MDTypography>
                      </Grid>
                      <Grid item xs={10}>
                        <MDTypography variant='span'>
                          :
                        </MDTypography>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '99%' }}>
                          <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                          <Select
                            name='cctv'
                            className='text'
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={inputChange}
                            label="cctv"
                            value={datas.cctv}
                            fullWidth
                          >
                            <MenuItem value={0}>Denied</MenuItem>
                            <MenuItem value={1}>Read only</MenuItem>
                            <MenuItem value={2}>Read/Edit</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <MDTypography>
                          Maintain
                        </MDTypography>
                      </Grid>
                      <Grid item xs={10}>
                        <MDTypography variant='span'>
                          :
                        </MDTypography>
                        <FormControl variant="standard" sx={{ minWidth: 120, width: '99%' }}>
                          <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                          <Select
                            name='maintain'
                            className='text'
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={inputChange}
                            label="maintain"
                            value={datas.maintain}
                            fullWidth
                          >
                            <MenuItem value={0}>Denied</MenuItem>
                            <MenuItem value={1}>Accessible</MenuItem>
                            {/* <MenuItem value={2}>Read/Edit</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Grid>
                    </>
                  }
                  <Grid item xs={2}>
                    <MDTypography>
                      STATUS
                    </MDTypography>
                  </Grid>
                  <Grid item xs={10}>
                    <MDTypography variant='span'>
                      : {datas?.status == true ?
                        <MDBadge badgeContent="Active" color="success" variant="gradient" size="sm" onClick={() => badgeClick(false)} />
                        :
                        <MDBadge badgeContent="Block" color="error" variant="gradient" size="sm" onClick={() => badgeClick(true)} />
                      }
                    </MDTypography>
                  </Grid>
                </Grid>
                <MDBox component="form" role="form">
                </MDBox>
                <MDBox mt={4} mb={1}>
                  {btn &&
                    <MDButton variant="gradient" color="success" fullWidth onClick={createClick}>
                      Change
                    </MDButton>
                  }
                  {/* </MDBox> */}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      }
    </MDBox >
  )
}

export default AccountEdit