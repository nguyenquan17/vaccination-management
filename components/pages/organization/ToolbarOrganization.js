import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";

import CSS from "../vaccine/VCMNCSS.module.scss";
import VCManagementCSS from "../vaccine/VCMNCSS.module.scss";
import Button from "@mui/material/Button";
import {DOMAIN_API} from "../../../services/domain";
import UploadExcelBtn from "./UploadExcelBtn";

export default function ToolbarOrganization(props) {
    const [image, setImage] = useState(null);

    const uploadToClient = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
        }
    };

    return (
        <div className={CSS.headerTableData}>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Tìm kiếm…"
                className="my-4 mx-1"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small"/>,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{visibility: props.value ? 'visible' : 'hidden'}}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    ),
                }}
            />
            <div className="">
                <Button
                    variant="contained" color="warning"
                    className={VCManagementCSS.buttonCancel}
                >
                    <a href='/file_mau.xlsx' download><i className="fas fa-download mr-2"/>Tải file Excel mẫu</a>
                </Button>
                <span className="mx-2"></span>
                <UploadExcelBtn />
            </div>
        </div>
    );
}

ToolbarOrganization.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};