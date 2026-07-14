# 宠物用品商品目录静态网站

这是一个适合部署到 GitHub Pages 的纯静态网站，不需要安装依赖，也不需要构建步骤。

## 文件说明

- `index.html`：网站入口页面。
- `assets/js/catalog.config.js`：商品类别与商品配置文件，主要维护这个文件即可。
- `assets/js/app.js`：页面渲染逻辑，一般不需要修改。
- `assets/css/styles.css`：页面样式。
- `assets/images/`：商品图片目录。
- `.github/workflows/pages.yml`：GitHub Pages 自动部署配置。

## 如何维护商品类别

打开 `assets/js/catalog.config.js`，按下面结构修改：

```js
{
  id: "dog-supplies",             // 类别唯一标识，不要和其他类别重复，建议英文小写
  name: "狗狗用品",               // 页面上显示的类别名
  description: "狗粮、牵引绳...",  // 类别描述
  products: [
    {
      name: "成犬营养狗粮",        // 商品名称
      image: "assets/images/dog-food.jpg" // 商品图片路径
    }
  ]
}
```

## 如何添加图片

1. 把图片放到 `assets/images/` 目录，例如：`assets/images/dog-food.jpg`。
2. 在 `assets/js/catalog.config.js` 中把商品的 `image` 改成对应路径：

```js
image: "assets/images/dog-food.jpg"
```

建议图片文件名使用英文、数字和短横线，避免空格和中文文件名，例如：`cat-litter.jpg`。

## 本地预览

如果安装了 Python，可以在当前目录运行：

```bash
python -m http.server 8000
```

然后浏览器打开：

```text
http://localhost:8000
```

## GitHub Pages 部署

推荐方式：

1. 将本项目推送到 GitHub 仓库。
2. 打开仓库的 `Settings` → `Pages`。
3. 在 `Build and deployment` 的 `Source` 选择 `GitHub Actions`。
4. 推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动发布网站。

也可以使用 GitHub Pages 的 `Deploy from a branch`，选择 `main` 分支和 `/root` 目录。