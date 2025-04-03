
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Calendar, Heart, Users, Bell, Database } from 'lucide-react';

const features = [
  {
    title: "Secure Consultations",
    description: "Connect with healthcare professionals through secure video, voice, or chat consultations.",
    icon: MessageCircle,
  },
  {
    title: "Appointment Booking",
    description: "Easily schedule and manage appointments with your preferred doctors.",
    icon: Calendar,
  },
  {
    title: "Health Tracking",
    description: "Monitor your health metrics, including menstrual cycles and mental wellbeing.",
    icon: Heart,
  },
  {
    title: "Community Support",
    description: "Join our moderated forums to connect with others and share experiences safely.",
    icon: Users,
  },
  {
    title: "Emergency Alerts",
    description: "Access 24/7 emergency support with our SOS system when you need immediate help.",
    icon: Bell,
  },
  {
    title: "Private Health Records",
    description: "Your medical data is securely stored and accessible only to you and authorized healthcare providers.",
    icon: Database,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Women's Health Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DocTalk provides a complete suite of tools and services designed specifically for women's health needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border shadow-soft hover:shadow-card transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
