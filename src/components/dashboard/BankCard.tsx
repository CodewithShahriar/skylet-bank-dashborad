import { useBankData } from '@/contexts/BankDataContext';
import { useToast } from "@/components/ui/use-toast";
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BankCard = () => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  const { toast } = useToast();

  if (!account) return null;

  const copyAccountNumber = () => {
    const accountNumber = account.accountNo.replace(/\s/g, '');
    navigator.clipboard.writeText(accountNumber);
    toast({
      title: "Copied to clipboard",
      description: "Account number copied to clipboard",
    });
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <img
        src="https://i.ibb.co.com/Z6tBMxJR/Whats-App-Image-2025-05-09-at-19-39-46-13ba0ebe.jpg" // Replace with your actual card image path
        alt="Bank Card"
        className="w-full rounded-xl shadow-lg"
      />
      {/* <div className="absolute bottom-6 left-6 text-white">
        <p className="text-xs opacity-80">Account Holder</p>
        <h3 className="text-lg font-bold">{account.name}</h3>
        <p className="text-xs mt-1 opacity-80">Account No.</p>
        <div className="flex items-center">
          <p className="text-base font-mono">{account.accountNo}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAccountNumber}
            className="ml-2 p-1 text-white hover:bg-white/10"
          >
            <Copy size={14} />
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default BankCard;
