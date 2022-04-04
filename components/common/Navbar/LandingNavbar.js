import {useState} from "react";
import Link from "next/link";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {connect} from "react-redux";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

import SCSS from './SCSSNavbar.module.scss'
import {isEmptyObject} from "../../../helper/validate/check_value";

function LandingNavbar(props) {

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

    const onClickLogin = async () => {
        await router.push('/login')
    }

    const showManagement = () => {
        if(userInfo.idRole.toString() === "1"){
            return (
                <MenuItem onClick={async ()=>{await router.push('/admin/')}}>
                    <p>Admin</p>
                </MenuItem>
            )
        }else if(userInfo.idRole.toString() === "2"){
            return (
                <MenuItem onClick={async ()=>{await router.push('/management')}}>
                    <p>Quản lý</p>
                </MenuItem>
            )
        }else if(userInfo.idRole.toString() === "3"){
            return (
                <MenuItem onClick={async ()=>{await router.push('/vaccination_place')}}>
                    <p>Quản lý điểm tiêm</p>
                </MenuItem>
            )
        }else if(userInfo.idRole.toString() === "4"){
            return (
                <MenuItem onClick={async ()=>{await router.push('/organization')}}>
                    <p>Doanh nghiệp</p>
                </MenuItem>
            )
        }else{
            return (
                <div>
                    <MenuItem onClick={async ()=>{await router.push("/profile")}}>
                        <p>Thông tin cá nhân</p>
                    </MenuItem>
                    <MenuItem onClick={async ()=>{await router.push("/my_vaccination_record")}}>
                        <p>Hồ sơ tiêm chủng</p>
                    </MenuItem>
                    <MenuItem onClick={async ()=>{await router.push("/my_feedback")}}>
                        <p>Cập nhật tình hình sau tiêm</p>
                    </MenuItem>
                </div>
            )
        }
    }

    const showMenu = () => {
        if(isEmptyObject(userInfo)){
            return (<Button variant="contained" onClick={onClickLogin} className={SCSS.customButton}>Đăng nhập</Button>)
        }else {
            return (
                <div>
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
                        {showManagement()}
                        <Divider />
                        <MenuItem onClick={onClickLogout}>
                            <Logout fontSize="small" className="mr-4"/>
                            <p>Đăng xuất</p>
                        </MenuItem>
                    </Menu>
                </div>
            )
        }
    }

    return (
        <>
            <nav
                className="w-full flex flex-wrap items-center justify-between px-2 py-2 navbar-expand-lg shadow"
                style={{
                    backgroundColor: "white",
                }}
            >
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <Link href="/" className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="flex items-center text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                            href=""
                            style={{
                                color: "var(--primary-color)",
                            }}
                        >
                            <img src="/covid19.png" className="w-10 h-10 mr-2"/>
                            Vaccinations
                        </a>
                    </Link>
                    <div className="flex">
                        {showMenu()}
                    </div>
                </div>
            </nav>
        </>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LandingNavbar);
