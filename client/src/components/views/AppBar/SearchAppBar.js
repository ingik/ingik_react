import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Profile from '../Profile/Profile';
import SideAppBar from './SideAppBar';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Autocomplete, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { useRef } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




function SearchAppBar(props) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [SearchValue, setSearchValue] = useState("");
  const [UserList, setUserList] = useState([]);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

//   메뉴미디어 쿼리
  const renderMobileMenu = (
    <Menu
    sx={{ mt: '45px' }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );


  // search list 

  const [anchorEl, setAnchorEl] = useState(null);
  const searchInput = useRef()
  const [OnOff, setOnOff] = useState(false)
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setSearchValue("")
  };


  const onSearchHanler = (event) => {
    event.preventDefault()

    setSearchValue(event.currentTarget.value)
    console.log(event.currentTarget.value)
    let body = {
      name : event.currentTarget.value 
    }

    
    
    if(event.currentTarget.value !== ""){
      axios.post('/api/users/list',body).then(response => {
        console.log(response.data)
        setUserList(response.data)
      })
      setAnchorEl(event.currentTarget)
    } else {
      handleClose()
    } 

    setAnchorEl("")
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit"
      style={{}}
      >
        <Toolbar>
          {/* SidsAppBar Component */}
          <SideAppBar propsData={props} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            LOGO
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={SearchValue}
              onChange={onSearchHanler}
            />

            {/* <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={UserList.map((option) => option.name)}
              renderInput={(params) => <TextField {...params} />}
              value={SearchValue}
              onChange={onSearchHanler}
            /> */}
            <List
              style={{
                position: "absolute",
                zIndex: "99",
                backgroundColor: "white",
                maxHeight: "25em",
                overflowY: "auto",
                width:'100%',
                paddingBottom:0,
                borderRadius:'5px'
              }}
              anchorEl={anchorEl}
            open={OnOff}
            onClose={handleClose}
              
            >
              {UserList.map((item) => {
                return (
                  <ListItem
                    key={item.name}
                    style={{ width: "100%" }}
                    onClick={() => {
                      props.history.push("/profile/" + item._id);
                      setOnOff(false)
                      setUserList([])
                      setSearchValue("")
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{
                              display: "inline",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "200px",
                            }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.intro}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Search>

          {/* <Menu
            // id="demo-positioned-menu"
            // aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            style={{ height: "500px", overflowY: "auto" }}
          >
            {UserList.map((item) => {
              return <MenuItem>{item.name}</MenuItem>;
            })}
          </Menu> */}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* media */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

          <Profile Data={props} />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

export default withRouter(SearchAppBar)