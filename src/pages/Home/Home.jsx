import style from "./UserHome.module.scss";
import classNames from "classnames/bind";
// import { Container, Row, Col } from "react-bootstrap";
import CategoryButton from "~/components/CategoryButton";
import CardProduct from "~/components/CardProduct";
import Button from "~/components/Button";

const cx = classNames.bind(style);

function UserHome() {
    const categories = [
        {
            to: "san-pham/noi-that",
            src: "assets/images/anh-test.jpg",
            alt: "danh muc",
            type: "Nội thất",
        },
        {
            to: "san-pham/xe-co",
            src: "assets/images/anh-test.jpg",
            alt: "danh muc",
            type: "Xe cộ",
        },
        {
            to: "san-pham/do-dien-tu",
            src: "assets/images/anh-test.jpg",
            alt: "danh muc",
            type: "Đồ điện tử",
        },
        {
            to: "san-pham/thu-cung",
            src: "assets/images/anh-test.jpg",
            alt: "danh muc",
            type: "Thú cưng",
        },
    ];

    return (
        <div className={cx("container")}>
            <section
                style={{ backgroundImage: "url(/assets/images/anh-bia.jpg)" }}
                className={cx("section-1")}
            >
                <div className={cx("content", "box-shadow")}>
                    <p>Chào mừng đến với website mua bán đồ cũ</p>
                    <Button primary to="/products">
                        Bắt đầu mua sắm
                    </Button>
                </div>
            </section>

            <section className={cx("inner-content")}>
                <p className={cx("title")}>Khám phá danh mục</p>
                <div>
                    {categories.map((category, index) => {
                        return (
                            <CategoryButton
                                key={index}
                                to={category.to}
                                src={category.src}
                                alt={category.alt}
                                type={category.type}
                            />
                        );
                    })}
                </div>
            </section>

            <section className={cx("inner-content")}>
                <p className={cx("title")}>Tin đăng mới</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                </div>
            </section>
        </div>
    );
}

export default UserHome;
