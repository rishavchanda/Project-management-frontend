import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import styled from "styled-components";
import Item from "../components/Card";
import DropWrapper from "../components/DropWrapper";
import { statuses, data, tagColors } from "../data/data";
import {useDispatch} from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  const getprojects = async() => {
    await axios.get("/users/projects").then((res) => {
      setData(res.data);
    }).then((err) => {      
      dispatch(openSnackbar({message: err.message, type: "error"}));
    });
  }

  useEffect(() => {
    getprojects()
    window.scrollTo(0, 0);
  }, [currentUser]);

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
                      key={item._id}
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
