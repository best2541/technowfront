import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Accounts from '.';
import AccountAdd from './AccountAdd';
import AccountEdit from './AccountEdit';

const AccountLayout = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Routes>
                <Route path='/*' element={<Accounts />} />
                <Route path='/add' element={<AccountAdd />} />
                <Route path='/edit/:username' element={<AccountEdit />} />
            </Routes >
            <Footer />
        </DashboardLayout>
    )
}

export default AccountLayout