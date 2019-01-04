

export const createComment = (postID, data) => {
    return fetch(`/api/comments/${postID}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
}

export const deleteComment = (commentID, postID) => {
    return fetch(`/api/comments/${postID}/${commentID}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}