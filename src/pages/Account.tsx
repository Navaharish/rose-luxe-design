import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, Heart, MapPin, Settings } from "lucide-react";

export default function Account() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-elegant mb-8">My Account</h1>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full justify-start rounded-full bg-muted p-1 mb-8 overflow-x-auto">
            <TabsTrigger value="orders" className="rounded-full">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="rounded-full">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="addresses" className="rounded-full">
              <MapPin className="h-4 w-4 mr-2" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-full">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-4">
            {[1, 2].map((order) => (
              <Card key={order} className="card-elegant">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">Order #ENO-{10000 + order}</p>
                      <p className="text-sm text-muted-foreground">
                        Placed on March {order}, 2024
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Delivered
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2">2 items</p>
                    <p className="font-bold text-primary">Total: $47.00</p>
                  </div>
                  <Button variant="outline" className="mt-4 rounded-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            <Card className="card-elegant">
              <CardContent className="p-12 text-center">
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Save your favorite products for later
                </p>
                <Button className="rounded-full btn-primary-gradient text-white">
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="addresses" className="space-y-4">
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold mb-2">Home</p>
                    <p className="text-sm text-muted-foreground">
                      123 Main Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    Default
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full text-destructive">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Button className="rounded-full">Add New Address</Button>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <Card className="card-elegant">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-elegant mb-6">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="Jane" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="Doe" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="jane@example.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Phone</Label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button className="rounded-full btn-primary-gradient text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
