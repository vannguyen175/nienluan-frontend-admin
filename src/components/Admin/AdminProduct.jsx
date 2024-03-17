import style from "./AdminHome.module.scss";
import classNames from "classnames/bind";
import * as ProductService from "~/service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Input as InputAnt, Tag, Table, Drawer, Image, Select } from "antd";
import Highlighter from "react-highlight-words";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi";
import ReactTimeAgo from "react-time-ago";
import Description from "~/components/Description/Description";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import Button from "~/components/Button";
import { useMutationHook } from "~/hooks/useMutaionHook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function AdminUser() {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState(""); //antd
	const [searchedColumn, setSearchedColumn] = useState(""); //antd
	const searchInput = useRef(null);

	TimeAgo.addLocale(vi);

	let filterStatePost = "all";
	const statePostRef = useRef();
	const [isModalShow, setIsModalShow] = useState(false);
	const [dataPosts, setDataPosts] = useState({
		name: "",
		images: [],
		stateProduct: "",
		info: "",
		price: "",
		description: "",
		address: "",
		selled: "",
		sellerName: "",
		subCategory: "",
		category: "",
	});
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<InputAnt
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: "block",
					}}
				/>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? "grey" : undefined,
					fontSize: "0.8rem",
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: "#ffc069",
						padding: 0,
					}}
					searchWords={[searchText]}
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	const getAllProducts = async () => {
		const res = await ProductService.getAllProducts({ filter: filterStatePost });
		return res.data;
	};

	const getCategory = async (record) => {
		const res = await ProductService.getSubCategoryInfo(record.subCategory);
		setDataPosts({
			id: record._id,
			name: record.name,
			images: record.images,
			statePost: record.statePost,
			info: record.info,
			price: record.price,
			description: record.description,
			address: record.address,
			selled: record.selled,
			sellerName: record.sellerName,
			createdAt: record.createdAt,
			subCategory: res.data.slug,
			category: res.category.name,
		});
		return res.data;
	};

	const handleShowDetailModal = async (record) => {
		await getCategory(record);

		setIsModalShow(true);
	};

	const renderAction = (record) => {
		return (
			<div className={cx("moreDetailBtn")} onClick={() => handleShowDetailModal(record)}>
				Xem chi tiết
			</div>
		);
	};
	const columns = [
		{
			title: "Tên bài đăng",
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("post_name"),
		},
		{
			title: "Ngườii bán",
			dataIndex: "sellerName",
			key: "sellerName",
		},
		{
			title: "Thời gian tạo",
			dataIndex: "createdAt",
			render: (createdAt) => <ReactTimeAgo date={Date.parse(createdAt)} locale="vi-VN" />,
			sorter: (a, b) => a.createdAt.length - b.createdAt.length,
		},
		{
			title: "Trạng thái",
			dataIndex: "statePost",
			key: "statePost",
			render: (_, { statePost }) => (
				<>
					<Tag
						color={
							statePost === "Đã duyệt"
								? "green"
								: statePost === "Chưa duyệt"
								? "gold"
								: "volcano"
						}
						key={statePost}
					>
						{statePost.toUpperCase()}
					</Tag>
				</>
			),
		},
		{
			title: "",
			dataIndex: "action",
			key: "action",
			render: (_, record) => renderAction(record),
		},
	];

	//lấy thông tin tài khoản khi vừa truy cập hoặc reload trang
	const queryPosts = useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
		refetchOnWindowFocus: true,
		enabled: true,
	});
	const { data: posts, refetch } = queryPosts;
	//show thông tin bảng khi reload
	const DetailData = posts?.map((posts) => {
		return {
			...posts,
			statePost:
				posts.statePost === "waiting"
					? "Chưa duyệt"
					: posts.statePost === "approved"
					? "Đã duyệt"
					: "Hủy",
			key: posts._id,
		};
	});

	const handleChangeState = (e) => {
		filterStatePost = e.target.value;
		refetch();
	};

	//close drawer
	const onClose = () => {
		setIsModalShow(false);
	};

	//cập nhật trạng thái bài đăng
	const mutationUpdate = useMutationHook((data) => {
		const { ...rests } = data.dataPosts;
		const res = ProductService.updateProduct(dataPosts.id, { ...rests });
		return res;
	});

	const { data: dataUpdated } = mutationUpdate;

	const handleChangeStatePost = async (e) => {
		//console.log("handleChangeStatePost", e);
		setDataPosts({ ...dataPosts, statePost: e });
	};

	const handleSubmit = () => {
		mutationUpdate.mutate({
			dataPosts,
		});
	};
	//xu ly modal khi nguoi dung click submit update
	useEffect(() => {
		if (dataUpdated?.status === "OK") {
			toast.success("Cập nhật bài đăng thành công!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else if (dataUpdated?.status === "ERROR") {
			toast.error(dataUpdated?.message);
		}
	}, [dataUpdated, navigate]);

	return (
		<div>
			<div className="title">Quản lý bài đăng</div>
			<select className={cx("select-state")} onChange={handleChangeState}>
				<option value="all">Tất cả</option>
				<option value="waiting">Chưa duyệt</option>
				<option value="approved">Đã duyệt</option>
				<option value="reject">Từ chối</option>
			</select>
			<div>
				<Table
					columns={columns}
					dataSource={DetailData}
					className={cx("table")}
					showSorterTooltip={false}
				/>
			</div>
			<Drawer
				title="Thông tin chi tiết bài đăng"
				placement="bottom"
				//closable={false}
				onClose={onClose}
				open={isModalShow}
				key="bottom"
				height={500}
			>
				<Container>
					<Row>
						<Col>
							<p style={{ margin: "-10px 0 10px 0", fontWeight: 500 }}>
								Hình ảnh sản phẩm
							</p>
							<Image.PreviewGroup>
								{dataPosts.images.map((image, index) => (
									<Image
										key={index}
										width={120}
										height={120}
										src={`assets/images-product/${image.name}`}
										alt="anh-san-pham"
									/>
								))}
							</Image.PreviewGroup>
						</Col>
						<Col>
							<Description label="Tên bài đăng" infor={dataPosts.name} oneLine />
							<Description label="Người bán" infor={dataPosts.sellerName} oneLine />
							<Description label="Địa chỉ" infor={dataPosts.address} oneLine />
							<Description label="Giá tiền" infor={dataPosts.price} oneLine />
							<Description label="Mô tả" infor={dataPosts.description} oneLine />
							<Description
								label="Ngày đăng"
								infor={moment(dataPosts.createdAt).format("hh:mm:ss   DD-MM-YYYY")}
								oneLine
							/>
						</Col>
						<Col>
							<Description
								label="Danh mục"
								infor={`${dataPosts.category} - ${dataPosts.subCategory}`}
								oneLine
							/>

							{Object.keys(dataPosts.info).map((value, key) => (
								<div key={key}>
									<Description
										label={value}
										infor={dataPosts.info[value]}
										oneLine
									/>
								</div>
							))}
							<span style={{ marginRight: 10 }}>Trạng thái bài đăng: </span>
							<Select
								value={dataPosts.statePost}
								style={{
									width: 200,
								}}
								onChange={handleChangeStatePost}
								options={[
									{
										value: "waiting",
										label: "Chưa duyệt",
									},
									{
										value: "approved",
										label: "Duyệt",
									},
									{
										value: "reject",
										label: "Hủy",
									},
								]}
							/>
						</Col>
					</Row>
					<div style={{ textAlign: "center", marginTop: 20 }}>
						<Button onClick={handleSubmit}>Cập nhật</Button>
					</div>
				</Container>
			</Drawer>
		</div>
	);
}

export default AdminUser;
