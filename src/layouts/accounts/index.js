import { Link } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import axios from 'axios';
import { useEffect, useState } from 'react';
import MDBadge from 'components/MDBadge';

const columns = [
  { Header: 'username', accessor: 'username', align: 'left' },
  { Header: 'role', accessor: 'role', align: 'center' },
  { Header: 'action', accessor: 'action', align: "right" }
];

function Accounts() {
  // const { columns, rows } = authorsTableData();
  const [datas, setDatas] = useState([])

  const deleteClick = (username) => {
    if (window.confirm(`DELETE ${username}`)) {
      axios.post(`${process.env.REACT_APP_API}/account/delete/${username}`, '', {
        headers: {
          'authorization': `token ${localStorage.getItem('accessToken')}`
        }
      })
        .then(() => setDatas(() => datas.filter(data => data.username != username)))
        .catch(() => {
          localStorage.removeItem('accessToken')
          window.location.href = '/'
        })
    }
  }

  const row = datas?.map(data => (
    {
      username: <MDTypography variant="button" fontWeight="medium">
        {data.username}
      </MDTypography>,
      role: <MDBox ml={-1}>
        <MDBadge badgeContent={data.role == 1 ? 'monitor' : 'maintainance'} color={data.role == 1 ? 'success' : 'warning'} variant="gradient" size="sm" />
      </MDBox>,
      action: <>
        <Link to={`/accounts/edit/${data.username}`}>
          <MDTypography className='m-1' component="a" href={`/accounts/edit/${data.username}`} variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        </Link>
        <MDTypography className='m-1' component="a" onClick={(event) => deleteClick(data.username)} variant="caption" color="text" fontWeight="medium">
          Delete
        </MDTypography>
      </>
    }
  ))
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API}/account/index`, '', {
      headers: {
        'authorization': `token ${localStorage.getItem('accessToken')}`
      }
    }).then(result => {
      setDatas(result.data.users)
    })
      .catch(() => {
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
                    Accounts
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

export default Accounts;
