import Button from "~/components/Button";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import * as UserService from "~/service/UserService";
import * as OrderService from "~/service/OrderService";
import Profilechanged from "./ProfileChanged";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(style);

function AccountInfo() {
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

	const getUserOrder = async () => {
		const res = await OrderService.getUserOrder({
			stateOrder: null,
			id: localStorage.getItem("id_user"),
		});
		return res.data;
	};

	//lấy thông tin order khi vừa truy cập hoặc reload trang
	const queryOrder = useQuery({ queryKey: ["user-order"], queryFn: getUserOrder });
	const { data: orders } = queryOrder;



	//show thông tin bảng khi reload
	const DetailData = orders?.map((order) => {
		return {
			...order,
			stateOrder:
				order.stateOrder === "waiting"
					? "Chưa duyệt"
					: order.stateOrder === "approved"
					? "Đã duyệt"
					: "Hủy",
			paymentMethod: order.paymentMethod === "cash" ? "Tiền mặt" : "Ngân hàng",
			key: order._id,
		};
	});

	const columns = [
		{
			title: "Tên",
			dataIndex: "orderItems",
			key: "product",
			render: orderItems => orderItems?.name,
		},
		{
			title: "Hình thức thanh toán",
			dataIndex: "paymentMethod",
			key: "paymentMethod",
		},
		{
			title: "Giá tiền",
			dataIndex: 'totalPrice',
			key: "price",
			render: (totalPrice) => `${Intl.NumberFormat().format(totalPrice)}đ`,
		},
		{
			title: "Trạng thái",
			dataIndex: "stateOrder",
			key: "stateOrder",
			render: (_, { stateOrder }) => (
				<>
					<Tag
						color={
							stateOrder === "Đã duyệt"
								? "green"
								: stateOrder === "Chưa duyệt"
								? "gold"
								: "volcano"
						}
						key={stateOrder}
					>
						{stateOrder}
					</Tag>
				</>
			),
		},
	];

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

	useEffect(() => {
		detailsUser();
	}, []);

	return (
		<div>
			<div className={cx("right")}>
				<div className={cx("inner-content", "info-user")}>
					<p className="title">Thông tin người dùng</p>
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
										{userProfile?.isAdmin===true ? "Quản trị viên" : "Người dùng"}
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
					<div className={cx("brought-history")}>
						<p className={cx("title")}>Lịch sử mua hàng</p>
						{orders && <Table columns={columns} dataSource={DetailData} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountInfo;
