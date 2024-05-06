/*
    VARIABLES
*/
let thumbImagesDivs = Array.from(
  document.querySelectorAll(".product-images-wrapper .thumb-image")
);
let activeImage = document.querySelector(
  ".product-images-wrapper .preview-image"
);
let toggleMenu = document.querySelector(".header .toggle-menu");
let mobileNavgation = document.querySelector(".header .mobile-navgation");
let closeMobileNavgation = document.querySelector(
  ".header .mobile-navgation .close-menu"
);
let overlay = document.querySelector(".overlay");
let nextBtn = document.querySelector(".preview-image-wrapper .arrows .next");
let prevBtn = document.querySelector(".preview-image-wrapper .arrows .prev");
let lightBoxWrapper = document.querySelector(".lightbox-wrapper");
let lightBoxContent = lightBoxWrapper.querySelector(".lightbox-content");
let currentIndex = 0;

/*
      FUNCTIONS
  */

// Add Original Image Src As data Sttribute On ['.thumb-image'] Div
function handleThumbsSrc() {
  thumbImagesDivs.forEach((thumb) => {
    // Get The Image
    let thumbImage = thumb.querySelector("img");
    // Set Original Image Source as Data Atrribute On The Thumb After Removeing [-thumbnail] String.
    let setOriginalSrc = thumbImage
      .getAttribute("src")
      .replace("-thumbnail", "");
    // Set Original Image Source as Data Atrribute On The Thumb
    thumb.dataset.original = setOriginalSrc;
  });
}
handleThumbsSrc();

// Show Clicked Thumbnail On The Preview Image Wrapper
function showThumbsAsActive(thumbnails, previewActive) {
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Get Original Src Of the Thumb Image
      let getOriginalSrc = thumb.dataset.original;
      previewActive.setAttribute("src", getOriginalSrc);
      // Get The Index Of the Current Image
      currentIndex = thumbnails.indexOf(thumb);
      // Control Thumb styles
      removeClass(thumbnails, "active");
      thumb.classList.add("active");
    });
  });
}
showThumbsAsActive(thumbImagesDivs, activeImage);

// Set The Active Image
function showAsActive() {
  activeImage.src = thumbImagesDivs[currentIndex].dataset.original;
  // Control Thumb styles
  removeClass(thumbImagesDivs, "active");
  thumbImagesDivs[currentIndex].classList.add("active");
  imageNumber();
}

// Show Next Image Function
function nextImage() {
  currentIndex++;
  if (currentIndex >= thumbImagesDivs.length) {
    currentIndex = 0;
  }
  showAsActive();
}

// Show Previous Image Function
function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = thumbImagesDivs.length - 1;
  }
  showAsActive(activeImage);
}

// Stats About The Images
function imageNumber() {
  let currentImage = document.querySelector(
    ".preview-image-wrapper .count .current"
  );
  let totalImage = document.querySelector(
    ".preview-image-wrapper .count .total"
  );

  currentImage.textContent = currentIndex + 1;
  totalImage.textContent = thumbImagesDivs.length;
}
imageNumber();

function cloneSlider() {
  lightBoxContent.innerHTML = "";
  let elementToClone = document.querySelector(".product-images-wrapper");
  let clonedElement = elementToClone.cloneNode(true);
  // Get Preview Image Wrapper
  let previewImageWrapper = clonedElement.querySelector(
    ".preview-image-wrapper"
  );
  // Get Arrows Wrapper
  let arrowsWrapper = clonedElement.querySelector(".arrows");
  // Get Thumbnails Images Wrapper
  let thumbsWrapper = clonedElement.querySelector(".thumbs-wrapper");

  // Remove ['.hide-for-desktop'] Class Of Arrows Div
  arrowsWrapper.classList.remove("hide-for-desktop");
  // Remove ['.hide-for-mobile'] Class Of Thumbnails Images Div
  thumbsWrapper.classList.remove("hide-for-mobile");
  // Add Close Button
  previewImageWrapper.innerHTML += `
  <div class="close-lightbox">
    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
      <title>close</title>
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill="#FFF"
        fill-rule="evenodd"
      />
    </svg>
  </div>
  `;
  // Decalre Close Button
  let closeBtn = previewImageWrapper.querySelector(".close-lightbox");
  lightBoxContent.appendChild(clonedElement);
  // Close Light Box By [x] Close Icon
  closeBtn.addEventListener("click", closeLightBox);
  thumbImagesDivs = Array.from(
    document.querySelectorAll(".lightbox-content .thumb-image")
  );
  nextBtn = document.querySelector(".lightbox-content .arrows .next");
  prevBtn = document.querySelector(".lightbox-content .arrows .prev");
  activeImage = document.querySelector(".lightbox-content .preview-image");
  showThumbsAsActive(thumbImagesDivs, activeImage);
  nextBtn.addEventListener("click", () => {
    nextImage(activeImage);
  });
  prevBtn.addEventListener("click", () => {
    prevImage(activeImage);
  });
}

// Remove Active classes
function removeClass(array, className) {
  array.forEach((element) => {
    element.classList.remove(className);
  });
}

// Show Form alerts
function formAlert(message, status) {
  formValidation.textContent = message;
  formValidation.className = `form-alert ${status}`;
  addToCartForm.classList.add(`alert`);
  setTimeout(() => {
    addToCartForm.classList.remove("alert");
  }, 5000);
}

