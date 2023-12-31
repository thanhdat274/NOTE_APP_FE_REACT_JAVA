import React from 'react';
import { signup } from '@/api/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

type FormValues = {
  username: string;
  email: string;
  password: string;
  repassword: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data?.password === data?.repassword) {
      try {
        await signup(data);
        toastr.success('Đăng kí tài khoản thành công, chuyển sang trang đăng nhập sau 2s');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } catch (error) {
        toastr.error('Tên tài khoản đã được đăng kí rồi');
      }
    } else {
      toastr.error('Mật khẩu không trùng khớp vui lòng bạn nhập lại!');
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-2xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">đăng ký</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Địa chỉ email <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập email"
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ email!</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className="text-[red] mt-1 block">Địa chỉ email không đúng định dạng!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Họ và tên <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập họ và tên"
                {...register('username', {
                  required: true,
                })}
              />
              {errors.username?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập họ và tên!</span>
              )}
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu"
                {...register('password', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.password?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu!</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối thiểu 8 ký tự!</span>
              )}
              {errors.password?.type === 'maxLength' && (
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
                {...register('repassword', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.repassword?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập lại mật khẩu!</span>
              )}
              {errors.repassword?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối thiểu 8 ký tự!</span>
              )}
              {errors.repassword?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="flex mt-[20px]">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
                Đăng ký
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center space-x-2 flex-nowrap">
            <span className="w-20 h-px bg-gray-300" />
            <span>OR</span>
            <span className="w-20 h-px bg-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-3 text-xl">
            <button className="border-2 rounded-md p-3 text-center cursor-pointer hover:bg-indigo-100 ">
              <i className="fab fa-google" />
            </button>
            <button className="border-2 rounded-md p-3 text-center cursor-pointer hover:bg-indigo-100">
              <i className="fab fa-linkedin" />
            </button>
            <button className="border-2 rounded-md p-3 text-center cursor-pointer hover:bg-indigo-100">
              <i className="fab fa-github" />
            </button>
          </div>
          <div className="mt-6 text-gray-600 dark:text-gray-400">
            Bạn đã có tài khoản?{' '}
            <Link to={'/signin'} className="text-blue-600 hover:underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
