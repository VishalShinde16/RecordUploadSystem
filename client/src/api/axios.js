import axios from "axios";

export const axiospublic = axios.create({
    baseURL:'http://localhost:5000/',

});

export const axiosprivate = axios.create({
    baseURL:'http://localhost:5000/',
    headers: {
        token: (`Bearer ${localStorage.getItem("token")}`).toString(),
        'Content-Type': 'multipart/form-data'
      }
});

