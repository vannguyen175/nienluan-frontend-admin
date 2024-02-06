import { Link } from "react-router-dom";
import style from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Button({
    styleBtn,
    to,
    href,
    primary,
    children,
    onClick,
    button,
    ...passProps
}) {
    let Comp = "button";
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }
    const classes = cx("wrapper", {
        primary,
        button
    });
    return (
        <Comp style={{ ...styleBtn }} className={classes} {...props}>
            {children}
        </Comp>
    );
}

export default Button;
