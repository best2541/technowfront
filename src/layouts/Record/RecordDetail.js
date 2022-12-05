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
import MDButton from 'components/MDButton';
import DataTable from "examples/Tables/DataTable";
import ReactExport from "react-export-excel-xlsx-fix";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const RecordDetail = () => {
    const [since, setSince] = useState({
        since: new Date(new Date().setDate(new Date().getDate() - 3)), to: new Date()
    })
    const [station, setStation] = useState([])
    const [callback, setCallback] = useState([])
    const [form, setForm] = useState([])
    const [headers, setHeaders] = useState([])
    const { id } = useParams()

    const demo = (headers).map(header => {
        const newName = form.filter(f => f.type == 1 && f.key == header)
        if (newName.length > 0)
            return { Header: newName[0]?.callback, accessor: header, align: 'center' }
        else
            return { Header: header, accessor: header, align: 'center' }
    })
    // const test = (headers).map((header, index) => {
    //     form.filter(f => f.type == 1 && f.key == header)
    //     if (index == 0) {
    //         return { Header: header, accessor: header, align: 'center' }
    //     }
    //     else
    //         return { Header: header, accessor: header, align: 'center' }
    // })
    demo.unshift({ Header: 'date', accessor: 'create_date', align: 'center' })
    // test.unshift({ Header: 'date', accessor: 'create_date', align: 'center' })

    const rows = callback.map(call => {
        const set = { create_date: new Date(call.create_date).toLocaleString('th'), ...JSON.parse(call?.callback) }
        // set.create_date = new Date(call.create_date).toLocaleString('th')
        Object.keys(set).map(s => {
            form.map(f => {
                if (f.type == 2 && f.key == s) {
                    set[s] = f.callback
                }
            })
        })
        return set
    }
    )

    let dataSet = [{ columns: [], data: [] }]
    demo.map(data => dataSet[0].columns.push(data.Header))
    rows.map((data) => {
        if (Object.keys(data) == 'create_date') {
            dataSet[0].data.unshift(Object.values(data))
        } else {
            console.log((data))
            dataSet[0].data.push(Object.values(data))
        }
    })
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}/record/detail/${id}`, { since: since.since, to: since.to }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(async result => {
            if (!result.data.err) {
                setHeaders(Object.keys(JSON?.parse(result.data.record[0]?.callback)))
                setCallback(result.data.record)
                setStation(result.data?.stations)
            }
        })
        axios.get(`${process.env.REACT_APP_API}/form/index`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => setForm(result.data.form))
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }, [since])

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
                        <MDBox pt={2} pb={3} px={3} style={{ 'color': 'white' }}>
                            <Grid container spacing={6}>
                                <Grid item xs={4}>
                                    <MDButton variant='text' href={`/station/edit/${id}`} fullWidth>Profile</MDButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <MDButton variant='text' href={`/ticket/detail/${id}`} fullWidth>Tickets</MDButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <ExcelFile element={<MDButton fullWidth>Download Data</MDButton>}>
                                        <ExcelSheet dataSet={dataSet} name="Organization" />
                                    </ExcelFile>
                                </Grid>
                            </Grid>
                            <div className='header'>
                                <div>
                                    <TextField
                                        id="datetime-local"
                                        label="since"
                                        type="datetime-local"
                                       // defaultValue={`${since.since?.getFullYear()}-${since.since?.getMonth() < 10 && '0'}${since.since?.getMonth()}-${since.since?.getDate() < 10 && '0'}${since.since?.getDate()}T${since.since?.getHours()}:${since.since?.getMinutes()}`}
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
                                        //defaultValue={`${since.to?.getFullYear()}-${since.to?.getMonth() < 10 && '0'}${since.to?.getMonth()}-${since.to?.getDate() < 10 && '0'}${since.to?.getDate()}T${since.to?.getHours()}:${since.to?.getMinutes()}`}
                                        onChange={(event) => setSince({ ...since, to: event.target.value })}
                                        sx={{ width: 250 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <DataTable
                                table={{ columns: demo, rows: rows }}
                                isSorted={false}
                                entriesPerPage={{ defaultValue: 5, entries: [5] }}
                                showTotalEntries={false}
                                checkboxSelection
                                noEndBorder
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox >
    )
}

export default RecordDetail
