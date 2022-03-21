import React, { Fragment, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//import { useRoutes } from 'hookrouter';
//import Routes from './router';
import './App.css';

//const App = ()=> (
  // function App(){
  //   const routeResult = useRoutes(Routes)
  // return routeResult

  // }
//   const showRegister = () =>
//   {
//     if(window.location.pathname === "/"){
//       return <Register />
//     }
//   }
// export default () =>
// {
//   return <div className="ui container">
//   {showRegister()}
//   </div>
// };
const App = ()=> (

  <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<Login/>} />
        
      </Routes>
    </Router>
  
  // <Fragment>
    
  //   <Register />
  // </Fragment>
  
)
export default App;


// import React, { Fragment } from 'react';
// import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing';
// import Register from './components/auth/Register';
// import Login from './components/auth/Login';

// import './App.css';

// const App = ()=> (
//   <Router>
//     <Fragment>
//       <Navbar />
//       <Route exact path='/' component={ Landing } />
//       <section className='container'>
//         <Routes>
//         <Route exact path='/register' component={Register} />
//         <Route exact path='/login' component={Login} />
//         </Routes>
//       </section>
//     </Fragment>
//   </Router>
  
// )
// export default App;
