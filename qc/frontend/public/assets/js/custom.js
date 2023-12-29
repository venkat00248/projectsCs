document.addEventListener("DOMContentLoaded", function(){
		
    window.addEventListener('scroll', function() {
       
        if (window.scrollY > 50) {
            document.getElementById('navbar_top').classList.add('fixed-top');
            // add padding top to show content behind navbar
            navbar_height = document.querySelector('.topnav').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
        } else {
             document.getElementById('navbar_top').classList.remove('fixed-top');
             // remove padding top from body
            document.body.style.paddingTop = '0';
        } 
    });
});  



! function(t) {
  "use strict";

  function s() {
      for (var e = document
              .getElementById(
                  "topnav-menu-content"
                  )
              .getElementsByTagName(
                  "a"), t = 0, n = e
              .length; t < n; t++)
          "nav-item dropdown active" ===
          e[t].parentElement
          .getAttribute("class") && (
              e[t].parentElement
              .classList.remove(
                  "active"), e[t]
              .nextElementSibling
              .classList.remove(
                  "show"))
  }
 
  function e() {
      document.webkitIsFullScreen ||
          document.mozFullScreen ||
          document
          .msFullscreenElement || (
              console.log("pressed"),
              t("body").removeClass(
                  "fullscreen-enable")
              )
  }
 document.addEventListener(
          "fullscreenchange", e),
      document.addEventListener(
          "webkitfullscreenchange", e
          ), document
      .addEventListener(
          "mozfullscreenchange", e),
      t(".right-bar-toggle").on(
          "click",
          function(e) {
              t("body").toggleClass(
                  "right-bar-enabled"
                  )
          }), t(document).on("click",
          "body",
          function(e) {
              0 < t(e.target).closest(
                      ".right-bar-toggle, .right-bar"
                      ).length || t(
                      "body")
                  .removeClass(
                      "right-bar-enabled"
                      )
          }),
      function() {
           {
              for (var e = document
                     
                      .getElementsByTagName(
                          "a"), t = 0,
                      n = e
                      .length; t <
                  n; t++) e[t]
                  .onclick = function(
                      e) {
                      "#" === e.target
                          .getAttribute(
                              "href"
                              ) && (e
                              .target
                              .parentElement
                              .classList
                              .toggle(
                                  "active"
                                  ), e
                              .target
                              .nextElementSibling
                              .classList
                              .toggle(
                                  "show"
                                  ))
                  };
              window.addEventListener(
                  "resize", s)
          }
      }(), t(function() {
          t('[data-toggle="tooltip"]').tooltip({
              trigger : 'hover'
           });
      }), t(function() {
          t('[data-toggle="popover"]')
              .popover()
      }) 
}(jQuery);