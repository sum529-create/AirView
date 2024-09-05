import styled from "styled-components";
import { Helmet } from "react-helmet";

const LogoTit = styled.h1`
  font-family: "Great Vibes", cursive;
  font-weight: 400;
  font-style: normal;
  margin: 0 auto;
  font-size: 36px;
`;

function Header() {
  return (
    <>
      <Helmet>
        <title>실시간 대기오염 정보</title>
        <meta property="og:title" content="실시간 대기오염 정보" />
        <meta
          property="og:description"
          content="사용자에게 실시간으로 대기오염 상황을 지도 위에 시각화하여 보여주는 사이트입니다."
        />
        <meta property="og:image" content="/air_view_logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <LogoTit>Air View</LogoTit>
    </>
  );
}

export default Header;
