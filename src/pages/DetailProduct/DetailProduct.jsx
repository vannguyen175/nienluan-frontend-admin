import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Carousel from "react-bootstrap/Carousel";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "~/service/ProductService";
import * as UserService from "~/service/UserService";
import ReactTimeAgo from "react-time-ago";
import {
	UserOutlined,
	ClockCircleOutlined,
	EnvironmentOutlined,
	CheckOutlined,
	SendOutlined,
} from "@ant-design/icons";

//import Button from "~/components/Button";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./DetailProduct.module.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from  "~/components/Button"

const cx = classNames.bind(style);

function DetailProduct() {
	const { id } = useParams();
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
	const getDetailProduct = async () => {
		const res = await ProductService.detailProduct(id);
		return res.data;
	};

	const getDetailSeller = async () => {
		const res = await UserService.getInfoUser(detail.idUser);
		return res.data;
	};

	//lấy thông tin sản phẩm khi vừa truy cập hoặc reload trang
	const queryDetail = useQuery({ queryKey: ["product-detail"], queryFn: getDetailProduct });
	const { data: detail } = queryDetail;

	//lấy thông tin nguời bán sau khi có idUser từ getDetailProduct
	const queryUser = useQuery({
		queryKey: ["seller-detail"],
		queryFn: getDetailSeller,
		refetchOnWindowFocus: false,
		enabled: false,
	});
	const { data: seller, refetch: refetchSeller } = queryUser;
	useEffect(() => {
		if (detail) {
			refetchSeller();
		}
	}, [detail, refetchSeller]); //detail-product

	return (
		<div>
			<Row style={{ display: "flex" }}>
				<Col xs={8}>
					<div className={cx("inner-content")}>
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
							{detail &&
								[detail.images]?.map((image, index) => (
									<Carousel.Item key={index}>
										<img
											src={`/assets/images-product/${image[index]?.name}`}
											alt="anh-san-pham"
										/>
									</Carousel.Item>
								))}
						</Carousel>

						{detail && (
							<div className={cx("details")} style={{ paddingLeft: 10 }}>
								<p className={cx("title")}>{detail?.name}</p>
								<p className={cx("price")}>
									{Intl.NumberFormat().format(detail?.price)}đ
								</p>
								<p className={cx("note")}>
									<UserOutlined className={cx("icon")} />
									{detail?.sellerName}
								</p>
								<p className={cx("note")}>
									<EnvironmentOutlined className={cx("icon")} />
									{detail?.address}
								</p>
								<p className={cx("note")}>
									<ClockCircleOutlined className={cx("icon")} />
									<ReactTimeAgo
										date={Date.parse(detail?.createdAt)}
										locale="vi-VN"
									/>
								</p>
								<p className={cx("note")}>
									<CheckOutlined className={cx("icon")} />
									<span>Tin đã được kiểm duyệt</span>
								</p>
								<br />
							</div>
						)}
					</div>
					<div className={cx("inner-content", "description")}>
						<p className="title">Thông tin chi tiết</p>
						<p className={cx("description")}>{detail?.description}</p>
						{detail &&
							Object.keys(detail?.info).map((value, index) => (
								<p className={cx("info")} key={index}>
									<SendOutlined className={cx("icon")} />
									<span>
										{value} : {detail?.info[value]}
									</span>
								</p>
							))}

						<p className={cx("info")}>
							<SendOutlined className={cx("icon")} />
							<span>Địa chỉ: </span>
							<span>{detail?.address}</span>
						</p>
					</div>
				</Col>
				<Col className={cx("inner-content")}>
					<hr style={{ marginTop: 43 }}/>
					<div className={cx("detail-seller")}>
						<span className={cx("avatar")}>
							{seller?.avatar === "" ? (
								<img src="/assets/images/user-avatar.jpg" alt="avatar" />
							) : (
								<img src={`/assets/images/${seller?.avata}`} alt="avatar" />
							)}
						</span>
						<span>
							<p className={cx("name")}>{seller?.name}</p>
							<p>
								Đánh giá:
								{seller?.rating === 0 ? " Chưa có đánh giá" : seller?.rating}
							</p>
						</span>
					</div>
					<div>
						<Button>Thêm vào giỏ hàng</Button>
						<Button>Đặt hàng ngay</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default DetailProduct;
