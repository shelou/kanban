import React from "react";
import {Box, CssBaseline, Toolbar} from "@mui/material";

// components
import LeftNavigation from "./LeftNavigation";
// constants
import Header from "./Header";
import {Outlet} from "react-router-dom";

// functional component
function Layout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <Header/>
            <LeftNavigation/>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar />
                <div/>
                <Outlet/>
            </Box>
        </Box>
    );
};

export default Layout;