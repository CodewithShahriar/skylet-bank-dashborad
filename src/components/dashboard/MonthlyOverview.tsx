import { useMemo } from 'react';
import { useBankData } from '@/contexts/BankDataContext';
import { Card, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  TooltipProps,
} from 'recharts';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const MonthlyOverview = () => {
  const { transactions, getCurrentAccount } = useBankData();
  const account = getCurrentAccount();

  // Generate monthly data
  const monthlyData = useMemo(() => {
    const initialTemplate = [
      { name: 'Week 1', income: 1000, expense: 3000 },
      { name: 'Week 2', income: 5003, expense: 4000 },
      { name: 'Week 3', income: 2500, expense: 2000 },
      { name: 'Week 4', income: 5000, expense: 2000 },
    ];

    const weeklyData = JSON.parse(JSON.stringify(initialTemplate));

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
        const dayOfMonth = txDate.getDate();
        let weekIndex = 0;

        if (dayOfMonth <= 7) weekIndex = 0;
        else if (dayOfMonth <= 14) weekIndex = 1;
        else if (dayOfMonth <= 21) weekIndex = 2;
        else weekIndex = 3;

        if (tx.type === 'received') {
          weeklyData[weekIndex].income += tx.amount;
        } else if (tx.type === 'sent' || tx.type === 'payment') {
          weeklyData[weekIndex].expense += tx.amount;
        }
      }
    });

    return {
      weeklyData,
      totalIncome: weeklyData.reduce((sum, week) => sum + week.income, 0),
      totalExpense: weeklyData.reduce((sum, week) => sum + week.expense, 0),
    };
  }, [transactions]);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  const currencySymbol = account?.currency || '$';

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-gray-700">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value as number)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Income Card */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Income</span>
                <span className="text-2xl font-bold text-green-600">
                  {currencySymbol}{monthlyData.totalIncome.toLocaleString()}
                </span>
              </div>
              <span className="text-sm text-gray-500">{currentMonth} {currentYear}</span>
            </div>

            <div className="h-48 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData.weeklyData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="income" name="Income" fill="#4CD964" radius={[4, 4, 0, 0]}>
                    {monthlyData.weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`rgba(76, 217, 100, ${0.6 + (index * 0.1)})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Spending</span>
                <span className="text-2xl font-bold text-red-500">
                  {currencySymbol}{monthlyData.totalExpense.toLocaleString()}
                </span>
              </div>
              <span className="text-sm text-gray-500">{currentMonth} {currentYear}</span>
            </div>

            <div className="h-48 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData.weeklyData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="expense" name="Expense" fill="#FF3B30" radius={[4, 4, 0, 0]}>
                    {monthlyData.weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`rgba(255, 59, 48, ${0.6 + (index * 0.1)})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyOverview;
