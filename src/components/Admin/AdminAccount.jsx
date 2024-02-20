import { Table } from "antd";
import style from "./AdminHome.module.scss";
import classNames from "classnames/bind";
import * as UserService from "~/service/UserService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import Modal from "~/components/Modal/Modal";
import Description from "../Description/Description";
import Button from "~/components/Button";
import { useMutationHook } from "../../hooks/useMutaionHook";
import Input from "../Input";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailUser, setDetailUser] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        isAdmin: "",
        rating: "",
    });

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            onCell: (record, rowIndex) => {
                return {
                    onClick: (ev) => {
                        console.log(record, rowIndex);
                        setIsModalOpen(true);
                        setDetailUser({
                            id: record._id,
                            name: record.name,
                            email: record.email,
                            phone: record.phone,
                            address: record.address,
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
            render: renderAction,
        },
    ];

    const mutationUpdate = useMutationHook(
        (data) => {
          const { id,
            token,
            ...rests } = data
          const res = UserService.updateUser(
            id,
            { ...rests }, token)
          return res
        },
      )

    const token = localStorage.getItem("access_token");
    const getAllUsers = async () => {
        const res = await UserService.getAllUsers(token);
        return res;
    };

    const updateUser = async () => {
        const res = await UserService.getAllUsers(token);
        return res;
    };

    //lấy thông tin tài khoản
    const queryUsers = useQuery({ queryKey: ["users"], queryFn: getAllUsers });
    const { data: users, isLoading: isLoadingShow } = queryUsers;
    
    //cập nhật thông tin tài khoản
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    //show thông tin bảng
    const UsersData = users?.data.map((user) => {
        return {
            ...user,
            isAdmin: user.isAdmin ? "Admin" : "User",
            key: user._id,
        };
    });

    const handleUpdate = () => {
        setIsModalOpen(false);
    };

    //cancel detailUser modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeAccRole = (e) => {
        let roleSelected = "false";
        if (e.target.value === "admin") {
            roleSelected = "true";
        }
        setDetailUser({
            ...detailUser,
            isAdmin: roleSelected,
        });
    };

    //console.log("UsersData", UsersData);
    return (
        <div>
            <div className="title">Quản lý tài khoản</div>
            <Input text='testing' />
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
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <Description label="ID" infor={detailUser.id} oneLine />
                        <Description label="Tên" infor={detailUser.name} />
                        <Description label="Email" infor={detailUser.email} />
                        <Description
                            label="Đánh giá"
                            infor={detailUser.rating}
                        />
                        <div style={{ marginTop: "10px" }}>
                            <span>Vai trò: </span>
                            <select
                                defaultValue={detailUser.isAdmin}
                                name="isAdmin"
                                onChange={(e) => handleChangeAccRole(e)}
                            >
                                <option value={detailUser.isAdmin} hidden>
                                    {detailUser.isAdmin}
                                </option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <Description
                            label="Số điện thoại"
                            infor={detailUser.phone}
                        />
                        <Description
                            label="Địa chỉ"
                            infor={detailUser.address || "chưa có"}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default AdminUser;
