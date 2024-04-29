import { useEffect, useState } from "react";
import * as orderService from "~/service/OrderService";
import { Statistic } from "antd";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import style from "./AdminHome.module.scss";

const cx = classNames.bind(style);

const formatter = (value) => <CountUp end={value} separator="," />;

function AdminAnalytic() {
	const [analytics, setAnalytics] = useState();
	const getAnalyticOrder = async () => {
		const data = await orderService.getAnalyticsOrder();
		setAnalytics(data);
	};

	useEffect(() => {
		getAnalyticOrder();
	}, []);
	return (
		<div>
			<div className="inner-content" style={{ paddingLeft: 50 }}>
				<p className="title">Thống kê bài đăng sản phẩm</p>
				<Statistic
					className={cx("statistic-card")}
					title="Sản phẩm chờ duyệt"
					value={analytics?.listProductWaiting?.length}
					formatter={formatter}
				/>

				<Statistic
					className={cx("statistic-card")}
					title="Số sản phẩm đang bán"
					value={analytics?.listProductSelling?.length}
					formatter={formatter}
				/>

				<Statistic
					className={cx("statistic-card")}
					title="Số sản phẩm đã bán"
					value={analytics?.listOrderSelled?.length}
					formatter={formatter}
				/>

				<Statistic
					className={cx("statistic-card")}
					title="Tổng tiền đã bán"
					value={analytics?.priceSelled}
					precision={2}
					formatter={formatter}
				/>
			</div>
		</div>
	);
}

export default AdminAnalytic;
