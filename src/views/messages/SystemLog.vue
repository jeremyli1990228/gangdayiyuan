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
      <span class="breadcrumb-item active">系统日志</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">系统日志</h1>
      <div class="header-actions">
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
        <button class="btn" style="background-color: #faad14; color: #fff;">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6h5M5 6h5M5 12h14M5 18h14M14 2v4M10 6v4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          重置
        </button>
      </div>
    </div>
    
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>案件编号</label>
          <input type="text" placeholder="案件编号" class="form-input" style="width: 220px;"/>
        </div>
        <div class="form-item">
          <label>操作类型</label>
          <select class="form-select" style="width: 200px;">
            <option value="">请选择</option>
          </select>
        </div>
        <div class="form-item">
          <label>操作人</label>
          <input type="text" placeholder="操作人" class="form-input" style="width: 220px;"/>
        </div>
        <div class="form-item">
          <label>创建时间</label>
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
          <div class="table-cell" style="width: 200px;">案件编号</div>
          <div class="table-cell" style="width: 200px;">操作类型</div>
          <div class="table-cell" style="width: 150px;">操作人</div>
          <div class="table-cell" style="width: 180px;">操作人科室</div>
          <div class="table-cell" style="width: 150px;">受理人</div>
          <div class="table-cell" style="width: 180px;">受理人科室</div>
          <div class="table-cell" style="width: 180px;">创建时间</div>
        </div>
        <div class="table-body">
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">1</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">案件完结申请</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2023-10-22 15:52:38</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">2</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">案件完结审批</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;"></div>
            <div class="table-cell" style="width: 180px;"></div>
            <div class="table-cell" style="width: 180px;">2026-06-01 01:15:51</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">3</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">联系客户</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-06-01 01:12:37</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">4</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">录入案件信息</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-05-31 03:56:53</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">5</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">编辑案件</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-03-02 04:52:37</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">6</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">录入案件信息</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-03-02 03:11:34</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">7</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">编辑案件</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-03-02 03:11:11</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">8</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">录入案件信息</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-03-02 03:10:42</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">9</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">编辑案件</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-03-02 03:09:30</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 80px;">10</div>
            <div class="table-cell" style="width: 200px;"><span style="color: #1890ff; cursor: pointer;">000157412023102001</span></div>
            <div class="table-cell" style="width: 200px;">录入案件信息</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 150px;">付世平</div>
            <div class="table-cell" style="width: 180px;">测试部门一</div>
            <div class="table-cell" style="width: 180px;">2026-03-02 03:06:18</div>
          </div>
        </div>
      </div>
    </div>
      
      <div class="pagination">
        <div class="pagination-info">共 54 条</div>
        <select class="pagination-select">
          <option selected>10条/页</option>
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
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <button class="pagination-btn">4</button>
          <button class="pagination-btn">5</button>
          <button class="pagination-btn">6</button>
          <button class="pagination-btn">
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
  min-width: 1300px;
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