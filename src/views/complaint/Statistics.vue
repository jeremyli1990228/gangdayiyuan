<template>
  <div class="page-container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span class="breadcrumb-item">
        <svg class="breadcrumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">投诉管理</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">数据统计</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">数据统计</h1>
    </div>

    <!-- 时间筛选 -->
    <div class="time-filter">
      <div class="quick-btns">
        <button :class="['quick-btn', activeTime === 'today' ? 'active' : '']" @click="activeTime = 'today'">今日</button>
        <button :class="['quick-btn', activeTime === 'week' ? 'active' : '']" @click="activeTime = 'week'">本周</button>
        <button :class="['quick-btn', activeTime === 'month' ? 'active' : '']" @click="activeTime = 'month'">本月</button>
        <button :class="['quick-btn', activeTime === 'quarter' ? 'active' : '']" @click="activeTime = 'quarter'">本季度</button>
      </div>
      <div class="date-range">
        <input type="date" class="form-input" style="width: 140px;">
        <span style="margin: 0 8px; color: #999;">至</span>
        <input type="date" class="form-input" style="width: 140px;">
        <button class="btn btn-primary">查询</button>
      </div>
    </div>

    <!-- 统计概览卡片 -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-icon" style="background: #e6f7ff;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1890ff">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">256</div>
          <div class="stat-label">总提交次数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fff1f0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4f">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 6V12L16 14" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">48</div>
          <div class="stat-label">待处理次数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #f6ffed;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#52c41a">
            <path d="M22 11.08V12C21.9988 14.1564 21.1505 16.2124 19.595 17.595C18.0395 18.9776 15.9429 19.7379 13.7884 19.6923C11.6339 19.6467 9.57094 18.7989 8.07889 17.3232C6.58684 15.8475 5.77817 13.7934 5.82455 11.6388C5.87094 9.48433 6.76835 7.45894 8.27159 6.04805C9.77483 4.63716 11.7686 3.84655 13.9236 3.82682C16.0786 3.80708 18.0872 4.55967 19.6167 5.94098C21.1462 7.32229 22.0762 9.22461 22.2191 11.2758" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">198</div>
          <div class="stat-label">已处理次数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #fff7e6;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fa8c16">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-value">156</div>
          <div class="stat-label">评价次数</div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">反馈类型分布</h3>
        </div>
        <div class="chart-body">
          <div class="pie-chart">
            <svg viewBox="0 0 200 200" class="pie-svg">
              <!-- 饼图扇形 -->
              <circle cx="100" cy="100" r="80" fill="none" stroke="#1890ff" stroke-width="40" stroke-dasharray="125.6 376.8" stroke-dashoffset="0"/>
              <circle cx="100" cy="100" r="80" fill="none" stroke="#52c41a" stroke-width="40" stroke-dasharray="100.48 401.92" stroke-dashoffset="-125.6"/>
              <circle cx="100" cy="100" r="80" fill="none" stroke="#fa8c16" stroke-width="40" stroke-dasharray="75.36 427.04" stroke-dashoffset="-226.08"/>
              <circle cx="100" cy="100" r="80" fill="none" stroke="#ff4d4f" stroke-width="40" stroke-dasharray="50.24 452.16" stroke-dashoffset="-301.44"/>
              <circle cx="100" cy="100" r="80" fill="none" stroke="#722ed1" stroke-width="40" stroke-dasharray="50.24 452.16" stroke-dashoffset="-351.68"/>
            </svg>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color" style="background: #1890ff;"></span>
              <span class="legend-text">服务态度</span>
              <span class="legend-value">25%</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #52c41a;"></span>
              <span class="legend-text">医疗质量</span>
              <span class="legend-value">20%</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #fa8c16;"></span>
              <span class="legend-text">就医流程</span>
              <span class="legend-value">15%</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #ff4d4f;"></span>
              <span class="legend-text">环境卫生</span>
              <span class="legend-value">10%</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #722ed1;"></span>
              <span class="legend-text">其他</span>
              <span class="legend-value">30%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">提交趋势</h3>
        </div>
        <div class="chart-body">
          <div class="line-chart">
            <svg viewBox="0 0 400 200" class="line-svg">
              <!-- 网格线 -->
              <line x1="50" y1="20" x2="380" y2="20" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="50" y1="60" x2="380" y2="60" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="50" y1="100" x2="380" y2="100" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="50" y1="140" x2="380" y2="140" stroke="#f0f0f0" stroke-width="1"/>
              <line x1="50" y1="180" x2="380" y2="180" stroke="#f0f0f0" stroke-width="1"/>
              <!-- 折线 -->
              <polyline points="50,140 100,120 150,100 200,80 250,90 300,60 350,40" fill="none" stroke="#1890ff" stroke-width="2"/>
              <polyline points="50,160 100,150 150,130 200,120 250,130 300,100 350,90" fill="none" stroke="#52c41a" stroke-width="2"/>
              <!-- 数据点 -->
              <circle cx="50" cy="140" r="4" fill="#1890ff"/>
              <circle cx="100" cy="120" r="4" fill="#1890ff"/>
              <circle cx="150" cy="100" r="4" fill="#1890ff"/>
              <circle cx="200" cy="80" r="4" fill="#1890ff"/>
              <circle cx="250" cy="90" r="4" fill="#1890ff"/>
              <circle cx="300" cy="60" r="4" fill="#1890ff"/>
              <circle cx="350" cy="40" r="4" fill="#1890ff"/>
            </svg>
            <div class="x-axis-labels">
              <span>周一</span>
              <span>周二</span>
              <span>周三</span>
              <span>周四</span>
              <span>周五</span>
              <span>周六</span>
              <span>周日</span>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color" style="background: #1890ff;"></span>
              <span class="legend-text">投诉</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #52c41a;"></span>
              <span class="legend-text">建议</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 处理效率图表 -->
    <div class="chart-card" style="margin-bottom: 20px;">
      <div class="chart-header">
        <h3 class="chart-title">处理效率统计</h3>
      </div>
      <div class="chart-body">
        <div class="bar-chart">
          <svg viewBox="0 0 600 200" class="bar-svg">
            <!-- 柱状图 -->
            <rect x="30" y="60" width="40" height="120" fill="#1890ff" rx="4"/>
            <rect x="100" y="80" width="40" height="100" fill="#1890ff" rx="4"/>
            <rect x="170" y="40" width="40" height="140" fill="#1890ff" rx="4"/>
            <rect x="240" y="100" width="40" height="80" fill="#1890ff" rx="4"/>
            <rect x="310" y="70" width="40" height="110" fill="#1890ff" rx="4"/>
            <rect x="380" y="50" width="40" height="130" fill="#1890ff" rx="4"/>
            <rect x="450" y="90" width="40" height="90" fill="#1890ff" rx="4"/>
            <rect x="520" y="30" width="40" height="150" fill="#1890ff" rx="4"/>
          </svg>
          <div class="x-axis-labels" style="justify-content: space-around; padding: 0 30px;">
            <span>服务态度</span>
            <span>医疗质量</span>
            <span>就医流程</span>
            <span>环境卫生</span>
            <span>收费问题</span>
            <span>医德医风</span>
            <span>其他</span>
            <span>总计</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细数据表格 -->
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 150px;">反馈类型</div>
        <div class="table-cell" style="width: 120px;">提交次数</div>
        <div class="table-cell" style="width: 120px;">待处理次数</div>
        <div class="table-cell" style="width: 120px;">已处理次数</div>
        <div class="table-cell" style="width: 120px;">评价次数</div>
        <div class="table-cell" style="width: 150px;">平均处理时长</div>
        <div class="table-cell" style="width: 120px;">满意度评分</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in statisticsData" :key="index">
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.type }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.submitCount }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.pendingCount }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.resolvedCount }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.ratedCount }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.avgTime }}</div>
          <div class="table-cell" style="width: 120px;">
            <span class="rating-value">{{ item.satisfaction }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTime = ref('month')

const statisticsData = ref([
  { type: '服务态度', submitCount: 64, pendingCount: 12, resolvedCount: 48, ratedCount: 38, avgTime: '2.5小时', satisfaction: 4.2 },
  { type: '医疗质量', submitCount: 51, pendingCount: 8, resolvedCount: 40, ratedCount: 32, avgTime: '3.2小时', satisfaction: 4.5 },
  { type: '就医流程', submitCount: 38, pendingCount: 10, resolvedCount: 26, ratedCount: 20, avgTime: '1.8小时', satisfaction: 4.0 },
  { type: '环境卫生', submitCount: 26, pendingCount: 5, resolvedCount: 20, ratedCount: 16, avgTime: '1.5小时', satisfaction: 4.3 },
  { type: '收费问题', submitCount: 32, pendingCount: 6, resolvedCount: 24, ratedCount: 20, avgTime: '2.0小时', satisfaction: 4.1 },
  { type: '医德医风', submitCount: 18, pendingCount: 4, resolvedCount: 12, ratedCount: 10, avgTime: '4.0小时', satisfaction: 4.6 },
  { type: '其他', submitCount: 27, pendingCount: 3, resolvedCount: 22, ratedCount: 18, avgTime: '2.8小时', satisfaction: 3.9 }
])
</script>

<style scoped>
.page-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

.breadcrumb-icon {
  width: 16px;
  height: 16px;
  color: #666;
}

.breadcrumb-item {
  color: #666;
}

.breadcrumb-item.active {
  color: #1890ff;
}

.breadcrumb-separator {
  color: #999;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.time-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.quick-btns {
  display: flex;
  gap: 8px;
}

.quick-btn {
  padding: 6px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.quick-btn.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 16px;
  margin-bottom: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.chart-body {
  padding: 20px;
  display: flex;
  gap: 20px;
}

.pie-chart {
  flex: 1;
}

.pie-svg {
  width: 100%;
  height: auto;
}

.line-chart,
.bar-chart {
  flex: 1;
}

.line-svg,
.bar-svg {
  width: 100%;
  height: auto;
}

.x-axis-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 120px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-text {
  color: #666;
  flex: 1;
}

.legend-value {
  color: #333;
  font-weight: 500;
}

.table-container {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
}

.table-body {
  max-height: 400px;
  overflow-y: auto;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s;
}

.table-row:hover {
  background: #f5f7fa;
}

.table-cell {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.table-header .table-cell {
  font-weight: 600;
  color: #666;
}

.rating-value {
  color: #fa8c16;
  font-weight: 500;
}
</style>
