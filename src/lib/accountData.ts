/**
 * Centralized account details for the entire application
 * All payment and withdrawal account information is managed here
 */

export interface AccountInfo {
  id: string;
  type: "payment" | "withdrawal";
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
}

export const ACCOUNT_DATA: AccountInfo[] = [
  {
    id: "buying-zfc",
    type: "payment",
    bankName: "Kuda.",
    accountNumber: "2086258173",
    accountName: "Faith Wali",
    amount: 5700,
    description: "Account for buying ZFC",
  },
  {
    id: "withdrawal",
    type: "withdrawal",
    bankName: "Kuda.",
    accountNumber: "2086258173",
    accountName: "Faith Wali",
    amount: 8000,
    description: "Account for withdrawal activation",
  },
];

/**
 * Get account information by type
 */
export const getAccountByType = (type: "payment" | "withdrawal"): AccountInfo | undefined => {
  return ACCOUNT_DATA.find((account) => account.type === type);
};

/**
 * Get all payment accounts
 */
export const getPaymentAccounts = (): AccountInfo[] => {
  return ACCOUNT_DATA.filter((account) => account.type === "payment");
};

/**
 * Get all withdrawal accounts
 */
export const getWithdrawalAccounts = (): AccountInfo[] => {
  return ACCOUNT_DATA.filter((account) => account.type === "withdrawal");
};

/**
 * Get account by ID
 */
export const getAccountById = (id: string): AccountInfo | undefined => {
  return ACCOUNT_DATA.find((account) => account.id === id);
};
