
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-primary font-bold text-xl flex items-center">
            <span className="bg-primary text-white p-1 rounded mr-2">Doc</span>
            <span>Talk</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
          <a href="#doctors" className="text-gray-600 hover:text-primary transition-colors">Doctors</a>
          <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</a>
          <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mr-2">Log In</Button>
            </DialogTrigger>
            <DialogContent>
              <AuthModal initialTab="login" />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Sign Up</Button>
            </DialogTrigger>
            <DialogContent>
              <AuthModal initialTab="signup" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner fade-in">
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#doctors"
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Doctors
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Button>
              </DialogTrigger>
              <DialogContent>
                <AuthModal initialTab="login" />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent>
                <AuthModal initialTab="signup" />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
