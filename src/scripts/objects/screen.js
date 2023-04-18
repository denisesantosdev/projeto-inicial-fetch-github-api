const screen = {
  userProfile: document.querySelector(".profile-data"),
  userEvents: document.querySelector(".events-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `
    <div class="info">
        <img src="${user.avatarUrl} alt="Foto do perfil do usuário"/>
        <div class="data">
            <h1>${user.name ?? "Usuário não informou nome 😕"}</h1>
            <p>${user.bio ?? "Usuário não informou bio 😕"}</p>
            <p>👥Seguidores: ${user.followers}</p>
            <p>👥Seguindo: ${user.following}</p>
        </div>
    </div>`;

    let repositoriesItens = "";
    user.repositories.forEach((repo) => {
      repositoriesItens += `
      <li>
        <a href="${repo.html_url}" target="_blank">${repo.name}
        <div class="repo-info">
          <span>🍴 ${repo.forks}</span>
          <span>⭐ ${repo.stargazers_count}</span>
          <span>👀 ${repo.watchers_count}</span>
          <span>👩‍💻 ${repo.language ?? "Linguagem não encontrada"}</span>
        </div>
        </a>
      </li>`;
    });

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `
        <div class="repositories section">
            <h2>
                <ul>${repositoriesItens}</ul>
            </h2>
        </div>`;
    }

    let repoName = [];
    let eventMessage = [];
    this.userEvents.innerHTML = "<h2>Eventos</h2>";

    user.events.forEach((event) => {
      if (event.type === "CreateEvent" || event.type === "PushEvent") {
        repoName = event.repo.name;
        eventMessage = event.payload.commits ?? "Sem mensagem";
        this.userEvents.innerHTML += `
        <div>
          <ul>
            <li><span class="repo-name">${repoName}</span> - ${
          eventMessage[0].message ?? "Sem mensagem"
        }</li>
          </ul>
        <div>
        `;
      }
    });
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
