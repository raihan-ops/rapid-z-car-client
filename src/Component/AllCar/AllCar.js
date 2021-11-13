import { Container, Grid } from '@mui/material';
import React from 'react';
import useData from '../../Hooks/Auth/useData/useData';
import CarCard from '../Home/Services/Card/CarCard';

const AllCar = () => {
    const [cars, setCars] = useData();
    return (
        <Container sx={{mt:10,mb:10}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                
                {
                     cars.map((car) => <CarCard car={car} key={car._id}></CarCard>)
                }
            </Grid>
        </Container>
    );
};

export default AllCar;