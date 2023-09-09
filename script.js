document.addEventListener("DOMContentLoaded", function () {
    // Código JavaScript para el carrusel
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.querySelectorAll(".carousel-slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Cambiar imagen cada 3 segundos
    }

    // Resto del código JavaScript
    const searchForm = document.querySelector("#search-form");
    const resultsContainer = document.querySelector("#results");

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const category = document.querySelector("#category").value;
        const brand = document.querySelector("#brand").value;

        // Llamada a la función para comparar precios
        comparePrices(category, brand);
    });

    function comparePrices(category, brand) {
        // Implementa aquí la lógica para obtener los precios en tiempo real de los sitios web
        // Puedes utilizar técnicas de web scraping o APIs si están disponibles
        // Aquí un ejemplo simplificado:

        const products = [
            { name: "La Colonia", prices: [10.99, ], logo: "Photos/La colonia logo.jpeg" },
            { name: "Paiz", prices: [5.99, ], logo: "Photos/Paiz logo.jpeg" },
            { name: "Walmart", prices: [8.49, ], logo: "Photos/Wallmart logo.png" },
            { name: "Maxidespensa", prices: [7.49, ], logo: "Photos/Maxi despensa.png" },
            // ...
        ];
        

        displayResults(products);
    }

    function displayResults(products) {
        resultsContainer.innerHTML = "";

        let lowestPrice = Number.MAX_VALUE;
        let lowestPriceStore = "";

        products.forEach(product => {
            const minPrice = Math.min(...product.prices);

            if (minPrice < lowestPrice) {
                lowestPrice = minPrice;
                lowestPriceStore = product.name;
            }

            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const pricesList = product.prices.map(price => `<li>${price.toFixed(2)} Lps.</li>`).join('');

            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <ul>${pricesList}</ul>
                <div class="logo"><img src="${product.logo}" alt="${product.name} Logo"></div>
            `;

            resultsContainer.appendChild(productDiv);
        });

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `Supermercados ${lowestPriceStore} tiene los precios más bajos`;
        resultsContainer.appendChild(messageDiv);
    }
});