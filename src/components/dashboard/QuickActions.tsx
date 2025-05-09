
import { Send, ArrowDown, Banknote, Receipt, CreditCard, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  color: string;
  bgColor: string;
}

const QuickAction = ({ icon, label, to, color, bgColor }: QuickActionProps) => (
  <Link 
    to={to}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
  >
    <div className={`p-3 rounded-full mb-3 ${bgColor} ${color}`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </Link>
);

const QuickActions = () => {
  const actions = [
    {
      icon: <Send className="h-6 w-6" />,
      label: "Transfer",
      to: "/dashboard/transfer",
      color: "text-white",
      bgColor: "bg-blue-500",
    },
    {
      icon: <ArrowDown className="h-6 w-6" />,
      label: "Withdraw",
      to: "/dashboard/withdraw",
      color: "text-white",
      bgColor: "bg-cyan-500",
    },
    {
      icon: <Banknote className="h-6 w-6" />,
      label: "Payment",
      to: "/dashboard/payment",
      color: "text-white",
      bgColor: "bg-green-500",
    },
    {
      icon: <Receipt className="h-6 w-6" />,
      label: "Pay Bill",
      to: "/dashboard/bills",
      color: "text-white",
      bgColor: "bg-amber-500",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      label: "Cards",
      to: "/dashboard/cards",
      color: "text-white",
      bgColor: "bg-pink-500",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      label: "Mobile Top-up",
      to: "/dashboard/topup",
      color: "text-white",
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {actions.map((action, index) => (
        <QuickAction key={index} {...action} />
      ))}
    </div>
  );
};

export default QuickActions;
