import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../CarImage/car1.jpg';
import './Banner.css'

const Banner = () => {
    return (
        <Container className="cm-div">
            <Grid container spacing={2}>
                <Grid sx={{justifyContent: 'center', alignItems: 'center'}} className="wellcome" item xs={12} md={6}>
                <Typography variant="h3" component="div" >
                        Wellcome To our Shop
                    </Typography>
                    <Link to='/allcar' style={{ textDecoration: 'none' }}>
                    <Button variant="contained" >Explore</Button>
                    </Link>
                    
                </Grid>
                <Grid item xs={12} md={6}>
                <img src={img1} alt="" />
                    
                </Grid>


            </Grid>
        </Container>
    );
};

export default Banner;