'use strict';

const navigation = document.querySelector('.navigation__list');
const exploreBtn = document.querySelector('.header__buttons--sub');
const sections = document.querySelectorAll('section');
const navContainer = document.querySelector('.navigation');
const navHeight = navContainer.getBoundingClientRect().height;
const navLinks = document.querySelectorAll('.navigation__link');
const fadeIn = document.querySelectorAll('.about__description');
const header = document.querySelector('header');
const contactSection = document.querySelector('.cta');
const navLogo = document.querySelector('.navigatio__logo');
const pageSection = document.querySelectorAll('.pageSection');
const testimonialSlider = document.querySelectorAll('.testimonial');
const btnSliderRight = document.querySelector('.testimonial__btn--right');
const btnSliderLeft = document.querySelector('.testimonial__btn--left');

navigation.addEventListener('click', function (e) {
  if (e.target.classList.contains('navigation__link')) {
    const clickedLink = e.target;

    clickedLink.classList.add('active-tab');
    const siblingLinks = clickedLink
      .closest('.navigation')
      .querySelectorAll('.navigation__link');

    siblingLinks.forEach(link => {
      if (link !== clickedLink) {
        link.classList.remove('active-tab');
      }
    });
  }
});

exploreBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sections.forEach(section => {
    if (section.getAttribute('id') === 'section--about') {
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
});

/////Implementing fixed navigation

const stickyNavOptions = {
  root: null,
  treshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(function (
  entries,
  headerObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navContainer.classList.add('fixed');
    } else {
      navContainer.classList.remove('fixed');
    }
  });
},
stickyNavOptions);

headerObserver.observe(header);

////Implementing the slider component
const numTestimonials = testimonialSlider.length;

const dotsContainer = document.querySelector('.dots--container');

let currentSlide = 0;

testimonialSlider.forEach((testimony, i) => {
  testimony.style.transform = `translateX(${150 * i}%)`;
});

const createSliderDots = function () {
  testimonialSlider.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="slider--dots" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document.querySelectorAll('.slider--dots').forEach(dot => {
    dot.classList.remove('active--dot');
  });

  document
    .querySelector(`.slider--dots[data-slide="${slide}"]`)
    .classList.add('active--dot');
};

const goToSlide = function (slide) {
  testimonialSlider.forEach((testimony, i) => {
    testimony.style.transform = `translateX(${150 * (i - slide)}%)`;
  });
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = numTestimonials - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const nextSlide = function () {
  if (currentSlide === numTestimonials - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const init = function () {
  goToSlide(0);
  createSliderDots();

  activateDot(0);
};

init();

btnSliderRight.addEventListener('click', nextSlide);

btnSliderLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  }
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('slider--dots')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

////Section observer
const sectionObsOptions = { root: null, treshold: 0, rootMargin: '-300px' };

const sectionObserver = new IntersectionObserver(function (
  entries,
  sectionObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const activeSection = entry.target.id;
    navLinks.forEach(link => {
      link.classList.remove('active-tab');
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href').slice(1) === activeSection)
        link.classList.add('active-tab');
    });
  });
},
sectionObsOptions);

pageSection.forEach(section => sectionObserver.observe(section));
