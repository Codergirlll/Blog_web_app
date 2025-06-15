import React, { useState } from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AddBlog } from "../api/blog.api";
import "../styles/TaskForm.css";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    titleUrl: "",
    heading: "",
    description: "",
    keywords: "",
    content: "",
    status: "inactive",
  });

  const [imgFile, setImgFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await AddBlog(formData, imgFile);

    if (result.success) {
      alert("✅ Blog added successfully!");
      setFormData({
        title: "",
        titleUrl: "",
        heading: "",
        description: "",
        keywords: "",
        content: "",
        status: "inactive",
      });
      setImgFile(null);
    } else {
      alert(`❌ ${result.error || "Submission failed"}`);
    }
  };

  return (
    <>
      <div style={styles?.mainContainer}>
        <h3 className="" style={styles?.title}>
          📝 Create New Blog
        </h3>
        <div className="form-page">
          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <section className="mb-4">
                <h5 className="text-secondary mb-3">Blog Info</h5>
                <Row className="g-3">
                  {[
                    "title",
                    "titleUrl",
                    "heading",
                    "description",
                    "keywords",
                  ].map((field) => (
                    <Col lg={6} key={field}>
                      <Form.Group controlId={field}>
                        <Form.Label className="text-capitalize">
                          {field}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder={`Enter ${field}`}
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </section>

              <section className="mb-4">
                <h5 className="text-secondary mb-3">Content</h5>
                <Form.Group>
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFormData((prev) => ({ ...prev, content: data }));
                    }}
                  />
                </Form.Group>
              </section>

              <section className="mb-4">
                <h5 className="text-secondary mb-3">Media & Settings</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="inactive">Inactive</option>
                        <option value="active">Active</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </section>

              <div className="text-end">
                <Button type="submit" variant="primary" size="lg">
                  🚀 Publish Blog
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BlogForm;

const styles = {
  title: {
    color: "#212121",
    marginBottom: "1.5rem",
    fontWeight: "bold",
    fontSize: "1.75rem",
  },
  mainContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
};

// import React, { useState } from "react";
// import "../styles/TaskForm.css";
// import { Col, Row } from "react-bootstrap";
// import { AddBlog } from "../api/blog.api";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const BlogForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     titleUrl: "",
//     heading: "",
//     description: "",
//     keywords: "",
//     content: "",
//     status: "inactive",
//   });

//   const [imgFile, setImgFile] = useState(null);
//   // const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImgFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await AddBlog(formData, imgFile);

//     if (result.success) {
//       // setSuccess(true);
//       alert("✅ Blog added!");
//       setFormData({
//         title: "",
//         titleUrl: "",
//         heading: "",
//         description: "",
//         keywords: "",
//         content: "",
//         status: "inactive",
//       });
//       setImgFile(null);
//     } else {
//       alert(`❌ ${result.error || "Submission failed"}`);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Add New Blog</h2>
//       <form onSubmit={handleSubmit}>
//         <Row>
//           {["title", "titleUrl", "heading", "description", "keywords"].map(
//             (field) => (
//               <Col lg={6} key={field}>
//                 <div className="form-group">
//                   <label>{field}</label>
//                   <input
//                     type="text"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </Col>
//             )
//           )}

//           {/* CKEditor for content */}
//           <Col lg={12}>
//             <div className="form-group">
//               <label>Content</label>
//               <CKEditor
//                 editor={ClassicEditor}
//                 data={formData.content}
//                 onChange={(event, editor) => {
//                   const data = editor.getData();
//                   setFormData((prev) => ({ ...prev, content: data }));
//                 }}
//               />
//             </div>
//           </Col>

//           <Col lg={6}>
//             <div className="form-group">
//               <label>Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </Col>

//           <Col lg={6}>
//             <div className="form-group">
//               <label>Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="inactive">Inactive</option>
//                 <option value="active">Active</option>
//               </select>
//             </div>
//           </Col>

//           <Col lg={12}>
//             <button type="submit" className="submit-btn">
//               Submit
//             </button>
//             {/* {success && <p className="success-message">✅ Blog added!</p>} */}
//           </Col>
//         </Row>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;
