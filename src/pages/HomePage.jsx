import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { calculateBalance, formatBalance } from "../components/CalculateBalance";

export default function HomePage() {
  const { name, token, setTransactions, transactions } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authentication = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${import.meta.env.VITE_API_URL}/home`, authentication)
      .then((answer) => {
        setTransactions(answer.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {!loading &&
            transactions.map((transaction, id) => (
              <ListItemContainer key={id}>
                <div>
                  <span>{transaction.date}</span>
                  <strong data-test="registry-name">{transaction.description}</strong>
                </div>
                <Value data-test="registry-amount" type={transaction.type}>
                  {transaction.value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Value>
              </ListItemContainer>
            ))}
        </ul>
        {!loading && (
          <article>
            <strong>Saldo</strong>
            <Value data-test="total-amount" color={calculateBalance() >= 0 ? "positivo" : "negativo"}>
              {formatBalance(calculateBalance())}
            </Value>
          </article>
        )}
      </TransactionsContainer>

      <ButtonsContainer>
        <button data-test="new-income">
          <StyledLink to="/nova-transacao/entrada">
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </StyledLink>
        </button>
        <button data-test="new-expense">
          <StyledLink to="/nova-transacao/saida">
            <AiOutlineMinusCircle />
            <p>
              Nova <br /> saída
            </p>
          </StyledLink>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
  color: ${(props) => (props.type === "entrada" ? "green" : "red")};
`;

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
