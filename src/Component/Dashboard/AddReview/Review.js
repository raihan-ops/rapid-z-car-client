import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import useAuth from '../../../Hooks/Auth/useAuth';
import { RunCircle } from '@mui/icons-material';

let count=0;


const saveReview=(review,method)=>{
        
    fetch('https://fast-sea-90623.herokuapp.com/reviews', {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(review)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                
             count=1;
               
               
            }
        });
}

const Review = () => {
    const {user}=useAuth();
    const [value, setValue] = React.useState(0);

    const addreview={
        email:user.email,
        name:user.displayName,
        review:value
    }

   
    if(value===0){
        // saveReview(addreview,'POST');
    }
    else{
        saveReview(addreview,'PUT');
    }

    

   





    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
               
            }}
        >
            <Typography component="legend">Give your Review About this Website !!!!</Typography>
            <Rating
                name="simple-controlled"
                
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    

                }}
            />
            
        </Box>
    );
};

export default Review;