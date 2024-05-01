import { useEffect, useRef, useState } from "react";
import * as categoryService from "~/service/CategoryService";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import style from "./AdminHome.module.scss";
import Tags from "~/components/Tags";
import { Modal } from "antd";
import { EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Input from "~/components/Input";
import Description from "../Description/Description";
import { convertToSlug } from "~/utils";
import { toast } from "react-toastify";

const cx = classNames.bind(style);

function AdminCategory() {
	const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
	const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState();
	const [itemInfo, setItemInfo] = useState();
	const [options, setOptions] = useState([]);

	const [categoryActiveBtn, setCategoryActiveBtn] = useState([]);
	const [subCateActiveBtn, setSubCateActiveBtn] = useState([]);
	const [inputActive, setInputActive] = useState([]);
	const [valueActive, setValueActive] = useState({
		category: "",
		subCategory: "",
		info: "",
	});

	const subCategoryRef = useRef("");
	const infoRef = useRef("");

	const handleCancel = () => {
		setIsModalUpdateOpen(false);
		setIsModalCreateOpen(false);
	};

	const getCategory = async () => {
		const data = await categoryService.getCategory();
		setCategory(data.data);
	};
	useEffect(() => {
		getCategory();
	}, []);

	const handleClickCategory = async (category) => {
		const data = await categoryService.getDetailCategory({ slug: category.slug });
		setSubCategory(data.subCategory);
		setValueActive({ category: category.slug });
		setCategoryActiveBtn(category.name);
		setItemInfo(); //reset infoSubCate khi thay đổi category
	};
	const handleClickSubCate = async (subCategory) => {
		const data = await categoryService.getDetailSubCategory({ slug: subCategory.slug });
		setSubCateActiveBtn(subCategory.name);
		setValueActive({ ...valueActive, subCategory: subCategory.name });
		setItemInfo(data.data.infoSubCate);
	};

	const handleClickInfo = (item) => {
		setOptions(item.option);
		setValueActive({ ...valueActive, info: item.name });
		setInputActive(["info"]);
		setIsModalUpdateOpen(true);
	};

	const handleOptionChange = (values) => {
		setOptions(values);
	};

	const handleCreateSubCate = () => {
		setInputActive(["sub-category"]);
		//setIsModalCreateOpen(true);
	};

	const handleAddInfo = () => {
		setValueActive({ ...valueActive, info: "" });
		setOptions([]);
		setIsModalCreateOpen(true);
	};

	const submitCreateSubCate = async () => {
		const result = await categoryService.createSubCategory({
			name: subCategoryRef.current.value,
			slug: valueActive.category,
		});
		if (result.status === "SUCCESS") {
			toast.success("Thêm danh mục phụ thành công!");
			setInputActive("");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	};

	const handleSubmitCreate = async () => {
		const result = await categoryService.createInfoSubCate({
			info: valueActive?.subCategory,
			name: infoRef.current.value,
			option: options,
		});
		if (result.status === "SUCCESS") {
			toast.success("Thêm chi tiết mô tả thành công!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	};

	const handleSubmitUpdate = async () => {
		const result = await categoryService.updateSubCategory({
			slug: convertToSlug(valueActive.subCategory),
			info: valueActive.info,
			option: options,
		});
		if (result.status === "SUCCESS") {
			toast.success("Cập nhật chi tiết mô tả thành công!");
			setIsModalUpdateOpen(false);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	};

	return (
		<div>
			<p className="title">Quản lý danh mục sản phẩm</p>
			<div className={cx("wrapper-category")}>
				<div className={cx("section-category")}>
					<p className={cx("title-category")} style={{ marginTop: 0 }}>
						Danh mục chính
					</p>
					{category &&
						category.map((item, index) => (
							<Button
								key={index}
								chosenBtn={categoryActiveBtn === item.name}
								onClick={() => handleClickCategory(item)}
							>
								{item.name}
							</Button>
						))}

					{subCategory && (
						<>
							<p className={cx("title-category")}>
								Danh mục phụ <PlusSquareOutlined onClick={handleCreateSubCate} />
							</p>
							{inputActive.includes("sub-category") && (
								<div className={cx("input-create", "fadeInDown")}>
									<input type="text" ref={subCategoryRef} name="sub-cate" />
									<button onClick={() => setInputActive([])}>Hủy</button>
									<button onClick={submitCreateSubCate}>Thêm</button>
								</div>
							)}

							{subCategory.map((item, index) => (
								<Button
									key={index}
									chosenBtn={subCateActiveBtn === item.name}
									onClick={() => handleClickSubCate(item)}
								>
									{item.name}
								</Button>
							))}
						</>
					)}
					<div style={{ marginLeft: 50 }}>
						{itemInfo && (
							<>
								{itemInfo?.map((item, index) => (
									<div key={index}>
										<p className={cx("title-category")}>
											&bull; {item.name}
											<EditOutlined onClick={() => handleClickInfo(item)} />
										</p>
									</div>
								))}
								<p
									style={{
										cursor: "pointer",
										marginTop: 15,
										textDecoration: "underline",
									}}
									onClick={handleAddInfo}
								>
									Thêm chi tiết mô tả
								</p>
							</>
						)}
					</div>
					<div>
						{/* modal cập nhật info */}
						<Modal
							title="Cập nhật lựa chọn"
							open={isModalUpdateOpen}
							onOk={handleSubmitUpdate}
							onCancel={handleCancel}
							cancelText="Thoát"
							okText="Cập nhật"
						>
							<div style={{ marginTop: 20 }}>
								<Description
									label="Danh mục chính"
									infor={valueActive?.category}
									oneLine
								/>
								<Description
									label="Danh mục phụ"
									infor={valueActive?.subCategory}
									oneLine
								/>
								<Description
									label="Chi tiết mô tả"
									infor={valueActive?.info}
									oneLine
								/>

								<div className={cx("tag-area")}>
									<Tags
										valueProps={options || ""}
										changeOption={handleOptionChange}
									/>
								</div>
							</div>
						</Modal>
						<Modal
							title="Tạo mới"
							open={isModalCreateOpen}
							onOk={handleSubmitCreate}
							onCancel={handleCancel}
							cancelText="Thoát"
							okText="Tạo mới"
						>
							<div style={{ marginTop: 20 }}>
								<Description
									label="Danh mục chính"
									infor={valueActive?.category}
									oneLine
								/>
								<Description
									label="Danh mục phụ"
									infor={valueActive?.subCategory}
									oneLine
								/>
								<Input
									text="Chi tiết mô tả"
									value={valueActive?.info}
									innerRef={infoRef}
								/>

								<div className={cx("tag-area")}>
									<Tags
										valueProps={options || ""}
										changeOption={handleOptionChange}
									/>
								</div>
							</div>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminCategory;
