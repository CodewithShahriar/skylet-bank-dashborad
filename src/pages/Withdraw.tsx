import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBankData } from '@/contexts/BankDataContext';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateBalance, addTransaction, getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0 || !accountNo) return;
    if (account && parseFloat(amount) > account.balance) return;
    setShowConfirmation(true);
  };

  const processWithdraw = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const amountValue = parseFloat(amount);

      // Add transaction
      addTransaction({
        amount: amountValue,
        type: 'withdraw',
        description: description || `Withdrawal to ${accountNo}`,
        receiver: accountNo,
        receiverBank: account?.bankName || 'Skylet Bank',
      });

      // Update balance
      if (account) {
        updateBalance(account.id, -amountValue);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setAmount('');
      setAccountNo('');
      setDescription('');
    }, 1500);
  };

  const closeDialog = () => {
    setIsSuccess(false);
    setShowConfirmation(false);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Withdraw Funds</h1>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Form</CardTitle>
          <CardDescription>Withdraw money from your Skylet Bank account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="account-no">Withdrawal Account No</Label>
              <Input
                id="account-no"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="Enter recipient account number"
                required
              />
            </div>

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

            <div className="space-y-3">
              <Label htmlFor="description">Note (Optional)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a note for this withdrawal"
              />
            </div>

            <Button type="submit" className="w-full skylet-button-primary">
              Submit Withdrawal Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSuccess ? 'Withdrawal Successful' : 'Confirm Withdrawal'}
            </DialogTitle>
            <DialogDescription>
              {isSuccess ? (
                <div className="flex flex-col items-center py-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <p>Your withdrawal has been processed.</p>
                </div>
              ) : (
                <div className="py-4">
                  <p>Withdraw {account?.currency}{amount} to account {accountNo}?</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="font-medium">Account:</dt>
                      <dd>{accountNo}</dd>
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
              <Button onClick={closeDialog} className="skylet-button-primary">
                Back to Dashboard
              </Button>
            ) : (
              <div className="flex w-full flex-col sm:flex-row sm:justify-end gap-3">
                <Button variant="outline" onClick={() => setShowConfirmation(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button onClick={processWithdraw} className="skylet-button-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Confirm Withdrawal'}
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Withdraw;
