import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
  margin: 6px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 40px;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgDark};
`;
const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 100px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
  padding: 5px 18px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  border-radius: 100px;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" />
            <SearchIcon style={{ marginRight: "12px", marginLeft: "12px" }} />
          </Search>
          {/*<User>
            <VideoCallOutlinedIcon  />
            <Avatar src={currentUser.img} />
          </User>*/}
          <Button onClick={() => setSignInOpen(true)}>
            <AccountCircleOutlinedIcon /> Sign In
          </Button>
        </Wrapper>
      </Container>
      {SignUpOpen && <SignUp setSignUpOpen={setSignUpOpen} setSignInOpen={setSignInOpen}/>}
      {SignInOpen && <SignIn setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />}
    </>
  );
};

export default Navbar;
