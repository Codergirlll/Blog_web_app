import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  return (
    <>
      <h4 className="text-light mb-4">Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/add-post"
          active={location.pathname === '/add-post'}
          className="text-light"
        >
          Add Post
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/all-posts"
          active={location.pathname === '/all-posts'}
          className="text-light"
        >
          All Posts
        </Nav.Link>
      </Nav>
    </>
  )
}

export default Sidebar
