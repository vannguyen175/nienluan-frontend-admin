import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Carousel from "react-bootstrap/Carousel";

//import Button from "~/components/Button";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./DetailProduct.module.scss";

const cx = classNames.bind(style);

function DetailProduct() {
    const Breadcrumbs = [
        {
            name: "Trang chủ",
            to: "/",
        },
        {
            name: "Sản phẩm",
            to: "/products",
        },
        {
            name: "Chi tiết sản phẩm",
            to: "active",
        },
    ];
    return (
        <div>
            <Row style={{ display: "flex" }}>
                <Col xs={8} className={cx("inner-content")}>
                    <Breadcrumb>
                        {Breadcrumbs.map((item, index) => (
                            <Breadcrumb.Item
                                key={index}
                                linkAs={Link}
                                linkProps={{ to: item.to }}
                            >
                                {item.name}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>

                    <Carousel className={cx("carousel")}>
                        <Carousel.Item>
                            <img
                                src="/assets/images/anh-test.jpg"
                                alt="anh-test"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src="/assets/images/anh-test.jpg"
                                alt="anh-test"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src="/assets/images/anh-test.jpg"
                                alt="anh-test"
                            />
                        </Carousel.Item>
                    </Carousel>

                    <div className={cx("details")}>
                        <p className={cx("title")}>Bo ban ghe go do</p>
                        <p className={cx("price")}>1.200.000d</p>
                        <p className={cx("note")}>lorem</p>
                    </div>
                </Col>
                <Col className={cx("inner-content")}></Col>
            </Row>
        </div>
    );
}

export default DetailProduct;
