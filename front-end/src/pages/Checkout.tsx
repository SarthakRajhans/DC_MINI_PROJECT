import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, IndianRupee, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Passenger {
  id: number;
  name: string;
  age: string;
  gender: string;
  berth: string;
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};
  
  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: 1, name: "", age: "", gender: "", berth: "" },
  ]);
  const [contactEmail, setContactEmail] = useState("");
  const [contactMobile, setContactMobile] = useState("");

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([
        ...passengers,
        { id: passengers.length + 1, name: "", age: "", gender: "", berth: "" },
      ]);
    }
  };

  const updatePassenger = (id: number, field: keyof Passenger, value: string) => {
    setPassengers(
      passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handlePayment = () => {
    // Validate form
    const allFilled = passengers.every(
      (p) => p.name && p.age && p.gender && p.berth
    );
    if (!allFilled || !contactEmail || !contactMobile) {
      return;
    }
    navigate("/payment", { state: { ...bookingData, passengers, contactEmail, contactMobile } });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
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
            <div className="h-0.5 w-16 bg-primary" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium">Details</span>
            </div>
            <div className="h-0.5 w-16 bg-muted" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Passenger Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Passenger Details</h2>

              {passengers.map((passenger, index) => (
                <div key={passenger.id} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge>Passenger {index + 1}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input
                        placeholder="Enter full name"
                        value={passenger.name}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Age *</Label>
                      <Input
                        type="number"
                        placeholder="Age"
                        value={passenger.age}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "age", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Gender *</Label>
                      <Select
                        value={passenger.gender}
                        onValueChange={(value) =>
                          updatePassenger(passenger.id, "gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Berth Preference</Label>
                      <Select
                        value={passenger.berth}
                        onValueChange={(value) =>
                          updatePassenger(passenger.id, "berth", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select berth" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="lower">Lower</SelectItem>
                          <SelectItem value="middle">Middle</SelectItem>
                          <SelectItem value="upper">Upper</SelectItem>
                          <SelectItem value="side-lower">Side Lower</SelectItem>
                          <SelectItem value="side-upper">Side Upper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {index < passengers.length - 1 && (
                    <div className="border-t mt-6" />
                  )}
                </div>
              ))}

              {passengers.length < 6 && (
                <Button
                  variant="outline"
                  onClick={addPassenger}
                  className="w-full mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Passenger
                </Button>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mobile Number *</Label>
                  <Input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value)}
                    required
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Your ticket will be sent to this email and mobile number
              </p>
            </Card>
          </div>

          {/* Fare Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Fare Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Train</span>
                  <span className="font-medium">{bookingData.trainId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class</span>
                  <span className="font-medium">{bookingData.trainClass}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Seats</span>
                  <span className="font-medium">{bookingData.seats?.length || 0}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Fare</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    {bookingData.totalAmount || 0}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    {Math.round((bookingData.totalAmount || 0) * 0.05)}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <div className="flex items-center text-primary">
                    <IndianRupee className="h-5 w-5" />
                    {Math.round((bookingData.totalAmount || 0) * 1.05)}
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
              >
                Proceed to Payment
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
