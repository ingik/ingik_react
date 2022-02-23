
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
import ImageBoard from './components/views/ImageBoard/ImageBoard'
import ImageBoardList from './components/views/ImageBoard/ImageBoardList'
import ImageBoardUpdate from './components/views/ImageBoard/ImageBoardUpload'
import OtherProfileCmp from './components/views/Profile/OtherProfileCmp';
// import SideAppBar from './components/views/AppBar/SideAppBar' 라우팅 노필요
// import AppBarCmp from './components/views/AppBar/AppBarCmp'; 지울거


function App() {

  return (
    <Router>
      <div>
        <hr />
       
        <Route  exact 
                path={  ['/','/boards/detail/:key', '/createboard','/boards',
                        '/boards/detail/:key/update','/chat','/chat/create',
                        '/chat/list','/profile','/profile/:key']} 
                component={Auth(SearchAppBar, true)}/>
        <Switch>
          {/* <Route exact path="/" component={Auth(LandingPage, null)}/> */}
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
          <Route exact path="/imageBoard/:key" component={ImageBoard} />
          <Route exact path="/" component={Auth(ImageBoardList,true)} />
          <Route exact path="/imageBoardUpdate" component={Auth(ImageBoardUpdate,true)} />
          <Route exact path="/profile/:key" component={ OtherProfileCmp }/>
          <Route exact path="/modal" component={ Profile }/>
        </Switch>
        
      </div>
    </Router>
  );
}



export default App;
