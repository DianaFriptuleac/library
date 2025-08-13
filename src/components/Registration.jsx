import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, registerUserLocal } from "../features/auth/authAction";

const Registration = () => {
  //Stato x il form
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return (
      <div className="register-background">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert className="register-container mt-3 border-0">
                <h4 className="registerTitle text-light">Logout necessario!</h4>
                <p className="alert-p text-light">
                  To register another user, you must log out.
                </p>
                <div className="d-flex justify-content-end">
                  <Button
                    className="alert-auth-btn"
                    onClick={() => {
                      dispatch(logoutUser());
                      navigate("/register");
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  // aggiorna stato quando cambia un campo nel form
  const handleChange = (e) =>
    setRegisterData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await dispatch(registerUserLocal(registerData));
      setVariant("success");
      setMessage(`Registration complete! Welcome, ${registerData.nome}`);
      setLoading(false);
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      setVariant("danger");
      setMessage(error.message || "Registration error!");
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className=" mb-0 text-center mt-2 loginTitle">
              Register
            </h1>
            <Form onSubmit={handleRegister} className="login-container">
              <Form.Group className="mb-3">
                <Form.Label className="text-light">FirstName</Form.Label>
                <Form.Control
                  className="loginControl"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-light">LastName</Form.Label>
                <Form.Control
                  className="loginControl"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Data di nascita</Form.Label>
                <Form.Control
                  className="loginControl"
                  type="date"
                  name="birthDate"
                  value={registerData.birthDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="registerEmail" className="mb-3">
                <Form.Label className="text-light">Email</Form.Label>
                <Form.Control
                  className="loginControl"
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="registerPassword" className="mb-3">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control
                  className="loginControl"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </Form.Group>

              <Form.Group controlId="registerConfirmPassword" className="mb-3">
                <Form.Label className="text-light">
                  Conferma Password
                </Form.Label>
                <Form.Control
                  className="loginControl"
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button type="submit" className="w-25 mt-3 loginButton">
                  Register
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
export default Registration;
