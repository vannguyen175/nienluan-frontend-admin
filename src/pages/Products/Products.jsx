import style from "./Products.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import CardProduct from "~/components/CardProduct";

const cx = classNames.bind(style);

function Products() {
    return (
        <div className={cx("container")}>
            <div className={cx("shop-category", "inner-content")}>
                <p className={cx("title")}>Danh sách các danh mục</p>
                <Button>Đồ nội thất</Button>
                <Button>Thiết bị điện tử</Button>
                <Button>Tủ lạnh, máy giặt</Button>
                <Button>Thú cưng</Button>
                <Button>Thời trang, đồ dùng cá nhân</Button>
                <Button>Xe cộ</Button>
                <Button>Sách, dụng cụ học tập</Button>
            </div>
            <div className={cx("shop-new", "inner-content")}>
                <p className={cx("title")}>Tin đăng mới</p>
                <div style={{ display: 'flex', flexWrap: "wrap"}}>
                <CardProduct type="horizontal"/>
                <CardProduct type="horizontal"/>
                <CardProduct/>
                </div>
                
            </div>
        </div>
    );
}

export default Products;
