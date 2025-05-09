
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define transaction type
export type Transaction = {
  id: string;
  amount: number;
  type: 'sent' | 'received' | 'payment' | 'withdrawal' | 'deposit';
  date: Date;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  receiver?: string;
  receiverBank?: string;
};

// Define account type
export type Account = {
  id: string;
  name: string;
  accountNo: string;
  cardType: 'visa' | 'mastercard';
  balance: number;
  currency: string;
};

// Define bank context type
type BankDataContextType = {
  accounts: Account[];
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => void;
  getRecentTransactions: (count: number) => Transaction[];
  updateBalance: (accountId: string, amount: number) => void;
  getCurrentAccount: () => Account | undefined;
  isLoading: boolean;
};

// Create the context
const BankDataContext = createContext<BankDataContextType | undefined>(undefined);

// Sample initial data
const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc1',
    name: 'Test User',
    accountNo: '4012 XXXX XXXX 9081',
    cardType: 'visa',
    balance: 15000.00,
    currency: '৳',
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx1',
    amount: 1200.00,
    type: 'received',
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
    description: 'Salary Deposit',
    status: 'completed',
  },
  {
    id: 'tx2',
    amount: 350.50,
    type: 'sent',
    date: new Date(Date.now() - 86400000 * 4), // 4 days ago
    description: 'Electricity Bill',
    status: 'completed',
    receiver: 'DESCO',
  },
  {
    id: 'tx3',
    amount: 500.00,
    type: 'payment',
    date: new Date(Date.now() - 86400000 * 7), // 1 week ago
    description: 'Mobile Recharge',
    status: 'completed',
  },
  {
    id: 'tx4',
    amount: 2000.00,
    type: 'sent',
    date: new Date(Date.now() - 86400000 * 10), // 10 days ago
    description: 'Rent Payment',
    status: 'completed',
    receiver: 'Landlord',
  },
  {
    id: 'tx5',
    amount: 800.00,
    type: 'payment',
    date: new Date(Date.now() - 86400000 * 15), // 15 days ago
    description: 'Internet Bill',
    status: 'completed',
  },
];

export const BankDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on init
  useEffect(() => {
    const storedAccounts = localStorage.getItem('skylet_accounts');
    const storedTransactions = localStorage.getItem('skylet_transactions');
    
    if (storedAccounts) {
      try {
        setAccounts(JSON.parse(storedAccounts));
      } catch (error) {
        // Handle parsing error
      }
    }
    
    if (storedTransactions) {
      try {
        // Parse the dates back to Date objects
        const parsedTransactions = JSON.parse(storedTransactions);
        const transactionsWithDates = parsedTransactions.map((tx: any) => ({
          ...tx,
          date: new Date(tx.date),
        }));
        setTransactions(transactionsWithDates);
      } catch (error) {
        // Handle parsing error
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('skylet_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('skylet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    setIsLoading(true);
    
    // Create new transaction with generated ID
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx${Date.now()}`,
      date: new Date(),
      status: 'completed',
    };

    // Add to transactions list
    setTransactions(prev => [newTransaction, ...prev]);

    // Show toast notification
    toast({
      title: "Transaction Successful",
      description: `${transaction.type === 'sent' ? 'Sent' : 'Received'} ${accounts[0].currency}${transaction.amount.toFixed(2)}`,
    });

    setIsLoading(false);
    return newTransaction;
  };

  // Get recent transactions
  const getRecentTransactions = (count: number) => {
    return [...transactions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, count);
  };

  // Update account balance
  const updateBalance = (accountId: string, amount: number) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, balance: account.balance + amount } 
          : account
      )
    );
  };

  // Get the current primary account
  const getCurrentAccount = () => {
    return accounts[0];
  };

  return (
    <BankDataContext.Provider
      value={{
        accounts,
        transactions,
        addTransaction,
        getRecentTransactions,
        updateBalance,
        getCurrentAccount,
        isLoading
      }}
    >
      {children}
    </BankDataContext.Provider>
  );
};

// Custom hook to use bank data context
export const useBankData = () => {
  const context = useContext(BankDataContext);
  if (context === undefined) {
    throw new Error('useBankData must be used within a BankDataProvider');
  }
  return context;
};
