<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">数据统计</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">导出中心</span>
    </div>
    
    <div class="export-page">
      <!-- 导出类型选择 -->
      <div class="export-card">
        <div class="card-header">
          <h3 class="card-title">导出类型</h3>
        </div>
        <div class="card-body">
          <div class="export-types">
            <div 
              v-for="type in exportTypes" 
              :key="type.key"
              :class="['export-type-item', { selected: selectedType === type.key }]"
              @click="selectedType = type.key"
            >
              <div class="type-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path :d="type.icon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="type-info">
                <div class="type-name">{{ type.name }}</div>
                <div class="type-desc">{{ type.description }}</div>
              </div>
              <div class="type-check" v-if="selectedType === type.key">✓</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 筛选条件 -->
      <div class="export-card">
        <div class="card-header">
          <h3 class="card-title">筛选条件</h3>
          <button class="btn-link" @click="resetFilters">重置</button>
        </div>
        <div class="card-body">
          <div class="filter-grid">
            <div class="filter-item">
              <label class="filter-label">时间范围</label>
              <div class="date-range">
                <input type="date" v-model="filters.startDate" class="filter-input">
                <span>至</span>
                <input type="date" v-model="filters.endDate" class="filter-input">
              </div>
            </div>
            
            <div class="filter-item">
              <label class="filter-label">案件类型</label>
              <select v-model="filters.caseType" class="filter-input">
                <option value="">全部</option>
                <option value="complaint">投诉</option>
                <option value="suggestion">建议</option>
                <option value="consult">咨询</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label class="filter-label">科室</label>
              <select v-model="filters.department" class="filter-input">
                <option value="">全部</option>
                <option value="outpatient">门诊部</option>
                <option value="emergency">急诊部</option>
                <option value="surgery">外科</option>
                <option value="internal">内科</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label class="filter-label">案件状态</label>
              <select v-model="filters.status" class="filter-input">
                <option value="">全部</option>
                <option value="pending">待处理</option>
                <option value="processing">处理中</option>
                <option value="completed">已完成</option>
                <option value="closed">已关闭</option>
              </select>
            </div>
            
            <div class="filter-item full-width">
              <label class="filter-label">涉及人员</label>
              <input type="text" v-model="filters.involvedPerson" placeholder="输入人员姓名" class="filter-input">
            </div>
          </div>
        </div>
      </div>
      
      <!-- 导出选项 -->
      <div class="export-card">
        <div class="card-header">
          <h3 class="card-title">导出选项</h3>
        </div>
        <div class="card-body">
          <div class="export-options">
            <div class="option-section">
              <h4 class="option-title">包含字段</h4>
              <div class="field-list">
                <label 
                  v-for="field in availableFields" 
                  :key="field.key"
                  class="field-item"
                >
                  <input type="checkbox" v-model="field.selected">
                  <span>{{ field.label }}</span>
                </label>
              </div>
            </div>
            
            <div class="option-section">
              <h4 class="option-title">导出格式</h4>
              <div class="format-list">
                <label 
                  v-for="format in exportFormats" 
                  :key="format"
                  :class="['format-item', { selected: selectedFormat === format }]"
                >
                  <input type="radio" v-model="selectedFormat" :value="format">
                  <span>{{ format }}</span>
                </label>
              </div>
            </div>
            
            <div class="option-section">
              <h4 class="option-title">附加内容</h4>
              <div class="附加内容">
                <label class="附加内容-item">
                  <input type="checkbox" v-model="附加内容.summary">
                  <span>汇总统计</span>
                </label>
                <label class="附加内容-item">
                  <input type="checkbox" v-model="附加内容.chart">
                  <span>图表分析</span>
                </label>
                <label class="附加内容-item">
                  <input type="checkbox" v-model="附加内容.timeline">
                  <span>时间线</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 预览 -->
      <div class="export-card">
        <div class="card-header">
          <h3 class="card-title">数据预览</h3>
          <span class="preview-count">共 {{ previewData.length }} 条记录</span>
        </div>
        <div class="card-body">
          <div class="preview-table">
            <table>
              <thead>
                <tr>
                  <th>案件编号</th>
                  <th>案件类型</th>
                  <th>标题</th>
                  <th>科室</th>
                  <th>状态</th>
                  <th>创建时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in previewData.slice(0, 10)" :key="item.id">
                  <td>{{ item.caseNo }}</td>
                  <td>{{ item.caseType }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.department }}</td>
                  <td><span class="status-tag" :class="item.status">{{ item.statusText }}</span></td>
                  <td>{{ item.createTime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="preview-more" v-if="previewData.length > 10">
            还有 {{ previewData.length - 10 }} 条记录...
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="previewExport">预览导出</button>
        <button class="btn btn-primary" @click="startExport">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          导出数据
        </button>
      </div>
    </div>
    
    <!-- 导出进度弹窗 -->
    <div class="progress-modal" v-if="showProgress">
      <div class="progress-content">
        <div class="progress-header">
          <h3>正在导出...</h3>
        </div>
        <div class="progress-body">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">{{ progress }}%</div>
          <div class="progress-info">正在导出第 {{ exportedCount }} / {{ totalCount }} 条记录</div>
        </div>
        <div class="progress-footer">
          <button class="btn-cancel" @click="cancelExport">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const exportTypes = [
  {
    key: 'ledger',
    name: '汇总台账',
    description: '导出完整的案件汇总台账，包含所有详细信息',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8'
  },
  {
    key: 'report',
    name: '简报',
    description: '导出案件处理简报，包含关键指标和统计',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  {
    key: 'statistics',
    name: '统计分析',
    description: '导出详细的统计分析报表和图表',
    icon: 'M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3'
  },
  {
    key: 'detail',
    name: '明细数据',
    description: '导出原始明细数据，便于进一步分析',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16'
  }
]

const selectedType = ref('ledger')

const filters = ref({
  startDate: '',
  endDate: '',
  caseType: '',
  department: '',
  status: '',
  involvedPerson: ''
})

const availableFields = ref([
  { key: 'caseNo', label: '案件编号', selected: true },
  { key: 'caseType', label: '案件类型', selected: true },
  { key: 'title', label: '标题', selected: true },
  { key: 'department', label: '科室', selected: true },
  { key: 'complainant', label: '投诉人', selected: true },
  { key: 'phone', label: '电话', selected: true },
  { key: 'status', label: '状态', selected: true },
  { key: 'handler', label: '处理人', selected: true },
  { key: 'createTime', label: '创建时间', selected: true },
  { key: 'handleTime', label: '处理时间', selected: true },
  { key: 'closeTime', label: '关闭时间', selected: false },
  { key: 'description', label: '问题描述', selected: true },
  { key: 'result', label: '处理结果', selected: true }
])

const exportFormats = ['Excel', 'CSV', 'PDF', 'Word']
const selectedFormat = ref('Excel')

const 附加内容 = ref({
  summary: true,
  chart: true,
  timeline: false
})

// 预览数据
const previewData = ref([
  { id: 1, caseNo: 'TS202401001', caseType: '投诉', title: '门诊等候时间过长', department: '门诊部', status: 'completed', statusText: '已完成', createTime: '2024-01-15' },
  { id: 2, caseNo: 'TS202401002', caseType: '建议', title: '增加自助挂号机', department: '信息中心', status: 'processing', statusText: '处理中', createTime: '2024-01-14' },
  { id: 3, caseNo: 'TS202401003', caseType: '咨询', title: '医生排班查询', department: '医务科', status: 'completed', statusText: '已完成', createTime: '2024-01-13' },
  { id: 4, caseNo: 'TS202401004', caseType: '投诉', title: '护士服务态度问题', department: '护理部', status: 'pending', statusText: '待处理', createTime: '2024-01-12' },
  { id: 5, caseNo: 'TS202401005', caseType: '建议', title: '优化就诊流程', department: '门诊部', status: 'completed', statusText: '已完成', createTime: '2024-01-11' }
])

const showProgress = ref(false)
const progress = ref(0)
const exportedCount = ref(0)
const totalCount = ref(0)

const resetFilters = () => {
  filters.value = {
    startDate: '',
    endDate: '',
    caseType: '',
    department: '',
    status: '',
    involvedPerson: ''
  }
}

const previewExport = () => {
  console.log('预览导出')
  alert('预览功能开发中')
}

const startExport = () => {
  totalCount.value = previewData.value.length
  exportedCount.value = 0
  progress.value = 0
  showProgress.value = true
  
  // 模拟导出进度
  const interval = setInterval(() => {
    exportedCount.value += Math.floor(Math.random() * 10) + 1
    if (exportedCount.value >= totalCount.value) {
      exportedCount.value = totalCount.value
      progress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        showProgress.value = false
        alert('导出成功！文件已下载。')
      }, 500)
    } else {
      progress.value = Math.floor((exportedCount.value / totalCount.value) * 100)
    }
  }, 200)
}

const cancelExport = () => {
  showProgress.value = false
  progress.value = 0
  exportedCount.value = 0
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.breadcrumb-item.active {
  color: #333;
}

.export-page {
  max-width: 1000px;
}

.export-card {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.btn-link {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.card-body {
  padding: 20px;
}

/* 导出类型 */
.export-types {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.export-type-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.export-type-item:hover {
  border-color: #1890ff;
}

.export-type-item.selected {
  border-color: #1890ff;
  background: #e6f7ff;
}

.type-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
}

.export-type-item.selected .type-icon {
  background: #1890ff;
}

.type-icon svg {
  width: 24px;
  height: 24px;
}

.export-type-item.selected .type-icon svg {
  color: #fff;
}

.type-info {
  flex: 1;
}

.type-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.type-desc {
  font-size: 13px;
  color: #999;
}

.type-check {
  width: 24px;
  height: 24px;
  background: #1890ff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

/* 筛选条件 */
.filter-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-item.full-width {
  grid-column: span 2;
}

.filter-label {
  font-size: 13px;
  color: #999;
}

.filter-input {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.filter-input:focus {
  border-color: #1890ff;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-range .filter-input {
  flex: 1;
}

.date-range span {
  color: #999;
}

/* 导出选项 */
.option-section {
  margin-bottom: 24px;
}

.option-section:last-child {
  margin-bottom: 0;
}

.option-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 12px 0;
}

.field-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.field-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
}

.format-list {
  display: flex;
  gap: 12px;
}

.format-item {
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.format-item:hover {
  border-color: #1890ff;
}

.format-item.selected {
  border-color: #1890ff;
  background: #e6f7ff;
  color: #1890ff;
}

.format-item input {
  display: none;
}

.附加内容 {
  display: flex;
  gap: 20px;
}

.附加内容-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

/* 预览表格 */
.preview-count {
  font-size: 13px;
  color: #999;
}

.preview-table {
  overflow-x: auto;
}

.preview-table table {
  width: 100%;
  border-collapse: collapse;
}

.preview-table th,
.preview-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.preview-table th {
  background: #fafafa;
  font-weight: 500;
  color: #333;
}

.preview-table td {
  color: #666;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.completed {
  background: #f6ffed;
  color: #52c41a;
}

.status-tag.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.status-tag.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.preview-more {
  text-align: center;
  padding: 12px;
  font-size: 13px;
  color: #999;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  height: 40px;
  padding: 0 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

/* 导出进度弹窗 */
.progress-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.progress-content {
  width: 400px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.progress-header {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.progress-header h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.progress-body {
  padding: 24px 20px;
  text-align: center;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: #1890ff;
  transition: width 0.3s;
}

.progress-text {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.progress-info {
  font-size: 13px;
  color: #999;
}

.progress-footer {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
}

.btn-cancel {
  width: 120px;
  height: 36px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

@media (max-width: 768px) {
  .export-types {
    grid-template-columns: 1fr;
  }
  
  .field-list {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-item.full-width {
    grid-column: span 1;
  }
}
</style>
