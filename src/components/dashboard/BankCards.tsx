import BankCard from './BankCard';

const BankCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BankCard />
      <BankCard />
    </div>
  );
};

export default BankCards;
