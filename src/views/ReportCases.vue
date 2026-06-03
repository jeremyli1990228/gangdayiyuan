<template>
  <div class="page-container">
    <div class="page-header">
      <h2>案件报备</h2>
    </div>
    <div class="page-content">
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"></path>
          <polyline points="15 2 15 7 20 7"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
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
