# Pet Supplies Product Catalog

This is a static website for GitHub Pages. It does not require dependencies or a build step.

## Project Files

- `index.html`: Main page entry.
- `assets/js/catalog.config.js`: Product category and product data configuration.
- `assets/js/app.js`: Frontend rendering logic.
- `assets/css/styles.css`: Site styles.
- `assets/images/`: Product image directory.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.

## Update Categories and Products

Edit `assets/js/catalog.config.js` and follow this structure:

```js
{
  id: "smart-cleaning",
  name: "Smart Cleaning Series",
  description: "Smart cleaning solutions for easier pet care and a cleaner home.",
  products: [
    {
      name: "Self-Cleaning Litter Box",
      image: "assets/images/self-cleaning-litter-box.jpg"
    }
  ]
}
```

## Add Product Images

1. Put the image file in `assets/images/`, for example `assets/images/self-cleaning-litter-box.jpg`.
2. Update the product `image` field in `assets/js/catalog.config.js`:

```js
image: "assets/images/self-cleaning-litter-box.jpg"
```

Use English file names with letters, numbers, and hyphens where possible.

## Local Preview

If Python is installed, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages Deployment

Recommended setup:

1. Push the project to your GitHub repository.
2. Open `Settings -> Pages`.
3. In `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to the `main` branch and `.github/workflows/pages.yml` will deploy the site automatically.

You can also use `Deploy from a branch` and select the `main` branch with the `/root` folder.