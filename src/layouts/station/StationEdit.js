import React, { useEffect, useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Contract from './Contract';
import Maintain from './Maintain';
import ContractList from './ContractList';
import MaintainList from './MaintainList';

const StationEdit = () => {
    const [input, setInput] = useState([])
    const [display, setDisplay] = useState({ contract: false, maintain: false })
    const { id } = useParams()

    const inputChange = (event) => {
        const { name, value } = event.target
        setInput({
            ...input,
            [name]: value,
        })
    }
    const addClick = () => {
        console.log(input)
        let formData = new FormData()
        formData.append('img_name', input?.name)
        formData.append('file', input?.img)
        axios.post(`${process.env.REACT_APP_API}/station/update/${id}`, {
            name: input?.name,
            tel: input?.tel,
            url: input?.url,
            long: input?.long,
            lati: input?.lati,
            key: input?.key
        }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err)
                alert('เรียบร้อย')
        })
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }
    const uploadImg = async (event) => {
        // await setInput({ ...input, img: null })
        let formData = new FormData()
        formData.append('img_name', id)
        formData.append('file', event.target.files[0])
        axios.post(`${process.env.REACT_APP_API}/station/updateImg/${id}`, formData, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => window.location.reload())
            .catch((err) => {
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
                setInput(result.data.stations[0])
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
                            {input?.img &&
                                <img
                                    src={`${process.env.REACT_APP_API}/img/${input?.img}`}
                                    style={{ 'maxWidth': '100%', 'maxHeight': '500px' }}
                                />
                            }
                            {/* <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                Create New Station
                            </MDTypography> */}
                        </MDBox>
                        {input?.id &&
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput name='name' type="text" label="Station Name" variant="standard" value={input.name} fullWidth onChange={inputChange} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput name='tel' type="tel" label="Tel" variant="standard" fullWidth value={input.tel} onChange={inputChange} />
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
                                                <MDInput name='lati' type="number" label="Latitude" variant="standard" value={input.lati} fullWidth onChange={inputChange} />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDBox mb={2}>
                                                <MDInput name='long' type="number" label="Longtitude" variant="standard" value={input.long} fullWidth onChange={inputChange} />
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
                                    <input name='img' type="file" accept="image/*" style={{ color: 'white' }} onChange={(event) => uploadImg(event)} />
                                </MDBox>
                                {display?.contractList &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, contractList: false })}>
                                        </div>
                                        <ContractList id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.contract &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, contract: false })}>
                                        </div>
                                        <Contract id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.maintainList &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, maintainList: false })}>
                                        </div>
                                        <MaintainList id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.maintain &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, maintain: false })}>
                                        </div>
                                        <Maintain id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                <MDBox mt={3} mb={1}>
                                    <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                                        <div>
                                            <MDButton variant='gradient' color='primary' style={{ 'marginRight': '5px' }} onClick={() => setDisplay({ ...display, contractList: true })}>สัญญา</MDButton>
                                            <MDButton variant='gradient' color='primary' onClick={() => setDisplay({ ...display, contract: !display.contract })}>เพิ่ม</MDButton>
                                        </div>
                                        <div>
                                            <MDButton variant='gradient' color='secondary' style={{ 'marginRight': '5px' }} onClick={() => setDisplay({ ...display, maintainList: true })}>ประวัติการซ่อมบำรุง</MDButton>
                                            <MDButton variant='gradient' color='secondary' onClick={() => setDisplay({ ...display, maintain: true })}>เพิ่ม</MDButton>
                                        </div>
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
        </MDBox >
    )
}

export default StationEdit