module.exports = {
  async up(db, client) {
    // Add 'user' field to all existing documents if it doesn't exist
    await db.collection('tasks').updateMany(
      { user: { $exists: false } },
      { $set: { user: null } } // Initially set as null or you can use a default user ID
    );
  },

  async down(db, client) {
    // Rollback: remove the 'user' field from all documents
    await db.collection('tasks').updateMany(
      {},
      { $unset: { user: "" } }
    );
  }
};
