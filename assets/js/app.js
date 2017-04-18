$(document).ready(() => {

  const productData = JSON.parse(localStorage.getItem('productData'));
  const activeSubscriptionItem = localStorage.getItem('subscriptionProduct');
  const pricePerBox = localStorage.getItem('pricePerBox');
  const activeElementStep2 = localStorage.getItem('activeElementStep2');
  //sdaфыв
  if (activeSubscriptionItem && pricePerBox) {
    $('#' + activeSubscriptionItem).addClass('coffee-section__item_active js-item-active');
    $('.js-price-per-box').empty().html(pricePerBox);
  }
  else {
    $('#step2').hide();
    $('#step3').hide();
  }

  if (activeElementStep2) {
    $('#' + activeElementStep2).addClass('js-plan-active _active')
  }
  else {
    $('#step3').hide();
  }

  var initQtyImages = function() {
    var arrOfImages = $('.js-item-active').data('qtyImage');
    var defaultImage = $('#quantity-1').find('.subscribe-item__image img').data('defaultImage');


    if (arrOfImages && arrOfImages.length > 0) {
      for (var i = 0; i < 3; i++) {
        $('#quantity-' + (i+1)).find('.subscribe-item__image img').attr('src', arrOfImages[i]);
      }
    }

    else {
      for (var i = 0; i < 3; i++) {
        $('#quantity-' + (i+1)).find('.subscribe-item__image img').attr('src', defaultImage);
      }
    }
  };

  if (window.location.pathname === '/subscription') {
    initQtyImages();
  };

  const initProductView = (data, $el) => {
    $('.js-product-title').empty().html(data.itemName);
    $('.js-product-description').empty().html(data.itemDescription);
    $('.js-product-label').empty().html(data.itemCountry);
    $('.js-product-weight').empty().html(data.planWeight);
    $('.js-product-price-text').empty().html(data.itemPriceText);
    $('.js-product-long-description').empty().html(data.itemLongDescription);
    $('.js-product-image').empty().html("<img src='" + data.itemImage + "' />");

    $('.js-product-view').removeClass('_hidden');

    if (data.itemPurchaseType.includes('Standard')) {
      $('.js-product-cart-button').empty().html("<div class='product-view__button js-cart-button snipcart-add-item js-product-view-add'>ADD TO CART</div>");
    } else {
      $('.js-product-cart-button').empty()
    }

    if (data.itemPurchaseType.includes('Subscription')) {
      $('.js-product-subscription-button').empty().html("<div class='product-view__button js-product-view-subscribe snipcart-add-plan'>SUBSCRIPTION</div>");
    } else {
      $('.js-product-subscription-button').empty()
    }

    const cartData = $($el).parent('.quickshop-item__buttons').find('.js-cart-button').data();
    const subscriptionData = $($el).parent('.quickshop-item__buttons').find('.js-subscription-button').data();

    $('.js-product-view-add').data(cartData);
    $('.js-product-view-subscribe').data(subscriptionData);


    const offset = $('#productView')[0].offsetTop;
    $('body').animate({scrollTop: offset}, 500);

  }

  $('.js-toggle-menu').on('click', () => {
    $('.mobile-menu').toggleClass('_hidden');
  })

  const initSubscribtion = () => {
    $('body').on('click', '.js-coffee-item', function() {
      localStorage.clear();
      localStorage.setItem('subscriptionProduct', $(this)[0].id);
      localStorage.setItem('pricePerBox', $(this).data('pricePerBox'));

      if (window.location.pathname !== '/subscription.html') {
        window.location.href= "/subscription.html#step2";
      }

      else {
        $('#step2').fadeIn(500);
        $('.js-price-per-box').empty().html($(this).data('pricePerBox'))
        let offset = $('#step2').offset().top;

        $('body').animate({scrollTop: offset}, 500);
      }

      initQtyImages();

    });
  }

  const initSubscribtionStep2 = () => {
    $('.subscribe-item').on('click', function() {
      localStorage.setItem('activeElementStep2', null)
      $('.subscribe-item').removeClass('_active js-plan-active');
      $(this).addClass('_active js-plan-active');

      localStorage.setItem('activeElementStep2', $(this)[0].id)

      let offset = $('#step3').offset().top;

      $('body').animate({scrollTop: offset}, 500);

      $('#step3').fadeIn(500);


    });
  };

  const initSubscribtionCheckout = () => {
    $('.js-submit-subscription').on('click', function() {

      const coffeeItemId = $('.js-item-active')[0].id;
      const quantityItemId = $('.js-plan-active')[0].id;
      const snipcartButtonId = `${coffeeItemId}_${quantityItemId}`;

      $(`#${snipcartButtonId}`).trigger('click');

      console.log($(`#${snipcartButtonId}`).data())

      if ($(this).hasClass('js-to-shop')) {
        setTimeout(() => window.location.href = '/shop.html', 500)
      }

      localStorage.clear();
    });

  }

  initSubscribtionCheckout();

  initSubscribtionStep2();

  initSubscribtion();

  const showProductView = () => {
    $('body').on('click', '.js-view-product', function() {
      localStorage.clear();
      let data = $(this).data();

      if (window.location.pathname === '/shop.html') {
        initProductView(data, $(this));
      }

      else {
        data = JSON.stringify(data)
        localStorage.setItem('productData', data);
        window.location.href = '/shop.html';
      }
    });
  }

  if (productData && window.location.pathname === '/shop.html') {
    initProductView(productData);
  }

  const chosenDropdownItem = () => {
    $('body').on('click', '.js-option', function() {
      const value = $(this).html();
      $(this).closest('.js-dropdown').find('.js-dropdown-header').empty().html(value);
    });
  }

  chosenDropdownItem();

  const totalSlides = $('.js-slider .team__slide').length;

  const setCurrentSlide = () => {
    const currentSlide = $('.js-slider').slick('slickCurrentSlide') + 1;
    $('.js-current-slide').empty().text(currentSlide);
  };

  $('.js-coffee-item').on('click', function() {
    $('.js-coffee-item').removeClass('coffee-section__item_active js-item-active');
    $(this).addClass('coffee-section__item_active js-item-active');
  });

  $('.js-slider').slick({
    arrows: true,
    initialSlide: 1,
    swipe: false
  });

  $('.js-prev-slider').slick({
    arrows: true,
    initialSlide: 0,
    swipe: false
  });

  $('.js-slider').find('.slick-next').on('click', function() {
    $('.js-prev-slider').find('.slick-next').trigger('click');
    setCurrentSlide();
  });

  $('.js-slider').find('.slick-prev').on('click', function() {
    $('.js-prev-slider').find('.slick-prev').trigger('click');
    setCurrentSlide();
  });

  $('.js-counter').find('.js-total').empty().text(totalSlides);

  // Products Background colour

  $('.quickshop__item')
    .mouseenter(function(){
      const color = $(this).data('hover');
      $(this).find('.quickshop-item__inner').css('background', 'rgba(' + color + ',1)');
    })
    .mouseleave(function(){
      $(this).find('.quickshop-item__inner').css('background', '#f7f7f7');
    });


    const initHomeSlider = (windowWidth) => {
      if (windowWidth < 768 && !$('.js-quickshop-slider').hasClass('slick-initialized')) {
        $('.js-quickshop-slider').slick({
          mobileFirst: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false
        })
      }
      else if (windowWidth > 768 && $('.js-quickshop-slider').hasClass('slick-initialized')) {
        $('.js-quickshop-slider').slick('unslick');
      }

    }

    $('body').on('click', '.js-closeProductView', () => {
      $('.js-product-view').addClass('_hidden');
      localStorage.clear();
    });

    initHomeSlider($(window).width());

    $(window).on('resize', () => {
      let windowWidth = $(window).width();
      initHomeSlider(windowWidth);
    })

    // inline SVG

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

    showProductView();

});
