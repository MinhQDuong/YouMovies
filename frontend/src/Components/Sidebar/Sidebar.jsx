import React from 'react'
import './Sidebar.css'
import home from '../../assets/home.png'
import action from '../../assets/action.png'
import horror from '../../assets/horror.png'
import scifi from '../../assets/scifi.png'
import drama from '../../assets/drama.png'
import comedy from '../../assets/comedy.png'
import romance from '../../assets/romance.png'

const Sidebar = ({sidebar, selectedGenre, setSelectedGenre}) => {

    
    return (
        <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
            <div className="shortcut-links">
                <div className = {`side-link ${selectedGenre===''?"on":""}`}onClick={() => setSelectedGenre('')}>
                    <img src = {home} alt = ""/><p>Home</p>
                </div>
                <div className={`side-link ${selectedGenre==='Action'?"on":""}`}onClick={() => setSelectedGenre('Action')}>
                    <img src = {action} alt = ""/><p>Action</p>
                </div> 
                <div className={`side-link ${selectedGenre==='Comedy'?"on":""}`}onClick={() => setSelectedGenre('Comedy')}>
                    <img src = {comedy} alt = ""/><p>Comedy</p>
                </div>
                <div className={`side-link ${selectedGenre==='Drama'?"on":""}`}onClick={() => setSelectedGenre('Drama')}>
                    <img src = {drama} alt = ""/><p>Drama</p>
                </div>
                <div className={`side-link ${selectedGenre==='Horror'?"on":""}`}onClick={() => setSelectedGenre('Horror')}>
                    <img src = {horror} alt = ""/><p>Horror</p>
                </div>
                <div className={`side-link ${selectedGenre==='Romance'?"on":""}`}onClick={() => setSelectedGenre('Romance')}>
                    <img src = {romance} alt = ""/><p>Romance</p>
                </div>
                <div className={`side-link ${selectedGenre==='Sci-fi'?"on":""}`}onClick={() => setSelectedGenre('Sci-fi')}>
                    <img src = {scifi} alt = ""/><p>Sci-fi</p>
                </div>
            </div>
        </div>
  )
}

export default Sidebar