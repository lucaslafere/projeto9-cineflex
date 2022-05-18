import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


export default function SelectSpot () {
    const { sessionId } = useParams();
    const [seats, setSeats] = useState({});
    const [error, setError] = useState(false);


    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

        promise.then(response => {
            setSeats(response.data);
        })
        .catch(res => {
            setError(true);
        })
    }, []);
    console.log(seats)
    return (
        <>
            <div className="container-seats">
                <div className="box-h2">Selecione o(s) assento(s)</div>
            </div>
        </>
    )

}