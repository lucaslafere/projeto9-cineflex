import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

import Navbar from './Navbar';
import SelectMovie from './SelectMovie';
import SelectSession from './SelectSession';
import SelectSpot from './SelectSpot';
import Success from './Success';


export default function App () {
    const [movie, setMovie] = useState({});
    const [seatsData, setSeatsData] = useState({});
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [seatName, setSeatName] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [times, setTimes] = useState([]);
    const [seats, setSeats] = useState([]);
    const [postId, setPostId] = useState([]);


    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<SelectMovie movieList={movieList} setMovieList={setMovieList} />}/>

                <Route path="/sessoes/:movieId" element={<SelectSession movie={movie} setMovie={setMovie} times={times} setTimes={setTimes} />} />

                <Route path="/assentos/:sessionId" element={<SelectSpot seatsData={seatsData} setSeatsData={setSeatsData} name={name} setName={setName} cpf={cpf} setCpf={setCpf} seatName={seatName} setSeatName={setSeatName} seats={seats} setSeats={setSeats}  postId={postId} setPostId={setPostId} />} />

                <Route path="/sucesso" element={<Success seatsData={seatsData} name={name} cpf={cpf} seatName={seatName} setMovie={setMovie} setSeatsData={setSeatsData} setName={setName} setCpf={setCpf} setSeatName={setSeatName} setMovieList={setMovieList} setTimes={setTimes} setSeats={setSeats} setPostId={setPostId}  />} />
            </Routes>
        </BrowserRouter>
    )
}