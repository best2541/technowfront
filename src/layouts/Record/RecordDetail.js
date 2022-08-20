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
import MDTypography from 'components/MDTypography';

const RecordDetail = () => {
    const [input, setInput] = useState([])
    const [callback, setCallback] = useState({})
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
        }).then(result => console.log(result))
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/record/detail/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                setCallback(JSON.parse(result.data.record[0].callback))
                setInput(result.data.record[0])
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
                            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                {input?.name}
                            </MDTypography>
                        </MDBox>
                        {input?.id &&
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <Grid container spacing={3}>
                                        {callback && Object.keys(callback).map(call => (
                                            <Grid item xs={6}>
                                                <MDTypography>{call} : {callback[call]}</MDTypography>
                                            </Grid>
                                        ))}
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