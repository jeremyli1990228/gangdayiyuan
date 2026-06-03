<template>
  <div class="report-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">数据统计</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">报表分析</span>
    </div>
    
    <!-- 筛选条件区 -->
    <div class="filter-card">
      <div class="filter-grid">
        <div class="filter-item">
          <label class="filter-label">时间范围</label>
          <div class="date-range">
            <input type="date" v-model="filters.startDate" class="filter-input" />
            <span>至</span>
            <input type="date" v-model="filters.endDate" class="filter-input" />
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
            <option value="internal">内科</option>
            <option value="surgery">外科</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label class="filter-label">状态</label>
          <select v-model="filters.status" class="filter-input">
            <option value="">全部</option>
            <option value="pending">待处理</option>
            <option value="processing">处理中</option>
            <option value="completed">已完成</option>
          </select>
        </div>
        
        <div class="filter-actions">
          <button class="btn btn-secondary" @click="resetFilters">重置</button>
          <button class="btn btn-primary" @click="applyFilters">查询</button>
        </div>
      </div>
    </div>
    
    <!-- 数据概览卡片 -->
    <div class="overview-cards">
      <div class="overview-card">
        <div class="card-icon blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="card-content">
          <div class="card-label">总案件数</div>
          <div class="card-value">{{ summary.total }}</div>
          <div class="card-trend">
            <span class="trend-up">↑ 12.5%</span>
            <span class="trend-text">较上月</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 6L9 17L4 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="card-content">
          <div class="card-label">已完成</div>
          <div class="card-value">{{ summary.completed }}</div>
          <div class="card-trend">
            <span class="trend-up">↑ 8.3%</span>
            <span class="trend-text">较上月</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon orange">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="card-content">
          <div class="card-label">处理中</div>
          <div class="card-value">{{ summary.processing }}</div>
          <div class="card-trend">
            <span class="trend-down">↓ 3.2%</span>
            <span class="trend-text">较上月</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="card-content">
          <div class="card-label">平均处理时长</div>
          <div class="card-value">{{ summary.avgHours }}小时</div>
          <div class="card-trend">
            <span class="trend-down">↓ 2.1小时</span>
            <span class="trend-text">较上月</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 图表区域 -->
    <div class="charts-grid">
      <!-- 案件趋势图 -->
      <div class="chart-card large">
        <div class="chart-header">
          <h3 class="chart-title">案件处理趋势</h3>
          <div class="chart-tabs">
            <button v-for="tab in chartTabs" 
                    :key="tab.key"
                    :class="['tab-btn', {active: activeChartTab === tab.key}]"
                    @click="activeChartTab = tab.key">
              {{ tab.name }}
            </button>
          </div>
        </div>
        <div class="chart-body">
          <div class="bar-chart-container">
            <svg viewBox="0 0 800 300" class="bar-chart-svg">
              <!-- 网格 -->
              <g class="grid-lines">
                <line x1="60" y1="50" x2="740" y2="50" stroke="#f0f0f0" stroke-width="1" />
                <line x1="60" y1="110" x2="740" y2="110" stroke="#f0f0f0" stroke-width="1" />
                <line x1="60" y1="170" x2="740" y2="170" stroke="#f0f0f0" stroke-width="1" />
                <line x1="60" y1="230" x2="740" y2="230" stroke="#f0f0f0" stroke-width="1" />
              </g>
              
              <!-- Y轴标签 -->
              <text x="45" y="54" class="y-label">200</text>
              <text x="45" y="114" class="y-label">150</text>
              <text x="45" y="174" class="y-label">100</text>
              <text x="45" y="234" class="y-label">50</text>
              
              <!-- 柱状图 -->
              <g v-for="(item, index) in trendChartData" :key="index">
                <rect 
                  :x="80 + index * 75"
                  :y="230 - item.value * 0.9"
                  width="40"
                  :height="item.value * 0.9"
                  :fill="item.color"
                  rx="4"
                />
                <text 
                  :x="100 + index * 75"
                  y="255"
                  class="x-label"
                  text-anchor="middle"
                >
                  {{ item.label }}
                </text>
                <text 
                  :x="100 + index * 75"
                  :y="230 - item.value * 0.9 - 8"
                  class="value-label"
                  text-anchor="middle"
                >
                  {{ item.value }}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 饼图区域 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3 class="chart-title">案件类型分布</h3>
        </div>
        <div class="chart-body">
          <div class="pie-chart-container">
            <svg viewBox="0 0 300 300" class="pie-chart-svg">
              <circle cx="150" cy="150" r="110" fill="none" stroke="#f5f5f5" stroke-width="2"/>
              <path 
                v-for="(slice, index) in pieChartData" 
                :key="index"
                :d="slice.path"
                :fill="slice.color"
                class="pie-slice"
              />
            </svg>
            <div class="pie-legend">
              <div v-for="(item, index) in pieChartData" :key="index" class="legend-item">
                <span class="legend-dot" :style="{background: item.color}"></span>
                <span class="legend-label">{{ item.name }}</span>
                <span class="legend-value">{{ item.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 科室统计 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3 class="chart-title">科室处理排行</h3>
        </div>
        <div class="chart-body">
          <div class="rank-list">
            <div v-for="(item, index) in departmentRank" :key="index" class="rank-item">
              <div class="rank-number" :class="getRankClass(index)">{{ index + 1 }}</div>
              <div class="rank-info">
                <div class="rank-name">{{ item.name }}</div>
                <div class="rank-bar">
                  <div class="rank-bar-fill" :style="{width: item.percentage + '%'}"></div>
                </div>
              </div>
              <div class="rank-value">{{ item.count }}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据详情表格 -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">数据明细</h3>
        <div class="table-actions">
          <button class="btn btn-secondary">导出Excel</button>
        </div>
      </div>
      <div class="table-body">
        <table class="data-table">
          <thead>
            <tr>
              <th>案件编号</th>
              <th>类型</th>
              <th>标题</th>
              <th>投诉人</th>
              <th>科室</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>处理人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <td class="case-no">{{ item.caseNo }}</td>
              <td><span class="type-badge" :class="item.type">{{ item.typeName }}</span></td>
              <td class="ellipsis">{{ item.title }}</td>
              <td>{{ item.complainant }}</td>
              <td>{{ item.department }}</td>
              <td><span class="status-badge" :class="item.status">{{ item.statusName }}</span></td>
              <td>{{ item.createTime }}</td>
              <td>{{ item.handler }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <div class="pagination-info">
          共 {{ totalRecords }} 条记录
        </div>
        <div class="pagination">
          <button class="page-btn" disabled>上一页</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filters = ref({
  startDate: '',
  endDate: '',
  caseType: '',
  department: '',
  status: ''
})

const summary = ref({
  total: 2856,
  completed: 1923,
  processing: 425,
  avgHours: 23.5
})

const chartTabs = [
  { key: 'day', name: '日' },
  { key: 'week', name: '周' },
  { key: 'month', name: '月' }
]
const activeChartTab = ref('month')

const trendChartData = ref([
  { label: '1月', value: 120, color: '#1890ff' },
  { label: '2月', value: 145, color: '#1890ff' },
  { label: '3月', value: 132, color: '#1890ff' },
  { label: '4月', value: 168, color: '#1890ff' },
  { label: '5月', value: 156, color: '#1890ff' },
  { label: '6月', value: 189, color: '#1890ff' }
])

const pieChartData = ref([
  { name: '投诉', percentage: 45, color: '#ff4d4f', path: 'M150,40 A110,110 0 0,1 234,140 L150,150 Z' },
  { name: '建议', percentage: 30, color: '#1890ff', path: 'M234,140 A110,110 0 0,1 206,230 L150,150 Z' },
  { name: '咨询', percentage: 25, color: '#52c41a', path: 'M206,230 A110,110 0 0,1 150,40 L150,150 Z' }
])

const departmentRank = ref([
  { name: '门诊部', count: 256, percentage: 100 },
  { name: '急诊部', count: 198, percentage: 77 },
  { name: '内科', count: 165, percentage: 64 },
  { name: '外科', count: 142, percentage: 55 },
  { name: '儿科', count: 98, percentage: 38 }
])

const tableData = ref([
  {
    id: 1,
    caseNo: 'TS2024010089',
    type: 'complaint',
    typeName: '投诉',
    title: '关于门诊医生服务态度问题',
    complainant: '王先生',
    department: '门诊部',
    status: 'processing',
    statusName: '处理中',
    createTime: '2024-01-15 09:32',
    handler: '张小明'
  },
  {
    id: 2,
    caseNo: 'TS2024010088',
    type: 'suggestion',
    typeName: '建议',
    title: '建议增加夜间门诊服务',
    complainant: '李女士',
    department: '医务科',
    status: 'completed',
    statusName: '已完成',
    createTime: '2024-01-15 08:45',
    handler: '李主管'
  },
  {
    id: 3,
    caseNo: 'TS2024010087',
    type: 'consult',
    typeName: '咨询',
    title: '关于体检报告的问题咨询',
    complainant: '赵先生',
    department: '体检中心',
    status: 'pending',
    statusName: '待处理',
    createTime: '2024-01-14 17:22',
    handler: '-'
  }
])

const totalRecords = ref(2856)

const resetFilters = () => {
  filters.value = {
    startDate: '',
    endDate: '',
    caseType: '',
    department: '',
    status: ''
  }
}

const applyFilters = () => {
  alert('查询条件已应用！')
}

const getRankClass = (index) => {
  if (index === 0) return 'gold'
  if (index === 1) return 'silver'
  if (index === 2) return 'bronze'
  return ''
}
</script>

<style scoped>
.report-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
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

/* 筛选卡片 */
.filter-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  align-items: end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: #666;
}

.filter-input {
  height: 40px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.filter-input:focus {
  border-color: #1890ff;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.btn {
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
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

/* 概览卡片 */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.overview-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.card-icon.blue {
  background: linear-gradient(135deg, #1890ff, #69c0ff);
}

.card-icon.green {
  background: linear-gradient(135deg, #52c41a, #95de64);
}

.card-icon.orange {
  background: linear-gradient(135deg, #faad14, #ffc53d);
}

.card-icon.purple {
  background: linear-gradient(135deg, #722ed1, #b37feb);
}

.card-content {
  flex: 1;
}

.card-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.card-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.card-trend {
  display: flex;
  gap: 6px;
  font-size: 12px;
}

.trend-up {
  color: #52c41a;
}

.trend-down {
  color: #ff4d4f;
}

.trend-text {
  color: #999;
}

/* 图表网格 */
.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.chart-card.large {
  grid-column: span 1;
}

.chart-card.medium {
  grid-column: span 1;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.chart-tabs {
  display: flex;
  gap: 8px;
}

.tab-btn {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.tab-btn.active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.chart-body {
  padding: 20px;
}

/* 图表样式 */
.bar-chart-container {
  width: 100%;
}

.bar-chart-svg {
  width: 100%;
  height: auto;
}

.y-label, .x-label {
  font-size: 12px;
  fill: #999;
}

.value-label {
  font-size: 12px;
  fill: #333;
  font-weight: 500;
}

.pie-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.pie-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-label {
  color: #666;
}

.legend-value {
  color: #333;
  font-weight: 500;
}

/* 排行列表 */
.rank-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank-number {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: #f0f0f0;
  color: #999;
}

.rank-number.gold {
  background: linear-gradient(135deg, #ffc53d, #faad14);
  color: #fff;
}

.rank-number.silver {
  background: linear-gradient(135deg, #d9d9d9, #8c8c8c);
  color: #fff;
}

.rank-number.bronze {
  background: linear-gradient(135deg, #ffc069, #fa8c16);
  color: #fff;
}

.rank-info {
  flex: 1;
}

.rank-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}

.rank-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.rank-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1890ff, #69c0ff);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.rank-value {
  width: 50px;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 数据表格 */
.table-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 12px;
}

.table-body {
  padding: 0 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  padding: 16px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.data-table td {
  padding: 16px 12px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.case-no {
  color: #1890ff;
  font-weight: 500;
}

.ellipsis {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.type-badge, .status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.type-badge.complaint {
  background: #fff1f0;
  color: #ff4d4f;
}

.type-badge.suggestion {
  background: #fff7e6;
  color: #faad14;
}

.type-badge.consult {
  background: #e6f7ff;
  color: #1890ff;
}

.status-badge.pending {
  background: #fff7e6;
  color: #faad14;
}

.status-badge.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.status-badge.completed {
  background: #f6ffed;
  color: #52c41a;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
}

.pagination-info {
  font-size: 13px;
  color: #666;
}

.pagination {
  display: flex;
  gap: 8px;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.page-btn.active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 响应式 */
@media (max-width: 1440px) {
  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .chart-card.large {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .overview-cards {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card.large {
    grid-column: span 1;
  }
}
</style>
