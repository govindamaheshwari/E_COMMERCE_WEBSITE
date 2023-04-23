window.addEventListener("DOMContentLoaded",after);
let countProducts;
let items_per_page;
async function after(){
    // let countProducts;
    // let items_per_page;
    var productContent=document.getElementById('product-content');
    var pagination=document.getElementById("pagination");

    const url='http://localhost:3000/store';
    try {
        const res= await axios.get(url);
        const products=res.data.products;
        items_per_page=res.data.items_per_page;
        console.log("res.data.items_per_page",items_per_page);
        countProducts=res.data.count;
        showProductsOnScreen(products, countProducts);
        productContent.addEventListener('click',addToCart);
        pagination.addEventListener('click',changePage);
    } catch (err) {
        console.log(err);
    }
}

function showProductsOnScreen(products, countProducts){
    var productContent=document.getElementById('product-content');
    productContent.innerHTML=``;
   
    products.forEach(element => {
        //console.log("THIS ELEENT",element);
        const product=`<div id="${element.id}">
        <h3>${element.title}</h3>
        <div class="image-container">
            <img src="${element.imgsrc}" alt="laptop">
        </div>
        <div class="product-details">
            <span>$<span>${element.price}</span></span>
            <button class="shop-item-button" type="button">🛒</button>
        </div>
        </div>`;
        productContent.innerHTML+=product;

    }); 
    var pagination =document.getElementById("pagination");
    pagination.innerHTML=``;
    //const numberOfButtons=Math.ceil( countProducts/products.length)
    console.log( countProducts,items_per_page);
    const numberOfButtons=Math.ceil( countProducts/items_per_page);
    for(let i=1;i<=numberOfButtons;i++){
        const Btn=`<button class="pagination-button">${i}</button>`
        pagination.innerHTML+=Btn;  
    }
}

function addToCart(e){
        if (e.target.className=="shop-item-button"){
            const productId=e.target.parentNode.parentNode.id;
            const title=e.target.parentNode.parentNode.firstElementChild.innerText;
            // const imageUrl=e.target.parentNode.parentNode.firstElementChild.nextSibling.nextSibling.firstElementChild.src;
            const url="http://localhost:3000/cart"
            const obj={
                productId:productId    
            }
            axios.post(url,obj)
                .then(res=>{
                    console.log(res);
                    const products=document.getElementById("products");
                    const notif=document.createElement('div');
                    notif.classList.add('notification');
                    notif.innerHTML=`<h4>Your Product: <span> ${title} </span> is added to the cart `;
                    products.appendChild(notif);
                    setTimeout(()=>{notif.remove();
             },3000)
                })
                .catch(err=>console.log(err));
        }
    
}

async function changePage(e){
    if(e.target.className=="pagination-button"){
        const page=e.target.innerText;
        const url=`http://localhost:3000/store?page=${page}`

        const res=await axios.get(url);
        const products=res.data.products;
        items_per_page=res.data.items_per_page;
        countProducts=res.data.count;
        showProductsOnScreen(products, countProducts);
    }
}