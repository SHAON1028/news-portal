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




loadCatagories()