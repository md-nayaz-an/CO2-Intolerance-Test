import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Interaction from './components/interaction';
import Visuals from './components/visuals';
import { useState , useEffect} from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SplitContainer = styled(Grid) (({theme}) => ({
  height: '50%', // Set a default height
  width: '100%', // Set a default width

  [theme.breakpoints.up('md')]: {
    height: '100%', // Set height for medium screens and above
    width: '50%', // Set width for medium screens and above
  },
}));

export default function App () {

  const [inhaleExhaleData, setInhaleExhaleData] = useState([]);

  return (
    <Box sx={{ width: '100%', height:'100%'}}>
      <Grid style={{height: '100%', width: '100%'}} container spacing={5} rowSpacing={5}>
        <SplitContainer item xs={12} md={6}>
          <Item style={{height: '100%', width: '100%'}}>
            <Visuals
              inhaleExhaleData={inhaleExhaleData}
            />
          </Item>
        </SplitContainer>
        <SplitContainer item xs={12} md={6}>
          <Item style={{height: '100%', width: '100%'}}>
            <Interaction
              inhaleExhaleData={inhaleExhaleData}
              setInhaleExhaleData={setInhaleExhaleData}
            />
          </Item>
        </SplitContainer>
      </Grid>
    </Box>
  );
}