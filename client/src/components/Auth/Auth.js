import React,{ useState } from 'react';
import { Avatar,Button,Paper,Typography,Grid,Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './AuthStyles.js';
import { Input } from './Input.js';
import {signin,signup} from '../../actions/auth.js';

const intialState={firstname:'',lastname:'',username:'',password:'' };

export const Auth =() =>{
    
    const classes=useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [formData,setFormData] = useState(intialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit= (e)=> {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    };

    const handleChange= (e)=> {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const switchMode=()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup);
    }
      return(
          
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} autofocus half />
                                    <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="username" label ="Username" handleChange={handleChange} />
                        <Input name="password" label ="Password" handleChange={handleChange} type="password" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className="">
                        {isSignup?'Sign Up':'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup?'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
  };