import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const MFS_OPTIONS = [
  {
    name: 'bKash',
    img: 'https://freelogopng.com/images/all_img/1656227518bkash-logo-png.png', // bKash logo
  },
  {
    name: 'Rocket',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Rocket_mobile_banking_logo.svg/640px-Rocket_mobile_banking_logo.svg.png', // Rocket logo
  },
  {
    name: 'Nagad',
    img: 'https://freelogopng.com/images/all_img/1683082228nagad-transparent-logo.png', // Nagad logo
  },
  {
    name: 'Upay',
    img: 'https://crm.easytrax.com.bd/images/coa_logos/upay_logo.png', // Upay logo
  },
];

const MFSTransfer = () => {
  const [selectedMFS, setSelectedMFS] = useState('bKash');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transfer to ${selectedMFS} - ${accountNumber} (${accountName}) - ৳${amount}`);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">MFS Transfer</h1>

      {/* MFS Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {MFS_OPTIONS.map((mfs) => (
          <button
            key={mfs.name}
            className={`flex items-center justify-center py-4 rounded-lg shadow-md transition-transform duration-300 ${
              selectedMFS === mfs.name
                ? 'bg-gray-300' // Light gray for selected
                : 'bg-white hover:scale-105 hover:shadow-lg' // Hover effect for unselected
            }`}
            onClick={() => setSelectedMFS(mfs.name)}
          >
            {mfs.img && (
              <img
                src={mfs.img}
                alt={mfs.name}
                className="h-12 w-auto object-contain"
              />
            )}
          </button>
        ))}
      </div>

      {/* Transfer Form */}
      {selectedMFS && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedMFS} Transfer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="accountNumber">{selectedMFS} Account Number</Label>
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
