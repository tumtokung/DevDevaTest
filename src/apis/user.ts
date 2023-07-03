import { UserResponse, User, UserEdit } from '../models/user';
import { axiosAPI } from './config';
import axiosConfig from './common';

export const getAllUserAPI = async (): Promise<UserResponse[]> => {
    const response = await axiosConfig.get<UserResponse[]>("/users");
    return response.data;
}

export const getUserByIdAPI = async (userId: string): Promise<UserResponse> => {
    const response = await axiosConfig.get<UserResponse>(`/users/${userId}`);
    return response.data;
}

export const createUserAPI = async (user: User) => {
    const form = new FormData();
    Object.entries(user).forEach(([key, value]) => {
        form.append(key, value);
    });
    const config = {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/users`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: form
    };
    const response = await axiosAPI(config);
    return response;
}

export const updateUserAPI = async (userId: string, user: UserEdit) => {
    const form = new FormData();
    Object.entries(user).forEach(([key, value]) => {
        form.append(key, value);
    });
    const config = {
        method: 'PUT',
        url: `${process.env.REACT_APP_API_URL}/users/${userId}`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: form
    };
    const res = await axiosAPI(config);
    return res;
}

export const deleteUserAPI = async (userId: string): Promise<UserResponse>  => {
    const response = await axiosConfig.delete<UserResponse>(`/users/${userId}`);
    return response.data;
}