import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./Register.module.scss";
import Input from "~/components/Input";
import { Link } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(style);

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleOnchangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    
    const onsubmit = (e) => {
        e.preventDefault()
        console.log('input value: ', email, password, confirmPassword);
    }
    return (
        <div
            className={cx(
                "inner-content",
                "container",
                "animated",
                "fadeInDown"
            )}
        >
            <h2 className={cx("title")}>Đăng ký tài khoản</h2>
            <form action="" method="POST">
                <Input
                    text="Email"
                    value={email}
                    handleOnChange={handleOnchangeEmail}
                />
                <Input
                    text="Mật khẩu"
                    type="password"
                    value={password}
                    handleOnChange={handleOnchangePassword}
                />
                <Input
                    text="Nhập lại mật khẩu"
                    type="password"
                    value={confirmPassword}
                    handleOnChange={handleOnchangeConfirmPassword}
                />

                <Button
                    primary
                    //to={"/"}
                    styleBtn={{
                        display: "flex",
                        margin: "30px auto",
                        width: "420px",
                        height: "50px",
                        fontWeight: "500",
                        fontSize: "1.2rem",
                    }}
                    onClick={onsubmit}
                >
                    Đăng ký
                </Button>
                <p className={cx("register-link")}>
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
