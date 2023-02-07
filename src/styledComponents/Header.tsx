import styled from "styled-components";

export const Header = styled.header`
    position: relative;
    
    img {
        display: block;
        width: 100vw;
        height: auto;
    }

    h1 {
        position: absolute;
        top: 50%;
        left: 45%;
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
        color: white;
        font-size: 36px;
    }

    @media screen and (min-width: 600px) {
        h1 {
            font-size: 40px;
        }
    }

    @media screen and (min-width: 992px) {
        h1 {
            font-size: 48px;
        }
    }

    @media screen and (min-width: 1200px) {
        h1 {
            font-size: 64px;
        }
    }
`