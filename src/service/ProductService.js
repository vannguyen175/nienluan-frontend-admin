import Axios from "axios";

export const getAllProducts = async (slug_subCate) => {
    const res = await Axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll/${slug_subCate}`
    );
    return res.data;
};

export const getSubCategory = async (slug_category) => {
    const res = await Axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/category/details/${slug_category}`
    );
    return res.data;
};

