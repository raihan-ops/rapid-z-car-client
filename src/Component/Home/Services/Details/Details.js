import { autocompleteClasses, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CustomizedSnackbars from '../../../Shared/SnakBar/CustomizedSnackbars';
import PurchaseModal from '../PurchaseModal/PurchaseModal';

const Details = () => {
    const { carId } = useParams();
    const [carInfo, setCarInfo] = useState({});

    const [openPurchase, setOpenPurchase] = React.useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const handlePurchaseOpen = () => setOpenPurchase(true);
    const handlePurchaseClose = () => setOpenPurchase(false);

    useEffect(() => {
        const url = `https://fast-sea-90623.herokuapp.com/cars/${carId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCarInfo(data))
    }, [])
    return (
        <>
            {
                purchaseSuccess && <CustomizedSnackbars purchaseSuccess={purchaseSuccess} setPurchaseSuccess={setPurchaseSuccess}></CustomizedSnackbars>
            }
            <Grid container sx={{ m: 5 }}>

                <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="250"
                            image={carInfo.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {carInfo.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {carInfo.details}
                            </Typography>

                            <Button onClick={handlePurchaseOpen} variant="contained" size="small">
                                Confirm Purchase
                            </Button>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>


                    </CardActions>
                </Card>
            </Grid>

        <PurchaseModal openPurchase={openPurchase} handlePurchaseClose={handlePurchaseClose} carInfo={carInfo}  setPurchaseSuccess={setPurchaseSuccess}>

        </PurchaseModal>

        </>

    );
};

export default Details;