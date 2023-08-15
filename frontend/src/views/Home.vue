<template>
  <div>
    <v-container>
      <div v-for="job in jobs" :key="job.pk">
        <h2>
          <!-- router-link は Vue Router のリンクコンポーネントで、各求人の詳細ページへのリンクを提供 -->
          <router-link
            :to="{ name: 'job', params: { id: job.id } }"
            class="job-link"
            >{{ job.company_name }}
          </router-link>
        </h2>
        <p>{{ job.job_title }}</p>
        <hr />
      </div>
      <div class="my-4">
        <p v-show="loadingJobs">...loading...</p>
        <v-btn v-show="next" @click="getJobs" color="#507bb7">Load More </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { apiService } from "../common/api.service.js";
export default {
  name: "homeView",
  data() {
    // コンポーネントの初期状態を定義
    return {
      jobs: [],
      next: null,
      loadingJobs: false,
    };
  },
  methods: {
    getJobs() {
      // APIから求人のデータを取得し、それを jobs 配列に追加
      let endpoint = "/api/jobs/";
      if (this.next) {
        endpoint = this.next;
      }
      this.loadingJobs = true;
      apiService(endpoint).then((data) => {
        this.jobs.push(...data.results);
        this.loadingJobs = false;
        if (data.next) {
          this.next = data.next;
        } else {
          this.next = null;
        }
      });
    },
  },
  created() {
    this.getJobs();
    document.title = "Job Board";
  },
};
</script>

<style scoped>
.job-link {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.job-link:hover {
  color: #507bb7;
}
</style>
