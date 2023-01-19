import { IconButton, Modal, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import {
  Block,
  CloseRounded,
  EmailRounded,
  Visibility,
  VisibilityOff,
  PasswordRounded,
  TroubleshootRounded,
  SendRounded,
  SearchOutlined,
  Edit,
} from "@mui/icons-material";
import { tools } from "../data/data";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  inviteTeamMembers,
  inviteProjectMembers,
  searchUsers,
  createProject,
  addTeamProject,
} from "../api/index";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import { tagColors } from "../data/data";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll !important;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: min-content;
  margin: 2%;
  max-width: 800px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FlexDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Top = styled.div`
  padding: 6px 16px 0px 16px;
`;

const Title = styled.div`
  font-size: 20px;
  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
  font-weight: 500;
  color: ${({ theme }) => theme.text};
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
  flex: 7;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;m
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px;
  margin-top: 8px;
`;

const Tag = styled.div`
  padding: 3px 8px;
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
`;

const Hr = styled.hr`
  margin: 2px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft + "99"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px 14px 0px;
`;

const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  gap: 8px;
  border-radius: 8px 8px 0px 0px;
  border: 1.8px solid ${({ theme }) => theme.soft + "99"};
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgDark};
`;

const TaskCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  gap: 8px;
  border-left: 1.8px solid ${({ theme }) => theme.soft + "99"};
  border-right: 1.8px solid ${({ theme }) => theme.soft + "99"};
  border-bottom: 1.8px solid ${({ theme }) => theme.soft + "99"};
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.bgDark + "40"};
  }

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    background-color: ${theme.soft + "30"};
    `}
`;

const No = styled.div`
  width: 4%;
  font-size: 12px;
  text-overflow: ellipsis;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    text-decoration: line-through;
    `}
`;

const Task = styled.div`
  width: 50%;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
  padding: 6px;

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    text-decoration: line-through;
    `}
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  text-overflow: ellipsis;
  width: 14%;
  color: ${({ theme }) => theme.soft2};
  ${({ enddate, theme }) =>
    enddate &&
    `
    color: ${theme.pink};
    `}
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Status = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  width: 10%;
  color: ${({ theme }) => theme.yellow};
  padding: 4px 8px;
  background: ${({ theme }) => theme.yellow + "10"};
  border-radius: 8px;

  ${({ completed, theme }) =>
    completed === "Completed" &&
    `
    color: ${theme.green};
    background: ${theme.green + "10"};
    `}
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin: 12px 20px 0px 20px;
`;

const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.soft};
    color:'${theme.soft2}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0px;
  margin: 12px 20px;
  align-items: center;
  justify-content: space-between;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px 18px;
`;

const Icon = styled.img`
  width: 16px;
  margin: 0px 6px 0px 0px;
`;

const AddMember = styled.div`
  margin: 22px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgDark + "98"};
`;

const Search = styled.div`
  margin: 6px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgDark};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 100px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const UsersList = styled.div`
  padding: 18px 8px;
  display: flex;
  margin-bottom: 12px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;
const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Details = styled.div`
  gap: 4px;
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

const InviteButton = styled.button`
  padding: 6px 14px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 1px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

const WorkDetails = ({ setOpenWork, work }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState(work.tasks);
  const [tag, setTag] = useState(work.tags);
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let count = 0;
    let Members = [];
    task.forEach((item) => {
      if (item.status === "Completed") {
        count++;
      }

      if (item.members.length > 0) {
        item.members.forEach((items) => {
          Members.push(items);

          console.log(items);
        });
      }
    });
    setCompleted(count);
    setProgress((completed / task.length) * 100);
    setMembers(Members);
  }, [work]);

  return (
    <Modal open={true} onClose={() => setOpenWork(false)}>
      <Container>
        <Wrapper>
          <Top>
            <FlexDisplay>
              <Title>The work title</Title>
              <IconButton
                style={{
                  cursor: "pointer",
                  color: "inherit",
                }}
                onClick={() => setOpenWork(false)}
              >
                <CloseRounded style={{ color: "inherit" }} />
              </IconButton>
            </FlexDisplay>
            <Desc>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </Desc>
            <Tags>
              {work.tags.map((tag) => (
                <Tag
                  tagColor={
                    tagColors[Math.floor(Math.random() * tagColors.length)]
                  }
                >
                  {tag}
                </Tag>
              ))}
            </Tags>
            <Members
              style={{
                margin: "10px 0px",
              }}
            >
              {members.slice(0, 10).map((member) => (
                <Avatar
                  sx={{
                    marginRight: "-13px",
                    width: "30px",
                    height: "30px",
                    fontSize: "16px",
                  }}
                  src={member.img}
                >
                  {member.name.charAt(0)}
                </Avatar>
              ))}
              {members.length > 9 && (
                <Avatar
                  sx={{
                    marginRight: "-13px",
                    width: "30px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                >
                  +{members.length - 9}
                </Avatar>
              )}
            </Members>
          </Top>
          <Hr />
          <Bottom>
            <Table>
              <TableHeader>
                <No style={{ fontSize: "14px", fontWeight: "800" }}>No</No>
                <Task
                  style={{ width: "51%", fontSize: "14px", fontWeight: "800" }}
                >
                  Tasks
                </Task>
                <Date style={{ fontSize: "14px", fontWeight: "800" }}>
                  Start Date
                </Date>
                <Date style={{ fontSize: "14px", fontWeight: "800" }}>
                  Deadline
                </Date>
                <Date style={{ fontSize: "14px", fontWeight: "800" }}>
                  Status
                </Date>
                <Date
                  style={{
                    textAlign: "center",
                    width: "20%",
                    fontSize: "14px",
                    fontWeight: "800",
                  }}
                >
                  Members
                </Date>
              </TableHeader>
              {task.map((item, index) => (
                <TaskCard completed={item.status}>
                  <No completed={item.status}>{index + 1}.</No>
                  <Task completed={item.status}>{item.task}</Task>
                  <Date>{item.start_date.split("-").reverse().join("-")}</Date>
                  <Date enddate>
                    {item.end_date.split("-").reverse().join("-")}
                  </Date>
                  <Status completed={item.status}>{item.status}</Status>
                  <Members
                    style={{
                      justifyContent: "center",
                      width: "20%",
                    }}
                  >
                    {item.members.slice(0, 5).map((member) => (
                      <Avatar
                        sx={{
                          marginRight: "-13px",
                          width: "28px",
                          height: "28px",
                          fontSize: "16px",
                        }}
                        src={member.img}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                    ))}

                    {item.members.length > 5 && (
                      <Avatar
                        sx={{
                          marginRight: "-13px",
                          width: "28px",
                          height: "28px",
                          fontSize: "12px",
                        }}
                      >
                        +{members.length - 9}
                      </Avatar>
                    )}
                  </Members>
                </TaskCard>
              ))}
            </Table>
          </Bottom>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default WorkDetails;
