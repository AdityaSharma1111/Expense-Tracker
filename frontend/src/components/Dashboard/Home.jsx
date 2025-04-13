import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';
import { useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/ApiPaths.js';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import {
  DashboardLayout,
  InfoCard,
  RecentTransactions,
  FinanceOverview,
  ExpenseTransactions,
  Last30daysExpenses,
  IncomeTransactions,
  Last60daysIncomes,
} from '../index.js';

function Home() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      // console.log('Dashboard Data: ', res.data);

      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DashboardLayout activeMenu="Dashboard">
        <div className='my-5 mx-auto px-4'>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <InfoCard
              icon={<IoMdCard className="text-white text-xl" />}
              label="Total Balance"
              value={dashboardData?.totalBalance || 0}
              color="bg-indigo-600"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={dashboardData?.totalIncome || 0}
              color="bg-orange-500"
            />
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={dashboardData?.totalExpense || 0}
              color="bg-red-500"
            />
          </div>

          <div className='bg-white dark:bg-gray-900 p-5 rounded-xl shadow'>
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate('/expense')}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />

            <div className='bg-white dark:bg-gray-800 p-5 rounded-xl shadow mt-4'>
              <ExpenseTransactions
                transactions={dashboardData?.last30daysExpenses?.transactions || []}
                onSeeMore={() => navigate('/expense')}
              />

              <Last30daysExpenses
                data={dashboardData?.last30daysExpenses || []}
              />
            </div>

            <div className='bg-white dark:bg-gray-800 p-5 rounded-2xl shadow mt-4'>
              <IncomeTransactions
                transactions={dashboardData?.last60daysIncome?.transactions || []}
                onSeeMore={() => navigate('/income')}
              />
              <Last60daysIncomes 
                data={dashboardData?.last60daysIncome || []}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Home;
