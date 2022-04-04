import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {connect} from "react-redux";

import rolePage from './role_page'
import {getInfoUser} from "../../redux/actions/authAction";
import Cookies from 'js-cookie'
import {USER_TOKEN} from "../define";

function RouterGuard(props) {
    const router = useRouter();

    const [authorized, setAuthorized] = useState(false);

    let {userInfo} = props.userInfo

    const checkUrlInRole = (url, role) => {
        let result = rolePage[role].find((element) => {
            return url.includes(element);
        });
        return !!result;
    }

    const routerRedirectionContent = async (url) => {
        if(url === "/") return true
        if (checkUrlInRole(url, "PUBLIC")) {
            return true
        }
        if (Object.keys(userInfo).length !== 0) {
            if (checkUrlInRole(url, "USER_LOGIN")) {
                return true
            }else{
                let role = userInfo.idRole
                if (checkUrlInRole(url, "ADMIN") && role.toString() === "1") {
                    return true
                } else if (checkUrlInRole(url, "MANAGEMENT") && role.toString() === "2") {
                    return true
                } else if (checkUrlInRole(url, "VACCINATION_PLACE") && role.toString() === "3") {
                    return true
                } else if (checkUrlInRole(url, "ORGANIZATION") && role.toString() === "4") {
                    return true
                } else {
                    await router.push('/')
                    return false
                }
            }
        }else{
            await router.push('/login')
            return false
        }
    }

    const urlCheck = async (url) => {
        let myInfoUser = {}
        if (typeof (Cookies.get(USER_TOKEN)) !== "undefined" && Cookies.get(USER_TOKEN).length !== 0) {
            myInfoUser = await props.getInfoUser()
        }
        if(url === "/") return true
        if (checkUrlInRole(url, "PUBLIC")) {
            return true
        }
        if (Object.keys(myInfoUser).length !== 0) {
            if (checkUrlInRole(url, "USER_LOGIN")) {
                return true
            }else{
                let role = myInfoUser.idRole
                if (checkUrlInRole(url, "ADMIN") && role.toString() === "1") {
                    return true
                } else if (checkUrlInRole(url, "MANAGEMENT") && role.toString() === "2") {
                    return true
                } else if (checkUrlInRole(url, "VACCINATION_PLACE") && role.toString() === "3") {
                    return true
                } else if (checkUrlInRole(url, "ORGANIZATION") && role.toString() === "4") {
                    return true
                } else {
                    await router.push('/')
                    return false
                }
            }
        }else{
            await router.push('/login')
            return false
        }
    }

    const hideContentCheck = async (url) => {
        setAuthorized(false);
    }

    const openContentCheck = async (url) => {
        await routerRedirectionContent(url)
        setAuthorized(true);
    }

    useEffect(() => {
        router.events.on('routeChangeStart', hideContentCheck);
        router.events.on('routeChangeComplete', openContentCheck);
        return () => {
            router.events.off('routeChangeStart', hideContentCheck);
            router.events.off('routeChangeComplete', openContentCheck);
        }
    }, [userInfo, authorized])

    useEffect(() => {
        urlCheck(router.pathname).then((data) => {
            if (data && !authorized) {
                setAuthorized(true);
            }
        })
    }, [])

    if (authorized) {
        return props.children
    } else {
        return (
            <>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-no-repeat bg-full"
                        style={{
                            backgroundColor: "var(--primary-color)",
                        }}
                    />
                </section>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer
});

const mapDispatchToProps = {
    getInfoUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterGuard);
