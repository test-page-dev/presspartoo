$(function () {
	'use strict';

	// Burger & sidebar
	if ($('.burger').length) {
		let burgerWrap = $('.burger');

		burgerWrap.on('click', function () {
			$('.columns__left').slideToggle(200);
		})
	}

	// Custom select
	if ($('.custom-select').length) {
		function custom_select() {

			$('.custom-select:not(.select__hidden)').each(function () {
				let $this = $(this), numberOfOptions = $(this).children('option').length;

				$this.wrap('<div class="select"></div>');
				$this.after('<div class="select__styled"></div>');

				let $styledSelect = $this.next('div.select__styled');
				$styledSelect.text($this.children('option').eq(0).text());

				if ($this.attr('class')) {
					$styledSelect.addClass($this.attr('class'));
				}

				$this.addClass('select__hidden');

				let $list = $('<ul />', {
					'class': 'select__options'
				}).insertAfter($styledSelect);

				for (let i = 0; i < numberOfOptions; i++) {
					$('<li />', {
						text: $this.children('option').eq(i).text(),
						rel: $this.children('option').eq(i).val()
					}).appendTo($list);
				}

				let $listItems = $list.children('li');

				$styledSelect.on('click', function (e) {
					e.stopPropagation();
					$('div.select__styled.active').not(this).each(function () {
						$(this).removeClass('active').next('ul.select__options').fadeOut(200);
					});
					$(this).toggleClass('active').next('ul.select__options').fadeToggle(200);
				});

				$listItems.on('click', function (e) {
					e.stopPropagation();
					$styledSelect.text($(this).text()).removeClass('active');
					$this.val($(this).attr('rel'));

					$this.trigger('change'); // TRIGGER CHANGE EVENT;

					$list.fadeOut(200);
				});

				$(document).on('click', function () {
					$styledSelect.removeClass('active');
					$list.fadeOut(200);
				});
			});
		}

		custom_select();
	}

	// Header search
	if ($('.header__search').length) {
		let headerSearchDesktop = $('.header__search');
		let headerSearchMobile = $('.header__search--mobile');
		let headerSearchClear = $('.header__search-clear');
		let headerSearchInput = $('.header__search-input');

		headerSearchInput.on('input change', function () {
			if ($(this).val() != 0) {
				headerSearchClear.addClass('is-active');
			} else {
				headerSearchClear.removeClass('is-active');
			}
		});

		headerSearchMobile.on('click', function () {
			$(this).toggleClass('is-active');
			headerSearchDesktop.toggleClass('is-active');
			$('.header__actions').toggle();
			$('.header__user').toggle();
			$('.header__settings-wrap').toggle();
			$('.burger').toggle();
			$('.header__menu-wrap').toggleClass('is-active');
		});

	}

	// Header popups
	if ($('.header').length) {
		let popupButton = $('.popup-button');
		let popupGlobal = $('.popup-global');
		let popupGlobalLink = $('.popup-global a');

		popupButton.on('click', function (e) {
			popupGlobal.removeClass('is-active');
			$(this).next(popupGlobal).addClass('is-active');
			e.stopPropagation();
		});

		$(document).on('click', function () {
			popupGlobal.removeClass('is-active');
		});

		popupGlobal.on('click', function (e) {
			e.stopPropagation();
		});

		popupGlobalLink.on('click', function () {
			popupGlobal.removeClass('is-active');
		});
	}

	// Main actions tabs
	if ($('.main__actions').length) {
		let mainActionTab = $('.main__actions-tab');
		let mainActionBox = $('.main__actions-box');

		mainActionTab.on('click', function () {
			mainActionTab.removeClass('is-active');
			$(this).addClass('is-active');
			let id = this.id;
			mainActionBox.removeClass('is-active');
			let mainActionBoxActive = $('.main__actions-box[data-id="#' + id + '"]');
			mainActionBoxActive.addClass('is-active');
		});
	}

	// Stories
	if ($('.stories').length) {
		let swiper = new Swiper(".stories__slider", {
			freeMode: true,
			slidesPerView: "auto",
			spaceBetween: 15,
			// mousewheel: true,
		});
	}

	// Reply button
	if ($('.comments__item').length) {
		let replyButton = $('.comments__reactions-reply');
		let commentInput = $('.comment-input');
		let commentContent = $('.comments__content');

		replyButton.on('click', function () {
			$(this).closest(commentContent).find(commentInput).slideDown(300);
		});
	}

	// Custom audio players
	const players = Array.from(document.querySelectorAll('.js-player')).map(p => new Plyr(p));

	// Messages filter
	if ($('.messages').length) {
		function filter(filter, query) {
			query = $.trim(query);
			$(filter).each(function () {
				($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('name') :
					$(this).show().addClass('name');
			});
		}

		$('.messages__filter input').on('input', function (event) {
			if (event.keyCode == 27 || $(this).val() == '') {
				$(this).val('');
				$('.messages__list li').removeClass('name').show().addClass('name');
			}
			else {
				filter('.messages__list li', $(this).val());
			}
		});
	}

	// Friends filter
	if ($('.friends-box').length) {
		function filter(filter, query) {
			query = $.trim(query);
			$(filter).each(function () {
				($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('name') :
					$(this).show().addClass('name');
			});
		}

		$('.friends-box__filter input').on('input', function (event) {
			if (event.keyCode == 27 || $(this).val() == '') {
				$(this).val('');
				$('.friends-box__list li').removeClass('name').show().addClass('name');
			}
			else {
				filter('.friends-box__list li', $(this).val());
			}
		});
	}

	// Show password button
	if ($('.password-input').length) {
		let passInput = $('.password-input');
		let passShowButton = $('.password-input__show-btn');

		passInput.on('input', function () {
			if ($(this).val() != 0) {
				$(this).next(passShowButton).removeClass('is-hidden');
			} else {
				$(this).next(passShowButton).addClass('is-hidden');
			}
		});

		passShowButton.on('click', function () {
			let passShowIcon = $('.password-input__show-icon');
			let passInputPrev = $(this).prev('.password-input');
			passInputPrev

			passShowIcon.toggleClass('is-hidden');

			if (passInputPrev.attr('type') == 'password') {
				passInputPrev.attr('type', 'text');
			} else {
				passInputPrev.attr('type', 'password');
			}

		});
	}

	// File upload input
	if ($('.file-input').length) {
		let fields = document.querySelectorAll('.file-input__input');

		Array.prototype.forEach.call(fields, function (input) {
			let label = input.nextElementSibling,
				labelVal = label.querySelector('.file-input__text').innerText;

			input.addEventListener('change', function (e) {
				let countFiles = '';
				if (this.files && this.files.length >= 1)
					countFiles = this.files.length;

				if (countFiles)
					label.querySelector('.file-input__text').innerText = 'Files selected : ' + countFiles;
				else
					label.querySelector('.file-input__text').innerText = labelVal;
			});
		});
	}

	// Fixed actions box on scroll
	if ($('.main__actions').length) {
		let actionFixed = $('.main__actions');
		let postBox = $('.post__list ');
		let postTextarea = $('.post__profile-textarea');

		$(window).on('scroll', function () {
			if ($(window).width() >= 1024) {
				if ($(this).scrollTop() > 10) {
					actionFixed.addClass('is-active');
					postBox.addClass('is-active');
					postTextarea.addClass('is-active');
				} else {
					actionFixed.removeClass('is-active');
					postBox.removeClass('is-active');
					postTextarea.removeClass('is-active');
				}
			}
			// else {
			// 	if ($(this).scrollTop() > 900) {
			// 		actionFixed.addClass('is-active');
			// 		postBox.addClass('is-active');
			// 	} else {
			// 		actionFixed.removeClass('is-active');
			// 		postBox.removeClass('is-active');
			// 	}
			// }

		});
	}

	// Time input
	if ($('.bs-timepicker').length) {
		$('.bs-timepicker').timepicker();
	}

	// Number input
	if ($('.number-input').length) {
		$('<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>').insertAfter('.quantity input');
		$('.quantity').each(function () {
			var spinner = $(this),
				input = spinner.find('input[type="number"]'),
				btnUp = spinner.find('.quantity-up'),
				btnDown = spinner.find('.quantity-down'),
				min = input.attr('min'),
				max = input.attr('max');

			btnUp.click(function () {
				var oldValue = parseFloat(input.val());
				if (oldValue >= max) {
					var newVal = oldValue;
				} else {
					var newVal = oldValue + 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			});

			btnDown.click(function () {
				var oldValue = parseFloat(input.val());
				if (oldValue <= min) {
					var newVal = oldValue;
				} else {
					var newVal = oldValue - 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			});

		});
	}

	// Range input
	if ($('.input-range').length) {
		let rangeSlider = $('.input-range input[type="range"]');
		let valCalcGlobal = (rangeSlider.val() - rangeSlider.attr('min')) / (rangeSlider.attr('max') - rangeSlider.attr('min'));

		rangeSlider.css('background-image',
			'-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + valCalcGlobal + ', var(--input-range-fill)), ' + 'color-stop(' + valCalcGlobal + ', var(--input-range-background))' + ')'
		);

		rangeSlider.on('input change', function () {
			let valCalcCurrent = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

			$(this).css('background-image',
				'-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-fill)), ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-background))' + ')'
			);
		});
	}

	// Dropdown input
	if ($('.dropdown-input').length) {
		let dropInputWrap = $('.dropdown-input__popup');
		let dropInputButton = $('.dropdown-input__button');
		let dropInputLink = $('.dropdown-input__popup a');
		let dropInputIcon = $('.dropdown-input__button i');

		dropInputButton.on('click', function (e) {
			dropInputWrap.removeClass('is-active');
			$('.dropdown-input__button i').removeClass('is-active');
			$(this).find(dropInputIcon).addClass('is-active');
			$(this).siblings('.dropdown-input__popup').addClass('is-active');
			e.preventDefault();
			e.stopPropagation();
		});

		$(document).on('click', function () {
			dropInputWrap.removeClass('is-active');
			dropInputIcon.removeClass('is-active');
		});

		dropInputLink.on('click', function (e) {
			dropInputWrap.removeClass('is-active');
			dropInputIcon.removeClass('is-active');
			e.preventDefault();
		});
	}

	// Settings
	if ($('.settings').length) {
		let settingsMenuBtn = $('.settings__menu-button');

		settingsMenuBtn.on('click', function () {
			settingsMenuBtn.removeClass('is-active');
			$(this).addClass('is-active');
		});
	}
});





