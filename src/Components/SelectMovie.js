import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
export {BoxTitle};

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
        <BoxTitle>
            <h2>Selecione o filme</h2>
        </BoxTitle>

        <Container>
            {movieList === null ? 'Aguarde um instante' :
            movieList.map((movie, index) => <Movie img={movie.posterURL} id={movie.id} title={movie.title} key={index}/>)}
        </Container>
       </>
   )
}

function Movie ({img, id, title}) {
    return (
        <Link to={`/sessoes/${id}`}>     
            <MovieBox>
                <img src={img} alt={title} />
            </MovieBox>
        </Link>        
    )
}

const BoxTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    margin-top: 70px;

    h2 {
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
    color: #293845;
}
`
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
` 

const MovieBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 146px;
    height: 210px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom: 10px;
    img {
    width: 130px;
    height: 194px;
    object-fit: cover;
}
` 