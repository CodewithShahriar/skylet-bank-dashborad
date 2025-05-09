
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 rounded-xl p-4 text-white shadow-md overflow-hidden relative mb-4">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-20 h-20 -ml-6 -mb-6 bg-white/10 rounded-full" />
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-1">Special Offer</h3>
        <p className="text-sm text-white/80 mb-3">
          Apply for a new credit card and get 5% cashback on all purchases for the first 3 months!
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PromotionBanner;
