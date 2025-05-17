const { mockProducts } = require('./mockData');

// Validation function to check product defects
function validateProduct(product) {
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

  return defects;
}

// Function to generate list of defective products
function generateDefectiveProductsList(products) {
  return products
    .map(product => {
      const defects = validateProduct(product);
      if (defects.length > 0) {
        return {
          id: product.id,
          defects: defects,
          product: product
        };
      }
      return null;
    })
    .filter(item => item !== null);
}

describe('Product Validation and Defect List Generation Tests', () => {
  let defectiveProducts;

  beforeAll(() => {
    defectiveProducts = generateDefectiveProductsList(mockProducts);
  });

  describe('Defect Detection Tests', () => {
    test('Should detect empty title (Product ID: 3)', () => {
      const product = defectiveProducts.find(p => p.id === 3);
      expect(product).toBeDefined();
      expect(product.defects).toContain('Empty title');
    });

    test('Should detect negative price (Product ID: 4)', () => {
      const product = defectiveProducts.find(p => p.id === 4);
      expect(product).toBeDefined();
      expect(product.defects).toContain('Invalid price');
    });

    test('Should detect rating exceeding maximum (Product ID: 5)', () => {
      const product = defectiveProducts.find(p => p.id === 5);
      expect(product).toBeDefined();
      expect(product.defects).toContain('Invalid rating');
    });

    test('Should detect multiple defects (Product ID: 6)', () => {
      const product = defectiveProducts.find(p => p.id === 6);
      expect(product).toBeDefined();
      expect(product.defects).toContain('Empty title');
      expect(product.defects).toContain('Invalid rating');
      expect(product.defects.length).toBe(2);
    });

    test('Should detect missing rating property (Product ID: 7)', () => {
      const product = defectiveProducts.find(p => p.id === 7);
      expect(product).toBeDefined();
      expect(product.defects).toContain('Invalid rating');
    });
  });

  describe('Defective Products List Generation Tests', () => {
    test('Should not include valid products in defective list', () => {
      const validProductIds = [1, 2];
      validProductIds.forEach(id => {
        expect(defectiveProducts.find(p => p.id === id)).toBeUndefined();
      });
    });

    test('Should include all defective products in the list', () => {
      const defectiveProductIds = [3, 4, 5, 6, 7];
      defectiveProductIds.forEach(id => {
        expect(defectiveProducts.find(p => p.id === id)).toBeDefined();
      });
    });

    test('Should generate correct number of defective products', () => {
      expect(defectiveProducts.length).toBe(5);
    });

    test('Each defective product should have required properties', () => {
      defectiveProducts.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('defects');
        expect(Array.isArray(item.defects)).toBe(true);
        expect(item.defects.length).toBeGreaterThan(0);
        expect(item).toHaveProperty('product');
      });
    });
  });

  // Generate detailed report of defective products
  afterAll(() => {
    console.log('\nDefective Products Report');
    console.log('=======================');
    console.log(`Total Products Analyzed: ${mockProducts.length}`);
    console.log(`Defective Products Found: ${defectiveProducts.length}`);
    console.log('\nDetailed Defect Analysis:');
    
    defectiveProducts.forEach(item => {
      console.log(`\nProduct ID: ${item.id}`);
      console.log(`Title: ${item.product.title}`);
      console.log('Defects found:', item.defects.join(', '));
      console.log('Full product details:', JSON.stringify(item.product, null, 2));
    });

    // Generate defect statistics
    const defectTypes = {};
    defectiveProducts.forEach(item => {
      item.defects.forEach(defect => {
        defectTypes[defect] = (defectTypes[defect] || 0) + 1;
      });
    });

    console.log('\nDefect Statistics:');
    Object.entries(defectTypes).forEach(([defect, count]) => {
      console.log(`${defect}: ${count} occurrences`);
    });
  });
}); 