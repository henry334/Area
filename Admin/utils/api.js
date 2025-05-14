import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

 const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/adminlogin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // TO-DO print if I have not authority
    throw error;
  }
};

const getMe = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (endpoint, email, token) => {
  const url = `${API_BASE_URL}/admin/${endpoint}/${email}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

export default {
  login,
  getMe,
  getUsers,
  updateUser,
};
