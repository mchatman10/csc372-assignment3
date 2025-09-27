document.addEventListener("DOMContentLoaded", () => {
    const dishes = document.querySelectorAll(".dish");

    const summaryContainer = document.createElement("div");
    summaryContainer.id = "favorites-summary";

    const summaryTitle = document.createElement("h2");
    summaryTitle.textContent = "Favorites Summary";

    const list = document.createElement("u1");
    list.id = "favorites-list";

    const total = document.createElement("p");
    total.id = "favorites-total";
    total.textContent = "Total: $0.00";

    summaryContainer.appendChild(summaryTitle);
    summaryContainer.appendChild(list);
    summaryContainer.appendChild(total);
    document.body.appendChild(summaryContainer);

    const favorites = new Map();

    dishes.forEach(dish => {
        const name = dish.dataset.name;
        const price = parseFloat(dish.dataset.price);

        const priceTag = document.createElement("span");
        priceTag.classList.add("price-tag");
        priceTag.textContent = `$${price.toFixed(2)}`;
        dish.appendChild(priceTag);

        const button = document.createElement("button");
        button.textContent = "Add to Favorites";
        button.classList.add("fav-btn");
        dish.appendChild(button);

        button.addEventListener("click", () => {
            if (favorites.has(name)) {
                favorites.delete(name);
                button.textContent = "Add to Favorites";
                dish.classList.remove("highlight");

                const item = list.querySelector(`[data-name="${name}"]`);
                if (item) list.removeChild(item);

            } else {
                favorites.set(name, price);
                button.textContent = "Remove from Favorites";
                dish.classList.add("highlight");

                const li = document.createElement("li");
                li.dataset.name = name;
                li.textContent = `${name} - $${price.toFixed(2)}`;
                list.appendChild(li);
            }
            updateTotal();
        });
    });

    function updateTotal() {
        let sum = 0;
        favorites.forEach(val => (sum += val));
        total.textContent = `Total: $${sum.toFixed(2)}`;
    }
});