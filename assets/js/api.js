let base_url = "https://api.football-data.org/";
const idTeam = "86";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getTeam() {
  if ("caches" in window) {
    caches.match(base_url + "v2/teams/" + idTeam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let myteamHTML = "";
          myteamHTML += `
              <div class="row center-align">
                <div class="col s12 m12 l12">
                  <div class="card card-team darken-1 center-align">
                    <div class="card-content white-text">
                      <img src="${data.crestUrl}" alt="" class="circle team-logo" />
                      <h3>
                        ${data.name}
                      </h3>
                      <p>${data.shortName} | ${data.address} | ${data.phone}</p>
                      <p>
                        <a a href = "${data.website}" > ${data.website}</a>
                        | ${data.email}
                      </p>
                    </div>
                    <div class="card-action center-align">
                      <a href="${data.website}" target="_blank" class="btn waves-effect btn-small pink">Official Website</a> 
                    </div>
                  </div>
                </div>
              </div>
            `;
          let teamElemen = document.getElementById("team-header");
          if (teamElemen !== null) {
            document.getElementById("team-header").innerHTML = myteamHTML;
          }
        });
      }
    });
  }

  fetch(base_url + "v2/teams/" + idTeam, {
      headers: {
        "X-Auth-Token": "04804e896c6c4bff9aee42fa36a95b14",
      },
    })
    .then(status)
    .then(json)
    .then(function (data) {
      let myteamHTML = "";
      myteamHTML += `
        <div class="row center-align">
          <div class="col s12 m12 l12">
            <div class="card card-team darken-1 center-align">
              <div class="card-content white-text">
                <img src="${data.crestUrl}" alt="" class=" team-logo" />
                <h3>
                  ${data.name}
                </h3>
                <p>${data.shortName} | ${data.address} | ${data.phone}</p>
                <p>
                  <a a href = "${data.website}" > ${data.website}</a>
                  | ${data.email}
                </p>
              </div>
              <div class="card-action center-align">
                <a href="${data.website}" target="_blank" class="btn waves-effect btn-small pink">Official Website</a>
              </div>
            </div>
          </div>
        </div>
      `;
      let teamElemen = document.getElementById("team-header");
      if (teamElemen !== null) {
        document.getElementById("team-header").innerHTML = myteamHTML;
      }
    })
  // .catch(error);
}

function getSquad() {
  if ("caches" in window) {
    caches.match(base_url + "v2/teams/" + idTeam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let squadmemberHTML = `
                <div class="row center-align">
                  <h5 class="center-align">Squad</h5>
                  <div class="col s12 m12 l8 offset-l2">
                    <div class="card darken-1">
                      <table class="centered">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Nationality</th>
                          </tr>
                        </thead>
                        <tbody>
              `;
          let i = 1;
          data.squad.forEach(function (member) {
            squadmemberHTML += `
                  <tr>
                    <td>${i++}</td>
                    <td>${member.name}</td>
                    <td>${
                      member.position == null ? "Coach" : member.position
                    }</td>
                    <td>${member.nationality}</td>
                  </tr>
                  `;
          });
          squadmemberHTML += `
          </tbody>
        </table>
      </div>
      </div>
      </div>
      `;
          let squadMember = document.getElementById("squad-member");
          if (squadMember !== null) {
            document.getElementById("squad-member").innerHTML = squadmemberHTML;
          }
        });
      }
    });
  }

  fetch(base_url + "v2/teams/" + idTeam, {
      headers: {
        "X-Auth-Token": "04804e896c6c4bff9aee42fa36a95b14",
      },
    })
    .then(status)
    .then(json)
    .then(function (data) {
      let squadmemberHTML = `
         <div class="row center-align">
          <h5 class="center-align">Squad</h5>
          <div class="col s12 m12 l8 offset-l2">
            <div class="card darken-1">
              <table class="centered">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Nationality</th>
                  </tr>
                </thead>
                <tbody>
      `;
      let i = 1;
      data.squad.forEach(function (member) {
        squadmemberHTML += `
        <tr>
          <td>${i++}</td>
          <td>${member.name}</td>
          <td>${member.position == null ? "Coach" : member.position}</td>
          <td>${member.nationality}</td>
        </tr>
        `;
      });
      squadmemberHTML += `
          </tbody>
        </table>
      </div>
      </div>
      </div>
      `;
      let squadMember = document.getElementById("squad-member");
      if (squadMember !== null) {
        document.getElementById("squad-member").innerHTML = squadmemberHTML;
      }
    })
  // .catch(error);
}

