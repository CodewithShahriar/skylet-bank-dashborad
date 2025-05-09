
import { useMemo } from 'react';
import { useBankData, Transaction } from '@/contexts/BankDataContext';
import { ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface TransactionsListProps {
  limit?: number;
}

const TransactionsList = ({ limit }: TransactionsListProps) => {
  const { getRecentTransactions } = useBankData();
  const transactions = useMemo(() => getRecentTransactions(limit || 5), [getRecentTransactions, limit]);
  
  if (transactions.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  
  const icon = useMemo(() => {
    switch (transaction.type) {
      case 'received':
        return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
      case 'sent':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      default:
        return <CreditCard className="h-5 w-5 text-blue-500" />;
    }
  }, [transaction.type]);
  
  const amountClass = useMemo(() => {
    switch (transaction.type) {
      case 'received':
        return 'text-green-600';
      case 'sent':
      case 'payment':
      case 'withdrawal':
        return 'text-red-600';
      default:
        return 'text-gray-900';
    }
  }, [transaction.type]);
  
  const amountPrefix = useMemo(() => {
    switch (transaction.type) {
      case 'received':
        return '+';
      case 'sent':
      case 'payment':
      case 'withdrawal':
        return '-';
      default:
        return '';
    }
  }, [transaction.type]);
  
  const formattedDate = useMemo(() => {
    return formatDistanceToNow(new Date(transaction.date), { addSuffix: true });
  }, [transaction.date]);

  return (
    <div className="transaction-item">
      <div className="flex items-center">
        <div className={cn(
          "flex items-center justify-center rounded-full p-2 mr-3",
          transaction.type === 'received' ? "bg-green-100" : 
          transaction.type === 'sent' ? "bg-red-100" : "bg-blue-100"
        )}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{transaction.description}</h4>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("font-medium", amountClass)}>
          {amountPrefix}{account?.currency}{transaction.amount.toFixed(2)}
        </p>
        <span className={cn(
          "text-xs px-2 py-1 rounded",
          transaction.status === 'completed' ? "bg-green-100 text-green-800" :
          transaction.status === 'pending' ? "bg-yellow-100 text-yellow-800" : 
          "bg-red-100 text-red-800"
        )}>
          {transaction.status}
        </span>
      </div>
    </div>
  );
};

export default TransactionsList;
