import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {useNavigate} from 'react-router';
import {useUserStore} from '../../store/userStore';
import Logo from '../../assets/logo.png';
import { set } from 'date-fns';

const pages = [
  // { name: "Trang chủ", link: "/" },
  {name: 'Danh sách mentee', link: '/mentor/list-mentee'},
  {name: 'Lịch dạy', link: '/mentor/calendar'},
  {name: 'Kho bài tập', link: '/mentor/examination'},
  {name: 'Đơn xin học', link: '/mentor/mentee-application'},
  {name: 'Cài đặt', link: '/mentor/settings'},
  {name: 'Nhắn tin', link: ''},
];

const LOGGOUT = 'Đăng xuất';
const settings = [
  {name: 'Hồ sơ', link: '/'},
  {name: 'Lịch sử thanh toán', link: '/'},
  {name: LOGGOUT, link: ''},
  // thêm các trang khác tại đây
];

function MentorHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [clicked, setClicked] = React.useState('Danh sách mentee');
  const {user, setUser, logout} = useUserStore();
  const navigate = useNavigate();
  const handleNavigate = (link, name) => {
    setClicked(name);
    navigate(link);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    if (setting.name == LOGGOUT) {
      // setUser(null);
      logout();
      navigate('/');
      return;
    }
    navigate(setting.link);
  };
  return (
    <AppBar
      style={{
        backgroundColor: '#172e59',
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div>
            <img
              style={{maxWidth: '70px', height: 'auto'}}
              src={Logo}
              alt="logo"
            />
          </div>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() =>
                  handleNavigate(
                    page.name === 'Nhắn tin' ? `/message/${user.id}` : page.link, page.name
                  )
                }
                sx={{
                  fontWeight: 'bold',
                  my: 2,
                  mx: 1,
                  color: 'white',
                  display: 'block',
                  borderBottom: clicked === page.name ? '3px solid white' : null,
                  transform: clicked === page.name ? 'scale(1.1)' : null,
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user?.avatar ? user.avatar : '/static/images/avatar/2.jpg'
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                fontWeight: 'bold',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleSettingClick(setting)}
                >
                  <Typography
                    color={setting.name === LOGGOUT ? 'tomato' : null}
                    textAlign="center"
                  >
                    <strong>{setting.name}</strong>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MentorHeader;
