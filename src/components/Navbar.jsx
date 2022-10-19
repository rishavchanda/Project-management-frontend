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
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { MenuOpen, NotificationsRounded } from "@mui/icons-material";
import Badge from "@mui/material/Badge";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
  margin: 6px 6px 0px 6px;
  border-radius: 12px;
  z-index: 100;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 14px;
  position: relative;
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.textSoft} !important;
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
  gap: 12px;
  font-weight: 500;
  font-size: 18px;
  padding: 0px 8px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = ({ menuOpen, setMenuOpen }) => {
  // const { currentUser } = useSelector((state) => state.user);
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);
  return (
    <>
      <Container>
        <Wrapper>
          <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon />
          </IcoButton>
          <Search>
            <Input placeholder="Search" />
            <SearchIcon style={{ marginRight: "20px", marginLeft: "20px" }} />
          </Search>
          <User>
            <IcoButton>
              <Badge badgeContent={4} color="primary">
                <NotificationsRounded />
              </Badge>
            </IcoButton>
            <IcoButton>
              <Badge
                badgeContent="    "
                color="success"
                variant="dot"
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHd_XKsw6LmueZnx8WO9oB_jMDieCpOKWe3Q&usqp=CAU"
                  name="R"
                />
              </Badge>
            </IcoButton>

            {/*
            <Button onClick={() => setSignInOpen(true)}>
              <AccountCircleOutlinedIcon /> Sign In
            </Button>
            */}
          </User>
        </Wrapper>
      </Container>
      {SignUpOpen && (
        <SignUp setSignUpOpen={setSignUpOpen} setSignInOpen={setSignInOpen} />
      )}
      {SignInOpen && (
        <SignIn setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />
      )}
    </>
  );
};

export default Navbar;
