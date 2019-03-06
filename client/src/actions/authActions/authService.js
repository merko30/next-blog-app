import jwt_decode from 'jwt-decode';

export const request = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const getUser = (id) => {
    return fetch(`/api/auth/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(res => res.json())
}

export const getUserIDfromToken = (token) => {
    return jwt_decode(token);
}

export const register = (url, { name, email, username, password, avatar}) => {
    const fData = new FormData();
    fData.append('username', username);
    fData.append('name', name);
    fData.append('email', email);
    fData.append('avatar', avatar);
    fData.append('password', password);

    return fetch(url, {
        method: "POST",
        body: fData,
    })
}