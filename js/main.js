var cart = {};

function init(){
	$.getJSON("goods.json", goodsOut);
}

function goodsOut(data){
	console.log(data);
	var out='';
	for (var key in data) {
		// out +='<div class="cart">';
		// out +='<p class="name">'+data[key].name+'</p>';
		// out += '<img src="img/'+data[key].img+'"alt="">';
		// out += '<p class="cost">'+data[key].cost+'</p>';
		// out +='<button class="add_to_cart">Buy</button>';
		// out +='</div>';

		out +='<div class="cart">';
		out +=`<p class="name">${data[key].name}</p>`;
		out += `<img src="img/${data[key].img}"alt="">`;
		out += `<p class="cost">${data[key].cost}</p>`;
		out +=`<button class="add_to_cart" data-id="${key}">Buy</button>`;
		out +='</div>';
	}
	$('.storeitems').html(out);
	$('.add_to_cart').on('click', addToCart);
}

function addToCart() {
	var id = $(this).attr('data-id');
	// console.log(id);
	if (cart[id]==undefined){
		cart[id] = 1;
	}
	else{
		cart[id]++;
	}
	showMiniCart();
	saveCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart() {
	var out="";
	for(var key in cart) {
		out +=`<p class ="minicart_item">товар с ид: ${key}, штук: ${cart[key]}</p>`;
	}
	$('.mini_cart').html(out);
}

function loadCart() {
	if (localStorage.getItem('cart')){
		cart = JSON.parse(localStorage.getItem('cart'));
		showMiniCart();
	}
}

$(document).ready(function(){
	init();
	loadCart();
});