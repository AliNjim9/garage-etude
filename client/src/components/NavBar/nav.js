import React,{ useState, useEffect } from "react";
import { Link ,useHistory,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {AppBar , Toolbar, Typography,Avatar,Button } from '@material-ui/core';
import useStyles from './styles.js';
import decode from 'jwt-decode';

export const Nav = () => {
  const classes=useStyles();
  
  const [dateTime, setDateTime] = useState(new Date());
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({type : 'LOGOUT'});
    setUser(null);
    history.push('/home'); 
  }

  useEffect(()=>{
    const token = user?.token;

    if(token){
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) 
        logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);
  
    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);
  return (
    
    <AppBar className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/home" className={classes.heading} variant="h3" >Garage-d'Etude</Typography>
        <img className={classes.image} src="log1.png" alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.firstname.charAt(0).toUpperCase()}</Avatar>
              <Typography className={classes.userName} variant="h6">{`${user.result.firstname} ${user.result.lastname}`}</Typography>
              <Typography className={classes.time}>            
                {`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}
              </Typography>
              <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
              <Typography className={classes.time}>            
                {`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}
              </Typography>   
          )
        }             
      </Toolbar>
    </AppBar>
  )
}


/*
export class nav extends Component{
  state = {
    curTime: null,
  }
  componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
  }
  render(){
    
    return(
      
      
      
  )
};
}
export default nav;

  /*<div class="topnav">
          <a class="active" href="/home">
            <img src="log1.png" class="img"/>
            Garage d'Etude
          </a>
          <a href="#news" >More</a>
          <a class="time"href="#news" disabled="disabled">{this.state.curTime}</a>
        </div>
        */