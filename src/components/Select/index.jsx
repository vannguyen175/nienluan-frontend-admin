import classNames from "classnames/bind";
import style from "./Select.module.scss";

const cx = classNames.bind(style);

function Select({ innerRef, value, options }) {
    return (
        <div className={cx("container")}>
            <span className={cx("text")}>Vai trò: </span>
            <select
                className={cx("select")}
                defaultValue="adminDefault"
                name="isAdmin"
                ref={innerRef}
            >
                <option value={value} hidden>
                    {value}
                </option>
       
                {options.map((option) => {
                    return <option value={option} key={option}>{option}</option>;
                })}
            </select>
        </div>
    );
}

export default Select;
