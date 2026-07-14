// Product catalog configuration
// How to maintain:
// 1. Put product images in the assets/images/ folder.
// 2. Update the image path, for example: assets/images/automatic-feeder.jpg.
// 3. To add a category, copy one object in categories and update id/name/description/products.

window.PET_CATALOG_CONFIG = {
  site: {
    title: "Pet Supplies Product Catalog",
    description: "Browse pet supplies by category and view product names with images.",
    footer: "© Pet Supplies Product Catalog",
  },

  categories: [
    {
      id: "smart-cleaning",
      name: "Smart Cleaning Series",
      description: "Smart cleaning solutions for easier pet care and a cleaner home.",
      products: [
        {
          name: "Self-Cleaning Litter Box",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Pet Grooming Vacuum Kit",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Automatic Paw Cleaner",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "feeding-drinking",
      name: "Feeding & Drinking Series",
      description: "Food and water products designed for daily feeding needs.",
      products: [
        {
          name: "Automatic Pet Feeder",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Pet Water Fountain",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Stainless Steel Pet Bowl",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "beds-home-comfort",
      name: "Home Beds & Mats Series",
      description: "Comfortable beds, mats, and home essentials for pets.",
      products: [
        {
          name: "Cozy Pet Bed",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Foldable Pet House",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Cooling Pet Mat",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "toys-enrichment",
      name: "Toys & Enrichment Series",
      description: "Interactive toys and enrichment products to keep pets active and happy.",
      products: [
        {
          name: "Interactive Treat Ball",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Chew Toy Set",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Cat Teaser Wand",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "outdoor-travel",
      name: "Outdoor Travel Series",
      description: "Portable and reliable products for walks, trips, and outdoor activities.",
      products: [
        {
          name: "Portable Pet Carrier",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Travel Water Bottle",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Adjustable Safety Leash",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "wearables-apparel",
      name: "Wearables Series",
      description: "Harnesses, clothing, and wearable accessories for pets.",
      products: [
        {
          name: "Reflective Pet Harness",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Waterproof Pet Jacket",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Adjustable Pet Collar",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "training-supplies",
      name: "Training Supplies Series",
      description: "Useful tools for obedience training, behavior guidance, and daily routines.",
      products: [
        {
          name: "Training Clicker",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Treat Pouch",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "Training Pads",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
  ],
};