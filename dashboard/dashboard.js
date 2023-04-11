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
  