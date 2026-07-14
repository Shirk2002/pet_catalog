(function () {
  const config = window.PET_CATALOG_CONFIG;

  if (!config || !Array.isArray(config.categories)) {
    throw new Error("未找到有效的 PET_CATALOG_CONFIG 配置。");
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

  function setSiteInfo() {
    document.title = config.site?.title || "宠物用品商品目录";
    siteTitle.textContent = config.site?.title || "宠物用品商品目录";
    siteDescription.textContent =
      config.site?.description || "按类别浏览宠物用品，查看商品名称与图片。";
    footerText.textContent = config.site?.footer || "© 宠物用品商品目录";
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
        updateUrl(category.id);
        renderPage(category);
      });

      categoryList.appendChild(button);
    });
  }

  function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image || "assets/images/placeholder.svg";
    image.alt = product.name || "宠物用品商品图片";
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.src = "assets/images/placeholder.svg";
    });

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name || "未命名商品";

    imageWrap.appendChild(image);
    card.append(imageWrap, name);

    return card;
  }

  function renderProducts(products) {
    productGrid.innerHTML = "";

    if (!products.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "该类别暂未配置商品。";
      productGrid.appendChild(empty);
      return;
    }

    products.forEach((product) => {
      productGrid.appendChild(createProductCard(product));
    });
  }

  function renderPage(category) {
    renderCategories(category.id);
    categoryKicker.textContent = "当前类别";
    categoryTitle.textContent = category.name;
    categoryDescription.textContent = category.description || "查看该类别下的商品。";

    const products = Array.isArray(category.products) ? category.products : [];
    productCount.textContent = `${products.length} 件商品`;
    renderProducts(products);
  }

  setSiteInfo();
  renderPage(getSelectedCategory());

  window.addEventListener("popstate", () => {
    renderPage(getSelectedCategory());
  });
})();