function getMatch() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/teams/" + idTeam + "/matches")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamMatchHTML = `
                <div class="row center-align">
                    <h5 class="center-align">Team Match</h5>
                    <div class="col s12 m12 l12">
                      <div class="card shadow-none">
                        <table class="centered responsive-table">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Home</th>
                              <th>Away</th>
                              <th>Time</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>

                `;
            let no = 1;
            data.matches.forEach(function (match) {
              let day = new Date(match.utcDate).toISOString().slice(0, 10);
              teamMatchHTML += `
                  <tr>
                    <td>${no++}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.awayTeam.name}</td>
                    <td>${day}</td>
                    <td>${match.status === 'FINISHED' ? '<i class="tiny material-icons">done</i>' : '<i class="tiny material-icons">timer</i>'}</td>
                    <td><a class="btn btn-small" href="matchdetail.html?id=${match.id}">Detail</a></td>
                  </tr>      
        `;
            });
            teamMatchHTML += `
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
            let matchElemen = document.getElementById("match");
            if (matchElemen !== null) {
              document.getElementById("match").innerHTML = teamMatchHTML;
            }
          });
        }
      });
  }

  fetch(base_url + "v2/teams/" + idTeam + "/matches", {
      headers: {
        "X-Auth-Token": "04804e896c6c4bff9aee42fa36a95b14",
      },
    })
    .then(status)
    .then(json)
    .then(function (data) {
      let teamMatchHTML = `
       <div class="row center-align">
          <h5 class="center-align">Team Match</h5>
          <div class="col s12 m12 l12">
            <div class="card shadow-none">
              <table class = "centered responsive-table" >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Home</th>
                    <th>Away</th>
                    <th>Day</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
      
      `;
      let no = 1;
      data.matches.forEach(function (match) {
        let day = new Date(match.utcDate).toISOString().slice(0, 10);
        teamMatchHTML += `
                  <tr>
                    <td>${no++}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.awayTeam.name}</td>
                    <td>${day}</td>
                    <td>${match.status === 'FINISHED' ? '<i class="tiny material-icons">done</i>' : '<i class="tiny material-icons">timer</i>'}</td>
                    <td><a class="btn btn-small" href="matchdetail.html?id=${match.id}">Detail</a></td>
                  </tr>        
        `;
      });
      teamMatchHTML += `
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      let matchElemen = document.getElementById("match");
      if (matchElemen !== null) {
        document.getElementById("match").innerHTML = teamMatchHTML;
      }
    })
  // .catch(error);
}

function getMatchDetail() {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(base_url + "v2/matches" + idParam)
        .then(function (response) {
          if (response) {
            response.json()
              .then(function (data) {
                let matchdetailHTML = `
              <div class="row">
              <div class="col s12 m12 l8 offset-l2>
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <h5 class="">Match Detail</h5>
                    <hr>
                    <br>
                    <div class="row">
                      <div class="col s4 m4 l4">
                        <h6>${data.match.homeTeam.name}</h6>
                      </div>
                      <div class="col s4 m4 l4">
                        <span> ${data.match.score.fullTime.homeTeam ?? "-"} : ${data.match.score.fullTime.awayTeam ?? "-"} </span>
                      </div>
                      <div class="col s4 m4 l4">
                        <h6>${data.match.awayTeam.name}</h6>
                      </div>
                    </div>
                    <table class="centered highlight">
                      <thead>
                        <tr>
                          <th>Home</th>
                          <th> </th>
                          <th>Away</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span>${data.match.score.halfTime.homeTeam ?? "-"}</span></td>
                          <td>
                            <p>Half Time</p>
                          </td>
                          <td><span>${data.match.score.halfTime.awayTeam ?? "-"}</span></td>
                        </tr>
                        <tr>
                          <td><span>${data.match.score.extraTime.homeTeam ?? "-"}</span></td>
                          <td>
                            <p>Extra Time</p>
                          </td>
                          <td><span>${data.match.score.extraTime.awayTeam ?? "-"}</span></td>
                        </tr>
                        <tr>
                          <td><span>${data.match.score.penalties.homeTeam ?? "-"}</span></td>
                          <td>
                            <p>Penalties</p>
                          </td>
                          <td><span>${data.match.score.penalties.awayTeam ?? "-"}</span></td>
                        </tr>
                        <tr>
                          <td><span>${data.match.score.fullTime.homeTeam ?? "-"}</span></td>
                          <td>
                            <p>Full Time</p>
                          </td>
                          <td><span>${data.match.score.fullTime.awayTeam ?? "-"}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
              `;
                document.getElementById("match-detail").innerHTML = matchdetailHTML;
                resolve(data);
              })
          }
        })
    }

    fetch(base_url + "v2/matches/" + idParam, {
        headers: {
          "X-Auth-Token": "04804e896c6c4bff9aee42fa36a95b14",
        }
      })
      .then(status)
      .then(json)
      .then(function (data) {
        let matchdetailHTML = `
      <div class="row">
      <div class="col s12 m12 l8 offset-l2">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h5 class="">Match Detail</h5>
            <hr>
            <br>
            <div class="row">
              <div class="col s4 m4 l4">
                <h6>${data.match.homeTeam.name}</h6>
              </div>
              <div class="col s4 m4 l4">
                <span> ${data.match.score.fullTime.homeTeam ?? "-"} : ${data.match.score.fullTime.awayTeam ?? "-"} </span>
              </div>
              <div class="col s4 m4 l4">
                <h6>${data.match.awayTeam.name}</h6>
              </div>
            </div>
            <table class="centered highlight">
              <thead>
                <tr>
                  <th>Home</th>
                  <th> </th>
                  <th>Away</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span>${data.match.score.halfTime.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Half Time</p>
                  </td>
                  <td><span>${data.match.score.halfTime.awayTeam ?? "-"}</span></td>
                </tr>
                <tr>
                  <td><span>${data.match.score.extraTime.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Extra Time</p>
                  </td>
                  <td><span>${data.match.score.extraTime.awayTeam ?? "-"}</span></td>
                </tr>
                <tr>
                  <td><span>${data.match.score.penalties.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Penalties</p>
                  </td>
                  <td><span>${data.match.score.penalties.awayTeam ?? "-"}</span></td>
                </tr>
                <tr>
                  <td><span>${data.match.score.fullTime.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Full Time</p>
                  </td>
                  <td><span>${data.match.score.fullTime.awayTeam ?? "-"}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      `;
        document.getElementById("match-detail").innerHTML = matchdetailHTML;
        resolve(data);
      })
      .catch(error())
  })
}

function getStanding() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/2014/standings")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let standingsHTML = `
                <div class="row center-align">
                  <h5 class="center-align">La Liga Standing</h5>
                  <div class="col s12 m12 l8 offset-l2">
                    <div class="card shadow-none">
                      <table class="centered">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Team</th>
                            <th>Played</th>
                            <th>Won</th>
                            <th>Points</th>
                          </tr>
                        </thead>
                        <tbody>
              `;
            data.standings[0].table.forEach(function (table) {
              standingsHTML += `
                  <tr>
                    <td>${table.position}</td>
                    <td><img src="${table.team.crestUrl}" alt="${table.team.name}"></td>
                    <td>${table.playedGames}</td>
                    <td>${table.won}</td>
                    <td>${table.points}</td>
                  </tr>
                `;
            });
            standingsHTML += `
                </tbody>
            </table>
          </div>
        </div>
      </div>
          `;
            let standingElemen = document.getElementById("standing");
            if (standingElemen !== null) {
              document.getElementById("standing").innerHTML = standingsHTML;
            }
          });
        }
      });
  }

  fetch(base_url + "v2/competitions/2014/standings", {
      headers: {
        "X-Auth-Token": "04804e896c6c4bff9aee42fa36a95b14",
      },
    })
    .then(status)
    .then(json)
    .then(function (data) {
      let standingsHTML = `
      <div class="row center-align">
        <h5 class="center-align">La Liga Standing</h5>
        <div class="col s12 m12 l8 offset-l2">
          <div class="card shadow-none">
            <table class="centered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Team</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
    `;
      data.standings[0].table.forEach(function (table) {
        standingsHTML += `
        <tr>
          <td>${table.position}</td>
          <td><img src="${table.team.crestUrl}" alt="${table.team.name}"></td>
          <td>${table.playedGames}</td>
          <td>${table.won}</td>
          <td>${table.points}</td>
        </tr>
      `;
      });
      standingsHTML += `
                </tbody>
            </table>
          </div>
        </div>
      </div>
          `;
      let standingElemen = document.getElementById("standing");
      if (standingElemen !== null) {
        document.getElementById("standing").innerHTML = standingsHTML;
      }
    })
    .catch(error())
}

function getTopScorer() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/SA/scorers")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let topscoreHTML = `
                <div class="row center-align">
                  <h5 class="center-align">La Liga Top Scorer</h5>
                  <div class="col s12 m12 l8 offset-l2">
                    <div class="card shadow-none">
                      <table class="centered">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Number Of Goals</th>
                          </tr>
                        </thead>
                        <tbody>
              `;
            let i = 1;
            data.scorers.forEach(function (table) {
              topscoreHTML += `
                  <tr>
                    <td>${i++}</td>
                    <td>${table.player.name}</td>
                    <td>${table.team.name}</td>
                    <td>${table.numberOfGoals}</td>
                  </tr>
                `;
            });
            topscoreHTML += `
                    </tbody>
                </table>
              </div>
            </div>
          </div>
          `;
            let topscorerElemen = document.getElementById("topscorer");
            if (topscorerElemen !== null) {
              document.getElementById("topscorer").innerHTML = topscoreHTML;
            }
          });
        }
      });
  }

  fetch(base_url + "v2/competitions/SA/scorers", {
      headers: {
        "X-Auth-Token": "04804e896c6c4bff9aee42fa36a95b14",
      },
    })
    .then(status)
    .then(json)
    .then(function (data) {
      let topscoreHTML = `
      <div class="row center-align">
        <h5 class="center-align">La Liga Top Scorer</h5>
        <div class="col s12 m12 l8 offset-l2">
          <div class="card shadow-none">
            <table class="centered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Number Of Goals</th>
                </tr>
              </thead>
              <tbody>
    `;
      let i = 1;
      data.scorers.forEach(function (table) {
        topscoreHTML += `
        <tr>
          <td>${i++}</td>
          <td>${table.player.name}</td>
          <td>${table.team.name}</td>
          <td>${table.numberOfGoals}</td>
        </tr>
      `;
      });
      topscoreHTML += `
                </tbody>
            </table>
          </div>
        </div>
      </div>
          `;
      let topscorerElemen = document.getElementById("topscorer");
      if (topscorerElemen !== null) {
        document.getElementById("topscorer").innerHTML = topscoreHTML;
      }
    })
  // .catch(error);
}

function getSavedMatches() {
  getAllMatches().then(function (matches) {
    let matchesHTML = `
    <div class="row center-align">
      <h5 class="center-align">Saved Match</h5>
      <p>If you has saved matches, <br>
        you can see it below
      </p>
      <div class="col s12 m12 l12">
        <div class="card shadow-none">
          <table class="centered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Home</th>
                <th>Away</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
    `;
    let no = 1;
    matches.forEach(function (match) {
      let day = new Date(match.utcDate).toISOString().slice(0, 10);
      matchesHTML += `
        <tr>
          <td>${no++}</td>
          <td>${match.homeTeam.name}</td>
          <td>${match.awayTeam.name}</td>
          <td>${day}</td>
          <td>${match.status === 'FINISHED' ? '<i class="tiny material-icons">done</i>' : '<i class="tiny material-icons">timer</i>'}</td>
          <td><a class="btn btn-small" href="matchdetail.html?id=${match.id}&saved=true">Detail</td>
        </tr>   
      `;
    });
    matchesHTML += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `;
    let mathcesElemen = document.getElementById("saved-matches");
    if (mathcesElemen !== null) {
      document.getElementById("saved-matches").innerHTML = matchesHTML;
    }
  })
}

function getSavedMatchesById() {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    getById(idParam).then(function (data) {
      let matchdetailHTML = `
      <div class="row">
      <div class="col s12 m12 l8 offset-l2">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h5 class="">Match Detail</h5>
            <hr>
            <br>
            <div class="row">
              <div class="col s4 m4 l4">
                <h6>${data.homeTeam.name}</h6>
              </div>
              <div class="col s4 m4 l4">
                <span> ${data.score.fullTime.homeTeam ?? "-"} : ${data.score.fullTime.awayTeam ?? "-"} </span>
              </div>
              <div class="col s4 m4 l4">
                <h6>${data.awayTeam.name}</h6>
              </div>
            </div>
            <table class="centered highlight">
              <thead>
                <tr>
                  <th>Home</th>
                  <th> </th>
                  <th>Away</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span>${data.score.halfTime.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Half Time</p>
                  </td>
                  <td><span>${data.score.halfTime.awayTeam ?? "-"}</span></td>
                </tr>
                <tr>
                  <td><span>${data.score.extraTime.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Extra Time</p>
                  </td>
                  <td><span>${data.score.extraTime.awayTeam ?? "-"}</span></td>
                </tr>
                <tr>
                  <td><span>${data.score.penalties.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Penalties</p>
                  </td>
                  <td><span>${data.score.penalties.awayTeam ?? "-"}</span></td>
                </tr>
                <tr>
                  <td><span>${data.score.fullTime.homeTeam ?? "-"}</span></td>
                  <td>
                    <p>Full Time</p>
                  </td>
                  <td><span>${data.score.fullTime.awayTeam ?? "-"}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      `;
      document.getElementById("match-detail").innerHTML = matchdetailHTML;
      resolve(data);
    });
  })
}