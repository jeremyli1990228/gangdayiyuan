<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">社工管理</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">社工管理</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">社工管理</h1>
      <button class="btn btn-primary" style="margin-left: auto;">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke-width="2"/>
        </svg>
        查询
      </button>
    </div>
    
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>招聘标题</label>
          <input type="text" placeholder="请输入" class="form-input"/>
        </div>
        <div class="form-item">
          <label>社工姓名</label>
          <input type="text" placeholder="请输入" class="form-input"/>
        </div>
        <div class="form-item">
          <label>社工电话</label>
          <input type="text" placeholder="请输入" class="form-input"/>
        </div>
        <div class="form-item">
          <label>报名日期</label>
          <div class="date-range">
            <input type="text" placeholder="开始日期" class="form-input date-input"/>
            <span class="date-separator">至</span>
            <input type="text" placeholder="结束日期" class="form-input date-input"/>
          </div>
        </div>
      </div>
    </div>
    
    <div class="table-section">
      <div class="table-container">
        <div class="table-header">
          <div class="table-cell" style="width: 80px;">序号</div>
          <div class="table-cell" style="width: 120px;">社工姓名</div>
          <div class="table-cell" style="width: 150px;">社工电话</div>
          <div class="table-cell" style="width: 200px;">招聘标题</div>
          <div class="table-cell" style="width: 180px;">报名时间</div>
          <div class="table-cell" style="width: 120px;">累计工时</div>
          <div class="table-cell" style="width: 150px;">操作</div>
        </div>
        <div class="table-body">
          <div class="empty-row">
            <svg class="empty-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="20" width="60" height="80" rx="4" fill="#f0f0f0" stroke="#e0e0e0" stroke-width="2"/>
              <path d="M40 35 L50 35 L50 50 L40 50 Z M70 35 L80 35 L80 65 L70 65 Z" fill="#e0e0e0"/>
              <path d="M45 60 L50 55 L60 70 L70 50 L75 55" fill="none" stroke="#d0d0d0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="empty-text">暂无数据</div>
          </div>
        </div>
      </div>
      
      <div class="pagination">
        <div class="pagination-info">共 0 条</div>
        <select class="pagination-select">
          <option>10条/页</option>
          <option>20条/页</option>
          <option>50条/页</option>
        </select>
        <div class="pagination-buttons">
          <button class="pagination-btn" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="pagination-jump">
          前往
          <input type="text" class="jump-input" value="1"/>
          页
        </div>
      </div>
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
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
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
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.search-form {
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 40px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-item label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  font-weight: 500;
}

.form-input {
  width: 200px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.date-input {
  width: 140px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%23999' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' stroke-width='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6' stroke-width='2'/%3E%3Cline x1='8' y1='2' x2='8' y2='6' stroke-width='2'/%3E%3Cline x1='3' y1='10' x2='21' y2='10' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-separator {
  color: #999;
}

.table-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
}

.table-container {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.table-header {
  display: flex;
  background-color: #fafafa;
  padding: 12px 16px;
}

.table-cell {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: left;
  flex-shrink: 0;
}

.table-body {
  padding: 16px;
}

.empty-row {
  text-align: center;
  padding: 60px 0;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.empty-text {
  color: #999;
  font-size: 14px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

.pagination-buttons {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.pagination-btn.active {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn svg {
  width: 14px;
  height: 14px;
}

.pagination-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.jump-input {
  width: 56px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}
</style>
