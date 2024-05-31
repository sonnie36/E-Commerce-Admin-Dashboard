interface Gallery {
    id: string;
    imageURL: string;
    title: string;
    description: string;
    price: string;
}

const displayProducts = (): void => {
    fetch("http://localhost:3000/gallery", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
      .then((data: Gallery[]) => {
          const products = document.querySelector('.productDisplay') as HTMLDivElement;
          products.innerHTML = '';
          data.forEach((art: Gallery) => {
              const artDiv = document.createElement('div');
              artDiv.classList.add('artDiv');
              artDiv.innerHTML = `
                  <img src="${art.imageURL}" alt="artwork" class="artImage">
                  <h3>${art.title}</h3>   
                  <p>${art.description}</p>
                  <h4>${art.price}</h4>
                  <div class="cartDiv" data-id="${art.id}">
                      <ion-icon name="cart-outline" class="cartIcon"></ion-icon>
                  </div>
              `;
              products.appendChild(artDiv);


              const cartIcon = artDiv.querySelector('.cartIcon') as HTMLElement;
              cartIcon.addEventListener('click', () => {
                  addToCart(art.id);
              });
          });
      }).catch(error => console.error('Error fetching products:', error));
};

const addToCart = (productId: string): void => {
    fetch("http://localhost:3000/cart", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId, quantity: 1 }) 
    }).then(res => res.json())
      .then(data => {
          console.log('Item added to cart:', data);
          
          alert('Item added to cart!');
       
         
      }).catch(error => console.error('Error adding item to cart:', error));
};

document.querySelector('.addCart')?.addEventListener('click', () => {
    window.location.href = 'cart.html';
});
displayProducts();
