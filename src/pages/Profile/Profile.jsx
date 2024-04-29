import { Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import AccountInfo from "./AccountInfo";
import Analytics from "./Analytics";
import ManagerOrder from "./ManagerOrder";
import ProductSell from "./ProductSell";

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
	getItem("Tài khoản", "sub1", <HomeOutlined />, [
		getItem("Thông tin", "1"),
		getItem("Nhà bán hàn", "3", null, [
			getItem("Sản phẩm đang bán", "31"),
			getItem("Quản lý đơn hàng", "32"),
		]),
		getItem("Thống kê", "2"),
	]),
	getItem("Hệ thống", "sub2", <SettingOutlined />, [
		getItem("Cài đặt", "5"),
		getItem("Trợ giúp", "6"),
	]),
];

function Profile() {
	const [selectedKey, setSelectedKey] = useState(localStorage.getItem("profile_option") || "1"); //selected key menu

	const onClick = (e) => {
		localStorage.setItem("profile_option", e.key);
		setSelectedKey(e.key);
	};

	return (
		<div>
			<Row style={{ margin: "10px auto" }}>
				<Col xs={3}>
					<div className="inner-content">
						<Menu
							onClick={onClick}
							style={{
								width: 256,
							}}
							defaultSelectedKeys={[selectedKey]}
							defaultOpenKeys={["sub1"]}
							mode="inline"
							items={items}
						/>
					</div>
				</Col>
				<Col>
					<div className={cx("right")}>
						{selectedKey === "1" ? (
							<AccountInfo />
						) : selectedKey === "32" ? (
							<ManagerOrder />
						) : selectedKey === "31" ? (
							<ProductSell />
						) : (
							<Analytics />
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Profile;
