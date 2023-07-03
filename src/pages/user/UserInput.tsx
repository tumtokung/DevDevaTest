/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components';
import { User, UserEdit, UserResponse } from '../../models/user';
import { getUserByIdAPI, createUserAPI, updateUserAPI } from '../../apis/user';
import moment from "moment";


const userDefault: UserResponse = {
    _id: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    image: "",
    createdAt: "",
    updatedAt: "",
}

type PageType = 'Create' | 'Edit';

const UserInput = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserResponse>(userDefault);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setImagePreview] = useState<string>("");
    const [error, setError] = useState<boolean>(false);


    const getTitle = (): string => {
        if (userId) {
            return "Edit User";
        } else {
            return "Create new User";
        }
    }

    const getPageType = (): PageType => {
        if (userId) {
            return "Edit";
        } else {
            return "Create";
        }
    }

    const getUserInfo = async () => {
        if (userId) {
            const res = await getUserByIdAPI(userId);
            setUser(res);
        }
    }

    const handleUploadImage = () => {
        fileInputRef.current?.click();
    };

    const handleChangePicture = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const file = files?.[0];
        console.log("target >> ", file);
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDeletePicture = () => {
        setImageFile(null);
        setImagePreview('');
        setUser({ ...user, image: "" });
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>, key: keyof UserResponse) => {
        const { value } = event.target;
        if (key === 'birthDate') {
            const newDate = moment(new Date(value)).format('YYYY-MM-DD');
            setUser({ ...user, [key]: newDate });
        } else {
            setUser({ ...user, [key]: value });
        }
    }

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const isGender = value === "male" || value === "female";
        setUser({ ...user, gender: isGender ? value : "" });
    }

    const handleCreate = async () => {
        try {
            const userSave: User = {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                birthDate: user.birthDate,
                image: imageFile ? imageFile : user.image,
            }
            await createUserAPI(userSave);
            navigate('/');
        } catch (error) {
            console.log("handleCreate >> ", error)
        }
    }

    const handleEdit = async () => {
        try {
            const userSave: UserEdit = {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                birthDate: user.birthDate,
                image: user.image,
                newImage: imageFile ?? undefined
            }
            console.log("userSave >> ", userSave);
            await updateUserAPI(user._id, userSave);
            console.log("res >> ")
            navigate('/');
        } catch (error) {
            console.log("handleEdit >> ", error)
        }
    }

    const handleSave = async () => {
        if (user.firstName.length <= 0 || user.lastName.length <= 0) {
            setError(true);
            return
        }
        setError(false);
        if (window.confirm('Are you sure to Save the details ?')) {
            const type = getPageType();
            if (type === 'Create') {
                await handleCreate();
            } else {
                await handleEdit();
            }
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <div className='relative w-11/12 mx-auto flex flex-col items-center'>
            <div className='mr-auto mt-4 mb-6'>
                <h2>{getTitle()}</h2>
            </div>

            <div className='flex flex-col items-center w-10/12'>
                {/* Form and image */}
                <div className='flex lg:flex-row flex-col lg:space-x-24 lg:space-y-0 space-y-4 items-center'>
                    {/* Image */}
                    <div className='flex flex-col space-y-4 items-center'>
                        <div className='w-52 h-52 border border-black rounded-full'>
                            {previewImage.length > 0 && <img src={previewImage} alt="profile pic" className='object-cover w-52 h-52 rounded-full' />}
                            {user.image.length > 0 && !imageFile && <img src={user?.image} alt="profile pic" className='object-cover w-52 h-52 rounded-full' />}
                        </div>
                        <Button variant='primary' title='Upload Profile Picture' className='w-48' onClick={handleUploadImage} />
                        <input type="file" ref={fileInputRef} className='hidden' onChange={handleChangePicture} />
                        <Button variant='error' title='Delete Picture' className='w-40' onClick={handleDeletePicture} />
                    </div>
                    {/* Form */}
                    <div className='lg:self-end mb-4 lg:space-y-12 space-y-4'>
                        {error &&
                            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                                <p className="font-bold">ERROR</p>
                                <p>Please fill First Name and Last Name !</p>
                            </div>
                        }

                        <div className='lg:flex lg:space-x-20 lg:space-y-0 space-y-4'>
                            <div className='flex flex-col space-y-1'>
                                <label>First Name</label>
                                <input
                                    type='text'
                                    placeholder='Please enter First name'
                                    className='p-2 border border-black rounded-md w-72 h-10'
                                    value={user.firstName}
                                    onChange={(e) => handleChangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Please enter Last name'
                                    className='p-2 border border-black rounded-md w-72 h-10'
                                    value={user.lastName}
                                    onChange={(e) => handleChangeInput(e, 'lastName')}
                                />
                            </div>
                        </div>

                        <div className='lg:flex lg:space-x-20 lg:space-y-0 space-y-4'>
                            <div className='flex flex-col space-y-1'>
                                <label>Gender</label>
                                <select value={user.gender} className='p-2 border border-black rounded-md w-72 h-10' onChange={handleChangeSelect}>
                                    <option value="" disabled selected>-- Please select Gender --</option>
                                    <option value="male"> male </option>
                                    <option value="female"> female </option>
                                </select>
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label>Birthday</label>
                                <input
                                    type='date'
                                    placeholder='Please enter First name'
                                    className='p-2 border border-black rounded-md w-72 h-10'
                                    value={moment(new Date(user.birthDate)).format('YYYY-MM-DD')}
                                    onChange={e => handleChangeInput(e, 'birthDate')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Button */}
                <div className='flex w-max lg:mt-32 mt-12 lg:ml-auto space-x-6'>
                    <Button variant='gray' title='CANCEL' className='w-32' onClick={() => navigate('/')} />
                    <Button variant='success' title='SAVE' className='w-32' onClick={handleSave} />
                </div>
            </div>
        </div>
    )
}

export default UserInput