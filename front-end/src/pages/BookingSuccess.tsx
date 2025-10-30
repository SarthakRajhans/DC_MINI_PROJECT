import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Download, Share, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";

export default function BookingSuccess() {
  const location = useLocation();
  const bookingData = location.state || {};
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen bg-gradient-primary py-16 px-4">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />

      <div className="container mx-auto max-w-2xl">
        <Card className="p-8 text-center animate-scale-in">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-success/20 p-4">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Your train ticket has been successfully booked
          </p>

          {/* PNR Number */}
          <div className="bg-primary-light rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-1">Your PNR Number</p>
            <p className="text-3xl font-bold text-primary tracking-wider">
              {bookingData.pnr}
            </p>
          </div>

          {/* Booking Details */}
          <div className="text-left mb-8 space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Train</span>
              <span className="font-medium">{bookingData.trainId}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Class</span>
              <span className="font-medium">{bookingData.trainClass}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Passengers</span>
              <span className="font-medium">{bookingData.passengers?.length || 0}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-medium text-primary">₹{bookingData.totalAmount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download E-Ticket
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Share className="mr-2 h-5 w-5" />
              Share Ticket
            </Button>
            <Link to="/" className="block">
              <Button variant="ghost" className="w-full" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Info Note */}
          <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-left">
            <p className="font-medium mb-2">📧 Ticket Details Sent</p>
            <p className="text-muted-foreground">
              Your e-ticket and booking details have been sent to <strong>{bookingData.contactEmail}</strong> and <strong>{bookingData.contactMobile}</strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
