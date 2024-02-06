import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import Button from "~/components/Button";
import Modal from "react-bootstrap/Modal";
import Input from "../../components/Input";
import { useState } from "react";

const cx = classNames.bind(style);
function Profilechanged(props) {
    const [profile, setProfile] = useState({
        name: props.data.name,
        email: props.data.email,
        isAdmin: props.data.isAdmin,
        phone: props.data.phone,
        adsress: props.data.adsress,
        avatar: props.data.avatar,
        rating: props.data.rating,
    })

    const handleOnchangeName = (e) => {
        console.log('value: ', e.target.value);
        setProfile(e.target.value)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body style={{ margin: "auto" }}>
                <p className={cx("title")} style={{ margin: "20px" }}>
                    Chỉnh sửa thông tin tài khoản
                </p>

                <form method="POST">
                    <Input text="Tên tài khoản" value={props.data.name || ""}  handleOnChange={handleOnchangeName}/>
                    <Input
                        type="email"
                        text="Email"
                        value={props.data.email || ""}
                    />
                    <Input
                        text="Số điện thoại"
                        value={props.data.phone || ""}
                    />
                    <Input
                        textarea="textarea"
                        text="Địa chỉ"
                        value={props.data.address || ""}
                    />
                    <Input type="file" text="Ảnh đại diện" />
                </form>
            </Modal.Body>
            <Modal.Footer style={{ marginRight: "60px" }}>
                <Button onClick={props.onHide}>Thoát</Button>
                <Button primary onClick={props.onHide}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Profilechanged;
