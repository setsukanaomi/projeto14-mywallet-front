import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function TransactionsPage() {
  const { tipo } = useParams();

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form>
        <input placeholder="Valor" type="text" />
        <input placeholder="Descrição" type="text" />
        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
