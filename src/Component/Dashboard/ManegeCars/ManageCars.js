import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import UpdateModal from '../UpdateModal.js/UpdateModal';
import CustomizedSnackbars from '../../Shared/SnakBar/CustomizedSnackbars';

const ManageCars = () => {
    const [allCars, setAllCars] = useState([]);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [ok, setOk] = useState({});
    useEffect(() => {
        fetch('https://fast-sea-90623.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setAllCars(data))
    }, [ok,allCars])

    // delete cars
    const  handleSingleDelete=(id)=>{
        const procced = window.confirm('Are you want to Delete');
        if (procced) {
            const url = `https://fast-sea-90623.herokuapp.com/cars/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("deleted");
                        const remaningUsers = allCars.filter(user => user._id !== id);
                        setAllCars(remaningUsers);
                    }
                })
        }

    }
    // cars update
    const [openCarModal, setOpenCarModal] = React.useState(false);
    const handleCarModalOpen = () => setOpenCarModal(true);
    const handleCarModalClose = () => setOpenCarModal(false);
    const [instance,setInstance]=useState({});

    const handleCarsUpdate = (data)=>{
        handleCarModalOpen();
        setInstance(data);
    }

    return (
        <div>
            <h1>Manage cars</h1>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Car Name</TableCell>
                            <TableCell align="right">Category</TableCell>                            
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Review</TableCell>
                            <TableCell align="right">Delete</TableCell>
                            <TableCell align="right">Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCars.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.category}</TableCell>                               
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.review}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => { handleSingleDelete(row._id) }}>
                                        <DeleteIcon sx={{ color: red[500] }}></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={ ()=> {handleCarsUpdate(row)} }>
                                       <UpdateIcon></UpdateIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                purchaseSuccess && <CustomizedSnackbars purchaseSuccess={purchaseSuccess} setPurchaseSuccess={setPurchaseSuccess}></CustomizedSnackbars>
            }

            <UpdateModal openCarModal={openCarModal} handleCarModalClose={handleCarModalClose} instance={instance} setOk={setOk} setPurchaseSuccess={setPurchaseSuccess}></UpdateModal>
        </div>
    );
};

export default ManageCars;