
import { useMemo } from 'react';
import { useBankData } from '@/contexts/BankDataContext';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const CardChip = () => (
  <div className="h-6 w-9 bg-yellow-200/80 rounded-md grid grid-cols-3 grid-rows-3 gap-px p-px">
    {Array(9).fill(0).map((_, i) => (
      <div key={i} className="bg-yellow-300/90" />
    ))}
  </div>
);

const CardContactless = () => (
  <div className="h-5 w-5 ml-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  </div>
);

const BankCard = () => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  const { toast } = useToast();
  
  const formattedBalance = useMemo(() => {
    if (!account) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(account.balance);
  }, [account]);
  
  if (!account) return null;
  
  const copyAccountNumber = () => {
    const accountNumber = account.accountNo.replace(/\s/g, '');
    navigator.clipboard.writeText(accountNumber);
    toast({ 
      title: "Copied to clipboard",
      description: "Account number copied to clipboard"
    });
  };

  return (
    <div className="relative overflow-hidden text-white p-6 rounded-xl shadow-lg w-full">
      {/* Background with world map pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M200,100 Q400,50 600,100 T1000,100 T1400,100 T1800,100 T2200,100 V500 H0 V100 Q200,150 400,100 T800,100 T1200,100 T1600,100 T2000,100" fill="white" fillOpacity="0.05" />
            <path d="M100,200 Q300,150 500,200 T900,200 T1300,200 T1700,200 T2100,200 V500 H0 V200 Q100,250 300,200 T700,200 T1100,200 T1500,200 T1900,200" fill="white" fillOpacity="0.05" />
            <circle cx="200" cy="150" r="100" fill="white" fillOpacity="0.03" />
            <circle cx="500" cy="250" r="120" fill="white" fillOpacity="0.04" />
            <circle cx="700" cy="350" r="80" fill="white" fillOpacity="0.03" />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/70 mb-1 text-xs">Account Name</p>
            <h3 className="text-lg font-medium">{account.name}</h3>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl uppercase tracking-wider">
              {account.cardType === 'visa' ? 'VISA' : 'MASTERCARD'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <CardChip />
          <CardContactless />
        </div>
        
        <div className="mt-6">
          <p className="text-white/70 mb-1 text-xs">Account Number</p>
          <div className="flex items-center">
            <h3 className="text-lg font-medium">{account.accountNo}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAccountNumber}
              className="ml-2 p-1 text-white hover:bg-white/10"
            >
              <Copy size={14} />
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg">
          <span className="text-xs font-semibold">Balance</span>
          <h2 className="text-2xl font-bold flex items-baseline">
            <span className="mr-1">{account.currency}</span>
            {formattedBalance}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
