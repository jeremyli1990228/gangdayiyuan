<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">系统管理</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">动态路由</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">动态路由</h1>
    </div>
    
    <div class="content-section">
      <div class="warning-bar">
        <span class="warning-text">路由配置是非常专业的事情，不建议非工程师操作</span>
        <button class="close-btn" @click="closeWarning">×</button>
      </div>
      
      <div class="update-section">
        <button class="btn btn-update">更新</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  window.history.back()
}

const closeWarning = () => {
  const warningBar = document.querySelector('.warning-bar')
  if (warningBar) {
    warningBar.style.display = 'none'
  }
}
</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100%;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb-arrow {
  width: 32px;
  height: 32px;
  background-color: #e6f7ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  cursor: pointer;
}

.breadcrumb-arrow svg {
  width: 16px;
  height: 16px;
}

.breadcrumb-item {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.content-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}

.warning-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 24px;
}

.warning-text {
  font-size: 14px;
  color: #faad14;
}

.close-btn {
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #666;
}

.update-section {
  display: flex;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 24px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: #fff;
  color: #333;
}

.btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}
</style>