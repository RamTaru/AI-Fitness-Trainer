// import axios from 'axios';
import { User } from '../types'; // Your User type
import { apiClient } from './api';

// const apiClient = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Add an interceptor to include the auth token in requests
// apiClient.interceptors.request.use(config => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });


interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoal: string;
  activityLevel: string;
  sex: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

/**
 * NEW: Fetches the full profile of the currently authenticated user.
 */
export const fetchUserProfile = async (): Promise<User> => {
    const response = await apiClient.get('/users/me/');
    // Map backend snake_case to frontend camelCase if necessary
    const user: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.first_name, // Backend sends 'first_name'
        age: response.data.age,
        weight: response.data.weight_kg,
        height: response.data.height_cm,
        fitnessGoal: response.data.fitness_goal,
        activityLevel: response.data.activity_level,
        createdAt: response.data.date_joined, 
        isAdmin: response.data.isAdmin,
        sex: response.data.sex
        
    };
    return user;
}

export const register = async (userData: RegisterData): Promise<any> => {
  const backendData = {
    email: userData.email,
    password: userData.password,
    name: userData.name,
    age: userData.age,
    weight_kg: userData.weight,
    height_cm: userData.height,
    fitness_goal: userData.fitnessGoal,
    activity_level: userData.activityLevel,
    sex: userData.sex
  };
  
  const response = await apiClient.post('/register/', backendData);
  return response.data;
};

/**
 * Logs in a user. This now gets tokens AND fetches the user profile.
 */
export const login = async (email: string, password: string): Promise<User> => {
  const response = await apiClient.post<LoginResponse>('/token/', {
    email,
    password
  });

  // Store tokens in localStorage
  localStorage.setItem('accessToken', response.data.access);
  localStorage.setItem('refreshToken', response.data.refresh);
  
  // After getting tokens, fetch the full user profile
  const user = await fetchUserProfile();
  
  // Store the full user object in localStorage
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};


export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
}