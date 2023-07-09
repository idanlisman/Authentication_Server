import './App.css';
import NavigationBar from './components/navigation/NavigationBar';
import LoginPage from './components/Auth/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header>
        <NavigationBar />
      </header>
      <main>
        <LoginPage />
      </main>
    </div>
  );
}

export default App;
