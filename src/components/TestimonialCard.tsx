
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  content: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({ name, content, image, rating }: TestimonialCardProps) => {
  return (
    <Card className="border border-border shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-600 italic mb-6">{`"${content}"`}</p>
        <div className="flex items-center">
          <img 
            src={image} 
            alt={name} 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-xs text-gray-500">DocTalk User</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
