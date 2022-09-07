import React, { useEffect, useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import { TextField } from '@mui/material';

const RecordDetail = () => {
    const [since, setSince] = useState({ since: new Date(2000, 1, 1), to: new Date() })
    const [station, setStation] = useState([])
    const [callback, setCallback] = useState([])
    const [form, setForm] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}/record/detail/${id}`, { since: since.since, to: since.to }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(async result => {
            if (!result.data.err) {
                setCallback(result.data.record)
                setStation(result.data?.stations)
            }
        })
        axios.get(`${process.env.REACT_APP_API}/form/index`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => setForm(result.data.form))
        // .catch(() => {
        //     localStorage.removeItem('accessToken')
        //     window.location.href = '/'
        // })
    }, [since])

    return (
        <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card >
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
                                {station[0]?.name}
                            </MDTypography>
                        </MDBox>
                        {station &&
                            <MDBox pt={4} pb={3} px={3} style={{ 'color': 'white' }}>
                                <div className='header'>
                                    <div>
                                        <TextField
                                            id="datetime-local"
                                            label="since"
                                            type="datetime-local"
                                            defaultValue={new Date()}
                                            onChange={(event) => setSince({ ...since, since: event.target.value })}
                                            sx={{ width: 250 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="datetime-local"
                                            label="to"
                                            type="datetime-local"
                                            defaultValue={new Date()}
                                            onChange={(event) => setSince({ ...since, to: event.target.value })}
                                            sx={{ width: 250 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>
                                <MDBox>
                                    <Grid container spacing={2}>
                                        {callback && callback.map(call => {
                                            const datas = JSON.parse(call.callback)
                                            return (
                                                <Grid item xs={6}>
                                                    <div>{call.create_date}</div>
                                                    {Object.keys(datas).map(data => (
                                                        < Grid item xs={6}>
                                                            <MDTypography>{data} : {form.filter(f => f.key == data && f.value == datas[data]).length != 0 ? form.filter(f => f.key == data && f.value == datas[data]).map(res => res?.callback) : datas[data]}</MDTypography>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            )
                                        }
                                        )
                                        }
                                    </Grid>
                                </MDBox>
                            </MDBox>
                        }
                    </Card>
                </Grid>
            </Grid>
        </MDBox >
    )
}

export default RecordDetail