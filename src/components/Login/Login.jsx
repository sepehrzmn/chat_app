import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import "./Login.css";

function Login({ setId }) {
	const [sye, setEye] = useState(false);
	const [error, setError] = useState("");
	const idRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		if (!checkedId(idRef.current.value)) return console.log("ops");

		setId(idRef.current.value);
	}
	function handleSee() {
		setEye(!sye);
	}
	function createAccount(e) {
		e.preventDefault();

		setId(uuid());
	}
	function checkedId(id) {
		setError("");
		if (id.trim().length < 36) {
			setError("Characters should not be less than 32");
			return false;
		}
		const regex = /[0-9]-/g;
		const match = id.match(regex);
		if (match) {
			return true;
		}
		setError(
			"Letters not be in it (only Number) example: d837bf05-cf16-4aa9-886b-da5571ef0b45 "
		);
		return false;
	}
	return (
		<div className="text-white l-background">
			<Container className="d-flex align-items-center l-container " style={{}}>
				<div className="l-card">
					<Form className="w-100 l-left" onSubmit={handleSubmit}>
						<Form.Group className="position-relative ">
							<Form.Control
								type={sye ? "text" : "password"}
								placeholder="Enter your id"
								required
								ref={idRef}
								className="text-white"
							/>
							<div
								className="position-absolute"
								style={{ bottom: ".5rem", right: "6px" }}
								onClick={handleSee}
							>
								{sye ? (
									<FaEye color="gray" size={17} />
								) : (
									<FaEyeSlash color="gray" size={17} />
								)}
							</div>
						</Form.Group>
						{error && (
							<div className="text-danger border p-2 border-danger">
								{error}
							</div>
						)}
						<div
							className="mt-2 d-flex justify-content-between "
							style={{ width: "17rem" }}
						>
							<Button className="l-btn" type="submit">
								Login
							</Button>
							<Button className="l-btn" onClick={createAccount}>
								Create Account
							</Button>
						</div>
					</Form>
					<div className="l-right">
						<h4>Jon Our Community</h4>
						<span>Welcome to your community </span>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Login;
