const navLinks = document.querySelectorAll('header ul li a');

for (const link of navLinks) {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
}
