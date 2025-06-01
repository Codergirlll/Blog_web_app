import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import BlogForm from "./components/BlogForm";
import AllBlog from "./components/AllBlog";
import EditForm from "./components/EditBlog";

function App() {
  return (
    <Container fluid className="bg-dark text-light">
      <Row>
        <Col md={3} className="vh-100 p-3" style={{ background: "#131516" }}>
          <Sidebar />
        </Col>
        <Col
          md={9}
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ overflow: "auto", padding: "30px 0" }}
        >
          <Routes>
            <Route path="/" element={<BlogForm />} />
            <Route path="/add-blog" element={<BlogForm />} />
            <Route path="/all-blogs" element={<AllBlog />} />
            <Route path="/edit-blog/:id" element={<EditForm />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
