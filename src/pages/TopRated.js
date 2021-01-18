import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';

import { Card, Spinner, Button, Container } from 'react-bootstrap';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const TopRated = () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const API_URL = process.env.REACT_APP_TMDB_API_URL;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setErrorMsg] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let url = `${API_URL}/movie/top_rated?api_key=${API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    setMovies(data.results);
                } else {
                    setErrorMsg(`FETCH ERROR: ${data.message}`);
                }
            } catch (error) {
                setErrorMsg(`FETCH ERROR: ${error.message}`);
            }
            setLoading(false);
        }
        fetchData();
    }, [API_KEY, API_URL]);

    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '50px',
    autoplay: true,
    autoplaySpeed: 2000,
    };
    
    return (
        <div>
            {/* <PublicNavBar/> */}
            <Container>
            <hr></hr>
            <h4>Top Rated</h4>
                <p>Discover the highest rated ever.</p>
            
            {loading? (
              <div className="ratio ratio-16x9 d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status" style={{position: 'static'}}>      
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>        
   
            ) : (
              <Slider {...settings}>
                {movies.map((movie) => (
                  <Card
                      // style={{ width: 25 % visualViewport, bg: "dark" }}
                      mr-auto>

                      <Card.Body>
                          <Card.Img className="pb-2"
                                  // style={{ width: '25%vw' }}
                                  src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="slide" />
                          <p><strong>{movie.title}</strong></p>
                          <p className="py-0"><small>
                              <strong>Rating: </strong>{movie.vote_average} | 
                              <strong> Released on: </strong>{movie.release_date.match(/\d+/)}<br/>
                              {/* <strong>Storyline: </strong>{movie.overview} */}
                          </small></p>
                          <Button variant="outline-dark" size="sm" href={`http://localhost:3000/movie/${movie.id}`}>Watch</Button>

                      </Card.Body>
                  </Card>))}
              </Slider> 
            )}       
                
                 
                <div class="mx-auto" style={{ height:"50px" }}></div>
            </Container>                    
        </div>
        
    );
}

export default TopRated;