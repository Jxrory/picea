# Vue 实例选项顺序

> 在 Vue 中，export default 对象中有很多约定的 API Key。每个人的顺序排放都可能不一致，但保持统一的代码风格有助于团队成员多人协作。

1. Vue 扩展: extends, mixins, components
2. Vue 数据: props, model, data, computed, watch
3. Vue 资源: filters, directives
4. Vue 生命周期: created, mounted, destroy...
5. Vue 方法: methods

```js
export default {
  name: "",
  /*1. Vue扩展 */
  extends: "", // extends和mixins都扩展逻辑，需要重点放前面
  mixins: [],
  components: {},
  /* 2. Vue数据 */
  props: {},
  model: { prop: "", event: "" }, // model 会使用到 props
  data() {
    return {};
  },
  computed: {},
  watch: {}, // watch 监控的是 props 和 data，有必要时监控computed
  /* 3. Vue资源 */
  filters: {},
  directives: {},
  /* 4. Vue生命周期 */
  created() {},
  mounted() {},
  destroy() {},
  /* 5. Vue方法 */
  methods: {}, // all the methods should be put here in the last
};
```

## 参考

[推荐-Vue 实例选项顺序](https://lq782655835.github.io/blogs/team-standard/recommend-vue-api-order.html)
