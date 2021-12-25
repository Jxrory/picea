<template>
  <div class="detail-comment-list">
    <div v-if="comments.length === 0" class="empty">
      <span class="iconfont">&#xe627;</span>暂无评论
    </div>

    <CommentItem
      v-for="item in comments"
      :key="item.id"
      :username="item.nick"
      :date="item.created"
      :content="item.content"
    />

    <div class="post">
      <input
        placeholder="按回车健发送评论"
        v-model="input"
        type="text"
        class="input"
        @keyup.enter="submit"
      />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import CommentItem from "./item";

export default {
  name: "Comments",

  components: {
    CommentItem,
  },

  props: ["__idx"],
  data() {
    return {
      input: "",
    };
  },
  computed: {
    comments: {
      get() {
        return store.getters["todos/getCommentsByIdx"](this.__idx);
      },
    },
  },

  created() {
    // 获取 comments TODO(jx)
  },
  methods: {
    submit() {
      console.log("comments input: ", this.input);
      store.dispatch("todos/addComment", {
        __idx: this.__idx,
        comment: {
          id: Date.now(),
          created: Date.now(),
          nick: "jxrory", // 获取用户名 TODO(jx)
          content: this.input,
          status: 0,
        },
      });

      this.input = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-comment-list {
  .empty {
    margin: 40px;
    text-align: center;

    span {
      color: #999;
      margin-right: 4px;
    }
  }

  .post {
    position: absolute;
    margin-top: 16px;
    bottom: 0;
    left: 26px;
    right: 0;

    .input {
      width: 100%;
      background: #fafafa;
      height: 24px;
      padding: 6px 8px;
      border: 1px solid #ddd;
      border-radius: 3px;
      color: #666;

      &:focus {
        outline: 0;
      }
    }
  }
}
</style>
