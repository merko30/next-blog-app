export const fetchPosts = page => {
  console.log(page);
  const url = page ? `/api/posts?page=${page}` : "/api/posts";
  return fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(res => res.json())
    .catch(error => error);
};

export const fetchPost = id => {
  return fetch(`/api/posts/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(error => error);
};

export const createPost = data => {
  let formData = new FormData();

  formData.append("title", data.title);
  formData.append("body", data.body);
  formData.append("image", data.image);

  return fetch(`/api/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: formData
  })
    .then(res => res.json())
    .catch(error => error);
};

export const editPostRequest = (data, id) => {
  let formData = new FormData();

  formData.append("title", data.title);
  formData.append("body", data.body);
  formData.append("image", data.image);

  return fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: formData
  })
    .then(res => res.json())
    .catch(error => error);
};
