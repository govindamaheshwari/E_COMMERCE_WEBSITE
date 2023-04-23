const productcontent=document.getElementById('product-content');
productcontent.addEventListener('click',(e)=>{
    if (e.target.className=='shop-item-button'){
        const id=e.target.parentNode.parentNode.id;
        const img_src=document.querySelector(`#${id} img`).src;
        const name=document.querySelector(`#${id} h3`).innerText;
        const price=e.target.parentNode.firstElementChild.firstElementChild.innerText;
        //console.log(price);
        const url='http://localhost:3000/store';
        const obj={
            name:name,
            img:img_src,
            price:price
        }

        const key=`${name}${img_src}${price}`
        var keys=Object.keys(localStorage);
        //console.log(keys);

        let checker=false;
        keys.forEach((k)=>{
            if(k==key){
                checker=true;
                alert('Product already in the Cart');
            }
        })
        if(checker==false){
            axios.post(url,obj).then((res)=>{
                console.log(res.data);
                //localStorage.setItem(key,JSON.stringify(obj));
            const products=document.getElementById("products");
            const notif=document.createElement('div');
            notif.classList.add('notification');
            notif.innerHTML=`<h4>Your Product: <span> ${name} </span> is added to the cart `;
            products.appendChild(notif);
            setTimeout(()=>{
            notif.remove();
             },3000)
            }).catch(err=>console.log(err))
        
    }
    }
})