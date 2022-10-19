import React from "react";
import styled from "styled-components";
import { tagColors } from "../data/data";

const Container = styled.div`
  padding: 4px 4px;
  text-align: left;
  margin: 1px 0px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Details = styled.div`
  gap: 2px;
`;

const Name = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
`;

const EmailId = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft + "99"};
`;

const Role = styled.div`
  font-size: 10px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  color: ${({ tagColor,theme }) => tagColor + theme.lightAdd};
  background-color: ${({ tagColor, theme }) => tagColor + "10"};
`;

const Access = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.soft2 + "33"};
`;

const MemberCard = () => {
  return (
    <Container>
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUB8kqGZ74kvQczb_fL00a6LecB331zRp5SQ&usqp=CAU" />
      <Details>
        <Name>Rishav Chanda</Name>
        <EmailId>rishavchanda0@gmail.com</EmailId>
      </Details>
      <Role      
      tagColor={
        tagColors[Math.floor(Math.random() * tagColors.length)]
      }
      >Developer</Role>
      <Access>Owner</Access>
    </Container>
  );
};

export default MemberCard;
