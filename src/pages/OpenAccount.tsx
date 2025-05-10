import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountOpeningForm from "@/components/account/AccountOpeningForm";

const OpenAccount = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-green-500 to-purple-900">
              Skylet Bank Ltd
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-3">Open a New Account</h2>
            <p className="text-gray-600 mt-2 max-w-lg mx-auto">
              Complete the form below to apply for a new bank account. The process takes 
              about 5-10 minutes, and we'll guide you through every step.
            </p>
          </div>
        </div>
        
        <AccountOpeningForm />
        
        <div className="text-center mt-12 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Skylet Bank. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default OpenAccount;