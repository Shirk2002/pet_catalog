(function () {
  const config = window.PET_CATALOG_CONFIG;

  if (!config || !Array.isArray(config.categories)) {
    throw new Error("Valid PET_CATALOG_CONFIG was not found.");
  }

  const siteTitle = document.getElementById("site-title");
  const siteDescription = document.getElementById("site-description");
  const footerText = document.getElementById("footer-text");
  const categoryList = document.getElementById("category-list");
  const categoryKicker = document.getElementById("category-kicker");
  const categoryTitle = document.getElementById("category-title");
  const categoryDescription = document.getElementById("category-description");
  const productCount = document.getElementById("product-count");
  const productGrid = document.getElementById("product-grid");
  const productSearchInput = document.getElementById("product-search-input");
  const clearSearchButton = document.getElementById("clear-search-button");
  const detailModal = document.getElementById("product-detail-modal");
  const detailBackdrop = document.getElementById("product-detail-backdrop");
  const detailCloseButton = document.getElementById("product-detail-close");
  const detailMainImage = document.getElementById("product-detail-main-image");
  const detailThumbnails = document.getElementById("product-detail-thumbnails");
  const detailCategory = document.getElementById("product-detail-category");
  const detailCode = document.getElementById("product-detail-code");
  const detailTitle = document.getElementById("product-detail-title");
  const detailSpecifications = document.getElementById("product-detail-specifications");
  const detailDescription = document.getElementById("product-detail-description");

  function getProductImages(product) {
    const images = Array.isArray(product.images) ? product.images : [];
    const uniqueImages = [...new Set([product.image, ...images].filter(Boolean))];
    return uniqueImages.length ? uniqueImages : ["assets/images/placeholder.svg"];
  }

  function getCatalogImageDerivativePath(path, type) {
    const match = String(path || "").match(/^assets\/images\/catalog\/(.+)\.(png|jpe?g|webp|gif)$/i);
    if (!match) return path;
    const inner = match[1];
    if (inner.startsWith("thumbnails/") || inner.startsWith("optimized/")) {
      return path;
    }
    return `assets/images/catalog/${type}/${inner}.webp`;
  }

  function getCatalogThumbnailPath(path) {
    return getCatalogImageDerivativePath(path, "thumbnails");
  }

  function getCatalogOptimizedImagePath(path) {
    return getCatalogImageDerivativePath(path, "optimized");
  }

  function setSiteInfo() {
    document.title = config.site?.title || "Pet Supplies Product Catalog";
    siteTitle.textContent = config.site?.title || "Pet Supplies Product Catalog";
    siteDescription.textContent =
      config.site?.description ||
      "Browse pet supplies by category and view product names with images.";
    footerText.textContent = config.site?.footer || "© Pet Supplies Product Catalog";
  }

  function getSelectedCategory() {
    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get("category");

    return (
      config.categories.find((category) => category.id === selectedId) ||
      config.categories[0]
    );
  }

  function updateUrl(categoryId) {
    const url = new URL(window.location.href);
    url.searchParams.set("category", categoryId);
    window.history.pushState({ categoryId }, "", url);
  }

  function renderCategories(selectedCategoryId) {
    categoryList.innerHTML = "";

    config.categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-button";
      button.textContent = category.name;
      button.setAttribute("aria-pressed", String(category.id === selectedCategoryId));

      button.addEventListener("click", () => {
        productSearchInput.value = "";
        clearSearchButton.hidden = true;
        updateUrl(category.id);
        renderPage(category);
      });

      categoryList.appendChild(button);
    });
  }

  function createProductCard(product, categoryName = "") {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    const imagePath = getProductImages(product)[0];
    const thumbnailPath = getCatalogThumbnailPath(imagePath);
    let fallbackAttempted = false;
    image.className = "product-image";
    image.src = thumbnailPath;
    image.alt = product.name || "Pet supplies product image";
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      if (!fallbackAttempted && thumbnailPath !== imagePath) {
        fallbackAttempted = true;
        image.src = imagePath;
        return;
      }
      image.src = "assets/images/placeholder.svg";
    });

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name || "Unnamed Product";

    const details = document.createElement("div");
    details.className = "product-details";

    if (product.code) {
      const code = document.createElement("p");
      code.className = "product-code";
      code.textContent = `Item No. ${product.code}`;
      details.appendChild(code);
    }

    if (categoryName) {
      const category = document.createElement("p");
      category.className = "product-category-label";
      category.textContent = categoryName;
      details.appendChild(category);
    }

    imageWrap.appendChild(image);
    details.appendChild(name);
    card.append(imageWrap, details);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${product.name || "product"}`);
    card.addEventListener("click", () => openProductDetails(product, categoryName || product.categoryName));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProductDetails(product, categoryName || product.categoryName);
      }
    });

    return card;
  }

  function normalizeSpecifications(specifications) {
    if (Array.isArray(specifications)) {
      return specifications.filter((item) => item?.label && item?.value);
    }

    if (specifications && typeof specifications === "object") {
      return Object.entries(specifications)
        .filter(([, value]) => value)
        .map(([label, value]) => ({ label, value }));
    }

    return [];
  }

  function selectDetailImage(images, selectedImage, productName) {
    const optimizedImage = getCatalogOptimizedImagePath(selectedImage);
    let fallbackAttempted = false;
    detailMainImage.classList.add("is-loading");
    detailMainImage.alt = productName || "Product image";
    detailMainImage.onload = () => {
      detailMainImage.classList.remove("is-loading");
    };
    detailMainImage.onerror = () => {
      if (!fallbackAttempted && optimizedImage !== selectedImage) {
        fallbackAttempted = true;
        detailMainImage.src = selectedImage;
        return;
      }
      detailMainImage.onerror = null;
      detailMainImage.src = "assets/images/placeholder.svg";
    };
    detailMainImage.src = optimizedImage;
    [...detailThumbnails.children].forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.image === selectedImage));
    });
  }

  function openProductDetails(product, categoryName = "") {
    const images = getProductImages(product);
    detailCategory.textContent = categoryName || "";
    detailCategory.hidden = !categoryName;
    detailCode.textContent = product.code ? `Item No. ${product.code}` : "";
    detailCode.hidden = !product.code;
    detailTitle.textContent = product.name || "Unnamed Product";
    detailDescription.textContent = product.description || "No product description has been added yet.";

    const specifications = normalizeSpecifications(product.specifications);
    detailSpecifications.innerHTML = "";
    if (specifications.length) {
      const list = document.createElement("dl");
      specifications.forEach((item) => {
        const label = document.createElement("dt");
        label.textContent = item.label;
        const value = document.createElement("dd");
        value.textContent = item.value;
        list.append(label, value);
      });
      detailSpecifications.appendChild(list);
    }

    detailThumbnails.innerHTML = "";
    images.forEach((imagePath, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "product-detail-thumbnail";
      button.dataset.image = imagePath;
      button.setAttribute("aria-label", `View image ${index + 1}`);
      const image = document.createElement("img");
      const thumbnailPath = getCatalogThumbnailPath(imagePath);
      let fallbackAttempted = false;
      image.src = thumbnailPath;
      image.alt = `${product.name || "Product"} image ${index + 1}`;
      image.loading = "lazy";
      image.decoding = "async";
      image.onerror = () => {
        if (!fallbackAttempted && thumbnailPath !== imagePath) {
          fallbackAttempted = true;
          image.src = imagePath;
          return;
        }
        image.src = "assets/images/placeholder.svg";
      };
      button.appendChild(image);
      button.addEventListener("click", () => selectDetailImage(images, imagePath, product.name));
      detailThumbnails.appendChild(button);
    });

    selectDetailImage(images, images[0], product.name);
    detailModal.hidden = false;
    document.body.classList.add("modal-open");
    detailCloseButton.focus();
  }

  function closeProductDetails() {
    detailModal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function renderProducts(products, categoryName = "") {
    productGrid.innerHTML = "";

    if (!products.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No matching products were found.";
      productGrid.appendChild(empty);
      return;
    }

    products.forEach((product) => {
      productGrid.appendChild(createProductCard(product, categoryName || product.categoryName));
    });
  }

  function renderSearchResults(query) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      renderPage(getSelectedCategory());
      return;
    }

    const matches = config.categories.flatMap((category) =>
      (Array.isArray(category.products) ? category.products : [])
        .filter((product) => {
          const searchable = `${product.name || ""} ${product.code || ""}`.toLowerCase();
          return searchable.includes(normalizedQuery);
        })
        .map((product) => ({ ...product, categoryName: category.name }))
    );

    renderCategories("");
    categoryKicker.textContent = "Search Results";
    categoryTitle.textContent = `Results for “${query.trim()}”`;
    categoryDescription.textContent = "Search matches product names and item numbers across all categories.";
    productCount.textContent = `${matches.length} ${matches.length === 1 ? "product" : "products"}`;
    renderProducts(matches);
  }

  function renderPage(category) {
    renderCategories(category.id);
    categoryKicker.textContent = "Current Category";
    categoryTitle.textContent = category.name;
    categoryDescription.textContent =
      category.description || "View products in this category.";

    const products = Array.isArray(category.products) ? category.products : [];
    productCount.textContent = `${products.length} ${
      products.length === 1 ? "product" : "products"
    }`;
    renderProducts(products);
  }

  setSiteInfo();
  renderPage(getSelectedCategory());

  productSearchInput.addEventListener("input", () => {
    const query = productSearchInput.value;
    clearSearchButton.hidden = !query;
    renderSearchResults(query);
  });

  clearSearchButton.addEventListener("click", () => {
    productSearchInput.value = "";
    clearSearchButton.hidden = true;
    renderPage(getSelectedCategory());
    productSearchInput.focus();
  });

  detailCloseButton.addEventListener("click", closeProductDetails);
  detailBackdrop.addEventListener("click", closeProductDetails);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !detailModal.hidden) {
      closeProductDetails();
    }
  });

  window.addEventListener("popstate", () => {
    renderPage(getSelectedCategory());
  });
})();