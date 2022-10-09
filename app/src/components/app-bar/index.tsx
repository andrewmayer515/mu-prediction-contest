import React, { useState, useContext, ChangeEvent } from 'react';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';

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
import Divider from '@mui/material/Divider';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TableRowsIcon from '@mui/icons-material/TableRows';

import { ResultContext, LoadingContext } from '../../contexts';
import { newPostText, demoData } from './helpers';

//---------------------------------------------------------------------

const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//---------------------------------------------------------------------

function AppBar() {
  const { result, setResult } = useContext(ResultContext);
  const { setLoading } = useContext(LoadingContext);
  const { setValue } = useFormContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isModal, setModalOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  const handleNewPost = () => {
    setResult(newPostText);
  };

  const handleAddTotals = async () => {
    const { data } = await axios.post(
      'http://localhost:3000/api/totals',
      result
    );
    setResult(data);
  };

  const handleDemo = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/results',
        demoData
      );
      setResult(data);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    setLoading(false);
  };

  const handlePopulateResults = async () => {
    setModalOpen(false);
    setLoading(true);

    try {
      const { data } = await axios('http://localhost:3000/api/boxscore', {
        params: { url },
      });

      // Overwrite React Hook Form values
      setValue('1.number', data[0].result);
      setValue('2.number', data[1].result);
      setValue('3.number', data[2].result);
      setValue('4.number', data[3].result);
      setValue('5.number', data[4].result);
      setValue('6.number', data[5].result);
      setValue('7.number', data[6].result.number);
      setValue('7.player', data[6].result.player);
      setValue('8.number', data[7].result.number);
      setValue('8.player', data[7].result.player);
      setValue('9.number', data[8].result.number);
      setValue('9.player', data[8].result.player);
      setValue('10.number', data[9].result.number);
      setValue('10.player', data[9].result.player);

      setResult('');
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    setLoading(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const list = () => (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button key="new" onClick={handleNewPost}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="New post" />
        </ListItem>
        <ListItem button key="add" onClick={handleAddTotals}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add totals" />
        </ListItem>
        <ListItem button key="results" onClick={() => setModalOpen(true)}>
          <ListItemIcon>
            <TableRowsIcon />
          </ListItemIcon>
          <ListItemText primary="Import Boxscore" />
        </ListItem>
        <Divider />
        <ListItem button key="demo" onClick={handleDemo}>
          <ListItemIcon>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary="Demo" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
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
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </Toolbar>
        </AppBarComponent>
      </Box>
      <Modal
        open={isModal}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position="absolute">
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="gomarquette.com boxscore url"
            fullWidth
            onChange={handleOnChange}
            autoFocus
          />
          <Box>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={handlePopulateResults}
            >
              Enter
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

//---------------------------------------------------------------------

export default AppBar;
