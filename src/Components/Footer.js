import styled from "styled-components"

export default function Footer({ img, title, hour, day }) {
    return (
        <FooterDiv>
            <FooterImgBox>
                <img src={img} alt={title} />
            </FooterImgBox>
            <FooterText>
                <h3>{title}</h3>
                {day ? <p>{day} - {hour}</p> : ""}
            </FooterText>

        </FooterDiv>
    )
}

const FooterDiv = styled.footer`
    width: 100%;
    height: 120px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #DFE6ED;
    border-top: 1px solid #9eadba;
    padding: 8px;
`

const FooterImgBox = styled.div`
    width: 64px;
    height: 90px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    img {
    width: 48px;
    height: 72px;
    object-fit: cover;
}
`

const FooterText = styled.div`
p {
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    line-height: 30px;
    color: #293845;
    margin-left: 22px;
}
h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    line-height: 30px;
    color: #293845;
    margin-left: 22px;
}
`