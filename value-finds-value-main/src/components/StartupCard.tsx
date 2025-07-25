import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, User2, MapPin, Link2 } from 'lucide-react';
import { FounderStartup } from '@/data/foundersData';

interface StartupCardProps {
  startup: FounderStartup;
  featured?: boolean;
}

const StartupCard = ({ startup, featured = false }: StartupCardProps) => {
  return (
    <Card className="overflow-hidden border-t-4 border-t-accent-orange hover:shadow-orange-100/50 transition-all hover:translate-y-[-8px] hover:scale-[1.02] duration-300 hover:shadow-lg rounded-2xl h-full flex flex-col">
      <CardHeader className="pb-2 relative">
        {featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-brand-yellow text-white text-xs px-3 py-1 rounded-bl-lg font-medium shadow-sm">
            ⭐ Featured
          </div>
        )}
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl group">
              <span className="bg-gradient-to-r from-brand-yellow to-accent-orange bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-all duration-500">
                {startup.name}
              </span>
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2 text-gray-500">
              <MapPin className="h-4 w-4" />
              {startup.city}, {startup.country}
            </CardDescription>
          </div>
          <Badge className="bg-accent-orange hover:bg-orange-600 text-white shadow-sm">
            {startup.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow space-y-3">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="bg-blue-50 text-blue-700 border-0 rounded-full py-1 px-3 text-xs font-medium">
            {startup.industry}
          </Badge>
          {startup.funding && (
            <Badge className="bg-green-50 text-green-700 border-0 rounded-full py-1 px-3 text-xs font-medium">
              {startup.funding}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <User2 className="h-4 w-4" />
          <span>{startup.founder}</span>
        </div>
        {startup.website && (
          <a
            href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            <Link2 className="h-4 w-4" />
            {startup.website.replace(/^https?:\/\//, '')}
          </a>
        )}
        {startup.video && (
          <a
            href={startup.video}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-red-600 hover:underline mt-1"
          >
            <Globe className="h-4 w-4" />
            Elevator Pitch
          </a>
        )}
      </CardContent>
      <CardFooter className="mt-auto pt-3 border-t border-gray-100">
        <Button className="w-full bg-accent-orange hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
          View Profile
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StartupCard;
