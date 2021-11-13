import { Grid, Typography } from '@mui/material';
import React from 'react';
import bmw from '../../../CarImage/bmw.png'
import audi from '../../../CarImage/audi.png'
import marcedes from '../../../CarImage/marcedes.jpg'

const TopBand = () => {
    return (
        <Grid container spacing={2} sx={{mb:10}}>
            
        <Grid item xs={12} md={4}>
          <img src={bmw} alt="" width="80%" height="70%"/>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={audi} alt="" width="80%" height="70%" />
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={marcedes} alt="" width="80%" height="70%"/>
        </Grid>
        
      </Grid>
    );
};

export default TopBand;