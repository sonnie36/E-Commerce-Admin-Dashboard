"use strict";
const fetchGalleryItem = (id) => {
    return fetch(`http://localhost:3000/gallery/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());
};
const displayCartItems = () => {
    fetch("http://localhost:3000/cart", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
        .then((cartData) => {
        const itemsContainer = document.querySelector('.items');
        itemsContainer.innerHTML = '';
        let total = 0;
        const fetchPromises = cartData.map(cartItem => {
            return fetchGalleryItem(cartItem.id).then((item) => {
                total += parseFloat(item.price) * cartItem.quantity;
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                      <div class="image">
                          <img src="${item.imageURL}" alt="${item.title}" class="image">
                      </div>
                      <div class="desc">
                          <h5>${item.title}</h5>
                          <p>${item.description}</p>
                      </div>
                      <div class="price">
                          <h5>$${item.price}</h5>
                      </div>
                      <div class="btns">
                          <div>
                              <input type="number" value="${cartItem.quantity}" class="amount" min="1" data-id="${item.id}">
                          </div>
                          <div class="cancel">
                              <ion-icon name="close-outline" class="cross" data-id="${item.id}"></ion-icon>
                          </div>
                      </div>
                  `;
                itemsContainer.appendChild(itemDiv);
            });
        });
        Promise.all(fetchPromises).then(() => {
            const subTotalDiv = document.querySelector('.subTotal .price');
            subTotalDiv.innerHTML = `<h5>$${total.toFixed(2)}</h5>`;
            document.querySelectorAll('.amount').forEach(input => {
                input.addEventListener('change', (event) => {
                    const target = event.target;
                    updateCartItemQuantity(target.dataset.id, parseInt(target.value));
                });
            });
            document.querySelectorAll('.cross').forEach(icon => {
                icon.addEventListener('click', (event) => {
                    const target = event.target;
                    removeCartItem(target.dataset.id);
                });
            });
        }).catch(error => console.error('Error fetching gallery items:', error));
    }).catch(error => console.error('Error fetching cart items:', error));
};
const updateCartItemQuantity = (id, quantity) => {
    fetch(`http://localhost:3000/cart/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
    }).then(res => res.json())
        .then(data => {
        console.log('Cart item updated:', data);
        displayCartItems();
    }).catch(error => console.error('Error updating cart item:', error));
};
const removeCartItem = (id) => {
    fetch(`http://localhost:3000/cart/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
        console.log('Cart item removed:', data);
        displayCartItems();
    }).catch(error => console.error('Error removing cart item:', error));
};
displayCartItems();
