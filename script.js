const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const message = document.querySelector("textarea").value;
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }
    alert("Thank you, " + name + "! Your message has been received.");
    form.reset();
});

const message = document.querySelector("#welcome-message");
message.textContent = "Welcome! Enjoy your coffee.";

const specialButton = document.querySelector("#special-button");
const special = document.querySelector("#special");
specialButton.addEventListener("click", function() {
    special.textContent = "Today's special: Iced Latte - $4.50";
});

async function loadMenu() {
    const menuContainer = document.getElementById('menu-container');

    try {
        const response = await fetch('https://bean-brew-backend.onrender.com/api/menu');

        if (!response.ok) {
            throw new Error('Failed to load menu');
        }

        const menuItems = await response.json();

        menuContainer.replaceChildren();

        menuItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-item';

            const name = document.createElement('h3');
            name.textContent = item.name;

            const description = document.createElement('p');
            description.textContent = item.description || '';

            const price = document.createElement('p');
            price.textContent =
                '$' + Number(item.price).toFixed(2);

            card.append(name, description, price);
            menuContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading menu:', error);
        menuContainer.textContent =
            'Sorry, the menu is temporarily unavailable.';
    }
}

loadMenu();