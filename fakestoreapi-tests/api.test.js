const fetch = require('node-fetch');

describe('FakeStore API Tests', () => {
  let products;
  let response;

  beforeAll(async () => {
    response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  });

  // Test 1: Verify server response code
  test('API should return 200 status code', () => {
    expect(response.status).toBe(200);
  });

  // Test 2: Check if products array is not empty
  test('Products array should not be empty', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  // Test 3: Validate product attributes
  describe('Product Attributes Validation', () => {
    const defectiveProducts = [];

    test('Each product should have valid attributes', () => {
      products.forEach(product => {
        const defects = [];

        // Check title
        if (!product.title || product.title.trim() === '') {
          defects.push('Empty title');
        }

        // Check price
        if (typeof product.price !== 'number' || product.price < 0) {
          defects.push('Invalid price');
        }

        // Check rating
        if (!product.rating || 
            typeof product.rating.rate !== 'number' || 
            product.rating.rate < 0 || 
            product.rating.rate > 5) {
          defects.push('Invalid rating');
        }

        if (defects.length > 0) {
          defectiveProducts.push({
            id: product.id,
            defects: defects,
            product: product
          });
        }

        // Assertions for each product
        expect(product.title).toBeTruthy();
        expect(product.price).toBeGreaterThanOrEqual(0);
        expect(product.rating.rate).toBeLessThanOrEqual(5);
      });
    });

    // Test 4: Report defective products
    afterAll(() => {
      if (defectiveProducts.length > 0) {
        console.log('\nDefective Products Report:');
        console.log('========================');
        defectiveProducts.forEach(item => {
          console.log(`\nProduct ID: ${item.id}`);
          console.log('Defects found:', item.defects.join(', '));
          console.log('Product details:', JSON.stringify(item.product, null, 2));
        });
      } else {
        console.log('\nNo defective products found.');
      }
    });
  });
}); 