"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const addArt = document.querySelector('.add');
const displayCards = document.querySelector('.displayCards');
const addProduct = document.querySelector('.addProduct');
const searchInput = document.querySelector('.input');
const viewAll = document.querySelector('.viewL');
viewAll.addEventListener('click', () => {
    display();
});
addArt.addEventListener('click', () => {
    const form = document.createElement('Div');
    form.classList.add('formDiv');
    form.innerHTML = `
    <div class="crossDiv"><ion-icon name="close-outline" class="cross"></ion-icon></div>
    <label for="ImageUrl">Image URL</label>
    <input type="text" id="imageURL" name="ImageUrl" class="inputField">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" class="inputField">
    <label for="description">Description</label>
    <input type="text" id="description" name="description" class="inputField">
    <label for="price">Price</label>
    <input type="text" id="price" name="price" class="inputField">
    <button class="upload">Upload</button>`;
    const crossIcon = form.querySelector('.cross');
    crossIcon.addEventListener('click', () => {
        form.remove();
    });
    addProduct.appendChild(form);
    const upload = document.querySelector('.upload');
    upload.addEventListener('click', () => {
        const imageURL = document.querySelector('#imageURL');
        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const price = document.querySelector('#price');
        if (!imageURL.value || !title.value || !description.value || !price.value) {
            const error = document.createElement('p');
            error.classList.add('error');
            error.textContent = 'Please fill out all fields';
            form.appendChild(error);
            return;
        }
        let data = {
            imageURL: imageURL.value,
            title: title.value,
            description: description.value,
            price: price.value
        };
        console.log(data);
        fetch("http://localhost:3000/gallery", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(() => {
            imageURL.value = '';
            title.value = '';
            description.value = '';
            price.value = '';
            display();
        });
    });
});
const display = () => {
    fetch("http://localhost:3000/gallery", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json()).then((data) => {
        console.log('Fetched data:', data); // Debugging statement
        galleryData = data; // Update the gallery data
        displayCards.innerHTML = '';
        data.forEach((art) => createCard(art));
    })
        .catch(error => {
        console.error('Error:', error);
    });
};
// display()
const createCard = (art) => {
    const card = document.createElement('Div');
    card.classList.add('card');
    card.innerHTML = `
    <img src="${art.imageURL}" alt="artwork" class="image">
    <h3>${art.title}</h3>
    <p>${art.description}</p>
    <h4>${art.price}</h4>`;
    displayCards.appendChild(card);
    card.addEventListener('click', () => {
        card.classList.add('clickedCard');
        const artCard = document.querySelector('.artCard');
        artCard.innerHTML = `
            <div class="editView">
                <h3>Edit products</h3>
                <button class="full">See full View</button>
            </div>
            <div class="view">
            <img src="${art.imageURL}" alt="artwork" class="imageView">
            <h5>Description</h5>
            <div class="productName border">
                <p>productName</p>
                <div class="border">
                    <p>${art.title}</p>
                </div>
                <p class="desc">Description</p>
                <div class="border">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Cursus sit amet dictum sit amet justo donec enim. Id eu nisl nunc mi ipsum</p>
                 </div>
            </div>
            <h5>Category</h5>
            <div class="productCategory border">
                <p>product Category</p>
                <div class="border">
                    <p>Pen and Ink</p>
                </div>
            </div>
            <div class="btns">
            <button class="Delete"> Delete</button>
            <button class="update"> Update</button></btns>
            </div>
        `;
        const deleteButton = artCard.querySelector('.Delete');
        deleteButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/gallery/${art.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                card.remove();
                artCard.innerHTML = '';
            }).catch(error => {
                console.error('Error:', error);
            });
        });
        const updateButton = document.querySelector('.update');
        updateButton.addEventListener('click', () => {
            console.log("clicked");
            const updateForm = document.createElement('Div');
            updateForm.classList.add('updateForm');
            updateForm.innerHTML = `
                <div class="crossDiv"><ion-icon name="close-outline" class="cross"></ionicon></div>
                <label for="ImageUrl">Image URL</label>
                <input type="text" id="updateImageURL" name="ImageUrl" class="inputField" value="${art.imageURL}">
                <label for="title">Title</label> 
                <input type="text" id="updateTitle" name="title" class="inputField" value="${art.title}">
                <label for="description">Description</label>
                <input type="text" id="updateDescription" name="description" class="inputField" value="${art.description}">
                <label for="price">Price</label>
                <input type="text" id="updatePrice" name="price" class="inputField" value="${art.price}">
                <button class="submitUpdate">Submit Update</button>`;
            const mainSec = document.querySelector('.main');
            mainSec.appendChild(updateForm);
            const crossIcon = updateForm.querySelector('.cross');
            crossIcon.addEventListener('click', () => {
                updateForm.remove();
            });
            const submitUpdateButton = updateForm.querySelector('.submitUpdate');
            submitUpdateButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
                const imageURL = updateForm.querySelector('#updateImageURL');
                const title = updateForm.querySelector('#updateTitle');
                const description = updateForm.querySelector('#updateDescription');
                const price = updateForm.querySelector('#updatePrice');
                const updatedArt = {
                    imageURL: imageURL.value,
                    title: title.value,
                    description: description.value,
                    price: price.value
                };
                try {
                    yield fetch(`http://localhost:3000/gallery/${art.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedArt)
                    });
                    card.innerHTML = `
                        <img src="${updatedArt.imageURL}" alt="artwork" class="image">
                        <h3>${updatedArt.title}</h3>
                        <p>${updatedArt.description}</p>
                        <h4>${updatedArt.price}</h4>
                    `;
                    updateForm.remove();
                }
                catch (error) {
                    console.error('Error', error);
                }
            }));
        });
    });
};
let galleryData = [];
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    console.log('Search term:', searchTerm);
    const filteredGallery = galleryData.filter(art => {
        const matchesTitle = art.title.toLowerCase().includes(searchTerm);
        const matchesDescription = art.description.toLowerCase().includes(searchTerm);
        const matchesPrice = art.price.toLowerCase().includes(searchTerm);
        console.log(`Checking art: ${art.title}`);
        console.log(`Matches Title: ${matchesTitle}, Matches Description: ${matchesDescription}, Matches Price: ${matchesPrice}`);
        return matchesTitle || matchesDescription || matchesPrice;
    });
    console.log('Filtered gallery:', filteredGallery);
    displayCards.innerHTML = '';
    filteredGallery.forEach((art) => createCard(art));
});
window.addEventListener('load', display);
