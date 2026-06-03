<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">数据统计</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">案件状态分布</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">案件状态分布</h1>
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
          <label>科室类型</label>
          <select class="form-select">
            <option value="">请选择</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="chart-section">
      <div class="section-header">
        <span class="section-title">统计图表</span>
        <a href="#" class="download-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1890ff" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
            <polyline points="7 10 12 15 17 10" stroke-width="2"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke-width="2"/>
          </svg>
          下载图片
        </a>
      </div>
      <div class="chart-container">
        <svg viewBox="0 0 1000 280" preserveAspectRatio="none" class="chart-svg">
          <line x1="80" y1="30" x2="80" y2="250" stroke="#e0e0e0" stroke-width="2"/>
          <line x1="80" y1="250" x2="980" y2="250" stroke="#e0e0e0" stroke-width="2"/>
          <line x1="80" y1="70" x2="980" y2="70" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="110" x2="980" y2="110" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="150" x2="980" y2="150" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="190" x2="980" y2="190" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="230" x2="980" y2="230" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <text x="60" y="74" fill="#999" font-size="12" text-anchor="end">3</text>
          <text x="60" y="114" fill="#999" font-size="12" text-anchor="end">2.5</text>
          <text x="60" y="154" fill="#999" font-size="12" text-anchor="end">2</text>
          <text x="60" y="194" fill="#999" font-size="12" text-anchor="end">1.5</text>
          <text x="60" y="234" fill="#999" font-size="12" text-anchor="end">1</text>
          <text x="60" y="254" fill="#999" font-size="12" text-anchor="end">0</text>
          <rect x="150" y="170" width="120" height="80" fill="#52c41a"/>
          <rect x="400" y="90" width="120" height="70" fill="#1890ff"/>
          <rect x="400" y="20" width="120" height="70" fill="#fa8c16"/>
          <rect x="650" y="90" width="120" height="160" fill="#1890ff"/>
          <rect x="650" y="30" width="120" height="60" fill="#52c41a"/>
          <text x="210" y="268" fill="#666" font-size="12" text-anchor="middle">医疗改善部</text>
          <text x="460" y="268" fill="#666" font-size="12" text-anchor="middle">测试部门一</text>
          <text x="710" y="268" fill="#666" font-size="12" text-anchor="middle">门诊</text>
        </svg>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #1890ff;"></span>
            <span>处理中</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #fa8c16;"></span>
            <span>审批中</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #52c41a;"></span>
            <span>已完结</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #d4d4d4;"></span>
            <span>无效</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="table-section">
      <div class="section-header">
        <span class="section-title">统计表单</span>
        <a href="#" class="download-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1890ff" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
            <polyline points="7 10 12 15 17 10" stroke-width="2"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke-width="2"/>
          </svg>
          导出数据
        </a>
      </div>
      <div class="table-container">
        <div class="table-header">
          <div class="table-cell" style="width: 120px;">科室</div>
          <div class="table-cell" style="width: 120px;">处理中</div>
          <div class="table-cell" style="width: 120px;">审批中</div>
          <div class="table-cell" style="width: 100px;">已完结</div>
          <div class="table-cell" style="width: 100px;">无效</div>
        </div>
        <div class="table-body">
          <div class="table-row">
            <div class="table-cell" style="width: 120px;">医疗改善部</div>
            <div class="table-cell" style="width: 120px;">0</div>
            <div class="table-cell" style="width: 120px;">0</div>
            <div class="table-cell" style="width: 100px;">1</div>
            <div class="table-cell" style="width: 100px;">0</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 120px;">测试部门一</div>
            <div class="table-cell" style="width: 120px;">1</div>
            <div class="table-cell" style="width: 120px;">1</div>
            <div class="table-cell" style="width: 100px;">1</div>
            <div class="table-cell" style="width: 100px;">0</div>
          </div>
          <div class="table-row">
            <div class="table-cell" style="width: 120px;">门诊</div>
            <div class="table-cell" style="width: 120px;">2</div>
            <div class="table-cell" style="width: 120px;">0</div>
            <div class="table-cell" style="width: 100px;">1</div>
            <div class="table-cell" style="width: 100px;">0</div>
          </div>
          <div class="table-row total-row">
            <div class="table-cell" style="width: 120px;">合计</div>
            <div class="table-cell" style="width: 120px;">3</div>
            <div class="table-cell" style="width: 120px;">1</div>
            <div class="table-cell" style="width: 100px;">3</div>
            <div class="table-cell" style="width: 100px;">0</div>
          </div>
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

.chart-section, .table-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #1890ff;
  font-size: 12px;
  text-decoration: none;
}

.download-link svg {
  width: 12px;
  height: 12px;
}

.chart-container {
  position: relative;
}

.chart-svg {
  width: 100%;
  height: 280px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
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
  background-color: #fff;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 16px;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .table-cell {
  font-weight: 400;
  color: #666;
  font-size: 14px;
}

.total-row {
  background-color: #fafafa;
  font-weight: 600;
}

.total-row .table-cell {
  font-weight: 600;
  color: #333;
}
</style>