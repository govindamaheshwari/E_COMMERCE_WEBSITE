window.addEventListener("DOMContentLoaded",getAllOrders)

async function getAllOrders(){
    let orders;
    const url="http://localhost:3000/cart/getorders"
    try {
        const response=await axios.get(url);
        orders=response.data.orders;
        showOnOrderPage(orders);
    } catch (err) {
        console.log(err);
    }
}

function showOnOrderPage(orders){
    
    
    const cart=document.getElementById('cart-items');
    orders.forEach(order=>{
       
        const products =order.products;
        let total_cart_price=0;
        products.forEach(object=>{
            const imgsrc=object.imgsrc;
            const title=object.title;
            const price=object.price;
            const description=object.description;
            const quantity=object.OrderItems.quantity;
            total_cart_price=parseFloat(total_cart_price)+parseFloat(price)*parseFloat(quantity);
            
            const cartItem=document.createElement('div');
    
            cartItem.classList.add('cart-row');
            
            cartItem.innerHTML=`<span class="cart-quantity cart-column"> <input type="text" value="${order.id}"></span>
                                <span class="cart-item cart-column"><img class=" cart-img"src="${imgsrc}" alt="">
                                <span>${title}</span></span>
                                <span class="cart-price cart-column">${price}</span>
                                <span class="cart-quantity cart-column"> <input type="text" value="${quantity}"></span>`;
            cart.appendChild(cartItem);
            
        })  
    })
}



