import { connect } from './connect';

export const signup = (user: any) => {
  const url = `/signup`;
  return connect.post(url, user);
};
export const signin = (user: any) => {
  const url = `/login`;
  return connect.post(url, user);
};
