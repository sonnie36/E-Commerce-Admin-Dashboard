const view = document.querySelector('.all') as HTMLButtonElement;

view.addEventListener('click', () => {

    fetch("http://localhost:3000/gallery", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(
        res => res.json()
    ).then(
        (data: Gallery[]) => {
            const products = document.querySelector('.productDisplay') as HTMLDivElement;
            products.innerHTML = '';
            data.forEach((art:Gallery) => {
                const artDiv = document.createElement('div');
                artDiv.classList.add('artDiv');
                artDiv.innerHTML=`
                <img src="${art.imageURL}" alt="artwork" class="artImage">
                <h3>${art.title}</h3>   
                <p>${art.description}</p>
                <h4>${art.price}</h4>
                <div class="cart"><ion-icon name="cart-outline" class="cartIcon"></ion-icon></div>
                `
                products.appendChild(artDiv);

          
            });
        });
});