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

function Station() {
    const columns = [
        { Header: "Station", accessor: "station", width: "45%", align: "left" },
        { Header: "Address", accessor: "address", align: "left" },
        { Header: "Url", accessor: "url", align: "center" },
        // { Header: "employed", accessor: "employed", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
    ]
    const rows = [
        {
            station: (
                <MDTypography variant="button" fontWeight="medium">
                    name
                </MDTypography>
            ),
            address: '77/77 saimai',
            url: 'www.google.com',
            action: (
                <MDTypography component="a" href="/accounts/edit" variant="caption" color="text" fontWeight="medium">
                    Edit
                </MDTypography>
            )
        }
    ]

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
                        <MDBox pt={3}>
                            <DataTable
                                table={{ columns, rows }}
                                isSorted={false}
                                entriesPerPage={false}
                                showTotalEntries={false}
                                noEndBorder
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
            <ul class="pagination justify-content-center" style={{ "margin-top": "20px" }}>
                <li class="page-item"><a class="page-link" href="#">Back</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </MDBox>
    );
}

export default Station;
