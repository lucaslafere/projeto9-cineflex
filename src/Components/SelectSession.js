import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BoxTitle } from './SelectMovie';
import Footer from './Footer';
import styled from 'styled-components';


export default function SelectSession () {
    
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const [error, setError] = useState(false);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);

        promise.then(response => {
            setMovie(response.data)
            setTimes([...response.data.days])

        })
        .catch(res => {
            setError(true);
        })
    }, []);
    console.log(movie)
    return (
        <>
            <Container>
                <BoxTitle>
                    {!error ? null : "Ja era deu ruim hein"}
                    <h2>Selecione o horário</h2>
                </BoxTitle>
                {times.length === 0 ? 'Loading' : times.map(info => <DateButton dateId={info.id} day={info.weekday} date={info.date}  horario={info.showtimes}/>)} 
                <Footer img={movie.posterURL} title={movie.title}/> 
            </Container>   
        </>
    )

}


function DateButton ({dateId, day, date, horario}) {
    return (
        <>
            <BoxDate>
                <h3>{day} - {date}</h3>
                <BoxButtonsDate>
                    {horario.map((el) => <TimeButton name={el.name} sessionId={el.id}/>)}
                </BoxButtonsDate>
            </BoxDate>
        </>
    )
}

function TimeButton ({name, sessionId}) {
    return (
        <Link to={`/assentos/${sessionId}`}>
            <ButtonDate><h4>{name}</h4></ButtonDate>
        </Link>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 24px;
    margin-right: 24px;
`

const BoxButtonsDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
`
const BoxDate = styled.div``

const ButtonDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E8833A;
    border-radius: 3px;

    width: 84px;
    height: 44px;
    margin-top: 24px;
    margin-bottom: 24px;
    h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.02em;

    color: #FFFFFF;
}
`