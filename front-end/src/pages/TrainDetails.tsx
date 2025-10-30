import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock seat layout
const generateSeats = (rows: number, cols: number) => {
  const seats = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const seatNumber = i * cols + j + 1;
      seats.push({
        id: seatNumber,
        number: `S${seatNumber}`,
        status: Math.random() > 0.6 ? "available" : "booked",
        type: j % 3 === 0 ? "lower" : j % 3 === 1 ? "middle" : "upper",
      });
    }
  }
  return seats;
};

export default function TrainDetails() {
  const { trainId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const trainClass = searchParams.get("class") || "3A";
  
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const seats = generateSeats(20, 6);
  const pricePerSeat = 1400;

  const handleSeatClick = (seatId: number, status: string) => {
    if (status === "booked") return;
    
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }
      if (prev.length >= 6) {
        return prev; // Max 6 seats
      }
      return [...prev, seatId];
    });
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    navigate("/checkout", {
      state: {
        trainId,
        trainClass,
        seats: selectedSeats,
        totalAmount: selectedSeats.length * pricePerSeat,
      },
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
          <Card className="p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Rajdhani Express ({trainId})
                </h1>
                <p className="text-muted-foreground">
                  Mumbai → Delhi | Class: {trainClass}
                </p>
              </div>
              <Badge className="bg-success text-white text-lg px-4 py-2">
                Available
              </Badge>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Select Your Seats</h2>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-success/20 border-2 border-success" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary border-2 border-primary" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-muted border-2 border-muted" />
                  <span>Booked</span>
                </div>
              </div>

              {/* Seat Grid */}
              <div className="grid grid-cols-6 gap-3 max-w-2xl">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id, seat.status)}
                    disabled={seat.status === "booked"}
                    className={cn(
                      "aspect-square rounded-lg border-2 font-medium text-sm transition-all hover:scale-105",
                      seat.status === "booked" &&
                        "bg-muted border-muted text-muted-foreground cursor-not-allowed opacity-50",
                      seat.status === "available" &&
                        !selectedSeats.includes(seat.id) &&
                        "bg-success/20 border-success hover:bg-success/30",
                      selectedSeats.includes(seat.id) &&
                        "bg-primary border-primary text-primary-foreground"
                    )}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>

              {/* Timer */}
              <div className="mt-6 p-4 bg-warning-light rounded-lg text-center">
                <p className="text-sm font-medium">
                  ⏱️ Seats reserved for <span className="font-bold">5:00</span> minutes
                </p>
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Train</span>
                  <span className="font-medium">{trainId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class</span>
                  <span className="font-medium">{trainClass}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Seats Selected</span>
                  <span className="font-medium">
                    {selectedSeats.length > 0 ? selectedSeats.length : "-"}
                  </span>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Selected Seats:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((seatId) => {
                        const seat = seats.find((s) => s.id === seatId);
                        return (
                          <Badge key={seatId} variant="secondary">
                            {seat?.number}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Price per seat</span>
                  <div className="flex items-center font-medium">
                    <IndianRupee className="h-4 w-4" />
                    {pricePerSeat}
                  </div>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <div className="flex items-center text-primary">
                    <IndianRupee className="h-5 w-5" />
                    {selectedSeats.length * pricePerSeat}
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleProceed}
                disabled={selectedSeats.length === 0}
              >
                <Users className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Button>

              {selectedSeats.length === 0 && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Please select at least one seat
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
