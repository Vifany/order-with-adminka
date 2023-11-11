import React from 'react';
import OrderCard from './order-card';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';



export default function MainPage(){

  return(
    <div
    style = {{
      dispaly: "flex",
      justifyContent: "center"
    }}
      >
      <Stack 
          alignItems="center" 
          justifyContent="center"
          postition = 'relative' 
          mt='2em' 
          mb ='1em'>
          <div
            style ={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <OrderCard />
          </div>
      </Stack>
    </div>
  )
};