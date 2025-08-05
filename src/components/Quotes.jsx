import { Card, Col, Container, Row } from "react-bootstrap";
import "../css/Home.css";

const quotes = [
  "Books are a uniquely portable magic. – Stephen King",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go. – Dr. Seuss",
  "Once you learn to read, you will be forever free. – Frederick Douglass",
  "A reader lives a thousand lives before he dies. The man who never reads lives only one. – George R.R. Martin",
  "There is more treasure in books than in all the pirate’s loot on Treasure Island. – Walt Disney",
  "There is no friend as loyal as a book. – Ernest Hemingway",
];

const Quotes = () => {
  return (
    <div className="quotes-section">
      <Container>
        <Row  className="d-flex justify-content-center gap-3">
          {quotes.map((q, i) => (
            <Col key={i} md={6} lg={3} className="mb-3 d-flex">
              <Card className="quotes-card shadow"
              style={{height: "150px", width: "100%"}}>
                <Card.Body>
                  <Card.Text>{q}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Quotes;
