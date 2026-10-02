async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    const cards = document.getElementById("cards");
    
    users.forEach(user => {
      cards.innerHTML += `
        <div class="col-md-4 mb-3">
        <div class="card h-100">
        <div class="card-body">
        <h5 class="card-title">${user.name}</h5>
        <p class="card-text">${user.email}</p>
        <p class="card-text">${user.address.city}</p>
        <p class="card-text">${user.company.name}</p>
        </div>

        </div>

      </div>

        `;
    }
    );
  }
  catch (error) {
    console.log(error);
  }

}
getUsers();
