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

const Container = styled.div`
  display: flex; 
  background-color: ${({ theme }) => theme.bg};
`;

const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 0% 1%;
  height: 90vh;
  overflow-y: scroll !important;
  scroll-behavior: smooth;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
          <BrowserRouter>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Main>

              <Navbar />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
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
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;
