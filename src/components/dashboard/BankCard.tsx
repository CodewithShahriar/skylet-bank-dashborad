import { useBankData } from '@/contexts/BankDataContext';

const BankCard = () => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();

  if (!account) return null;

  const imageSrc = account.cardType === 'visa'
    ? 'https://i.ibb.co.com/Z6tBMxJR/Whats-App-Image-2025-05-09-at-19-39-46-13ba0ebe.jpg'
    : 'https://i.ibb.co.com/LDjm1nqC/Whats-App-Image-2025-05-09-at-19-39-45-6ae55998.jpg';

  return (
    <div className="w-full h-52 rounded-xl overflow-hidden shadow-lg">
      <img
        src={imageSrc}
        alt="Bank Card"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default BankCard;
