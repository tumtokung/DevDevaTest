export interface User {
    firstName: string;
    lastName: string;
    gender: "male" | "female" | "";
    birthDate: string;
    image: any;
}

export interface UserEdit extends User {
    newImage?: File
}

export interface UserResponse extends User {
    _id: string;
    createdAt: string;
    updatedAt: string;
}