import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './bootstrap.min.css';
import './style.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import { Provider } from 'react-redux';
import { store } from './store/store';


const App = () => {
  return (
    <Provider store={store}>  
      <div className="appContainer">
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
