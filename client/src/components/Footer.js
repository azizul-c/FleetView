import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => (
    <Box
        component="footer"
        sx={{
            bgcolor: 'rgba(10,12,20,0.85)',
            color: '#fff',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18), 0 1.5px 12px 0 rgba(0,0,0,0.10)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            width: '100vw',
            left: 0,
            right: 0,
            zIndex: 10,
            fontFamily: 'Poppins, sans-serif',
            px: '200px',
            pt: '70px',
            pb: '0px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}
    >
        {/* Top row: links left, credits right */}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            {/* Links stacked on the left */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontWeight: 500, fontSize: 17, fontFamily: 'Poppins, sans-serif' }}>Home</Link>
                <Link to="/about" style={{ textDecoration: 'none', color: '#fff', fontWeight: 500, fontSize: 17, fontFamily: 'Poppins, sans-serif' }}>About</Link>
            </Box>
            {/* Credits right-aligned */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                <Typography sx={{ fontSize: 17, color: '#fff', fontFamily: 'Poppins, sans-serif', mb: 0.5 }}>
                    Created by Azizul Haque Chowdhury
                </Typography>
                <Typography sx={{ fontSize: 17, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                    Visit <a href="https://azizul.me" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>azizul.me</a>
                </Typography>
            </Box>
        </Box>
        {/* More visible horizontal line */}
        <Box sx={{ width: '100%', borderBottom: '1px solid #bbb4', my: 3 }} />
        {/* Logo and title below the line, right-aligned */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, justifyContent: 'flex-end', width: '100%' }}>
            <img
                src="/FleetView_logo.png"
                alt="FleetView Logo"
                style={{ height: '3.5rem', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
            <Typography sx={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#fff', fontSize: '2rem', ml: 1 }}>
                FleetView
            </Typography>
        </Box>
    </Box>
);

export default Footer; 