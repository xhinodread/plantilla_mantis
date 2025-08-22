import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

import {mostrarError, verificarLogin, verificarTokenUser} from 'utils/utils.js'

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ isDemo = false }) {

  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(false);
  const [msgLogin, setMsgLogin] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const userRef = React.useRef();
  const passRef = React.useRef();
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const hacerLogin = async () => {
    console.log("hacerLogin Data IU");

    const apiUrl = import.meta.env.VITE_REMOTE_API1; // || 'https://localhost:7229' o una direccion IP ;
    const rutaApi = apiUrl+"/api/acceso/login"; // "http://localhost:5153/api/acceso/login"

    let usuario = {email: userRef.current.value, password: passRef.current.value};

    console.log(JSON.stringify(usuario))
    const response = await fetch(rutaApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(usuario)
    });
    
    console.log(response); 

    let jsonData
    if (!response.ok) {
      jsonData = await response.json();
      console.log("ERROOR ..... json Post login IU");
      console.log(jsonData);
      console.log(jsonData.title);
      console.log(JSON.stringify(jsonData.errors));
    } else {
      jsonData = await response.json();
      console.log("json respons Post login IU");
      console.log(jsonData);
      if (jsonData.isSuccess) {
        window.localStorage.setItem('token', JSON.stringify(jsonData.token))
        navigate('/dashboard/default');
      }else{
        console.log("Usuario o clave incorrectos...")
        setMsgLogin("Usuario o clave incorrectos...")
      }
    }

  }

  const verificarLogin_ = async ()=>{

    //alert("hacerLogin")
    const rutaApi = "http://localhost:5153/api/acceso/usuarios_db"; // "http://localhost:5153/api/acceso/login"
    const token = JSON.parse(window.localStorage.getItem('token'));
    //"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlbWFpbEBlbWlsLmNvbSIsImV4cCI6MTc1NTU1ODA5M30.KH3vnjFCFLWYNga3FZE-uSdprW1YcYgGg8hpF-S9UQs";
    const response = await fetch(rutaApi, 
                 {
                   method: 'GET',
                   headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                   }
                 }
              );

    console.log("verificarLogin token Data IU");
    console.log(response);   
    
    if(response.ok){
      const jsonData = await response.json();
  
      console.log("verificarLogin json Data IU");
      console.log(jsonData);
    }else{
      console.log("error del server...")
      console.log(response.statusText)
      mostrarError(response);
    }

  }

  const fetchDataIU = async (periodo = null) => {
    try {
      setDataIU(null);
      const var_periodo = periodo == null ? '' : '?periodo=' + periodo;
      const apiUrl = import.meta.env.VITE_REMOTE_API1; // || 'https://localhost:7229' o una direccion IP ;

      const token = "....token....."

      let response;
      if (apiUrl) {
        const rutaApi = apiUrl + '/ParametrosRemu/GetByPeriodo' + var_periodo;
        console.log("rutaApi")
        // console.log(rutaApi)
        response = await fetch(rutaApi,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' // Example: set content type for JSON data
            }
          }
        ); // Reemplazar con tu endpoint
      } else {
        //  response = await fetch('https://localhost:7229/ParametrosRemu/GetByPeriodo' + var_periodo); // Reemplazar con tu endpoint
      }

      const jsonData = await response.json();

      console.log("json Data IU");
      console.log(jsonData);

      if (jsonData.length > 0) {

        setDataIU(jsonData);
      }
    } catch (error) {
      // console.error('Error obteniendo data desde el servidor remoto:', error.message);
      mostrarError(error);
      setDataIU([]);
    }
  };

  const verificarToken=async ()=>{
    const resp = await verificarTokenUser();
    console.log("verificarToken");
    console.log(resp);
  }

  return (
    <>
      <Formik
        initialValues={{
          email: 'email@emil.com',
          password: 'abcd1234',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
            .max(10, 'Password must be less than 10 characters')
        })}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <form noValidate>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="email-login">Email requerido</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    inputRef={userRef} 
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={12}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    inputRef={passRef}
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid sx={{ mt: -1 }} size={12}>
                <Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              <Grid size={12}>
                <AnimateButton>
                  <Button fullWidth size="large" variant="contained" color="primary"
                    onClick={hacerLogin}
                  >
                    Login
                  </Button>
                </AnimateButton>
                  {msgLogin == null ? <div></div> :<div>{msgLogin}</div> }
                  {/* <Button variant="contained" color='secondary' onClick={verificarToken} >Check Token</Button> */}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
