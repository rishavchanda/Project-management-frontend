import axios from 'axios';
//https://vexa-server.herokuapp.com/api
//http://localhost:8800/api/
const API = axios.create({ baseURL: 'http://localhost:8800/api/' });

//auth
export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password }, { withCredentials: true });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
},{ withCredentials: true });
export const googleSignIn = async ({
    name,
    email,
    password,
}) => await API.post('/auth/google', {
    name,
    email,
    password,
},{ withCredentials: true });

//user api
export const getUsers = async () => await API.get('/users/find', {
    withCredentials: true
    });
export const searchUsers = async (search) => await API.get(`users/search/${search}`, { withCredentials: true });
export const notifications = async () => await API.get('/users/notifications', { withCredentials: true });

//projects api
export const createProject = async (project) => await API.post('project/', project, { withCredentials: true });
export const getProjects = async () => await API.get(`/users/projects`, { withCredentials: true });
export const getProjectDetails = async (id) => await API.get(`/project/${id}`, { withCredentials: true });
export const inviteProjectMembers = async (id, members) => await API.post(`/project/invite/${id}`, members, { withCredentials: true });
export const addWorks = async (id, works) => await API.post(`/project/works/${id}`, works, { withCredentials: true });


//teams api
export const createTeam = async (team) => await API.post('team/', team, { withCredentials: true });
export const getTeams = async (id) => await API.get(`/team/${id}`, { withCredentials: true });
export const inviteTeamMembers = async (id, members) => await API.post(`/team/invite/${id}`, members, { withCredentials: true });
export const addTeamProject = async (id, project) => await API.post(`/team/addProject/${id}`, project, { withCredentials: true });

