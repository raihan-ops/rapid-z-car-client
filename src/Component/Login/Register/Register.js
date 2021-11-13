import { Alert, AlertTitle, Button, Container, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import useAuth from '../../../Hooks/Auth/useAuth';
import img from '../../../CarImage/login.png'

const Register = () => {
    const { user, registerUser, isLoading, authError } = useAuth()
    const [createData, setCreateData] = useState({});
    const history = useHistory();

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...createData };
        newLoginData[field] = value;

        setCreateData(newLoginData);

    }
    const handleCreateForm = (e) => {
        if (createData.password !== createData.password2) {

            return;
        }
        registerUser(createData.email, createData.password, createData.name, history);
        e.preventDefault();
    }
    return (
        <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ m: 8 }} gutterBottom component="div">
                    Register
                </Typography>

                {
                    !isLoading &&
                    <form onSubmit={handleCreateForm}>
                        <TextField
                            sx={{ width: 1, m: 1 }}
                            id="standard-basic"
                            name="name"
                            type="text"
                            onBlur={handleOnBlur}
                            label="Your Name"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: 1, m: 1 }}
                            id="standard-basic"
                            name="email"
                            type="email"
                            onBlur={handleOnBlur}
                            label="Your Email"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: 1, m: 1 }}
                            id="standard-basic"
                            name="password"
                            onBlur={handleOnBlur}
                            type="password"
                            label="Your Password"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: 1, m: 1 }}
                            id="standard-basic"
                            name="password2"
                            onBlur={handleOnBlur}
                            type="password"
                            label="Confirm Your Password"
                            variant="standard"
                        />
                        <Button
                            sx={{ width: 1, mt: 2 }}
                            type="submit"
                            variant="contained"
                        >Submit</Button>
                        <NavLink style={{ textDecoration: 'none' }} to='/login'>
                            <Button sx={{ mt: 2 }} variant="text">Already Register? Please Login</Button>
                        </NavLink>
                    </form>
                }
                {
                    isLoading && <LinearProgress />
                }

                {
                    user?.email && <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Your Data are Register SuccessFully — <strong>check it out!</strong>
                    </Alert>
                }
                {
                    authError && <Alert variant="outlined" severity="error">
                       {authError}
                    </Alert>
                }

            </Grid>
            <Grid item xs={12} md={6}>
                <img src={img} width="100%" alt="" />
            </Grid>

        </Grid>
    </Container>
    );
};

export default Register;