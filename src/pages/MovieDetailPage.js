import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import Upcoming from './Upcoming';
    

const MovieDetailPage = () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const API_URL = process.env.REACT_APP_TMDB_API_URL;
    const [movie, setMovie] = useState([]);
    const { id } = useParams();
    
    const [loading, setLoading] = useState(false);
    const [error, setErrorMsg] = useState([]);
    

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let url = `${API_URL}/movie/${id}?api_key=${API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    setMovie(data);
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
            <Container>
                
                {loading?
                    <h1>Loading...</h1>
                    
                    : <Card>
                    <Card.Img className="d-block w-100" src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="backdrop" />

                        <Card.Body>
                            <h1>{movie.title}</h1>
                            <p> <strong>Storyline:</strong> {movie.overview}<br />
                            <strong>Original language: </strong>{movie.original_language}<br />
                            <strong>Budget: </strong>{movie.budget} USD<br />
                            <strong>Popularity: </strong>{movie.popularity}</p>
                            </Card.Body>

                    </Card>
                }
                
                <Upcoming />
                
            </Container>          
        </div>
    )
}

export default MovieDetailPage;