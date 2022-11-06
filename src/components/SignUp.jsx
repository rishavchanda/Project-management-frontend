import {
  CloseRounded,
  EmailRounded,
  Password,
  PasswordRounded,
  Person,
  TroubleshootRounded,
} from "@mui/icons-material";
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Google from "../Images/google.svg";
import { Modal } from "@mui/material";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { openSnackbar, closeSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api";
import ToastMessage from "./ToastMessage";

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
  border-radius: 30px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 16px 28px;
`;
const OutlinedBox = styled.div`
  height: 50px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
  border: none;
    background: ${theme.itemHover};
    color: '${theme.soft2}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 14px;
`;
const GoogleIcon = styled.img`
  width: 24px;
`;
const Divider = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.soft};
  font-size: 18px;
  font-weight: 600;
`;
const Line = styled.div`
  width: 80px;
  height: 1px;
  border-radius: 10px;
  margin: 0px 10px;
  background-color: ${({ theme }) => theme.soft};
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const LoginText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  margin: 20px 20px 38px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const SignUp = ({ setSignUpOpen, setSignInOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`http://localhost:8800/api/auth/signin`, { email, password });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    } 
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`http://localhost:8800/api/auth/signup`, { name, email, password });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      dispatch(openSnackbar({ message: res.data.message, type: "success" }));
      setSignUpOpen(false)
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  //ssetSignInOpen(false)
  return (
    <Modal open={true} onClose={() => setSignInOpen(false)}>
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => setSignUpOpen(false)}
          />
          <Title>Sign Up</Title>
          <OutlinedBox
            googleButton={TroubleshootRounded}
            style={{ margin: "24px" }}
          >
            <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png?20210618182606" />
            Continue with Google
          </OutlinedBox>
          <Divider>
            <Line />
            or
            <Line />
          </Divider>
          <OutlinedBox style={{ marginTop: "24px" }}>
            <Person style={{ paddingRight: "12px" }} />
            <TextInput
              placeholder="Full Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </OutlinedBox>
          <OutlinedBox>
            <EmailRounded style={{ paddingRight: "12px" }} />
            <TextInput
              placeholder="Email Id"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </OutlinedBox>
          <OutlinedBox>
            <PasswordRounded style={{ paddingRight: "12px" }} />
            <TextInput
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </OutlinedBox>
          <OutlinedBox
            button={true}
            activeButton={true}
            style={{ marginTop: "6px" }}
            onClick={handleSignUp}
          >
            Create Account
          </OutlinedBox>
          <LoginText>
            Already have an account ?
            <Span
              onClick={() => {
                setSignUpOpen(false);
                setSignInOpen(true);
              }}
              style={{
                fontWeight: "500",
                marginLeft: "6px",
                cursor: "pointer",
              }}
            >
              Sign In
            </Span>
          </LoginText>
        </Wrapper>
      </Container>      
    </Modal>
  );
};

export default SignUp;
