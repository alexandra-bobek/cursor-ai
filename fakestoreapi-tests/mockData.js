const mockProducts = [
  // Valid products
  {
    id: 1,
    title: "Valid Product 1",
    price: 109.95,
    description: "A perfectly valid product",
    category: "electronics",
    image: "https://fakestoreapi.com/img/1.jpg",
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    id: 2,
    title: "Valid Product 2",
    price: 22.3,
    description: "Another valid product",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/2.jpg",
    rating: {
      rate: 3.9,
      count: 70
    }
  },
  // Defective products
  {
    id: 3,
    title: "", // Empty title defect
    price: 109.95,
    description: "Product with empty title",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/3.jpg",
    rating: {
      rate: 3.9,
      count: 120
    }
  },
  {
    id: 4,
    title: "Product with negative price",
    price: -29.95, // Negative price defect
    description: "Product with invalid price",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/4.jpg",
    rating: {
      rate: 4.1,
      count: 259
    }
  },
  {
    id: 5,
    title: "Product with invalid rating",
    price: 55.99,
    description: "Product with rating > 5",
    category: "electronics",
    image: "https://fakestoreapi.com/img/5.jpg",
    rating: {
      rate: 7.8, // Rating exceeds maximum defect
      count: 500
    }
  },
  {
    id: 6,
    title: "   ", // Whitespace-only title defect
    price: 15.99,
    description: "Product with whitespace title",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/6.jpg",
    rating: {
      rate: -1, // Negative rating defect
      count: 430
    }
  },
  {
    id: 7,
    title: "Product with missing rating",
    price: 695,
    description: "Product with no rating property",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/7.jpg",
    rating: {} // Missing rate property defect
  }
];

module.exports = { mockProducts }; 