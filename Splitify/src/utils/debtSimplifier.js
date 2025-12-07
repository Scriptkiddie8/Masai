function simplifyDebts(netBalances) {
  const creditors = [];
  const debtors = [];

  Object.entries(netBalances).forEach(([userId, amount]) => {
    if (amount > 0) creditors.push({ userId, amount });
    else if (amount < 0) debtors.push({ userId, amount: -amount });
  });

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const settlements = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const payAmount = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      fromUserId: debtor.userId,
      toUserId: creditor.userId,
      amount: payAmount,
    });

    debtor.amount -= payAmount;
    creditor.amount -= payAmount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return settlements;
}

module.exports = { simplifyDebts };
