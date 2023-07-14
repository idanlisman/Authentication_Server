import './App.css';
import NavigationBar from './components/navigation/NavigationBar';
import LoginPage from './components/Auth/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsernameContext } from './components/Auth/UsernameContext';
import { useState } from 'react';

function App() {
  const [usernameContext, setUsernameContext] = useState();

  return (
    <div className="App">
      <UsernameContext.Provider value={[usernameContext, setUsernameContext]}>
        <header>
          <NavigationBar />
        </header>
        <main>
          <LoginPage />
        </main>
      </UsernameContext.Provider>
    </div>
  );
}

export default App;
