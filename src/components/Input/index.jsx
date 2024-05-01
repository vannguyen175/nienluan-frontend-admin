//props = {text, placeholder, name, ...props}
import classNames from "classnames/bind";
import style from "./Input.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(style);

function InputComp({
	error,
	text,
	type,
	value,
	innerRef,
	avatar,
	placeholder = "",
	textarea,
	readOnly,
	disabled,
	required,
	...props
}) {
	const [valueInput, setValueInput] = useState("");
	useEffect(() => {
		setValueInput(value);
	}, [value]);

	let Comp = "input";
	if (textarea) {
		Comp = "textarea";
	}

	const handleChange = (event) => {
		setValueInput(event.target.value);
	};

	const handleClick = () => {
		setValueInput("");
	};

	return (
		<div>
			<span className={cx("container")}>
				<Comp
					className={cx("input", { disabled: disabled })}
					type={type}
					placeholder=""
					ref={innerRef}
					value={valueInput || ""}
					onChange={handleChange}
					autoComplete="on"
					readOnly={readOnly}
					rows="4"
				/>

				<FontAwesomeIcon
					className={cx("clear-input")}
					onClick={handleClick}
					icon={faXmarkCircle}
				/>
				<label className={cx("text")}>
					{text}
					{required && <span style={{ color: "red" }}>*</span>}
				</label>
				{avatar ? <img src={valueInput} alt="avatar" /> : ""}
			</span>
			{error ? <div className={cx("show-error")}>{error}</div> : ""}
		</div>
	);
}

export default InputComp;
