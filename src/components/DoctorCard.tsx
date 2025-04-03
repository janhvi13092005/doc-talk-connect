
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DoctorCardProps {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
}

const DoctorCard = ({ name, specialty, image, rating, experience }: DoctorCardProps) => {
  const { toast } = useToast();

  const handleBookAppointment = () => {
    // In a real application, this would open an appointment booking flow
    toast({
      title: "Appointment Request Sent",
      description: `Your appointment request with Dr. ${name} has been submitted.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-card">
      <div className="aspect-w-4 aspect-h-3">
        <img 
          src={image} 
          alt={`Dr. ${name}`} 
          className="object-cover w-full h-48"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-1">{`Dr. ${name}`}</h3>
        <p className="text-gray-500 text-sm mb-2">{specialty}</p>
        <div className="flex items-center mb-2">
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
          <span className="text-xs text-gray-500 ml-2">{rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-600">{experience} years experience</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book an Appointment</DialogTitle>
              <DialogDescription>
                Schedule a consultation with Dr. {name}, {specialty}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm mb-4">
                Dr. {name} specializes in {specialty.toLowerCase()} with {experience} years of experience.
              </p>
              <p className="text-sm font-medium mb-2">Select Consultation Type:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button variant="outline" className="justify-start">Video Call</Button>
                <Button variant="outline" className="justify-start">Voice Call</Button>
                <Button variant="outline" className="justify-start">Chat</Button>
                <Button variant="outline" className="justify-start">In-person</Button>
              </div>
              <p className="text-sm text-gray-500">
                Full appointment scheduling will be available after login.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleBookAppointment}>Continue Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="link" size="sm">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
