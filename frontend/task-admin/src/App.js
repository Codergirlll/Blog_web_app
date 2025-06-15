import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import BlogForm from "./components/BlogForm";
import AllBlog from "./components/AllBlog";
import EditForm from "./components/EditBlog";

function App() {
  return (
    <Container fluid className="" style={styles?.mainContainer}>
      <Row>
        <Col md={3} className="" style={styles?.sideContainer}>
          <Sidebar />
        </Col>
        <Col
          md={9}
          className={` `}
          style={styles?.pageContainer}
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

const styles = {
  pageContainer: {
  
    height: "100vh",
    overflow: "auto", 
    padding: "30px 0"
  },
  sideContainer:{
    height: "100vh",
    overflow: "auto", 
    background:"#253238",
    padding:"0px"
  },
  mainContainer:{
    background:"#f8f9fa"
  }
  
};
