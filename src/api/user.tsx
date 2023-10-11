import { connect } from './connect';

export const signup = (user: any) => {
  const url = `/signup`;
  return connect.post(url, user);
};
export const signin = (user: any) => {
  const url = `/login`;
  return connect.post(url, user);
};
export const fogetPassword = (data: any) => {
  const url = `/forgot_password`;
  return connect.post(url, data);
};

export const resetPassWord = (data: any) => {
  const url = `/reset_password?token=${data.token}`;
  return connect.post(url, data);
}
