const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// search states.json and filter it
const searchStates = async searchText => {
  const res = await fetch("../data/states.json");
  const states = await res.json();
  matchList.innerHTML = "";
  // get matches to current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
  }

  outPutHtml(matches);
};

outPutHtml = matches => {
  matches.forEach(match => {
    let html = `
    <div class="row mb-2">
              <div class="col-10 bg-secondary m-auto">
                <h5 class="text-light font-weight-bold mt-2">
                  ${match.name} (${match.abbr}) <span class="text-primary">${
      match.capital
    }</span>
                </h5>
                <p>Lat: ${match.lat} / Long ${match.long}</p>
              </div>
            </div>
    `;
    matchList.innerHTML += html;
  });
};

search.addEventListener("input", () => searchStates(search.value));
