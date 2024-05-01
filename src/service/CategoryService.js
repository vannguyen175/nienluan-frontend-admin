import Axios from "axios";

export const getCategory = async (data) => {
	const res = await Axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/category/getAll`, data);
	return res.data;
};

export const createSubCategory = async (data) => {
	const res = await Axios.post(
		`${process.env.REACT_APP_API_URL_BACKEND}/sub-category/create`,
		data
	);
	return res.data;
};

export const createInfoSubCate = async (data) => {
	const res = await Axios.post(
		`${process.env.REACT_APP_API_URL_BACKEND}/sub-category/create/info`,
		data
	);
	return res.data;
};
export const updateSubCategory = async (data) => {
	const res = await Axios.put(
		`${process.env.REACT_APP_API_URL_BACKEND}/sub-category/update/${data.slug}`,
		data
	);
	return res.data;
};

export const getDetailCategory = async (data) => {
	const res = await Axios.get(
		`${process.env.REACT_APP_API_URL_BACKEND}/category/details/${data.slug}`,
		data
	);
	return res.data;
};

export const getDetailSubCategory = async (data) => {
	const res = await Axios.get(
		`${process.env.REACT_APP_API_URL_BACKEND}/sub-category/details/${data.slug}`,
		data
	);
	return res.data;
};
