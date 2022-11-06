const orders = require("./order.model");

test("add new incomplete(OrderId) order to the database", async () => {
  const incompleteData = new orders({
    SiteManager: "6361784ffd4e045a5e549e7c",
    Cart: [
      {
        ProductName: "Tokyo Cement",
        ProductId: "P001",
        ProductImage: "1cbc008a-884f-4349-b870-a1d09f3da42e-1667331059454.png",
        Supplier: "Chirath Jayawardena",
        Qty: 2,
        Total: 20000,
        _id: "6363a0919038d683661d33a9",
      },
    ],
    SiteAddress: "Moratuwa",
    DeliveryDate: "2022-11-03T12:42:47.368Z",
    TotalPrice: 120000,
    DeliveryStatus: "Not Delivered",
    Comment: "These products as needed",
    Approval: "Rejected",
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.OrderId).toBeDefined();
  }
});
