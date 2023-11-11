import React from 'react';
import OrderCard from './order-card';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';



export default function MainPage(){
  let [doneOpen, setDone] = React.useState(false);
  let [errOpen, setErr] = React.useState(false);


  return(
    <div>
      <Collapse in={errOpen}>
        <Alert 
          severity="error"
          onClick={()=>setErr(false)}
            action = {
              <Button
              onClick={()=>setErr(false)}
            >
              Понятно
            </Button>
            }
              
        >
          Что-то пошло не так, попробуйте позже.
        </Alert>  
      </Collapse> 
      <Collapse
        in={doneOpen}
      >
        <Alert 
          severity="success"
          onClick={()=>setDone(false)}
          action = {
            <Button
            onClick={()=>setDone(false)}
            >
              Понятно
            </Button>
          }
          >
          Заказ успешно зарегистрирован!
        </Alert>
      </Collapse>
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
            <OrderCard 
              done = {setDone}
              err = {setErr}
            />
          </div>
      </Stack>
    </div>
    </div>
  )
};