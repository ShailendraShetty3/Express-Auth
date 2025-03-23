module.exports = {
  async up(db, client) {
    await db.collection('orders').updateMany({}, { $set: { status: "pending" } });
  },

  async down(db, client) {
    await db.collection('orders').updateMany({}, { $unset: { status: "" } });
  }
};
