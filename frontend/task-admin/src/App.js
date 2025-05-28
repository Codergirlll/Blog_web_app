// import React from "react";
// import TaskForm from "./components/TaskForm";

// function App() {
//   return (
//     <div>
//       <TaskForm />
//     </div>
//   );
// }

// export default App;

import { Container, Row, Col } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/SideBar'
import TaskForm from './components/TaskForm'
import AllPost from './components/AllPost'



function App() {
  return (
    <Container fluid className="bg-dark text-light">
      <Row>
        <Col md={3} className="vh-100 p-3" style={{background:"#131516"}}>
          <Sidebar />
        </Col>
        <Col md={9} className="d-flex justify-content-center align-items-center vh-100" style={{overflow: "auto",
    padding: "30px 0"}}>
          <Routes>
            <Route path="/" element={<TaskForm />} />
            <Route path="/add-post" element={<TaskForm />} />
            <Route path="/all-posts" element={<AllPost />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  )
}

export default App

