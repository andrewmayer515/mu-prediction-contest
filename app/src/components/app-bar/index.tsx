import React, { useState, ChangeEvent } from 'react';
import ky from 'ky';
import { useFormContext } from 'react-hook-form';
import shallow from 'zustand/shallow';

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

import { newPostText, demoData, getResult } from './helpers';
import { useAppStore } from '../../store';

import type { BoxscoreRecord } from './helpers';

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

type TotalsResponse = {
  data: string;
};

type ResultsResponse = {
  data: string;
};

type BoxscoreResponse = {
  data: Array<BoxscoreRecord>;
};

function AppBar() {
  const { results, setResults, setLoading } = useAppStore(
    (state) => ({
      results: state.results,
      setResults: state.setResults,
      setLoading: state.setLoading,
    }),
    shallow
  );
  const { setValue } = useFormContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isModal, setModalOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');

  const handleNewPost = () => {
    setIsDrawerOpen(false);
    setResults(newPostText);
  };

  const handleAddTotals = async () => {
    setIsDrawerOpen(false);
    const { data }: TotalsResponse = await ky
      .post('/api/totals', { json: results })
      .json();
    setResults(data);
  };

  const handleDemo = async () => {
    setIsDrawerOpen(false);
    setLoading(true);
    try {
      const data = await ky.post('/api/results', { json: demoData }).text();
      setResults(data);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    setLoading(false);
  };

  const handlePopulateResults = async () => {
    setModalOpen(false);
    setLoading(true);

    try {
      const { data }: BoxscoreResponse = await ky
        .get('/api/boxscore', {
          searchParams: { url },
        })
        .json();

      // Overwrite React Hook Form values
      setValue('1.number', getResult(data[0]));
      setValue('2.number', getResult(data[1]));
      setValue('3.number', getResult(data[2]));
      setValue('4.number', getResult(data[3]));
      setValue('5.number', getResult(data[4]));
      setValue('6.number', getResult(data[5]));
      setValue('7.number', getResult(data[6], 'number'));
      setValue('7.player', getResult(data[6], 'player'));
      setValue('8.number', getResult(data[7], 'number'));
      setValue('8.player', getResult(data[7], 'player'));
      setValue('9.number', getResult(data[8], 'number'));
      setValue('9.player', getResult(data[8], 'player'));
      setValue('10.number', getResult(data[9], 'number'));
      setValue('10.player', getResult(data[9], 'player'));

      setResults('');
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
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
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
