<template>
  <div>
    <v-container>
      <h2 class="mb-5">{{ job.company_name }}</h2>
      <p>職種：{{ job.job_title }}</p>
      <p>内容：{{ job.job_description }}</p>
      <p>給料：{{ job.salary }}円</p>
      <p>都道府県：{{ job.prefectures }}</p>
      <p>市町村：{{ job.city }}</p>
      <v-btn
        color="success"
        class="mr-2"
        :to="{ name: 'editor', params: { id: job.id } }"
        >編集
      </v-btn>
      <v-btn color="error" @click="deleteJobData">削除 </v-btn>
    </v-container>
  </div>
</template>

<script>
import { apiService } from "../common/api.service.js";

export default {
  name: "JobDetailView",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      job: {}, // jobオブジェクトを初期化
    };
  },
  methods: {
    setPageTitle(title) {
      // ページのタイトルを設定するメソッド
      document.title = title;
    },
    getJobData() {
      // ジョブデータを取得するメソッド
      let endpoint = `/api/jobs/${this.id}/`;
      apiService(endpoint).then((data) => {
        this.job = data; // 取得したデータをjobオブジェクトにセット
        this.setPageTitle(data.company_name); // ジョブデータのcompany_nameプロパティをページタイトルに設定
      });
    },
    deleteJobData() {
      // ジョブデータを削除するメソッド
      let endpoint = `/api/jobs/${this.id}/`;
      apiService(endpoint, "DELETE").then(() => {
        this.$router.push({
          // ルーターを使用して'home'ルートに遷移
          name: "home",
        });
      });
    },
  },
  created() {
    // コンポーネントが作成された時に実行する処理
    this.getJobData();
  },
};
</script>

<style></style>
