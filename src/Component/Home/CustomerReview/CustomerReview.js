import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const CustomerReview = () => {
    const [value, setValue] = React.useState([]);

    useEffect(() => {
        fetch('https://fast-sea-90623.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setValue(data))
    }, [])

    return (
        <Container sx={{mb:10}}>
            {
                value.map((data) =>
                    <Box sx={{ '& > legend': { mt: 2 } }} >
                        <Typography component="legend">{data.name}</Typography>
                        <Rating name="read-only" value={data.review} readOnly />
                    </Box>
                )
            }
        </Container>
    );
};

export default CustomerReview;