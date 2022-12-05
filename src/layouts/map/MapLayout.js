import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Map from './Map';
import AccountAdd from '../accounts/AccountAdd';

const MapLayout = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Routes>
                <Route path='/*' element={<Map />} />
                <Route path='/add' element={<AccountAdd />} />
            </Routes >
            <Footer />
        </DashboardLayout>
    )
}

export default MapLayout