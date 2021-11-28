import * as React from 'react';
import {Divider, Drawer, List, ListItem, Toolbar} from '@mui/material';
import {DRAWER_WIDTH} from "../utils/constants";
import {ListItemLink} from "./ListItemLink";

export default function LeftNavigation() {
    return (
        <Drawer
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar/>
            <Divider/>
            <List>
                    <ListItemLink primary={"Your Board"} to={"/"} />
                    <ListItemLink primary={"Backlog"} to={"/backlog"} />
            </List>
        </Drawer>
    );
}
