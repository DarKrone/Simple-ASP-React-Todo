import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button} from 'react-bootstrap'

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberme, setRememberme] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
	}

	const handleRegisterClick = () => {
		navigate("/register");
	}

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
        }
        else {
            setError("");
            var loginurl = "";
            if (rememberme == true)
                loginurl = "/login?useCookies=true";
            else
                loginurl = "/login?useSessionCookies=true";

            fetch(loginurl, {
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
                    if (data.ok) {
                        setError("Successful Login.");
                        window.location.href = '/';
                    }
                    else
                        setError("Error Logging In.");

                })
                .catch((error) => {
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <>
            <div className="containerbox">
                <h4>Log in</h4>
                <Form>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" id="email" name="email" value={email} onChange={handleChange} placeholder="Enter email"></Form.Control>
                    <Form.Label style={{ margin: "10px 0px" }}>Password</Form.Label>
                    <Form.Control type="password" id="password" name="password" value={password} onChange={handleChange} placeholder="Password"></Form.Control>
                    <Form.Check inline type="checkbox" label="Remember me" onChange={handleChange} id="rememberme" name="rememberme" style={{ margin: "5px 0px" }}></Form.Check>
                    <div>
                        <Button type="submit" onClick={handleSubmit} style={{ margin: "10px 0px" }}>Log In</Button>
                    </div>
                    <div>
                        <Button onClick={handleRegisterClick} variant="secondary" style={{ margin: "10px 0px" }}>Register</Button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </Form>
            </div>
        </>
    );
}

export default Login;