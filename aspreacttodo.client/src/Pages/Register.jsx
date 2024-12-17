import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const handleLoginClick = () => {
		navigate("/login");
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === "email") setEmail(value);
		if (name === "password") setPassword(value);
		if (name === "confirmPassword") setConfirmPassword(value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password || !confirmPassword) {
			setError("Please fill in all fields")
		}
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Please enter a valid email address.");
		}
		else if (password !== confirmPassword) {
			setError("Passwords do not match.");
		}
		else {
			setError("");

			fetch("/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
				.then((data) => {
					console.log(data);
					if (data.ok)
						setError("Successful register.");
					else
						setError("Error registering.");
				})
				.catch((error) => {
					console.error(error);
					setError("Error registering");
				});
		}
	}

	return (
		<>
			<div className="containerbox">
				<h4>Registration</h4>
				<Form>
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" id="email" name="email" value={email} onChange={handleChange} placeholder="Enter email"></Form.Control>
					<Form.Label style={{ margin: "10px 0px" }}>Password</Form.Label>
					<Form.Control type="password" id="password" name="password" value={password} onChange={handleChange} placeholder="Password"></Form.Control>
					<Form.Label style={{ margin: "10px 0px" }}>Confirm Password</Form.Label>
					<Form.Control type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Confirm password"></Form.Control>
					<div>
						<Button type="submit" onClick={handleSubmit} style={{ margin: "10px 0px" }}>Register</Button>
					</div>
					<div>
						<Button onClick={handleLoginClick} variant="secondary" style={{ margin: "10px 0px" }}>Go to Login</Button>
					</div>
					{error && <p className="error">{error}</p>}
				</Form>
			</div>
		</>
	);
}

export default Register;