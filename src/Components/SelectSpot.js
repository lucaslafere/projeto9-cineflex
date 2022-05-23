import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { BoxTitle } from './SelectMovie';
import { useNavigate } from 'react-router-dom';


export default function SelectSpot({ seatsData, setSeatsData, name, setName, cpf, setCpf, seatName, setSeatName, seats, setSeats, postId, setPostId }) {
    // Variaveis de estado
    const { sessionId } = useParams();
    const [error, setError] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    let nameArray = [...seatName];
    let idArray = [...postId];
    let navigate = useNavigate()

    //Logic

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);

        promise.then(response => {
            setSeatsData(response.data);
            setSeats(response.data.seats);
            setisLoading(false)
        })
            .catch(res => {
                setError(true);
                console.log(error);
            })
    }, []);

    const body = {
        ids: postId,
        name,
        cpf
    }


    function orderSeats(event) {

        event.preventDefault();
        setPostId([...idArray]);

        const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", body);

        request.then(() => {
            console.log("enviado" + body)
            navigate("/sucesso")
        })

        request.catch(err => console.log("err"))


    }



    // Render
    if (isLoading) {
        return "Aguarde um momento"
    }
    return (
        <>
            {!error ? null : "deu ruim amigao"}
            <div className="container-seats">
                <BoxTitle><h2>Selecione o(s) assento(s)</h2></BoxTitle>
                <div className="box-seats">
                    {seats.map((info, index) => <Seats name={info.name} key={index} available={info.isAvailable} id={info.id} setPostId={setPostId} idArray={idArray} nameArray={nameArray} setSeatName={setSeatName} />)}
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
                    <div className="order-button">
                        <button type='submit' className='order'>Reservar Assento(s)</button>
                    </div>
                </form>
            </div>

            {seatsData.length === 0 ? "Carregando, aguarde um instante" : <Footer hour={seatsData.name} day={seatsData.day.weekday} title={seatsData.movie.title} img={seatsData.movie.posterURL} />}
        </>
    )

}

function Seats({ name, available, id, idArray, setPostId, setSeatName, nameArray }) {
    const [selected, setSelected] = useState(false)

    function change() {
        if (available && !selected) {
            setSelected(true)
            idArray.push(id)
            nameArray.push(name)
            setPostId([...idArray])
            setSeatName([...nameArray])
        }
        else if (available && selected) {
            setSelected(false)
            setPostId(idArray.filter((el) => el !== id))
            setSeatName(nameArray.filter((el) => el !== name))
        }
    }

    if (available && selected) {
        return (
            <>
                <div className="seat selected" onClick={change} id={id}>
                    <span>{name}</span>
                </div>
            </>
        )
    }

    else if (available && !selected) {
        return (
            <>
                <div className="seat" onClick={change} id={id}>
                    <span>{name}</span>
                </div>
            </>
        )
    }
    else if (!available) {
        return (
            <>
                <div className="seat unavailable" onClick={() => alert("Esse assento não está disponível")} id={id}>
                    <span>{name}</span>
                </div>
            </>
        )
    }

}




