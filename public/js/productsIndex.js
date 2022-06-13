// Get all common elements
const productsContainer = document.getElementById('products-container');
const searchCategory = document.getElementById('search-category');
const loaderIcon = document.getElementById('loader-icon')
const fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/6/66/Sin_datos.jpg';

// Set up fetch URL
const baseUrl = 'https://bsale-challenge-server.herokuapp.com/api/';
let currentSearch = 'products?';
let currentSort = '';
let currentPage = '';
let page = 1;

// Function for fetching and rendering products on page
const fetchAndRender = (url) => {
    loaderIcon.style.display='block';
    fetch(url)
        .then(
            res => res.json()
        ).then(
            res => {
            // Clears results if a new kind of search is requested
            if(page <= 1){
                productsContainer.innerHTML = '';
            }
            // If data is successfully retrieved, it is rendered on page
            if(res.status === 'success'){
                res.data.forEach(item => {
                    let newElement = document.createElement('a');
                    newElement.classList.add('product');
                    newElement.href = `/products/${item.id}`;
                    newElement.innerHTML = `
                        <div class="product-image-container">
                            <img class="product-image" src="${item.url_image || fallbackImage}">
                        </div>
                        <div class="product-details">
                            <p class="product-name">${item.name}</p>
                            <div class="product-price">
                                <span class="product-discount-price">${(item.discount > 0) ? item.price : ''} </span>
                                <span class="product-discount-percent">${(item.discount > 0) ? item.discount + '%': ''}</span>
                                <p class="product-final-price">$${parseInt(item.price * (1-(item.discount / 100)))}</p>
                            </div>
                        </div>
                    `;
                productsContainer.appendChild(newElement);
                })
                loaderIcon.style.display='none';
                document.getElementById('load-more-button').style.display = 'block';
            } else{
                loaderIcon.style.display='none', 500;
                document.getElementById('load-more-button').style.display = 'none';
            }      
        }
    )
    .catch(
        err => {
            loaderIcon.style.display='none';
            productsContainer.innerHTML = '<h3>Hubo un problema. Por favor, refresque la página.</h3>'
        }
    );
}

// ==== Define search handling functions ====
// Function for searching by term
const handleSearchTerm = (searchTerm) => {
    page = 1;
    currentSearch = `products?search=${searchTerm}`;
    fetchAndRender(baseUrl + currentSearch + currentSort);
}

// Function for searching by category
const handleCategorySearch = (searchCategory) => {
    page = 1;
    currentSearch = `products?category=${searchCategory}`;
    fetchAndRender(baseUrl + currentSearch + currentSort);
}

// Function for sorting if needed
const handleSort = (sortType) => {
    page = 1;
    currentSort = '&sort=' + sortType;
    fetchAndRender(baseUrl + currentSearch + currentSort);
}

// Function for loading more data based on 'page'
const handlePage = () => {
    page += 1;
    currentPage = '&page=' + (page);
    fetchAndRender(baseUrl + currentSearch + currentSort + currentPage);
}

// ==== Add listeners to fetch data when required ====
// Listener for navbar search term
document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault();
    window.location.href = '#products-container';
    handleSearchTerm(document.getElementById('search-term').value);
});

// Listener for category list
document.getElementById('search-category').addEventListener('change', e => {
    e.preventDefault();
    window.location.href = '#products-container';
    handleCategorySearch(document.getElementById('search-category').value);
});

// Listener for radio-button sort
document.querySelectorAll('input[name="filter"]').forEach(elem => {
    elem.addEventListener('change', e => {
        e.preventDefault();
        window.location.href = '#products-container';
        handleSort(document.querySelector('input[name="filter"]:checked').value);
    })
});

// Listener for load more button
document.getElementById('load-more-button').addEventListener('click', e => {
    handlePage();
})

// ===== After page load ====
// Execute initial render
fetchAndRender(baseUrl + 'products');

// Fill categories selector
fetch(baseUrl + 'categories')
    .then(
        res => res.json()
    ).then(
        res => {
        searchCategory.innerHTML = '<option value="category">Todas las categorías</option>';
            if(res.status === 'success'){
                res.data.forEach(item => {
                    let newElement = document.createElement('option');
                    newElement.value = item.id;
                    newElement.innerHTML = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                    searchCategory.appendChild(newElement);
                })
            } else{
                searchCategory.innerHTML = '<option value="category">Todas las categorías</option>';
            }      
        }
    )
    .catch(
        err => searchCategory.innerHTML = '<option value="category">Todas las categorías</option>'
);