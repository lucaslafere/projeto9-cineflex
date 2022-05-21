import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import { BoxTitle } from './SelectMovie';
import Success from './Success';


export default function SelectSpot () {
    // Variaveis de estado
    const { sessionId } = useParams();
    const [seatsData, setSeatsData] = useState({});
    const [seats, setSeats] = useState([]);

    const [error, setError] = useState(false);

    const [isLoading, setisLoading] = useState(true);

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [postId, setPostId] = useState([]);

    let idArray = [...postId];

    //Logic
    
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

    const body = {
        ids: postId,
        name,
        cpf,
    }


    function orderSeats (event) {
        event.preventDefault();
        setPostId([...idArray]);
        const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", body);
        request.then(() => console.log("enviou" + body))
        request.catch(err => console.log("err") )

    }



// Render
    if (isLoading) {
        return "Aguarde um momento"
    }
    return (
        <>  
            {!error ? null : "deu ruim amigao"}
            <div className="container-seats">
                <BoxTitle>Selecione o(s) assento(s)</BoxTitle>
                <div className="box-seats">
                    {seats.map((info, index) => <Seats name={info.name} key={index} available={info.isAvailable} id={info.id} setPostId={setPostId} idArray={idArray} hour={seatsData.name} day={seatsData.day.date} title={seatsData.movie.title} />)}
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
                <form onSubmit={orderSeats}>
                    <label htmlFor="NameField">Nome do comprador:</label>    
                        <input type="text" value={name} onChange={e => setName(e.target.value)} id='NameField' required placeholder='Digite seu nome...' />
                    <label htmlFor="CPF">CPF do comprador:</label>
                        <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} id='CPF' required placeholder='Digite seu CPF...' />
                    {/* <Link to={"/sucesso"}> */}
                    <div className="order-button">
                        <button type='submit' className='order'>Reservar Assento(s)</button>
                    </div>
                    {/* </Link> */}
                </form>
            </div>
            
            {seatsData.length === 0 ? "Carregando, aguarde um instante" : <Footer hour={seatsData.name} day={seatsData.day.weekday} title={seatsData.movie.title} img={seatsData.movie.posterURL} />}
        </>
    )

}

function Seats ({name, available, id, idArray, setPostId, hour, day, title}) {
    const [selected, setSelected] = useState(false)

    function change () {
        if (available && !selected) {
            setSelected(true)
            idArray.push(id)
            setPostId([...idArray])

        }
        else if (available && selected){
            setSelected(false)
            setPostId(idArray.filter((el) => el !== id))

        }
    }

    if (available && selected) {
        return (
        <><div className="seat selected" onClick={change} id={id}><span>{name}</span></div><Success seatName={name}  /></>
        )
    }

    else if (available && !selected){
        return (
            <><div className="seat" onClick={change} id={id}><span>{name}</span></div><Success seatName={name}  /></>
        )
    }
    else if (!available) {
        return (
        <><div className="seat unavailable" onClick={() => alert("Esse assento não está disponível")} id={id}><span>{name}</span></div><Success seatName={name}  /></>
        )
    }

}



