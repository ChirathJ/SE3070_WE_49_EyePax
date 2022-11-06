const products = require("./product.model");

test("add new incomplete(ProductCode) product to the database", async () => {
  const incompleteData = new products({
    ProductName: "GI Pipe",
    Description: "Gi Pipe",
    Qty: 5,
    Price: 1000,
    Status: "Rejected",
    Image: "6de745e8-16b6-4cb3-b291-ee967eebecb9-1667718636898.jpg",
    user: "635cdf95dfeee05440cfc03a",
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.ProductCode).toBeDefined();
  }
});
