import { Card, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import axios from 'axios'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import MDInput from 'components/MDInput'
import MDTypography from 'components/MDTypography'
import React, { useEffect, useState } from 'react'

function Index() {
    const [datas, setDatas] = useState([])

    const newFormClick = () => {
        axios.post(`${process.env.REACT_APP_API}/form/new`, {}, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            console.log(result)
            setDatas([
                ...datas,
                {
                    id: result.data,
                    key: '',
                    value: '',
                    callback: ''
                }
            ])
        })
    }
    const load = () => {
        axios.get(`${process.env.REACT_APP_API}/form/index`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => setDatas(result.data.form))
    }
    const save = (obj) => {
        axios.post(`${process.env.REACT_APP_API}/form/update/${obj.id}`, {
            key: obj.key,
            type: obj.type,
            value: obj.value,
            callback: obj.callback
        }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => console.log(result.data))
    }
    const deleteClick = (id) => {
        axios.post(`${process.env.REACT_APP_API}/form/delete/${id}`, '', {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(setDatas(datas.filter(data => data.id != id)))
    }
    useEffect(() => {
        load()
    }, [])
    useEffect(() => {
        console.log(datas)
    }, [datas])
    return (
        <MDBox pt={6} pb={3}>
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
                                        Form
                                    </MDTypography>
                                </MDBox>
                            </Grid>
                        </Grid>
                        <MDBox pt={4} pb={3} px={3} style={{ 'color': 'white' }}>
                            <Grid container spacing={2}>
                                {datas.map((data, index) => (
                                    <>
                                        <Grid item xs={3}>
                                            <MDInput name="key" label="key" variant="standard" value={data.key} fullWidth onChange={async (event) => {
                                                await setDatas([
                                                    ...datas.slice(0, index),
                                                    {
                                                        id: data.id,
                                                        type: data.type,
                                                        key: event.target.value,
                                                        value: data.value,
                                                        callback: data.callback,
                                                        username: data.username
                                                    },
                                                    ...datas.slice(index + 1)
                                                ])
                                                save({
                                                    id: data.id,
                                                    type: data.type,
                                                    key: event.target.value,
                                                    value: data.value,
                                                    callback: data.callback,
                                                    username: data.username
                                                })
                                            }} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <MDInput name="value" label="value" variant="standard" value={data.value} fullWidth onChange={(event) => {
                                                setDatas([
                                                    ...datas.slice(0, index),
                                                    {
                                                        id: data.id,
                                                        type: data.type,
                                                        key: data.key,
                                                        value: event.target.value,
                                                        callback: data.callback,
                                                        username: data.username
                                                    },
                                                    ...datas.slice(index + 1)
                                                ])
                                                save({
                                                    id: data.id,
                                                    type: data.type,
                                                    key: data.key,
                                                    value: event.target.value,
                                                    callback: data.callback,
                                                    username: data.username
                                                })
                                            }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <MDInput name="to" label="to" variant="standard" value={data.callback} fullWidth onChange={(event) => {
                                                setDatas([
                                                    ...datas.slice(0, index),
                                                    {
                                                        id: data.id,
                                                        type: data.type,
                                                        key: data.key,
                                                        value: data.value,
                                                        callback: event.target.value,
                                                        username: data.username
                                                    },
                                                    ...datas.slice(index + 1)
                                                ])
                                                save({
                                                    id: data.id,
                                                    type: data.type,
                                                    key: data.key,
                                                    value: data.value,
                                                    callback: event.target.value,
                                                    username: data.username
                                                })
                                            }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    style={{ display: 'flex', 'justifyContent': 'space-around' }}
                                                    value={data.type}
                                                    onChange={async (event) => {
                                                        await setDatas([
                                                            ...datas.slice(0, index),
                                                            {
                                                                id: data.id,
                                                                type: parseInt(event.target.value),
                                                                key: data.key,
                                                                value: data.value,
                                                                callback: data.callback,
                                                                username: data.username
                                                            },
                                                            ...datas.slice(index + 1)
                                                        ])
                                                        save({
                                                            id: data.id,
                                                            type: parseInt(event.target.value),
                                                            key: data.key,
                                                            value: data.value,
                                                            callback: data.callback,
                                                            username: data.username
                                                        })
                                                    }}
                                                >
                                                    <FormControlLabel value={1} control={<Radio />} label="Key" />
                                                    <FormControlLabel value={2} control={<Radio />} label="Value" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <MDButton onClick={() => deleteClick(data.id)} color='error'>ลบ</MDButton>
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                        </MDBox>
                        <MDButton className='btn-right' style={{ 'margin-right': '5px' }} size='large' variant="contained" color="warning" onClick={() => newFormClick()}>
                            New
                        </MDButton>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    )
}

export default Index