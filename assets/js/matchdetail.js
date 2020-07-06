document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");
  let btnSave = document.getElementById("save");
  let btnDelete = document.getElementById("delete");
  let back = document.getElementById("back");

  if (isFromSaved) {
    btnSave.style.display = "none";
    let item = getSavedMatchesById();
    btnDelete.onclick = function () {
      item.then(function (id) {
        deleteSavedMatch(id);
      });
      M.toast({
        html: "Match Deleted",
        completeCallback: () => {
          location.href = './#saved'
        }
      });
    }
  } else {
    let item = getMatchDetail();
    btnSave.onclick = function () {
      M.toast({
        html: "Match Saved",
        completeCallback: () => {
          location.href = './#match'
        }
      });
      btnDelete.style.display = "none";
      item.then(function (matchList) {
        saveForlater(matchList);
      });
    }
  }

});