const products=[
{name:"Chevron Supreme Engine Oil 1L",price:1000,cat:"Engine Oils & Fluids",icon:"🛢️"},
{name:"Phillips DOT 3 Brake Fluid",price:600,cat:"Brake Parts",icon:"🧴"},
{name:"R134A Refrigerant Can",price:1400,cat:"A/C & Cooling",icon:"❄️"},
{name:"Toyota 5W-30 Motor Oil",price:1200,cat:"Engine Oils & Fluids",icon:"🛢️"},
{name:"Oil Filter Corolla / Swift",price:600,cat:"Filters",icon:"⚫"},
{name:"Cabin Air Filter",price:750,cat:"Filters",icon:"▤"},
{name:"Coolant 1 Quart",price:280,cat:"A/C & Cooling",icon:"🧪"},
{name:"Brake Pads",price:600,cat:"Brake Parts",icon:"⬛"}
];
let cart=JSON.parse(localStorage.getItem("revCart")||"[]");
let activeCategory="";

function money(n){return "J$"+n.toLocaleString()}
function renderProducts(list=products){
 const grid=document.getElementById("productGrid");
 grid.innerHTML=list.map((p,i)=>`<article class="product"><div class="product-img">${p.icon}</div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="add" onclick="addToCart(${i})">🛒 Add to Cart</button></article>`).join("") || `<div class="empty" style="grid-column:1/-1">No products found.</div>`;
}
function addToCart(i){cart.push(products[i]);saveCart();showToast("Added to cart");}
function saveCart(){localStorage.setItem("revCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
function openCart(){
 document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><strong>${money(p.price)}</strong><button onclick="removeCart(${i})">×</button></div>`).join(""):`<div class="empty">Your cart is empty.</div>`;
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
 document.getElementById("cartModal").classList.add("show");
}
function removeCart(i){cart.splice(i,1);saveCart();openCart()}
function openAccount(){document.getElementById("accountModal").classList.add("show")}
function closeModal(id){document.getElementById(id).classList.remove("show")}
function closeOnBackdrop(e,id){if(e.target.id===id)closeModal(id)}
function checkout(){alert("Checkout is ready to connect to Odoo Website/eCommerce.")}
function filterCategory(cat){activeCategory=cat;document.getElementById("searchInput").value="";renderProducts(products.filter(p=>p.cat===cat));document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function clearFilters(){activeCategory="";document.getElementById("searchInput").value="";renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function searchProducts(){
 const q=document.getElementById("searchInput").value.toLowerCase();
 renderProducts(products.filter(p=>(!activeCategory||p.cat===activeCategory)&&`${p.name} ${p.cat}`.toLowerCase().includes(q)));
}
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
function showToast(msg){
 const t=document.createElement("div");t.textContent=msg;t.style.cssText="position:fixed;left:50%;bottom:25px;transform:translateX(-50%);background:#111;color:#fff;padding:12px 20px;border-radius:25px;z-index:200;font-weight:bold";document.body.appendChild(t);setTimeout(()=>t.remove(),1600);
}
renderProducts();saveCart();
