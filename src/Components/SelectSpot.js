import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Footer from './Footer';


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
            setSeats(response.data.seats)
            setisLoading(false)
        })
        .catch(res => {
            setError(true);
        })
    }, []);
    console.log(seats)
    console.log(seatsData)

    if (isLoading) {
        return "Aguarde um momento"
    }
    return (
        <>
            {!error ? null : "deu ruim amigao"}
            <div className="container-seats">
                <div className="box-h2">Selecione o(s) assento(s)</div>
                <div className="box-seats">
                    {seats.map((info, index) => <Seat name={info.name} key={index} available={info.isAvailable}/>)}
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

function Seat ({name, available}) {
    return (
        <div className={available ? "seat" : "seat unavailable"}><span>{name}</span></div>
    )
}