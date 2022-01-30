import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Profile(props){

const userData = useSelector(state => state.user.userData)

//avatar  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);


const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
  setAnchorElNav(anchorElNav);
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

// console.log('(Profile)props : '+ JSON.stringify(props))
const onLogOut = () => {
    // setAnchorEl(null);
    // handleMobileMenuClose();
    axios.get('/api/users/logout')
        .then(response => {
            console.log(response.data)
            if(response.data.success) {
                props.Data.history.push('/login')
            } else {
                alert('로그아웃 실패')
            }
        })
}

const onProfile = () => {
    props.Data.history.push('/profile')
}

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              src={userData?.image}
              sx={{ marginLeft: "10px" }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center" component="div" onClick={onProfile}>
              Profile
            </Typography>

            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal> */}

          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center" component="div" onClick={onLogOut}>
              LogOut
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}