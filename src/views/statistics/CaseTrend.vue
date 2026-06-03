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
      <span class="breadcrumb-item active">案件变化趋势</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">案件变化趋势</h1>
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
        <div class="form-item">
          <label>日期</label>
          <div class="date-range">
            <input type="text" placeholder="开始日期" class="form-input date-input">
            <span class="date-separator">至</span>
            <input type="text" placeholder="结束日期" class="form-input date-input">
          </div>
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
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" class="chart-svg">
          <line x1="80" y1="40" x2="80" y2="260" stroke="#e0e0e0" stroke-width="2"/>
          <line x1="80" y1="260" x2="980" y2="260" stroke="#e0e0e0" stroke-width="2"/>
          <line x1="80" y1="80" x2="980" y2="80" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="120" x2="980" y2="120" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="160" x2="980" y2="160" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="200" x2="980" y2="200" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="80" y1="240" x2="980" y2="240" stroke="#f0f0f0" stroke-width="1" stroke-dasharray="4 4"/>
          <text x="60" y="84" fill="#999" font-size="12" text-anchor="end">5</text>
          <text x="60" y="124" fill="#999" font-size="12" text-anchor="end">4</text>
          <text x="60" y="164" fill="#999" font-size="12" text-anchor="end">3</text>
          <text x="60" y="204" fill="#999" font-size="12" text-anchor="end">2</text>
          <text x="60" y="244" fill="#999" font-size="12" text-anchor="end">1</text>
          <text x="60" y="264" fill="#999" font-size="12" text-anchor="end">0</text>
        </svg>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #fa8c16;"></span>
            <span>投诉案件数</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #1890ff;"></span>
            <span>感谢案件数</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #d4d4d4;"></span>
            <span>建议案件数</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background-color: #52c41a;"></span>
            <span>其他案件数</span>
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
          <div class="table-cell" style="width: 150px;">日期</div>
          <div class="table-cell" style="width: 120px;">新增简单</div>
          <div class="table-cell" style="width: 120px;">新增复杂</div>
          <div class="table-cell" style="width: 100px;">无效</div>
          <div class="table-cell" style="width: 100px;">已完结</div>
        </div>
        <div class="table-body">
          <div class="empty-row">
            <span>暂无数据</span>
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

.form-select:focus {
  border-color: #1890ff;
}

.form-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890ff;
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
  height: 300px;
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
  padding: 16px;
}

.empty-row {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 40px 0;
}
</style>