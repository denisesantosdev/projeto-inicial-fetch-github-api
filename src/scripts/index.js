import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  console.log(userName);
  if (validateEmptyInput(userName)) {
    return;
  }
  getUserProfile(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;
  if (isEnterKeyPressed) {
    getUserData(userName);
  }

  validateEmptyInput(userName);
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com o nome de usuário");
    return true;
  }
}

async function getUserData(userName) {
  const userResponse = await getUser(userName);

  if(userResponse.message==="Not Found"){
    screen.renderNotFound()
    return
  }

  const repositoriesResponse = await getRepositories(userName);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);

  screen.renderUser(user);
  
}

/* 
Você precisa mostrar também

Número de seguidores do usuário
userResponse.followers

Número de pessoas que o usuário está
seguindo 
userResponse.following
*/