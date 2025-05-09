import { useMemo } from 'react';
import { useBankData } from '@/contexts/BankDataContext';

interface CardProps {
  imageUrl: string;
  cardType: 'debit' | 'credit';
}

const Card = ({ imageUrl, cardType }: CardProps) => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();

  const formattedBalance = useMemo(() => {
    if (!account) return '0.00';
    const balance = cardType === 'credit' ? account.balance * 0.7 : account.balance;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  }, [account, cardType]);

  if (!account) return null;

  return (
    <div className="relative w-full h-57 rounded-xl overflow-hidden shadow-md group">
      {/* Card image */}
      <img
        src={imageUrl}
        alt={`${cardType} Card`}
        className="w-full h-full object-cover transition duration-300 group-hover:blur-sm group-hover:brightness-75"
      />

      {/* Hover balance overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-lg shadow-lg text-center">
          <p className="text-gray-700 text-sm font-semibold">Balance</p>
          <h2 className="text-xl font-bold text-gray-900">${formattedBalance}</h2>
        </div>
      </div>
    </div>
  );
};

const BankCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        imageUrl="https://i.ibb.co.com/Z6tBMxJR/Whats-App-Image-2025-05-09-at-19-39-46-13ba0ebe.jpg"
        cardType="debit"
      />
      <Card
        imageUrl="https://i.ibb.co.com/kVbjXQrh/Whats-App-Image-2025-05-09-at-19-39-45-6ae55998.jpg"
        cardType="credit"
      />
    </div>
  );
};

export default BankCards;
