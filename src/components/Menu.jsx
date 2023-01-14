import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import {
  Add,
  Dashboard,
  Groups2Rounded,
  HubRounded,
  Logout,
  StreamRounded,
  WorkspacesRounded,
} from "@mui/icons-material";
import { tagColors } from "../data/data";
import LogoIcon from "../Images/Logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { openSnackbar } from "../redux/snackbarSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUsers } from "../api/index";

const Container = styled.div`
  flex: 1.3;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.04);
`;
const ContainerWrapper = styled.div`
  height: 90%;
  overflow-y: scroll !important;
  margin-top: 0px;
`;
const Space = styled.div`
  height: 50px;
`;
const Logo = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: bold;
  margin-bottom: 16px;
  font-size: 20px;
  padding: 22px 0px 0px 24px;
`;
const Image = styled.img`
  height: 22px;
`;

const Item = styled.div`
  display: flex;
  color: ${({ theme }) => theme.itemText};
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 26px;
  &:hover {
    background-color: ${({ theme }) => theme.itemHover};
  }
`;

const Hr = styled.hr`
  margin: 15px 15px 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft + "99"};
  margin-bottom: 4px;
  padding: 0px 26px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TeamIcon = styled(WorkspacesRounded)`
  color: ${({ tagColor }) => tagColor};
  font-size: 18px;
  margin-left: 2px;
`;

const Menu = ({ darkMode, setDarkMode, setMenuOpen, setNewTeam }) => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };

  const [team, setTeams] = useState([]);
  const {currentUser} = useSelector(state => state.user);

  const getteams = async () => {
    getUsers()
      .then((res) => {
        setTeams(res.data.teams);
      })
      .catch((err) => {
        dispatch(openSnackbar({ message: err.message, type: "error" }));
        console.log(err);
      });
  };

  useEffect(() => {
    getteams();
  });
  console.log(team);
  return (
    <Container setMenuOpen={setMenuOpen}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo>
          <Image src={LogoIcon} />
          VEXA
        </Logo>
      </Link>
      <ContainerWrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <Dashboard />
            Dashboard
          </Item>
        </Link>
        <Link
          to="projects"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <HubRounded />
            Projects
          </Item>
        </Link>
        <Link
          to="your-works"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <StreamRounded />
            Your Works
          </Item>
        </Link>
        <Hr />
        <Title>
          <Groups2Rounded /> Teams
        </Title>
        {team.map((team,i) => (
          <Link
            to = {`/teams/${team.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <TeamIcon sx={{ fontSize: "18px" }} tagColor={tagColors[i]} />
              {team.name}
            </Item>
          </Link>
        ))}
        <Item onClick={() => setNewTeam(true)}>
          <Add sx={{ fontSize: "20px" }}  />
          New Team
        </Item>
        <Hr />
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Item onClick={() => logoutUser()}>
          <Logout />
          Logout
        </Item>
        <Space />
      </ContainerWrapper>
    </Container>
  );
};

export default Menu;