// Open Mobile Meun
function openMobileMenu() {
  mobileNavgation.classList.add("open");
}

// Close Mobile Meun
function closeMobileMenu() {
  mobileNavgation.classList.remove("open");
}

// Open Overlay
function openOverlay() {
  overlay.classList.add("open");
}

// Close Overlay
function closeOverlay() {
  overlay.classList.remove("open");
}

// close Overlay When Click On the Overlay Layer
overlay.addEventListener("click", (e) => {
  if (e.currentTarget == e.target) closeOverlay(), closeMobileMenu();
});
/*
      EVENTS
  */

// Hide LightBox on Screens Smaller Than < 640px
window.addEventListener("resize", () => {
  if (window.innerWidth < 640) {
    closeLightBox();
  }
});

// Hide MobileMenu on Screens Greater Than < 1024px
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    closeMobileMenu();
  }
});

// Open LightBox When Click Active Image For Screens Greater Than >= 640px
activeImage.addEventListener("click", () => {
  if (window.innerWidth >= 640) {
    openLightBox();
    cloneSlider();
  } else {
    return false;
  }
});

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", prevImage);

toggleMenu.addEventListener("click", () => {
  openMobileMenu();
  openOverlay();
});

closeMobileNavgation.addEventListener("click", () => {
  closeMobileMenu();
  closeOverlay();
});

/*
  CART FUNCTIONS
*/

// VARIABLES

let cart = document.querySelector(".cart");
let cartcontent = document.querySelector(".cart-content");
let cartList = document.querySelector(".cart-content .cart-list");
let inCart = document.querySelector(".cart .in-cart");

let addToCartForm = document.querySelector(".add-to-cart-form");
let formValidation = document.querySelector(".add-to-cart-form .form-alert");
let checkOutBtn = document.querySelector(".cart-list-wrapper .checkout-btn");
let productQuantity = document.querySelector(
  ".add-to-cart-form .product-quantity-num"
);
let plusBtn = document.querySelector(".add-to-cart-form .plus");
let minusBtn = document.querySelector(".add-to-cart-form .minus");

// FUNCTIONS

// Add Product To Cart
function addToCart() {
  addToCartForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let getProductQuantity = productQuantity.textContent;
    if (getProductQuantity != 0) {
      let productTitle = document.querySelector(
        ".product-details-wrapper .product-title"
      ).textContent;
      // Use First Thumbnail Image As Product Image In the Cart
      let productThumb = thumbImagesDivs[0]
        .querySelector("img")
        .getAttribute("src");
      // productThumb = productThumb.querySelector("img").src;
      let productPrice = document
        .querySelector(".product-details-wrapper .current-price")
        .textContent.replace("$", "");
      let totalPrice = "$" + parseInt(getProductQuantity * productPrice);
      if (cartList.childElementCount == 0) {
        checkOutBtn.style.display = "block";
        cartList.innerHTML = "";
      }
      cartList.innerHTML += `
      <div class="cart-item">
        <div class="item-image">
          <img
            src=${productThumb}
            alt="Product Image"
          />
        </div>
        <div class="item-info">
          <h4 class="item-title">
            ${productTitle}
          </h4>
          <p class="item-price-wrapper">
            <span class="item-price">${productPrice}</span>
            <span class="item-count">x ${getProductQuantity}</span>
            <span class="total-price">${totalPrice}</span>
          </p>
        </div>
        <div class="item-delete">
          <img
            src="./images/icon-delete.svg"
            alt="Delete Product"
          />
        </div>
      </div>
      `;
      deleteFromCart();
      inCartCount();
      formAlert(`Product has been added to your cart successfully`, "success");
    } else {
      formAlert(`Can't add negative value`, "fail");
    }
  });
}
addToCart();

// Show Cart Product's Count
function inCartCount() {
  let productsCount = cartList.childElementCount;
  inCart.textContent = productsCount;
  if (productsCount == 0) {
    cart.classList.remove("show-count");
    cart.classList.add("empty");
    checkOutBtn.style.display = "none";
    cartList.textContent = "Your cart is empty";
  } else {
    cart.classList.add("show-count");
    cart.classList.remove("empty");
  }
}
inCartCount();

// Delete Cart Product Function
function deleteFromCart() {
  cartcontent.querySelectorAll(".cart-item").forEach((product) => {
    product.addEventListener("click", (e) => {
      if (!e.target.closest(".item-delete")) return;
      product.remove();
      inCartCount();
    });
  });
}

// EVENTS

cart.addEventListener("click", (e) => {
  let cartIcon = e.target.closest(".cart-icon");
  cartIcon ? cart.classList.toggle("open") : "";
});

// Handle How Many Items will Be Added By Plus [+] and [-] Buttons
plusBtn.addEventListener("click", () => {
  productQuantity.textContent++;
});

minusBtn.addEventListener("click", () => {
  if (productQuantity.textContent != 0) productQuantity.textContent--;
});

/*
  LIGHTBOX FUNCTIONS
*/

// FUNCTIONS

// Open Light Box Function
function openLightBox() {
  lightBoxWrapper.classList.add("open");
}

// Close Light Box Function
function closeLightBox() {
  lightBoxWrapper.classList.remove("open");
}

// close Light Box When Click On the Overlay
lightBoxWrapper.addEventListener("click", (e) => {
  if (e.currentTarget == e.target) closeLightBox();
});
