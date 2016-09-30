<?php

$to_email  = "";
$from_email 	= "test";
$subject = "Входящая заявка с сайта";

$mail = $_POST['mail'];
$type = $_POST['type'];
$name = $_POST['name'];
$message = $_POST['message'];
$phone = $_POST['phone'];
$hidden = $_POST['hidden'];

$message ="Кнопка заявки: ".$hidden."\n".
        "Имя: ".$name."\n".
        "Номер телефона: ".$phone."\n".
        "Почта: ".$mail."\n".
        "Сообщение: ".$message."\n".
        "Товар: ".$type."\n";

		$headers = 'From: '.$from_email.'' . "\r\n" .
        "Content-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit" .
		'Reply-To: '.$from_email.'' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();


    mail($to_email, $subject, $message, $headers);

?>

