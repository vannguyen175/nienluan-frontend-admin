import { Table } from "antd";
import style from "./AdminHome.module.scss";
import classNames from "classnames/bind";
import * as UserService from "~/service/UserService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import {
	EditOutlined,
	DeleteOutlined,
	UploadOutlined,
	UserAddOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Modal from "~/components/Modal/Modal";
import Description from "../Description/Description";
import Button from "~/components/Button";
import { useMutationHook } from "~/hooks/useMutaionHook";
import Input from "~/components/Input";
import Select from "../Select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button as ButtonUpload, Input as InputAnt } from "antd";
import { getBase64 } from "../../utils";
import { WrapperUploadFile } from "./style";
import Highlighter from "react-highlight-words";

const cx = classNames.bind(style);

// rowSelection object indicates the need for row selection
const rowSelection = {
	getCheckboxProps: (record) => ({
		disabled: record.name === "Disabled User",
		// Column configuration not to be checked
		name: record.name,
	}),
};

function AdminUser() {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [createOpenModal, setCreateOpenModal] = useState(false); //open modal
	const [updateOpen, setUpdateOpen] = useState(false); //open modal
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [avatar, setAvatar] = useState("");
	const [name, setName] = useState(""); //dùng trong modal delete
	const [idDelete, setIdDelete] = useState(""); //dùng để xóa user
	//const [rowSelected, setRowSelected] = useState("");
	const token = localStorage.getItem("access_token");

	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef(null);
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

	const IDRef = useRef("");
	const isAdminRef = useRef("");
	const nameRef = useRef("");
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const passwordConfirmedRef = useRef("");
	const phoneRef = useRef("");
	const addressRef = useRef("");

	const getAllUsers = async () => {
		const res = await UserService.getAllUsers(token);
		return res;
	};

	const [detailUser, setDetailUser] = useState({
		id: "",
		name: "",
		email: "",
		password: "",
		phone: "",
		address: "",
		isAdmin: "",
		avatar: "",
		rating: "",
	});

	const renderAction = (record) => {
		return (
			<div>
				<EditOutlined
					style={{ color: "brown", margin: "0px 20px" }}
					onClick={() => handleShowUpdateModal(record)}
				/>
				<DeleteOutlined
					style={{ color: "red" }}
					onClick={() => handleShowDeleteModal(record)}
				/>
			</div>
		);
	};

	const columns = [
		{
			title: "Tên",
			dataIndex: "name",
			onCell: (record) => {
				return {
					onClick: (ev) => {
						//console.log(record, rowIndex);
						setIsModalOpen(true);
						setDetailUser({
							id: record._id,
							name: record.name,
							email: record.email,
							password: record.password,
							phone: record.phone,
							address: record.address,
							avatar: record.avatar,
							isAdmin: record.isAdmin,
							rating: record.rating,
						});
					},
				};
			},
			...getColumnSearchProps("name"),
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Vai trò",
			dataIndex: "isAdmin",
			sorter: (a, b) => a.isAdmin.length - b.isAdmin.length,
		},
		{
			title: "Đánh giá",
			dataIndex: "rating",
			sorter: (a, b) => a.rating - b.rating,
		},
		{
			title: "",
			dataIndex: "action",
			render: (_, record) => renderAction(record),
		},
	];

	//Khi người dùng nhấn vào biểu tượng edit (get data + show modal)
	const handleShowUpdateModal = (record) => {
		setUpdateOpen(true);
		setDetailUser({
			id: record._id,
			name: record.name,
			email: record.email,
			password: record.password,
			phone: record.phone,
			address: record.address,
			avatar: record.avatar,
			isAdmin: record.isAdmin,
			rating: record.rating,
		});
	};

	const handleShowDeleteModal = (record) => {
		setName(record.name);
		setIdDelete(record._id);
		setDeleteModalOpen(true);
	};

	const mutationCreate = useMutationHook((data) => {
		const { ...rests } = data;
		console.log("{ ...rests }", { ...rests });
		const res = UserService.registerUser({ ...rests }.data);
		return res;
	});

	//cập nhật thông tin tài khoản
	const mutationUpdate = useMutationHook((data) => {
		const { id, token, ...rests } = data;
		const res = UserService.updateUser(id, token, { ...rests });
		return res;
	});

	//xóa thông tin tài khoản
	const mutationDeleted = useMutationHook((data) => {
		const res = UserService.deleteUser(data.id, data.token);
		return res;
	});

	const { data: dataCreate } = mutationCreate;
	const { data: dataUpdated } = mutationUpdate;
	const { data: dataDeleted } = mutationDeleted;
	//console.log("dataUpdated", dataUpdated);

	//xu ly modal khi nguoi dung click submit Create
	useEffect(() => {
		console.log("dataCreate", dataCreate);
		if (dataCreate?.status === "SUCCESS") {
			toast.success("Tạo tài khoản thành công!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else if (dataCreate?.status === "ERROR") {
			toast.error(dataCreate?.message);
		}
	}, [dataCreate, navigate]);

	//xu ly modal khi nguoi dung click submit Update
	useEffect(() => {
		if (dataUpdated?.status === "OK") {
			toast.success("Cập nhật thành công!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else if (dataUpdated?.status === "ERROR") {
			toast.error(dataUpdated?.message);
		}
	}, [dataUpdated, navigate]);

	//xu ly modal khi nguoi dung click submit delete
	useEffect(() => {
		if (dataDeleted?.status === "OK") {
			toast.success("Xoá tài khoản thành công!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else if (dataDeleted?.status === "ERROR") {
			toast.error(dataDeleted?.message);
		}
	}, [dataDeleted, navigate]);

	//lấy thông tin tài khoản khi vừa truy cập hoặc reload trang
	const queryUsers = useQuery({ queryKey: ["users"], queryFn: getAllUsers });
	const { data: users, isLoading: isLoadingShow } = queryUsers;

	//show thông tin bảng
	const UsersData = users?.data.map((user) => {
		return {
			...user,
			isAdmin: user.isAdmin ? "Admin" : "User",
			key: user._id,
		};
	});

	const handleCreate = (e) => {
		const dataSubmit = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			confirmPassword: passwordConfirmedRef.current.value,
			isAdmin: isAdminRef.current.value === "Admin" ? "true" : false,
			phone: phoneRef.current.value,
			address: addressRef.current.value,
			avatar: avatar,
		};
		mutationCreate.mutate({
			data: dataSubmit,
		});
		e.preventDefault();
	};

	const handleUpdate = (e) => {
		//setIsModalOpen(false);
		const dataSubmit = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			confirmPassword: passwordConfirmedRef.current.value,
			isAdmin: isAdminRef.current.value === "Admin" ? "true" : false,
			phone: phoneRef.current.value,
			address: addressRef.current.value,
			avatar: avatar,
		};
		mutationUpdate.mutate({
			id: IDRef.current.value,
			token,
			data: dataSubmit,
		});
		e.preventDefault();
	};

	const handleDelete = () => {
		mutationDeleted.mutate({
			id: idDelete,
			token,
		});
	};

	//cancel detailUser modal
	const handleCancel = () => {
		setIsModalOpen(false);
		setUpdateOpen(false);
		setDeleteModalOpen(false);
		setCreateOpenModal(false);
	};

	const handleOnChangeAvatar = async ({ fileList }) => {
		const file = fileList[0]; //lấy ra file đầu tiên làm avatar
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setAvatar(file.preview);
	};

	return (
		<div>
			<div className="title">Quản lý tài khoản</div>
			<Button
				type="dashed"
				onClick={() => setCreateOpenModal(true)}
				style={{ marginTop: "10px" }}
				icon={<UserAddOutlined />}
			>
				Thêm tài khoản
			</Button>
			<div>
				<Loading isLoading={isLoadingShow}>
				
					<Table
						columns={columns}
						dataSource={UsersData}
						className={cx("table")}
						showSorterTooltip={false}
					/>
				</Loading>

				{/* modal detail user */}
				<Modal
					title="Thông tin chi tiết tài khoản"
					open={isModalOpen}
					onCancel={handleCancel}
					width="650px"
					footer={[
						<Button key="cancel" type="primary" onClick={handleCancel}>
							Thoát
						</Button>,
					]}
				>
					<div style={{ display: "flex", flexWrap: "wrap" }}>
						<Description label="ID" infor={detailUser.id} oneLine />
						<Description label="Tên" infor={detailUser.name} />
						<Description label="Email" infor={detailUser.email} />
						<Description label="Đánh giá" infor={detailUser.rating} />
						<Description label="Vai trò" infor={detailUser.isAdmin} />
						<Description label="Số điện thoại" infor={detailUser.phone} />
						<Description label="Địa chỉ" infor={detailUser.address || "chưa có"} />
						<div style={{ marginTop: "10px" }}>
							<span style={{ marginRight: "5px" }}>Ảnh đại diện: </span>
							{detailUser.avatar ? (
								<img
									src={detailUser.avatar}
									alt="avatar"
									className="avatar-preview"
								/>
							) : (
								<img
									src="assets/images/user-avatar.jpg"
									alt="avatar"
									className="avatar-preview"
								/>
							)}
						</div>
					</div>
				</Modal>

				{/* modal update user */}

				<Modal
					title="Cập nhật tài khoản"
					open={updateOpen}
					onCancel={handleCancel}
					width="650px"
					footer={[
						<Button key="cancel" type="primary" onClick={handleCancel}>
							Thoát
						</Button>,
						<Button type="submit" key="update" primary onClick={handleUpdate}>
							Cập nhật
						</Button>,
					]}
				>
					<form className={cx("update-modal")}>
						<Input text="ID" value={detailUser.id} innerRef={IDRef} readOnly />
						<Select
							innerRef={isAdminRef}
							value={detailUser.isAdmin}
							options={["Admin", "User"]}
						/>
						<Input text="Tên tài khoản" value={detailUser.name} innerRef={nameRef} />
						<Input text="Email" value={detailUser.email} innerRef={emailRef} />
						<Input
							text="Mật khẩu"
							type="password"
							value={detailUser.password}
							innerRef={passwordRef}
						/>
						<Input
							text="Nhập lại mật khẩu"
							type="password"
							value={detailUser.password}
							innerRef={passwordConfirmedRef}
						/>
						<Input text="Số điện thoại" value={detailUser.phone} innerRef={phoneRef} />
						<Input
							text="Địa chỉ"
							textarea
							value={detailUser.address}
							innerRef={addressRef}
						/>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								margin: "15px",
							}}
						>
							<WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
								<ButtonUpload icon={<UploadOutlined />}>
									Tải lên ảnh đại diện
								</ButtonUpload>
							</WrapperUploadFile>
							{(avatar || detailUser.avatar) && (
								<img
									src={avatar || detailUser.avatar}
									alt="avatar"
									className="avatar-preview"
								/>
							)}
						</div>
					</form>
				</Modal>

				<Modal
					title="Xóa tài khoản"
					open={deleteModalOpen}
					onCancel={handleCancel}
					width="400px"
					footer={[
						<Button key="cancel" type="primary" onClick={handleCancel}>
							Thoát
						</Button>,
						<Button type="submit" key="update" primary onClick={handleDelete}>
							Xóa
						</Button>,
					]}
				>
					Bạn có muốn xóa {name}?
				</Modal>

				<Modal
					title="Tạo tài khoản"
					open={createOpenModal}
					onCancel={handleCancel}
					width="650px"
					footer={[
						<Button key="cancel" type="primary" onClick={handleCancel}>
							Thoát
						</Button>,
						<Button type="submit" key="update" primary onClick={handleCreate}>
							Tạo tài khoản
						</Button>,
					]}
				>
					<form className={cx("update-modal")}>
						<Select innerRef={isAdminRef} value="User" options={["Admin", "User"]} />
						<Input text="Tên tài khoản" innerRef={nameRef} />
						<Input text="Email" innerRef={emailRef} />
						<Input text="Mật khẩu" type="password" innerRef={passwordRef} />
						<Input
							text="Nhập lại mật khẩu"
							type="password"
							innerRef={passwordConfirmedRef}
						/>
						<Input text="Số điện thoại" innerRef={phoneRef} />
						<Input text="Địa chỉ" textarea innerRef={addressRef} />
						<div
							style={{
								display: "flex",
								alignItems: "center",
								margin: "15px",
							}}
						>
							<WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
								<ButtonUpload icon={<UploadOutlined />}>
									Tải lên ảnh đại diện
								</ButtonUpload>
							</WrapperUploadFile>
							{(avatar || detailUser.avatar) && (
								<img
									src={avatar || detailUser.avatar}
									alt="avatar"
									className="avatar-preview"
								/>
							)}
						</div>
					</form>
				</Modal>
			</div>
		</div>
	);
}

export default AdminUser;
