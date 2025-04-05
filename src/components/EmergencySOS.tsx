import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EmergencySOS = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEmergency = () => {
    // In a real application, this would trigger an API call to alert emergency services
    toast.error("Emergency Alert Sent", {
      description: "Medical assistance has been notified. Stay calm and wait for a response."
    });
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button 
        variant="destructive" 
        size="lg" 
        className="rounded-full emergency-pulse flex items-center gap-2"
        onClick={() => setIsDialogOpen(true)}
      >
        <Bell className="h-5 w-5" />
        Emergency SOS
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">Emergency Assistance</DialogTitle>
            <DialogDescription>
              This will alert our medical team that you need immediate assistance. Use only in case of emergency.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-4">
              By activating the emergency alert, a medical professional will contact you immediately.
            </p>
            <p className="text-sm font-medium">What type of emergency are you experiencing?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start" onClick={handleEmergency}>
                Medical
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleEmergency}>
                Mental Health
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleEmergency}>
                Safety Concern
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleEmergency}>
                Other
              </Button>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleEmergency}
              className="w-full sm:w-auto"
            >
              Send Emergency Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencySOS;
