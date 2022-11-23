import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "../components/Card";
import DropWrapper from "../components/DropWrapper";
import { statuses, data, tagColors } from "../data/data";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useCookies } from "react-cookie";
import { getProjects } from "../api/index";

const Container = styled.div`
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
  justify-content: space-between;
  margin: 12px 0px;
`;
const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 480px) {
    width: 97%;
  }
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
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [cookies, setCookie] = useCookies();
  const getprojects = async () => {
    getProjects().then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getprojects();
    window.scrollTo(0, 0);
  }, [currentUser]);
  console.log(cookies.user)
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
                {loading ? (
                  <>
                    <Skeleton
                      sx={{ marginBottom: "12px", borderRadius: "20px" }}
                      variant="rounded"
                      width={290}
                      height={240}
                    />
                    <Skeleton
                      sx={{ marginBottom: "12px", borderRadius: "20px" }}
                      variant="rounded"
                      width={290}
                      height={240}
                    />
                  </>
                ) : (
                  data
                    .filter((item) => item.status == s.status)
                    .map((item, idx) => (
                      <Item
                        key={item._id}
                        item={item}
                        index={idx}
                        status={s}
                        tagColor={tagColors[3]}
                      />
                    ))
                )}
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
