import classNames from "classnames/bind";
import style from "./OrderProduct.module.scss";
import {
	CalendarOutlined,
	MailOutlined,
	PhoneOutlined,
	EnvironmentOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Button from "~/components/Button";
import Select from "~/components/Select";
import vi from "moment/locale/vi";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "~/service/ProductService";
import * as UserService from "~/service/UserService";
import * as OrderService from "~/service/OrderService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "~/components/Modal/Modal";
import Description from "~/components/Description/Description";
import { useMutationHook } from "~/hooks/useMutaionHook";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function OrderProduct() {
	const { id } = useParams(); //id product
	const idBuyer = localStorage.getItem("id_user");
	const [modelConfirm, setModelConfirm] = useState(false);
	const navigate = useNavigate();
	const [orderDetail, setOrderDetail] = useState({
		orderItems: {
			idProduct: id,
		},
		shippingAddress: {
			email: "",
			address: "",
			phone: "",
		},
		paymentMethod: "cash",
		shippingPrice: "30000",
		buyer: idBuyer,
		isPaid: false,
	});

	const getDetailProduct = async () => {
		const res = await ProductService.detailProduct(id);
		return res.data;
	};

	const getDetailBuyer = async () => {
		const res = await UserService.getInfoUser(idBuyer);
		setOrderDetail({
			...orderDetail,
			shippingAddress: {
				email: res.data.email,
				address: res.data.address,
				phone: res.data.phone,
			},
		});
		return res.data;
	};

	const getDetailSeller = async () => {
		const res = await UserService.getInfoUser(detailProduct.idUser);
		return res.data;
	};

	//lấy thông tin sản phẩm khi vừa truy cập hoặc reload trang
	const queryDetail = useQuery({ queryKey: ["product-detail"], queryFn: getDetailProduct });
	const { data: detailProduct } = queryDetail;

	//lấy thông tin người mua sau khi có idUser từ getDetailProduct (ngăn việc rerender nhiều lần)
	const queryBuyer = useQuery({
		queryKey: ["buyer-detail"],
		queryFn: getDetailBuyer,
		refetchOnWindowFocus: false,
		enabled: false,
	});
	const { data: buyer, refetch: refetchBuyer } = queryBuyer;

	//lấy thông tin nguời bán sau khi có idUser từ getDetailProduct
	const querySeller = useQuery({
		queryKey: ["seller-detail"],
		queryFn: getDetailSeller,
		refetchOnWindowFocus: false,
		enabled: false,
	});
	const { data: seller, refetch: refetchSeller } = querySeller;
	useEffect(() => {
		if (detailProduct) {
			refetchSeller();
			refetchBuyer();
		}
	}, [detailProduct, refetchSeller, refetchBuyer]); //detail-seller

	//Cập nhật gtri select khi người dùng thay đổi PaymentMethod
	const handleChangePaymentMethod = (e) => {
		if (e === "Thanh toán qua ngân hàng") {
			setOrderDetail({ ...orderDetail, paymentMethod: "autopay" });
		} else {
			setOrderDetail({ ...orderDetail, paymentMethod: "cash" });
		}
	};

	//Lưu lại gtri input khi người dùng thay đổi shippingAddress
	const handleOnchange = (e) => {
		setOrderDetail({
			...orderDetail,
			shippingAddress: {
				...orderDetail.shippingAddress,
				[e.target.name]: e.target.value,
			},
		});
	};

	//Người dùng click button "Dat hang ngay" => hiện model confirm đơn hàng
	const handleCheckOrder = async () => {
		if (
			orderDetail.shippingAddress.email === "" ||
			orderDetail.shippingAddress.address === "" ||
			orderDetail.shippingAddress.phone === ""
		) {
			toast.error("Vui lòng điển đầy đủ thông tin đặt hàng");
		} else {
			console.log("orderDetail", orderDetail);
			setModelConfirm(true);
		}
	};

	const mutationCreate = useMutationHook((data) => {
		const { ...rests } = data;
		const res = OrderService.createOrder({ ...rests }.data);
		return res;
	});
	const { data: dataCreate } = mutationCreate;

	const handleOrder = () => {
		mutationCreate.mutate({
			data: orderDetail,
		});
	};

	//xu ly modal khi nguoi dung click submit Create
	useEffect(() => {
		console.log("dataCreate?.status", dataCreate?.status);
		if (dataCreate?.status === "SUCCESS") {
			toast.success("Đặt hàng thành công!");
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} else if (dataCreate?.status === "ERROR") {
			toast.error(dataCreate?.message);
			setTimeout(() => {
				setModelConfirm(false);
			}, 1000);
		}
	}, [dataCreate, navigate]);

	return (
		<div style={{ margin: "5px auto 30px auto" }}>
			<Row style={{ display: "flex", justifyContent: "center" }}>
				<Col xs={6} className={cx("inner-content", "left")}>
					<p className={cx("title")}>Thông tin sản phẩm</p>
					<p className={cx("time-order")}>
						<CalendarOutlined />
						<span>{moment().locale("vi", vi).format("DD-MM-YYYY")}</span>
						<span>{moment().locale("vi", vi).format("hh:mm")}</span>
					</p>

					<div className={cx("card-product")}>
						{detailProduct && (
							<Row>
								<Col xs={4}>
									<img
										src={`/assets/images-product/${detailProduct?.images[0].name}`}
										alt="anh-san-pham"
									/>
								</Col>
								<Col xs={8}>
									<p className={cx("name")}>{detailProduct?.name}</p>
									<p className={cx("price")}>
										{Intl.NumberFormat().format(detailProduct?.price)}đ
									</p>
									{Object.keys(detailProduct?.info).map((value, index) => (
										<p className={cx("info")} key={index}>
											<span>
												{value} : {detailProduct?.info[value]}
											</span>
										</p>
									))}
								</Col>
							</Row>
						)}
					</div>
					<hr style={{ marginTop: 40, marginBottom: -20 }} />
					<div className={cx("detail-seller")}>
						<p className={cx("title")}>Thông tin người bán</p>
						<Row style={{ display: "flex", alignItems: "center" }}>
							<Col xs={1}>
								<span className={cx("avatar")}>
									{seller?.avatar === "" ? (
										<img src="/assets/images/user-avatar.jpg" alt="avatar" />
									) : (
										<img src={seller?.avatar} alt="avatar" />
									)}
								</span>
							</Col>
							<Col>
								<p className={cx("name")}>{seller?.name}</p>
								<p className={cx("rating")}>
									Đánh giá:
									{seller?.rating === 0 ? " Chưa có đánh giá" : seller?.rating}
								</p>
							</Col>
						</Row>
						<Description label="Số điện thoại" infor={seller?.phone} oneLine />
					</div>
				</Col>
				<Col xs={5} className={cx("inner-content", "right")}>
					<p className={cx("title")}>Thông tin đơn đặt hàng</p>
					<div className={cx("detail-order")}>
						<Row style={{ display: "flex", alignItems: "center" }}>
							<Col xs={1}>
								<span className={cx("avatar")}>
									{buyer?.avatar === "" ? (
										<img src="/assets/images/user-avatar.jpg" alt="avatar" />
									) : (
										<img src={buyer?.avatar} alt="avatar" />
									)}
								</span>
							</Col>
							<Col>
								<p className={cx("name")}>{buyer?.name}</p>
							</Col>
						</Row>
						<div className={cx("info")}>
							<p>
								<MailOutlined /> Email:
								<input
									type="text"
									onChange={handleOnchange}
									placeholder={buyer?.email || ""}
									name="email"
								/>
							</p>
							<p>
								<PhoneOutlined /> Số điện thoại:
								<input
									type="text"
									onChange={handleOnchange}
									placeholder={buyer?.phone || ""}
									name="phone"
								/>
							</p>
							<p>
								<EnvironmentOutlined />
								Địa chỉ:{" "}
								<textarea
									type="text"
									onChange={handleOnchange}
									placeholder={buyer?.address || ""}
									name="address"
								/>
							</p>
						</div>
						<hr />
						<div className={cx("price")}>
							<p>
								Giá sản phẩm:
								<span>{Intl.NumberFormat().format(detailProduct?.price)}đ</span>
							</p>
							<p>
								Giá vận chuyển: <span>{Intl.NumberFormat().format(30000)}đ</span>
							</p>
							<p>
								Tổng cộng:
								<span style={{ color: "red" }}>
									{Intl.NumberFormat().format(detailProduct?.price + 30000)}đ
								</span>
							</p>
						</div>
						<hr style={{ marginBlock: 30 }} />
						<Select
							onChange={handleChangePaymentMethod}
							borderColor="gray"
							name="Hình thức thanh toán"
							value="Thanh toán khi nhận hàng"
							options={["Thanh toán khi nhận hàng", "Thanh toán qua ngân hàng"]}
						/>
						<div className={cx("order-btn")}>
							<Button primary onClick={handleCheckOrder}>Đặt hàng ngay</Button>
						</div>
					</div>
				</Col>
			</Row>
			<Modal
				title="Xác nhận đơn đặt hàng"
				open={modelConfirm}
				onCancel={() => setModelConfirm(false)}
				width="500px"
				footer={[
					<Button key="cancel" type="primary" onClick={() => setModelConfirm(false)}>
						Thoát
					</Button>,
					<Button type="submit" key="update" primary onClick={handleOrder}>
						Thanh toán
					</Button>,
				]}
			>
				<Description label="Tên sản phẩm" infor={detailProduct?.name} oneLine />
				<Description
					label="Tổng giá tiền"
					infor={`${Intl.NumberFormat().format(detailProduct?.price + 30000)}đ`}
					oneLine
				/>
				<Description
					label="Số điện thoại"
					infor={orderDetail?.shippingAddress.phone}
					oneLine
				/>
				<Description
					label="Địa chỉ giao hàng"
					infor={orderDetail?.shippingAddress.address}
					oneLine
				/>
				<Description
					label="Hình thức thanh toán"
					infor={
						orderDetail?.paymentMethod === "cash"
							? "Thanh toán khi nhận hàng"
							: "Thanh toán qua ngân hàng"
					}
					oneLine
				/>
			</Modal>
		</div>
	);
}

export default OrderProduct;
