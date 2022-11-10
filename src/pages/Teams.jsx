import React, { useEffect } from "react";
import { Fragment, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Add,
  AlignHorizontalLeft,
  AlignVerticalTop,
  CheckCircleOutlineOutlined,
  DonutLarge,
  Edit,
  PersonAdd,
} from "@mui/icons-material";
import { data, tools, members, ideas, tagColors } from "../data/data";
import Card from "../components/Card";
import MemberCard from "../components/MemberCard";
import { IconButton } from "@mui/material";
import ToolsCard from "../components/ToolsCard";
import IdeaCard from "../components/IdeaCard";
import axios from "axios";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

const Container = styled.div`
  padding: 14px 14px;
`;

const Header = styled.div``;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  margin: 12px 0px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-top: 6px;
  flex: 7;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Desc = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin-top: 6px;
  flex: 7;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Members = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 0px;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

const InviteButton = styled.button`
  padding: 6px 14px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin: 0px 16px;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

const Hr = styled.hr`
  margin: 18px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft + "99"};
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 20px;
`;

const Work = styled.div`
  flex: 1.6;
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px 8px;
  text-align: left;
  margin: 2px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 4px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.soft2};
  font-weight: 400;
  margin-left: 8px;
`;

const Wrapper = styled.div`
  padding: 12px 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const AddNewButton = styled.div`
  padding: 5px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary + "33"};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const HrHor = styled.div`
  border: 0.5px solid ${({ theme }) => theme.soft + "99"};
`;

const IcoBtn = styled(IconButton)`
  color: ${({ theme }) => theme.textSoft} !important;
`;

const Extra = styled.div`
  flex: 0.8;
`;

const SubCards = styled.div`
  padding: 10px 12px 18px 12px;
  text-align: left;
  margin: 12px 0px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card + "99"};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.09);
`;

const SubCardTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px 4px;
  color: ${({ theme }) => theme.text};
`;

const SubCardsTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Ideas = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 8px;
`;

const Teams = () => {
  const { id } = useParams();
  const [item, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const getTeamDetails = async () => {
    await axios
      .get(`/team/${id}`)
      .then((res) => {
        setItems(res.data.Team);
        setProjects(res.data.projects);
      })
      .then(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getTeamDetails();
  }, [id, currentUser]);


  return (
    <Container>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <Header>
            <Title>{item.name}</Title>
            <Desc>{item.desc}</Desc>
            <Members>
              <AvatarGroup>
                {item.members.map((member) => (
                  <Avatar alt={member.name} sx={{width: '38px', height: '38px', marginRight: '-12px'}} src={member.img}>{member.name.charAt(0)}</Avatar>
                ))}
              </AvatarGroup>
              <InviteButton>
                <PersonAdd sx={{ fontSize: "16px" }} />
                Invite
              </InviteButton>
            </Members>
            <Hr />
          </Header>
          <Body>
            <Work>
              <Text style={{ fontSize: "20px" }}>Projects</Text>
              <Column>
                <ItemWrapper>
                  <Top>
                    <Text>
                      🔆️ In Progress
                      <Span>({projects.filter((item) => item.status == "In Progress").length})</Span>
                    </Text>
                    <AddNewButton>
                      <Add />
                    </AddNewButton>
                  </Top>
                  <Wrapper>
                    {projects
                      .filter((item) => item.status == "Working")
                      .map((item, idx) => (
                        <Card
                          key={idx}
                          item={item}
                          index={idx}
                          status="In Progress"
                          tagColor={tagColors[3]}
                        />
                      ))}
                  </Wrapper>
                </ItemWrapper>
                <ItemWrapper>
                  <Top>
                    <Text>
                      📝 Completed
                      <Span>({projects.filter((item) => item.status == "Completed").length})</Span>
                    </Text>
                  </Top>
                  <Wrapper>
                    {projects
                      .filter((item) => item.status == "Completed")
                      .map((item, idx) => (
                        <Card
                          key={idx}
                          item={item}
                          index={idx}
                          status="Completed"
                          tagColor={tagColors[3]}
                        />
                      ))}
                  </Wrapper>
                </ItemWrapper>
              </Column>
            </Work>
            <HrHor />
            <Extra>
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>Members</SubCardsTitle>
                  <IcoBtn>
                    <Edit sx={{ fontSize: "16px" }} />
                  </IcoBtn>
                </SubCardTop>
                {item.members.map((member) => (
                  <MemberCard member={member} />
                ))}
              </SubCards>
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>Idea List</SubCardsTitle>
                  <IcoBtn>
                    <Add sx={{ fontSize: "20px" }} />
                  </IcoBtn>
                </SubCardTop>
                <Ideas>
                  {/*ideas.map((i, id) => (
                <IdeaCard idea={i} no={id} key={id} />
              ))*/}
                </Ideas>
              </SubCards>
            </Extra>
          </Body>
        </>
      )}
    </Container>
  );
};

export default Teams;
