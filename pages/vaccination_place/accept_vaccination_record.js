import {useEffect} from "react";
import Management from "../../layouts/Management";
import {useRouter} from "next/router";
import {getCurrentPlace} from "../../redux/actions/vaccinationPlaceAction";
import {connect} from "react-redux";
import AcceptRecordTable from "../../components/pages/accept_vaccination_record/AcceptRecordTable";

function AcceptVaccinationRecord(props) {

    const router = useRouter()

    const {currentPlace} = props.vaccinationPlaceReducer

    useEffect(()=>{
        if(!!currentPlace || currentPlace.namePlace.length === 0){
            props.getCurrentPlace().then((res)=>{
                if(!res){
                    router.push("/")
                }
            });
        }
    }, [])

    return (
        <Management>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                        <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold ">
                            Xác nhận tiêm chủng - lập hồ sơ tiêm chủng : {currentPlace.namePlace}
                        </div>
                        <AcceptRecordTable />
                    </div>
                </div>
            </div>
        </Management>
    );
}


const mapStateToProps = (state) => ({
    vaccinationPlaceReducer: state.vaccinationPlaceReducer
});

const mapDispatchToProps = {
    getCurrentPlace
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptVaccinationRecord);
