import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';


const CarCard = (props) => {
  const { name, image, details,_id } = props.car;
  return (
    <Grid item xs={2} sm={4} md={4} >
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {details.slice(0,100)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <NavLink to={`details/${_id}`} style={{ textDecoration: 'none' }} >
            <Button  size="small" variant="contained" color="primary">
              Parchase
            </Button>
          </NavLink>

        </CardActions>
      </Card>
    </Grid>

  );
};

export default CarCard;