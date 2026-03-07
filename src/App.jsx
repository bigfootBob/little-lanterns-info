import './styles/main.scss';
// Capitalize the import names
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

function App() {
  return (
    <div className="app-container">
      {/* React now knows these are your custom components because they are Capitalized */}
      <Header />

      <main className="hero-content">
        <section className="intro">
          <h1 className="hero-title">COMING SOON</h1>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;