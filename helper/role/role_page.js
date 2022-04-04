const rolePage = {
    // 0 mac dinh ai cung vao dc
    "PUBLIC": [
        "/login",
        "/login/send_email",
        "/login/verify_otp",
        "/register",
        "/register/register_organization",
        "forgot_password",
    ],
    // phải đăng nhập mới vào đc
    "USER_LOGIN": [
        "/register_vaccine",
        "/profile",
        "/registration_vaccination",
        "/my_vaccination_record",
        "/change_password",
        "/my_feedback"
    ],
    // 1 admin
    "ADMIN": [
        "/admin",
    ],
    // 2 quan ly
    "MANAGEMENT": [
        "/management",
        "/management/vaccination_place",
        "/management/vaccine",
        "/management/account_organization",
        "management/reports_management"
    ],
    // 3 quan ly diem tiem
    "VACCINATION_PLACE": [
        "/vaccination_place",
        "/vaccination_place/schedule_injections",
        "/vaccination_place/vaccination_record",
        "/vaccination_place/accept_vaccination_record",
        "/vaccination_place/reports_vaccination_place",
        "/vaccination_place/feedback_user",
    ],
    // 4 doanh nghiep
    "ORGANIZATION": [
        "/organization",
    ],
    // 5 nguoi dan
    "USER": [

    ],
}
export default rolePage;