const baseUrl = 'http://localhost:5000/api/';
const itemId = window.location.pathname.split('/')[2];
const fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/6/66/Sin_datos.jpg';

fetch(baseUrl + `products/${itemId}`)
    .then(
        res => res.json()
    ).then(
        res => {
            console.log(res);
            if(res.status === "success"){
                const item = res.data[0];
                document.getElementById('product-image').src = (item.url_image || fallbackImage);
                document.getElementById('product-name').innerHTML = item.name;
                document.getElementById('product-discount-price').innerHTML = (item.discount > 0) ? '$' + item.price : '';
                document.getElementById('product-discount-percent').innerHTML = (item.discount > 0) ? item.discount + '%' : '';
                document.getElementById('product-final-price').innerHTML = '$' + item.price * (1 - (item.discount/100));        
            } else{
                document.getElementsByClassName('product-container')[0].innerHTML = '<h1> El producto no existe. </h1>'
            }
        }
    )
    .catch(
        err => document.getElementsByClassName('product-container')[0].innerHTML = 'Hubo un problema. Por favor, inténtelo más tarde.'
);