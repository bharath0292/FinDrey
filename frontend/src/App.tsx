import { RecoilRoot } from 'recoil';
// import AccountListForm from './components/forms/AccountListForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountForm from './components/forms/AccountForm';
import LoginForm from './components/forms/LoginForm';
import HomePage from './pages/HomePage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/accounts" element={<AccountForm />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
