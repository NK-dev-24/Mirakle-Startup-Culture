
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Apply } from '../types/marketplace';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface ApplyCardProps {
  opportunity: Apply;
  featured?: boolean;
}

const ApplyCard = ({ opportunity, featured = false }: ApplyCardProps) => {
  // Determine deadline style based on urgency
  const getDeadlineStyle = () => {
    if (!opportunity.deadline) return {};
    
    if (opportunity.deadline.toLowerCase().includes('open')) {
      return { bgColor: 'bg-green-50', textColor: 'text-green-700' };
    }
    
    if (opportunity.deadline.toLowerCase().includes('urgent') || opportunity.deadline.toLowerCase().includes('soon')) {
      return { bgColor: 'bg-red-50', textColor: 'text-red-700' };
    }
    
    return { bgColor: 'bg-amber-50', textColor: 'text-amber-700' };
  };
  
  const deadlineStyle = getDeadlineStyle();
  
  return (
    <Card className="overflow-hidden border-t-4 border-t-accent-green hover:shadow-green-100/50 transition-all hover:-translate-y-2 hover:scale-[1.02] duration-300 hover:shadow-lg rounded-2xl h-full flex flex-col">
      <CardHeader className="pb-2 relative">
        {featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-400 to-accent-green text-white text-xs px-3 py-1 rounded-bl-lg font-medium shadow-sm">
            ⭐ Featured
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl group-hover:text-accent-green transition-colors leading-tight">
              <span className="bg-gradient-to-r from-brand-yellow to-accent-green bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-all duration-500">
                {opportunity.title}
              </span>
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {opportunity.location}
            </CardDescription>
          </div>
          {opportunity.deadline && (
            <Badge 
              className={`${deadlineStyle.bgColor} ${deadlineStyle.textColor} border-0 shadow-sm flex items-center gap-1`}
            >
              <Calendar className="h-3 w-3" />
              {opportunity.deadline}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow space-y-3">
        {opportunity.dates && (
          <p className="text-sm text-gray-600 mb-2">Dates: {opportunity.dates}</p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {opportunity.funding && (
            <Badge 
              variant="outline" 
              className="bg-green-50 text-green-700 border-0 rounded-full py-0.5 hover:bg-green-100 transition-colors"
            >
              Funding: {opportunity.funding}
            </Badge>
          )}
          
          {opportunity.equity && (
            <Badge 
              variant="outline"
              className="bg-blue-50 text-blue-700 border-0 rounded-full py-0.5 hover:bg-blue-100 transition-colors"
            >
              Equity: {opportunity.equity}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="mt-auto pt-3 border-t border-gray-100">
        <Button className="w-full bg-accent-green hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
          Apply Now
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplyCard;
