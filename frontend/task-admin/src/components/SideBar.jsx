import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <h4  style={styles?.title}>Blog Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/add-blog"
          active={location.pathname === "/add-blog"}
          
          style={styles?.navlink}
        >
          Add Blog
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/all-blogs"
          active={location.pathname === "/all-blogs"}
          
          style={styles?.navlink}

        >
          All Blogs
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Sidebar;
const styles = {
  navlink:{
    padding:"12px 20px",
    fontSize:"16px",
    fontWeight:"600",
    color:"#fff"
  },
  title:{
    padding:"20px",
    borderBottom:"1px solid #fff",
    color:"#fff"
  }
}