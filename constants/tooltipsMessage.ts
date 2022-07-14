export const TOOLTIPS_MESSAGE: { [key: string]: string } = {
  mintable: `Privileged accounts will be able to create more supply.`,
  burnable: `Token holders will be able to destroy their tokens.`,
  pausable: `Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.`,
  permit: `Without paying gas, token mi holders will be able to allow third parties to transfer from their account. EIP is still Draft and may change.`,
  votes: `Keeps track of historical balances for voting in on-chain governance, with a way to delegate one's voting power to a trusted account.`,
  flashminting: `Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction.`,
  snapshots: `Privileged accounts will be able to store snapshots of balances that can be retrieved later. For on-chain voting, the Votes option is preferable.`,
};
