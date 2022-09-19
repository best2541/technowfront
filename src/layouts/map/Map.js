import React, { useEffect, useState } from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Checkbox from '@mui/material/Checkbox';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
function Map() {
  const [datas, setDatas] = useState()
  const [working, setWorking] = useState(true)
  const [error, setError] = useState(true)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/map/index`, {
      headers: {
        'authorization': `token ${localStorage.getItem('accessToken')}`
      }
    }).then(result => {
      setDatas(result.data.stations)
    })
      .catch((err) => {
        localStorage.removeItem('accessToken')
        window.location.href = '/'
        console.log(err)
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
                    Map
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={9}>
                <Checkbox className='right-btn' checked={working} onClick={() => setWorking(!working)} /> <MDTypography variant="button">working</MDTypography> <Checkbox className='right-btn' checked={error} onClick={() => setError(!error)} /> <MDTypography variant="button">error</MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MapContainer style={{ height: '500px', width: '100%' }} center={[12, 102]} zoom={5} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {datas?.map(data => {
                    // const call = data?.callback && JSON?.parse(data.callback)
                    if (data.status == 1) {
                      if (error)
                        return (
                          <Marker position={[data.lati, data.long]} icon={new Icon({
                            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/585px-Google_Maps_pin.svg.png', iconSize: [25, 41], iconAnchor: [12, 41]
                          })}>
                            < Popup >
                              {data.name} < Link to={`/record/detail/${data.id}`
                              } > <a>click</a></Link>
                            </Popup>
                          </Marker>
                        )
                    } else {
                      if (working)
                        return (
                          <Marker position={[data.lati, data.long]} icon={new Icon({
                            iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]
                          })}>
                            < Popup >
                              {data.name} < Link to={`/record/detail/${data.id}`
                              } > <a>click</a></Link>
                            </Popup>
                          </Marker>
                        )
                    }
                  })}
                </MapContainer>
              </Grid>
            </Grid>
          </Card>
        </Grid >
      </Grid >
    </MDBox >
  )
}

export default Map