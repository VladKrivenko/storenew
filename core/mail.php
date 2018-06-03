<?php

$json = file_get_contents('../goods.json');
$json = json_decode($json,true);



$message = '';
$message .= '<h1>Order from the oceanarium store</h1>';
$message .='<p>Phone number: '.$_POST['ephone'].'</p>';
$message .='<p>Email: '.$_POST['email'].'</p>';
$message .='<p>Client: '.$_POST['ename'].'</p>';

$cart = $_POST['cart'];
$total = 0;
foreach ($cart as $id=>$count){
	$message .='<div>';
	$message .='<span> good with id:'.$id.' --- '.$json[$id] ['name'].' --- </span>';
	$message .='<span> amount: '.$count.' ---</span>';
	$message .='<span> value to pay: '.$count*$json[$id]['cost'].'$</span>';
	$message .='</div>';
	$total = $total +$count*$json[$id]['cost'];
}
	$message .='<p> Amount to pay: '.$total.'$</p>';


// print_r($message);

$to = 'nesslaendyplom@gmail.com'.',';
$to .=$_POST['email'];
// $spectext = '<!DOCTYPE html><html><head><title>order</title</head><body>';
// $headers = 'MIME-Version: 1.0' . "\r\n";
// $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
// <?mail($to, 'Order in Oceanarium store', $spectext.$message.'</body></html>', $headers);


$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Order in Oceanarium', $spectext.$message.'</body></html>', $headers);

if (mail) {echo 1;} else {echo 0;}