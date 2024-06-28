import React from 'react'

import './SearchResult.css'
import { Link } from 'react-router-dom'

function SearchResults({ data}) {

  return (
    <div className="">
        {data.length > 0 ?
        <div className='search-results-container'>
        {data.map((obj) => (
            <Link to={`/brewery-details/${obj.id}`} style={{textDecoration: 'none'}} >
            <div key={obj.id} className='card-container'>
                <p className='card-heading'>{obj.name} </p>
                <div style={{textAlign: 'left'}} className='description-container'>
                    <p className='add-value-para'><span className='add-type'>City :</span> {obj.city}</p>
                    <p className='add-value-para'><span className='add-type'>Type :</span> {obj.brewery_type}</p>
                    <p className='add-value-para'><span className='add-type'>Phone :</span> {obj.phone}</p>
                    <p className='add-value-para'><span className='add-type'>State :</span> {obj.state}</p>
                    <p className='add-value-para'><span className='add-type'>Country :</span> {obj.country}</p>
                    <p className='add-value-para'><span className='add-type'>Address 1: </span> {obj.address_1}</p>
                    <div style={{textAlign: 'center'}}>
                    <a href={obj.website_url} rel="noopener noreferrer" target="_blank">{obj.website_url}</a>
                    </div>
                </div>
            </div>
          </Link>
        ))}
        </div>
        :
        <div style={{height: '50vh', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h1 style={{color: '#b1b2b3'}}>Pls Search :) </h1>
        </div>
        }
    </div>
  )
}

export default SearchResults