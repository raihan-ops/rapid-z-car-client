import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import useData from '../../../../Hooks/Auth/useData/useData';
import CarCard from '../Card/CarCard';


const Services = () => {
    const [cars, setCars] = useData();
    const newCars=cars.slice(0,6);
    return (
        <Container sx={{ m: 5 }}>
            <Typography variant="h5" component="div">
                Our Latest Car
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                
                {
                     newCars.map((car) => <CarCard car={car} key={car._id}></CarCard>)
                }
            </Grid>
            
        </Container>
    );
};

export default Services;