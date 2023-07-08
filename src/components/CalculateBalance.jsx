export const calculateBalance = () => {
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

export const formatBalance = (balance) => {
  const formattedBalance = balance.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (balance < 0) {
    return formattedBalance.substring(1);
  }

  return formattedBalance;
};
