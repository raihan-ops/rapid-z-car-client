import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import CustomizedSnackbars from '../../Shared/SnakBar/CustomizedSnackbars';

const AddCar = () => {
    const [carInfo, setCarInfo] = useState([]);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...carInfo };
        newInfo[field] = value;
        setCarInfo(newInfo);
    }
    const handleOnsubmit =(e)=>{
        // collect data
        const addCar = {
            ...carInfo,
                   
        }
        console.log(addCar);
        // send to the server
        const procced = window.confirm('Are you want to Add');

        if(procced){
            fetch('https://fast-sea-90623.herokuapp.com/cars', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addCar)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        
                        setPurchaseSuccess(true);
                       
                       
                    }
                });
        }
      
        e.preventDefault();
    }
    return (
        <div>
            <h1>Add Car</h1>
            <form onSubmit={handleOnsubmit}>
                        <TextField
                           
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="name"
                            label="Car Name"
                            onBlur={handleOnBlur}
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="category"
                            onBlur={handleOnBlur}
                            label="Category"
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="details"
                            onBlur={handleOnBlur}
                            label="Details"
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="price"
                            onBlur={handleOnBlur}
                            label="Price"
                            size="small"
                        />
                        <TextField
                           
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="review"
                            onBlur={handleOnBlur}
                            label="Review"
                            size="small"
                        />

                        <TextField
                           
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="image"
                            onBlur={handleOnBlur}
                            label="Img URL"
                            size="small"
                        />

                        <Button type="submit" variant="outlined" sx={{ width: '90%', my: 2 }} color="warning">
                           Submit
                        </Button>
                    </form>

                    {
                purchaseSuccess && <CustomizedSnackbars purchaseSuccess={purchaseSuccess} setPurchaseSuccess={setPurchaseSuccess}></CustomizedSnackbars>
            }
        </div>
    );
};

export default AddCar;