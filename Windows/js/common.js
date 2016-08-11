(function($) {
	$(document).ready(function() {

		/***************	проверка заполнения форм	*******************/
		var activeCheck = $("input[type=button]");//									все баттоны на странице
		var allFromElms = $("input[type=text], select");//						все текстовые инпуты и селекты на странице
		var phoneNumber = $("input[name*=number]");

		activeCheck.on("click", sendForm);//													отправка формы
		allFromElms.on("input", chekcActiveElms);
		allFromElms.on("blur", chekcActiveElms);
		phoneNumber.on("keydown", checkTel);
		//allFromElms.on("change", chekcActiveElms);//								раскомментировать для селектов

		// :::::: вспомогательные фц-ии проверки ::::::
		function checkTel(e) {
			var ch = e.which;
			if (ch < 30) return true;
			if (('0123456789 +-()').indexOf(String.fromCharCode(ch)) == -1) e.preventDefault();
		}

		function checkData(currentElm, currentForm) {//								проверка наличия текущего элемента в ошибках
			$(currentForm + " .error p[data-check=" + currentElm.attr('name') + "]").remove();
			currentElm.css("border-color", "#c9c9c9");
			if (currentElm.val() !== "") {
				if (((currentElm.attr('name').indexOf("email") !== -1) && (currentElm.val().search(/\w+@\w+(\.[a-z]{2,})+/i) === -1)) || ((currentElm.attr('name').indexOf("number") !== -1) && (currentElm.val().length < 10))) {
					currentElm.css("border-color", "#f00");
					$(currentForm + " .error h5").after("<p data-check=" + currentElm.attr("name") + "> - " + currentElm.attr("placeholder") + " is incorrect</p>");
				}
			} else {
				currentElm.css("border-color", "#f00");
				$(currentForm + " .error h5").after("<p data-check=" + currentElm.attr("name") + "> - " + currentElm.attr("placeholder") + " is required</p>");
			}
		}

		function checkEmptyFields(currentForm) {//															появление или исчезание формы с ошибками взависимости от наличия ошибок
			var emptyField = false;
			if ($(currentForm + " .error p").length === 0) {
				$(currentForm + " .error").css("display", "none");
			} else {
				$(currentForm + " .error").css("display", "block");
				emptyField = true;
			}
			return emptyField;
		}

		function chekcActiveElms() {
			var nameCurrentForm = "." + $(this).parent().attr("name");//					класс формы текущего элемента
			checkData($(this), nameCurrentForm);
			checkEmptyFields(nameCurrentForm);
		}

		function OffScroll () {//																								отмена прокрутки страници
			var winScrollTop = $(window).scrollTop();
			$(window).on('scroll', function() {
				$(window).scrollTop(winScrollTop);
			});
		}
		// :::::: /вспомогательные фц-ии проверки/ ::::::

		function sendForm() {//																									проверка формы при ее отправке
			var sendSucText = "Спасибо за заявку, с Вами скоро свяжутся!";
			var sendErrorText = "При отправке заявки возникла ошибка. Обратитесь к Администратору.";

			var nameCurrentForm = "." + $(this).parent().attr("name");//					класс формы текущего элемента
			var formElms = $(nameCurrentForm).find("input[type=text], select");//	все элементы текущей формы
			var emptyField = false;//																							есть ли пустые элементы

			formElms.each(function(index, elem) {
				checkData($(elem), nameCurrentForm);
			});
			emptyField = checkEmptyFields(nameCurrentForm);

			function sendData(sendText, result) {//										инициирование поведения при успешной отправке формы 
				var overlay = $(".overlay");//													задний фон для модальных окон
				var sendModal = $(".send-data").html("");
				var sendModalText = document.createElement("p");
				OffScroll();

				(result) ? sendModalText.setAttribute("class", "success-send") : sendModalText.setAttribute("class", "error-send");
				sendModal.append(sendModalText);
				$(".send-data p").text(sendText);

				overlay.fadeIn(300, function() {//											появление формы об удачном отправлении данных
					$(".send-data").css({
						"display": "block",
						"opacity": 1
					})
				});
				setTimeout(function(){//																исчезание формы через 2 секунды
					$(".send-data").animate({
						"opacity": 0,
						"display": "none"
					}, 300);
					overlay.fadeOut(400);
					$(window).unbind('scroll'); //												выключение отмены прокрутки документа
				}, 2000);
				formElms.val("");//																			очистка заполненых элементов формы
			}

			function sendSuc() { sendData(sendSucText, true); }
			function sendError() { sendData(sendErrorText, false); }

			if (!emptyField) {//																			при пустом любом элементе формы, отправка не произойдет
				var data = $(nameCurrentForm).serialize();//						отправка данных и названия формы
				$.ajax({
					type: "POST",
					url: "send.php",
					data: (data),
					error: function() {
						sendError();
						console.error("При отправке возникла ошибка, обратитесь к Администратору!");
					},
					success: function() {
						sendSuc();
					}
				});
			}
		}
		/***************	/проверка заполнения форм/	*******************/

		/***************	навигация страници	*******************/
		$(".top-menu a, .process a").click(function(e) {
			var page = $(this).attr("href");//											нужный элемент
			var delay = 1000;//																			время прокрутки
			var needPosition = $("." + page).position().top;//			позиция нужного элемента
			$("html, body").animate({//															прокрутка к нужному элементу
				scrollTop: needPosition
			}, delay);
			e.preventDefault();//																		отмена привычного поведения
		});
		/***************	/навигация страници/	*******************/

	});
}(jQuery));