
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAppointments, cancelAppointment, Appointment } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X, CheckCircle, AlertCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const data = await getUserAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        toast.error("Failed to load your appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, navigate]);

  const handleCancelAppointment = async (id: string) => {
    setCancelingId(id);
    try {
      await cancelAppointment(id);
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: "cancelled" } : apt
      ));
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      toast.error("Failed to cancel appointment");
    } finally {
      setCancelingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "completed":
        return "text-blue-600 bg-blue-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <span className="inline-block mr-1">📹</span>;
      case "voice":
        return <span className="inline-block mr-1">📞</span>;
      case "chat":
        return <span className="inline-block mr-1">💬</span>;
      case "in-person":
        return <span className="inline-block mr-1">🏥</span>;
      default:
        return null;
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Appointments</h1>
            <Button onClick={() => navigate("/doctors")}>Book New Appointment</Button>
          </div>

          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-4 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto" />
              </div>
              <h2 className="text-xl font-medium mb-2">No appointments yet</h2>
              <p className="text-gray-600 mb-6">You haven't scheduled any appointments with our doctors yet.</p>
              <Button onClick={() => navigate("/doctors")}>Find a Doctor</Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          Dr. {appointment.doctor_name}
                          <div className="text-sm text-gray-500">{appointment.doctor_specialty}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            {format(parseISO(appointment.appointment_date), "MMM d, yyyy")}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="mr-2 h-3 w-3" />
                            {format(parseISO(appointment.appointment_date), "h:mm a")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getTypeIcon(appointment.type)}
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {appointment.status === "pending" || appointment.status === "confirmed" ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                                  Cancel
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Cancel Appointment</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to cancel your appointment with Dr. {appointment.doctor_name} on {format(parseISO(appointment.appointment_date), "MMMM d, yyyy")} at {format(parseISO(appointment.appointment_date), "h:mm a")}?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => document.querySelector<HTMLButtonElement>('[data-dismiss="dialog"]')?.click()}
                                  >
                                    No, keep it
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                    disabled={cancelingId === appointment.id}
                                  >
                                    {cancelingId === appointment.id ? "Cancelling..." : "Yes, cancel it"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              {appointment.status === "completed" ? "Completed" : "Cancelled"}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointments;
