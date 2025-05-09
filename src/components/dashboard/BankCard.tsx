import { useState, useMemo } from 'react';
import { useBankData } from '@/contexts/BankDataContext';

interface BankCardProps {
  cardType: 'debit' | 'credit';
}

const BankCard = ({ cardType }: BankCardProps) => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  const [showBalance, setShowBalance] = useState(false);

  const formattedBalance = useMemo(() => {
    if (!account) return '0.00';
    const balance = cardType === 'credit' ? account.balance * 0.7 : account.balance;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  }, [account, cardType]);

  if (!account) return null;

  const imageSrc = cardType === 'debit'
    ? '/images/debit-card.png'
    : '/images/credit-card.png';

  return (
    <div
      className="relative w-full h-52 rounded-xl overflow-hidden shadow-lg cursor-pointer"
      onClick={() => setShowBalance(!showBalance)}
    >
      {/* Card Image */}
      <img
        src={imageSrc}
        alt={`${cardType} Card`}
        className={`w-full h-full object-cover transition-all duration-300 ${
          showBalance ? 'blur-sm brightness-75' : ''
        }`}
      />

      {/* Overlay for Balance */}
      {showBalance && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg text-center">
            <p className="text-gray-700 text-sm font-semibold">Balance</p>
            <h2 className="text-xl font-bold text-gray-900">${formattedBalance}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankCard;
