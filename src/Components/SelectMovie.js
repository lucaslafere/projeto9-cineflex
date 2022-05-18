import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SelectMovie () {

    const [movieList, setMovieList] = useState([]);

    useEffect(() => {

    const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
    
    promise.then(response => {
        setMovieList([...response.data])
    });
}, []);

   return (
       <>
        <div className="box-h2">
            <h2>Selecione o filme</h2>
        </div>

        <div className="container-movies">
            {movieList === null ? 'Aguarde um instante' :
            movieList.map((movie, index) => <Movie img={movie.posterURL} id={movie.id} title={movie.title} key={index}/>)}
        </div>
       </>
   )
}

function Movie ({img, id, title}) {
    return (
        <Link to={`/sessoes/${id}`}>     
            <div className="movie-box">
                <img src={img} alt={title} />
            </div>
        </Link>        
    )
}