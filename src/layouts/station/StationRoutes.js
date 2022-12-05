import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Station from './Index';
import MaintainStationEdit from './MaintainStationEdit';
import StationAdd from './StationAdd';
import StationEdit from './StationEdit';

const StationRoutes = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Routes>
                <Route path='/*' element={<Station />} />
                <Route path='/add' element={<StationAdd />} />
                <Route path='/edit/:id' element={window.localStorage.getItem('role') == 1 ? <StationEdit /> : <MaintainStationEdit />} />
            </Routes >
            <Footer />
        </DashboardLayout>
    )
}

export default StationRoutes