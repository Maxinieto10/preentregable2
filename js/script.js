document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('stockForm');
    const productTableBody = document.querySelector('#productTable tbody');


    loadProducts();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = document.getElementById('productName').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const price = document.getElementById('price').value.trim();

        if (productName === '' || quantity === '' || price === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        const product = {
            name: productName,
            quantity: parseInt(quantity),
            price: parseFloat(price).toFixed(2)
        };

        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);

        localStorage.setItem('products', JSON.stringify(products));

        updateTable();

        form.reset();
    });

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => {
            addProductToTable(product);
        });
    }

    function updateTable() {
        productTableBody.innerHTML = '';

        const products = JSON.parse(localStorage.getItem('products')) || [];

        products.forEach(product => {
            addProductToTable(product);
        });
    }

    function addProductToTable(product) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${product.price}`;

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);

        productTableBody.appendChild(row);
    }
});


