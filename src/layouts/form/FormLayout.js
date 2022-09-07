import React from 'react'
import Footer from 'examples/Footer';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Index from './Index';

function FormLayout() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Routes>
                <Route path='/*' element={<Index />} />
            </Routes >
            <Footer />
        </DashboardLayout>
    )
}

export default FormLayout