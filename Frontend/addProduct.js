
const btn=document.getElementById('btn');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const title=document.getElementById('title').value;
    const imageUrl=document.getElementById('imageUrl').value;
    const price=document.getElementById('price').value;
    const description=document.getElementById('description').value;
    
    const obj={
        title:title,
        imageUrl:imageUrl,
        price:price,
        description:description
    }
    console.log(obj);
    const url='http://localhost:3000/admin/add-product';
    axios.post(url,obj)
        .then(res=>{
            console.log(res.data);
            alert(`Product :${title} added to the database`);
        })
        .catch(err=>console.log(err));
    
})

