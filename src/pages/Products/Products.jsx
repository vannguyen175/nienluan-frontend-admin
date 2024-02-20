import style from "./Products.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import CardProduct from "~/components/CardProduct";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "~/service/ProductService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function Products() {
    const { slug_category } = useParams();
    let subCateChosen = "";
    const [subCategory, setSubCategory] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    //get SubCategory from Category param url
    useEffect(() => {
        ProductService.getSubCategory(slug_category).then((data) => {
            setSubCategory(data.subCategory);
            setCategoryName(data.category.name);
        });
    }, [slug_category]);

    const fetchAllProducts = async () => {
        const res = await ProductService.getAllProducts(subCateChosen);
        return res;
    };

    const handleShowProducts = (slug_subCategory) => {
        subCateChosen = slug_subCategory;
        refetch();
    };

    const { data: products, refetch } = useQuery({
        queryKey: ["product"],
        queryFn: fetchAllProducts,
        refetchOnWindowFocus: false,
        enabled: false,
    });
    console.log("products data: ", products);

    return (
        <div className={cx("container")}>
            <div className={cx("shop-category", "inner-content")}>
                <p className={cx("title")}>{categoryName}</p>
                {subCategory.map((subCate, index) => (
                    <Button
                        key={index}
                        onClick={() => handleShowProducts(subCate.slug)}
                    >
                        {subCate.name}
                    </Button>
                ))}
            </div>
            <div className={cx("shop-new", "inner-content")}>
                <p className={cx("title")}>Tin đăng mới</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <CardProduct type="horizontal" />
                    <CardProduct type="horizontal" />
                    <CardProduct />
                </div>
            </div>
        </div>
    );
}

export default Products;
