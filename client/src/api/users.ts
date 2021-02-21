import Axios from './axios';
import { IUserSignInInput, IUserSignUpInput } from '../interfaces/user';

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

export const signUp = async (data: IUserSignUpInput) => {
  const axios = new Axios<IUserSignUpInput>();
  return axios.post(`${USER_PREFIX}/sign-up`, data)
}