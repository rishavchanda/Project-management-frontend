import React, { useEffect } from "react";
import { Fragment, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { data } from "../data/data";
import WorkCards from "../components/WorkCards";
const Container = styled.div`
  padding: 14px 14px;
`;

const Header = styled.div``;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 0px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
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

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-right: -12px;
  border: 3px solid ${({ theme }) => theme.bgLighter};
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

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  text-align: left;
  margin: 2px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Span = styled.span`
  color: ${({ theme }) => theme.soft2};
  font-weight: 400;
  margin-left: 8px;
`;

const Wrapper = styled.div`
  padding: 12px 6px;
`;

function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return null;
  }

const ProjectDetails = () => {
  const { id } = useParams();
  const [item, setItems] = useState(data[0]);
  useEffect(() => {
    setItems(data[id - 1]);
  }, [id]);
  return (
    <Container>
        <ScrollToTopOnMount />
      <Header>
        <Title>{item.title}</Title>
        <Desc>{item.desc}</Desc>
        <Members>
          <AvatarGroup>
            {item.members.map((member) => (
              <Avatar src={member.image} />
            ))}
          </AvatarGroup>
          <InviteButton>
            <PersonAdd sx={{ fontSize: "16px" }} />
            Invite
          </InviteButton>
        </Members>
        <Hr />
      </Header>
      <Column>
        <ItemWrapper>
          In Progress
          <Span>(5)</Span>
          <Wrapper>
            <WorkCards />
            <WorkCards />
            <WorkCards />
          </Wrapper>
        </ItemWrapper>
      </Column>
    </Container>
  );
};

export default ProjectDetails;
