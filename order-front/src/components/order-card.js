import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import pict from '../static/pict.jpg'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Stack } from '@mui/material';
import InputMask from'react-input-mask';
import validator from 'validator';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


export default function OrderCard(){

  let [naem, setNaem] = React.useState("");
  let [wrongN, setWrongN] = React.useState(false)
  let [phone, setPhone] = React.useState("");
  let [wrongP, setWrongP] = React.useState(false);
  let [email, setEmail] = React.useState('');
  let [wrongE, setWrongE] = React.useState(false);



  function valNaem(){
    if (
        (validator.isAlpha((naem + ''),'ru-RU', {ignore:' -'}))
        ||
        (naem.length===0)
      ){
      setWrongN(false)
    } else{setWrongN(true)}
  };
  function valPhone(){
    if (
      (validator.isMobilePhone(phone + ''), 'ru-RU', {strictMode: true})
      &&
      (phone.length === 16)
      ){
      setWrongP(false)
    } else{setWrongP(true)};
  };

  function valEmail(){
    if (validator.isEmail(email + '')){
      setWrongE(false)
    } else{setWrongE(true)}
  };

  function handleEmail(e){
    setEmail(e.target.value);
    valEmail()
  }

  function handlePhone(e){
    setPhone(e.target.value);
    valPhone();
  };

  function handleNameChange(e){
    setNaem(e.target.value);
    valNaem();
  };

  function sendOrder(){

  };


  return(
    <Card 
      elevation={4}
      sx={{ 
        display: 'flex', 
        width: 'auto', 
        maxHeight: '68vh', 
        minHeight:'16em',
        boxShadow:25
      }}
      >
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
          onChange = {handlePhone}
          onBlur = {valPhone}
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
              error = {wrongN}
              onChange ={handleNameChange}
              onBlur = {valNaem}
            />
            <FormHelperText id="filled-weight-helper-text">Имя</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '19em' }} variant="filled">
            <OutlinedInput
              type="email"
              size = 'small'
              value = {email}
              onChange = {handleEmail}
              onBlur={valEmail}
              error = {wrongE}
              inputProps={{
                'aria-label': 'Электронная почта',
              }}
            />
            <FormHelperText id="filled-weight-helper-text">Электронная почта</FormHelperText>
          </FormControl>
          <Button 
            variant="contained" 
            endIcon={<ShoppingCartCheckoutIcon />}
            sx={{ 
              m: 1, 
              }}>
            Оплатить
          </Button>
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