const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    if (formData.name === "" || formData.email === "" || formData.message === "") {
        alert("Please fill in all fields.");
        return;
    }
    alert("Thank you, " + formData.name + "! Your message has been received.");
    form.reset();
    const result = document.getElementById("result");

  try {
    const response = await fetch(
      "http://localhost:3000/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Submission failed");
    }

    result.textContent = data.message;
    form.reset();
  } catch (error) {
    result.textContent = "Unable to send your message.";
    console.error(error);
  }
});

const message = document.querySelector("#welcome-message");
message.textContent = "Welcome! Enjoy your coffee.";

const specialButton = document.querySelector("#special-button");
const special = document.querySelector("#special");
specialButton.addEventListener("click", function() {
    special.textContent = "Today's special: Iced Latte - $4.50";
});


const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKdcLXYCRCjXZGdeZ3eU1oU1YtqRdlUeag4qxXJsUu6un145ij_HZC3H3DyU8gTe0oSA/exec";

function loadMenu() {
    const menuContainer = document.getElementById("menu-container");

    if (!menuContainer) {
        console.error('Could not find element with id="menu-container".');
        return;
    }

    menuContainer.textContent = "Loading menu...";

    // Create a globally accessible callback for the JSONP response.
    window.showMenu = function (products) {
        try {
            menuContainer.replaceChildren();

            if (!Array.isArray(products) || products.length === 0) {
                menuContainer.textContent = "No menu items available.";
                return;
            }

            products.forEach(function (product) {
                const card = document.createElement("div");
                card.className = "menu-item";

                const name = document.createElement("h3");
                name.textContent = product.name ?? "";

                const description = document.createElement("p");
                description.textContent = product.description ?? "";

                const price = document.createElement("p");
                const numericPrice = Number(product.price);
                price.textContent = Number.isFinite(numericPrice)
                    ? `$${numericPrice.toFixed(2)}`
                    : "Price unavailable";

                card.append(name, description, price);
                menuContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error displaying menu:", error);
            menuContainer.textContent = "Unable to display the menu.";
        }
    };

    const script = document.createElement("script");
    script.src = SCRIPT_URL + "?callback=showMenu";
    script.onerror = function () {
        menuContainer.textContent = "Unable to load the menu. Please try again later.";
        console.error("Could not load the Apps Script API.");
        delete window.showMenu;
    };

    document.body.appendChild(script);
}

// Load the menu when the page is ready.
document.addEventListener("DOMContentLoaded", loadMenu);


loadMenu();