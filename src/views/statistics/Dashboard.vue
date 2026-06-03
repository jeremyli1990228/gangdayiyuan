<template>
  <div class="dashboard-container">
    <!-- 顶部概览卡片 -->
    <div class="overview-grid">
      <div class="overview-card today-cases">
        <div class="card-icon">📋</div>
        <div class="card-content">
          <div class="card-title">今日新增</div>
          <div class="card-value">{{ todayCases }}</div>
          <div class="card-trend">
            <span class="trend-up">↑ 12.5%</span>
            <span class="trend-label">较昨日</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card pending-cases">
        <div class="card-icon">⏰</div>
        <div class="card-content">
          <div class="card-title">待处理</div>
          <div class="card-value">{{ pendingCases }}</div>
          <div class="card-trend">
            <span class="trend-down">↓ 5.2%</span>
            <span class="trend-label">较昨日</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card processing-cases">
        <div class="card-icon">🔄</div>
        <div class="card-content">
          <div class="card-title">处理中</div>
          <div class="card-value">{{ processingCases }}</div>
          <div class="card-trend">
            <span class="trend-up">↑ 8.3%</span>
            <span class="trend-label">较昨日</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card completed-cases">
        <div class="card-icon">✅</div>
        <div class="card-content">
          <div class="card-title">今日完成</div>
          <div class="card-value">{{ completedCases }}</div>
          <div class="card-trend">
            <span class="trend-up">↑ 15.8%</span>
            <span class="trend-label">较昨日</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card satisfaction">
        <div class="card-icon">😊</div>
        <div class="card-content">
          <div class="card-title">满意度</div>
          <div class="card-value">{{ satisfactionRate }}%</div>
          <div class="card-trend">
            <span class="trend-up">↑ 2.1%</span>
            <span class="trend-label">较上周</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card response-time">
        <div class="card-icon">⚡</div>
        <div class="card-content">
          <div class="card-title">平均响应</div>
          <div class="card-value">{{ avgResponseTime }}小时</div>
          <div class="card-trend">
            <span class="trend-down">↓ 1.2小时</span>
            <span class="trend-label">较上月</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 图表区域 -->
    <div class="charts-grid">
      <!-- 案件趋势图表 -->
      <div class="chart-card large">
        <div class="chart-header">
          <h3 class="chart-title">案件变化趋势</h3>
          <div class="chart-filters">
            <select class="filter-select" v-model="trendPeriod">
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="quarter">本季度</option>
            </select>
          </div>
        </div>
        <div class="chart-content">
          <div class="line-chart" ref="trendChartRef">
            <svg width="100%" height="280" viewBox="0 0 800 280">
              <!-- 网格线 -->
              <g class="grid-lines">
                <line x1="60" y1="40" x2="760" y2="40" stroke="#f0f0f0" stroke-width="1"/>
                <line x1="60" y1="100" x2="760" y2="100" stroke="#f0f0f0" stroke-width="1"/>
                <line x1="60" y1="160" x2="760" y2="160" stroke="#f0f0f0" stroke-width="1"/>
                <line x1="60" y1="220" x2="760" y2="220" stroke="#f0f0f0" stroke-width="1"/>
              </g>
              
              <!-- 坐标轴 -->
              <line x1="60" y1="220" x2="760" y2="220" stroke="#e0e0e0" stroke-width="2"/>
              <line x1="60" y1="40" x2="60" y2="220" stroke="#e0e0e0" stroke-width="2"/>
              
              <!-- Y轴标签 -->
              <text x="50" y="44" class="y-label">120</text>
              <text x="50" y="104" class="y-label">80</text>
              <text x="50" y="164" class="y-label">40</text>
              <text x="50" y="224" class="y-label">0</text>
              
              <!-- X轴标签 -->
              <text v-for="(label, i) in weekLabels" 
                    :key="i" 
                    :x="100 + i * 95" 
                    y="245" 
                    class="x-label">
                {{ label }}
              </text>
              
              <!-- 趋势线 -->
              <path :d="trendLinePath" fill="none" stroke="#1890ff" stroke-width="3" stroke-linecap="round"/>
              
              <!-- 填充区域 -->
              <path :d="trendFillPath" fill="url(#trendGradient)" opacity="0.3"/>
              
              <!-- 数据点 -->
              <circle v-for="(point, i) in trendPoints" 
                      :key="i" 
                      :cx="point.x" 
                      :cy="point.y" 
                      r="6" 
                      fill="#1890ff"
                      stroke="#fff"
                      stroke-width="2"/>
              
              <!-- 渐变定义 -->
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#1890ff;stop-opacity:0.5"/>
                  <stop offset="100%" style="stop-color:#1890ff;stop-opacity:0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 案件类型分布 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3 class="chart-title">案件类型分布</h3>
        </div>
        <div class="chart-content">
          <div class="pie-chart-container">
            <svg viewBox="0 0 300 300" class="pie-chart">
              <circle cx="150" cy="150" r="120" fill="none" stroke="#f0f0f0" stroke-width="2"/>
              
              <!-- 各类型饼图 -->
              <path v-for="(slice, i) in pieSlices" 
                    :key="i" 
                    :d="slice.path" 
                    :fill="slice.color"
                    :class="'pie-slice'"/>
              
              <!-- 中心圆圈 -->
              <circle cx="150" cy="150" r="70" fill="#fff"/>
            </svg>
            
            <!-- 图例 -->
            <div class="pie-legend">
              <div v-for="(item, i) in typeDistribution" 
                   :key="i" 
                   class="legend-item">
                <span class="legend-color" :style="{background: item.color}"></span>
                <span class="legend-label">{{ item.name }}</span>
                <span class="legend-value">{{ item.value }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 科室处理情况 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3 class="chart-title">科室处理情况</h3>
        </div>
        <div class="chart-content">
          <div class="bar-chart">
            <div v-for="(dept, i) in departmentData" 
                 :key="i" 
                 class="bar-item">
              <div class="bar-label">{{ dept.name }}</div>
              <div class="bar-wrapper">
                <div class="bar-fill" :style="{width: dept.percentage + '%'}">
                  <span class="bar-value">{{ dept.count }}</span>
                </div>
              </div>
              <div class="bar-percentage">{{ dept.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 实时监控区域 -->
    <div class="monitor-section">
      <div class="monitor-header">
        <h3 class="monitor-title">实时监控</h3>
        <div class="monitor-status">
          <span class="status-dot"></span>
          <span class="status-text">实时更新中</span>
        </div>
      </div>
      
      <div class="monitor-grid">
        <!-- 最近案件 -->
        <div class="monitor-card">
          <div class="monitor-card-header">
            <h4>最近案件</h4>
          </div>
          <div class="monitor-list">
            <div v-for="(caseItem, i) in recentCases" 
                 :key="i" 
                 class="monitor-item">
              <div class="monitor-item-left">
                <span class="case-type-badge" :class="caseItem.type">{{ caseItem.typeName }}</span>
                <span class="case-title">{{ caseItem.title }}</span>
              </div>
              <div class="monitor-item-right">
                <span class="case-time">{{ caseItem.time }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 预警提醒 -->
        <div class="monitor-card">
          <div class="monitor-card-header">
            <h4>预警提醒</h4>
            <span class="badge warning">{{ warnings.length }}</span>
          </div>
          <div class="monitor-list">
            <div v-for="(warning, i) in warnings" 
                 :key="i" 
                 class="monitor-item warning">
              <div class="monitor-item-left">
                <span class="warning-icon">⚠️</span>
                <div class="warning-content">
                  <div class="warning-title">{{ warning.title }}</div>
                  <div class="warning-desc">{{ warning.desc }}</div>
                </div>
              </div>
              <div class="monitor-item-right">
                <button class="handle-btn">处理</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 系统状态 -->
        <div class="monitor-card">
          <div class="monitor-card-header">
            <h4>系统状态</h4>
          </div>
          <div class="system-status-list">
            <div class="status-item">
              <span class="status-indicator online"></span>
              <span class="status-label">API服务</span>
              <span class="status-detail">正常</span>
            </div>
            <div class="status-item">
              <span class="status-indicator online"></span>
              <span class="status-label">数据库</span>
              <span class="status-detail">正常</span>
            </div>
            <div class="status-item">
              <span class="status-indicator online"></span>
              <span class="status-label">消息推送</span>
              <span class="status-detail">正常</span>
            </div>
            <div class="status-item">
              <span class="status-indicator warning"></span>
              <span class="status-label">存储容量</span>
              <span class="status-detail">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const todayCases = ref(28)
const pendingCases = ref(45)
const processingCases = ref(32)
const completedCases = ref(18)
const satisfactionRate = ref(94.5)
const avgResponseTime = ref(2.8)
const trendPeriod = ref('week')

// 周标签
const weekLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

// 趋势数据
const trendData = [65, 78, 85, 72, 98, 55, 72]

// 计算趋势线
const trendChartRef = ref(null)
const maxValue = Math.max(...trendData)

const trendPoints = computed(() => {
  return trendData.map((value, i) => ({
    x: 100 + i * 95,
    y: 220 - (value / maxValue) * 180
  }))
})

const trendLinePath = computed(() => {
  if (trendPoints.value.length === 0) return ''
  
  let path = `M ${trendPoints.value[0].x} ${trendPoints.value[0].y}`
  
  for (let i = 1; i < trendPoints.value.length; i++) {
    const prev = trendPoints.value[i - 1]
    const curr = trendPoints.value[i]
    const cpx1 = prev.x + 35
    const cpx2 = curr.x - 35
    path += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`
  }
  
  return path
})

const trendFillPath = computed(() => {
  if (trendPoints.value.length === 0) return ''
  
  let path = `M ${trendPoints.value[0].x} 220 L ${trendPoints.value[0].x} ${trendPoints.value[0].y}`
  
  for (let i = 1; i < trendPoints.value.length; i++) {
    const prev = trendPoints.value[i - 1]
    const curr = trendPoints.value[i]
    const cpx1 = prev.x + 35
    const cpx2 = curr.x - 35
    path += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`
  }
  
  path += ` L ${trendPoints.value[trendPoints.value.length - 1].x} 220 Z`
  return path
})

// 案件类型分布
const typeDistribution = [
  { name: '服务态度', value: 35, color: '#1890ff' },
  { name: '医疗质量', value: 25, color: '#52c41a' },
  { name: '就医流程', value: 20, color: '#faad14' },
  { name: '环境卫生', value: 12, color: '#f5222d' },
  { name: '其他', value: 8, color: '#722ed1' }
]

// 计算饼图切片
const pieSlices = computed(() => {
  const total = typeDistribution.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = -90
  
  return typeDistribution.map((item) => {
    const startAngle = currentAngle
    const sliceAngle = (item.value / total) * 360
    currentAngle += sliceAngle
    
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (currentAngle * Math.PI) / 180
    
    const x1 = 150 + Math.cos(startRad) * 120
    const y1 = 150 + Math.sin(startRad) * 120
    const x2 = 150 + Math.cos(endRad) * 120
    const y2 = 150 + Math.sin(endRad) * 120
    
    const largeArcFlag = sliceAngle > 180 ? 1 : 0
    
    return {
      path: `M 150 150 L ${x1} ${y1} A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      color: item.color
    }
  })
})

// 科室数据
const departmentData = [
  { name: '门诊部', count: 85, percentage: 85 },
  { name: '急诊部', count: 72, percentage: 72 },
  { name: '内科', count: 68, percentage: 68 },
  { name: '外科', count: 55, percentage: 55 },
  { name: '儿科', count: 48, percentage: 48 },
  { name: '妇科', count: 42, percentage: 42 }
]

// 最近案件
const recentCases = [
  { id: 1, title: '关于门诊等待时间过长的投诉', type: 'complaint', typeName: '投诉', time: '10分钟前' },
  { id: 2, title: '建议增设夜间门诊', type: 'suggestion', typeName: '建议', time: '25分钟前' },
  { id: 3, title: '医生服务态度问题', type: 'complaint', typeName: '投诉', time: '38分钟前' },
  { id: 4, title: '关于医保政策的咨询', type: 'consult', typeName: '咨询', time: '1小时前' },
  { id: 5, title: '医院环境改进建议', type: 'suggestion', typeName: '建议', time: '1.5小时前' }
]

// 预警提醒
const warnings = [
  { id: 1, title: '门诊部有案件即将超时', desc: '案件 TS20240089 还剩2小时处理时间' },
  { id: 2, title: '患者满意度下降', desc: '近3天满意度连续下降' },
  { id: 3, title: '急诊部待处理案件过多', desc: '当前待处理15件，超出警戒值' }
]

onMounted(() => {
  // 模拟实时数据更新
  setInterval(() => {
    todayCases.value += Math.round(Math.random() * 2 - 1)
    if (todayCases.value < 20) todayCases.value = 20
    if (todayCases.value > 40) todayCases.value = 40
  }, 5000)
})
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

/* 概览卡片 */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.overview-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 40px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f9ff, #e6f7ff);
  border-radius: 12px;
}

.today-cases .card-icon { background: linear-gradient(135deg, #fff7e6, #ffe7ba); }
.pending-cases .card-icon { background: linear-gradient(135deg, #fff1f0, #ffa39e); }
.processing-cases .card-icon { background: linear-gradient(135deg, #e6f7ff, #91d5ff); }
.completed-cases .card-icon { background: linear-gradient(135deg, #f6ffed, #b7eb8f); }
.satisfaction .card-icon { background: linear-gradient(135deg, #fff7e6, #ffd666); }
.response-time .card-icon { background: linear-gradient(135deg, #f9f0ff, #d3adf7); }

.card-content {
  flex: 1;
}

.card-title {
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
  gap: 8px;
  font-size: 12px;
}

.trend-up {
  color: #52c41a;
}

.trend-down {
  color: #f5222d;
}

.trend-label {
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

.filter-select {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.filter-select:focus {
  border-color: #1890ff;
}

.chart-content {
  padding: 20px;
}

/* 图表样式 */
.line-chart {
  width: 100%;
}

.y-label, .x-label {
  font-size: 12px;
  fill: #999;
  text-anchor: middle;
}

/* 饼图 */
.pie-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
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

.legend-color {
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

/* 柱状图 */
.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-label {
  width: 60px;
  font-size: 13px;
  color: #666;
  text-align: right;
  flex-shrink: 0;
}

.bar-wrapper {
  flex: 1;
  height: 24px;
  background: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1890ff, #40a9ff);
  border-radius: 12px;
  transition: width 0.8s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
}

.bar-value {
  font-size: 12px;
  color: #fff;
  font-weight: 500;
}

.bar-percentage {
  width: 50px;
  text-align: right;
  font-size: 13px;
  color: #333;
  font-weight: 500;
  flex-shrink: 0;
}

/* 监控区域 */
.monitor-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.monitor-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.monitor-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #52c41a;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #52c41a;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.monitor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.monitor-card {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.monitor-card-header {
  padding: 14px 16px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.monitor-card-header h4 {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.badge {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.badge.warning {
  background: #fff1f0;
  color: #f5222d;
}

.monitor-list {
  padding: 12px;
}

.monitor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.monitor-item:hover {
  background: #fafafa;
}

.monitor-item:last-child {
  margin-bottom: 0;
}

.monitor-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.case-type-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.case-type-badge.complaint {
  background: #fff1f0;
  color: #f5222d;
}

.case-type-badge.suggestion {
  background: #fff7e6;
  color: #fa8c16;
}

.case-type-badge.consult {
  background: #e6f7ff;
  color: #1890ff;
}

.case-title {
  font-size: 14px;
  color: #333;
}

.case-time {
  font-size: 12px;
  color: #999;
}

/* 预警项 */
.monitor-item.warning {
  background: #fff1f0;
  border-left: 3px solid #f5222d;
}

.warning-icon {
  font-size: 18px;
}

.warning-content {
  flex: 1;
}

.warning-title {
  font-size: 14px;
  font-weight: 500;
  color: #f5222d;
  margin-bottom: 4px;
}

.warning-desc {
  font-size: 12px;
  color: #666;
}

.handle-btn {
  padding: 6px 12px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.handle-btn:hover {
  background: #40a9ff;
}

/* 系统状态 */
.system-status-list {
  padding: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-indicator.online {
  background: #52c41a;
}

.status-indicator.warning {
  background: #faad14;
}

.status-indicator.offline {
  background: #f5222d;
}

.status-label {
  flex: 1;
  font-size: 14px;
  color: #666;
}

.status-detail {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 1440px) {
  .overview-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .chart-card.large {
    grid-column: span 2;
  }
  
  .monitor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card.large {
    grid-column: span 1;
  }
  
  .monitor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
