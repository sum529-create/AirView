import styled from "styled-components"

const FooterWrapper = styled.footer`
  background-color: #21858c;
  padding: 10px;
  color: white;
  text-align: center;
  position: relative;
  width: 100%;
  bottom: 0;
`

const FooterText = styled.p`
    margin: 0;
  font-size: 0.875rem;
`

export default function Footer() {
    return (
        <>
            <FooterWrapper>
                <FooterText>
                    &copy; 2024 AirView. All rights reserved
                </FooterText>
            </FooterWrapper>
        </>
    )
}