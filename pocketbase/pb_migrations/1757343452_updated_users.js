/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ARhgLCDvg6` ON `users` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_1736455494` ON `users` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `idx_DNK4Y6ks8L` ON `users` (`username`)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4166911607",
    "max": 0,
    "min": 0,
    "name": "username",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ARhgLCDvg6` ON `users` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_1736455494` ON `users` (`email`) WHERE `email` != ''"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("text4166911607")

  return app.save(collection)
})
