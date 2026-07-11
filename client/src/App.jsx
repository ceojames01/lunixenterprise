import Navbar from './components/common/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';

const App = () => (
  <div className="min-h-screen bg-f1-asphalt text-white flex flex-col">
    <Navbar />
    <div className="flex-1">
      <Dashboard />
    </div>
    <Footer />
  </div>
);

export default App;
