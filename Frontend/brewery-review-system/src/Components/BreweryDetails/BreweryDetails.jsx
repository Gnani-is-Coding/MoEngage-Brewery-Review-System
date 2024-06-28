import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import { infinity } from 'ldrs';

import './BreweryDetails.css'
import Navbar from '../Navbar/Navbar'

infinity.register()

function BreweryDetails() {
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)
    
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    console.log(details)
    
    useEffect(() => {
        const apiCall = async () => {
            setLoading(true)
            const url = `https://api.openbrewerydb.org/v1/breweries/${id}`
            const response = await fetch(url)
            const result = await response.json()
            setDetails(result)
            setLoading(false)
        }
        apiCall()
    },[])

  return (
    <>
    <Navbar/>
    <div className="details-container">
        {loading ? (
            <div className="loading-container">
                    <l-infinity
                    size="55"
                    stroke="8"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3" 
                    color="black" 
                    ></l-infinity>
                    </div>): (
                    <div>
                        <div key={id} className='details-card-container'>
                        <p className='card-heading'>{details.name} </p>
                        <div style={{textAlign: 'left'}} className='description-container'>
                            <p className='add-value-para'><span className='add-type'>City :</span> {details.city}</p>
                            <p className='add-value-para'><span className='add-type'>Type :</span> {details.brewery_type}</p>
                            <p className='add-value-para'><span className='add-type'>Phone :</span> {details.phone}</p>
                            <p className='add-value-para'><span className='add-type'>State :</span> {details.state}</p>
                            <p className='add-value-para'><span className='add-type'>Country :</span> {details.country}</p>
                            <p className='add-value-para'><span className='add-type'>Address 1: </span> {details.address_1}</p>
                            <p className='add-value-para'><span className='add-type'>Postal Code : </span> {details.postal_code}</p>
                            <p className='add-value-para'><span className='add-type'>State Province: </span> {details.state_province}</p>
                            
                            <div style={{textAlign: 'center'}}>
                            <a href={details.website_url} rel="noopener noreferrer" target="_blank">{details.website_url}</a>
                            </div>
                        </div>
                        </div>
                        <div>
                        <h1>Reviews</h1>
                    </div>
                    </div>
                    )}
    </div>
    </>
  )
}

export default BreweryDetails