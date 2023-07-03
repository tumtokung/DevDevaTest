import React from 'react';
import { useEffect, useState } from 'react';
import { deleteUserAPI, getAllUserAPI } from '../../apis/user';
import { UserResponse } from '../../models/user';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

const User = () => {
  const [users, setUser] = useState<UserResponse[]>([]);
  const navigate = useNavigate();
  const tableHeader = [{
    title: "Profile picture"
  },
  {
    title: "First name"
  },
  {
    title: "Last name"
  },
  {
    title: "Gender"
  },
  {
    title: "Birthday"
  },
  {
    title: "Action"
  },];

  const getUsers = async () => {
    const response = await getAllUserAPI();
    setUser(response);
  }

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure to delete user ?')) {
      const response = await deleteUserAPI(userId);
      setUser(oldUsers => oldUsers.filter(user => user._id !== response._id))
    }
  }

  useEffect(() => {
    getUsers();
  }, [])
  return (
    <div className="relative w-11/12 mx-auto">
      {/* header */}
      <div className='flex flex-row justify-between mt-4 mb-10'>
        <h2>Users List</h2>
        <Button variant='primary' title='Add +' className="w-24 h-10" onClick={() => navigate('/user')} />
      </div>
      {/* content */}
      <div className='overflow-x-auto px-6'>
        <table className="w-full md:text-lg text-sm text-center text-black">
          <thead className="bg-gray-300">
            <tr>
              {tableHeader.map((table) => {
                return (
                  <th scope="col" className="py-4">
                    {table.title}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>

            {users.map(user => {
              return (
                <tr className="hover:bg-gray-50">
                  <td className="py-3">
                    <img
                      src={user.image.length > 0 ? user.image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"}
                      alt={user.firstName}
                      className='object-cover w-16 md:h-16 h-12 rounded-full mx-auto'
                    />
                  </td>
                  <td className="">
                    {user.firstName}
                  </td>
                  <td className="">
                    {user.lastName}
                  </td>
                  <td className="">
                    {user.gender}
                  </td>
                  <td className="">
                    {user.birthDate}
                  </td>
                  <td className="md:space-x-3">
                    <Button variant='warning' title="Edit" onClick={() => navigate(`/user/${user._id}`)} />
                    <Button variant='error' title="Delete" onClick={() => handleDelete(user._id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User;