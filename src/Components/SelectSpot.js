import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import { BoxTitle } from './SelectMovie';


export default function SelectSpot () {
    const { sessionId } = useParams();
    const [seatsData, setSeatsData] = useState({});
    const [seats, setSeats] = useState([]);

    const [error, setError] = useState(false);

    const [isLoading, setisLoading] = useState(true);
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

        promise.then(response => {
            setSeatsData(response.data);
            setSeats(response.data.seats);
            setisLoading(false);
        })
        .catch(res => {
            setError(true);
            console.log(error);
        })
    }, []);

    if (isLoading) {
        return "Aguarde um momento"
    }
    return (
        <>
            {!error ? null : "deu ruim amigao"}
            <div className="container-seats">
                <BoxTitle>Selecione o(s) assento(s)</BoxTitle>
                <div className="box-seats">
                    {seats.map((info, index) => <Seats name={info.name} key={index} available={info.isAvailable} />)}
                </div>
                <div className="captions-seats">
                    <div className="seat-option">
                    <div className="seat selected"></div>
                        <span>Selecionado</span>
                    </div>
                    <div className="seat-option">
                        <div className="seat"></div>
                        <span>Disponível</span>
                    </div>
                    <div className="seat-option">
                        <div className="seat unavailable"></div>  
                        <span>Indisponível</span>
                    </div>
                </div>
                <div className="input-box">
                    <h4>Nome do comprador:</h4>
                    <input type="text" placeholder='Digite seu nome...' />
                </div>
                <div className="input-box">
                    <h4>CPF do comprador:</h4>
                    <input type="text" placeholder='Digite seu CPF...' />
                </div>
                <div className="order-button">
                    <button className='order'>Reservar Assento(s)</button>
                </div>
            </div>
            {seatsData.length === 0 ? "Carregando, aguarde um instante" : <Footer hour={seatsData.name} day={seatsData.day.weekday} title={seatsData.movie.title} img={seatsData.movie.posterURL} />}
        </>
    )

}

function Seats ({name, available}) {
    const [selected, setSelected] = useState(false)

    function change () {
        if (available && !selected) {
            setSelected(true)
            console.log(selected)
            console.log('mudei')
        }
        else if (available && selected){
            setSelected(false)
            console.log(selected)
            console.log('mudei de novo')
        }
    }

    if (available && selected) {
        return (
        <div className="seat selected" onClick={change}><span>{name}</span></div>
        )
    }

    else if (available && !selected){
        return (
            <div className="seat" onClick={change}><span>{name}</span></div>
        )
    }
    else if (!available) {
        return (
        <div className="seat unavailable"><span>{name}</span></div>
        )
    }

}



