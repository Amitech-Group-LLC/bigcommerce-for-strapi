# BigCommerce for Strapi plugin

## Getting Started
1. Install plugin
```
strapi install @amitechgrp/bigcommerce-for-strapi
```

2. Add to `config/plugins.js`
```javascript
module.exports = ({ env }) => ({
  bigcommerce: {
    enabled: true,
    config: {},
  },
});
```

3. Copy files from `inject` folder to `src`
