
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully. We'll get back to you soon.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Support</h1>
      
      <Tabs defaultValue="contact">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="help">Help Topics</TabsTrigger>
        </TabsList>
        
        {/* Contact Us Tab */}
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Call us for immediate assistance</p>
                <p className="font-medium mt-2">+880 123 4567890</p>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Email us your queries</p>
                <p className="font-medium mt-2">support@skyletbank.com</p>
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Chat with our support agents</p>
                <Button className="skylet-button-primary mt-2 w-full">
                  Start Chat
                </Button>
                <p className="text-sm text-gray-500 mt-2">Available 9 AM - 6 PM</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Message subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="skylet-button-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about our banking services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">How do I activate my new card?</h3>
                <p className="text-gray-600">
                  You can activate your new card through our mobile app, online banking portal, or by calling our customer service.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">What is the daily withdrawal limit?</h3>
                <p className="text-gray-600">
                  The standard daily withdrawal limit is ৳50,000. You can request a temporary increase through your account settings.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">How do I report a lost card?</h3>
                <p className="text-gray-600">
                  If your card is lost or stolen, please call our 24/7 helpline immediately at +880 123 4567890 to block the card.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">How long does a bank transfer take?</h3>
                <p className="text-gray-600">
                  NPSB transfers are instant. BEFTN transfers typically take 1-2 business days depending on the receiving bank.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Is international banking available?</h3>
                <p className="text-gray-600">
                  Yes, we offer international banking services including SWIFT transfers. Please contact our support for more details.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Help Topics Tab */}
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help Topics</CardTitle>
              <CardDescription>
                Browse our help topics for detailed information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto py-4">
                  Account Management
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  Cards & ATM Services
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  Online & Mobile Banking
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  Transfers & Payments
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  Security & Privacy
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  Loans & Credit Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
