
//----------------------------------------------------------------------------------------------- mobile responsive navbar
(() =>{
 
  const openNavMenu = document.querySelector(".open-nav-menu"),
  closeNavMenu = document.querySelector(".close-nav-menu"),
  navMenu = document.querySelector(".nav-menu"),
  menuOverlay = document.querySelector(".menu-overlay"),
  mediaSize = 991;

  openNavMenu.addEventListener("click", toggleNav);
  closeNavMenu.addEventListener("click", toggleNav);
  // close the navMenu by clicking outside
  menuOverlay.addEventListener("click", toggleNav);

  function toggleNav() {
  	navMenu.classList.toggle("open");
  	menuOverlay.classList.toggle("active");
  	document.body.classList.toggle("hidden-scrolling");
  }

  navMenu.addEventListener("click", (event) =>{
      if(event.target.hasAttribute("data-toggle") && 
      	window.innerWidth <= mediaSize){
      	// prevent default anchor click behavior
      	event.preventDefault();
      	const menuItemHasChildren = event.target.parentElement;
        // if menuItemHasChildren is already expanded, collapse it
        if(menuItemHasChildren.classList.contains("active")){
        	collapseSubMenu();
        }
        else{
          // collapse existing expanded menuItemHasChildren
          if(navMenu.querySelector(".menu-item-has-children.active")){
        	collapseSubMenu();
          }
          // expand new menuItemHasChildren
          menuItemHasChildren.classList.add("active");
          const subMenu = menuItemHasChildren.querySelector(".sub-menu");
          subMenu.style.maxHeight = subMenu.scrollHeight + "px";
        }
      }
  });
  function collapseSubMenu(){
  	navMenu.querySelector(".menu-item-has-children.active .sub-menu")
  	.removeAttribute("style");
  	navMenu.querySelector(".menu-item-has-children.active")
  	.classList.remove("active");
  }
  function resizeFix(){
  	 // if navMenu is open ,close it
  	 if(navMenu.classList.contains("open")){
  	 	toggleNav();
  	 }
  	 // if menuItemHasChildren is expanded , collapse it
  	 if(navMenu.querySelector(".menu-item-has-children.active")){
        	collapseSubMenu();
     }
  }

  window.addEventListener("resize", function(){
     if(this.innerWidth > mediaSize){
     	resizeFix();
     }
  });

})();


//---------------------------------------------------------------------------------------------------------------- scroll top js
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


//------------------------------------------------------------------------------------------------------------ carosel customar testimonials js

       // Slider
       const slider = function () {
        const slides = document.querySelectorAll('.slide');
        const btnLeft = document.querySelector('.slider__btn--left');
        const btnRight = document.querySelector('.slider__btn--right');
        const dotContainer = document.querySelector('.dots');
        
        let curSlide = 0;
        const maxSlide = slides.length;
        
        // Functions
        const createDots = function () {
         slides.forEach(function (_, i) {
           dotContainer.insertAdjacentHTML(
             'beforeend',
             `<button class="dots__dot" data-slide="${i}"></button>`
           );
         });
        };
        
        const activateDot = function (slide) {
         document
           .querySelectorAll('.dots__dot')
           .forEach(dot => dot.classList.remove('dots__dot--active'));
        
         document
           .querySelector(`.dots__dot[data-slide="${slide}"]`)
           .classList.add('dots__dot--active');
        };
        
        const goToSlide = function (slide) {
         slides.forEach(
           (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
         );
        };
        
        // Next slide
        const nextSlide = function () {
         if (curSlide === maxSlide - 1) {
           curSlide = 0;
         } else {
           curSlide++;
         }
        
         goToSlide(curSlide);
         activateDot(curSlide);
        };
        
        const prevSlide = function () {
         if (curSlide === 0) {
           curSlide = maxSlide - 1;
         } else {
           curSlide--;
         }
         goToSlide(curSlide);
         activateDot(curSlide);
        };
        
        const init = function () {
         goToSlide(0);
         createDots();
        
         activateDot(0);
        };
        init();
        
        // Event handlers
        btnRight.addEventListener('click', nextSlide);
        btnLeft.addEventListener('click', prevSlide);
        
        document.addEventListener('keydown', function (e) {
         if (e.key === 'ArrowLeft') prevSlide();
         e.key === 'ArrowRight' && nextSlide();
        });
        
        dotContainer.addEventListener('click', function (e) {
         if (e.target.classList.contains('dots__dot')) {
           const { slide } = e.target.dataset;
           goToSlide(slide);
           activateDot(slide);
         }
        });
        };
        slider();