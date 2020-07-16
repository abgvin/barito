let dbPromised = idb.open("db-madrid", 1, function (upgradeDb) {
  let matchesObjectStore = upgradeDb.createObjectStore("matches", {
    keyPath: "id"
  });
  matchesObjectStore.createIndex("matchday", "matchday", {
    unique: false
  });
});

function saveForlater(matchList) {
  dbPromised.then(function (db) {
      let tx = db.transaction("matches", "readwrite");
      let store = tx.objectStore("matches");
      console.log(matchList.match);
      store.put(matchList.match);
      return tx.complete;
    })
    .then(function () {
      console.log("Match Saved !");
    });
}


function getAllMatches() {
  return new Promise(function (resolve, reject) {
    dbPromised.then(function (db) {
        let tx = db.transaction("matches", "readonly");
        let store = tx.objectStore("matches");
        return store.getAll();
      })
      .then(function (matchList) {
        resolve(matchList);
      })
  })
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("matches", "readonly");
        let store = tx.objectStore("matches");
        let parseId = parseInt(id);
        return store.get(parseId);
      })
      .then(function (matchList) {
        resolve(matchList);
      });
  });
}

function deleteSavedMatch(matchList) {
  dbPromised.then(function (db) {
      let tx = db.transaction("matches", "readwrite");
      let store = tx.objectStore("matches");
      store.delete(matchList.id);
      return tx.complete;
    })
    .then(function () {
      console.log("Match Deleted !");
    });
}