
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Check, Smartphone } from 'lucide-react';

interface Operator {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const MobileTopup = () => {
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { toast } = useToast();
  
  const operators: Operator[] = [
    { 
      id: 'grameenphone', 
      name: 'Grameenphone', 
      logo: '📱', // Replace with actual logo path if available
      color: 'bg-red-500'
    },
    { 
      id: 'banglalink', 
      name: 'Banglalink', 
      logo: '📱',
      color: 'bg-orange-500'
    },
    { 
      id: 'robi', 
      name: 'Robi', 
      logo: '📱',
      color: 'bg-purple-600'
    },
    { 
      id: 'airtel', 
      name: 'Airtel', 
      logo: '📱',
      color: 'bg-red-600'
    },
  ];
  
  const quickAmounts = [50, 100, 200, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOperator || !mobileNumber || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (mobileNumber.length !== 11) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 11 digit mobile number.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      
      toast({
        title: "Recharge Successful!",
        description: `You have successfully recharged ${amount} to ${mobileNumber}`,
      });
      
      // Reset form after a delay
      setTimeout(() => {
        setSuccess(false);
        setSelectedOperator(null);
        setMobileNumber('');
        setAmount('');
      }, 3000);
      
    }, 1500);
  };
  
  return (
    <div className="container mx-auto max-w-2xl pt-6 pb-10">
      <h1 className="text-2xl font-bold mb-6">Mobile Top-up</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="mr-2" /> Mobile Recharge
          </CardTitle>
          <CardDescription>
            Recharge any mobile number with ease
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Select Operator</h3>
                <RadioGroup 
                  value={selectedOperator || ''} 
                  onValueChange={setSelectedOperator}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {operators.map((operator) => (
                    <div key={operator.id}>
                      <RadioGroupItem 
                        value={operator.id} 
                        id={operator.id} 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor={operator.id}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className={`w-10 h-10 rounded-full ${operator.color} flex items-center justify-center text-white mb-2`}>
                          {operator.logo}
                        </div>
                        <span className="text-sm">{operator.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  placeholder="Enter 11 digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={11}
                  disabled={isProcessing || success}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Amount</Label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {quickAmounts.map((amt) => (
                    <Button 
                      key={amt} 
                      type="button"
                      variant={amount === amt.toString() ? "default" : "outline"}
                      onClick={() => setAmount(amt.toString())}
                      disabled={isProcessing || success}
                    >
                      ৳{amt}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isProcessing || success}
                />
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            disabled={isProcessing || success || !selectedOperator || !mobileNumber || !amount}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 
             success ? <span className="flex items-center"><Check className="mr-2" /> Recharge Successful</span> : 
             'Recharge Now'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MobileTopup;
