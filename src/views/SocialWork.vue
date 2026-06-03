<template>
  <div class="page-container">
    <div class="page-header">
      <h2>社工管理</h2>
    </div>
    <div class="page-content">
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
}

.page-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.page-content {
  flex: 1;
  padding: 24px;
  background-color: #f5f7fa;
  overflow-y: auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: #999;
}

.empty-state svg {
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
}
</style>
