import Axios from './axios';

const USER_PREFIX:string = `/api/users`;

export const checkUsername = async (username: string) => {
  const axios = new Axios<{username: string}>();
  return axios.post(`${USER_PREFIX}/check-username`, {
    username
  })
}