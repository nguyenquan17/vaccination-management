import {useEffect} from "react";
import Management from "../../layouts/Management";
import {useRouter} from "next/router";
import {getCurrentPlace} from "../../redux/actions/vaccinationPlaceAction";
import {connect} from "react-redux";
import FeedbackUserTable from "../../components/pages/user_feedback/FeedbackUserTable";


function FeedbackUser(props) {

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
                            Phản hồi sau tiêm : {currentPlace.namePlace}
                        </div>
                        <FeedbackUserTable />
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackUser);