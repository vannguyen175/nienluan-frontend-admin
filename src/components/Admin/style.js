import { Upload } from "antd";
import styled from "styled-components";

export const WrapperUploadFile = styled(Upload)`
    & {
        display: flex;
    }
    & .ant-upload-list-item-name, .ant-upload-icon, .ant-btn-icon {
        display: none;
    }

    button {
        margin-right: 20px;
        border: 1px solid black;
    }
`;
