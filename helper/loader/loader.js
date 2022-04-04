import './loader.module.scss'
import CSSLoader from './loader.module.scss'
import {connect} from "react-redux";

function Loader(props) {

    const {isLoading} = props.isLoading

    return isLoading ? (
        <>
            <div className={CSSLoader.upperLoaderImage}>
                <div className={CSSLoader.customLogo}>
                    <img src="/covid19.png" alt=""/>
                </div>
            </div>
            <div className={CSSLoader.upperLoader}>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    ) : (<></>)
}

const mapStateToProps = (state) => ({
    isLoading: state.loaderReducer
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);