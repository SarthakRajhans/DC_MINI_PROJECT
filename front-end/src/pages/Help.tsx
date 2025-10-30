import { useState } from "react";
import { Search, HelpCircle, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a train ticket?",
    answer: "To book a ticket, enter your journey details on the home page, select a train from the results, choose your seats, fill in passenger details, and complete the payment."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellation charges vary based on the time of cancellation. If cancelled more than 48 hours before departure, only a nominal fee is charged. Within 48 hours, cancellation charges increase progressively."
  },
  {
    question: "How do I check my PNR status?",
    answer: "You can check your PNR status by visiting the 'My Bookings' section and clicking on your booking. The current status will be displayed along with other booking details."
  },
  {
    question: "Can I modify my booking after confirmation?",
    answer: "Yes, you can modify passenger details like name, age, and berth preference. However, changes to travel date or class may require cancellation and rebooking."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept credit/debit cards, UPI, net banking, and popular digital wallets like Paytm, PhonePe, and Google Pay."
  },
  {
    question: "Will I get a refund for cancelled tickets?",
    answer: "Yes, refunds are processed after deducting applicable cancellation charges. The amount is typically credited back to your original payment method within 7-10 business days."
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log({ contactName, contactEmail, contactMessage });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-lg text-muted-foreground">
            Search our FAQs or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <Card className="p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No FAQs match your search. Try different keywords or contact our support team.
            </p>
          )}
        </Card>

        {/* Contact Support */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Get help via email
            </p>
            <a href="mailto:support@irctc.com" className="text-primary hover:underline">
              support@irctc.com
            </a>
          </Card>
          <Card className="p-6 text-center">
            <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-2">
              24/7 customer service
            </p>
            <a href="tel:18001234567" className="text-primary hover:underline">
              1800-123-4567
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
