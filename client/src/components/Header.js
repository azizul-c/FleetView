import { Link } from "react-router-dom";
import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

const Header = ({ title, user, onSignOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Try to get display name and profile pic from user metadata
  let displayName = user?.user_metadata?.name || user?.email;
  let profilePic = user?.user_metadata?.avatar_url;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'rgba(10,12,20,0.85)',
        color: '#fff',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18), 0 1.5px 12px 0 rgba(0,0,0,0.10)',
        borderRadius: '20px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        margin: '20px auto 0 auto',
        width: { xs: '98%', sm: '95%', md: '90%' },
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        fontFamily: 'Poppins, sans-serif',
        top: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 80, fontFamily: 'Poppins, sans-serif', color: '#fff', px: { xs: '30px', sm: '40px', md: '50px' } }}>
        {/* Left: App Title with Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src="/FleetView_logo.png"
            alt="FleetView Logo"
            style={{
              height: '40px',
              width: 'auto',
              filter: 'brightness(0) invert(1) saturate(0) brightness(100%)' // This ensures the logo is pure white
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#fff' }}>
            {title}
          </Typography>
        </Box>
        {/* Navigation Links */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 4,
            fontFamily: 'Poppins, sans-serif',
            ...(user && { marginRight: '10px' }),
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontWeight: 500, fontSize: 18, fontFamily: 'Poppins, sans-serif' }}>Home</Link>
          <Link to="/about" style={{ textDecoration: 'none', color: '#fff', fontWeight: 500, fontSize: 18, fontFamily: 'Poppins, sans-serif' }}>About</Link>
        </Box>
        {/* Right: User Profile Dropdown */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleMenu} size="large" sx={{ ml: 2, color: '#fff' }}>
                <Avatar src={profilePic} alt={displayName} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 220,
                  borderRadius: 2,
                  p: 1,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#000',
                  backgroundColor: '#fff',
                },
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                <Avatar src={profilePic} alt={displayName} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#000' }}>{displayName}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif', color: '#000' }}>{user.email}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={onSignOut} sx={{ color: 'error.main', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>Log Out</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
