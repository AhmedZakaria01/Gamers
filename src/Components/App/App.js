import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Master from '../Master/Master';
import Home from '../Home/Home';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import All from '../All/All';
import Platforms from '../Platforms/Platforms';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import GameDetails from '../GameDetails/GameDetails';


function App() {

  const [userData, setUserData] = useState(null)
  let saveUserData = () => {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken);
  }

  useEffect(() => {

    if (localStorage.getItem('userToken')) {
      saveUserData()
    }

  }, [])


  function removeUserData() {
    localStorage.removeItem('token');
    setUserData(null);
    <Navigate to='/login' />;
  }

  let routers = createBrowserRouter([
    {
      path: '/', element: <Master userData={userData} removeUserData={removeUserData} />, children: [
        { index: 'true', element: <ProtectedRoute userData={userData}> <Home /> </ProtectedRoute> },
        { path: 'Gamers', element: <ProtectedRoute userData={userData}> <Home /> </ProtectedRoute> },
        { path: 'all', element: <ProtectedRoute userData={userData}><All /> </ProtectedRoute> },
        { path: 'platforms/:platform', element: <ProtectedRoute userData={userData}> <Platforms /> </ProtectedRoute> },
        { path: 'sort-by/:x', element: <ProtectedRoute userData={userData}> <Sort /> </ProtectedRoute> },
        { path: 'categories/:x', element: <ProtectedRoute userData={userData}> <Categories /> </ProtectedRoute> },
        { path: 'details/:id', element: <ProtectedRoute userData={userData}> <GameDetails /> </ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <ErrorPage userData={userData} /> }
      ]
    },
  ]);

  return (<>
    <RouterProvider router={routers} />
  </>
  );
}



export default App;
