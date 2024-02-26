//props = {text, placeholder, name, ...props}
import classNames from "classnames/bind";
import style from "./Input.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(style);

function InputComp({
    error,
    text,
    type,
    value,
    innerRef,
    avatar,
    placeholder = "",
    textarea,
    readOnly,
    ...props
}) {
    const [valueInput, setValueInput] = useState("");
    useEffect(() => {
        setValueInput(value)
    },[value])
    
    let Comp = "input";
    if (textarea) {
        Comp = "textarea";
    }

    const handleChange = (event) => {
        setValueInput(event.target.value);
    };

    const handleClick = () => {
        setValueInput("");
    };
    if (avatar) {
        console.log('valueInput', valueInput)
    }
    
    return (
        <div>
            <span className={cx("container")}>
                <Comp
                    className={cx("input")}
                    type={type}
                    placeholder=""
                    ref={innerRef}
                    value={valueInput || ''}
                    onChange={handleChange}
                    autoComplete="on"
                    readOnly={readOnly}
                />
              
                <FontAwesomeIcon
                    className={cx("clear-input")}
                    onClick={handleClick}
                    icon={faXmarkCircle}
                />
                <label className={cx("text")}>{text}</label>
                {avatar ? (
                    
                    <img src={valueInput} alt="avatar" />
                ) : ""}
            </span>
            {error ? <div className={cx("show-error")}>{error}</div> : ""}
        </div>
    );
}

export default InputComp;
