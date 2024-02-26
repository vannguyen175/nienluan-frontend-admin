import { Table } from "antd";
import style from "./AdminHome.module.scss";
import classNames from "classnames/bind";
import * as UserService from "~/service/UserService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Modal from "~/components/Modal/Modal";
import Description from "../Description/Description";
import Button from "~/components/Button";
import { useMutationHook } from "~/hooks/useMutaionHook";
import Input from "~/components/Input";
import Select from "../Select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button as ButtonUpload } from "antd";
import { getBase64 } from "../../utils";
import { WrapperUploadFile } from "./style";

const cx = classNames.bind(style);

const renderAction = () => {
    return (
        <div>
            <EditOutlined style={{ color: "brown", margin: "0px 20px" }} />
            <DeleteOutlined style={{ color: "red" }} />
        </div>
    );
};

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
    const [updateOpen, setUpdateOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    //const [rowSelected, setRowSelected] = useState("");
    const token = localStorage.getItem("access_token");

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

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            onCell: (record, rowIndex) => {
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
            render: (text) => <p className={cx("name")}>{text}</p>,
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Vai trò",
            dataIndex: "isAdmin",
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
        },
        {
            title: "",
            dataIndex: "action",
            onCell: (record, rowIndex) => {
                return {
                    onClick: (ev) => {
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
                    },
                };
            },
            render: renderAction,
        },
    ];

    //cập nhật thông tin tài khoản
    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, token, { ...rests });
        return res;
    });

    const { data: dataUpdated } = mutationUpdate;
    //console.log("dataUpdated", dataUpdated);

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

    //cancel detailUser modal
    const handleCancel = () => {
        setIsModalOpen(false);
        setUpdateOpen(false);
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
            <div>
                <Loading isLoading={isLoadingShow}>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={UsersData}
                        className={cx("table")}
                    />
                </Loading>

                {/* modal detail user */}
                <Modal
                    title="Thông tin chi tiết tài khoản"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    width="650px"
                    footer={[
                        <Button
                            key="cancel"
                            type="primary"
                            onClick={handleCancel}
                        >
                            Thoát
                        </Button>,
                    ]}
                >
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <Description label="ID" infor={detailUser.id} oneLine />
                        <Description label="Tên" infor={detailUser.name} />
                        <Description label="Email" infor={detailUser.email} />
                        <Description
                            label="Đánh giá"
                            infor={detailUser.rating}
                        />
                        <Description
                            label="Vai trò"
                            infor={detailUser.isAdmin}
                        />
                        <Description
                            label="Số điện thoại"
                            infor={detailUser.phone}
                        />
                        <Description
                            label="Địa chỉ"
                            infor={detailUser.address || "chưa có"}
                        />
                        <div style={{ marginTop: "10px" }}>
                            <span style={{ marginRight: "5px" }}>
                                Ảnh đại diện:{" "}
                            </span>
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
                        <Button
                            key="cancel"
                            type="primary"
                            onClick={handleCancel}
                        >
                            Thoát
                        </Button>,
                        <Button
                            type="submit"
                            key="update"
                            primary
                            onClick={handleUpdate}
                        >
                            Cập nhật
                        </Button>,
                    ]}
                >
                    <form className={cx("update-modal")}>
                        <Input
                            text="ID"
                            value={detailUser.id}
                            innerRef={IDRef}
                            readOnly
                        />
                        <Select
                            innerRef={isAdminRef}
                            value={detailUser.isAdmin}
                            options={["Admin", "User"]}
                        />
                        <Input
                            text="Tên tài khoản"
                            value={detailUser.name}
                            innerRef={nameRef}
                        />
                        <Input
                            text="Email"
                            value={detailUser.email}
                            innerRef={emailRef}
                        />
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
                        <Input
                            text="Số điện thoại"
                            value={detailUser.phone}
                            innerRef={phoneRef}
                        />
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
                            <WrapperUploadFile
                                onChange={handleOnChangeAvatar}
                                maxCount={1}
                            >
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
