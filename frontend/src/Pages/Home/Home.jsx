import React, {useState} from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'

const Home = ({sidebar, selectedGenre, setSelectedGenre}) => {
  


  return (
    <>
      <Sidebar sidebar={sidebar} selectedGenre = {selectedGenre} setSelectedGenre={setSelectedGenre} />
      <div className={`container ${sidebar? '' : 'large-container'}`}>
        <Feed selectedGenre={selectedGenre} />
      </div>
    </>
  );
};

export default Home