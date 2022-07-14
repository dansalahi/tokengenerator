export const CHECKBOXES_MESSAGE: { [key: string]: string } = {
  mintable: `enabling the token issuer to “mint” more tokens whenever they want. There is hard cap to set the maximum amount of tokens that will exist.`,
  burnable: `Extension of ERC20 that allows token holders to destroy both their own tokens and those that they have an allowance for, in a way that can be recognized off-chain.`,
  pausable: `Contract module which allows children to implement an emergency stop mechanism that can be triggered by an authorized account. This module is used through inheritance. It will make available the modifiers whenNotPaused and whenPaused, which can be applied to the functions of your contract. Note that they will not be pausable by simply including this module, only once the modifiers are put in place.`,
  permit: `Implementation of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in EIP-2612. Adds the permit method, which can be used to change an account’s ERC20 allowance by presenting a message signed by the account. By not relying on IERC20.approve, the token holder account doesn’t need to send a transaction, and thus is not required to hold Ether at all.the owner.`,
  votes: `Extension of ERC20 to support Compound-like voting and delegation. This version is more generic than Compound’s, and supports token supply up to 2224 - 1, while COMP is limited to 296 - 1.`,
  flashminting: `Implementation of the ERC3156 Flash loans extension, as defined in ERC-3156.Adds the flash loan method, which provides flash loan support at the token level. By default there is no fee, but this can be changed by overriding Flash Fee.`,
  snapshots: `When a snapshot is created, the balances and total supply at the time are recorded for later access. This can be used to safely create mechanisms based on token balances such as trustless dividends or weighted voting.`,
};