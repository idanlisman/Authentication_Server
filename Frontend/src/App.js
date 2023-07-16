import './App.css';
import NavigationBar from './components/navigation/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { LoginPageStateContext } from './components/Auth/LoginPageStateContext';
import { useState } from 'react';
import LoginPage from './components/Auth/LoginPage';
import UsersPage from './components/Users/UsersPage';

function App() {

  const [isLoginPage, setIsLoginPage] = useState({
    isScreenActive: false,
    isUserConnected: false
  });

  return (
    <div className="App">
      <LoginPageStateContext.Provider value={[isLoginPage, setIsLoginPage]}>
        {isLoginPage.isScreenActive && <LoginPage />}
        <div>
          <Routes>
            <Route path='/' Component={NavigationBar}>
              <Route path='/:username' Component={UsersPage} />
            </Route>
          </Routes>
        </div>
      </LoginPageStateContext.Provider>
    </div>
  );
}

export default App;
