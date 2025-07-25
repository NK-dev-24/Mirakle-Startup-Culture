
import React from 'react';
import { Rocket, Puzzle, Handshake } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp = ({ end, duration = 2000 }: CountUpProps) => {
  const [count, setCount] = React.useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [end, duration, inView]);

  return <span ref={ref}>{count}+</span>;
};

const StatsSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow text-center transform hover:scale-105 duration-300">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-brand-yellow" />
          </div>
          <div className="text-4xl font-bold text-brand-yellow mb-2">
            <CountUp end={300} />
          </div>
          <p className="text-gray-600">Active Startups</p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow text-center transform hover:scale-105 duration-300">
          <div className="flex items-center justify-center mb-4">
            <Puzzle className="h-8 w-8 text-brand-yellow" />
          </div>
          <div className="text-4xl font-bold text-brand-yellow mb-2">
            <CountUp end={100} />
          </div>
          <p className="text-gray-600">Corporate Challenges</p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow text-center transform hover:scale-105 duration-300">
          <div className="flex items-center justify-center mb-4">
            <Handshake className="h-8 w-8 text-brand-yellow" />
          </div>
          <div className="text-4xl font-bold text-brand-yellow mb-2">
            <CountUp end={50} />
          </div>
          <p className="text-gray-600">Successful Matches</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
