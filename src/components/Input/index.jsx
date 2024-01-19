//props = {text, placeholder, name, ...props}
import classNames from "classnames/bind";
import style from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const cx = classNames.bind(style);

function Input({ error, text, type, placeholder, name, ...props }) {
    const inputRef = useRef();
    const handleClick = () => {
        inputRef.current.value = "";
    };
    return (
        <div>
            <span className={cx("container")}>
                <input
                    ref={inputRef}
                    type={type}
                    placeholder="&nbsp;"
                    onChange={props.handleOnChange}
                />
                <label className={cx("text")}>{text}</label>

                <FontAwesomeIcon
                    className={cx("clear-input")}
                    onClick={handleClick}
                    icon={faXmark}
                />
            </span>
            {error ? <div className={cx("show-error")}>{error}</div> : ""}
        </div>
    );
}

export default Input;
