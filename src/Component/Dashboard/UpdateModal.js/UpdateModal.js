import { Backdrop, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400, 
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateModal = ({openCarModal, handleCarModalClose,instance,setOk, setPurchaseSuccess}) => {
    
    const initialInfo = { name:instance.name,category:instance.category,details:instance.details, price:instance.price, review:instance.review, image:instance.image}
    const [carInfo, setCarInfo] = useState(initialInfo);
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...carInfo };
        newInfo[field] = value;
        setCarInfo(newInfo);
    }

    const handleOnsubmit=(e)=>{
        // collect data
        const updateData = {
            ...carInfo       
        }
       console.log(updateData);
        // send data to server
        fetch(`https://fast-sea-90623.herokuapp.com/cars/${instance._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount >0){
                    setOk(data)
                    setPurchaseSuccess(true)
                    handleCarModalClose();
                    
                }
            });

        e.preventDefault();
    }

    return (
       <>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCarModal}
        onClose={ handleCarModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={openCarModal}>
            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                {instance.name}
                </Typography>

                <form onSubmit={handleOnsubmit}>
                        <TextField
                           
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="name"
                            label="Car Name"
                            defaultValue={instance.name}
                            onBlur={handleOnBlur}
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="category"
                            defaultValue={instance.category}
                            onBlur={handleOnBlur}
                            label="Category"
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="details"
                            defaultValue={instance.details}
                            onBlur={handleOnBlur}
                            label="Details"
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="price"
                            defaultValue={instance.price}
                            onBlur={handleOnBlur}
                            label="Price"
                            size="small"
                        />
                        <TextField
                           
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="review"
                            defaultValue={instance.review}
                            onBlur={handleOnBlur}
                            label="Review"
                            size="small"
                        />

                        <TextField
                           
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="image"
                            defaultValue={instance.image}
                            onBlur={handleOnBlur}
                            label="Img URL"
                            size="small"
                        />

                        <Button type="submit" variant="outlined" sx={{ width: '90%', my: 2 }} color="warning">
                           Submit
                        </Button>
                    </form>
            </Box>
        </Fade>
    </Modal>


       </>
    );
};

export default UpdateModal;