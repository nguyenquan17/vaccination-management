import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";

import CSS from "../vaccine/VCMNCSS.module.scss";
import AcceptBtnRecord from "./AcceptBtnRecord";

export default function QuickSearchToolbar(props) {
    return (
        <div className={CSS.headerTableData}>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Tìm kiếm…"
                className="my-4 mx-1"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
            <AcceptBtnRecord listID={props.listID}/>
        </div>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    listID: PropTypes.array,
};