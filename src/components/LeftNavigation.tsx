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
                <ListItem button key={"Board"}>
                    <ListItemLink primary={"Your Board"} to={"/"} />
                </ListItem>
                <ListItem button key={"Backlog"}>
                    <ListItemLink primary={"Backlog"} to={"/backlog"} />
                </ListItem>
            </List>
        </Drawer>
    );
}
