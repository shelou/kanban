import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {forwardRef, useMemo} from "react";
import {Link as RouterLink, LinkProps as RouterLinkProps,} from 'react-router-dom';

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

export const ListItemLink = (props: ListItemLinkProps) => {
    const {icon, primary, to} = props;

    const renderLink = useMemo(
        () =>
            forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
                itemProps,
                ref,
            ) {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined}/>;
            }),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary}/>
            </ListItem>
        </li>
    );
}