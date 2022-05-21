import styled from "styled-components";
import { Link } from 'react-router-dom';


export default function Success ({seatsData, name, cpf, seatName, setMovie, setSeatsData, setName, setCpf, setSeatName, setMovieList, setTimes, setSeats, setPostId}) {

    const title = (seatsData.movie.title)
    const date = (seatsData.day.date)
    const hour = (seatsData.name)

    function reset () {
        setMovie({});
        setSeatsData({});
        setName("");
        setCpf("");
        setSeatName([]);
        setMovieList([]);
        setTimes([]);
        setSeats([]);
        setPostId([]);
    }

    return (
        <>
            <TitleMenu>
                <h2>Pedido feito com sucesso!</h2>
            </TitleMenu>
            <Container>
                <ContentBox>
                    <h3>Filme e sessão</h3>
                    <p>{title}</p>
                    <p>{date} {hour}</p>
                </ContentBox>
                <ContentBox>
                    <h3>Ingressos</h3>
                    {seatName.map(el => <p>Assento {el}</p>)}
                </ContentBox>
                <ContentBox>
                    <h3>Comprador</h3>
                    <p>Nome: {name}</p>
                    <p>CPF: {cpf}</p>
                </ContentBox>
                <HomeButton>
                    <Link to={"/"}>
                    <button onClick={reset}>Voltar para home</button>
                    </Link>
                </HomeButton>
            </Container>
        </>

    )
}



const TitleMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    margin-top: 70px;
    h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #247A6B;
}
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 70vh;
    margin-left: 24px;
    margin-right: 24px;
    h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #293845;

    }
    p {
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #293845;
    }
`
const ContentBox = styled.div`
    width: 100%;
`
const HomeButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    margin-top: 60px;
    button {
    border: 1px solid #e8833a;
    background-color: #E8833A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 21px;
    letter-spacing: 0.04em;

    color: #FFFFFF;
    }
`