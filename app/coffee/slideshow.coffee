init = ->
  opts =
    auto: false
    pager: true
    nav: true
    speed: 500
    maxwidth: 550
    namespace: "centered-btns"

  $('#slideshow').responsiveSlides opts

module.exports = init
