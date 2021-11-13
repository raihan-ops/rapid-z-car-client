import { Alert, AlertTitle, Button, Container, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink,useHistory,useLocation } from 'react-router-dom';
import useAuth from '../../../Hooks/Auth/useAuth';
import img from '../../../CarImage/login.png'

const Login = () => {
    const { signInUser,user,isLoading,authError,googleSignIn } = useAuth();

    const [loginData, setLoginData] = useState({});

    const location= useLocation();
    const history = useHistory();

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);

    }
    const handleLoginForm = (e) => {
        signInUser(loginData.email, loginData.password,location,history);
        e.preventDefault();
    }
    const handleGoogleSignIn=()=>{
        googleSignIn(location,history);
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ m: 8 }} gutterBottom component="div">
                        Login
                    </Typography>

                    {
                        !isLoading &&
                        <form onSubmit={handleLoginForm}>
                        <TextField sx={{ width: 1, m: 1 }} id="standard-basic" type="email" name="email" onBlur={handleOnChange} label="Your Email" variant="standard" />
                        <TextField sx={{ width: 1, m: 1 }} id="standard-basic" name="password" onBlur={handleOnChange} type="password" label="Your Password" variant="standard" />
                        <Button sx={{ width: 1, mt: 2 }} type="submit" variant="contained">Submit</Button>

                    </form>
                    }
                   
                    {
                        isLoading && <LinearProgress />
                    }

                    {
                        user?.email && <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                      You are Login SuccessFully — <strong>check it out!</strong>
                      </Alert>
                    }
                    {
                        authError && <Alert variant="outlined" severity="error">
                        This is an error alert — check it out!
                      </Alert>
                    }

                    <NavLink style={{ textDecoration: 'none' }} to='/register'>
                        <Button sx={{ mt: 2 }} variant="text">New User? Please Register</Button>
                    </NavLink>

                    <Button onClick={handleGoogleSignIn} sx={{ width: 1, mt: 2 }}  variant="contained">Google Sign In</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={img} width="100%" alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Login;