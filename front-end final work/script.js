document.addEventListener("DOMContentLoaded", () => {
  // 1. Header Background Change on Scroll
  //   const header = document.getElementById("main-header");

  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 50) {
  //       header.classList.add("scrolled");
  //     } else {
  //       header.classList.remove("scrolled");
  //     }
  //   });

  // 2. Cookie Notification (LocalStorage)
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  // ვამოწმებთ, უკვე დათანხმდა თუ არა იუზერი
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "flex"; // ვაჩვენებთ ბანერს
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true"); // ვინახავთ ლოკალურად
    cookieBanner.style.display = "none"; // ვმალავთ ბანერს
  });

  // 3. Burger Menu Logic
  const burgerBtn = document.getElementById("burger-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const menuCheck = document.getElementById("menu-check");

  burgerBtn.addEventListener("click", (e) => {
    // ვაჩერებთ checkbox-ის default მოქმედებას, რომ JS-ით ვმართოთ
    mobileNav.classList.toggle("active");
  });

  // 4. Fetch API (Random User API) for Reviews
  const reviewsContainer = document.getElementById("reviews-container");

  // ასინქრონული ფუნქცია ინფორმაციის წამოსაღებად
  async function fetchReviews() {
    try {
      // მომაქვს 4 შემთხვევითი იუზერი
      const response = await fetch("https://randomuser.me/api/?results=4");
      const data = await response.json();

      const users = data.results;
      let generatedHTML = "";

      // თითოეულ იუზერზე ვქმნით ბარათს
      users.forEach((user) => {
        generatedHTML += `
          <div class="review-card">
            <img src="${user.picture.large}" alt="${user.name.first}" />
            <p class="review">"The platform is fantastic for finding local events! - ${user.name.first}"</p>
            <div class="stars">
              <span class="material-symbols-outlined">star_rate</span>
              <span class="material-symbols-outlined">star_rate</span>
              <span class="material-symbols-outlined">star_rate</span>
              <span class="material-symbols-outlined">star_rate</span>
              <span class="material-symbols-outlined">star_rate</span>
            </div>
          </div>
        `;
      });

      // ვსვამთ გენერირებულ HTML-ს კონტეინერის დასაწყისში (ღილაკის წინ)
      reviewsContainer.insertAdjacentHTML("afterbegin", generatedHTML);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  // ვიძახებთ ფუნქციას
  fetchReviews();
});
