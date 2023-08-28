const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);

    displayPhones(phones);


}


const displayPhones = phones => {

    // call the phoneContainer div from html
    const phoneContainer = document.getElementById('phone-container');

    // here we get each phone's datas
    phones.forEach(phone => {
        console.log(phone);
        // 1 create a div named phoneCard
        const phoneCard = document.createElement('div');
        // 2 set class of this div
        phoneCard.classList = `card p-5 bg-gray-100 shadow-xl my-4`;
        // 3 set innerhtml in this div
        phoneCard.innerHTML = `

        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>   

        `
        // 4 append this phoneCard div in the phoneContainer div
        phoneContainer.appendChild(phoneCard);

    });
}



loadPhone();