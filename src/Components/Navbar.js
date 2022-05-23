import styled from "styled-components"

export default function Navbar() {
    return (
        <Header>
            <h1>CINEFLEX</h1>
        </Header>
    )
}

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 67px;
    background-color: #C3CFD9;

    h1 {
    font-size: 34px;
    line-height: 40px;
    color: #e8833a;
    }
` 