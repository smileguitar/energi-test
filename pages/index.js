import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Copyright from '../src/Copyright';

let timer = null;
let fetching = false;
let fetchedBlocks = [];
function timeSince(date) {
  var seconds = Math.floor((new Date().getTime() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export default function Index() {
  const [isRunning, setRunning] = useState(false);
  const [blocks, setBlocks] = useState([]);
  
  const fetchLatestBlock = async () => {
    if (fetching) return;
    fetching = true;
    const response = await fetch('/api/getLatest');
    if (!response.ok) {
      console.log('error');
    } else {
      const data = await response.json();
      if (data.data !== fetchedBlocks[0]?.block) {
        fetchedBlocks = [{ block: data.data, time: new Date().getTime() }, ...fetchedBlocks].slice(0, 10);
        setBlocks(fetchedBlocks);
      }
    }
    fetching = false;
  }

  const startTimer = () => {
    setRunning(true);
    if (timer) clearTimeout(timer);

    timer = setInterval(() => {
        fetchLatestBlock();
    }, 3000);
  }

  const stopTimer = () => {
    clearTimeout(timer);
    setRunning(false);
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          The Ethereum Blockchain Explorer
        </Typography>
        {!isRunning && (
          <IconButton aria-label="start" onClick={startTimer}>
            <PlayCircleFilledWhiteIcon />
          </IconButton>
        )}
        {isRunning && (
          <IconButton aria-label="start" onClick={stopTimer}>
            <PauseCircleFilledIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {blocks.length === 0 && <Typography>No blocks</Typography>}
        {blocks.map(block => {
          return (
            <ListItem key={block.block}>
              <Link href={`/block/${block.block}`}>
                <ListItemText primary={block.block} secondary={timeSince(block.time)} />
              </Link>
            </ListItem>
          );
        })}
      </List>
      <Copyright />
    </Container>
  );
}
