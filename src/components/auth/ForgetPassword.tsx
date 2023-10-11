import { fogetPassword } from '@/api/user';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

type Props = {};
type FormValues = {
  email: string;
};

const ForgetPassword = (props: Props) => {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  console.log(message);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { data: dataa } = await fogetPassword(data);

      if (dataa?.code != '00') {
        toastr.error(dataa?.message);
      } else {
        setMessage(dataa?.message);
        toastr.success(dataa?.message);
      }
    } catch (error: any) {
      toastr.error(error?.response?.dataa?.message);
    }
  };
  console.log(message);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {!message && (
        <div className="max-w-md w-full space-y-8">
          <div className="rounded bg-white max-w-md overflow-hidden shadow-2xl p-5 space-y-8">
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">Lây lại mật khẩu</h2>
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
              <div className="flex mt-[20px]">
                <button
                  type="submit"
                  className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
                >
                  Gửi email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {message && (
        <div className="max-w-2xl w-full space-y-8">
          <div className="w-full flex justify-center flex-col">
            {/* <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-green-500 h-20" /> */}
            <h2 className="text-[25px] mt-10 text-green-500 text-center">{message}</h2>
            <Link to={'https://mail.google.com'}>
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block mt-10">
                Đi tới email
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
