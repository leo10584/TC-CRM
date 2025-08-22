"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { formatINR } from "@/lib/utils/currency"
import { Search, Plus, Package } from "lucide-react"
import type { Product } from "@/lib/types/quote"

interface ProductSelectorProps {
  onSelectProduct: (product: Product) => void
}

export function ProductSelector({ onSelectProduct }: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock products data
  const products: Product[] = [
    {
      id: "prod-1",
      name: "Clinical Trial Management Platform",
      description: "Comprehensive platform for managing clinical trials",
      category: "Software",
      basePrice: 500000,
      gstRate: 18,
      uom: "license",
      isActive: true,
    },
    {
      id: "prod-2",
      name: "Patient Data Analytics Module",
      description: "Advanced analytics for patient data insights",
      category: "Software",
      basePrice: 200000,
      gstRate: 18,
      uom: "license",
      isActive: true,
    },
    {
      id: "prod-3",
      name: "Regulatory Compliance Suite",
      description: "Tools for regulatory compliance and reporting",
      category: "Software",
      basePrice: 300000,
      gstRate: 18,
      uom: "license",
      isActive: true,
    },
    {
      id: "prod-4",
      name: "Implementation Services",
      description: "Professional services for system implementation",
      category: "Services",
      basePrice: 150000,
      gstRate: 18,
      uom: "hours",
      isActive: true,
    },
    {
      id: "prod-5",
      name: "Training & Support",
      description: "User training and ongoing support services",
      category: "Services",
      basePrice: 50000,
      gstRate: 18,
      uom: "hours",
      isActive: true,
    },
    {
      id: "prod-6",
      name: "Data Migration Services",
      description: "Migration of existing data to new platform",
      category: "Services",
      basePrice: 100000,
      gstRate: 18,
      uom: "project",
      isActive: true,
    },
  ]

  const categories = ["all", "Software", "Services", "Hardware"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory && product.isActive
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Products</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                    </div>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-primary">{formatINR(product.basePrice)}</div>
                      <div className="text-xs text-muted-foreground">
                        per {product.uom} • GST {product.gstRate}%
                      </div>
                    </div>
                    <Button size="sm" onClick={() => onSelectProduct(product)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
