import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,

} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import useAuth from '../../../Hooks/Auth/useAuth';
import './Header.css'

// IMPORTING ICONS




// LOCAL-STYLING
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },

}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const { user, logout } = useAuth();


  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar >
          <Toolbar>


            <Typography
              variant="h5"
              component="p"
              color="white"
              className={classes.title}
            >
              Car Shop
            </Typography>


            {isMobile ? (
              <>
                <IconButton
                  color="textPrimary"
                  className={classes.menuButton}
                  edge="start"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  KeepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                >


                  <MenuItem
                    onClick={() => setAnchor(null)}
                    component={Link}
                    to="/home"
                  >
                    <Typography variant="h6"> Home</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => setAnchor(null)}
                    component={Link}
                    to="/allcar"
                  >
                    <Typography variant="h6"> Cars</Typography>
                  </MenuItem>


                  <MenuItem
                    onClick={() => setAnchor(null)}
                    component={Link}
                    to="/dashboard"
                  >
                    <Typography variant="h6"> DashBoard </Typography>
                  </MenuItem>

                  <MenuItem       
                  >
                    <PersonIcon>
                    </PersonIcon>
                    <Typography>{user.displayName}</Typography>
                  </MenuItem>


                  {
                    user?.email ?
                      <Button onClick={logout} color="error"> log Out</Button> :

                      <MenuItem
                        onClick={() => setAnchor(null)}
                        component={Link}
                        to="/login"
                      >
                        <Typography variant="h6"> Login</Typography>
                      </MenuItem>

                  }



                  


                </Menu>


              </>
            ) : (
              <div style={{ marginRight: "2rem" }}>


                <Button
                  variant="text"
                  component={Link}
                  to="/home"
                  color="default"
                >
                  Home
                </Button>

                <Button
                  variant="text"
                  component={Link}
                  to="/allcar"
                  color="default"
                >
                 Cars
                </Button>


                <Button
                  variant="text"
                  component={Link}
                  to="/dashboard"
                  color="default"
                >

                  DashBoard
                </Button>


                <Button
                  variant="text"                
                  
                >
                  <PersonIcon>
                    </PersonIcon>
                    {
                    user.displayName
                  }
                  
                </Button>

                
                  
                


                {
                  user?.email ?
                    <Button onClick={logout} variant="outlined" color="error"> log Out</Button>
                    :
                    <Button
                      variant="text"
                      component={Link}
                      to="/login"
                      color="default"
                    >
                      Login
                    </Button>



                }

                




              </div>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};

export default Header;