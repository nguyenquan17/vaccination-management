import {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {validationInvalid} from "../../../helper/validate/validation";
import {connect} from "react-redux";
import {changePassword} from "../../../redux/actions/changePasswordAction";
import {snackActions} from "../../../helper/showSnackBar";
import {useRouter} from "next/router";

function ChangePasswordForm(props) {

    const [dataPassword, setDataPassword] = useState({
        value: {
            oldPassword: "",
            newPassword: "",
        },
        error: {
            oldPassword: false,
            newPassword: false,
        }
    })

    const router = useRouter()

    const onClickChangePassword = async () => {
        if (dataPassword.error.oldPassword ||
            dataPassword.error.newPassword) {
            snackActions.error('Đổi mật khẩu thất bại yêu cầu nhập đầy đủ thông tin')
        } else {
            if (validationInvalid(dataPassword.value.oldPassword) ||
                validationInvalid(dataPassword.value.newPassword)
            ) {
                setDataPassword({
                    value: {...dataPassword.value},
                    error: {
                        phoneNumber: validationInvalid(dataPassword.value.oldPassword),
                        nameUser: validationInvalid(dataPassword.value.newPassword),
                    }
                })
                snackActions.error('Đổi mật khẩu thất bại yêu cầu nhập đầy đủ thông tin')
            } else {
                const result = await props.changePassword(dataPassword.value)
                if (result) {
                    snackActions.success('Đổi mật khẩu thành công 🎉')
                    router.push("/");
                } else {
                    snackActions.error('Đổi mật khẩu thất bại')
                }
            }
        }
    }

    return (
        <section className="sectionPage my-12  flex flex-col items-center">
            <div className="px-4 w-6/12">
                <p className="mb-2 text-xl font-bold text-center">Đổi mật khẩu</p>
                <div className="mb-3">
                    <p className="mb-2">Mật khẩu cũ</p>
                    <TextField
                        className="min-w-full xl:w-full"
                        size="small"
                        name="phoneNumber"
                        variant="outlined"
                        type="password"
                        placeholder="Mật khẩu cũ"
                        onChange={(event) => {
                            setDataPassword((state) => ({
                                value: {...state.value, oldPassword: event.target.value},
                                error: {
                                    ...state.error,
                                    oldPassword: validationInvalid(event.target.value)
                                },
                            }))
                        }}
                    />
                    <span
                        className="text-red-500 text-sm">{dataPassword.error.oldPassword ? "Không được bỏ trống" : ""}</span>
                </div>
                <div className="mb-3">
                    <p className="mb-2">Mật khẩu mới</p>
                    <TextField
                        className="min-w-full xl:w-full"
                        size="small"
                        name="identify"
                        type="password"
                        variant="outlined"
                        placeholder="Mật khẩu mới"
                        onChange={() => {
                            setDataPassword((state) => ({
                                value: {...state.value, newPassword: event.target.value},
                                error: {
                                    ...state.error,
                                    newPassword: validationInvalid(event.target.value)
                                },
                            }))
                        }}
                    />
                    <span
                        className="text-red-500 text-sm">{dataPassword.error.newPassword ? "Không được bỏ trống" : ""}</span>
                </div>
                <div className="mt-4 text-center">
                    <Button className="mx-10" variant="contained" onClick={onClickChangePassword}>Đổi mật khẩu</Button>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    changePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);