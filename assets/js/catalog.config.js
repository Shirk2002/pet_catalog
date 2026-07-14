// 商品目录配置文件
// 维护方式：
// 1. 将商品图片放到 assets/images/ 目录下；
// 2. 修改对应商品的 image 路径，例如：assets/images/dog-food.jpg；
// 3. 新增类别时，复制 categories 数组中的一个对象并修改 id/name/description/products。

window.PET_CATALOG_CONFIG = {
  site: {
    title: "宠物用品商品目录",
    description: "按类别浏览宠物用品，查看商品名称与图片。",
    footer: "© 宠物用品商品目录",
  },

  categories: [
    {
      id: "dog-supplies",
      name: "狗狗用品",
      description: "狗粮、牵引绳、玩具等常用狗狗用品。",
      products: [
        {
          name: "成犬营养狗粮",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "耐咬磨牙玩具",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "可调节牵引绳",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "cat-supplies",
      name: "猫咪用品",
      description: "猫粮、猫砂、猫抓板等猫咪日常用品。",
      products: [
        {
          name: "全价猫粮",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "除臭豆腐猫砂",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "瓦楞纸猫抓板",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "cleaning-care",
      name: "清洁护理",
      description: "洗护、梳毛、除味等清洁护理商品。",
      products: [
        {
          name: "宠物沐浴露",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "宠物除味喷雾",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "针梳脱毛梳",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
    {
      id: "feeding",
      name: "喂食饮水",
      description: "食盆、水碗、自动喂食器等喂养相关商品。",
      products: [
        {
          name: "不锈钢宠物碗",
          image: "assets/images/placeholder.svg",
        },
        {
          name: "自动饮水机",
          image: "assets/images/placeholder.svg",
        },
      ],
    },
  ],
};