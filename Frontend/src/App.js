import './App.css';
import NavigationBar from './components/navigation/NavigationBar';
import LoginPage from './components/Auth/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <NavigationBar />
      </header>
      <main>
        <Routes>
        </Routes>
      </main>
    </div>
  );
}

export default App;
