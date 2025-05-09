
import { useMemo, useState } from 'react';
import { useBankData } from '@/contexts/BankDataContext';
import { Copy, CreditCard as CreditCardIcon, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
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

interface BankCardProps {
  cardType: 'debit' | 'credit';
  className?: string;
}

const BankCard = ({ cardType, className }: BankCardProps) => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const formattedBalance = useMemo(() => {
    if (!account) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(cardType === 'credit' ? account.balance * 0.7 : account.balance);
  }, [account, cardType]);

  const cardNumber = cardType === 'credit' 
    ? '•••• •••• •••• 4365' 
    : '•••• •••• •••• 9703';
    
  const expiryDate = cardType === 'credit' 
    ? '06/32' 
    : '12/34';
  
  if (!account) return null;
  
  const copyAccountNumber = () => {
    navigator.clipboard.writeText(cardType === 'credit' ? '4365' : '9703');
    setCopied(true);
    toast({ 
      title: "Copied to clipboard",
      description: "Card number copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "relative overflow-hidden text-white p-6 rounded-xl shadow-lg w-full h-52",
      className
    )}>
      {cardType === 'debit' ? (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-purple-600 to-blue-700">
          {/* World Map Background Pattern */}
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
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-pink-700 to-red-700">
          {/* World Map Background Pattern */}
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
      )}
      
      {/* Card Background Elements - Geometric Patterns */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: cardType === 'debit' ? 3 : 5 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white" 
            style={{
              width: `${Math.random() * 100 + 50}px`, 
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.1
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Skylet Bank
          </span>
          <div className="flex">
            {cardType === 'debit' ? (
              <div className="text-white text-xl font-extrabold tracking-tighter">
                <span className="italic">VISA</span>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="h-6 w-6 bg-red-500 rounded-full opacity-90 -mr-2"></div>
                <div className="h-6 w-6 bg-yellow-500 rounded-full opacity-90"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <CardChip />
          <CardContactless />
        </div>
        
        <div className="my-4">
          <p className="text-white/70 mb-1 text-xs">Card number</p>
          <div className="flex items-center">
            <div className="font-mono text-lg font-bold tracking-wider">{cardNumber}</div>
            <button 
              className="ml-2 text-white/70 hover:text-white transition-colors"
              onClick={copyAccountNumber}
            >
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/70 mb-1 text-xs">Card holder</p>
            <p className="font-medium tracking-wide">{account.name}</p>
          </div>
          
          <div className="text-right">
            <p className="text-white/70 mb-1 text-xs">Expires</p>
            <p className="font-medium">{expiryDate}</p>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-6 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg">
          <span className="text-xs font-semibold">Balance</span>
          <p className="text-lg font-bold">${formattedBalance}</p>
        </div>
      </div>
    </div>
  );
};

const BankCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BankCard cardType="debit" />
      <BankCard cardType="credit" />
    </div>
  );
};

export default BankCards;
