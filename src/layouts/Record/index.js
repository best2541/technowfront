import { Link } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import axios from 'axios';
import { useEffect, useState } from 'react';
import MDBadge from 'components/MDBadge';

const columns = [
  { Header: 'name', accessor: 'name', align: 'left' },
  { Header: 'Alarm', accessor: 'role', align: 'center' },
  { Header: 'action', accessor: 'action', align: "right" }
];

function Record() {
  const [datas, setDatas] = useState([])

  const row = datas?.map(data => (
    {
      name: <MDTypography variant="button" fontWeight="medium">
        {data.name}
      </MDTypography>,
      role: <MDBox ml={-1}>
        <MDBadge badgeContent={data.status == '0' ? 'FINE' : 'ALERT'} color={data.status == '0' ? 'success' : 'error'} variant="gradient" size="sm" />
      </MDBox>,
      action: <>
        <Link to={`/record/detail/${data.id}`}>
          <MDTypography className='m-1' component="a" href={`/record/detail/${data.id}`} variant="caption" color="text" fontWeight="medium">
            Show
          </MDTypography>
        </Link>
      </>
    }
  ))
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/record/index`, {
      headers: {
        'authorization': `token ${localStorage.getItem('accessToken')}`
      }
    }).then(result => {
      setDatas(result.data.stations)
    })
      .catch((err) => {
        localStorage.removeItem('accessToken')
        window.location.href = '/'
      })
  }, []);
  // const { columns: pColumns, rows: pRows } = projectsTableData();

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
                    Records
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
            {datas.length > 0 &&
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: row }}
                  isSorted={false}
                  entriesPerPage={false}
                  // showTotalEntries={false}
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

export default Record;
