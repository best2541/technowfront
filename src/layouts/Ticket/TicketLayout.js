import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Ticket from './Index';
import TicketDetail from './TicketDetail';

const TicketLayout = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Routes>
                <Route path='/*' element={<Ticket />} />
                <Route path='/detail/:id' element={<TicketDetail />} />
            </Routes >
            <Footer />
        </DashboardLayout>
    )
}

export default TicketLayout