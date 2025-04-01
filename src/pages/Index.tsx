
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import FeatureCard from '@/components/landing/FeatureCard';
import { ArrowRight, PieChart, BarChart4, LineChart, Shield, CreditCard } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Manage Your Expenses <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              XpenseS helps you track, analyze, and optimize your spending in Nepali currency, giving you control over your financial future.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/placeholder.svg" 
              alt="Dashboard Preview" 
              className="max-w-md w-full shadow-xl rounded-lg border border-gray-200"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<CreditCard className="h-10 w-10 text-primary" />}
              title="Expense Tracking"
              description="Easily record and categorize all your expenses in Nepali currency."
            />
            <FeatureCard 
              icon={<PieChart className="h-10 w-10 text-primary" />}
              title="Visual Reports"
              description="Understand your spending habits with intuitive pie charts and graphs."
            />
            <FeatureCard 
              icon={<BarChart4 className="h-10 w-10 text-primary" />}
              title="Budget Management"
              description="Set budgets for different categories and track your progress."
            />
            <FeatureCard 
              icon={<LineChart className="h-10 w-10 text-primary" />}
              title="Trend Analysis"
              description="Analyze your spending trends over time to optimize your finances."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Secure Storage"
              description="Your financial data is always secure and private."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo />
              <p className="text-gray-600 text-sm mt-2">© 2023 XpenseS. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
