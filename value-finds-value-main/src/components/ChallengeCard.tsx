import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Challenge } from '../types/marketplace';
import { Calendar, ArrowRight, Tag, Clock, Shield } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useNavigate } from 'react-router-dom';

interface ChallengeCardProps {
  challenge: Challenge;
  featured?: boolean;
}

const ChallengeCard = ({ challenge, featured = false }: ChallengeCardProps) => {
  const navigate = useNavigate();

  // Determine deadline style based on urgency
  const getDeadlineStyle = () => {
    if (!challenge.deadline) return {};
    
    if (challenge.deadline.toLowerCase().includes('open')) {
      return { bgColor: 'bg-green-50', textColor: 'text-green-700', icon: <Shield className="h-3 w-3 mr-1" /> };
    }
    
    if (challenge.deadline.toLowerCase().includes('urgent') || challenge.deadline.toLowerCase().includes('soon')) {
      return { bgColor: 'bg-red-50', textColor: 'text-red-700', icon: <Clock className="h-3 w-3 mr-1" /> };
    }
    
    return { bgColor: 'bg-amber-50', textColor: 'text-amber-700', icon: <Calendar className="h-3 w-3 mr-1" /> };
  };
  
  const deadlineStyle = getDeadlineStyle();

  return (
    <Card
      className="group overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-200 bg-white rounded-2xl h-full flex flex-col focus-within:ring-2 focus-within:ring-brand-yellow p-6 hover:-translate-y-1 hover:scale-[1.015]"
      tabIndex={0}
      aria-label={`Opportunity: ${challenge.title}`}
    >
      <CardHeader className="pb-2 relative">
        {featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-brand-yellow text-white text-xs px-4 py-1 rounded-bl-2xl font-semibold shadow-lg transition-all duration-200 animate-pulse z-10">
            ⭐ Featured
          </div>
        )}
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="text-xl group-hover:text-brand-yellow transition-colors leading-tight">
              {challenge.title}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1 text-gray-500">
              <Tag className="h-3 w-3" />
              {challenge.organizer}
            </CardDescription>
          </div>
          <Badge 
            className="bg-blue-700 text-white px-4 py-1 rounded-full shadow-md hover:bg-blue-800 transition-all duration-200 text-sm font-medium"
          >
            {challenge.type[0]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow space-y-4">
        {challenge.description && (
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{challenge.description}</p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {challenge.type.slice(1, 4).map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-blue-50 text-blue-700 border-0 rounded-full py-1 px-3 hover:bg-blue-100 transition-all duration-200 shadow-sm"
            >
              {tag}
            </Badge>
          ))}
          
          {challenge.type.length > 4 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="text-xs cursor-pointer bg-blue-50 text-blue-700 border-0 rounded-full py-1 px-3 hover:bg-blue-100 transition-all duration-200 shadow-sm"
                >
                  +{challenge.type.length - 4} more
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.type.slice(4).map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs bg-blue-50 text-blue-700 border-0 rounded-full py-1 px-3"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {challenge.deadline && (
            <div className={`flex items-center ${deadlineStyle.bgColor} ${deadlineStyle.textColor} px-3 py-1 rounded-full font-medium shadow-sm transition-all duration-200`}>
              {deadlineStyle.icon}
              {challenge.deadline}
            </div>
          )}
          
          {challenge.reward && (
            <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium shadow-sm">
              <span>Reward: ${challenge.reward.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        {challenge.status && (
          <p className="text-xs text-gray-400">{challenge.status}</p>
        )}
      </CardContent>
      
      <CardFooter className="mt-auto pt-4 border-t border-gray-100">
        <Button
          className="w-full group-hover:bg-brand-yellow bg-blue-700 hover:bg-blue-800 transition-all duration-200 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-semibold focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 hover:scale-[1.03]"
          aria-label={`Apply for ${challenge.title}`}
          tabIndex={0}
          onClick={() => navigate('/opportunity-details')}
        >
          Apply Now
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
