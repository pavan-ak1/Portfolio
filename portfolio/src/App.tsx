import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer.tsx';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import TargetCursor from './components/TargetCursor';

function App() {
  // Add cursor-target class to all interactive elements
  useEffect(() => {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .cursor-target');
    interactiveElements.forEach(el => {
      if (!el.classList.contains('cursor-target')) {
        el.classList.add('cursor-target');
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <TargetCursor 
          spinDuration={2}
          hideDefaultCursor={true}
        />
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-color)',
                color: 'var(--text-color)',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
