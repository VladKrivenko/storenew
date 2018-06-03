var cart ={};
function loadCart() {
	if (localStorage.getItem('cart')){
		cart = JSON.parse(localStorage.getItem('cart'));
			showCart();
		}
	else{
		$('.main_cart').html('cart has no tovarov');	
	}
}

function showCart(){
	if (!isEmpty(cart)){
			$('.main_cart').html('Cart is empty');
			$('.total').html('Nothing to pay');
		}
		else {
	$.getJSON('goods.json', function(data){
		var goods = data;
		var out = '';
		var total = 0;
		for (var id in cart) {
			// out +=`<img src ="img/${goods[id].img}">`;
			out +='<div class="main_cart_item">';
			out +=`<p class="name">${goods[id].name}</p>`;
			out += `<img src="img/${goods[id].img}"alt="">`;
			out += `<p class="cost">amount: ${cart[id]}</p>`;
			out += `<p class="cost">cost ${goods[id].cost}$</p>`;
			out += `<p class="cost">value ${goods[id].cost*cart[id]}$</p>`;
			out += `<button data-id="${id}" class="del_goods">x</button>`;
			out += `<button data-id="${id}" class="minus_goods">-</button>`;
			out += `<button data-id="${id}" class="plus_goods">+</button>`;
			out +='</div>';
			total += goods[id].cost * cart[id];
		}
		$('.total').html(`Value to pay: ${total.toFixed(2)} $`);	
		$('.main_cart').html(out);
		$('.del_goods').on('click', delGoods);
		$('.plus_goods').on('click', plusGoods);
		$('.minus_goods').on('click', minusGoods);
		// if (!isEmpty(cart)){
		// 	$('.total').html('Value to pay: 0$');
		// }
	});
	}
}

function delGoods(){
	var id = $(this).attr('data-id');
	delete cart[id];
	saveCart();
	showCart();
}

function plusGoods(){
	var id = $(this).attr('data-id');
	cart[id]++;
	saveCart();
	showCart();
}

function minusGoods(){
	var id = $(this).attr('data-id');
	if(cart[id] == 1){
		delete cart[id];
	}
	else{
		cart[id]--;
	}
	saveCart();
	showCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object){
	for (var key in object){
		if (object.hasOwnProperty(key)){
			return true;
		}
		else{
			return false;
		}
	}

}

function sendEmail(){
	var ename = $('#ename').val();
	var email = $('#email').val();
	var ephone = $('#ephone').val();
	if (ename!='' && email!='' && ephone!='') {
if (isEmpty(cart)) {
            $.post(
            	"core/mail.php",
                {
                   "ename":ename,
                   "email":email,
                   "ephone":ephone,
                   "cart":cart
                },
                function(data){
                	if (data ==1){
                		alert('Order accepted');
                	}
                	else{
                		alert('Try again');
                	}
                }
            );
        }
		else {
			alert('Cart is empty');
		}
	}
	else{
		alert('Please fill fields');
	}
}

$(document).ready(function () {
	loadCart();
	$('.send-email').on('click', sendEmail);
});