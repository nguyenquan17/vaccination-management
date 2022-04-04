import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getMyScheduleInjection} from "../../../redux/actions/profileAction";
import moment from 'moment'

function ScheduleInjectionCard(props) {

    let {dataScheduleInjection} = props.profileReducer

    useEffect(() => {
        props.getMyScheduleInjection();
    }, [])

    const showTimeInjection = () => {
        let dateSchedule = moment.unix(dataScheduleInjection.date).format("h [giờ] - mm [phút] A");
        if(dataScheduleInjection.date.toString() === 0){
            return "Loading..."
        }else{
            return dateSchedule
        }
    }

    const showDateInjection = () => {
        let dateSchedule = moment.unix(dataScheduleInjection.date).format("[Ngày] DD [tháng] MM [năm] YYYY");
        if(dataScheduleInjection.date.toString() === 0){
            return "Loading..."
        }else{
            return dateSchedule
        }
    }

    const renderInfoRegistration = () => {
        if(Object.keys(dataScheduleInjection).length === 0){
            return (
                <>
                    <div className="mb-2 text-blueGray-600">
                        Chưa có lịch tiêm
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <div className="mb-2 text-blueGray-600">
                        <b>Điểm tiêm: </b> {dataScheduleInjection.nameVaccinePlace}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                        <b>Loại vacxin: </b> {dataScheduleInjection.vaccine}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                        <b>Thời gian tiêm: </b> {showTimeInjection()}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                        <b>Ngày tiêm tiêm: </b> {showDateInjection()}
                    </div>
                </>
            )
        }
    }

    return (
        <div className="mt-12 p-8">
            <h3 className="text-center text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                Lịch tiêm
            </h3>
            {renderInfoRegistration()}
        </div>
    );
}

const mapStateToProps = (state) => ({
    profileReducer: state.profileReducer
});

const mapDispatchToProps = {
    getMyScheduleInjection
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleInjectionCard);