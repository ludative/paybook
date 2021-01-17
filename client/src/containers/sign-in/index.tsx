import React from 'react';
import useRequest from '../../utils/swr';
import { checkUsername } from '../../api/users';

export default function SignIn() {
  const {data} = useRequest({url: "/api/codes"})
  console.log(data)
  const test = async () => {
    try {
      const data = await checkUsername('sally')
      console.log(data);
    } catch (e) {
      alert(e.message)
    }
  }
  return (
    <>
      <p>hello</p>
      <button onClick={test}>test</button>
    </>
  );
}