import BankCards from '@/components/dashboard/BankCards';
import MonthlyOverview from '@/components/dashboard/MonthlyOverview';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionsList from '@/components/dashboard/TransactionsList';
import { useBankData } from '@/contexts/BankDataContext';

const Dashboard = () => {
  const { getCurrentAccount } = useBankData();
  const account = getCurrentAccount();

  const totalBalance = account?.balance
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(account.balance)
    : '$0.00';

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: 'linear-gradient(to bottom right, #f0f4ff, #e0f7fa, #f3e5f5)',
      }}
    >
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold flex items-center justify-between">
          <span className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-transparent bg-clip-text">
            SKYLET BANK LTD Dashboard
          </span>
          <span className="text-lg font-bold text-gray-600 flex items-center">
            Total Balance: {totalBalance}
            <span className="ml-2 h-3 w-3 bg-green-700 rounded-full animate-ping"></span>
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <BankCards />
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-4 text-gray-700">Monthly Overview</h2>
              <MonthlyOverview />
            </div>
          </div>
          
          {/* Quick Access Options */}
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-700">Quick Access</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
                Transfer Money
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-700 text-white font-medium py-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
                Withdraw
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
                Mobile Topup
              </button>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-medium py-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
                Add Funds
              </button>
            </div>

            {/* Transactions Section */}
            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-700">My Transactions</h2>
                <a href="/dashboard/history" className="text-sm text-blue-600 hover:underline">
                  View All
                </a>
              </div>
              
              <TransactionsList limit={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
