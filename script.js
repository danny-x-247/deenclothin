// ===================== DEEN CLOTHING SETTINGS =====================
// Replace the values below with the boutique's real information.
const BUSINESS = {
  whatsapp: "2348139096643", // WhatsApp number WITHOUT + or spaces
  phone: "+234 813 909 6643", // Phone number to display on the website
  address:   "Deen Clothing, Yola, Adamawa, Nigeria", // Address of the business entity
  mapsQuery:   "Deen Clothing, Yola, Adamawa, Nigeria", // Location to display on the maps
};

// Add/edit your products here. For a real product photo, put the image in
// the assets folder and set image to "assets/your-photo.jpg".
// Products
// Admin-added products are loaded from localStorage.
// If there are no admin products yet, these original products are used.

const defaultProducts = [
  {id:1,name:"Classic Shoe",category:"Shoes",price:24000,image:"assets/image1.jpeg",badge:""},
  {id:2,name:"Supreme T-Shirts",category:"Tops",price:20000,image:"assets/shirt3.jpeg",badge:""},
  {id:3,name:"Carter Track-Set",category:"Sets",price:25000,image:"assets/track-set2.jpeg",badge:""},
  {id:5,name:"Native Shoe",category:"Shoes",price:12000,image:"assets/image2.jpeg",badge:""},
  {id:6,name:"Premium Top",category:"Tops",price:15000,image:"assets/shirt1.jpeg",badge:""},
  {id:7,name:"Diessl Track-Set",category:"Sets",price:25000,image:"assets/track-set1.jpeg",badge:""},
  {id:8,name:"Designer Shorts",category:"Trousers",price:25000,image:"assets/trouser1.jpeg",badge:""},
  {id:9,name:"Classic Slippers",category:"Shoes",price:12000,image:"assets/image4.jpeg",badge:""},
  {id:10,name:"Native Slides",category:"Shoes",price:12000,image:"assets/image3.jpeg",badge:""},
  {id:11,name:"Quality Joggers",category:"Trousers",price:25000,image:"assets/trouser2.jpeg",badge:""},
  {id:12,name:"Baggy Jeans",category:"Trousers",price:28000,image:"assets/trouser3.jpeg",badge:""},
  {id:13,name:"Supreme Polo T-shirts",category:"Tops",price:28000,image:"assets/shirt4.jpeg",badge:""},
  {id:14,name:"Designer T-Shirts",category:"Tops",price:28000,image:"assets/shirt2.jpeg",badge:""},
  {id:15,name:"Black Diessl Track-Set",category:"Tops",price:25000,image:"assets/track-set4.jpeg",badge:""},
  {id:16,name:"Louis Vuitton Palm",category:"Shoes",price:20000,image:"assets/palms1.jpeg",badge:""},
  {id:17,name:"Amiri Palm",category:"Shoes",price:20000,image:"assets/palms2.jpeg",badge:""},
  {id:18,name:"Balenciaga Palm",category:"Shoes",price:20000,image:"assets/palms3.jpeg",badge:""},
  {id:19,name:"Essential Palm",category:"Shoes",price:20000,image:"assets/palms4.jpeg",badge:""},
  {id:20,name:"Rhude Palm",category:"Shoes",price:20000,image:"assets/palms5.jpeg",badge:""},
  {id:21,name:"Quality Designed Palm",category:"Shoes",price:20000,image:"assets/palms6.jpeg",badge:""},
  {id:22,name:"Balenciaga T-Shirt",category:"Tops",price:15000,image:"assets/shirt5.jpeg",badge:""},
  {id:23,name:"Desginer Track-Set Green",category:"Sets",price:20000,image:"assets/track-set5.jpeg",badge:""},
  {id:24,name:"Designer Track-Set Brown",category:"Sets",price:20000,image:"assets/track-set6.jpeg",badge:""},
  {id:25,name:"Maison Saiko Track-Set Grey",category:"Sets",price:25000,image:"assets/track-set7.jpeg",badge:""},
  {id:26,name:"Maison Saiko Track-Set White",category:"Sets",price:25000,image:"assets/track-set8.jpeg",badge:""},
  {id:27,name:"Designer T-Shirt",category:"Tops",price:15000,image:"assets/shirt6.jpeg",badge:""},
  {id:28,name:"Designer T-Shirt",category:"Tops",price:17500,image:"assets/shirt7.jpeg",badge:""},
  {id:29,name:"Yellow T-Shirt",category:"Tops",price:13000,image:"assets/shirt8.jpeg",badge:""},
  {id:30,name:"Printed T-Shirt",category:"Tops",price:13000,image:"assets/shirt9.jpeg",badge:""}
];


