
import BankCards from '@/components/dashboard/BankCards';
import MonthlyOverview from '@/components/dashboard/MonthlyOverview';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionsList from '@/components/dashboard/TransactionsList';
import PromotionBanner from '@/components/dashboard/PromotionBanner';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800">
        Skylet Bank Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            {/* <h2 className="text-xl font-medium mb-4 text-gray-700">My Cards</h2> */}
            <BankCards />
          </div>
          
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-700">Monthly Overview</h2>
            <MonthlyOverview />
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-medium mb-4 text-gray-700">Quick Access</h2>
            <QuickActions />
          </div>
        </div>
        
        <div>
          <PromotionBanner />
          
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
  );
};

export default Dashboard;
