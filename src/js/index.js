const input = document.getElementById('input-search')
const btn = document.getElementById('btn-search')
const baseUrl = 'https://api.github.com/users'
const profileResults = document.querySelector('.profile-results')

btn.addEventListener('click', async () => {
    const userName = input.value
    if (userName) {
        profileResults.innerHTML = `<p class="loading">Carregando...</p>`;

        try {
            //Aqui você pode adicionar a lógica para usar o valor do input

            const response = await fetch(`${baseUrl}/${userName}`)

            if (!response.ok) {
                alert('Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.')
                profileResults.innerHTML = "";

                return;
            }
            const userData = await response.json()
            console.log(userData); // Apenas para verificar se os dados foram obtidos corretamente.
            // console.log(userData.avatar_url);
            // console.log(userData.name);
            // console.log(userData.bio);
            // console.log(userData.followers);
            // console.log(userData.following);

            profileResults.innerHTML = `
            <div class="profile-card">
                <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
                <div class="profile-info">
                <h2>${userData.name}</h2>
                <p>${userData.bio || 'Não possui bio cadastrada😢.'}</p>
                </div>
            </div>
            `
        } catch (error) {
            console.error('Erro ao buscar o perfil do usuário', error)
            alert('Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente mais tarde.')
            profileResults.innerHTML = "";

        }
    } else {
        alert('Por favor, digite um nome de usuário do GitHub')
        profileResults.innerHTML = "";
    }
})



