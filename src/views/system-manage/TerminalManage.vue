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
      <span class="breadcrumb-item active">终端管理</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">终端管理</h1>
      <div class="header-actions">
        <button class="btn btn-success">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          新增
        </button>
      </div>
    </div>
    
    <div class="table-section">
      <div class="table-container">
      <div class="table-wrapper">
        <div class="table-header">
          <div class="table-cell" style="width: 80px;">序号</div>
          <div class="table-cell" style="width: 120px;">编号</div>
          <div class="table-cell" style="width: 120px;">密钥</div>
          <div class="table-cell" style="width: 100px;">域</div>
          <div class="table-cell" style="width: 200px;">授权模式</div>
          <div class="table-cell" style="width: 120px;">自动放行</div>
          <div class="table-cell" style="width: 120px;">令牌时效</div>
          <div class="table-cell" style="width: 120px;">刷新时效</div>
          <div class="table-cell" style="width: 150px;">操作</div>
        </div>
        <div class="table-body">
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">1</div>
            <div class="table-cell" style="width: 120px;">app</div>
            <div class="table-cell" style="width: 120px;">app</div>
            <div class="table-cell" style="width: 100px;">server</div>
            <div class="table-cell" style="width: 200px;">password,refresh_token</div>
            <div class="table-cell" style="width: 120px;">true</div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 150px;">
              <a href="#" class="action-link">查看</a>
              <a href="#" class="action-link">编辑</a>
              <a href="#" class="action-link delete">删除</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">2</div>
            <div class="table-cell" style="width: 120px;">gen</div>
            <div class="table-cell" style="width: 120px;">gen</div>
            <div class="table-cell" style="width: 100px;">server</div>
            <div class="table-cell" style="width: 200px;">password,refresh_token</div>
            <div class="table-cell" style="width: 120px;">true</div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 150px;">
              <a href="#" class="action-link">查看</a>
              <a href="#" class="action-link">编辑</a>
              <a href="#" class="action-link delete">删除</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">3</div>
            <div class="table-cell" style="width: 120px;">smart</div>
            <div class="table-cell" style="width: 120px;">smart</div>
            <div class="table-cell" style="width: 100px;">server</div>
            <div class="table-cell" style="width: 200px;">password,refresh_token,auth...</div>
            <div class="table-cell" style="width: 120px;">true</div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 150px;">
              <a href="#" class="action-link">查看</a>
              <a href="#" class="action-link">编辑</a>
              <a href="#" class="action-link delete">删除</a>
            </div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">4</div>
            <div class="table-cell" style="width: 120px;">test</div>
            <div class="table-cell" style="width: 120px;">test</div>
            <div class="table-cell" style="width: 100px;">server</div>
            <div class="table-cell" style="width: 200px;">password,refresh_token</div>
            <div class="table-cell" style="width: 120px;">true</div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 120px;"></div>
            <div class="table-cell" style="width: 150px;">
              <a href="#" class="action-link">查看</a>
              <a href="#" class="action-link">编辑</a>
              <a href="#" class="action-link delete">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      <div class="pagination">
        <div class="pagination-info">共 4 条</div>
        <select class="pagination-select">
          <option selected>20条/页</option>
          <option>10条/页</option>
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

.btn-success {
  background-color: #10b981;
  color: #fff;
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
  min-width: 1100px;
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
  font-size: 14px;
  text-decoration: none;
  margin-right: 16px;
  color: #1890ff;
}

.action-link.delete {
  color: #f5222d;
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