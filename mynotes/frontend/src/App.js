import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import Notepage from './pages/Notepage';

function App() {
  return (
    <Router>
       <div className="container dark">
       <div className="app">
      <Header />
      <Routes>
      <Route path="/" element={<NotesListPage />} />
      <Route path="note/:id" element={<Notepage />} />
      </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
