import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Layout = () => {
    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <Box
            display={isNonMobile ? "flex" : "block"}
            width={"100%"}
            height={"100%"}
        >
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
            />

            <Box>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout