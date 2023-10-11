import { resetPassWord } from '@/api/user';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

type FormInputs = {
  token: string;
  newPassword: string;
  verifyPassword: string;
};

const ResetPassWord = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({});
  const navigate = useNavigate();
  
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const newData = { password: data.newPassword, token: token };
    if (data?.newPassword === data?.verifyPassword) {
      const { data: user } = await resetPassWord(newData);
      if (user?.code != '00') {
        toastr.error(user?.message);
      } else {
        toastr.success(`${user.message}, chuyển sang trang đăng nhập sau 2s`);
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } else {
      toastr.error('Mật khẩu không trùng khớp vui lòng bạn nhập lại!');
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Tạo mật khẩu mới</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu"
                {...register('newPassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.newPassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu!</span>
              )}
              {errors.newPassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối thiểu 8 ký tự!</span>
              )}
              {errors.newPassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Nhập lại mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập lại mật khẩu"
                {...register('verifyPassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.verifyPassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập lại mật khẩu!</span>
              )}
              {errors.verifyPassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối thiểu 8 ký tự!</span>
              )}
              {errors.verifyPassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="flex mt-[20px]">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassWord;
