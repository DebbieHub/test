const handleClick = () => {
    let menu = document.getElementById("headList");
    let btnToggle = document.getElementById("btn-menu");
    if(menu.style.display === "flex") {
      menu.style.display = "none";
      btnToggle.innerHTML = "<span class='material-symbols-outlined'>menu</span>";
    } else {
      menu.style.display = "flex";
      btnToggle.innerHTML = "<span class='material-symbols-outlined'>close</span>";
    }
  }
  
  //scroll effect 
  const aboutLink = document.querySelector("#aboutLink");
  const aboutElement = document.querySelector("#about");
  
  aboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    aboutElement.scrollIntoView({
      behavior: "smooth",
    });

  });
  
  const featureLink = document.querySelector("#featureLink");
  const featureElement = document.querySelector("#features");
  
  featureLink.addEventListener("click", (event) => {
    event.preventDefault();
    featureElement.scrollIntoView({
      behavior: "smooth",
    });
    handleClick(); // hide navbar when link clicked
  });
  