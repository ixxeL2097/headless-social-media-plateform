import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Box,
  Divider,
  InputBase,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
  
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    {
      text: 'Content',
      subItems: [
        { text: 'Create Post', link: '/content/create' },
        { text: 'My Posts', link: '/content/my-posts' },
        { text: 'Explore', link: '/content/explore' },
      ],
    },
    {
      text: 'Media',
      subItems: [
        { text: 'Upload Media', link: '/media/upload' },
        { text: 'My Media', link: '/media/my-media' },
      ],
    },
    { text: 'Logout', link: '/auth/logout' },
  ];

  const renderSubMenu = (subItems) => (
    <Box sx={{ pl: 2 }}>
      {subItems.map((subItem, index) => (
        <ListItem button key={index} component="a" href={subItem.link}>
          <ListItemText primary={subItem.text} />
        </ListItem>
      ))}
    </Box>
  );

  const renderMenuItems = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{ width: 250 }}>
      <List>
        {menuItems.map((item, index) =>
          item.subItems ? (
            <React.Fragment key={index}>
              <ListItem>
                <Typography variant="subtitle1">{item.text}</Typography>
              </ListItem>
              {renderSubMenu(item.subItems)}
              <Divider />
            </React.Fragment>
          ) : (
            <ListItem button key={index} component="a" href={item.link}>
              <ListItemText primary={item.text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger Icon */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          {/* Logo */}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Social Media
          </Typography>
          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          {/* Icons: Notifications and Profile */}
          <Box sx={{ display: 'flex' }}>
            <IconButton href='/notifications' size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              href='/profile'
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Drawer for Hamburger Menu */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {renderMenuItems()}
      </Drawer>
    </Box>
  );
};

export default Header;