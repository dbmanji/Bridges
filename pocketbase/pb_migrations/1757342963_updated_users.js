/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
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

  // update field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "onlyDomains": null,
    "presentable": false,
    "required": true,
    "system": true,
    "type": "email"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ARhgLCDvg6` ON `users` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_JJIC2Hbkru` ON `users` (`username`)",
      "CREATE UNIQUE INDEX `idx_email_pbc_1736455494` ON `users` (`email`) WHERE `email` != ''"
    ]
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": true,
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

  // update field
  collection.fields.addAt(4, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": true,
    "type": "email"
  }))

  return app.save(collection)
})
