import React, { useEffect, useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MDTypography from 'components/MDTypography';

const RecordDetail = () => {
    const [input, setInput] = useState(new Date().getDate())
    const [station, setStation] = useState([])
    const [select, setSelect] = useState([])
    const [times, setTimes] = useState(new Date().getHours())
    const [callback, setCallback] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/record/detail/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(async result => {
            if (!result.data.err) {
                setCallback(result.data.record)
                setSelect(result.data.record.filter(rec => new Date(rec.create_date).getDate() == input))
                setStation(result.data?.stations)
            }
        })
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }, [])
    useEffect(() => {
        setSelect(callback.filter(rec => new Date(rec?.create_date).getDate() == input))
    }, [input])
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
                                {station[0]?.name}
                            </MDTypography>
                        </MDBox>
                        {station &&
                            <MDBox pt={4} pb={3} px={3}>
                                <div style={{ direction: 'rtl' }}>
                                    <MDInput type='time' step="3600000" variant="standard" style={{ 'backgroundColor': 'transparent', 'color': 'white' }} onChange={(event) => setTimes(event.target.value.split(':')[0])} />
                                    <MDInput type='date' variant="standard" style={{ 'backgroundColor': 'transparent', 'color': 'white' }} onChange={(event) => setInput(new Date(event.target.value).getDate())} />
                                </div>
                                <MDBox component="form" role="form">
                                    <Grid container spacing={3}>
                                        {callback && input && callback.filter(rec => new Date(rec?.create_date).getDate() == input && new Date(rec?.create_date).getHours() == times).map(call => {
                                            const datas = JSON.parse(call.callback)
                                            return Object.keys(datas).map(data => (
                                                < Grid item xs={6}>
                                                    <MDTypography>{data} : {datas[data]}</MDTypography>
                                                </Grid>
                                            ))
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