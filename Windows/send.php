<?php
	/* ----------------------------------- */
	/* --- ОТПРАВКА СООБЩЕНИЯ НА EMAIL --- */
	/* ----------------------------------- */
	/* ПРИНИМАЕМ ДАННЫЕ ИЗ ФОРМЫ */

	// ::: Поле номера клиента одинаково для всех форм :::
	// Номер клиента
	if (isset($_POST["client-number"])) {$client_number = strip_tags(trim($_POST["client-number"]));}
	// Имя клиента
	if (isset($_POST["client-name"])) {$client_name = strip_tags(trim($_POST["client-name"]));}
	// Email клиента
	if (isset($_POST["client-email"])) {$client_email = strip_tags(trim($_POST["client-email"]));}


	if (!empty($client_number) && !empty($client_number) && !empty($client_number)) {
		// ::: Отправление письма :::
		// Адрес получателя письма
		$to_email = "kir3kin@yandex.ru";

		// Адрес сайта "Теплые полы"
		$site_hot_floors = "windows";

		// Тема письма
		$subject = "=?utf-8?B?".base64_encode("Заявка с сайта")."?=";

		// Заголовок письма	
		$headers = "Content-type:text/plain; charset=UTF-8\r\nFrom: $site_hot_floors";

		// Текст сообщения в зависимости от полученой формы
		$message = "Тема: Заказ чего-то!\nТелефон клиента: $client_number\nE-mail адрес клиента: $client_email\nИмя клиента: $client_name";

		$send = mail($to_email, $subject, $message, $headers) or die("Невозможно отправить сообщение.");
	}
?>