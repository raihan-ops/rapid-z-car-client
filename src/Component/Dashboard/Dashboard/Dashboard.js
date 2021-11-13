import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import { Button, Grid, ListItemButton } from '@mui/material';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import AdminRoute from '../../../AdminRoute/AdminRoute';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import DashboardHome from '../DashBoardHome/DashboardHome';
import AddCar from '../AddCar/AddCar';
import useAuth from '../../../Hooks/Auth/useAuth';
import CarList from '../CarList/CarList';
import { green, grey, pink, yellow } from '@mui/material/colors';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import ManageOrder from '../ManageOrders/ManageOrder';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ManageCars from '../ManegeCars/ManageCars';
import Review from '../AddReview/Review';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Payment from '../Payment/Payment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';



const drawerWidth = 240;

const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { admin,logout } = useAuth();

    let { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                
            </Toolbar>
            <Divider />

            


            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to={`${url}`}>
                        <ListItemIcon>
                        <DashboardIcon  sx={{ color: green[500] }}></DashboardIcon>
                        </ListItemIcon>
                        <ListItemText primary="DashBoard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/home">
                        <ListItemIcon>
                        <HomeIcon sx={{ color: pink[500] }} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to={`${url}/review`}>
                    <ListItemIcon>
                        <ReviewsIcon sx={{ color: yellow[500] }}></ReviewsIcon>
                        </ListItemIcon>
                        <ListItemText primary="Add Review" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to={`${url}/payment`}>
                    <ListItemIcon>
                        <MonetizationOnIcon sx={{ color: grey[500] }}></MonetizationOnIcon>
                        </ListItemIcon>
                        <ListItemText primary="Payment" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={logout} >
                    <ListItemIcon >
                        <LogoutIcon></LogoutIcon>
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
                
           

            {
                admin && <List>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`${url}/makeAdmin`}>
                            <ListItemIcon>
                            <AdminPanelSettingsIcon color="secondary"></AdminPanelSettingsIcon>
                            </ListItemIcon>
                            <ListItemText primary="Make Admin" />
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`${url}/addCar`}>
                            <ListItemIcon>
                            <AddCircleIcon color="primary"></AddCircleIcon>
                            </ListItemIcon>
                            <ListItemText primary="Add Car" />
                        </ListItemButton>                      
                    </ListItem>
                    
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`${url}/manageOrder`}>
                            <ListItemIcon>
                            <SettingsApplicationsIcon></SettingsApplicationsIcon>
                            </ListItemIcon>
                            <ListItemText primary="Manage Order" />
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`${url}/manageCar`}>
                            <ListItemIcon>
                            <SettingsApplicationsIcon></SettingsApplicationsIcon>
                            </ListItemIcon>
                            <ListItemText primary="Manage Cars" />
                        </ListItemButton>                      
                    </ListItem>

                    

                </List>
            }

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                 position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography  variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>
                    <Route exact path={path}>
                        <DashboardHome></DashboardHome>
                    </Route>

                    <Route exact path={path}>
                        <CarList></CarList>
                    </Route>

                    <Route path={`${url}/review`}>
                        <Review></Review>
                    </Route>
                    <Route path={`${url}/payment`}>
                        <Payment></Payment>
                    </Route>
                   

                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute path={`${path}/addCar`}>
                        <AddCar></AddCar>
                    </AdminRoute>

                    <AdminRoute path={`${path}/manageOrder`}>
                        <ManageOrder></ManageOrder>
                    </AdminRoute>

                    <AdminRoute path={`${path}/manageCar`}>
                        <ManageCars></ManageCars>
                    </AdminRoute>
                </Switch>

            </Box>
        </Box>
    );
};

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;