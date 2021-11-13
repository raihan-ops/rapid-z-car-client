
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
    return (
        <div>
            <div className="cm-body">
                <div><h1 className="notfound">404</h1></div>
                <div>
                    <h3>Oops! This Page Could Not Be Found
                    </h3>
                </div>
                <div>
                    <p>SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN REMOVED. NAME CHANGED OR IS TEMPORARILY UNAVAILABLE</p>
                </div>
                <div>
                    <Link to="/home" style={{ textDecoration: 'none' }}>

                        <Button variant="contained">Go To Homepage</Button>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default NotFound;