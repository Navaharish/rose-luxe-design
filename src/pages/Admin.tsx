import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Admin() {
  const [products, setProducts] = useState([
    { id: "1", name: "Vitamin C Serum", price: 35, category: "Serums", stock: 45 },
    { id: "2", name: "Natural Beetroot Lip Balm", price: 12, category: "Lip Care", stock: 120 },
    { id: "3", name: "Nighty Night Cream", price: 28, category: "Night Care", stock: 67 },
  ]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-elegant mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and inventory</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full btn-primary-gradient text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-elegant">
                  Add New Product
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input placeholder="e.g., Vitamin C Serum" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                      <option>Serums</option>
                      <option>Lip Care</option>
                      <option>Night Care</option>
                      <option>Cleansers</option>
                      <option>Hair Care</option>
                      <option>Sun Care</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Input type="number" placeholder="35" />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Quantity</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="Enter product description..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <Input type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label>Ingredients</Label>
                  <Textarea 
                    placeholder="List ingredients..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>How to Use</Label>
                  <Textarea 
                    placeholder="Usage instructions..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button" className="rounded-full">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-full btn-primary-gradient text-white">
                    Add Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="rounded-full bg-muted p-1 mb-8">
            <TabsTrigger value="products" className="rounded-full">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-full">
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-full">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-2 font-semibold">Product</th>
                        <th className="text-left py-4 px-2 font-semibold">Category</th>
                        <th className="text-left py-4 px-2 font-semibold">Price</th>
                        <th className="text-left py-4 px-2 font-semibold">Stock</th>
                        <th className="text-right py-4 px-2 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-border/50">
                          <td className="py-4 px-2 font-medium">{product.name}</td>
                          <td className="py-4 px-2 text-muted-foreground">{product.category}</td>
                          <td className="py-4 px-2 text-primary font-semibold">${product.price}</td>
                          <td className="py-4 px-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              product.stock > 50 
                                ? "bg-green-100 text-green-700" 
                                : "bg-orange-100 text-orange-700"
                            }`}>
                              {product.stock} units
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="card-elegant">
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground">
                  Orders will appear here once customers start purchasing
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Total Products", value: products.length, color: "from-primary to-secondary" },
                { label: "Total Revenue", value: "$0", color: "from-accent/60 to-primary" },
                { label: "Orders", value: "0", color: "from-secondary to-lavender" }
              ].map((stat, i) => (
                <Card key={i} className="card-elegant">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-elegant">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
