import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Card, Spinner, CardColumns, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const Upcoming = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovie, setFilteredMovie] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setErrorMsg] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let url = `${API_URL}/movie/upcoming?api_key=${API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    setMovies(data.results);
                    setFilteredMovie(data.results);
                    
                } else {
                    setErrorMsg(`FETCH ERROR: ${data.message}`);
                }
            } catch (error) {
                setErrorMsg(`FETCH ERROR: ${error.message}`);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let newMovies = movies.filter((movie) => movie.title.toLowerCase().startsWith(filterTerm))
        setFilteredMovie(newMovies);
    }, [filterTerm, movies]); 
    
    return (
        <div>
            
            
          <hr/>
          <Container>
              <Row>
                  <Col>
                      <h4>Upcoming</h4>
                      <p>Wating for your next inspiration? Check here.</p></Col>
                  <Col>
                          <input label="movie name" type="text" onChange={(event) => setFilterTerm(event.target.value)} value={filterTerm} />
                          <p><small><em>Filter by typing movie name.</em></small></p>
                      </Col>
              </Row>
          </Container>    
          
          <div className="mx-auto" style={{ height: "20px" }}></div>
            
          <Container>
            {loading ? (
              <div className="ratio ratio-16x9 d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status" style={{position: 'static'}}>      
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>        
   
            ) : (
              <CardColumns>
                {filteredMovie.map((movie) => (
                  <Card key={movie.id} className="mr-auto" style={{weight:"30px"}}> 
                      <Card.Body>
                          <Card.Img className="pb-2" src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="slide" />
                          <p><strong>{movie.title}</strong></p>
                              <p className="py-0"><small>
                              <strong>Released on: </strong>{movie.release_date.match(/\d+/)}<br/>
                              <strong>Storyline: </strong>{movie.overview}
                          </small></p>
                          
                          <Button variant="outline-dark" size="sm" href={`http://localhost:3000/movie/${movie.id}`}>Watch</Button>
                      </Card.Body>
                  </Card>))
                }
              </CardColumns>   
            )}
          </Container>                    
        </div>
        
    );
}

export default Upcoming;