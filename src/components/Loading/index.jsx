import Spinner from "react-bootstrap/Spinner";
function Loading({ children, animation }) {
    return (
        <Spinner animation={animation} role="status">
            <span className="visually-hidden">{children}</span>
        </Spinner>
    );
}

export default Loading;
