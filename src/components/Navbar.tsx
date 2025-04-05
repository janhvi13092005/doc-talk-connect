
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AuthModal from './AuthModal';
import EmergencySOS from './EmergencySOS';
import { useAuth } from '@/lib/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src="/placeholder.svg" alt="DocTalk Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl text-primary">DocTalk</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link to="/doctors" className="text-gray-700 hover:text-primary">Find Doctors</Link>
          {user && (
            <Link to="/appointments" className="text-gray-700 hover:text-primary">
              My Appointments
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <EmergencySOS />
          
          {user ? (
            <div className="relative group">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <UserIcon className="h-5 w-5" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-in-out z-50">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Appointments
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button>Sign In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AuthModal initialTab="login" />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-gray-700">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%]">
              <div className="flex flex-col h-full">
                <div className="py-6 flex-grow">
                  <nav className="flex flex-col space-y-4">
                    <Link
                      to="/"
                      className="text-lg font-medium px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/doctors"
                      className="text-lg font-medium px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Find Doctors
                    </Link>
                    {user && (
                      <Link
                        to="/appointments"
                        className="text-lg font-medium px-2"
                        onClick={() => setIsOpen(false)}
                      >
                        My Appointments
                      </Link>
                    )}
                    <div className="h-px bg-gray-200 my-2" />
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="text-lg font-medium px-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="text-lg font-medium px-2 text-left text-red-500"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          setIsAuthDialogOpen(true);
                        }}
                        className="w-full"
                      >
                        Sign In
                      </Button>
                    )}
                  </nav>
                </div>
                <div className="py-6">
                  <EmergencySOS />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Auth Dialog for Mobile */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <AuthModal initialTab="login" />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
