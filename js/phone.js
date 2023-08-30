const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);

    displayPhones(phones, isShowAll);


}


const displayPhones = (phones, isShowAll) => {

    // call the phoneContainer div from html
    const phoneContainer = document.getElementById('phone-container');
    // clear the container before every search
    phoneContainer.textContent = '';

    showAllContainer = document.getElementById('show-all-container');

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove("hidden");
    }
    else {
        showAllContainer.classList.add("hidden");
    }

    // if not showall then slice the array
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    // console.log(isShowAll);
    // console.log(phones.length);



    // here we get each phone's datas
    phones.forEach(phone => {
        // console.log(phone);
        // 1 create a div named phoneCard
        const phoneCard = document.createElement('div');

        // 2 set class of this div
        phoneCard.classList = `card p-5 bg-gray-100 shadow-xl my-4`;
        // 3 set innerhtml in this div
        phoneCard.innerHTML = `

        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center items-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>   

        `
        // 4 append this phoneCard div in the phoneContainer div
        phoneContainer.appendChild(phoneCard);

    });

    toggleLoadingSpiner(false);
}

// handle show details
const handleShowDetails = async (id) => {
    // console.log(id);
    // load details data by id
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(phone);

    showPhoneDetail(phone);

}

const showPhoneDetail = (phone) => {
    // now set the values in 3 ways

    const modelImgContainer = document.getElementById('model_img_container');
    modelImgContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    `

    const modelName = document.getElementById('model_name');
    modelName.innerText = phone.name;

    document.getElementById('model_storage').innerText = phone.mainFeatures.storage;
    document.getElementById('model_display').innerText = phone.mainFeatures.displaySize;
    document.getElementById('model_chipset').innerText = phone.mainFeatures.chipSet;




    show_details_modal.showModal();
}

// handle search button

const handleSearch = (isShowAll) => {

    // add the loading spinner
    toggleLoadingSpiner(true);

    // console.log('clicked');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);


    // call the loadPhone function to show the phones for search
    loadPhone(searchText, isShowAll);
}

const handleSearch2 = () => {
    // loading spinner added
    toggleLoadingSpiner(true);


    // console.log('2nd clicked');
    const searchField2 = document.getElementById('search-filed2');
    const searchText2 = searchField2.value;
    // console.log(searchText2);

    loadPhone(searchText2);
}


// loading spiner

const toggleLoadingSpiner = (isLoading) => {
    const loadingSpiner = document.getElementById('loading-spiner');
    if (isLoading) {
        loadingSpiner.classList.remove('hidden');

    }
    else {
        loadingSpiner.classList.add('hidden');

    }
}


// show alll handle

const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();