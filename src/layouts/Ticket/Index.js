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

import { Link } from 'react-router-dom';

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
import { useEffect, useState } from 'react';
import axios from 'axios';

function Ticket() {
    const [datas, setDatas] = useState([])

    const columns = [
        { Header: "Station", accessor: "station", width: "45%", align: "left" },
        { Header: "Ref NO.", accessor: "ref_no", align: "center" },
        { Header: "Status", accessor: "status", align: "center" },
        { Header: "Tecnician", accessor: "user", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
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
            action: <>
                <MDTypography className='m-1' component="a" href={`/ticket/detail/${data.station_id}`} variant="caption" color="text" fontWeight="medium">
                    Show
                </MDTypography>
            </>
        }

    ))

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/ticket/index`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                setDatas(result.data.ticket)
            } else {
                window.localStorage.removeItem('accessToken')
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
                        </Grid>
                        {datas?.length > 0 &&
                            <MDBox pt={3}>
                                <DataTable
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

export default Ticket;
