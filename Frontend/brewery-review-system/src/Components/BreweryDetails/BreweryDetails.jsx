import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { infinity } from 'ldrs';
import Cookies from 'js-cookie'


import './BreweryDetails.css'
import Navbar from '../Navbar/Navbar'

infinity.register()

function BreweryDetails() {
    const [details, setDetails] = useState({}) //brewerry details
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        breweryId: '',
      username: '',
      rating: '',
      comment: ''
    });
    
    const location = useLocation()
    const breweryId = location.pathname.split("/")[2]
    const navigate = useNavigate()
    const userID = Cookies.get('userID')
    const username = Cookies.get("username") 
    const jwtToken = Cookies.get("jwt_token")
    
    //API to extract info of brewery
    useEffect(() => {
        const apiCall = async () => {
            setLoading(true)
            const url = `https://api.openbrewerydb.org/v1/breweries/${breweryId}`
            const response = await fetch(url)
            const result = await response.json()
            console.log(result.id, "result")
            setDetails(result)
            setNewReview({...newReview, breweryId: result.id})
            setLoading(false)
        }
        // const loadBreweries = async (obj) => {
        //     const url = 'https://moengage-brewery-review-system.onrender.com/breweries'
        //     const jwtToken = Cookies.get("jwt_token")
    
            
        //     const options = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'authorization': 'Bearer ${jwtToken}'
        //         },
        //         body: obj
        //     }
        // }

        apiCall()
    },[])

    useEffect(() => {
        console.log(jwtToken, "token")

        if (jwtToken === undefined){
            navigate("/login")
        }

    },[])

  useEffect(() => {
    // Fetch existing reviews from the server
    
    fetch(`https://moengage-brewery-review-system.onrender.com/breweries/${breweryId}/reviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));

  }, [reviews,breweryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Post new review to the server
    console.log({...newReview,userID}, "newreview")

    const url = `https://moengage-brewery-review-system.onrender.com/breweries/${breweryId}/reviews`
    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization' : `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({...newReview,userID}),
                        })
    
      
      const result = await response.json()
      console.log(result, "result after adding review")
      setReviews([...reviews, result]);

        
    //     setNewReview({...newReview,rating: '', comment: '',breweryId: ''});
    //   })
    //   .catch(error => console.error('Error adding review:', error));
  };

  console.log(reviews, "reviews")

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
                        <div key={breweryId} className='details-card-container'>
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
                
                {/**reviews section */}
                <div className="brewery-page">
      <h1>Brewery Reviews</h1>

      <div className="reviews-section">
        <h2>Existing Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>Username:</strong> {review.username}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div className="add-review-section">
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username : {username}</label>
          </div>
          <div>
            <label>Rating out of 4</label>
            <input
              type="number"
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              required
              min="1"
              max="5"
            />
          </div>
          <div>
            <label>Comment</label>
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    {/** */}

    </div>
        </div>
        )}
    </div>
    </>
  )
}

export default BreweryDetails