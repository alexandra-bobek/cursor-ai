require('isomorphic-fetch');

describe('Products API Validation', () => {
  let products = [];
  let responseStatus;

  // Fetch data before running tests
  beforeAll(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      responseStatus = response.status;
      products = await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  });

  // Test server response code
  test('Server should respond with status code 200', () => {
    expect(responseStatus).toBe(200);
  });

  // Test product title validation
  test('All products should have non-empty titles', () => {
    const productsWithEmptyTitles = products.filter(
      product => !product.title || product.title.trim() === ''
    );

    expect(productsWithEmptyTitles).toEqual([]);
    if (productsWithEmptyTitles.length > 0) {
      console.log('Products with empty titles:', productsWithEmptyTitles);
    }
  });

  // Test product price validation
  test('All products should have non-negative prices', () => {
    const productsWithNegativePrices = products.filter(
      product => product.price < 0
    );

    expect(productsWithNegativePrices).toEqual([]);
    if (productsWithNegativePrices.length > 0) {
      console.log('Products with negative prices:', productsWithNegativePrices);
    }
  });

  // Test product rating validation
  test('All product ratings should not exceed 5', () => {
    const productsWithInvalidRatings = products.filter(
      product => product.rating && product.rating.rate > 5
    );

    expect(productsWithInvalidRatings).toEqual([]);
    if (productsWithInvalidRatings.length > 0) {
      console.log('Products with invalid ratings:', productsWithInvalidRatings);
    }
  });

  // Generate comprehensive report of defective products
  test('Generate report of all defective products', () => {
    const defectiveProducts = products.filter(product => {
      const hasEmptyTitle = !product.title || product.title.trim() === '';
      const hasNegativePrice = product.price < 0;
      const hasInvalidRating = product.rating && product.rating.rate > 5;

      return hasEmptyTitle || hasNegativePrice || hasInvalidRating;
    });

    // This test will always pass, but will log defective products if found
    if (defectiveProducts.length > 0) {
      console.log('\nDefective Products Report:');
      defectiveProducts.forEach(product => {
        console.log('\nProduct ID:', product.id);
        console.log('Title:', product.title);
        console.log('Price:', product.price);
        console.log('Rating:', product.rating?.rate);
        console.log('Defects:');
        if (!product.title || product.title.trim() === '') {
          console.log('- Empty title');
        }
        if (product.price < 0) {
          console.log('- Negative price');
        }
        if (product.rating && product.rating.rate > 5) {
          console.log('- Invalid rating (> 5)');
        }
      });
    }

    // Store the report in a global variable for potential UI display
    global.defectiveProductsReport = defectiveProducts;
  });
}); 