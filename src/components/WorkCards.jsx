import React from "react";
import { Fragment, useState, useRef } from "react";
import styled from "styled-components";
import { MoreHoriz, TimelapseRounded } from "@mui/icons-material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPE from "../data/types";
import { tagColors } from "../data/data";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 250px;
  padding: 14px 14px;
  text-align: left;
  margin: 12px 0px 18px 0px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.09);
  &:hover {
    transition: all 0.6s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.5);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 17px;
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
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin-top: 4px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Progress = styled.div`
  position: relative;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin: 14px 0px 10px 0px;
  line-height: 1.5;
  overflow: hidden;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.soft2};
  line-height: 1.5;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px 14px 0px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2 + "99"};
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: -12px;
  border: 3px solid ${({ theme }) => theme.bgLighter};
`;

const Card = ({ tagColor, item, index, status }) => {
  return (
    <Container className={"item"}>
      <Top>
        <Title>Works</Title>
        <MoreHoriz style={{ flex: "1"}} />
      </Top>
      <Desc>
        Some work details task Some work details taskSome work details task
      </Desc>
      <Progress>
        <Text>
          Progress
          <Span>2/10</Span>
        </Text>
        <LinearProgress
          sx={{ borderRadius: "10px", height: 5 }}
          variant="determinate"
          value={20}
        />
      </Progress>
      <Bottom>
        <Time>
          <TimelapseRounded sx={{ fontSize: "22px" }} /> Updated 2 day ago
        </Time>
        <AvatarGroup>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUB8kqGZ74kvQczb_fL00a6LecB331zRp5SQ&usqp=CAU" />
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUB8kqGZ74kvQczb_fL00a6LecB331zRp5SQ&usqp=CAU" />
        </AvatarGroup>
      </Bottom>
    </Container>
  );
};

export default Card;
