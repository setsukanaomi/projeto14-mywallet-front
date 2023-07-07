import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";

export default function SignInPage() {
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" autoComplete="email" />
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" />
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
