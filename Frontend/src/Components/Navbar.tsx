import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../Context/Auth/AuthContext';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { ShoppingCart } from '@mui/icons-material';

function Navbar() {
  //! test the auth context ================
  const auth = useAuth()
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    handleCloseUserMenu()
    auth?.logout()
    navigate('/')
  };
  //! print the token from navbar =============
  // console.log("from Navbar\n Name: ", auth?.userName, "\n token: ", auth?.token)

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.03rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Full-commerce
          </Typography>

          {!auth?.isAuthenticated ?
            <Button onClick={() => navigate('/login')} sx={{ backgroundColor: 'yellowgreen', textDecoration: "capitalize" }}>Login</Button> :
            <Box sx={{ flexGrow: 0 }}>

              

              <Grid sx={{ p: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Grid>
                <IconButton aria-label="show 4 unread messages" onClick={()=> navigate('/cart')}>
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCart sx={{color: 'white'}}/>
                  </Badge>
                </IconButton>
              </Grid>
                <Grid>
                  <Typography color='#fafafa'>{auth?.userName}</Typography>
                </Grid>

                <Grid>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={auth?.userName || ''} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>


              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              </Menu>

            </Box>}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
