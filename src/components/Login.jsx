import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { loginUserLocal } from "../features/auth/authAction";
const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return (
      <div className="login-background">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert
                variant="info"
                className="mt-3 login-container border border-0"
              >
                <h4 className="text-light mb-0 mt-2 loginTitle">
                  You're already logged in!
                </h4>
                <p className="text-light alert-p">
                  You're already logged in. Go back to your profile page.
                </p>
                <div className="d-flex justify-content-end">
                  <Button
                    className="alert-auth-btn"
                    onClick={() => navigate("/userprofile")}
                  >
                    Go to Profile
                  </Button>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUserLocal(userCredentials));
      setMessage("Login successful!");
      setVariant("success");
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Error logging in! Please try again.");
      setVariant("danger");
    }
  };

  return (
    <div className="login-background">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="mb-0 text-center mt-2 loginTitle">Log in</h1>
            <Form onSubmit={handleSubmit} className="login-container">
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="text-light">Email</Form.Label>
                <Form.Control
                  className="loginControl"
                  type="email"
                  name="email"
                  value={userCredentials.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control
                  className="loginControl"
                  type="password"
                  name="password"
                  value={userCredentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button type="submit" className="w-25 mt-3 loginButton">
                  Log in
                </Button>
              </div>
            </Form>
            {message && (
              <Alert
                className={`mt-3 ${
                  variant === "success" ? "alert-success" : "alert-danger"
                }`}
              >
                {message}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
