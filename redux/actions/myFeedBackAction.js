import { myFeedBackService } from '../../services/servicesAPI';
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";

//Create my feedback
export const createMyFeedBack = (dataFeedBack) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await myFeedBackService.createMyFeedBackServices({
            "feedback": dataFeedBack.feedback
        })
        console.log(res);
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            return true
        }else{
            dispatch(closeLoadingAction())
            return false
        }
    }catch(e){
        dispatch(closeLoadingAction())
        return false;
    }
}