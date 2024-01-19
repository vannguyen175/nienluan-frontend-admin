//type = vertical - horizontal
//props = {src, alt, name, price, name, time-post, place}

import style from "./CardProduct.module.scss";
import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function CardProduct({ type, ...props }) {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/detail-product");
    };
    return (
        <div>
            {type === "horizontal" ? (
                <div className={cx("container")} onClick={() => handleClick()}>
                    <Row>
                        <Col xs={4}>
                            <img
                                className={cx("image-product")}
                                src="/assets/images/anh-test.jpg"
                                alt="anh-san-pham"
                            />
                        </Col>
                        <Col xs={7} className={cx("detail-product")}>
                            <p className={cx("name")}>This is product's name</p>
                            <p className={cx("price")}>1.200.000đ</p>
                            <div className={cx("info-seller")}>
                                <p>Hoang Kim Do </p>
                                <p>&#8226;</p>
                                <p className={cx("time-post")}>3 phut truoc</p>
                                <p>&#8226;</p>
                                <p className={cx("place")}>Ho Chi Minh</p>
                            </div>
                        </Col>
                        <Col className={cx("like-btn")}>
                            <FontAwesomeIcon size="1x" icon={faHeart} />
                        </Col>
                    </Row>
                </div>
            ) : (
                <div
                    className={cx("container-vertical")}
                    onClick={() => handleClick()}
                >
                    <img
                        className={cx("image-product-vertical")}
                        src="/assets/images/anh-test.jpg"
                        alt="anh-san-pham"
                    />

                    <div className={cx("detail-product-vertical")}>
                        <p className={cx("name")}>This is product's name</p>
                        <p className={cx("price")}>1.200.000đ</p>
                        <div className={cx("info-seller")}>
                            <p className={cx("time-post")}>3 phut truoc</p>
                            <p>&#8226;</p>
                            <p className={cx("place")}>Ho Chi Minh</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default CardProduct;
