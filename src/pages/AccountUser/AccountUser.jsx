import Button from "~/components/Button";
import {Row, Col} from "react-bootstrap"
import classNames from "classnames/bind";
import style from "./AccountUser.module.scss"

const cx = classNames.bind(style)

function AccountUser() {
    return (
        <div >
            <Row style={{ display: "flex" }}>
                <Col xs={4} className={cx('inner-content')}>
                    <div className={cx('info-user')}>
                        <img src="assets/images/test.jpg" alt="anh-dai-dien" />
                        <p className={cx('title')}>Thuy Van</p>
                        <Button>Chỉnh sửa thông tin tài khoản</Button>
                        <p>Số điện thoại: 123.456.789</p>
                        <p>Địa chỉ: chưa có</p>
                    </div>
                </Col>
                <Col className={cx('inner-content')}>
                    <Button>Đang bán</Button>
                    <Button>Đã bán</Button>
                </Col>
            </Row>
        </div>
    );
}

export default AccountUser;
