import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TopRated from './TopRated';
import Upcoming from './Upcoming';

import { Spinner, Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const WatchNow = () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const API_URL = process.env.REACT_APP_TMDB_API_URL;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setErrorMsg] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let url = `${API_URL}/movie/now_playing?api_key=${API_KEY}`;
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


    return (
        
        <div>
          <>
            {loading ? (
              <div className="ratio ratio-16x9 d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status" style={{position: 'static'}}>      
                <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
            <Carousel>    
              {movies.map((movie,index) => (
                  <Carousel.Item key={index}>
                    <div className="ratio ratio-16x9">
                      <img className="d-block w-100" src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="slide" />
                    </div>
                          <Carousel.Caption>
                              <a href={`http://localhost:3000/movie/${movie.id}`}><h3 style={{color:"white"}}>{movie.title}</h3></a>
                              {/* <h5 style={{color:"white"}}>Rating: {movie.vote_average}</h5> */}
                          <p>{movie.overview}</p>
                              {/* <a href="{movie.homepage">Watch</a> */}
                          </Carousel.Caption>
                  </Carousel.Item>
                  
              ))}
            </Carousel>
            )} 
          </>
            <TopRated />
                        
            <Upcoming />
            

        </div>
    );
}

export default WatchNow;