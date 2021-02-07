import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header } from "semantic-ui-react";
import { checkUsername, signUp } from "../../api/users";
import "../../styles/sign-in.scss";
import useConfirm from "../../hooks/useConfirm";
import debounce from "lodash.debounce";

export default function SignUp() {
  const history = useHistory();
  const { confirmModal, ModalConfirm } = useConfirm();
  const [nickname, setNickname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const debounceHandleCheckUsername = useCallback(
    debounce((username: string) => handleCheckUsername(username), 500),
    []
  );

  const handleCheckUsername = async (username: string) => {
    try {
      if (!username) return;
      const data = await checkUsername(username);
      setIsValid(data.data.isValidUserName);
    } catch (e) {
      alert(e.message);
    }
  };
  const onSubmit = async () => {
    try {
      await signUp({
        nickname,
        username,
        password,
      });
      confirmModal({
        message: "회원가입에 성공하셨습니다. 로그인 페이지로 이동하시겠습니까?",
        onOk: () => history.push("/sign-in"),
      });
    } catch (e) {
      alert(e.message);
    }
  };
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setUsername(e.target.value);
    debounceHandleCheckUsername(e.target.value);
    // await onCheck(e);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="UserForm">
      <Form onSubmit={onSubmit}>
        <Header as="h2">회원가입</Header>
        <Form.Input
          label="닉네임"
          placeholder="your nickname"
          name="nickname"
          value={nickname}
          onChange={handleChangeNickname}
        />
        <Form.Input
          label="아이디"
          placeholder="your username"
          name="username"
          value={username}
          onChange={handleChangeUsername}
          error={
            !isValid && { content: "중복된 아이디입니다.", pointing: "below" }
          }
        />
        <Form.Input
          type="password"
          label="비밀번호"
          placeholder="your password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
        <Button
          primary
          type="submit"
          disabled={!username || !password || !isValid}
        >
          회원가입
        </Button>
      </Form>
      <Link to="/sign-in">로그인</Link>
      {ModalConfirm}
    </div>
  );
}
