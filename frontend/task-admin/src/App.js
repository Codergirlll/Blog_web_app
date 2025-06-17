import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/SideBar";
import BlogForm from "./components/BlogForm";
import AllBlog from "./components/AllBlog";
import EditForm from "./components/EditBlog";
import Login from "./components/Login";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Cookies.get('token'):", token);

    const isLoginPage = location.pathname === "/login";

    if (!token && !isLoginPage) {
      // If no token and trying to access other pages → redirect to login
      navigate("/login");
    }

    if (token && isLoginPage) {
      // If token exists and user is on login → redirect to dashboard
      navigate("/all-blogs");
    }
  }, [navigate, location]);

  return (
    <Container fluid style={styles.mainContainer}>
      <Row>
        <Col md={3} style={styles.sideContainer}>
          <Sidebar />
        </Col>
        <Col md={9} style={styles.pageContainer}>
          <Routes>
            <Route path="/" element={<BlogForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-blog" element={<BlogForm />} />
            <Route path="/all-blogs" element={<AllBlog />} />
            <Route path="/edit-blog/:titleUrl" element={<EditForm />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

const styles = {
  pageContainer: {
    height: "100vh",
    overflow: "auto",
    padding: "30px 0",
  },
  sideContainer: {
    height: "100vh",
    overflow: "auto",
    background: "#253238",
    padding: "0px",
  },
  mainContainer: {
    background: "#f8f9fa",
  },
};
