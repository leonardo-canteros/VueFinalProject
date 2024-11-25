import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

// Components
const vuetify = createVuetify({
  components,
  directives,
});

/**
 * cookie domain for vercel environment: .morethansound.vercel.app
 *
 * cookie domain for local environment: .morethansound.com
 */

// no ignorar errores de typescript
// npm run build
// npm run type-check

const app = createApp(App);
app.use(VueCookies, {
  sameSite: "Lax",
  expires: "7d",
  path: "/",
  domain: ".morethansound.vercel.app",
});

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.mount("#app");