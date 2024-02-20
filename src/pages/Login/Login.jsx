import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./Login.module.scss";
import Input from "~/components/Input";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import * as UserService from "~/service/UserService";
import { useMutationHook } from "~/hooks/useMutaionHook";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
 

const cx = classNames.bind(style);

function Login() {
    const navigate = useNavigate();
    //const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutationHook((data) => UserService.loginUser(data));
    const { data } = mutation;

    //xu ly khi nguoi dung nhap du lieu vao input
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    };

    //xu ly khi nguoi dung nhan submit
    const onsubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

    useEffect(() => {
        if (data?.status === "SUCCESS") {
            toast.success("Đăng nhập thành công!");
            localStorage.setItem("access_token", data?.access_token);
            const decoded = jwtDecode(data?.access_token);
            localStorage.setItem("id_user", decoded?.id);
            localStorage.setItem("isAdmin", decoded?.isAdmin);
            setTimeout(() => {
                navigate('/');
            }, 1000)
        }   
    }, [data, navigate]);
    
    return (
        <div>
            
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
                <form method="POST">
                    {data?.status === "ERROR" && (
                        <span style={{ color: "red" }}>{data?.message}</span>
                    )}
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
        </div>
    );
}

export default Login;
