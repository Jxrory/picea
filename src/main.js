import { createApp } from "vue";
import Layout from "@/views/layout";
import router from "@/router";
import store from "@/store";

createApp(Layout).use(store).use(router).mount("#app");
