
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, BarChart3, TrendingUp, Plus } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Link } from 'react-router-dom';
import ExpensePieChart from '@/components/dashboard/ExpensePieChart';
import ExpenseBarChart from '@/components/dashboard/ExpenseBarChart';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import { mockExpenseData } from '@/data/mockData';

const Dashboard = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [expenseTrend, setExpenseTrend] = useState(0);

  useEffect(() => {
    // Calculate totals from mock data
    const total = mockExpenseData.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpense(total);

    // Current month expenses (assuming mockData has current month entries)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthExpenses = mockExpenseData.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
    const monthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setCurrentMonthExpense(monthTotal);

    // Calculate trend (positive or negative)
    const lastMonthExpenses = mockExpenseData.filter(expense => {
      const expenseDate = new Date(expense.date);
      let lastMonth = currentMonth - 1;
      let year = currentYear;
      if (lastMonth < 0) {
        lastMonth = 11;
        year = currentYear - 1;
      }
      return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === year;
    });
    const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const trend = lastMonthTotal > 0 
      ? ((monthTotal - lastMonthTotal) / lastMonthTotal) * 100 
      : 0;
    
    setExpenseTrend(trend);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Button asChild>
            <Link to="/add-expense">
              <Plus className="mr-2 h-4 w-4" /> Add New Expense
            </Link>
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">रू {totalExpense.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">रू {currentMonthExpense.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current month expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${expenseTrend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {expenseTrend > 0 ? '+' : ''}{expenseTrend.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {expenseTrend > 0 ? 'Increased spending' : 'Decreased spending'} from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts and Tables */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Your spending by category</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ExpensePieChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Weekly Expenses</CardTitle>
              <CardDescription>Your spending for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseBarChart />
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentExpenses />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
