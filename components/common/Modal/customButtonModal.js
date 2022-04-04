import PropTypes, {bool} from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CSS from "./CSSModal.module.scss";

export default function CustomButtonModal(props) {
    return (
        <>
            <Modal
                open={props.isOpen}
                onClose={props.closeModal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    className={CSS.customModal}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    {props.children}
                </Box>
            </Modal>
        </>
    )
}

CustomButtonModal.prototype = {
    isOpen: bool,
    closeModal: PropTypes.func.isRequired,
};