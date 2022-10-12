import { CloseRounded } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import Google from "../Images/google.svg"

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 420px;
  height: 420px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 10px 20px;
`
const GoogleButton = styled.div`
  height: 50px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.textSoft};
  margin: 4px 20px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
const GoogleIcon = styled.img`
  width: 24px;
`

const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SignUp = ({setOpen}) => {
  return (
    <Container>
      <Wrapper>
        <CloseRounded style={{position: 'absolute', top: '24px', right: '30px', cursor: 'pointer'}} onClick={() => setOpen(false)}/>
        <Title>Sign Up</Title>
        <GoogleButton>
          <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png?20210618182606"/>
        Continue with Google
        </GoogleButton>
        <Line>
          _______   Or  _______
        </Line>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
