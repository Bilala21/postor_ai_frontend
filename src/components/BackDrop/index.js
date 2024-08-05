import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';


export const BackDrop = ({ open, ...rest }) => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: 111 }} {...rest} open={open}>
            <CircularProgress color='inherit' />
        </Backdrop>
    );
};
