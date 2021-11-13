import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/Auth/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

const CarList = () => {
    const { user,token } = useAuth();
    const [carList, setCarList]=useState([])

    useEffect(() => {
        const url = `https://fast-sea-90623.herokuapp.com/carlist?email=${user.email}`
        fetch(url,{
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setCarList(data));
    }, [])



    // single item delete
    const handleSingleDelete = (id) => {
        const procced = window.confirm('Are you want to Delete');
        if (procced) {
            const url = `http://localhost:5000/carlist/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("deleted");
                        const remaningUsers = carList.filter(user => user._id !== id);
                        setCarList(remaningUsers);
                    }
                })
        }



    }
    return (
        <div>
          <TableContainer component={Paper}>
                <Table sx={{}} aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{text:'bold'}}>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Car Name</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {carList.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.UserName}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.CarName}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => { handleSingleDelete(row._id) }}>
                                        <DeleteIcon sx={{ color: red[500] }}></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CarList;