import { Card, Grid } from '@mui/material'
import axios from 'axios'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import MDTypography from 'components/MDTypography'
import React, { useEffect, useRef, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Ticket({ id, setDisplay, options }) {
    const [datas, setDatas] = useState([])
    const [button, setButton] = useState('')
    const [selected, setSelected] = useState()
    const newTicket = () => {
        const ref_no = (new Date().getTime()).toString()
        axios.post(`${process.env.REACT_APP_API}/station/ticket/new`, {
            ref_no: ref_no,
            station_id: id,
            user: selected
        }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                setDatas([
                    ...datas,
                    { ref_no: ref_no, station_id: id, status: 1 }
                ])
            }
        }).catch(err => console.log(err))
    }
    const pendingClick = (data) => {
        axios.post(`${process.env.REACT_APP_API}/station/ticket/pending/${data.ref_no}`, {
            status: parseInt(data.status) + 1
        }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err)
                window.location.reload()
        })
    }
    const closeTicket = (data) => {
        if (window.confirm('SURE ?'))
            axios.post(`${process.env.REACT_APP_API}/station/ticket/pending/${data.ref_no}`, {
                status: 0
            }, {
                headers: {
                    'authorization': `token ${localStorage.getItem('accessToken')}`
                }
            }).then(result => {
                if (!result.data.err)
                    window.location.reload()
            })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/ticket/id/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            setDatas(result.data.ticket)
        })
    }, [])
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <Grid container spacing={6}>
                        <Grid item xs={3}>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Ticket
                                </MDTypography>
                            </MDBox>
                        </Grid>
                        {
                            window.localStorage.getItem('role') == 1 &&
                            <Grid item xs={9}>
                                <MDButton className='btn-right' style={{ 'margin-right': '5px' }} size='large' variant="contained" color="warning"
                                    onClick={() => newTicket()}
                                >
                                    OPEN TICKET
                                </MDButton>
                                <FormControl className='btn-right' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Mechanic</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        onChange={(event) => setSelected(event.target.value)}
                                        label="Mechanic"
                                    >
                                        <MenuItem value=''>
                                            <MDTypography variant="button">
                                                <em>Anyone</em>
                                            </MDTypography>
                                        </MenuItem>
                                        {options.map(option => (
                                            <MenuItem value={option.username}><MDTypography variant="button">{option.username}</MDTypography></MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        }
                    </Grid>
                    <MDBox pt={4} pb={3} px={3} style={{ 'color': 'white' }}>
                        <Grid container spacing={2}>
                            {datas?.map(data => {
                                if (data.status != 0)
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <MDBox mt={1} mb={1}>
                                                    <MDButton variant="gradient" color={data.status == 3 ? "secondary" : "error"}
                                                        onMouseOver={() => window.localStorage.getItem('role') == 1 && setButton(data.ref_no)}
                                                        onMouseLeave={() => window.localStorage.getItem('role') == 1 && setButton('')}
                                                        onClick={() => window.localStorage.getItem('role') == 1 ? closeTicket(data) : data.status == 1 ? pendingClick(data) : setDisplay(display => ({ ...display, maintain: true, ref_no: data.ref_no }))}
                                                        fullWidth
                                                    >
                                                        {button == data.ref_no ? 'Close Ticket' : data.status == 1 ? `${data.ref_no} : Waiting : ${data?.user || 'anyone'}` : data.status == 2 ? `${data.ref_no} : Pending : ${data?.user || 'anyone'}` : data.status == 3 ? `${data.ref_no} : Fixed : ${data?.user || 'anyone'}` : ''}
                                                    </MDButton>
                                                </MDBox>
                                            </Grid>
                                        </>
                                    )
                            })}
                        </Grid>
                    </MDBox>
                </Card>
            </Grid>
        </Grid >
    )
}

export default Ticket