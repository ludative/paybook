import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Header } from "semantic-ui-react";
import { signIn } from "../../api/users";
import "../../styles/sign-in.scss";

export default function SignIn() {
  const history = useHistory();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async () => {
    try {
      await signIn({
        username,
        password,
      });
      history.push("/");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="UserForm">
      <Header as="h2">로그인</Header>
      <Form.Input
        label="username"
        placeholder="your username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Form.Input
        type="password"
        label="비밀번호"
        placeholder="your password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        primary
        type="submit"
        onClick={onSubmit}
        disabled={!username || !password}
      >
        로그인
      </Button>
    </Form>
  );
}
