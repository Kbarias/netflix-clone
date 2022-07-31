import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import "./featured.scss";

/*if we have any type, we will pass it as the query in the getrandom content*/
export default function Featured({type}) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try{
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDlkZDc2YWI4OTJlZGUxYjhjNjQ3YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTkyOTM1OTMsImV4cCI6MTY1OTcyNTU5M30.Ij8hVnMCtTi7yRbNAhlbOfyULBGiT7fN14K6ugKMdBw",
          },
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    }
    getRandomContent();
  },[type]);
  return (
    <div className='featured'>
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img 
        width="100%"
        src={content.img} alt=""
      />
      <div className="info">
        <img
          src={content.imgTitle}
          alt=""
        />
        <span className='desc'>
          {content.desc}
        </span>
        <div className="buttons">
          <button className='play'>
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}
