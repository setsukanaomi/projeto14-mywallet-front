import { useContext } from "react";
import { Context } from "../contexts/Context";
import styled from "styled-components";

export default function Balance() {
  const { transactions } = useContext(Context);

  const calculateBalance = () => {
    let balance = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "entrada") {
        balance += transaction.value;
      } else if (transaction.type === "saida") {
        balance -= transaction.value;
      }
    });
    return balance;
  };

  const formatBalance = (balance) => {
    const formattedBalance = balance.toFixed(2).replace(".", ",");

    if (balance < 0) {
      return formattedBalance.substring(1);
    }

    return formattedBalance;
  };

  return (
    <BalanceDiv color={calculateBalance() >= 0 ? "positivo" : "negativo"}>
      {formatBalance(calculateBalance())}
    </BalanceDiv>
  );
}

const BalanceDiv = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
