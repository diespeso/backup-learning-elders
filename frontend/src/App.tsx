import './App.css';
import 'antd/dist/antd.min.css';
import MainLayout from './Layout/MainLayout';

import { Leccion1, Leccion2, Leccion3, Leccion4 } from './Containers/lecciones/index'
import Evaluacion from './Components/evaluacion/Evaluacion';
import EvaluacionPre from './Containers/evaluaciones/EvaluacionPre';
import EvaluationPost from './Containers/evaluaciones/EvaluacionPost';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './Stores/store';
import { useEffect } from 'react';

import { getCurrentPageCoockie } from './endpoints'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    getCurrentPageCoockie()
      .then(response => {
        if (response) {
          navigate(`/${response.currentPage}`)
        }
      })
  }, [])
  return (
    <Provider store={store}>
      <div className="App">
        <MainLayout>
          <Routes>
            <Route path="/evaluacion-pre" element={<EvaluacionPre/>}></Route>
            <Route path="/leccion-1" element={<Leccion1/>}/>
            <Route path="/leccion-2" element={<Leccion2/>}/>
            <Route path="/leccion-3" element={<Leccion3/>}/>
            <Route path="/leccion-4" element={<Leccion4/>}/>
            <Route path="/evaluacion-post" element={<EvaluationPost/>}></Route>
          </Routes>
        </MainLayout>
      </div>
    </Provider>
  );
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
