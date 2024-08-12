import React, {useState} from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

const App = () => {

  const [sidebar, setSidebar] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  

  return (
    <div>
      <Navbar setSidebar = {setSidebar}  searchQuery = {searchQuery} setSearchQuery={setSearchQuery}/>
      <Routes>
        <Route path = '/' element = {<Home sidebar={sidebar} selectedGenre = {selectedGenre} setSelectedGenre = {setSelectedGenre} searchQuery = {searchQuery}/>}/>
        
        <Route path = '/video/:videoId' element = {<Video selectedGenre={selectedGenre} searchQuery = {searchQuery}/>} />
      </Routes>
    </div>
  )
}

export default App