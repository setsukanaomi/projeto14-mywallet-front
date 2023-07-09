import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";
import axios from "axios";

export default function SignInPage() {
  const navigate = useNavigate();
  const { setToken, setName } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    if (storedToken) {
      setToken(storedToken);
      setName(storedName);
      navigate("/home");
    }
  }, []);

  function Login(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/`, data)
      .then((response) => {
        setToken(response.data.token);
        setName(response.data.name);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <SingInContainer>
      <form onSubmit={Login}>
        <MyWalletLogo />
        <input
          data-test="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="email"
          autoComplete="email"
        />
        <input
          data-test="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
        />
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
