import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Users, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-train.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState<Date>();
  const [trainClass, setTrainClass] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromStation && toStation && date) {
      navigate(`/search?from=${fromStation}&to=${toStation}&date=${format(date, "yyyy-MM-dd")}&class=${trainClass}&passengers=${passengers}`);
    }
  };

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Hero Section with Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80 z-10" />
        <img
          src={heroImage}
          alt="Indian Railway"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Book Your Train Journey
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Fast, easy, and reliable train ticket booking across India
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-background rounded-2xl shadow-2xl p-6 md:p-8 animate-scale-in">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* From & To Stations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                <div className="space-y-2">
                  <Label htmlFor="from">From Station</Label>
                  <Input
                    id="from"
                    placeholder="Enter departure station"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                {/* Swap Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleSwapStations}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex rounded-full bg-primary hover:bg-primary-hover shadow-lg"
                >
                  <ArrowRightLeft className="h-4 w-4 text-primary-foreground" />
                </Button>

                <div className="space-y-2">
                  <Label htmlFor="to">To Station</Label>
                  <Input
                    id="to"
                    placeholder="Enter arrival station"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              {/* Date, Class & Passengers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Picker */}
                <div className="space-y-2">
                  <Label>Journey Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Class */}
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={trainClass} onValueChange={setTrainClass}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="1A">First AC (1A)</SelectItem>
                      <SelectItem value="2A">Second AC (2A)</SelectItem>
                      <SelectItem value="3A">Third AC (3A)</SelectItem>
                      <SelectItem value="SL">Sleeper (SL)</SelectItem>
                      <SelectItem value="2S">Second Sitting (2S)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <Label>Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Passenger" : "Passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-semibold"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Trains
              </Button>
            </form>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Instant Booking</h3>
              <p className="text-sm text-white/80">Book tickets in seconds</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">🎫</div>
              <h3 className="font-semibold mb-1">E-Ticket</h3>
              <p className="text-sm text-white/80">Get instant confirmation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold mb-1">Secure Payment</h3>
              <p className="text-sm text-white/80">100% safe transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
