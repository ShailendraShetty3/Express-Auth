module.exports = {
  async up(db, client) {
    const categories = [
      { name: "Technology", createdAt: new Date(), updatedAt: new Date() },
      { name: "Lifestyle", createdAt: new Date(), updatedAt: new Date() },
      { name: "Education", createdAt: new Date(), updatedAt: new Date() },
    ];

    await db.collection('categories').insertMany(categories);
    console.log("Categories inserted successfully.");
  },

  async down(db, client) {
    await db.collection('categories').deleteMany({
      name: { $in: ["Technology", "Lifestyle", "Education"] }
    });
    console.log("Categories deleted successfully.");
  }
};
