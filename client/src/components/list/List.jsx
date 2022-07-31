import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import {React, useRef, useState} from 'react';
import ListItem from '../listitem/ListItem';
import "./list.scss";

const List = ({list}) => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const listRef = useRef()


    const handleClick = (direction) => {
        /*sets moved to true once moving right and left arrow appears*/
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if(direction === 'left' && slideNumber > 0){
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if(direction === 'right' && slideNumber < 5){
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    }

  return (
    <div className='list'>
        <span className='listTitle'>{list.title}</span>
        <div className="wrapper">
            {/*left arrow to appear after moving right*/}
            <ArrowBackIosOutlined 
                className='sliderArrow left' 
                onClick={()=>handleClick("left")}
                style={{display: !isMoved && "none"}}
            />
            <div className="container" ref={listRef}>
                {list.content.map((item, i)=> (
                    <ListItem key={i} index={i} item={item} />
                ))}
            </div>
            <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>handleClick("right")}/>
        </div>
    </div>
  )
}

export default List;