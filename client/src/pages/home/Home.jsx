import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import "./home.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({type}) => {
  const [lists,setLists] = useState([]);
  const [genre,setGenre] = useState(null);

  //whenver we change our type or genre it will automatically call useeffect 
  useEffect(()=> {
    const getRandomLists = async () => {
      try{
        //use lists route if type then we search and if genre we will add another query
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
            headers:{
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDlkZDc2YWI4OTJlZGUxYjhjNjQ3YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTkyOTM1OTMsImV4cCI6MTY1OTcyNTU5M30.Ij8hVnMCtTi7yRbNAhlbOfyULBGiT7fN14K6ugKMdBw",
            },
          }
        );
        setLists(res.data);
      } catch(err){
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {lists.map((list, i)=>(
        <List list={list} key={i}/>
      ))}
      
    </div>
  );
};

export default Home;