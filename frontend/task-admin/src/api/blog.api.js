const ServerURL = `${"https://blog-web-app-aw8y.onrender.com"}/api/v1`;
// const ServerURL = `http://localhost:4000/api/v1`;

exports.login = async (body) => {
  try {
    const res = await fetch(`${ServerURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // MUST be present
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to Login");
    }

    return { success: true };
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

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
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
    });

    const data = await res.json(); // ✅ Parse response as JSON
    return { success: true, data }; // ✅ Return the parsed data
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

exports.DeleteBlog = async (titleUrl) => {
  try {
    const res = await fetch(`${ServerURL}/blog/delete/${titleUrl}`, {
      method: "DELETE",
      credentials: "include",
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

exports.UpdateBlog = async (titleUrl, formData, imgFile) => {
  try {
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    if (imgFile) {
      data.append("img", imgFile);
    }

    console.log("DATA: ", data);

    const res = await fetch(`${ServerURL}/blog/update/${titleUrl}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    const updateData = await res.json();
    return { success: true, updateData };
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};

exports.Logout = async () => {
  try {
    const res = await fetch(`${ServerURL}/logout`, {
      method: "POST",
      credentials: "include", // important for cookies ok
      headers: {
        "Content-Type": "application/json", // optional here, but safe
      },
    });

    const updateData = await res.json();
    return { success: true, updateData };
  } catch (error) {
    console.error("API error:", error);
    return { success: false, error: error.message };
  }
};
