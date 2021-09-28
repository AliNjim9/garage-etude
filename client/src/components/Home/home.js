import React,{useState,useEffect} from "react";
import { Link,useLocation,useHistory } from "react-router-dom";
import { Container, Grow, Grid , Button } from '@material-ui/core';
import DemoCarousel from '../logged.js';



const intialState={roomid:''};
export const Home =()=>{
  

  const [roomID,setRoomID] = useState(intialState);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const history = useHistory();

  const clickHere = () => {
        sessionStorage.setItem('user', user.result.firstname + ' ' + user.result.lastname);
        
        history.push('/room');
        //window.location.reload();
};
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);
  
  
    return(
      <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                {user ? (
                  <Grid >
                    <Button  onClick={clickHere}>Click here</Button>
                  </Grid>  
                  ) : (
                  <div >
                  <h3 className="">Welcome to Garage d'Etude!</h3>
                  <h5 className="">Garage d'Etude is a platform in which you can study or teach online!</h5>
                  <br></br>
                  <br></br>
                  <Button component={Link} to="/auth" variant="contained">start your class </Button>
                  </div> 
                )
                }             
              </Grid>
              <Grid item xs={12} sm={4}>
                  <DemoCarousel/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
  )
};
