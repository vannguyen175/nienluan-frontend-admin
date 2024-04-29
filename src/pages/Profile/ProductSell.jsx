import Button from "~/components/Button";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import * as UserService from "~/service/UserService";
import * as productService from "~/service/ProductService";
import Profilechanged from "./ProfileChanged";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const cx = classNames.bind(style);

function ForSeller() {
	const [modalShow, setModalShow] = useState(false);
	const [userProfile, setUserProfile] = useState({
		name: "",
		email: "",
		isAdmin: "",
		phone: "",
		adsress: "",
		avatar: "",
		rating: "",
	});
	const [products, setProducts] = useState();
	

	async function detailsUser() {
		const id = localStorage.getItem("id_user");
		const token = localStorage.getItem("access_token");
		await UserService.getDetailUser(id, token).then((data) => {
			setUserProfile({
				name: data.result.name,
				email: data.result.email,
				isAdmin: data.result.isAdmin || "Người dùng / Người bán hàng",
				phone: data.result.phone || "Chưa có",
				adsress: data.result.address || "Chưa có",
				avatar: data.result.avatar,
				rating: data.result.rating || "Chưa có",
			});
		});
	}

	const getSellerProduct = async () => {
		const idSeller = localStorage.getItem("id_user");
		const data = await productService.getProductSeller(idSeller);
		setProducts(data.data);
	};

	//show thông tin bảng khi reload
	const DetailData = products?.map((product) => {
		return {
			name: product.name,
			price: product.price,
			updatedAt: product.updatedAt,
			statePost:
				product?.statePost === "waiting"
					? "Chờ duyệt"
					: product?.statePost === "approved"
					? "Đang bán"
					: "Bị hủy",
			key: product?._id,
		};
	});

	const renderAction = (record) => {
		return (
			<div>
				<Link
					to={`/detail-product/${record.key}`}
					style={{ textDecoration: "underline", cursor: "pointer" }}
				>
					Xem chi tiết
				</Link>
			</div>
		);
	};

	const columns = [
		{
			title: "Tên",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Giá tiền",
			dataIndex: "price",
			key: "price",
			render: (price) => `${Intl.NumberFormat().format(price)}đ`,
		},
		{
			title: "Ngày đăng bán",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt) => `${moment(updatedAt).format('DD-MM-YYYY')}`
		},
		{
			title: "Trạng thái",
			dataIndex: "statePost",
			key: "statePost",
			render: (_, { statePost }) => (
				<>
					<Tag
						color={
							statePost === "Đang bán"
								? "green"
								: statePost === "Chờ duyệt"
								? "gold"
								: "volcano"
						}
						key={statePost}
					>
						{statePost}
					</Tag>
				</>
			),
		},
		{
			title: "Chỉnh sửa",
			key: "action",
			render: (_, record) => renderAction(record),
		},
	];

	useEffect(() => {
		detailsUser();
		getSellerProduct();
	}, []);

	return (
		<div>
			<div className={cx("right")}>
				<div className={cx("inner-content", "info-user")}>
					<p className="title">Thông tin Nhà bán hàng</p>
					<p className={cx("edit-btn")}>
						<Button onClick={() => setModalShow(true)}>
							<EditOutlined /> Chỉnh sửa
						</Button>
					</p>
					<Profilechanged
						show={modalShow}
						onHide={() => setModalShow(false)}
						data={userProfile}
					/>
					<Row>
						<Col xs={2}>
							<div className={cx("avatar")}>
								{userProfile?.avatar ? (
									<img src={userProfile?.avatar} alt="anh-dai-dien" />
								) : (
									<img src="/assets/images/user-avatar.jpg" alt="anh-dai-dien" />
								)}
							</div>
						</Col>
						<Col>
							<p className={cx("name")}>{userProfile?.name}</p>
							<div className={cx("info")}>
								<p>
									Vai trò
									<span>
										{userProfile?.isAdmin === true
											? "Quản trị viên"
											: "Người dùng"}
									</span>
								</p>
								<p>
									Số điện thoại
									<span>{userProfile?.phone}</span>
								</p>
								<p>
									Địa chỉ email
									<span>{userProfile?.email}</span>
								</p>
							</div>
						</Col>
					</Row>
				</div>

				<div className={cx("inner-content", "info-activity")}>
					<div className="title">Sản phẩm đang bán của tôi</div>
					{products && <Table columns={columns} dataSource={DetailData} />}
				</div>
			</div>
		</div>
	);
}

export default ForSeller;
