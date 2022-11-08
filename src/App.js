import logo from './logo.svg';
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/Theme";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProjectDetails from './pages/ProjectDetails';
import Teams from './pages/Teams';
import ToastMessage from './components/ToastMessage';
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex; 
  background-color: ${({ theme }) => theme.bg};
`;

const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 0% 1%;
  overflow-y: scroll !important;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const { open, message, severity } = useSelector((state) => state.snackbar);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container >
          <BrowserRouter>
            {menuOpen && <Menu setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode} />}
            <Main>
              <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="teams">
                      <Route path=":id" element={<Teams />} />
                    </Route>
                    <Route path="projects">
                      <Route path=":id" element={<ProjectDetails />} />
                    </Route>
                    {/*<Route path="subscriptions" element={<Home type="sub" />}/>
              <Route path="signin" element={<SignIn />} />
              <Route path="video">
                <Route path=":id" element={<Video/>}/>
              </Route>
              */}
                  </Route>
                </Routes>
              </Wrapper>
            </Main>
          </BrowserRouter>
        </Container>
        {open && <ToastMessage open={open} message={message} severity={severity} />}
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;
