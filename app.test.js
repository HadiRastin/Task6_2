const { add, subtract, multiply, divide } = require("./arithmetic");

describe("Arithmetic Functions", () => {
  // Test addition
  test("Addition", () => {
    const result = add(5, 3);
    expect(result).toBe(8);
  });

  // Test subtraction
  test("Subtraction", () => {
    const result = subtract(5, 3);
    expect(result).toBe(2);
  });

  // Test multiplication
  test("Multiplication", () => {
    const result = multiply(5, 3);
    expect(result).toBe(15);
  });

  // Test division
  test("Division", () => {
    const result = divide(6, 3);
    expect(result).toBe(2);
  });
});
