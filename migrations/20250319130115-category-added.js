module.exports = {
  async up(db, client) {
    await db.collection('category').insertMany([
      { name: 'Technology', description: 'Posts related to tech' },
      { name: 'Health', description: 'Posts related to health and wellness' },
      { name: 'Finance', description: 'Posts related to finance and money' },
    ]);
  },

  async down(db, client) {
    await db.collection('category').deleteMany({
      name: { $in: ['Technology', 'Health', 'Finance'] }
    });
  }
};