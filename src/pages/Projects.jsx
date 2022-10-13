import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: left;
  margin: 2px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Span = styled.span`
  color: ${({ theme }) => theme.soft2};
  font-weight: 400;
  margin-left: 6px;
`;

const Wrapper = styled.div`
  padding: 6px;
`;

const Projects = () => {
  const Working = [
    {
      id: 1,
      title: "Project 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      tags: ["React", "Node", "MongoDB"],
      time: "2 days ago",
      image: "https://source.unsplash.com/coding",
      members: [{name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}]
    },
    {
      id: 2,
      title: "Project 2",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      tags: ["React", "Node", "MongoDB"],
      time: "2 days ago",
      image: "",
      members: [{name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}]
    }
  ]
  
  const Completed = [
    {
      id: 1,
      title: "Project 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      tags: ["Android", "MERN", "MongoDB"],
      time: "2 days ago",
      image: "",
      members: [{name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}]
    }
  ]

  const InProgress = [
    {
      id: 1,
      title: "Project 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      tags: ["React", "Node", "MongoDB"],
      time: "2 days ago",
      image: "",
      members: [{name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}]
    },
    {
      id: 2,
      title: "Project 2",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      tags: ["React", "Node", "MongoDB"],
      time: "2 days ago",
      image: "https://source.unsplash.com/coding",
      members: [{name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}]
    },
    {
      id: 3,
      title: "Project 3",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      tags: ["React", "Node", "MongoDB"],
      time: "2 days ago",
      image: "",
      members: [{name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}, {name: "John", image: "https://source.unsplash.com/random"}]
    }
  ]

  return (
    <Container>
      <Column>
        <ItemWrapper>
          Working <Span>(0)</Span>
          <Wrapper>
            {Working.map((item) => (
              <Card item={item} />
            ))}
          </Wrapper>
        </ItemWrapper>
        <ItemWrapper>
          In Progress <Span>(4)</Span>
          <Wrapper>
          {Completed.map((item) => (
              <Card item={item} />
            ))}
          </Wrapper>
        </ItemWrapper>    
        <ItemWrapper>
          Completed <Span>(2)</Span>
          <Wrapper>           
          {InProgress.map((item) => (
              <Card item={item} />
            ))}
          </Wrapper>
        </ItemWrapper>
      </Column>
    </Container>
  );
};

export default Projects;
