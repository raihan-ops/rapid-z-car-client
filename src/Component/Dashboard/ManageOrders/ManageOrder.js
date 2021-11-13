import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, red } from '@mui/material/colors';
import AddTaskIcon from '@mui/icons-material/AddTask';



const ManageOrder = () => {
    const [allorder, setAllorder] = useState([]);
    const [ok, setOk] = useState('');
    useEffect(() => {
        fetch('https://fast-sea-90623.herokuapp.com/orderlist')
            .then(res => res.json())
            .then(data => setAllorder(data))
    }, [ok])


    // single item delete
    const handleSingleDelete = (id) => {
        const procced = window.confirm('Are you want to Delete');
        if (procced) {
            const url = `https://fast-sea-90623.herokuapp.com/carlist/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("deleted");
                        const remaningUsers = allorder.filter(user => user._id !== id);
                        setAllorder(remaningUsers);
                    }
                })
        }



    }

    // status update
   


    const handleSatusUpdate = (id) => {
        const procced = window.confirm('Are you want to Update');
        const status = { status: "success" };

        if (procced) {
            const url = `https://fast-sea-90623.herokuapp.com/orderlist/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {

                    'content-type': 'application/json'
                },
                body: JSON.stringify(status)
            })
                .then(res => res.json())
                .then(data => {
                    setOk(data.status)
                })
        }
    }
    return (
        <div>
            <h1>Manage Order</h1>

            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Car Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                            <TableCell align="right">Action Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allorder.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.UserName}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.CarName}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => { handleSingleDelete(row._id) }}>
                                        <DeleteIcon sx={{ color: red[500] }}></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => { handleSatusUpdate(row._id) }}>
                                        <AddTaskIcon sx={{ color: green[500] }}></AddTaskIcon>
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

export default ManageOrder;