import React from 'react';
import Banner from '../Banner/Banner';
import CustomerReview from '../CustomerReview/CustomerReview';
import Services from '../Services/Services/Services';
import { Container, Grid, Typography } from '@mui/material';
import TopBand from '../TopBand/TopBand';

const Home = () => {
    return (
        <Container>
           <Banner></Banner>
           <Services></Services>

           <h5>Customer Review</h5>
           <CustomerReview></CustomerReview>

           <h3 >Top Brand</h3>
           <TopBand></TopBand>
            
        </Container>
    );
};

export default Home;