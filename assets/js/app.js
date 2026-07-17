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
    image.className = "product-image";
    image.src = product.image || "assets/images/placeholder.svg";
    image.alt = product.name || "Pet supplies product image";
    image.loading = "lazy";
    image.addEventListener("error", () => {
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

    return card;
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

  window.addEventListener("popstate", () => {
    renderPage(getSelectedCategory());
  });
})();