import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Wallet, IndianRupee, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalAmount = Math.round((bookingData.totalAmount || 0) * 1.05);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setProcessing(false);
    toast.success("Payment successful! 🎉");
    
    // Navigate to success page
    navigate("/booking-success", { 
      state: { 
        ...bookingData, 
        pnr: `PNR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        totalAmount 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center font-semibold">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium">Seats</span>
            </div>
            <div className="h-0.5 w-16 bg-success" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center font-semibold">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium">Details</span>
            </div>
            <div className="h-0.5 w-16 bg-primary" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>

              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="card">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="upi">
                    <Smartphone className="h-4 w-4 mr-2" />
                    UPI
                  </TabsTrigger>
                  <TabsTrigger value="wallet">
                    <Wallet className="h-4 w-4 mr-2" />
                    Wallet
                  </TabsTrigger>
                </TabsList>

                {/* Card Payment */}
                <TabsContent value="card" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input
                        type="password"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handlePayment}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : `Pay ₹${totalAmount}`}
                  </Button>
                </TabsContent>

                {/* UPI Payment */}
                <TabsContent value="upi" className="space-y-4">
                  <div className="space-y-2">
                    <Label>UPI ID</Label>
                    <Input
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handlePayment}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : `Pay ₹${totalAmount}`}
                  </Button>
                </TabsContent>

                {/* Wallet Payment */}
                <TabsContent value="wallet" className="space-y-4">
                  <div className="space-y-3">
                    {["Paytm", "PhonePe", "Google Pay", "Amazon Pay"].map((wallet) => (
                      <button
                        key={wallet}
                        className="w-full p-4 border rounded-lg hover:bg-accent/5 transition-colors text-left font-medium"
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handlePayment}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : `Pay ₹${totalAmount}`}
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-primary-light rounded-lg">
                <p className="text-sm text-center">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </Card>
          </div>

          {/* Amount Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Amount to Pay</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Fare</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    {bookingData.totalAmount || 0}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (5%)</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    {Math.round((bookingData.totalAmount || 0) * 0.05)}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <div className="flex items-center text-primary">
                    <IndianRupee className="h-6 w-6" />
                    {totalAmount}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success mt-0.5" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success mt-0.5" />
                  <span>E-ticket sent to email & SMS</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success mt-0.5" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
