import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext, useState } from "react";
import { Context } from "../contexts/Context";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { name, setName } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function Register(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não são iguais!");
      return;
    }

    const data = {
      name,
      email,
      password,
      confirmPassword,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/cadastro`, data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <SingUpContainer>
      <form onSubmit={Register}>
        <MyWalletLogo />
        <input data-test="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" type="text" />
        <input
          data-test="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="email"
          autoComplete="on"
        />
        <input
          data-test="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
        />
        <input
          data-test="conf-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
        />
        <button data-test="sign-up-submit" type="submit">
          Cadastrar
        </button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
