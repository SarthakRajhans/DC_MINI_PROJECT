import { Link } from "react-router-dom";
import { Calendar, Clock, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockBookings = [
  {
    pnr: "PNR1234567890",
    trainId: "12301",
    trainName: "Rajdhani Express",
    from: "Mumbai",
    to: "Delhi",
    date: "2025-11-15",
    class: "3A",
    passengers: 2,
    amount: 2940,
    status: "confirmed",
  },
  {
    pnr: "PNR0987654321",
    trainId: "12951",
    trainName: "Mumbai Rajdhani",
    from: "Mumbai",
    to: "Delhi",
    date: "2025-10-28",
    class: "2A",
    passengers: 1,
    amount: 2310,
    status: "completed",
  },
];

export default function Bookings() {
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your train bookings</p>
        </div>

        {mockBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start your journey by booking your first train ticket
            </p>
            <Link to="/">
              <Button>Search Trains</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <Card key={booking.pnr} className="p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">
                        {booking.trainName} ({booking.trainId})
                      </h3>
                      <Badge
                        className={
                          booking.status === "confirmed"
                            ? "bg-success text-white"
                            : "bg-muted"
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Route</p>
                        <p className="font-medium">
                          {booking.from} → {booking.to}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Journey Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <p className="font-medium">
                            {new Date(booking.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">PNR Number</p>
                        <p className="font-mono font-medium">{booking.pnr}</p>
                      </div>
                    </div>

                    <div className="flex gap-6 mt-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Class: </span>
                        <span className="font-medium">{booking.class}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Passengers: </span>
                        <span className="font-medium">{booking.passengers}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount: </span>
                        <span className="font-medium text-primary">₹{booking.amount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View Ticket
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
