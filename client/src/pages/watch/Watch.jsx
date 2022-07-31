import React from 'react'
import {ArrowBackOutlined} from "@material-ui/icons";
import { Link, useLocation } from 'react-router-dom';
import "./watch.scss"

export default function Watch() {
  /*uses the movie that was sent as a parameter in ListItem Link*/
  const location = useLocation();
  const movie = location.movie;
  return (
    <div className='watch'>
      <Link to="/">
        <div className="back">
            <ArrowBackOutlined/>
            Home
        </div>
      </Link>
      <video className='video' 
        autoPlay 
        progress 
        controls 
        src={movie.video}
      />
    </div>
  )
}
