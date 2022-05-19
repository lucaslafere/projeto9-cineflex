import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Footer from './Footer';


export default function SelectSpot () {
    const { sessionId } = useParams();
    const [seatsData, setSeatsData] = useState({});
    const [seats, setSeats] = useState([]);

    const [error, setError] = useState(false);

    const [isLoading, setisLoading] = useState(true);
    const [selected, setSelected] = useState(false)



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

    if (isLoading) {
        return "Aguarde um momento"
    }
    return (
        <>
            {!error ? null : "deu ruim amigao"}
            <div className="container-seats">
                <div className="box-h2">Selecione o(s) assento(s)</div>
                <div className="box-seats">
                    {seats.map((info, index) => <Seats name={info.name} key={index} available={info.isAvailable} selected={selected} setSelected={setSelected} />)}
                </div>
                <div className="captions-seats">
                    <div className="seat-option">
                        <SeatSelected />
                        <span>Selecionado</span>
                    </div>
                    <div className="seat-option">
                        <Seat available={true}/>
                        <span>Disponível</span>
                    </div>
                    <div className="seat-option">
                        <Seat />  
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

function Seats ({name, available, selected, setSelected}) {

    return (
        <Seat available={available} onClick={() => setSelected(true)} selected={selected}>
            <span>{name}</span>
        </Seat>
    )
}


const Seat = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    width: 26px;
    background-color: ${props => props.available ? ('#C3CFD9') : ('#FBE192')};
    border: 1px solid #808F9D;
    border-radius: 12px;
` 

const SeatSelected = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    width: 26px;
    background: #8DD7CF;
    border: 1px solid #1AAE9E;
    border-radius: 17px;
    `


