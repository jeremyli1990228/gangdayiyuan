<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">民生诉求</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">审批设置</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">审批设置</h1>
    </div>
    
    <div class="settings-section">
      <div class="settings-grid-header">
        <div class="grid-cell" style="width: 30%;">申请类型</div>
        <div class="grid-cell" style="width: 35%;">审批人</div>
        <div class="grid-cell" style="width: 20%;">操作</div>
      </div>
      
      <div class="settings-grid-row">
        <div class="grid-cell" style="width: 30%;">
          <select class="form-select">
            <option>工单完结申请</option>
          </select>
        </div>
        <div class="grid-cell" style="width: 35%;">
          <input type="text" class="form-input" value="付世平" readonly/>
        </div>
        <div class="grid-cell" style="width: 20%;">
          <button class="btn btn-secondary">编辑</button>
          <button class="btn btn-danger">删除</button>
        </div>
      </div>
      
      <div class="settings-grid-row">
        <div class="grid-cell" style="width: 30%;">
          <select class="form-select">
            <option>工单无效申请</option>
          </select>
        </div>
        <div class="grid-cell" style="width: 35%;">
          <input type="text" class="form-input" value="王小明" readonly/>
        </div>
        <div class="grid-cell" style="width: 20%;">
          <button class="btn btn-secondary">编辑</button>
          <button class="btn btn-danger">删除</button>
        </div>
      </div>
    </div>
    
    <div class="footer-actions">
      <button class="btn btn-primary">新增</button>
      <button class="btn btn-primary">保存</button>
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  window.history.back()
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

.settings-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
  border: 1px solid #f0f0f0;
}

.settings-grid-header {
  display: flex;
  padding: 12px 16px;
  background-color: #fafafa;
  border-radius: 4px 4px 0 0;
}

.grid-cell {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  flex-shrink: 0;
}

.settings-grid-row {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.settings-grid-row:last-child {
  border-bottom: none;
}

.settings-grid-row .grid-cell {
  font-weight: normal;
}

.form-select {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
}

.form-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fafafa;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 12px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-danger {
  background-color: #f5222d;
  color: #fff;
}

.footer-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}
</style>
