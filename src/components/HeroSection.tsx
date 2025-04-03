
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AuthModal from './AuthModal';
import EmergencySOS from './EmergencySOS';

const HeroSection = () => {
  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 slide-up">
              Your Health, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 slide-up">
              DocTalk connects women with healthcare professionals for personalized support, 
              guidance, and care. Join our community and take control of your health journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 slide-up">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-base">Get Started</Button>
                </DialogTrigger>
                <DialogContent>
                  <AuthModal initialTab="signup" />
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="text-base">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -top-4 -right-4 w-full h-full bg-secondary rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1571772996211-2f02974a9f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Doctor consultation" 
              className="w-full h-auto rounded-lg shadow-md relative z-10"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <EmergencySOS />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
