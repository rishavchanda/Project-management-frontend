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
import WorkCards from "../components/WorkCards";
import MemberCard from "../components/MemberCard";
import { IconButton } from "@mui/material";
import ToolsCard from "../components/ToolsCard";
import IdeaCard from "../components/IdeaCard";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { openSnackbar} from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import { getProjectDetails } from "../api/index";
import InviteMembers from "../components/InviteMembers";
import AddWork from "../components/AddWork";

const Container = styled.div`
  padding: 14px 14px;
  @media screen and (max-width: 480px) {
    padding: 10px 10px;
  }
`;

const Header = styled.div``;

const Column = styled.div`
  display: flex;
  ${(props) =>
    props.alignment ? "flex-direction: row;" : "flex-direction: column;"}
  margin: 12px 0px;
  @media screen and (max-width: 480px) {
    margin: 6px 0px;
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 24px;
  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
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

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 6px;
  margin-top: 14px;
`;

const Tag = styled.div`
  padding: 4px 10px;
  border-radius: 8px;
  color: ${({ tagColor, theme }) => tagColor + theme.lightAdd};
  background-color: ${({ tagColor, theme }) => tagColor + "10"};
  font-size: 12px;
  font-weight: 500;
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
  font-size: 11px;
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
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
  gap: 20px;
`;

const Work = styled.div`
  flex: 1.6;
`;

const Allignment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToggleButton = styled.div`
  padding: 0px 16px;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  border-radius: 5px;
  ${(props) => {
    if (props.button == "row") {
      return `border-radius: 5px 0px 0px 5px; border: 2px solid ${props.theme.soft2};`;
    }
    if (props.button == "col") {
      return `border-radius: 0px 5px 5px 0px; border: 2px solid ${props.theme.soft2};`;
    }
  }}
  ${(props) => {
    if (props.alignment && props.button == "row") {
      return `border-radius: 5px 0px 0px 5px; border: 2px solid ${
        props.theme.primary
      }; color: ${props.theme.primary}; background-color: ${
        props.theme.primary + "11"
      };`;
    }
    if (!props.alignment && props.button == "col") {
      return `border-radius: 0px 5px 5px 0px; border: 2px solid ${
        props.theme.primary
      }; color: ${props.theme.primary}; background-color: ${
        props.theme.primary + "11"
      };`;
    }
  }}
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  @media screen and (max-width: 480px) {
    width: 94%;
  }
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 12px;
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
  flex: 1;
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

const Tools = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 8px;
`;

const Ideas = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 8px;
`;

const ProjectDetails = () => {
  const { id } = useParams();
  const [item, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invitePopup, setInvitePopup] = useState(false);
  const dispatch = useDispatch();
  const getproject = async () => {
    getProjectDetails(id)
      .then((res) => {
        setItems(res.data.project);
        setMembers(res.data.members);
      })
      .then(() => {
        setLoading(false);
      }).catch((err) => {
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getproject();
  }, [id]);

  console.log(item);
  const [alignment, setAlignment] = React.useState(true);

  return (
    <Container>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <Header>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            <Tags>
              {item.tags.map((tag) => (
                <Tag
                  tagColor={
                    tagColors[Math.floor(Math.random() * tagColors.length)]
                  }
                >
                  {tag}
                </Tag>
              ))}
            </Tags>
            <Members>
              <AvatarGroup>
                {members.map((member) => (
              <Avatar sx={{marginRight: '-12px', width: '38px', height: '38px'}} src={member.img} />
            ))}
              </AvatarGroup>
              <InviteButton onClick={ () => setInvitePopup(true)}>
                <PersonAdd sx={{ fontSize: "12px" }} />
                Invite
              </InviteButton>
            </Members>
            <Hr />
            {invitePopup && (
              <InviteMembers setInvitePopup={setInvitePopup} id={id} teamInvite={false}/>
            )}
          </Header>
          <Body>
            <Work>
              <Allignment>
                <ToggleButton
                  alignment={alignment}
                  button={"row"}
                  onClick={() => setAlignment(true)}
                >
                  <AlignVerticalTop sx={{ fontSize: "18px" }} />
                </ToggleButton>
                <ToggleButton
                  alignment={alignment}
                  button={"col"}
                  onClick={() => setAlignment(false)}
                >
                  <AlignHorizontalLeft sx={{ fontSize: "18px" }} />
                </ToggleButton>
              </Allignment>
              <Column alignment={alignment}>
                <ItemWrapper>
                  <Top>
                    <Text>
                      <DonutLarge sx={{ color: "#1976D2", fontSize: "20px" }} />
                      In Progress
                      <Span>(5)</Span>
                    </Text>
                    <AddNewButton>
                      <Add />
                    </AddNewButton>
                  </Top>
                  <Wrapper alignment={alignment}>
                    <AddWork ProjectMembers={members} ProjectId={id}/>
                    <WorkCards status="In Progress" />
                    <WorkCards status="In Progress" />
                    <WorkCards status="In Progress" />
                  </Wrapper>
                </ItemWrapper>
                <ItemWrapper>
                  <Top>
                    <Text>
                      <CheckCircleOutlineOutlined
                        sx={{ color: "#67BC6D", fontSize: "20px" }}
                      />
                      Completed
                      <Span>(5)</Span>
                    </Text>
                  </Top>
                  <Wrapper alignment={alignment}>
                    <WorkCards status="Completed" />
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
                {members.map((member) => (
              <MemberCard member={member} />
            ))}
              </SubCards>
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>Tools</SubCardsTitle>
                  <IcoBtn>
                    <Add sx={{ fontSize: "20px" }} />
                  </IcoBtn>
                </SubCardTop>
                <Tools>
                  {item.tools.map((tool) => (
                <ToolsCard tool={tool} />
              ))}
                </Tools>
              </SubCards>
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>Idea List</SubCardsTitle>
                  <IcoBtn>
                    <Add sx={{ fontSize: "20px" }} />
                  </IcoBtn>
                </SubCardTop>
                <Ideas>
                  {/*ideas.map((i,id) => (
                <IdeaCard idea={i} no={id} key={id}/>
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

export default ProjectDetails;
