const ServerURL = `${"https://blog-web-app-aw8y.onrender.com"}/api/v1`;
// const ServerURL = `http://localhost:4000/api/v1`;

exports.AddBlog = async (formData, imgFile) => {
  const data = new FormData();

  for (let key in formData) {
    data.append(key, formData[key]);
  }

  if (imgFile) {
    data.append("img", imgFile);
  }

  try {
    const res = await fetch(`${ServerURL}/add/blog`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Failed to submit Blog Details");
    }

    return { success: true };
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

exports.GetAllBlogs = async () => {
  try {
    const res = await fetch(`${ServerURL}/get/allblogs`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to Get Blog");
    }

    const data = await res.json(); // ✅ Parse response as JSON
    return { success: true, data }; // ✅ Return the parsed data
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

exports.GetBlogById = async (blogId) => {
  try {
    const res = await fetch(`${ServerURL}/get/blog/${blogId}`, {
      method: "GET",
    });

    const data = await res.json(); // ✅ Parse response as JSON
    return { success: true, data }; // ✅ Return the parsed data
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

exports.DeleteBlog = async (blogId) => {
  try {
    const res = await fetch(`${ServerURL}/blog/delete/${blogId}`, {
      method: "DELETE",
    });

    // if (!res.ok) {
    //   throw new Error("Failed to Delete Blog");
    // }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

exports.UpdateBlog = async (blogId, formData, imgFile) => {
  try {
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    if (imgFile) {
      data.append("img", imgFile);
    }

    console.log("DATA: ", data);

    const res = await fetch(`${ServerURL}/blog/update/${blogId}`, {
      method: "PUT",
      body: data,
    });

    const updateData = await res.json();
    return { success: true, updateData };
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};
