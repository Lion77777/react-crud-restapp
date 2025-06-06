import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProjectList from './pages/ProjectList';
import ProjectCreate from './pages/ProjectCreate';
import ProjectEdit from './pages/ProjectEdit';
import ProjectShow from './pages/ProjectShow';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProjectList/>}/>
        <Route path="/create" element={<ProjectCreate/>}/>
        <Route path="/edit/:id" element={<ProjectEdit/>}/>
        <Route path="/show/:id" element={<ProjectShow/>}/>
      </Routes>
    </Router>
  );
}

export default App;
