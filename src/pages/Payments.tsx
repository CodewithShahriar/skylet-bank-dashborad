
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBankData } from '@/contexts/BankDataContext';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight, Receipt, Smartphone, CreditCard, BarChart, FileText, Wallet } from 'lucide-react';

const PaymentMethodCard = ({ 
  icon, 
  title, 
  description,
  accentColor = "bg-blue-100 text-blue-500" 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  accentColor?: string;
}) => {
  return (
    <Card className="border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-200">
      <CardContent className="p-5 flex items-center">
        <div className={`rounded-full p-3 mr-4 ${accentColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentHistoryItem = ({ 
  title, 
  amount, 
  date, 
  status, 
  icon 
}: { 
  title: string; 
  amount: number; 
  date: Date; 
  status: string; 
  icon: React.ReactNode 
}) => {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div className="flex items-center">
        <div className="bg-primary/10 rounded-full p-2 mr-3">
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-red-600">-${amount.toFixed(2)}</p>
        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
          {status}
        </span>
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <PaymentMethodCard
        icon={<Wallet size={20} />}
        title="Bank Transfer"
        description="Transfer between accounts"
        accentColor="bg-blue-100 text-blue-500"
      />
      <PaymentMethodCard
        icon={<CreditCard size={20} />}
        title="Card Payment"
        description="Pay with credit/debit card"
        accentColor="bg-green-100 text-green-500"
      />
      <PaymentMethodCard
        icon={<Receipt size={20} />}
        title="Bill Payment"
        description="Pay your utility bills"
        accentColor="bg-yellow-100 text-yellow-600"
      />
      <PaymentMethodCard
        icon={<Smartphone size={20} />}
        title="Mobile Recharge"
        description="Top up your mobile balance"
        accentColor="bg-purple-100 text-purple-500"
      />
      <PaymentMethodCard
        icon={<FileText size={20} />}
        title="Tax Payment"
        description="Pay your taxes online"
        accentColor="bg-red-100 text-red-500"
      />
      <PaymentMethodCard
        icon={<BarChart size={20} />}
        title="Investment"
        description="Invest in stocks and funds"
        accentColor="bg-indigo-100 text-indigo-500"
      />
    </div>
  );
};

const BillPaymentOptions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-medium">Electricity</h3>
          <p className="text-xs text-muted-foreground">Pay electricity bills</p>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
          <h3 className="font-medium">Water</h3>
          <p className="text-xs text-muted-foreground">Pay water bills</p>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L15 17" />
            </svg>
          </div>
          <h3 className="font-medium">Gas</h3>
          <p className="text-xs text-muted-foreground">Pay gas bills</p>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-medium">Internet</h3>
          <p className="text-xs text-muted-foreground">Pay internet bills</p>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
            </svg>
          </div>
          <h3 className="font-medium">Telephone</h3>
          <p className="text-xs text-muted-foreground">Pay telephone bills</p>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="font-medium">Rent</h3>
          <p className="text-xs text-muted-foreground">Pay rent</p>
        </div>
      </Card>
    </div>
  );
};

const MobileRechargeOptions = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <div className="text-blue-600 font-bold text-xl">GP</div>
          </div>
          <h3 className="font-medium">Grameenphone</h3>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-3">
            <div className="text-red-600 font-bold text-xl">Robi</div>
          </div>
          <h3 className="font-medium">Robi</h3>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-3">
            <div className="text-green-600 font-bold text-xl">BL</div>
          </div>
          <h3 className="font-medium">Banglalink</h3>
        </div>
      </Card>
      
      <Card className="p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-purple-50 rounded-full flex items-center justify-center mb-3">
            <div className="text-purple-600 font-bold text-xl">AT</div>
          </div>
          <h3 className="font-medium">Airtel</h3>
        </div>
      </Card>
    </div>
  );
};

const Payments = () => {
  const { transactions } = useBankData();
  
  // Filter transactions by type
  const paymentTransactions = transactions
    .filter(tx => tx.type === 'payment')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-skylet-blue via-skylet-light-blue to-skylet-green">
        Payments
      </h1>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b">
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Choose from different payment methods
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-6">
          <PaymentMethods />
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b">
          <CardTitle>Payment Categories</CardTitle>
          <CardDescription>
            View and manage different payment categories
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="bills">Bills</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="merchant">Merchant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto flex flex-col items-center py-6">
                  <Receipt className="h-8 w-8 mb-2 text-skylet-blue" />
                  <span>Utility Bills</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col items-center py-6">
                  <Smartphone className="h-8 w-8 mb-2 text-skylet-blue" />
                  <span>Mobile Recharge</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col items-center py-6">
                  <CreditCard className="h-8 w-8 mb-2 text-skylet-blue" />
                  <span>Card Payment</span>
                </Button>
                <Button variant="outline" className="h-auto flex flex-col items-center py-6">
                  <BarChart className="h-8 w-8 mb-2 text-skylet-blue" />
                  <span>Investments</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="bills">
              <BillPaymentOptions />
            </TabsContent>
            
            <TabsContent value="mobile">
              <MobileRechargeOptions />
            </TabsContent>
            
            <TabsContent value="merchant">
              <p className="text-center text-gray-500 py-8">
                No merchant payments found.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b">
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>
            Your recent payment history
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {paymentTransactions.length > 0 ? (
            <div className="space-y-2">
              {paymentTransactions.slice(0, 5).map((tx) => (
                <PaymentHistoryItem 
                  key={tx.id}
                  title={tx.description}
                  amount={tx.amount}
                  date={tx.date}
                  status={tx.status}
                  icon={<ArrowUpRight className="h-5 w-5 text-gray-600" />}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No payment history found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
