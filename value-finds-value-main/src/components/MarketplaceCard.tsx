
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface MarketplaceCardProps {
  type: 'startup' | 'challenge';
  title: string;
  description: string;
  tags: string[];
  entity: string;
  additionalInfo?: string;
  deadline?: string;
  featured?: boolean;
}

const MarketplaceCard = ({
  type,
  title,
  description,
  tags,
  entity,
  additionalInfo,
  deadline,
  featured = false
}: MarketplaceCardProps) => {
  const cardTypeStyles = type === 'startup'
    ? {
      borderColor: 'border-t-accent-orange',
      hoverShadow: 'hover:shadow-orange-100/50',
      badgeColor: 'bg-accent-orange text-white hover:bg-orange-600',
      tagColor: 'bg-orange-50 text-orange-700'
    }
    : {
      borderColor: 'border-t-blue-700',
      hoverShadow: 'hover:shadow-blue-100/50',
      badgeColor: 'bg-blue-700 text-white hover:bg-blue-800',
      tagColor: 'bg-blue-50 text-blue-700'
    };

  // Determine deadline style based on urgency
  const getDeadlineStyle = () => {
    if (!deadline) return {};
    
    if (deadline.toLowerCase().includes('always open')) {
      return { bgColor: 'bg-green-50', textColor: 'text-green-700' };
    }
    
    if (deadline.toLowerCase().includes('urgent') || deadline.toLowerCase().includes('soon')) {
      return { bgColor: 'bg-red-50', textColor: 'text-red-700' };
    }
    
    return { bgColor: 'bg-amber-50', textColor: 'text-amber-700' };
  };
  
  const deadlineStyle = getDeadlineStyle();

  // Limit tags to show (max 3)
  const visibleTags = tags.slice(0, 3);
  const extraTagsCount = tags.length > 3 ? tags.length - 3 : 0;
  
  return (
    <Card className={`group overflow-hidden border-t-4 ${cardTypeStyles.borderColor} rounded-2xl ${cardTypeStyles.hoverShadow} transition-all hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] duration-300 h-full flex flex-col`}>
      <CardHeader className="pb-2 relative">
        {featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-brand-yellow text-white text-xs px-3 py-1 rounded-bl-lg font-medium shadow-sm">
            ⭐ Featured
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl group-hover:text-brand-yellow transition-colors leading-tight">{title}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1 text-sm">
              {type === 'startup' ? 
                <Tag className="h-3 w-3" /> : 
                <Tag className="h-3 w-3" />
              }
              {entity}
            </CardDescription>
          </div>
          <Badge
            className={`${cardTypeStyles.badgeColor} transition-colors shadow-sm`}
          >
            {type === 'startup' ? 'Startup' : 'Challenge'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow space-y-3">
        <div className="flex flex-wrap gap-1">
          {visibleTags.map((tag, index) => (
            <Badge key={index} variant="outline" className={`text-xs py-0.5 font-medium ${cardTypeStyles.tagColor} border-0 rounded-full hover:bg-opacity-80 transition-all`}>
              {tag}
            </Badge>
          ))}
          
          {extraTagsCount > 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge variant="outline" className={`text-xs cursor-pointer py-0.5 font-medium ${cardTypeStyles.tagColor} border-0 rounded-full hover:bg-opacity-80 transition-all`}>
                  +{extraTagsCount} more
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-2">
                <div className="flex flex-wrap gap-1">
                  {tags.slice(3).map((tag, index) => (
                    <Badge key={index} variant="outline" className={`text-xs ${cardTypeStyles.tagColor} border-0`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        
        {(deadline || additionalInfo) && (
          <div className="flex items-center gap-2 text-xs">
            {deadline && (
              <div className={`flex items-center gap-1 ${deadlineStyle.bgColor} ${deadlineStyle.textColor} px-2 py-1 rounded-full`}>
                <Calendar className="h-3 w-3" />
                <span>{deadline}</span>
              </div>
            )}
            
            {additionalInfo && (
              <div className="flex items-center gap-1 bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                <span>{additionalInfo}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="mt-auto pt-3 border-t border-gray-100">
        <Button 
          className={`w-full group-hover:bg-brand-yellow transition-colors group ${type === 'startup' ? 'bg-accent-orange hover:bg-orange-600' : ''}`}
        >
          <span>{type === 'startup' ? 'View Profile' : 'Apply Now'}</span>
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceCard;
