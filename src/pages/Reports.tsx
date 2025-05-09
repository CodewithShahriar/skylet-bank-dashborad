import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBankData } from '@/contexts/BankDataContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useMemo } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const COLORS = ['#1EAEDB', '#33C3F0', '#4CD964', '#FFA500', '#FF6347'];

const Reports = () => {
  const { transactions, getCurrentAccount } = useBankData();
  const account = getCurrentAccount();
  
  // Prepare data for monthly expenses bar chart
  const monthlyData = useMemo(() => {
    // Get last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        month: d.toLocaleString('default', { month: 'short' }),
        year: d.getFullYear(),
        timestamp: d.getTime()
      };
    }).reverse();
    
    // Group transactions by month
    return months.map(({ month, year, timestamp }) => {
      // Start and end of month
      const monthStart = new Date(timestamp);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthEnd = new Date(timestamp);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      monthEnd.setHours(23, 59, 59, 999);
      
      // Filter transactions in this month
      const monthlyTransactions = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate >= monthStart && txDate <= monthEnd;
      });
      
      // Calculate totals
      const sent = monthlyTransactions
        .filter(tx => tx.type === 'sent' || tx.type === 'payment')
        .reduce((sum, tx) => sum + tx.amount, 0);
        
      const received = monthlyTransactions
        .filter(tx => tx.type === 'received')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      return {
        name: `${month} ${year}`,
        Expenses: sent,
        Income: received,
      };
    });
  }, [transactions]);
  
  // Prepare data for transaction type pie chart
  const transactionTypeData = useMemo(() => {
    const typeCounts: Record<string, number> = {};
    
    transactions.forEach(tx => {
      typeCounts[tx.type] = (typeCounts[tx.type] || 0) + 1;
    });
    
    return Object.keys(typeCounts).map(type => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: typeCounts[type]
    }));
  }, [transactions]);
  
  // Prepare data for spending categories
  const spendingCategoriesData = useMemo(() => {
    // For demo purposes, we'll use transaction descriptions to simulate categories
    const categories: Record<string, number> = {
      'Bills': 0,
      'Transfers': 0,
      'Shopping': 0,
      'Food': 0,
      'Other': 0
    };
    
    // Categorize based on transaction description (simplified for demo)
    transactions
      .filter(tx => tx.type === 'sent' || tx.type === 'payment')
      .forEach(tx => {
        const desc = tx.description.toLowerCase();
        
        if (desc.includes('bill') || desc.includes('electricity') || desc.includes('water')) {
          categories['Bills'] += tx.amount;
        } else if (desc.includes('transfer')) {
          categories['Transfers'] += tx.amount;
        } else if (desc.includes('shop') || desc.includes('store')) {
          categories['Shopping'] += tx.amount;
        } else if (desc.includes('food') || desc.includes('restaurant')) {
          categories['Food'] += tx.amount;
        } else {
          categories['Other'] += tx.amount;
        }
      });
    
    return Object.keys(categories).map(category => ({
      name: category,
      value: categories[category]
    })).filter(item => item.value > 0); // Only include categories with values
  }, [transactions]);

  const formatCurrency = (value: number | string | undefined) => {
    if (value === undefined) return '';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `${account?.currency}${numValue.toFixed(2)}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Financial Reports</h1>
      
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="income">Income & Expenses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {account?.currency}{account?.balance.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {account?.currency}
                  {transactions
                    .filter(tx => {
                      const now = new Date();
                      const txDate = new Date(tx.date);
                      return (tx.type === 'sent' || tx.type === 'payment') && 
                        txDate.getMonth() === now.getMonth() && 
                        txDate.getFullYear() === now.getFullYear();
                    })
                    .reduce((sum, tx) => sum + tx.amount, 0)
                    .toFixed(2)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {account?.currency}
                  {transactions
                    .filter(tx => {
                      const now = new Date();
                      const txDate = new Date(tx.date);
                      return tx.type === 'received' && 
                        txDate.getMonth() === now.getMonth() && 
                        txDate.getFullYear() === now.getFullYear();
                    })
                    .reduce((sum, tx) => sum + tx.amount, 0)
                    .toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>
                Income and expenses for the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="Income" fill="#4CD964" />
                    <Bar dataKey="Expenses" fill="#1EAEDB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Sources</CardTitle>
                <CardDescription>
                  Breakdown of your income sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  {/* Placeholder for income sources chart */}
                  <p className="text-gray-500">
                    Income source data not available
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense Trends</CardTitle>
                <CardDescription>
                  Your expense trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Bar dataKey="Expenses" fill="#1EAEDB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                How your money is being spent across categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingCategoriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {spendingCategoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
