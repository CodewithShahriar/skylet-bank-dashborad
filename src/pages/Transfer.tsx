
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useBankData } from '@/contexts/BankDataContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Bank options for dropdown
const BANK_OPTIONS = [
  "Select Bank",
  "Skylet Bank",
  "Bangladesh Bank",
  "Sonali Bank",
  "Rupali Bank",
  "Janata Bank",
  "Agrani Bank",
  "Islami Bank",
  "Dutch-Bangla Bank",
  "BRAC Bank",
  "Eastern Bank",
  "City Bank",
];

const Transfer = () => {
  const [transferType, setTransferType] = useState<'BEFTN' | 'NPSB'>('BEFTN');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [receiverBank, setReceiverBank] = useState(BANK_OPTIONS[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { addTransaction, updateBalance, getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!receiverAccount || receiverBank === BANK_OPTIONS[0] || !amount || parseFloat(amount) <= 0) {
      return;
    }
    
    // Check if amount is greater than available balance
    if (account && parseFloat(amount) > account.balance) {
      // Handle insufficient funds
      return;
    }
    
    // Show confirmation dialog instead of immediately processing
    setShowConfirmation(true);
  };
  
  const processTransfer = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const amountValue = parseFloat(amount);
      
      // Add transaction
      addTransaction({
        amount: amountValue,
        type: 'sent',
        description: description || `${transferType} Transfer to ${receiverAccount}`,
        receiver: receiverAccount,
        receiverBank: receiverBank,
      });
      
      // Update account balance
      if (account) {
        updateBalance(account.id, -amountValue);
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form
      setReceiverAccount('');
      setReceiverBank(BANK_OPTIONS[0]);
      setAmount('');
      setDescription('');
    }, 1500);
  };
  
  const closeSuccessDialog = () => {
    setShowConfirmation(false);
    setIsSuccess(false);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Transfer Money</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Transfer Details</CardTitle>
          <CardDescription>
            Transfer money to another bank account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transfer Type Selector */}
            <div className="space-y-3">
              <Label>Transfer Type</Label>
              <RadioGroup 
                value={transferType} 
                onValueChange={(value) => setTransferType(value as 'BEFTN' | 'NPSB')} 
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BEFTN" id="beftn" />
                  <Label htmlFor="beftn" className="font-normal">BEFTN (Bank to Bank Transfer)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NPSB" id="npsb" />
                  <Label htmlFor="npsb" className="font-normal">NPSB (Inter-bank Instant Payment)</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Receiver Account */}
            <div className="space-y-3">
              <Label htmlFor="receiver-account">Receiver Account No</Label>
              <Input 
                id="receiver-account"
                value={receiverAccount}
                onChange={(e) => setReceiverAccount(e.target.value)}
                placeholder="Enter receiver's account number"
                required
              />
            </div>
            
            {/* Receiver Bank */}
            <div className="space-y-3">
              <Label htmlFor="receiver-bank">Receiver Bank Name</Label>
              <select
                id="receiver-bank"
                value={receiverBank}
                onChange={(e) => setReceiverBank(e.target.value)}
                className="form-input w-full"
                required
              >
                {BANK_OPTIONS.map((bank, index) => (
                  <option key={index} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            
            {/* Amount */}
            <div className="space-y-3">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  {account?.currency || '৳'}
                </span>
                <Input 
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              {account && (
                <p className="text-sm text-gray-500">
                  Available balance: {account.currency}{account.balance.toFixed(2)}
                </p>
              )}
            </div>
            
            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter transfer description"
              />
            </div>
            
            {/* Submit Button */}
            <Button type="submit" className="w-full skylet-button-primary">
              Submit Transfer Request
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSuccess ? "Transfer Successful" : "Confirm Transfer"}
            </DialogTitle>
            <DialogDescription>
              {isSuccess ? (
                <div className="flex flex-col items-center py-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <p>Your transfer has been processed successfully!</p>
                </div>
              ) : (
                <div className="py-4">
                  <p>Are you sure you want to transfer {account?.currency}{amount} to account {receiverAccount}?</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="font-medium">Transfer Type:</dt>
                      <dd>{transferType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Recipient Bank:</dt>
                      <dd>{receiverBank}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Amount:</dt>
                      <dd>{account?.currency}{parseFloat(amount).toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            {isSuccess ? (
              <Button onClick={closeSuccessDialog} className="skylet-button-primary">
                Back to Dashboard
              </Button>
            ) : (
              <div className="flex w-full flex-col sm:flex-row sm:justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={processTransfer} 
                  className="skylet-button-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Transfer"}
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transfer;
