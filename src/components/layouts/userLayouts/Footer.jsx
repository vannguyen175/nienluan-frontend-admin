import style from "./UserLayouts.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Footer() {
    return ( 
        <div className={cx('footer')}>
            <div>
                <a href="/#">Về chúng tôi</a>
                <a href="/#">Trợ giúp</a>
                <a href="/#">Quy định và điều khoản</a>
            </div>
            <p style={{ userSelect: 'none' }}>© 2024 by VanNguyen. Powered and secured by Wix</p>
        </div>
     );
}

export default Footer;