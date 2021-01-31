import Axios from './axios';
import {ICodeApiFormat, IModalCode} from "../interfaces/ICodes";

const CODES_PREFIX:string = `/api/codes`;

export const addCodeApi = async (code: IModalCode) => {
    const axios = new Axios<ICodeApiFormat>();
    return axios.post(CODES_PREFIX, code);
}

export const updateCodeApi = async ({id, ...code}: IModalCode) => {
    const axios = new Axios<ICodeApiFormat>();
    return axios.put(`${CODES_PREFIX}/${id}`, code);
}
