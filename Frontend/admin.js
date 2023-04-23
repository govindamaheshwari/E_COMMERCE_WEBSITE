window.addEventListener("DOMContentLoaded",after);
async function after(){

    var productContent=document.getElementById('product-content');
    const url='http://localhost:3000/admin';
    try {
        const res=await axios.get(url);
        const products=res.data;
        //console.log(fetchedproducts);
        products.forEach(element => {
        //console.log("THIS ELEENT",element);
        const product=`<div id="${element.id}">
        <h3>${element.title}</h3>
        <div class="image-container">
            <img src="${element.imgsrc}" alt="laptop">
        </div>
        <div class="product-details">
            <span>$<span>${element.price}</span></span>
            <button class="shop-item-edit-button" type="button">✎</button>
            <button class="shop-item-delete-button" type="button">x</button>
        </div>
        </div>`;
        //console.log("ProductContent",productContent);
        productContent.innerHTML+=product;
        //productContent.appendChild(product);
    });
    console.log(productContent);
    productContent.addEventListener('click',(e)=>{
        if (e.target.className==='shop-item-delete-button'){
            const productItem=e.target.parentNode.parentNode
            const productId=e.target.parentNode.parentNode.id;
            const object={
                productId:productId
            }
            const url="http://localhost:3000/admin/delete-product";
            axios.post(url,object)
                .then(()=>{
                    console.log("deleted the product successfully");
                    productItem.remove();
                })
                .catch(err=>console.log(err));
            
        }
    });   
    } catch (err) {
        console.log(err);
    }
}