import classNames from "classnames/bind";
import style from "./adminLayout.module.scss";
import DropdownMenu from "~/components/DropdownMenu";
import Button from "~/components/Button";
import * as UserService from "~/service/UserService";

import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tippy";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

const ActionsUnLogin = [
	{
		name: "Đăng nhập",
		to: "/login",
	},
	{
		name: "Đăng ký",
		to: "/register",
	},
];

const ActionAdminLogin = [
	{
		name: "Thông tin tài khoản",
		to: "/profile",
	},
	{
		name: "Đăng tải sản phẩm",
		to: "/dang-tin",
	},
	{
		name: "Quản lý hệ thống",
		to: "/admin",
	},
];

function Header() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	async function getNameAccount() {
		const id = localStorage.getItem("id_user");
		const token = localStorage.getItem("access_token");
		await UserService.getDetailUser(id, token).then((data) => {
			setName(data.result.name);
		});
	}
	useEffect(() => {
		getNameAccount();
	}, []);
	const handleLogout = async () => {
		await localStorage.clear("access_token");
		navigate("/");
	};
	return (
		<Container fluid className={cx("header")}>
			<Row>
				<Col className={cx("col")} xs={2}>
					<Link to={"/"} className={cx("logo")}>
						TradeGoods
					</Link>
				</Col>

				<Col className={cx("col")} xs={2}>
					<DropdownMenu title="Danh mục" listActions={categories} />
				</Col>

				{/* Tìm kiếm sản phẩm */}
				<Col className={cx("col")} xs={4}>
					<div className={cx("search")}>
						<input type="text" name="search" placeholder="Tìm kiếm sản phẩm..." />
						<button>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>
					</div>
				</Col>

				<Col
					className={cx("col")}
					xs={1}
					style={{ padding: "0px 0 0 40px", marginTop: "-8px" }}
				>
					<button>
						<FontAwesomeIcon icon={faCartShopping} />
					</button>
				</Col>

				{localStorage.getItem("access_token") === null ? (
					<Col className={cx("col", "spaceEvenly")} xs={2} style={{ marginTop: "-8px" }}>
						<DropdownMenu
							title="Tiện ích"
							listActions={ActionsUnLogin}
							width="300px"
							border="none"
							icon={faUser}
						/>

						<Button children="Đăng nhập" to="/login" button />
					</Col>
				) : (
					<Col className={cx("col", "spaceEvenly")} xs={3} style={{ marginTop: "-8px" }}>
						<DropdownMenu
							icon={faUser}
							title={name}
							listActions={ActionAdminLogin}
							border="none"
						/>
						<Tooltip title={'<p class="tippy">Đăng xuất</p>'}>
							<Button onClick={handleLogout}>
								<FontAwesomeIcon icon={faRightFromBracket} />
							</Button>
						</Tooltip>
					</Col>
				)}
			</Row>
		</Container>
	);
}

export default Header;
