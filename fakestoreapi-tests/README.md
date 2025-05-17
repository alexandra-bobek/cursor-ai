# FakeStore API Tests

This project contains automated tests to validate data provided by the FakeStore API (https://fakestoreapi.com/products).

## Test Objectives

The tests validate the following:
1. Server response code (expected 200)
2. Product attributes validation:
   - Title (name) - must not be empty
   - Price - must not be negative
   - Rating - must not exceed 5
3. Generates a list of products containing defects

## Setup

1. Install dependencies:
```bash
npm install
```

## Running Tests

Run tests once:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Test Output

The tests will output a detailed report of any defective products found, including:
- Product ID
- List of defects found
- Complete product details

If no defects are found, it will display a success message. 