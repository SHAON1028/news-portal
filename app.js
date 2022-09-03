const loadCatagories = async () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        navCategory(data.data.news_category);
    } catch (error) {
        console.log(error);
    };
}

const navCategory = (categories) => {
    const categorieList = document.getElementById('nav-cat')

    categories.forEach(categorie => {
        const catNav = document.createElement('li')
        catNav.innerHTML = `
        <li class="nav-item" onclick ="newsByCategory('${categorie.category_id}')">
                                <a class="nav-link  fs-5 pe-4" aria-current="page" href="#">${categorie.category_name}</a>
                            </li>
                            `
        categorieList.appendChild(catNav)
    });
}
const newsByCategory = async (category_id) => {
   
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        showNews(data.data)
    } catch (error) {
        console.log(error);
    }

}

const showNews = (news_infos, nameOfCategory) => {
    console.log(news_infos);

    //sort
    news_infos.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    //sort end


    //no news found
    const noNews = document.getElementById('no-found-message')
    if (news_infos.length === 0) {
        noNews.classList.remove('d-none')
    } else {
        noNews.classList.add('d-none')
    }

    const getNewsID = document.getElementById('news-id')
    getNewsID.innerHTML = ''
    //total news
    const getTotal = document.getElementById('total-news')
    getTotal.innerHTML = ''
    const totalDiv = document.createElement('p')
    totalDiv.innerHTML = `
    <p> <span class="text-primary">${news_infos.length}</span> items found for category <span class="text-primary">${nameOfCategory}</span></p> 
    `
    getTotal.appendChild(totalDiv)



    // total news
    news_infos.forEach(info => {
        let name = info.author.name
        if (name === null)
            name = 'No Data Found'
        let view = info.total_view
        if (view === null)
            view = 'No Data Found'
        p = info.details.slice(0, 600)

        const newsDiv = document.createElement('div')
        newsDiv.innerHTML = `
        <div class="card mb-3 p-3 w-100">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${info.image_url}" width="320px" height="300px" class="rounded-1 " alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${info.title}</h5>
                    <p class="card-text">${p}...</p>

                    <div class="d-lg-flex mt-5 pt-3 justify-content-between">
                        <!-- author -->
                        <div class=" d-flex">
                            <img src="${info.author.img}" alt="" width="40px" height="40px" class="rounded-circle">
                            <h5 class="ps-3">${name}</h5>
                        </div>

                        <!-- views -->
                        <div class="d-flex">
                            <i class="bi bi-eye " style="font-size:24px;"></i>
                            <p class="pt-1 ps-2">${view}</p>
                        </div>
                        <!-- star -->
                        <div>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                        </div>
                        <!-- details arrow -->
                        <div>
                            <button onclick ="showNewsDetail('${info._id}')" type="button" class="border-0 bg-white" ><i class="bi bi-arrow-right"
                                    style="font-weight:bold;font-size:24px; color:blue;"data-bs-toggle="modal" data-bs-target="#newsDetailsModal" ></i></button>
                                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `
        getNewsID.appendChild(newsDiv)



    });
    toggleSpinner(false)

}
const showNewsDetail = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        const res = await fetch(url)
        const data = await res.json()

        newsinModal(data.data[0])
    } catch (error) {
        console.log(error);
    }


}
const newsinModal = all_info => {
    console.log(all_info);
    const modalTitle = document.getElementById('newsDetailsModalLabel')
    modalTitle.innerHTML = all_info.title

    const modalBody = document.getElementById('news-modal')
    modalBody.innerHTML = ''
    const modalDiv = document.createElement('div')
    modalDiv.innerHTML =
        `
    <div>
    <p class="fw-bold text-primary">Details of the news:</p>
    <p>${all_info.details}</p>
    </div>
    <div>
    <p class="fw-bold text-primary">About Author:</p>
    <p class="fw-bold text-success">Name:${all_info.author.name}</p>
    <p class="fw-bold text-success">published_date:${all_info.author.published_date}</p>
   
    </div>

    <div>
    <p class="fw-bold text-primary">Rating:</p>
    <p class="fw-bold text-success">Numbers:${all_info.rating.number}</p>
    <p class="fw-bold text-success">Badge:${all_info.rating.badge}</p>

    </div>
    
    `
    modalBody.appendChild(modalDiv)

}


loadCatagories()