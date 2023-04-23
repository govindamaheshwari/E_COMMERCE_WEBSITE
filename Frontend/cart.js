window.addEventListener("DOMContentLoaded",showCartProducts)
async function showCartProducts(){
   
    let products;
    const url="http://localhost:3000/cart"
    try {
        const res=await axios.get(url);
        products=res.data;
    } catch (err) {
        console.log(err);
    }
    showOnCartPage(products);
    showOnOrderPage(products);

   
}



const purchaseBtn=document.getElementById("purchase-btn");
const container=document.getElementById("container");
const closePopBtn=document.getElementById('purchase-btn-close');

const orderBtn=document.getElementById("order-btn");

purchaseBtn.addEventListener('click',()=>{
    container.classList.add("active");

});
closePopBtn.addEventListener('click',()=>{
    container.classList.remove("active");
});

// orderBtn.addEventListener('click',(e)=>{
//     console.log(e.target.parentNode.childNodes[7]);

// })

const cart=document.getElementById('cart');
cart.addEventListener('click',(e)=>{
    e.preventDefault();
    if (e.target.className=='del'){
        const productId=e.target.parentNode.parentNode.id;
        const object={
            productId:productId
        }
        const url="http://localhost:3000/cart/delete-cart-item"
        axios.post(url,object)
            .then(res=>{console.log(res)})
            .catch(err=>console.log(err));
        
        const price=e.target.parentNode.parentNode.firstElementChild.nextSibling.nextSibling.innerText
        const quantity=e.target.parentNode.parentNode.firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.firstElementChild.value
       
        const productRemove=e.target.parentNode.parentNode;
        productRemove.remove();
        let totalvalue=document.querySelector('#total-value').innerText;

        totalvalue=parseFloat(totalvalue)-parseFloat(price)*parseFloat(quantity);
        document.querySelector('#total-value').innerText=`${totalvalue}`

    }
})


function showOnCartPage(products){
    let total_cart_price=0;
    const cart=document.getElementById('cart-items');
    products.forEach(object=>{
        const productId=object.id;
        const imgsrc=object.imgsrc;
        const title=object.title;
        const price=object.price;
        const description=object.description;
        const quantity=object.cartItems.quantity;
        total_cart_price=parseFloat(total_cart_price)+parseFloat(price)*parseFloat(quantity);
        
        const cartItem=document.createElement('div');
        cartItem.setAttribute("id",`${productId}`);
        cartItem.classList.add('cart-row');
        
        cartItem.innerHTML=`<span class="cart-item cart-column"><img class=" cart-img"src="${imgsrc}" alt="">
        <span>${title}</span></span>
        <span class="cart-price cart-column">${price}</span>
        <span class="cart-quantity cart-column"> <input type="text" value="${quantity}"> <button id="del" class="del">REMOVE</button></span>`;
        cart.appendChild(cartItem);
      
    })
   // showOnOrderPage(products);    
    document.querySelector('#total-value').innerText=`${total_cart_price}`;
}
function showOnOrderPage(products){
    const orderItems=document.getElementById('order-items');
    let total_order_price=0;
    products.forEach(object=>{
        const productId=object.id;
        const imgsrc=object.imgsrc;
        const title=object.title;
        const price=object.price;
        const description=object.description;
        const quantity=object.cartItems.quantity;
        total_order_price=parseFloat(total_order_price)+parseFloat(price)*parseFloat(quantity);
        
        const orderItem=document.createElement('div');
        orderItem.setAttribute("id",`${productId}`);
        orderItem.classList.add('order-row');
        
        orderItem.innerHTML=`<span class="order-item order-column"><img class=" order-img"src="${imgsrc}" alt="">
        <span>${title}</span></span>
        <span class="order-price order-column">${price}</span>
        <span class="order-quantity order-column"> <input type="text" value="${quantity}">`;
        orderItems.appendChild(orderItem);
        //cart.appendChild(cartItem);
    })
    document.querySelector('#total-order-value').innerText=`${total_order_price}`;
    const orderBtn=document.getElementById("order-btn");
    orderBtn.addEventListener('click',(e)=>{
        console.log(e.target.parentNode.childNodes[7]);
        const url="http://localhost:3000/cart/order"
        axios.post(url,products)
            .then(res=>{
                const notif=document.createElement('div');
                    notif.innerHTML=`Order successflly placed with order id= ${res.data.orderId}`;
                    console.log(res.data);
                    const notification=document.getElementById("notification");
                    notification.classList.add("active");
                    notification.appendChild(notif)
                    setTimeout(()=>{notif.remove();
                        notification.classList.remove("active");
             },3000)
            })
            .catch(err=>console.log(err));
    })
}
