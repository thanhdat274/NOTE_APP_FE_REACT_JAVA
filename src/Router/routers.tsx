import Signin from '@/components/auth/Signin';
import Signup from '@/components/auth/Signup';
import Home from '@/pages/Home';
import WebsiteLayout from '@/pages/WebsiteLayout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';
import ListNote from '@/components/Note/ListNote';
import ForgetPassword from '@/components/auth/ForgetPassword';
import ResetPassWord from '@/components/auth/ResetPassWord';

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgetPass" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassWord />} />

      <Route
        path="/"
        element={
          <PrivateRouter>
            <WebsiteLayout />
          </PrivateRouter>
        }
      >
        <Route index element={<Home />} />
        <Route path="/folder/:id" element={<ListNote />} />
      </Route>
    </Routes>
  );
};

export default Router;
