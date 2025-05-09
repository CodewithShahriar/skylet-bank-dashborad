import { useBankData } from '@/contexts/BankDataContext';

const BankCards = () => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();

  if (!account) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <img
        src="https://i.ibb.co.com/Z6tBMxJR/Whats-App-Image-2025-05-09-at-19-39-46-13ba0ebe.jpg"
        alt="Debit Card"
        className="w-full h-57 rounded-xl object-cover shadow-md"
      />
      <img
        src="https://i.ibb.co.com/kVbjXQrh/Whats-App-Image-2025-05-09-at-19-39-45-6ae55998.jpg"
        alt="Credit Card"
        className="w-full h-57 rounded-xl object-cover shadow-md"
      />
    </div>
  );
};

export default BankCards;
