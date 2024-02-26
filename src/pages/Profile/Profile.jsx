import Button from "~/components/Button";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import * as UserService from "~/service/UserService";
import Profilechanged from "./ProfileChanged";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function Profile() {
    const [modalShow, setModalShow] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: "",
        email: "",
        isAdmin: "",
        phone: "",
        adsress: "",
        avatar: "",
        rating: "",
    });
    async function detailsUser() {
        const id = localStorage.getItem("id_user");
        const token = localStorage.getItem("access_token");
        await UserService.getDetailUser(id, token).then((data) => {
            setUserProfile({
                name: data.result.name,
                email: data.result.email,
                isAdmin: data.result.isAdmin || "Người dùng / Người bán hàng",
                phone: data.result.phone || "Chưa có",
                adsress: data.result.adsress || "Chưa có",
                avatar: data.result.avatar,
                rating: data.result.rating || "Chưa có",
            });
        });
    }

    useEffect(() => {
        detailsUser();
    }, []);

    return (
        <div>
            <Row style={{ display: "flex" }}>
                <Col xs={4} className={cx("inner-content")}>
                    <div className={cx("info-user")}>
                        <div>
                            <img
                                src={userProfile.avatar}
                                alt="anh-dai-dien"
                            />
                            <span>
                                <p className={cx("title")}>
                                    {userProfile.name}
                                </p>
                                <p>Đánh giá: {userProfile.rating}</p>
                            </span>
                        </div>

                        <Button onClick={() => setModalShow(true)}>
                            Chỉnh sửa thông tin tài khoản
                        </Button>
                        <Profilechanged
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            data={userProfile}
                        />
                        <p>
                            <strong>Email:</strong> {userProfile.email}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong> {userProfile.phone}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {userProfile.adsress}
                        </p>
                        <p>
                            <strong>Vai trò:</strong> {userProfile.isAdmin}
                        </p>
                    </div>
                </Col>
                <Col className={cx("inner-content")}>
                    <Button>Đang bán</Button>
                    <Button>Đã bán</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
