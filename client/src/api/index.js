import axios from 'axios';
const https=require('https');
//https://localhost:5000
export const API =axios.create({baseURL : 'https://garage-etude.herokuapp.com/' }); 


export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);