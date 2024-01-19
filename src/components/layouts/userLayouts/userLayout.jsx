import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
// import { Outlet } from "react-router-dom";
import style from "./UserLayouts.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function UserLayout({ children }) {
  return (
    <div className={cx("container")}>
      <Header className={cx("content")} />
      <div className={cx("inner")}>{children}</div>
      <Footer className={cx("content")} />
    </div>
  );
}

export default UserLayout;