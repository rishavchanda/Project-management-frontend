import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Person,
  Visibility,
  VisibilityOff,
  TroubleshootRounded,
} from "@mui/icons-material";
import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Google from "../Images/google.svg";
import { IconButton, Modal } from "@mui/material";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { openSnackbar} from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import validator from "validator";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";


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
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    background: ${theme.itemHover};
    color: '${theme.soft2}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
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

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin: 2px 26px 8px 26px;
  display: block;
  ${({ error, theme }) =>
    error === "" &&
    `    display: none;
    `}
`;

const SignUp = ({ setSignUpOpen, setSignInOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [credentialError, setcredentialError] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [nameCorrect, setNameCorrect] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!disabled) {
      dispatch(loginStart());
      setDisabled(true);
      setLoading(true);
      try {
        const res = await axios.post(`http://localhost:8800/api/auth/signup`, {
          name,
          email,
          password,
        });
        if (res.status === 200) {
          dispatch(
            openSnackbar({ message: res.data.message, severity: "success" })
          );
          setLoading(false);
          setDisabled(false);
          setSignUpOpen(false);
          setSignInOpen(true);
        } else {
          dispatch(loginFailure());
          setcredentialError(`${res.data.message}`);
          setLoading(false);
          setDisabled(false);
        }
      } catch (err) {
        dispatch(loginFailure());
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      }
    }
    if (name === "" || email === "" || password === "") {
      dispatch(
        openSnackbar({
          message: "Please fill all the fields",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (email !== "" )
      validateEmail();
    if (password !== "") 
      validatePassword();
    if (name !== "")
      validateName();
    if (name !== "" && validator.isEmail(email) && passwordCorrect && nameCorrect) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, passwordCorrect, password, nameCorrect]);

  //validate email
  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter a valid Email Id!");
    }
  };

  //validate password
  const validatePassword = () => {
    if (password.length < 8) {
      setcredentialError("Password must be atleast 8 characters long!");
      setPasswordCorrect(false);
    } else if (password.length > 16) {
      setcredentialError("Password must be less than 16 characters long!");
      setPasswordCorrect(false);
    } else if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g) ||
      !password.match(/[^a-zA-Z\d]/g)
    ) {
      setPasswordCorrect(false);
      setcredentialError(
        "Password must contain atleast one lowercase, uppercase, number and special character!"
      );
    } else {
      setcredentialError("");
      setPasswordCorrect(true);
    }
  };

  //validate name
  const validateName = () => {
    if (name.length < 4) {
      setNameCorrect(false);
      setcredentialError("Name must be atleast 4 characters long!");
    } else {
      setNameCorrect(true);
      setcredentialError("");
    }
  };


  
  //Google SignIn
  const handleGoogleLogin = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("http://localhost:8800/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(loginSuccess(res.data));
              setSignUpOpen(false);
              dispatch(
                openSnackbar({
                  message: "Account Created Successfully",
                  severity: "success",
                })
              );
            } else {
              dispatch(loginFailure());
              dispatch(
                openSnackbar({
                  message: res.data.message,
                  severity: "error",
                })
              );
            }
          });
      })
      .catch((err) => {
        dispatch(loginFailure());
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
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
            onClick={handleGoogleLogin}
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
          <Error error={emailError}>{emailError}</Error>
          <OutlinedBox>
            <PasswordRounded style={{ paddingRight: "12px" }} />
            <TextInput
              type={values.showPassword ? "text" : "password"}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton color="inherit" onClick={() => setValues({ ...values, showPassword: !values.showPassword })}>
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </OutlinedBox>
          <Error error={credentialError}>{credentialError}</Error>
          <OutlinedBox
            button={true}
            activeButton={!disabled}
            style={{ marginTop: "6px" }}
            onClick={handleSignUp}
          >
            {Loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Create Account"
            )}
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
