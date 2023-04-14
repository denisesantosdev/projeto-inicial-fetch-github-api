import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";

import { userObject } from "./objects/userObject.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  getUserProfile(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;
  if (isEnterKeyPressed) {
    getUserData(userName);
  }
});

async function getUserData(userName) {
  const userResponse = await getUser(userName);
  const repositoriesResponse = await getRepositories(userName);

  userObject.setInfo(userResponse);
  userObject.setRepositories(repositoriesResponse);

  screen.renderUser(userObject);

  /* Antes da refatoração
  getUser(userName).then((userData) => {
    let userInfo = `
    <div class="info">
        <img src="${userData.avatar_url} alt="Foto do perfil do usuário"/>
        <div class="data">
            <h1>${userData.name ?? "Usuário não informou nome 😕"}</h1>
            <p>${userData.bio ?? "Usuário não informou bio 😕"}</p>
        </div>
    </div>`;

    document.querySelector(".profile-data").innerHTML = userInfo;

    getUserRepositories(userName);
  }); */
}

  /* 
function getUserRepositories(userName) {
 getRepositories(userName).then((reposData) => {
    let repositoriesItems = "";

    reposData.forEach((repo) => {
      repositoriesItems += `<li><a href="${repo.html_url}">${repo.name}</a></li>`;
    });

    document.querySelector(".profile-data").innerHTML += `
    <div class="repositories section">
        <h2>Repositórios</h2>
        <ul>${repositoriesItems}</ul>
    </div>
        `;
  }); 
}
*/