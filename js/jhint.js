$.fn.addHint = function (options) {
  var defaults = {
    hintClass:'jHint',
    fadeTo:0.4,
    fadeDur:200
  };
  var settings = $.extend(defaults, options);

  return this.each(function () {
    // wrap input in container
    // create a dummy input overlay and place it after the input
    $(this).wrap($('<div />').css({ 'position':'relative' }));
    var hint = $('<div />').addClass(settings.hintClass).insertAfter($(this));

    // establish relationship between elements
    hint.data('field', $(this));
    $(this).data('overlay', hint);

    // apply the input's title attribute to the hint
    var text = $(this).attr('title');
    hint.html(text);

    // bind click on the overlay, focus/blur on field
    hint.click(function () {
      $(this).stop().animate({ opacity:settings.fadeTo }, settings.fadeDur);
      $(this).data('field').focus();
    });
    $(this).bind('focus',
      function () {
        $(this).data('overlay').stop().animate({ opacity:settings.fadeTo }, settings.fadeDur);
      }).bind('blur',
      function () {
        if (!$(this).val()) $(this).data('overlay').stop().show().animate({ opacity:1 }, settings.fadeDur);
      }).bind('change keyup input paste', function () {
        if ($(this).val()) $(this).data('overlay').hide();
      });

    // on page load, show/hide overlay based on data in field
    // delay until after form autofill has executed
    var input = $(this);
    var _to = window.setTimeout(function () {
      input.triggerHandler('blur');
      window.clearTimeout(_to);
    }, 100);
  });
};
