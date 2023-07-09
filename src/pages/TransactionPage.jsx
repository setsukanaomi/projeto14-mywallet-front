import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import axios from "axios";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const { token, setLoading } = useContext(Context);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const { tipo } = useParams();

  function Transaction(event) {
    event.preventDefault();

    const authentication = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const transaction = {
      value: parseFloat(value),
      description,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`, transaction, authentication)
      .then(() => {
        navigate("/home");
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        alert(error.message);
      });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={Transaction}>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" type="number" />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          type="text"
        />
        <button type="submit">Salvar {tipo}</button>
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
