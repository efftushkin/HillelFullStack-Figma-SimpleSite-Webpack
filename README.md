# 📦 Webpack Configuration Project

Проєкт з повною конфігурацією Webpack для сучасної веб-розробки.

```
┌─────────────────────────────────────────────────────────────┐
│  🚀 Webpack 5 + SASS + Babel + Hot Reload                  │
│  ✅ Хешування файлів | 🔤 Шрифти | 🖼️ Зображення | 🎨 CSS │
│  📦 Code Splitting | 🌲 Tree Shaking | ⚡ Оптимізація     │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Швидкий старт

```bash
npm install && npm run dev
```

## 🚀 Функціональні можливості

### ✅ Реалізовані вимоги:

1. **Хешування імен файлів** - запобігання проблемам із кешуванням браузера
   - `[contenthash:8]` для всіх ресурсів
   - Автоматичне оновлення при зміні вмісту

2. **Підтримка локальних шрифтів**
   - Обробка форматів: `.woff`, `.woff2`, `.eot`, `.ttf`, `.otf`
   - Автоматичне копіювання в `dist/fonts/`

3. **Робота з зображеннями**
   - Підтримка: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.ico`
   - Автоматична оптимізація (файли < 8kb інлайнуються як base64)
   - Копіювання з `src/img/` в `dist/img/`

4. **Інтеграція CSS стилів**
   - Підтримка SASS/SCSS (включаючи `.sass` синтаксис)
   - MiniCssExtractPlugin для production
   - Source maps для debugging

5. **Оптимізація зовнішніх бібліотек**
   - Автоматичне розділення vendor коду
   - Code splitting для зменшення розміру бандлу
   - Tree shaking для видалення невикористаного коду

## 📦 Встановлення

```bash
npm install
```

## 🛠️ Доступні команди

```bash
# Development сервер з hot reload
npm run dev

# Production збірка
npm run build

# Development збірка (без мінімізації)
npm run build:dev

# Відслідковування змін
npm run watch

# Очищення dist папки
npm run clean
```

## 📁 Структура проєкту

```
.
├── dist/                   # Скомпільовані файли (генерується автоматично)
│   ├── css/               # Скомпільовані CSS файли
│   ├── js/                # Скомпільовані JavaScript файли
│   └── img/               # Скопійовані зображення
├── src/                    # Вихідні файли
│   ├── css/               # CSS файли (normalize.css)
│   ├── img/               # Зображення
│   ├── scss/              # SASS стилі
│   │   ├── abstracts/     # Змінні, міксини
│   │   ├── base/          # Базові стилі
│   │   ├── components/    # Компоненти
│   │   ├── layout/        # Макети
│   │   └── styles.sass    # Головний SASS файл
│   └── index.js           # Головна точка входу
├── index.html             # HTML шаблон
├── webpack.config.js      # Основна конфігурація Webpack
├── webpack.config.development.js  # Development конфігурація
├── webpack.config.production.js   # Production конфігурація
├── .babelrc               # Babel конфігурація
└── package.json           # NPM залежності
```

## 🎯 Використання

### Development режим

```bash
npm run dev
```

Запустить dev-сервер на `http://localhost:9000` з:
- Hot Module Replacement
- Source maps
- Автоматичне оновлення при зміні файлів

### Production збірка

```bash
npm run build
```

Створить оптимізовану збірку в папці `dist/` з:
- Мінімізацією JavaScript та CSS
- Хешуванням файлів
- Оптимізованими зображеннями
- Розділеним vendor кодом

## ⚙️ Конфігурація Webpack

### Основні можливості:

- **Entry Point**: `src/index.js`
- **Output**: `dist/` з хешованими іменами файлів
- **Dev Server**: порт 9000, hot reload
- **Source Maps**: різні для dev/prod

### Loaders:

- `sass-loader` - компіляція SASS/SCSS
- `css-loader` - обробка CSS
- `babel-loader` - транспіляція ES6+
- `asset/resource` - шрифти та зображення

### Plugins:

- `HtmlWebpackPlugin` - генерація HTML
- `MiniCssExtractPlugin` - витягування CSS
- `CleanWebpackPlugin` - очищення dist
- `CopyWebpackPlugin` - копіювання статичних файлів

## 🔧 Babel конфігурація

Підтримка:
- Останніх 2 версій браузерів
- IE11+
- Core-js polyfills

## 📝 Приклади використання

### Імпорт стилів у `src/index.js`:

```javascript
// Імпорт normalize CSS
import './css/normalize.css';

// Імпорт головного SASS файлу
import './scss/styles.sass';
```

### Імпорт зображень:

```javascript
// Використання webpack alias
import logo from '@img/logo.png';

// Або відносний шлях
import logo from './img/logo.png';
```

### Використання зображень в HTML:

```html
<!-- Зображення автоматично копіюються з src/img/ в dist/img/ -->
<img src="img/project.svg" alt="Project">
```

### Використання шрифтів:

```scss
@font-face {
  font-family: 'CustomFont';
  src: url('../fonts/custom-font.woff2') format('woff2');
}
```

## 📊 Оптимізація

- **Code Splitting**: автоматичне розділення коду
- **Tree Shaking**: видалення невикористаного коду
- **Minification**: мінімізація JS та CSS
- **Cache Busting**: хешування для кешування

## 🐛 Debugging

Source maps доступні в обох режимах:
- Development: `eval-source-map`
- Production: `source-map`

## 📄 Ліцензія

ISC
