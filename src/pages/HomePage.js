import styled from 'styled-components';


const Background = styled.div`
  height: 100vh;
  background: url(${process.env.PUBLIC_URL + '/mainPageBackground.png'}) no-repeat;
  background-size: 100% 658px ;
`;

const HomePage = () => {
    return (
        <>
            <Background>
            </Background>
        </>
    );

}

export default HomePage;