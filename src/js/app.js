$(document).ready(function (){
  // Sequential attempts to load images
  $('.js--init-navbar').each(function(){
    var n = Navbar();
    n.init(this);
  });
});
