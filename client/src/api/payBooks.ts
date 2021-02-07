import {ICreatePayBookInfo} from "../interfaces/IPayBooks";
import Axios from "./axios";

const PAY_BOOKS_PREFIX:string = `/api/pay-books`;

export const createPayBookApi = async (data: ICreatePayBookInfo) => {
    const axios = new Axios<ICreatePayBookInfo>();
    return axios.post(PAY_BOOKS_PREFIX, data)
}

export const createPayBookByInvitedCodeApi = async (inviteCode: string) => {
    const axios = new Axios<{inviteCode: string}>();
    return axios.post(`${PAY_BOOKS_PREFIX}/invite`, {inviteCode});
}
