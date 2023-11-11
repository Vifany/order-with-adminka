import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia, Typography } from '@mui/material';
import pict from '../static/pict.jpg'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {FormLabel} from '@mui/material';
import { Stack } from '@mui/material';
import InputMask from'react-input-mask';
import {InputLabel} from '@mui/material';
import validator from 'validator';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import axios from 'axios';

let api_url = 'http://127.0.0.1:8000/add_order'


export default function OrderCard(props){
  let [unchanged, setChanged] = React.useState(true)
  let [naem, setNaem] = React.useState("");
  let [wrongN, setWrongN] = React.useState(false)
  let [phone, setPhone] = React.useState("");
  let [wrongP, setWrongP] = React.useState(false);
  let [email, setEmail] = React.useState('');
  let [wrongE, setWrongE] = React.useState(false);


  async function  valNaem(){
    if (
        (validator.isAlpha((naem + ''),'ru-RU', {ignore:' -'}))
        ||
        (naem.length===0)
      ){
      setWrongN(false)
    } else{setWrongN(true)};
    setChanged(false);
  };
  async function valPhone(){
    if (
      (validator.isMobilePhone(phone + ''), 'ru-RU', {strictMode: true})
      &&
      (phone.length === 16)
      ){
      setWrongP(false)
    } else{setWrongP(true)};
    setChanged(false);
  };

  async function valEmail(){
    if (validator.isEmail(email + '')){
      setWrongE(false)
    } else{setWrongE(true)};
    setChanged(false);
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

  async function sendOrder(){

    if (wrongE||wrongN||wrongP||unchanged){
      props.err(true);
      return;
    }
    else{
      await axios.post(api_url,{
        "name": naem,
        "phone": phone,
        "email": email 
      }).then((response)=>{
          if (response.status == 201){ 
            props.done(true);
            setNaem('');
            setPhone('');
            setEmail('');

          }
        }).catch(function (error) {
          console.log(error);
          props.err(true);
        })
    };
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
        <FormControl sx={{width: '19em' }} variant="filled">
          <FormLabel
              size = 'small'
            >
              Tелефон
          </FormLabel>
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
                error = {wrongP}
                inputProps={{
                  'aria-label': 'телефон',
                  
                }}
              />
            }
            </InputMask>
                <FormHelperText
                sx={{
                  display:
                  (wrongP ? "block":"none")
                }}
                error  
                >
                  Введите правильный номер телефона
                </FormHelperText>
          </FormControl>
          <FormControl sx={{ width: '19em' }} variant="filled">
            <FormLabel
              variant = 'outlined'
            >
              Имя
            </FormLabel>
            <OutlinedInput
              size = 'small'
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
            <FormHelperText
              error 
              sx={{
                display:
                (wrongN ? "block":"none")
              }}
            >
              В имени могут содержаться только буквы, дефисы и пробелы
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ width: '19em' }} variant="filled">
            <FormLabel
              size = 'small'
            >
              Электронная почта
            </FormLabel>
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
            <FormHelperText
              error 
              sx={{
                display:
                (wrongE ? "block":"none")
              }}
            >
              Введите корректный адрес электронной почты
            </FormHelperText>
          </FormControl>
          <Button 
            variant="contained" 
            onClick={sendOrder}
            endIcon={<ShoppingCartCheckoutIcon />}
            sx={{ 
              m: 1, 
              }}>
            Оплатить
          </Button>
          </Stack>
        </CardContent>
        </Box>
        <div style={{
          position: 'relative',
          maxWidth: '68%',
          height: 'auto',
          overflow:"clip"
          }} >
          <CardMedia
            component="img"
            image={pict}
            alt="landscape"
            
            style = {{
              maxWidth: 'auto',
              height: '100%',
            }}
          />
          <Typography   
          textAlign={'center'}        
          sx={{
            position: 'absolute',
            bottom: 8, 
            left: '50%', 
            transform: 'translateX(-50%)',
            color: '#CEDFF3',
          }}
          >
          Image by<br/>
          <a 
            href="https://www.freepik.com/free-vector/watercolor-adventure-background_16921981.htm#query=watercolor%20landscape&position=28&from_view=keyword&track=ais"
          style={{
            color:'cyan'
          }}
          >
            Freepik
          </a>
          </Typography>
        </div>
    </Card>
  ) 
}