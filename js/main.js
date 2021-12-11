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

			if (!$(this).hasClass('is-active')) {
				popupGlobal.removeClass('is-active');
				popupButton.removeClass('is-active');
			}

			$(this).toggleClass('is-active');
			$(this).next(popupGlobal).toggleClass('is-active');
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

	// Stories slider
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

			$(this).find(passShowIcon).toggleClass('is-hidden');

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
			let spinner = $(this),
				input = spinner.find('input[type="number"]'),
				btnUp = spinner.find('.quantity-up'),
				btnDown = spinner.find('.quantity-down'),
				min = input.attr('min'),
				max = input.attr('max');

			btnUp.click(function () {
				let oldValue = parseFloat(input.val());
				if (oldValue >= max) {
					let newVal = oldValue;
					spinner.find("input").val(newVal);
					spinner.find("input").trigger("change");
				} else {
					let newVal = oldValue + 1;
					spinner.find("input").val(newVal);
					spinner.find("input").trigger("change");
				}
			});

			btnDown.click(function () {
				let oldValue = parseFloat(input.val());
				if (oldValue <= min) {
					let newVal = oldValue;
					spinner.find("input").val(newVal);
					spinner.find("input").trigger("change");
				} else {
					let newVal = oldValue - 1;
					spinner.find("input").val(newVal);
					spinner.find("input").trigger("change");
				}
			});
		});
	}

	// Range input
	if ($('.input-range').length) {
		let rangeSlider = $('.input-range input[type="range"]');

		rangeSlider.each(function () {
			let valCalcCurrent = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

			$(this).css('background-image',
				'-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-fill)), ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-background))' + ')'
			);
		})

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

		dropInputButton.on('click', function (e) {

			if (!$(this).hasClass('is-active')) {
				dropInputButton.removeClass('is-active');
				dropInputWrap.removeClass('is-active');
			}

			$(this).toggleClass('is-active');
			$(this).siblings(dropInputWrap).toggleClass('is-active');

			e.preventDefault();
			e.stopPropagation();
		});

		$(document).on('click', function () {
			dropInputWrap.removeClass('is-active');
			dropInputButton.removeClass('is-active');
		});

		dropInputLink.on('click', function (e) {
			dropInputWrap.removeClass('is-active');
			dropInputButton.removeClass('is-active');
			e.preventDefault();
		});
	}

	// Settings page
	if ($('.settings').length) {
		let settingsMenuBtn = $('.settings__menu-button');

		settingsMenuBtn.on('click', function () {
			settingsMenuBtn.removeClass('is-active');
			$(this).addClass('is-active');
		});
	}

	// Popovers
	if ($('.popover').length) {
		let popoverBtn = $('.popover__btn');
		let popoverPop = $('.popover__popup');

		popoverBtn.on('click', function (e) {

			if (!$(this).hasClass('is-active')) {
				popoverPop.removeClass('is-active');
				popoverBtn.removeClass('is-active');
			}

			$(this).toggleClass('is-active');
			$(this).next(popoverPop).toggleClass('is-active');
			e.stopPropagation();
		});

	}

	// Tooltip clickable
	if ($('.tooltip--clickable').length) {
		let tooltipClickable = $('.tooltip--clickable');
		let tooltipClickablePop = $('.tooltip--clickable .tooltip__popup');

		tooltipClickable.on('click', function () {
			$(this).toggleClass('is-active');
		});

		tooltipClickablePop.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	}

	// Gallery controled and preview sliders
	if ($('.gallery-controlled').length) {

		// Gallery controled
		let swiper = new Swiper(".gallery-controlled__slider", {
			grabCursor: true,
			spaceBetween: 5,
			speed: 800,
			navigation: {
				nextEl: ".gallery-controlled__next",
				prevEl: ".gallery-controlled__prev",
			},
			pagination: {
				el: ".gallery-controlled__pagination",
				clickable: true,
			},
		});

		// Gallery with preview
		let swiper1 = new Swiper(".gallery-controlled--preview1", {
			spaceBetween: 5,
			loop: true,
			slidesPerView: 3,
			freeMode: true,
			watchSlidesProgress: true,
		});

		let swiper2 = new Swiper(".gallery-controlled--preview2", {
			spaceBetween: 5,
			speed: 800,
			autoHeight: true,
			navigation: {
				nextEl: ".gallery-controlled--preview__next",
				prevEl: ".gallery-controlled--preview__prev",
			},
			thumbs: {
				swiper: swiper1,
			},
		});
	}

	// Progress bar
	if ($('.progress-bar').length) {
		let progressBar = $('.progress-bar');

		progressBar.each(function () {
			let valCalcCurrent = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

			$(this).css('background-image',
				'-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-fill)), ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-background))' + ')'
			);
		});

		progressBar.on('input change', function () {
			let valCalcCurrent = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
			let thisVal = $(this).val();

			$(this).css('background-image',
				'-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-fill)), ' + 'color-stop(' + valCalcCurrent + ', var(--input-range-background))' + ')'
			);

			$(this).parent().find('.progress-bar__value').text(thisVal + '%');
		});

	}

	// Tabs
	if ($('.tabs').length) {
		let tabButton = $('.tabs__button');
		let tabItems = $('.tabs__items');

		tabButton.on('click', function () {
			let id = this.id;
			let tabItem = $('.tabs__item[data-id="#' + id + '"]');

			if (!$(this).hasClass('tabs__button--first')) {
				$(this).parent().find(tabButton).removeClass('is-active');
				$(this).parent().next(tabItems).addClass('is-active');
				$(this).addClass('is-active');
				$(this).parent().next(tabItems).find('.tabs__item').removeClass('is-active');

				tabItem.addClass('is-active');
			} else {

				$(this).parent().find(tabButton).removeClass('is-active');
				$(this).addClass('is-active');
				$(this).parent().next(tabItems).removeClass('is-active');
				$(this).parent().next(tabItems).find('.tabs__item').removeClass('is-active');

				tabItem.addClass('is-active');
			}


		});

	}

	// Accordion
	if ($('.accordion').length) {
		let accordionBtn = $('.accordion__btn');

		accordionBtn.click(function () {
			$(this).toggleClass('is-active');
			$(this).next().slideToggle(100);
			$(this).closest('.accordion').find(accordionBtn).not(this).removeClass('is-active');
			$(this).closest('.accordion').find(accordionBtn).not(this).next().slideUp(100).removeClass('is-active');
		});
	}

	// Offcanvas
	if ($('.offcanvas').length) {
		let offcanvasBtn = $('.offcanvas__button');
		let offcanvasOverlay = $('.offcanvas__overlay');
		let offcanvas = $('.offcanvas');

		offcanvasBtn.on('click', function () {
			offcanvasOverlay.fadeIn();
			offcanvas.addClass('is-active');
		});

		$(document).on('click', ".offcanvas__overlay, .offcanvas__close", function () {
			offcanvasOverlay.fadeOut();
			offcanvas.removeClass('is-active');
		});
	}

	// Notification
	if ($('.notification').length) {
		$('.notification__close').on('click', function () {
			$(this).closest('.notification').fadeOut(200);
		});
	}

	// Modals
	if ($('.modal').length) {
		let modal = $('.modal__wrap');
		let modalBtn = $('.button__modal');
		let modalOverlay = $('.modal__overlay');

		modalBtn.on('click', function () {
			let id = this.id;
			let thisModal = $('.modal__wrap[data-id="#' + id + '"]');
			thisModal.fadeIn(200);
			modalOverlay.fadeIn(200);
		});

		$(document).on('click', ".modal__close, .modal__overlay, .modal__button", function () {
			modal.fadeOut(200);
			modalOverlay.fadeOut(200);
		});


	}

	// Portlets
	if ($('.portlet').length) {
		$('.portlet__close').on('click', function () {
			$(this).closest('.portlet').fadeOut(200);
		})

		$('.portlet__actions-min').on('click', function () {
			$(this).closest('.portlet').find('.portlet__content').slideToggle(200);
			$(this).toggleClass('is-active');
		})
	}

	// Alerts
	if ($('.alert').length) {
		$('.alert__close').on('click', function () {
			$(this).closest('.alert').fadeOut(200);
		});
	}

	// Radio
	if ($('.radio').length) {

		// Show and hide player
		$('.radio__btn').on('click', function () {
			$(this).toggleClass('is-active')
			$('.radio__box').toggleClass('is-active');
			$('.radio__playlist').removeClass('is-active');
			$('.radio__show-list').removeClass('is-active');
			$('.radio__share-popup').fadeOut(100);
		});

		// Radio player and controls
		let $player = $('#my_player');

		// Controls Events
		$('.controls').on('click', 'a', function (e) {
			e.preventDefault();
			let $this = $(this),
				action = $this.attr('href');
			if ('#prev' == action) {
				prev_track($('.playlist'));
			}
			if ('#next' == action) {
				next_track($('.playlist'));
			}
			if ('#playpause' == action) {
				if ($this.hasClass('is-play')) {
					$this.removeClass('is-play').addClass('is-pause');
					$player[0].play();
				} else {
					$this.removeClass('is-pause').addClass('is-play');
					$player[0].pause();
				}
			}
			if ('#bck' == action) {
				$player[0].currentTime -= 15;
			}
			if ('#fwd' == action) {
				$player[0].currentTime += 15;
			}
		});

		// Go to next track, when current ended
		$player.on('ended', function () {
			next_track($('.playlist'));
		});

		// Playlist Event
		$('.playlist').on('click', 'a.audio-link', function (e) {
			$(this).parents('ul').children('.is-playing').removeClass('is-playing');
			e.preventDefault();
			$player[0].pause();
			$player.attr('src', $(this).attr('href'));
			$player[0].play();
			$(this).parent().addClass('is-playing');
			$('a[href="#playpause"]').removeClass('is-play').addClass('is-pause');

			let thisCover = $(this).find('.radio__playlist-cover img').attr('src');
			let thisName = $(this).find('.radio__playlist-name').text();
			let thisWave = $(this).find('.radio__playlist-wave').text();

			$('.radio__cover img').attr('src', thisCover);
			$('.radio__title-name').text(thisName);
			$('.radio__title-wave').text(thisWave);
		});

		// Player slider
		$("#slider").slider({
			range: "min",
			min: 0,
			max: 100,
			value: 50,
			slide: function (event, ui) {
				$player[0].volume = ui.value * 0.01;
			}
		});

		// Radio mute
		$('.radio__volume-button').on('click', function () {
			$(this).toggleClass('is-active');

			if ($player[0].volume != 0) {
				$player[0].volume = 0;
			} else {
				$player[0].volume = 0.5;
			}

		});

		// Playlist show
		$('.radio__show-list').on('click', function () {
			$(this).toggleClass('is-active');
			$('.radio__playlist').toggleClass('is-active');
		});


		// Share button
		$('.radio__share').on('click', function () {
			$('.radio__share-popup').fadeToggle();
		});

		$('.radio__share-link').on('click', function () {
			$('.radio__share-popup').fadeOut();
		});
	}

	// Slider in post card
	const myCarousel = new Carousel(document.querySelector(".carousel"), {
		// Options
		Dots: false,
		slides: [
			{ 'slidesPerPage': 2 }
		],

	});


});




