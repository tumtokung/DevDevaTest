import React from 'react';
import { Routes, Route } from "react-router-dom";
import { UserPage, UserInputPage } from '../pages';
import { Nav } from '../components';

const Router = () => {
    return (
            <Nav>
                <Routes>
                    <Route index element={<UserPage />} />
                    <Route path="User" element={<UserInputPage />} />
                    <Route path="User/:userId" element={<UserInputPage />} />
                    <Route path="*" element={<div>Not Found page</div>} />
                </Routes>
            </Nav>
    )
}

export default Router