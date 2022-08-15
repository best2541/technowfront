import React, { useEffect, useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Contract from './Contract';

const StationEdit = () => {
    const [input, setInput] = useState([])
    const [display, setDisplay] = useState({ contract: false, maintain: false })
    const { id } = useParams()

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
        formData.append('long', input?.long)
        formData.append('lati', input?.lati)
        formData.append('img_name', input?.name)
        formData.append('file', input?.img)
        axios.post(`${process.env.REACT_APP_API}/station/new`, formData, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => window.location.href = `/station/edit/${result.data}`)
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/get/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                console.log(result.data.stations)
                setInput(result.data.stations)
            }
        })
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }, [])
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
                            {input[0]?.img &&
                                <img
                                    src={`${process.env.REACT_APP_API}${input[0]?.img}`}
                                    style={{ 'maxWidth': '100%', 'maxHeight': '500px' }}
                                />
                            }
                            {/* <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                Create New Station
                            </MDTypography> */}
                        </MDBox>
                        {input.length > 0 &&
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput name='name' type="text" label="Station Name" variant="standard" value={input[0]?.name} fullWidth onChange={inputChange} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput name='tel' type="tel" label="Tel" variant="standard" fullWidth value={input[0]?.tel} onChange={inputChange} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput name='url' type="text" label="Url" variant="standard" value={input[0]?.url} fullWidth onChange={inputChange} />
                                    </MDBox>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <MDBox mb={2}>
                                                <MDInput name='long' type="number" label="Longtitude" variant="standard" value={input[0]?.long} fullWidth onChange={inputChange} />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDBox mb={2}>
                                                <MDInput name='lati' type="number" label="Latitude" variant="standard" value={input[0]?.lati} fullWidth onChange={inputChange} />
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                </MDBox>
                                <MDBox>
                                    <span style={{ color: 'white' }}>IMG : </span>
                                    {/* {input[0].img &&
                                        <img
                                            src={`${process.env.REACT_APP_API}${input[0]?.img}`}
                                            style={{ 'maxWidth': '100%', 'maxHeight': '500px' }}
                                        />
                                    } */}
                                    <input name='img' type="file" style={{ color: 'white' }} onChange={(event) => setInput({
                                        ...input,
                                        img: event.target.files[0]
                                    })} />
                                </MDBox>
                                {display.contract &&
                                    <div className='popup' onClick={() => setDisplay({ ...display, contract: false })}>
                                        <Contract />
                                    </div>
                                }
                                <MDBox mt={3} mb={1}>
                                    <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                                        <MDButton variant='gradient' color='primary' onClick={() => setDisplay({ ...display, contract: !display.contract })}>สัญญา</MDButton>
                                        <MDButton variant='gradient' color='secondary'>ประวัติการซ่อมบำรุง</MDButton>
                                    </div>
                                </MDBox>
                                <MDBox mt={4} mb={1}>
                                    <MDButton variant="gradient" color="success" onClick={() => addClick()} fullWidth>
                                        UPDATE
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                        }
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    )
}

export default StationEdit