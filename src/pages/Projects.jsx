import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Item from "../components/Card";
import DropWrapper from "../components/DropWrapper";
import { statuses, data, tagColors } from "../data/data";

const Container = styled.div`
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 0px;
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

const Projects = () => {
  const [items, setItems] = useState(data);

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <Container>
      <Column>
        {statuses.map((s) => {
          return (
            <ItemWrapper key={statuses}>
              {s.icon} {s.status} 
              <Span>
                ({data.filter((item) => item.status == s.status).length})
              </Span>
              <Wrapper>
                {data
                  .filter((item) => item.status == s.status)
                  .map((item, idx) => (
                    <Item
                      key={item}
                      item={item}
                      index={idx}
                      status={s}
                      tagColor={tagColors[3]}
                    />
                  ))}
                {/*<DropWrapper onDrop={onDrop} status={s.status}> 
                  
              
                    </DropWrapper>*/}
              </Wrapper>
            </ItemWrapper>
          );
        })}
      </Column>
    </Container>
  );
};

export default Projects;
