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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import ReactExport from "react-export-excel-xlsx-fix";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function TicketDetail() {
    const [datas, setDatas] = useState([])
    const { id } = useParams()

    const columns = [
        { Header: "Ref NO.", accessor: "ref_no", align: "center" },
        { Header: "Status", accessor: "status", align: "center" },
        { Header: "Create", accessor: "create_date", align: "center" },
        { Header: "Pending", accessor: "pending_date", align: "center" },
        { Header: "Fixed", accessor: "fixed_date", align: "center" },
        { Header: "Tecnician", accessor: "user", align: "center" },
    ]

    const row = datas.map(data => (
        {
            station: < MDTypography variant="button" fontWeight="medium" component="a" href={`/station/edit/${data.station_id}`}>
                {data?.name}
            </MDTypography >,
            ref_no: < MDTypography variant="button" fontWeight="medium" >
                {data?.ref_no}
            </MDTypography>,
            status: <MDBox ml={-1}>
                <MDBadge badgeContent={data.status == 0 ? 'Close' : data.status == 1 ? 'Waiting' : data.status == 2 ? 'Pending' : data.status == 3 ? 'Fixed' : 'Close'} color={data.status == 0 ? 'success' : data.status == 3 ? 'warning' : 'error'} variant="gradient" size="sm" />
            </MDBox>,
            user: < MDTypography variant="button" fontWeight="medium" >
                {data?.user}
            </MDTypography>,
            create_date: < MDTypography variant="button" fontWeight="medium" >
                {new Date(data?.create_date).toLocaleString('th')}
            </MDTypography>,
            pending_date: < MDTypography variant="button" fontWeight="medium" >
                {new Date(data?.pending_date).toLocaleString('th')}
            </MDTypography>,
            fixed_date: < MDTypography variant="button" fontWeight="medium" >
                {new Date(data?.fixed_date).toLocaleString('th')}
            </MDTypography>
        }

    ))

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/ticket/log/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            console.log(result.data)
            if (!result.data.err) {
                setDatas(result.data.ticket)
            } else {
                window.localStorage.removeItem('accessToken')
            }
        })
        // .catch(() => {
        //     localStorage.removeItem('accessToken')
        //     window.location.href = '/'
        // })
    }, [])
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
                                        {datas.length > 0 && datas[0].name}
                                    </MDTypography>
                                </MDBox>
                            </Grid>
                            <Grid item xs={3}>
                                <MDButton variant='text' href={`/station/edit/${id}`} fullWidth>Profile</MDButton>
                            </Grid>
                            <Grid item xs={3}>
                                <MDButton variant='text' href={`/record/detail/${id}`} fullWidth>Record</MDButton>
                            </Grid>
                            <Grid item xs={3}>
                                <ExcelFile element={<MDButton>Download Data</MDButton>}>
                                    <ExcelSheet data={datas} name="Employees">
                                        <ExcelColumn label="Ref NO." value="ref_no" />
                                        <ExcelColumn label="Status"
                                            value={(col) => col.status == 1 ? "Waiting" : col.status == 2 ? "Pending" : col.status == 3 ? 'Fixed' : 'Close'} />
                                        <ExcelColumn label="Create Date" value={(col) => new Date(col.create_date).toLocaleDateString('th')} />
                                        <ExcelColumn label="Pending Date" value={(col) => new Date(col.pending_date).toLocaleDateString('th')} />
                                        <ExcelColumn label="Fixed Date" value={(col) => new Date(col.fixed_date).toLocaleDateString('th')} />
                                        <ExcelColumn label="Technician" value='user' />
                                    </ExcelSheet>
                                </ExcelFile>
                            </Grid>
                        </Grid>

                        {datas?.length > 0 &&
                            <MDBox pt={3}>
                                <DataTable
                                    id='datasTable'
                                    table={{ columns, rows: row }}
                                    isSorted={true}
                                    entriesPerPage={false}
                                    // showTotalEntries={false}
                                    checkboxSelection
                                    noEndBorder
                                />
                            </MDBox>
                        }
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    );
}

export default TicketDetail;
