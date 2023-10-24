import { useState, useEffect } from 'react';
import './Card.css';

function Card(props) {
    const [storyLink, setStoryLink] = useState('');

    const handleClick = () => {
        setStoryLink(props.url);
    }
    
    useEffect(() => {
        if (storyLink !== '') {
          window.open(storyLink, '_blank');
        }
      }, [storyLink]);

    return (
      <div className="card" onClick={handleClick}>
        <img src={props.image} alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    );
  }
  
  export default Card;