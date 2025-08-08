import { useState } from "react";
import { Container,Row, Col, Form, Button,Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginRegistration = () => {

const [registerData, setRegisterData] = useState({
  email: "",
  password: "",
  confirmPassword: "",
});

const [message, setMessage] = useState("");
const [variant, setVariant] = useState("danger");
const navigate = useNavigate();

const handleChange = (e) => {
  setRegisterData({
    ...registerData,
    [e.target.name]: e.target.value,
  });
};

const handleRegister = (e) => {
  e.preventDefault();

  if (registerData.password !== registerData.confirmPassword) {
    setMessage("Passwords do not match.");
    setVariant("danger");
    return;
  }

  setMessage("Registered!");
  setVariant("success");
  setRegisterData({ email: "", password: "", confirmPassword: "" });

  setTimeout(() => {
    navigate("/")
  }, 3000)
};

return (
  <div className="login-background">
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-light mb-0 text-center mt-2 loginTitle">
            Registrati
          </h1>
          <Form onSubmit={handleRegister} className="login-container">
            <Form.Group controlId="registerEmail" className="mb-3">
              <Form.Label className="text-light">Email</Form.Label>
              <Form.Control
                className="loginControl"
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                placeholder="Inserisci la tua email"
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
                placeholder="Crea una password"
                required
              />
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword" className="mb-3">
              <Form.Label className="text-light">Conferma Password</Form.Label>
              <Form.Control
                className="loginControl"
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleChange}
                placeholder="Ripeti la password"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" className="w-25 mt-3 loginButton">
                Registrati
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

}
export default LoginRegistration;