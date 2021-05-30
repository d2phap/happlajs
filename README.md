# 📦 NPM Package template

NPM package template with Typescript, Webpack, SCSS, EsLint, Babel

Package url: https://www.npmjs.com/package/@d2phap/npm-package-template

Try the package:
```
npm i @d2phap/npm-package-template
```

## ☢️ Development note!
Even though I set up URL alias in `tsconfig.json` and `webpack.config.js`, you should always use relative path for importing Js module, because TypeScript does not support resolving alias path to relative path. Source:
- https://github.com/microsoft/TypeScript/issues/26722#issuecomment-580975983 (closed)
- https://github.com/microsoft/TypeScript/issues/30952 (open)

Instead of this:
```ts
import { Person } from '@/module/person';
```

Do this:
```ts
import { Person } from './module/person';
```

## 🚀 Getting started
```bash
# 1. Install dependencies
npm i

# 2. Start development server
npm start

# 3. Build and compile for production
npm run build

# 4. Commit your changes

# 5. Bump package version
npm version <version_number>

# 6. Publish your package
npm publish
```

## 💖 Support my open source work
<a href="https://www.patreon.com/d2phap" target="_blank" title="Become a patron">
<img src="https://img.shields.io/badge/Patreon-@d2phap%20-e85b46.svg?maxAge=3600" height="30" alt="Buy me a beer?">
</a>

<a href="https://www.paypal.me/d2phap" target="_blank" title="Buy me a beer?">
<img src="https://img.shields.io/badge/PayPal-Donate%20$10%20-0070ba.svg?maxAge=3600" height="30" alt="Buy me a beer?">
</a>

<a href="https://github.com/sponsors/d2phap" target="_blank" title="Become a sponsor">
<img src="https://img.shields.io/badge/Github-@d2phap-24292e.svg?maxAge=3600" height="30" alt="Become a sponsor">
</a>


### Cryptocurrency donation:

```bash
# Ethereum
0xc19be8972809b6b989f3e4ba16595712ba8e0de4

# Bitcoin
1PcCezBmM3ahTzfBBi5KVWnnd3bCHbas8Z
```

Thanks for your gratitude and finance help!

