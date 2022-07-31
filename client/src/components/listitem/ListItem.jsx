import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { PlayArrow, ThumbUpAltOutlined, ThumbDownOutlined, Add } from '@material-ui/icons';
import "./listitem.scss";
import axios from 'axios';

function ListItem({index, item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async ()=>{
      try{
        const res = await axios.get("/movies/find/"+item, {
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDlkZDc2YWI4OTJlZGUxYjhjNjQ3YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTkyOTM1OTMsImV4cCI6MTY1OTcyNTU5M30.Ij8hVnMCtTi7yRbNAhlbOfyULBGiT7fN14K6ugKMdBw"
          }
        });
        setMovie(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  return (
    /*turns the entire listitem into a clickable link, but properties are able to be passed*/
    <Link to={{pathname: "/watch", movie:movie}}>
      <div className="listItem" 
            style={{left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          <img 
            src={movie.imgSm}
            alt=''
          />
          {
            isHovered && 
            <>
              <video src={movie.trailer} autoPlay={true} loop/>
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrow className="icon"/>
                  <Add className="icon"/>
                  <ThumbUpAltOutlined className="icon"/>
                  <ThumbDownOutlined className="icon"/>
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <span>+{movie.limit}</span>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">
                  {movie.desc}
                </div>
                <div className="genre">{movie.genre}</div>
              </div>
            </>
          }
      </div>
    </Link>
  )
}

export default ListItem