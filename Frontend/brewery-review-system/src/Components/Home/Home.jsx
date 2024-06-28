import React, { useState,useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import { infinity } from 'ldrs';
import SearchResults from '../SearchResults/SearchResults'

import Navbar from '../Navbar/Navbar'
import './Home.css'



infinity.register()

function Home() {
    const [inputVal,setInput] = useState('')
    const [apiData, setApiData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const apiCall = async () => {
        setIsLoading(true)
        const endPoint = `https://api.openbrewerydb.org/v1/breweries`
        // const accessKey = process.env.REACT_APP_ACCESS_KEY  

        const response = await fetch(endPoint)
        const data = await response.json()
        console.log(data, "data")
        
        setApiData(data)
        setIsLoading(false)
    }

    useEffect(() => {
        apiCall()
    },[])  

  return (
    <div>
        <Navbar/>

        <div>
            <img src="/hero-section.jpg" alt='hero-section' className='hero-section-image'/>

            <div className='body-container'>
                <div className='search-input'>
                    <div className="dropdown-container">
                        <label for="dropdown" className='label'>Search By :</label>
                        <select id="dropdown" name="options" style={{fontWeight: '500'}}>
                        <option value="option1">City</option>
                        <option value="option2">Name</option>
                        <option value="option3">Type</option>
                        </select>
                    </div>

                    <div className='search-input-container'>
                        <input type="search" className="input" placeholder='Search Breweries' value={inputVal} onChange={(e) => setInput(e.target.value)}/>
                        <button style={{'cursor': 'pointer'}} onClick={()=> {}}> <FaSearch /> </button>
                    </div>
                </div>

                <div>
                {isLoading ? 
                <div className="loading-container">
                    <l-infinity
                    size="55"
                    stroke="8"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3" 
                    color="black" 
                    ></l-infinity>
                    </div> :
                <SearchResults data = {apiData}/> }
            </div>

        </div>

        </div>  
       
    </div>
  )
}

export default Home