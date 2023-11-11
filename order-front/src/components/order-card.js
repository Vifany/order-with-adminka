import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import pict from '../static/pict.jpg'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Stack } from '@mui/material';
import InputMask from'react-input-mask';


export default function OrderCard(){

  let [naem, setNaem] = React.useState("");
  let [phone, setPhone] = React.useState("");
  let [wrongP, setWrongP] = React.useState(false);

  function handlePhone(e){
    setPhone(e.target.value);
    if (phone.length == 16){
      setWrongP(false)
    } else {setWrongP(true)};

  };

  function handleNameChange(e){
    setNaem(e.target.value);
  };

  return(
    <Card sx={{ display: 'flex', width: 'auto', maxHeight: '68vh', minHeight:'16em'}}>
      <Box>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent:'center',
          height: '100%'
        }}
      >
        <Stack
        alignItems="left" 
        justifyContent="center"
        
        >
        <FormControl sx={{ m: 1, width: '19em' }} variant="filled">
          <InputMask
          mask='+7(999)999-99-99'
          value={phone}
          disabled={false}
          maskChar=""
          onChange={handlePhone}
          >
            {() => 
              <OutlinedInput
                size = 'small'
                id="filled-adornment-weight"
                aria-describedby="filled-weight-helper-text"
                error = {wrongP}
                inputProps={{
                  'aria-label': 'телефон',
                  
                }}
              />
            }
            </InputMask>
            <FormHelperText id="filled-weight-helper-text">Tелефон</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '19em' }} variant="filled">
            <OutlinedInput
              size = 'small'
              aria-describedby="filled-weight-helper-text"
              endAdornment={<InputAdornment position="end">{naem.length}/30</InputAdornment>}
              inputProps={{
                'aria-label': 'имя',
                maxLength: 30
              }}
              value = {naem}
              defaultValue=''
              onChange ={handleNameChange}
            />
            <FormHelperText id="filled-weight-helper-text">Имя</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '19em' }} variant="filled">
            <OutlinedInput
              type="email"
              size = 'small'
              inputProps={{
                'aria-label': 'Электронная почта',
              }}
            />
            <FormHelperText id="filled-weight-helper-text">Электронная почта</FormHelperText>
          </FormControl>
          </Stack>
        </CardContent>
        </Box>
        <CardMedia
          component="img"
          image={pict}
          alt="landscape"
          
          style = {{
            maxWidth: '62%',
            height: 'auto',
            oveflow: ''
          }}
        />
    </Card>
  ) 
}