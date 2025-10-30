import { useSearchParams, Link } from "react-router-dom";
import { Clock, IndianRupee, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Mock train data
const mockTrains = [
  {
    id: "12301",
    name: "Rajdhani Express",
    from: "Mumbai",
    to: "Delhi",
    departureTime: "16:35",
    arrivalTime: "08:35",
    duration: "16h 00m",
    classes: [
      { type: "1A", price: 3500, available: 12, status: "available" },
      { type: "2A", price: 2100, available: 0, status: "waitlist", waitlist: 15 },
      { type: "3A", price: 1400, available: 24, status: "available" },
    ],
  },
  {
    id: "12951",
    name: "Mumbai Rajdhani",
    from: "Mumbai",
    to: "Delhi",
    departureTime: "17:00",
    arrivalTime: "09:15",
    duration: "16h 15m",
    classes: [
      { type: "1A", price: 3600, available: 5, status: "available" },
      { type: "2A", price: 2200, available: 18, status: "available" },
      { type: "3A", price: 1500, available: 0, status: "unavailable" },
    ],
  },
  {
    id: "12137",
    name: "Punjab Mail",
    from: "Mumbai",
    to: "Delhi",
    departureTime: "19:40",
    arrivalTime: "14:45",
    duration: "19h 05m",
    classes: [
      { type: "2A", price: 1800, available: 32, status: "available" },
      { type: "3A", price: 1200, available: 45, status: "available" },
      { type: "SL", price: 450, available: 78, status: "available" },
    ],
  },
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  const getStatusBadge = (status: string, waitlist?: number) => {
    switch (status) {
      case "available":
        return <Badge className="bg-success text-white">Available</Badge>;
      case "waitlist":
        return <Badge className="bg-warning text-white">WL {waitlist}</Badge>;
      case "unavailable":
        return <Badge variant="destructive">Not Available</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Journey Summary */}
        <Card className="p-6 mb-8 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">{from}</h2>
                <p className="text-sm text-muted-foreground">From</p>
              </div>
              <ArrowRight className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">{to}</h2>
                <p className="text-sm text-muted-foreground">To</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(date).toLocaleDateString("en-IN", { 
                weekday: "short", 
                day: "numeric", 
                month: "short", 
                year: "numeric" 
              })}</span>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">
            {mockTrains.length} trains found
          </h3>

          {mockTrains.map((train, index) => (
            <Card
              key={train.id}
              className="p-6 hover:shadow-lg transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Train Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">
                    {train.name} ({train.id})
                  </h3>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{train.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{train.departureTime}</div>
                    <div className="text-sm text-muted-foreground">{train.from}</div>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-muted-foreground/30 mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                      {train.duration}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{train.arrivalTime}</div>
                    <div className="text-sm text-muted-foreground">{train.to}</div>
                  </div>
                </div>
              </div>

              {/* Classes & Booking */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {train.classes.map((classInfo) => (
                    <div
                      key={classInfo.type}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="font-semibold">{classInfo.type}</div>
                        <div className="flex items-center gap-1 text-lg font-bold text-primary">
                          <IndianRupee className="h-4 w-4" />
                          {classInfo.price}
                        </div>
                        {getStatusBadge(classInfo.status, classInfo.waitlist)}
                      </div>
                      <Link
                        to={`/train/${train.id}?class=${classInfo.type}`}
                        className={classInfo.status === "unavailable" ? "pointer-events-none" : ""}
                      >
                        <Button
                          size="sm"
                          disabled={classInfo.status === "unavailable"}
                        >
                          {classInfo.status === "available" ? "Book" : "Check"}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
