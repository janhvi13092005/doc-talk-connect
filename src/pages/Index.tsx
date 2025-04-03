
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import DoctorCard from '@/components/DoctorCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Doctor data
  const doctors = [
    {
      name: "Sarah Johnson",
      specialty: "Gynecologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 4.9,
      experience: "15",
    },
    {
      name: "Emily Chen",
      specialty: "Mental Health Specialist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.8,
      experience: "12",
    },
    {
      name: "Rachel Williams",
      specialty: "General Physician",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      rating: 4.7,
      experience: "10",
    },
  ];

  // Testimonial data
  const testimonials = [
    {
      name: "Jennifer Adams",
      content: "DocTalk has revolutionized how I manage my health. The ability to consult with specialists from home has saved me so much time and stress.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
      rating: 5,
    },
    {
      name: "Michelle Torres",
      content: "The emergency SOS feature gave me peace of mind during a health scare. I received immediate guidance from a doctor who helped me through a stressful situation.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      rating: 5,
    },
    {
      name: "Sophia Lee",
      content: "The community forums helped me connect with other women experiencing similar health challenges. The support and shared wisdom have been incredibly valuable.",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Features />
        
        {/* Doctors Section */}
        <section id="doctors" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Specialists</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our team of experienced healthcare professionals is dedicated to providing personalized care for your specific needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <DoctorCard 
                  key={index}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  image={doctor.image}
                  rating={doctor.rating}
                  experience={doctor.experience}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg">View All Doctors</Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Read about the experiences of women who have found support and care through DocTalk.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  content={testimonial.content}
                  image={testimonial.image}
                  rating={testimonial.rating}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Take Control of Your Health?</h2>
            <p className="text-xl text-primary-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of women who have transformed their healthcare experience with DocTalk.
            </p>
            <Button size="lg" variant="secondary" className="text-primary text-base font-medium">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
