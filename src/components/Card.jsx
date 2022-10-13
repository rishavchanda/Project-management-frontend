import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { DateRangeRounded, MoreHoriz } from "@mui/icons-material";

const Container = styled.div`
  padding: 14px 14px;
  text-align: left;
  margin: 12px 0px 18px 0px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
    height: 140px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 12px;
  display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin-top: 8px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 12px;
`;

const Tag = styled.div`
  padding: 6px 16px;
  border-radius: 8px;
  color: #4cc08f;
  border: 1px solid #4cc08f;
  font-size: 13px;
  font-weight: 500;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 4px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.soft2};
`;

const Card = ({item}) => {
  return (
    <ChakraProvider>
      <Container>
        {item.image && <Image src={item.image} />}
        <Title>{item.title}<MoreHoriz/></Title>
        <Desc>
        {item.desc}
         </Desc>
        <Tags>
            {item.tags.map((tag) => (
                <Tag>{tag}</Tag>    
            ))}
        </Tags>
        <Bottom>
          <Time>
            <DateRangeRounded /> {item.time}
          </Time>
          <AvatarGroup  size="sm" max={3}>
            {item.members.map((member) => (
                <Avatar name={member.name} src={member.image} />
            ))}
            </AvatarGroup>
        </Bottom>
      </Container>
    </ChakraProvider>
  );
};

export default Card;