// Get products added through the admin page
const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

// Combine original products + products added from admin
const products = [...defaultProducts, ...savedProducts];

const gallery = [
  {title:"New arrivals",image:"assets/shirt2.jpeg"},
  {title:"Everyday style",image:"assets/shirt12.jpeg",wide:true},
  {title:"Occasion wear",image:"assets/track-set6.jpeg",tall:true},
  {title:"Deen Clothing",image:"assets/shirt3.jpeg",wide:true}
];

let activeCategory="All";
let cart=[];

const money = n => "₦" + n.toLocaleString("en-NG");

function productImage(item){
  return item.image
    ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
    : `<div class="placeholder-label">ADD PHOTO</div>`;
}
function renderProducts(){
  const list=products.filter(p=>activeCategory==="All"||p.category===activeCategory);
  document.getElementById("products").innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-image">${productImage(p)}${p.badge?`<span class="badge">${p.badge}</span>`:""}</div>
      <div class="product-info">
        <h3>${p.name}</h3><p>${p.category}</p>
        <div class="product-bottom"><span class="price">${money(p.price)}</span>
        <button class="add" onclick="addToCart(${p.id})">ADD TO BAG</button></div>
      </div>
    </article>`).join("");
}
function renderGallery(){
  document.getElementById("galleryGrid").innerHTML=gallery.map(g=>`
    <div class="gallery-item ${g.wide?"wide":""} ${g.tall?"tall":""}">
      ${g.image?`<img src="${g.image}" alt="${g.title}" loading="lazy">`:`<span class="placeholder-label">ADD PHOTO</span>`}
      <span class="gallery-caption">${g.title}</span>
    </div>`).join("");
}
function addToCart(id){
  const item=products.find(p=>p.id===id); const found=cart.find(x=>x.id===id);
  if(found) found.qty++; else cart.push({...item,qty:1});
  renderCart(); document.getElementById("cartOverlay").classList.add("open");
  toast(item.name+" added to your bag");
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`
    <div class="cart-item"><div class="cart-thumb">${x.image?`<img src="${x.image}" style="width:100%;height:100%;object-fit:cover">`:"PHOTO"}</div>
    <div><h4>${x.name}</h4><p>${x.qty} × ${money(x.price)}</p></div>
    <button class="remove" onclick="removeFromCart(${x.id})">Remove</button></div>`).join(""):`<p class="empty">Your bag is empty.</p>`;
  document.getElementById("cartTotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
}
function orderOnWhatsApp(){
  if(!cart.length){toast("Add an item to your bag first");return;}
  let msg="Hello Deen Clothing! I would like to order:%0A%0A";
  cart.forEach(x=>msg+=`• ${x.name} — ${x.qty} — ${x.image} × ${money(x.price)}%0A`); // Erase image if Program Brings Error.
  msg+=`%0AEstimated total: ${money(cart.reduce((a,x)=>a+x.price*x.qty,0))}%0A%0APlease confirm availability, sizes/colours and delivery details.`;
  window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${msg}`,"_blank");
}
function toast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");activeCategory=btn.dataset.category;renderProducts();
}));
document.getElementById("cartBtn").onclick=()=>document.getElementById("cartOverlay").classList.add("open");
document.getElementById("closeCart").onclick=()=>document.getElementById("cartOverlay").classList.remove("open");
document.getElementById("cartOverlay").addEventListener("click",e=>{if(e.target.id==="cartOverlay")e.currentTarget.classList.remove("open")});
document.getElementById("orderBtn").onclick=orderOnWhatsApp;
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");

document.getElementById("whatsappLink").href=`https://wa.me/${BUSINESS.whatsapp}?text=Hello%20Deen%20Clothing%2C%20I%20would%20like%20to%20make%20an%20enquiry.`;
document.getElementById("phoneLink").href=`tel:${BUSINESS.phone.replace(/[^+\d]/g,"")}`;
document.getElementById("mapLink").href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapsQuery)}`;
document.getElementById("displayWhatsapp").textContent="+"+BUSINESS.whatsapp;
document.getElementById("displayPhone").textContent=BUSINESS.phone;
document.getElementById("displayAddress").textContent=BUSINESS.address;
document.getElementById("year").textContent=new Date().getFullYear();

renderProducts();renderGallery();renderCart();