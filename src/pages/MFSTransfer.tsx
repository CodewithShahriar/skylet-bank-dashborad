import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Banknote, Rocket, DollarSign, CreditCard } from 'lucide-react'; // Replace with actual icons

const MFS_OPTIONS = [
  { name: 'bKash', icon: <Banknote className="w-6 h-6" /> },
  { name: 'Rocket', icon: <Rocket className="w-6 h-6" /> },
  { name: 'Nagad', icon: <DollarSign className="w-6 h-6" /> },
  { name: 'Upay', icon: <CreditCard className="w-6 h-6" /> },
];

const MFSTransfer = () => {
  const [selectedMFS, setSelectedMFS] = useState('bKash');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add submission logic here (validate & process)
    alert(`Transfer to ${selectedMFS} - ${accountNumber} (${accountName}) - $${amount}`);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">MFS Transfer</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {MFS_OPTIONS.map((mfs) => (
          <Button
            key={mfs.name}
            variant={selectedMFS === mfs.name ? 'default' : 'outline'}
            className="flex flex-col items-center py-4"
            onClick={() => setSelectedMFS(mfs.name)}
          >
            {mfs.icon}
            <span className="mt-2">{mfs.name}</span>
          </Button>
        ))}
      </div>

      {selectedMFS === 'bKash' && (
        <Card>
          <CardHeader>
            <CardTitle>bKash Transfer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="accountNumber">bKash Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input
                  id="accountName"
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
              <Button type="submit" className="skylet-button-primary w-full">
                Submit Transfer
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MFSTransfer;
