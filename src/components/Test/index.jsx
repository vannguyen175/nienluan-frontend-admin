import { Input } from "antd";
import classNames from "classnames/bind";
import style from "./Test.module.scss";
import { CloseCircleTwoTone } from "@ant-design/icons";

const cx = classNames.bind(style);

function Testing({
    error,
    text,
    type,
    value,
    placeholder = "",
    textarea,
    ...props
}) {
    return (
        <Input
            allowClear={{
                clearIcon: <CloseCircleTwoTone twoToneColor="#d78d3a" />,
            }}
            className={cx("input")}
            type={type}
            placeholder="dmccc"
            //defaultValue={value}
        />
    );
}

export default Testing;
