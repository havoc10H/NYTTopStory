import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { motion } from "framer-motion";
import { Puff } from 'react-loading-icons'

import './App.css';
import Card from './Card';
import { API_URL } from './components/EnvironmentValues';

function TopStories(props) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL + '/api/top-stories');
        setIsLoading(false);
        if (Array.isArray(response.data)) {
          setStories(response.data);
        } else {
          console.log('Invalid response data:', response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {isLoading ? (
        <Puff stroke='#333' className="centered" />
      ) : (
        <>
          {stories.map(story => (
            <Card
              key={story.url}
              url={story.url}
              image={story.multimedia && story.multimedia[0] ? story.multimedia[0].url : ''}
              title={story.title}
              text={story.abstract}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default TopStories;
