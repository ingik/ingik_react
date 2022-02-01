
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
import BoardList from './components/views/Board/BoardList'
import UpdateBoard from './components/views/Board/UpdateBoard'
import Chat from './components/views/Chat/ChatDetail'
import CreateChat from './components/views/Chat/CreateChat'
import ChatList from './components/views/Chat/ChatList';
import SearchAppBar from './components/views/AppBar/SearchAppBar'
import Profile from './components/views/Profile/Profile'
import ProfileCmp from './components/views/Profile/ProfileCmp';
// import SideAppBar from './components/views/AppBar/SideAppBar'
// import AppBarCmp from './components/views/AppBar/AppBarCmp';


function App() {

  return (
    <Router>
      <div>
        <hr />
       
        <Route  exact 
                path={  ['/','/boards/detail/:key', '/createboard','/boards',
                        '/boards/detail/:key/update','/chat','/chat/create',
                        '/chat/list','/profile']} 
                component={Auth(SearchAppBar, true)}/>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}></Route>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          <Route exact path="/boards/detail/:key" component={Auth(Board,true)} />
          <Route exact path="/createboard" component={Auth(CreateBoard,true)}/>
          <Route exact path="/boards" component={Auth(BoardList , null)}/>
          <Route exact path="/boards/detail/:key/update" component={Auth(UpdateBoard,true)}/>
          <Route exact path="/chat" component={Auth(Chat,true)}/>
          <Route exact path="/chat/create" component={ CreateChat }/>
          <Route exact path="/chat/list" component={Auth(ChatList,true)}/>
          <Route exact path="/profile" component={Auth(ProfileCmp,true)}/>
          {/* <Route exact path="/AppBar" component={AppBarCmp}/> 필요없음*/}
          {/* <Route exact path="/SideBar" component={SideAppBar}/> 지울거*/}

          <Route exact path="/modal" component={ Profile }/>
        </Switch>
        
      </div>
    </Router>
  );
}



export default App;
