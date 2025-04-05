
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById, createAppointment, Doctor } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, Award, GraduationCap, Video, Phone, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { format, addDays } from "date-fns";
import { toast } from "@/hooks/use-toast";

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState<"video" | "voice" | "chat" | "in-person">("video");
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [bookingTime, setBookingTime] = useState<string>("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
        toast.error("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      toast.error("Please log in to book an appointment");
      navigate("/auth");
      return;
    }

    if (!bookingDate || !bookingTime) {
      toast.error("Please select a date and time for your appointment");
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time
      const [hours, minutes] = bookingTime.split(':').map(Number);
      const appointmentDateTime = new Date(bookingDate);
      appointmentDateTime.setHours(hours, minutes);

      await createAppointment({
        doctor_id: id!,
        appointment_date: appointmentDateTime.toISOString(),
        status: "pending",
        type: bookingType,
      });

      toast.success("Appointment requested successfully");
      setIsBookingOpen(false);
      navigate("/appointments");
    } catch (error) {
      console.error("Failed to book appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      dates.push(date);
    }

    return dates.map((date) => (
      <Button
        key={date.toString()}
        variant={bookingDate?.toDateString() === date.toDateString() ? "default" : "outline"}
        className="text-sm"
        onClick={() => setBookingDate(date)}
      >
        {format(date, "EEE, MMM d")}
      </Button>
    ));
  };

  const renderTimeOptions = () => {
    const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
    
    return times.map((time) => (
      <Button
        key={time}
        variant={bookingTime === time ? "default" : "outline"}
        className="text-sm"
        onClick={() => setBookingTime(time)}
      >
        {time}
      </Button>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
          <p className="text-gray-600 mb-6">The doctor you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate("/doctors")}>View All Doctors</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <img 
                  src={doctor.image} 
                  alt={`Dr. ${doctor.name}`} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-1">Dr. {doctor.name}</h1>
                  <p className="text-gray-600 mb-4">{doctor.specialty}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-5 h-5 ${i < doctor.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{doctor.rating.toFixed(1)} ({Math.floor(doctor.rating * 10)} reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Award className="w-5 h-5 mr-2" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  
                  {doctor.education && (
                    <div className="flex items-start text-gray-600 mb-6">
                      <GraduationCap className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{doctor.education}</span>
                    </div>
                  )}
                  
                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Book Appointment</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book an Appointment</DialogTitle>
                        <DialogDescription>
                          Schedule a consultation with Dr. {doctor.name}, {doctor.specialty}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="mb-4">
                          <h3 className="font-medium mb-2">Select Consultation Type:</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant={bookingType === "video" ? "default" : "outline"} 
                              className="justify-start gap-2"
                              onClick={() => setBookingType("video")}
                            >
                              <Video className="h-4 w-4" /> Video Call
                            </Button>
                            <Button 
                              variant={bookingType === "voice" ? "default" : "outline"} 
                              className="justify-start gap-2"
                              onClick={() => setBookingType("voice")}
                            >
                              <Phone className="h-4 w-4" /> Voice Call
                            </Button>
                            <Button 
                              variant={bookingType === "chat" ? "default" : "outline"} 
                              className="justify-start gap-2"
                              onClick={() => setBookingType("chat")}
                            >
                              <MessageSquare className="h-4 w-4" /> Chat
                            </Button>
                            <Button 
                              variant={bookingType === "in-person" ? "default" : "outline"} 
                              className="justify-start gap-2"
                              onClick={() => setBookingType("in-person")}
                            >
                              <MapPin className="h-4 w-4" /> In-person
                            </Button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-medium mb-2">Select Date:</h3>
                          <div className="flex flex-wrap gap-2">
                            {renderDateOptions()}
                          </div>
                        </div>

                        {bookingDate && (
                          <div>
                            <h3 className="font-medium mb-2">Select Time:</h3>
                            <div className="grid grid-cols-4 gap-2">
                              {renderTimeOptions()}
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button onClick={handleBook} disabled={isSubmitting || !bookingDate || !bookingTime}>
                          {isSubmitting ? "Booking..." : "Book Appointment"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">About Dr. {doctor.name}</h2>
                <p className="text-gray-700 mb-4">
                  {doctor.about || "No information available about this doctor."}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Available Services</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Video Consultations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Voice Consultations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Chat Consultations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>In-person Consultations</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Patient Reviews</h2>
                {/* Example reviews */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">1 month ago</p>
                    </div>
                    <h3 className="font-medium">Sarah M.</h3>
                    <p className="text-gray-700 mt-2">
                      Dr. {doctor.name} was very thorough and took the time to listen to all my concerns. I felt heard and cared for during my appointment.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">3 months ago</p>
                    </div>
                    <h3 className="font-medium">Jessica R.</h3>
                    <p className="text-gray-700 mt-2">
                      I had a video consultation with Dr. {doctor.name} and it was very convenient. The doctor was knowledgeable and explained everything clearly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDetail;
