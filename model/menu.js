const nedb = require("nedb-promise");
const database = new nedb({ filename: "menu.db", autoload: true });

async function getMenu() {
  return await database.find({});
}

async function addMenu(menu) {
  const result = await database.insert(menu);
  return result;
}

async function removeItem(id) {
  const result = await database.remove({ id: id }, {});
  return result;
}

async function findItem(id) {
  return await database.find({ id: id });
}
module.exports = { getMenu, addMenu, removeItem, findItem };
