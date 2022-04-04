import {connect} from "react-redux";
import {useRouter} from "next/router";
import {useState} from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";


function Navbar(props) {

  const {userInfo} = props.userInfo

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = async () => {
    Cookies.remove('USER_TOKEN')
    await router.push('/login')
  }

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Thống kê
          </a>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }}/>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <p
                  className="mx-4 my-2"
                  style={{
                    color: "var(--primary-color)",
                  }}
              >
                {userInfo.email}
              </p>
              <MenuItem className="" onClick={async ()=>{await router.push("/")}}>
                <p>Quay về trang chủ</p>
              </MenuItem>
              <Divider />
              <MenuItem onClick={onClickLogout}>
                <Logout fontSize="small" className="mr-4"/>
                <p>Đăng xuất</p>
              </MenuItem>
            </Menu>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.authReducer
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
