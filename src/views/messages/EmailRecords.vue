<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">消息</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">邮件记录</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">邮件记录</h1>
      <div class="header-actions">
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
      </div>
    </div>
    
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>模板名称</label>
          <input type="text" placeholder="模板名称" class="form-input" style="width: 220px;"/>
        </div>
        <div class="form-item">
          <label>邮件地址</label>
          <input type="text" placeholder="邮件地址" class="form-input" style="width: 220px;"/>
        </div>
        <div class="form-item">
          <label>业务类型</label>
          <select class="form-select" style="width: 180px;">
            <option value="">请选择</option>
          </select>
        </div>
        <div class="form-item">
          <label>发送状态</label>
          <select class="form-select" style="width: 180px;">
            <option value="">请选择</option>
          </select>
        </div>
      </div>
      <div class="form-row" style="margin-top: 16px;">
        <div class="form-item">
          <label>发送时间</label>
          <input type="date" placeholder="开始日期" class="form-input" style="width: 180px;"/>
          <span class="form-separator">至</span>
          <input type="date" placeholder="结束日期" class="form-input" style="width: 180px;"/>
        </div>
      </div>
    </div>
    
    <div class="table-section">
      <div class="table-container">
      <div class="table-wrapper">
        <div class="table-header">
          <div class="table-cell" style="width: 80px;">序号</div>
          <div class="table-cell" style="width: 180px;">模板名称</div>
          <div class="table-cell" style="width: 180px;">业务类型</div>
          <div class="table-cell" style="width: 220px;">发送邮件地址</div>
          <div class="table-cell" style="width: 180px;">发送时间</div>
          <div class="table-cell" style="width: 120px;">发送状态</div>
          <div class="table-cell" style="width: 100px;">操作</div>
        </div>
        <div class="table-body">
          <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke-width="1.5"/>
              <path d="M16 5V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2" stroke-width="1.5"/>
            </svg>
            <p class="empty-text">暂无数据</p>
          </div>
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
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
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
  width: 250px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-select {
  width: 200px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
}

.form-separator {
  color: #333;
  font-size: 14px;
  margin: 0 8px;
}

.table-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
}

.table-container {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow-x: auto;
}

.table-wrapper {
  min-width: 1000px;
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
  padding: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.table-row {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .table-cell {
  font-weight: normal;
}

.action-link {
  color: #1890ff;
  font-size: 14px;
  text-decoration: none;
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