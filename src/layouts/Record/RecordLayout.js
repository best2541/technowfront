import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Record from '.';
import RecordAdd from './RecordAdd';

const RecordLayout = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Routes>
                <Route path='/*' element={<Record />} />
                <Route path='/add' element={<RecordAdd />} />
                {/* <Route path='/edit/:username' element={<AccountEdit />} /> */}
            </Routes >
            <Footer />
        </DashboardLayout>
    )
}

export default RecordLayout