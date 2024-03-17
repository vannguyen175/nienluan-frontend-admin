function Description({ label, infor, oneLine }) {
    return (
        <span
            style={
                oneLine
                    ? { margin: "8px 80px 0 0", display: "block" }
                    : { margin: "8px 80px 0 0", minWidth: "200px" }
            }
        >
            <span style={{ color: "grey", marginRight: "5px" }}>{label}:</span>
            <span style={{ fontWeight: "500" }}>{infor}</span>
        </span>
    );
}

export default Description;
