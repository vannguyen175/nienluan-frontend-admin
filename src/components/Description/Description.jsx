function Description({ label, infor, oneLine }) {
    return (
        <span
            // style={{
            //     margin: "8px 40px 0 0",
            //     minWidth: "600px",
            // }}
            style={
                oneLine
                    ? { margin: "8px 80px 0 0", minWidth: "600px" }
                    : { margin: "8px 80px 0 0", minWidth: "200px" }
            }
        >
            <span style={{ color: "grey", marginRight: "5px" }}>{label}:</span>
            <span style={{ fontWeight: "500" }}>{infor}</span>
        </span>
    );
}

export default Description;
