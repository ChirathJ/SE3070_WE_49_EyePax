const inquiry = require("./inquiry.model");

test("add new incomplete(inquiry) inquiry to the database", async () => {
  const incompleteData = new inquiry({
    Order: "6363b8f02eaa0538e175021d",
    SiteManager: "6361784ffd4e045a5e549e7c",
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.inquiry).toBeDefined();
  }
});
