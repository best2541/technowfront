import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Station from './Index';
import StationAdd from './StationAdd';

const StationRoutes = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Routes>
                <Route path='/*' element={<Station />} />
                <Route path='/add' element={<StationAdd />} />
            </Routes >
            <Footer />
        </DashboardLayout>
    )
}

export default StationRoutes