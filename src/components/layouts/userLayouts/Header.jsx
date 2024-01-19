import classNames from "classnames/bind";
import style from "./UserLayouts.module.scss";
import Button from "~/components/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Col } from "react-bootstrap";
import { Tooltip } from "react-tippy";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import {
    faArrowRightFromBracket,
    faCartShopping,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

const categories = [
    {
        name: "Đồ nội thất",
        to: "/products",
    },
    {
        name: "Xe cộ",
        to: "/products",
    },
    {
        name: "Thiết bị điện tử",
        to: "/products",
    },
    {
        name: "Thú cưng",
        to: "/products",
    },
];

const accountActions = [
    {
        name: "Thông tin tài khoản",
        to: "/account-user",
    },
    {
        name: "Đơn mua",
        to: "/products",
    },
    {
        name: "Đơn bán",
        to: "/products",
    },
    {
        name: "Bài đăng yêu thích",
        to: "/products",
    },
    {
        name: "Đánh giá từ tôi",
        to: "/products",
    },
];

function Header() {
    return (
        <Container fluid className={cx("header")}>
            <Row>
                <Col className={cx("col")} xs={2}>
                    <Link to={"/"} className={cx("logo")}>
                        TradeGoods
                    </Link>
                </Col>
                <Col className={cx("col")} xs={2}>
                    <Dropdown>
                        <Dropdown.Toggle
                            className={cx("button-dropdown")}
                            id="button-dropdown"
                            style={{
                                width: "120px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}
                        >
                            Danh mục
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={cx("dropdown-menu")}>
                            {categories.map((category, index) => (
                                <Button key={index} to={category.to}>
                                    {category.name}
                                </Button>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className={cx("col")} xs={5}>
                    <div className={cx("search")}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Tìm kiếm sản phẩm..."
                        />
                        <button>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Col>
                <Col className={cx("col")} xs={3}>
                    <div className={cx("navbar-icon")}>
                        <Tooltip title={'<p class="tippy">Thông báo</p>'}>
                            <Button to="/">
                                <FontAwesomeIcon icon={faBell} />
                            </Button>
                        </Tooltip>

                        <Tooltip title={'<p class="tippy">Tin nhắn</p>'}>
                            <Button to="/products">
                                <FontAwesomeIcon icon={faMessage} />
                            </Button>
                        </Tooltip>

                        <Tooltip title={'<p class="tippy">Giỏ hàng</p>'}>
                            <Button to="/#">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Button>
                        </Tooltip>

                        <Dropdown>
                            <Dropdown.Toggle
                                align="end"
                                rootcloseevent="click"
                                style={{
                                    color: "var(--main-color)",
                                    background: "transparent",
                                    border: "none",
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={cx("dropdown-menu")}>
                                {accountActions.map((action, index) => (
                                    <Button key={index} to={action.to}>
                                        {action.name}
                                    </Button>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Tooltip title={'<p class="tippy">Đăng xuất</p>'}>
                            <Button to="/login">
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                />
                            </Button>
                        </Tooltip>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
