import { Menu } from "antd";
import style from "./AdminHome.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import AdminAccount from "~/components/Admin/AdminAccount";
import AdminProduct from "~/components/Admin/AdminProduct";

const cx = classNames.bind(style);

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem("Tài khoản", "account", <UserOutlined />),
    getItem("Sản phẩm", "product", <ProductOutlined />),
];

function AdminHomePage() {
    const [keySelected, setStateSelected] = useState("account");
    const onClick = (e) => {
        //console.log("click ", e);
        setStateSelected(e.key);
    };

    return (
        <div style={{ display: "flex" }} className="inner-content">
            <div>
                <Menu
                className={cx('customBtn')}
                    onClick={onClick}
                    style={{
                        width: 256,
                        boxShadow:
                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                />
            </div>
            <div className={cx("container")}>
                <div>
                    {keySelected === "account" ? (
                        <AdminAccount />
                    ) : (
                        <AdminProduct />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage;
