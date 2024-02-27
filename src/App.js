import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer theme="colored" autoClose={2000} />
    </>
  );
}

export default App;
