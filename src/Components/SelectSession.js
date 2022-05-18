import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react';


export default function SelectSession () {
    
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const [error, setError] = useState(false);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        const promise =axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);

        promise.then(response => {
            setMovie(response.data)
            setTimes([...response.data.days])

        })
        .catch(res => {
            setError(true);
        })
    }, []);
    console.log(times)
    return (
        <>
            <div className="box-h2">
            {!error ? null : "Ja era deu ruim hein"}
                <h2>Selecione o horário</h2>
            </div>
            
            {times.map((info, index) => <TimeButton dateId={info.id} day={info.weekday} date={info.date} key={index} horario={info.showtimes}/>)}     
        </>
    )

}


function TimeButton ({dateId, day, date, horario, sessionId}) {
    return (
        <>
            <div className="box-date">
                <h3>{day} - {date}</h3>
            </div>
            <div className="box-buttons-date">
                <div className="button-date">
                <h4>{horario.map((el) => el.name)}</h4>
                </div>
            </div>
        </>
    )
}