import { useEffect } from "react";

import Video from "./components/Video/Video";
import VideoState from "./context/VideoState";
import { Link,useLocation,useHistory } from "react-router-dom";

import Options from "./components/options/Options";
import Footer from "./components/Footer/Footer";

const Room = () => {
  /*const history = useHistory();

  useEffect(()=>{
    
  },[history]);*/
  return (
    <VideoState>
      <div className="App" style={{ height: "100%", width: "100%" }}>
        <Video />
        <Options />
      </div>
    </VideoState>
  );
};

export default Room;
