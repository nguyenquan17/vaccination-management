import React, {useState} from 'react'
import {useRouter} from 'next/router';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import {createMyFeedBack} from "../../../redux/actions/myFeedBackAction"
import {connect} from "react-redux";
import {snackActions} from "../../../helper/showSnackBar";

function FeedBackUserForm(props) {

    // quay trở lại trang chủ
    const router = useRouter();
    const navigateHome = () => router.push("/");

    //dữ liệu khởi tạo
    const [dataFeedBack, setDataFeedBack] = useState({
        value: {
            feedback: ""
        },
        error: {
            feedback: false,
        }
    })

    //feedback submit
    const onClickFeedBackUser = async () => {
        if (dataFeedBack.error.feedback) {
            snackActions.error('Gửi phản hồi không thành công. Vui lòng thử lại!');
        } else {
            const result = await props.createMyFeedBack(dataFeedBack.value)
            if (result) {
                snackActions.success('Gửi phản hồi thành công 🎉')
                await router.push('/')
            } else {
                snackActions.error('Gửi phản hồi không thành công. Vui lòng thử lại!')
            }
        }
    }
    const handleChangeFeedBack = (event) => {
        setDataFeedBack(state => ({
            value: {feedback: event.target.value},
            error: {...state.error}
        }))
    }
    return (
        <>
            <div className="xl:container mx-auto px-4">
                <h1 className="text-3xl mx-auto text-center font-semibold uppercase" >Cập nhật tình hình sau tiêm</h1>
            </div>
            <section className="my-12 relative">
                <div className="xl:container mx-auto px-4 flex justify-center relative">
                    <TextareaAutosize
                        className="inline-block px-1 "
                        maxRows={6}
                        aria-label="maximum height"
                        placeholder=" Các triệu chứng sau khi tiêm vaccine..."
                        style={{ width: "50%" , height: 200, border: "1px solid black" , borderRadius: 5}}
                        onChange={handleChangeFeedBack}
                    />
                </div>
                <div className="xl:container mx-auto px-4 flex justify-center relative">
                    <div className="w-1/2 mt-2 flex justify-between">
                        <Button className="mx-10" variant="outlined" onClick={navigateHome}>Hủy bỏ</Button>
                        <Button className="mx-10" variant="contained" disabled={!dataFeedBack.value.feedback} onClick={() => {onClickFeedBackUser()}}>Gửi phản hồi</Button>
                    </div>
                </div>
            </section>
        </>

    )
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    createMyFeedBack
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackUserForm)