import { Backdrop, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useAuth from '../../../../Hooks/Auth/useAuth';

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

const PurchaseModal = ({openPurchase,handlePurchaseClose,carInfo ,setPurchaseSuccess}) => {
    const {name,price,category}=carInfo ;
    const { user } = useAuth();
    const initialInfo = { UserName: user.displayName, email: user.email, phone: '' ,status:'pending'}
    const [PurchaseInfo, setPurchaseInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...PurchaseInfo };
        newInfo[field] = value;
        setPurchaseInfo(newInfo);
    }
    const handleOnsubmit =(e)=>{
        // collect data
        const purchase = {
            ...PurchaseInfo,
            category,
            CarName: name,
            price,
            
        }
        // send to the server
       fetch('https://fast-sea-90623.herokuapp.com/purchase', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(purchase)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                setPurchaseSuccess(true);
                handlePurchaseClose();
            }
        });
        e.preventDefault();
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openPurchase}
            onClose={handlePurchaseClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openPurchase}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {name}
                    </Typography>

                    <form onSubmit={handleOnsubmit}>
                        <TextField
                            disabled
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            defaultValue={category}
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="userName"
                            onBlur={handleOnBlur}
                            defaultValue={user.displayName}
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="email"
                            onBlur={handleOnBlur}
                            defaultValue={user.email}
                            size="small"
                        />
                        <TextField

                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            name="phone"
                            onBlur={handleOnBlur}
                            defaultValue="Your Phone"
                            size="small"
                        />
                        <TextField
                            disabled
                            sx={{ width: '90%', my: 2 }}
                            id="outlined-size-small"
                            defaultValue={price}
                            size="small"
                        />

                        <Button type="submit" variant="outlined" color="warning">
                           Submit
                        </Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default PurchaseModal;