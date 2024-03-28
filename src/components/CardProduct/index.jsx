//type = vertical - horizontal
//props = {src, alt, name, price, name, time-post, place}

import style from "./CardProduct.module.scss";
import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import vi from "javascript-time-ago/locale/vi";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import { UserOutlined, ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";

const cx = classNames.bind(style);
TimeAgo.addLocale(vi);

function CardProduct({ type, product }) {
	let navigate = useNavigate();
	const handleClick = () => {
		navigate(`/detail-product/${product._id}`);
	};
	return (
		<div>
			{type === "horizontal" ? (  //ngang
				<div className={cx("container")} onClick={() => handleClick()}>
					<Row>
						<Col xs={4}>
							<img
								className={cx("image-product")}
								src={`/assets/images-product/${product.images[0].name}`}
								alt="anh-san-pham"
							/>
						</Col>
						<Col xs={7} className={cx("detail-product")}>
							<p className={cx("name")}>{product.name}</p>

							<p className={cx("price")}>
								{Intl.NumberFormat().format(product.price)}đ
							</p>
							<div className={cx("info-seller")}>
								<p>
									<UserOutlined className={cx("icon")}/>
									{product.sellerName}
								</p>

								<p className={cx("time-post")}>
									<ClockCircleOutlined className={cx("icon")}/>
									<ReactTimeAgo
										date={Date.parse(product.createdAt)}
										locale="vi-VN"
									/>
								</p>

								<p className={cx("place")}>
									<EnvironmentOutlined className={cx("icon")}/>
									{product.address}
								</p>
							</div>
						</Col>
						<Col className={cx("like-btn")}>
							<FontAwesomeIcon size="1x" icon={faHeart} />
						</Col>
					</Row>
				</div>
			) : (
				<div className={cx("container-vertical")} onClick={() => handleClick()}>
					<img
						className={cx("image-product-vertical")}
						src={`/assets/images-product/${product.images[0].name}`}
						alt="anh-san-pham"
					/>

					<div className={cx("detail-product-vertical")}>
						<p className={cx("name")}>{product.name}</p>
						<p className={cx("price")}>{Intl.NumberFormat().format(product.price)}đ</p>
						<div className={cx("info-seller")}>
							<div className={cx("time-post")}>
								<ReactTimeAgo date={Date.parse(product.createdAt)} locale="vi-VN" />
							</div>
							<div className={cx("place")}>{product.address}</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CardProduct;
