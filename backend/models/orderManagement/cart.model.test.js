const cart = require("./cart.model");

test("add new incomplete(ProductName) cart to the database", async () => {
  const incompleteData = new cart({
    SiteManager: "6361784ffd4e045a5e549e7c",
    ProductId: "P001",
    ProductImage: "1cbc008a-884f-4349-b870-a1d09f3da42e-1667331059454.png",
    Supplier: "Chirath Jayawardena",
    Qty: 2,
    Total: 20000,
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.ProductName).toBeDefined();
  }
});
