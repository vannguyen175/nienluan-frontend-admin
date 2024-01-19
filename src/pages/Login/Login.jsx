import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./Login.module.scss";
import Input from "~/components/Input";
import { Link } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(style);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onsubmit = (e) => {
        e.preventDefault();
        console.log("input value: ", email, password);
    };

    return (
        <div
            className={cx(
                "inner-content",
                "container",
                "animated",
                "fadeInDown",
                "box-shadow"
            )}
        >
            <h2 className={cx("title")}>Đăng nhập</h2>
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

                <a className={cx("forgot-password")} href="/">
                    Quên mật khẩu?
                </a>

                <Button
                    primary
                    //to={"/"}
                    styleBtn={{
                        display: "flex",
                        margin: "0px auto 20px auto",
                        width: "420px",
                        height: "50px",
                        fontWeight: "500",
                        fontSize: "1.2rem",
                    }}
                    onClick={onsubmit}
                >
                    Đăng nhập
                </Button>
                <p className={cx("register-link")}>
                    Chưa có tài khoản?{" "}
                    <Link to="/register">Đăng ký tài khoản mới</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
