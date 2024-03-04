import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export default function BackDropLoader({ opener }) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={opener}
        // onClick={}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}
