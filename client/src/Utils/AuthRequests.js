import { useResolvedPath } from 'react-router-dom';
import { server } from './hosts';
import { setUserState, getCurrUser } from './userState';

import axios from 'axios';

// return user token from strapi
export const postUser = async (body) => {
  const response = await axios.post(`${server}/auth/local`, body);
  return response;
};

// return token from session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
};

// remove the token ans user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  setUserState(getCurrUser());
};

// set the token and user from the session storage
export const setUserSession = (jwt, user) => {
  sessionStorage.setItem('token', jwt);
  sessionStorage.setItem('user', user);
  setUserState(getCurrUser());
};

// register a new user
export const registerUser = async (body) => {
  const response = await axios.post(`${server}/auth/local/register`, body);
  return response;
};

export const deleteUser = async (userId) => {
  try {
    // Include the Authorization header with the JWT token
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` }
    };

    // Perform the DELETE request to the API endpoint
    const response = await axios.delete(`${server}/users/${userId}`, config);

    // Handle the response here, if needed
    console.log('User deleted successfully', response.data);

    return response;
  } catch (error) {
    // Log or handle the error appropriately
    console.error('Error deleting user:', error);
    throw error;
  }
}

//return User data
export const getCurrentUser = async () => {
  const user = await axios.get(`${server}/users/me`); 
  
  return user;
}