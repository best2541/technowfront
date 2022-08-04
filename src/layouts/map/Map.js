import React from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
function Map() {

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
              <Grid item xs={12}>
                <MapContainer style={{ height: '500px', width: '100%' }} center={[12, 102]} zoom={5} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[12, 102]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                    <Popup>
                      ชลบุลี
                    </Popup>
                  </Marker>
                </MapContainer>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  )
}

export default Map