
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth';
import Board from './components/views/Board/Board'
import CreateBoard from './components/views/Board/CreateBoard'
import BoardList from './components/views/Board/BoardList'
import UpdateBoard from './components/views/Board/UpdateBoard'
import ChatList from './components/views/Chat/ChatList';
import SearchAppBar from './components/views/AppBar/SearchAppBar'
import Profile from './components/views/Profile/Profile'
import ProfileCmp from './components/views/Profile/ProfileCmp';
import ImageBoard from './components/views/ImageBoard/ImageBoard'
import ImageBoardList from './components/views/ImageBoard/ImageBoardList'
import ImageBoardUpdate from './components/views/ImageBoard/ImageBoardUpload'
import OtherProfileCmp from './components/views/Profile/OtherProfileCmp';
import ImageBoardCmpList from './components/views/ImageBoard/ImageBoardCmpList';
import HoverProfile from './components/views/Profile/HoverProfile';
import CardList from './components/views/NavBar/CardList';


function App() {


  return (
    <Router>
      <div>
        <hr />
       
        <Route exact path="/login" component={Auth(LoginPage, false)}/>
        <Route exact path="/register" component={Auth(RegisterPage, false)}/>
        <Route  exact 
                path={  ['/','/boards/detail/:key', '/createboard','/boards',
                        '/boards/detail/:key/update',
                        '/chat/list','/profile','/profile/:key','/imageBoardCmp']} 
                component={Auth(SearchAppBar, true)}/>
        <Switch>
          {/* <Route exact path="/" component={Auth(LandingPage, null)}/> */}
          <Route exact path="/boards/detail/:key" component={Auth(Board,true)} />
          <Route exact path="/createboard" component={Auth(CreateBoard,true)}/>
          <Route exact path="/boards" component={Auth(BoardList , null)}/>
          <Route exact path="/boards/detail/:key/update" component={Auth(UpdateBoard,true)}/>
          <Route exact path="/chat/list" component={ChatList}/>
          <Route exact path="/profile" component={Auth(ProfileCmp,true)}/>
          <Route exact path="/imageBoard/:key" component={ImageBoard} />
          <Route exact path="/" component={Auth(ImageBoardList,true)} />
          <Route exact path="/imageBoardUpdate" component={Auth(ImageBoardUpdate,true)} />
          <Route exact path="/imageBoardCmp" component={ Auth(ImageBoardCmpList,true) } />
          <Route exact path="/profile/:key" component={ OtherProfileCmp }/>
          <Route exact path="/modal" component={ Profile }/>
          <Route exact path="/hover" component={HoverProfile}/>
          <Route exact path="/cardlist" component={CardList}/>
        </Switch>
        
      </div>
    </Router>
  );
}



export default App;
