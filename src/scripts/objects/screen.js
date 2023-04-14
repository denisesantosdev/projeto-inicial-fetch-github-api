const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `
    <div class="info">
        <img src="${user.avatarUrl} alt="Foto do perfil do usuário"/>
        <div class="data">
            <h1>${user.name ?? "Usuário não informou nome 😕"}</h1>
            <p>${user.bio ?? "Usuário não informou bio 😕"}</p>
        </div>
    </div>`;

    let repositoriesItens = ''
    user.repositories.forEach(repo => {
        repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
    });

    if(user.repositories.length > 0){
        this.userProfile.innerHTML += `
        <div class="repositories section">
            <h2>
                <ul>${repositoriesItens}</ul>
            </h2>
        </div>`
    }
  },
};

export { screen };
