import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/main.scss';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GetStartedPage from './pages/GetStartedPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';

import LanternsLayout from './pages/lanterns/LanternsLayout.jsx';
import StormsPage from './pages/lanterns/StormsPage.jsx';
import GIPage from './pages/lanterns/GIPage.jsx';
import NotesPage from './pages/lanterns/NotesPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/lanterns" element={<LanternsLayout />}>
              <Route index element={<Navigate to="storms" replace />} />
              <Route path="storms" element={<StormsPage />} />
              <Route path="gi" element={<GIPage />} />
              <Route path="notes" element={<NotesPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
