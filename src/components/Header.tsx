import React from "react";

import {AppBar, Toolbar,} from "@mui/material";
import Typography from "@mui/material/Typography";
import {DRAWER_WIDTH} from "../utils/constants";

function Header() {
    return (
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        KanBan
                    </Typography>
                </Toolbar>
            </AppBar>
    );
};

export default Header;