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


    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

        promise.then(response => {
            setSeatsData(response.data);
            setSeats(response.data.seats)
        })
        .catch(res => {
            setError(true);
        })
    }, []);
    console.log(seats)
    return (
        <>
            {!error ? null : "deu ruim amigao"}
            <div className="container-seats">
                <div className="box-h2">Selecione o(s) assento(s)</div>
                <div className="box-seats">
                    {seats.map(info => <Seat name={info.name} />)}
                </div>
                <div className="captions-seats">
                    <div className="seat"></div>
                    <div className="seat"></div>
                    <div className="seat"></div>
                </div>
                <div className="input-box">
                    <input type="text" />
                </div>
                <div className="input-box">
                    <input type="text" />
                </div>
                <div className="order-button"></div>
            </div>
            <Footer />
        </>
    )

}

function Seat ({name}) {
    return (
        <div className="seat"><span>{name}</span></div>
    )
}