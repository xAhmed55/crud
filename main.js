//get total start
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode = 'create';
let tmp;

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(207, 43, 43)';
    }
}
//get total end

//creat product && save local storage start 

let datapro;

if(localStorage.Product != null){
    datapro = JSON.parse(localStorage.Product)
}else{
    datapro = [];
}


submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mode === 'create'){
    if(newpro.count > 1){
        for(let i = 0 ; i < newpro.count ; i++){
            datapro.push(newpro);
        }
    }else{
        datapro.push(newpro);
    }
}else{
    datapro[   tmp  ] = newpro;
    mode = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
}



    //save local storage
    localStorage.setItem('Product' ,    JSON.stringify(datapro) );
    clearData();
    showData();
}

//creat product && save local storage end 
//save local storage

//clear inputs start
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//clear inputs end


//read start
function showData(){
    getTotal();
    let table ='';
    for(let i = 0; i < datapro.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="upDate( ${i} )" id="update">UpDate</button></td>
        <td><button onclick="deleteData ( ${i} )" id="delete">Delete</button></td>
    </tr>
    `   
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    if(datapro.length > 0){
        btndelete.innerHTML = `<button onclick="deleteAll()" >Delete All (${datapro.length}) </button>`
    }else{
        btndelete.innerHTML = '';
    }
}
showData();
//read end

//count start

//count end

//delete start
function deleteData(i){
    datapro.splice(i,1);
    localStorage.Product = JSON.stringify(datapro);
    showData()
}
//delete end

//deleteAll start
function deleteAll(){
    localStorage.clear()
    datapro.splice(0);
    showData();
}
//deleteAll end

//update
function upDate(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Up Date';
    mode = 'UpDate';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

//search
let searchMood ='title'
function getSearshMood(id){
let search=document.getElementById('search')

    if(id == 'searchTitle'){
        searchMood ='title'
      search.placeholder="search by title"
    }else{
        searchMood ='category'
        search.placeholder="search by category";
    }
    search.focus() 
    search.value='';
    showData()
}



function searchdata(value){
    let table='';
   if(searchMood =='title'){

    for(let i= 0;i < datapro.length; i++){
         if(datapro[i].title.includes(value.toLowerCase())){
            table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="upDate( ${i} )" id="update">UpDate</button></td>
        <td><button onclick="deleteData ( ${i} )" id="delete">Delete</button></td>
    </tr>
    `   
            
         }

    }


   }else{
   
        for(let i= 0;i < datapro.length; i++){
             if(datapro[i].category.includes(value.toLowerCase())){
                table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="upDate( ${i} )" id="update">UpDate</button></td>
            <td><button onclick="deleteData ( ${i} )" id="delete">Delete</button></td>
        </tr>
        `   
                
             }
    
        
    
    
       }
       

   }
   document.getElementById('tbody').innerHTML = table;

}



//clean data