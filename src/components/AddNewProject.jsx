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

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: min-content;
  margin: 2%;
  max-width: 600px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 12px 20px;
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.textSoft};
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

const AddNewProject = ({ setNewProject, teamId, teamProject }) => {
  const [Loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [backDisabled, setBackDisabled] = useState(false);

  const [showAddProject, setShowAddProject] = useState(true);
  const [showTools, setShowTools] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  const goToAddProject = () => {
    setShowAddProject(true);
    setShowTools(false);
    setShowAddMember(false);
  };

  const goToAddTools = () => {
    setShowAddProject(false);
    setShowAddMember(false);
    setShowTools(true);
  };

  const goToAddMember = () => {
    setShowAddProject(false);
    setShowTools(false);
    setShowAddMember(true);
  };

  //add member part

  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [inputs, setInputs] = useState({ title: "", desc: "" });

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    searchUsers(search)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelect = (user) => {
    const User = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    if (selectedUsers.find((u) => u.id === User.id)) {
    } else {
      setSelectedUsers([...selectedUsers, User]);
      setUsers([]);
      setSearch("");
    }
  };

  //remove members from selected users
  const handleRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  const handleInviteAll = (id) => {
    let teamInvite = false;
    if (teamInvite) {
      selectedUsers.map((user) => {
        inviteTeamMembers(id, user)
          .then((res) => {
            console.log(res);
            dispatch(
              openSnackbar({
                message: `Invitation sent to ${user.name}`,
                type: "success",
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      selectedUsers.map((user) => {
        inviteProjectMembers(id, user)
          .then((res) => {
            console.log(res);
            dispatch(
              openSnackbar({
                message: `Invitation sent to ${user.name}`,
                type: "success",
              })
            );
          })
          .catch((err) => {
            console.log(err);
            dispatch(
              openSnackbar({
                message: `Invitation cant be sent to ${user.name}`,
                type: "error",
              })
            );
          });
      });
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      if (e.target.name === "tags") {
        return { ...prev, [e.target.name]: e.target.value.split(",") };
      } else {
        return { ...prev, [e.target.name]: e.target.value };
      }
    });
  };

  //add tools part

  const [projectTools, setProjectTools] = useState([
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
  ]);
  const handleToolschange = (index, event, icon) => {
    let data = [...projectTools];
    //add it to input fields
    data[index].name = event.target.name;
    data[index].icon = icon;
    data[index].link = event.target.value;
    setProjectTools(data);
  };

  const CreateProject = () => {
    setLoading(true);
    setDisabled(true);
    setBackDisabled(true);
    //remove the empty link objects of project tools
    const tools = projectTools.filter((tool) => tool.link !== "");
    const project = {
      ...inputs,
      tools: tools,
    };
    if (teamProject) {
      addTeamProject(teamId, project)
        .then((res) => {
          // get the id from res and invite members function call
          handleInviteAll(res.data._id);
          setLoading(false);
          setNewProject(false);
          dispatch(
            openSnackbar({
              message: "Project created successfully",
              type: "success",
            })
          );
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setDisabled(false);
          setBackDisabled(false);
          dispatch(
            openSnackbar({
              message: "Something went wrong",
              type: "error",
            })
          );
        });
    } else {
      createProject(project)
        .then((res) => {
          // get the id from res and invite members function call
          handleInviteAll(res.data._id);
          setLoading(false);
          setNewProject(false);
          dispatch(
            openSnackbar({
              message: "Project created successfully",
              type: "success",
            })
          );
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setDisabled(false);
          setBackDisabled(false);
          dispatch(
            openSnackbar({
              message: "Something went wrong",
              type: "error",
            })
          );
        });
    }
  };

  useEffect(() => {
    if (inputs.title === "" || inputs.desc === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [inputs]);

  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => setNewProject(false)}>
      <Container>
        <Wrapper>
          <IconButton
            style={{
              position: "absolute",
              top: "18px",
              right: "30px",
              cursor: "pointer",
              color: "inherit",
            }}
            onClick={() => setNewProject(false)}
          >
            <CloseRounded style={{ color: "inherit" }} />
          </IconButton>
          <Title>Create a new project</Title>

          {showAddProject && (
            <>
              <Label>Project Details :</Label>
              <OutlinedBox style={{ marginTop: "12px" }}>
                <TextInput
                  placeholder="Title (Required)*"
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                />
              </OutlinedBox>
              <OutlinedBox style={{ marginTop: "6px" }}>
                <Desc
                  placeholder="Description (Required)* "
                  name="desc"
                  rows={5}
                  value={inputs.desc}
                  onChange={handleChange}
                />
              </OutlinedBox>
              <OutlinedBox style={{ marginTop: "6px" }}>
                <Desc
                  placeholder="Tags: seperate by , eg- Mongo Db , React JS .."
                  name="tags"
                  rows={4}
                  value={inputs.tags}
                  onChange={handleChange}
                />
              </OutlinedBox>

              <OutlinedBox
                button={true}
                activeButton={!disabled}
                style={{ marginTop: "22px", marginBottom: "18px" }}
                onClick={() => {
                  !disabled && goToAddTools();
                }}
              >
                Next
              </OutlinedBox>
            </>
          )}

          {showTools && (
            <>
              <Label>Tools :</Label>
              <ToolsContainer>
                {tools.map((tool, index) => (
                  <OutlinedBox style={{ marginTop: "8px" }} key={index}>
                    <Icon src={tool.icon} />
                    <TextInput
                      name={tool.name}
                      placeholder={`${tool.name} Link`}
                      type="text"
                      value={projectTools[index].link}
                      onChange={(event) =>
                        handleToolschange(index, event, tool.icon)
                      }
                    />
                  </OutlinedBox>
                ))}
              </ToolsContainer>

              <ButtonContainer>
                <OutlinedBox
                  button={true}
                  activeButton={false}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => {
                    !backDisabled && goToAddProject();
                  }}
                >
                  Back
                </OutlinedBox>
                <OutlinedBox
                  button={true}
                  activeButton={!disabled}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => {
                    goToAddMember();
                  }}
                >
                  Next
                </OutlinedBox>
              </ButtonContainer>
            </>
          )}

          {showAddMember && (
            <>
              <Label>Add Members :</Label>

              <AddMember>
                <Search>
                  <Input
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => handleSearch(e)}
                  />
                  <SearchOutlined
                    sx={{ fontSize: "20px" }}
                    style={{ marginRight: "12px", marginLeft: "12px" }}
                  />
                </Search>
                <UsersList>
                  {users.map((user) => (
                    <MemberCard>
                      <UserData>
                        <Avatar
                          sx={{ width: "34px", height: "34px" }}
                          src={user.img}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Details>
                          <Name>{user.name}</Name>
                          <EmailId>{user.email}</EmailId>
                        </Details>
                      </UserData>
                      <InviteButton onClick={() => handleSelect(user)}>
                        Add
                      </InviteButton>
                    </MemberCard>
                  ))}
                  {selectedUsers.length === 0 && (
                    <div style={{ width: "100%", textAlign: "center" }}>
                      Search to add new members
                    </div>
                  )}
                  {selectedUsers.length > 0 && <div>Added Members :</div>}
                  {selectedUsers.map((user) => (
                    <MemberCard>
                      <UserData>
                        <Avatar
                          sx={{ width: "34px", height: "34px" }}
                          src={user.img}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Details>
                          <Name>{user.name}</Name>
                          <EmailId>{user.email}</EmailId>
                        </Details>
                      </UserData>
                      <InviteButton onClick={() => handleRemove(user)}>
                        Remove
                      </InviteButton>
                    </MemberCard>
                  ))}
                </UsersList>
              </AddMember>

              <ButtonContainer>
                <OutlinedBox
                  button={true}
                  activeButton={false}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => {
                    !backDisabled && goToAddTools();
                  }}
                >
                  Back
                </OutlinedBox>
                <OutlinedBox
                  button={true}
                  activeButton={!disabled}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => {
                    !disabled && CreateProject();
                  }}
                >
                  {Loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Create Project"
                  )}
                </OutlinedBox>
              </ButtonContainer>
            </>
          )}
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default AddNewProject;
