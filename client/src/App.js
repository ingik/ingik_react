
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth';
import Board from './components/views/Board/Board'
import CreateBoard from './components/views/Board/CreateBoard'
import BoardList from './components/views/Board/BoardList';
import UpdateBoard from './components/views/Board/UpdateBoard'
import Chat from './Chat/Chat';

function App() {
  return (
    <Router>
      <div>
        <hr />
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          <Route exact path="/boards/detail/:key" component={Auth(Board,true)} />
          <Route exact path="/createboard" component={Auth(CreateBoard,true)}/>
          <Route exact path="/boards" component={Auth(BoardList , null)}/>
          <Route exact path="/boards/detail/:key/update" component={Auth(UpdateBoard,true)}/>
          <Route exact path="/chat" component={Chat}/>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
