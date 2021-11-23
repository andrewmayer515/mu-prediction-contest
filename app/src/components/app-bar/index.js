import React, { useState, useContext } from 'react';
import axios from 'axios';

import AppBarComponent from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DescriptionIcon from '@mui/icons-material/Description';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { ResultContext } from '../../contexts';
import { newPostText } from './helpers';

//---------------------------------------------------------------------

function AppBar() {
  const { result, setResult } = useContext(ResultContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleNewPost = () => {
    setResult(newPostText);
  };

  const handleAddTotals = async () => {
    const { data } = await axios.post('http://localhost:3000/api/totals', result);
    setResult(data);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="New post" onClick={handleNewPost}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="New post" />
        </ListItem>
        <ListItem button key="Add totals" onClick={handleAddTotals}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add totals" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarComponent position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MU Prediction Contest
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBarComponent>
    </Box>
  );
}

//---------------------------------------------------------------------

export default AppBar;
