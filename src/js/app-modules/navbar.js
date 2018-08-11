var Navbar = function(){
  var DOM = {};
  var options = {};

  function _cacheDom(element) {
    DOM.$el = $(element);
    DOM.$sandwitch = DOM.$el.find('.js--navbar-sandwitch');
    DOM.$menuContainer = DOM.$el.find('.js--navbar-menu-container');
  }

  function _bindEvents(element) {
    DOM.$sandwitch.on('click', _toggleMenu);
  }

  function _toggleMenu(element) {
    DOM.$menuContainer.slideToggle('fast');
  }

  function _render(){

  }

  function init(element) {
    if (element) {
      _cacheDom(element);
      _bindEvents();
      _render();
    }
  }

  return {
    init: init
  };
};
