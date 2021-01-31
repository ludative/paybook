import Axios from './axios';
import { IUserSignInInput } from '../interfaces/user';

const USER_PREFIX:string = `/api/users`;

export const checkUsername = async (username: string) => {
  const axios = new Axios<{username: string}>();
  return axios.post(`${USER_PREFIX}/check-username`, {
    username
  })
}

export const signIn = async (data: IUserSignInInput) => {
  const axios = new Axios<IUserSignInInput>();
  return axios.post(`${USER_PREFIX}/sign-in`, data)
}