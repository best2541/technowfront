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
// import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Station() {
    const [datas, setDatas] = useState([])

    const deleteClick = (id) => {
        axios.post(`${process.env.REACT_APP_API}/station/delete/${id}`, '', {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        })
            .then(() => setDatas(() => datas.filter(data => data.id != id)))
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }
    const columns = [
        { Header: "Station", accessor: "station", width: "45%", align: "left" },
        { Header: "Url", accessor: "url", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
    ]

    const row = datas.map(data => (
        {
            station: < MDTypography variant="button" fontWeight="medium" >
                {data?.name}
            </MDTypography >,
            url: data?.url,
            action: <>
                <MDTypography className='m-1' component="a" href={`/station/edit/${data.id}`} variant="caption" color="text" fontWeight="medium">
                    Edit
                </MDTypography>
                <MDTypography className='m-1' component="a" onClick={(event) => deleteClick(data.id)} variant="caption" color="text" fontWeight="medium">
                    Delete
                </MDTypography>
            </>
        }

    ))

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/index`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                setDatas(result.data.stations)
            } else {
                window.localStorage.removeItem('accessToken')
            }
        }).catch(() => {
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
                                        Station
                                    </MDTypography>
                                </MDBox>
                            </Grid>

                            <Grid item xs={9}>
                                <Link to='add'>
                                    <MDButton className='btn-right' style={{ 'margin-right': '5px' }} size='large' variant="contained" color="warning">
                                        New
                                    </MDButton>
                                </Link>
                            </Grid>
                        </Grid>
                        {datas?.length > 0 &&
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows: row }}
                                    isSorted={false}
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

export default Station;
