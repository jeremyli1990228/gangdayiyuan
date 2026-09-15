<template>
  <div class="page-container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">民生诉求</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">数据统计</span>
    </div>

    <!-- 页面标题 & 导出 -->
    <div class="page-header">
      <h1 class="page-title">数据统计</h1>
      <div class="header-actions">
        <button class="btn btn-outline" @click="exportReport">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          导出报告
        </button>
      </div>
    </div>

    <!-- 筛选区 -->
    <div class="filter-bar">
      <div class="quick-btns">
        <button :class="['quick-btn', activeTime === 'today' ? 'active' : '']" @click="activeTime = 'today'">今日</button>
        <button :class="['quick-btn', activeTime === 'week' ? 'active' : '']" @click="activeTime = 'week'">本周</button>
        <button :class="['quick-btn', activeTime === 'month' ? 'active' : '']" @click="activeTime = 'month'">本月</button>
        <button :class="['quick-btn', activeTime === 'quarter' ? 'active' : '']" @click="activeTime = 'quarter'">本季度</button>
        <button :class="['quick-btn', activeTime === 'year' ? 'active' : '']" @click="activeTime = 'year'">本年</button>
        <button :class="['quick-btn', activeTime === 'all' ? 'active' : '']" @click="activeTime = 'all'">全部</button>
      </div>
      <div class="date-range">
        <input type="date" class="form-input" v-model="startDate"/>
        <span class="date-sep">至</span>
        <input type="date" class="form-input" v-model="endDate"/>
        <select class="form-select" v-model="deptFilter">
          <option value="">全部科室</option>
          <option value="门诊">门诊</option>
          <option value="急诊">急诊</option>
          <option value="内科">内科</option>
          <option value="外科">外科</option>
          <option value="儿科">儿科</option>
          <option value="妇产科">妇产科</option>
          <option value="骨科">骨科</option>
          <option value="眼科">眼科</option>
          <option value="口腔科">口腔科</option>
          <option value="中医科">中医科</option>
        </select>
        <button class="btn btn-primary" @click="refreshData">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
      </div>
    </div>

    <!-- KPI 核心指标 -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">工单总量</div>
        <div class="kpi-value text-primary">{{ kpiData.totalOrders }}</div>
        <div class="kpi-compare">
          <span class="compare-item up">
            <span class="compare-label">同比</span>
            <span class="compare-value">+8.2%</span>
          </span>
          <span class="compare-item up">
            <span class="compare-label">环比</span>
            <span class="compare-value">+12.3%</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">已完结</div>
        <div class="kpi-value text-success">{{ kpiData.resolved }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">完结率</span>
            <span class="compare-value text-success">{{ kpiData.resolveRate }}%</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">处理中</div>
        <div class="kpi-value text-warn">{{ kpiData.pending }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">平均时长</span>
            <span class="compare-value">{{ kpiData.avgTime }}</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">首件数量</div>
        <div class="kpi-value text-blue">{{ kpiData.firstOrders }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">占比</span>
            <span class="compare-value">{{ kpiData.firstRate }}%</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">重复件数量</div>
        <div class="kpi-value text-orange">{{ kpiData.repeatOrders }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">占比</span>
            <span class="compare-value">{{ kpiData.repeatRate }}%</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">加急工单</div>
        <div class="kpi-value text-red">{{ kpiData.urgentOrders }}</div>
        <div class="kpi-compare">
          <span class="compare-item up">
            <span class="compare-label">同比</span>
            <span class="compare-value">+5.2%</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 第一行：工单趋势 + 工单分类 + 紧急程度 -->
    <div class="charts-row">
      <!-- 折线图：工单趋势 -->
      <div class="chart-card chart-main">
        <div class="chart-header">
          <span class="chart-title">工单趋势</span>
          <span class="chart-sub">近12个月工单量走势</span>
        </div>
        <div class="chart-body">
          <svg class="line-svg" viewBox="0 0 540 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1890ff" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#1890ff" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <line v-for="i in 4" :key="'tg'+i" x1="40" x2="525" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [200,150,100,50,0]" :key="'tyl'+i" x="35" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="trendAreaPath" fill="url(#trendGrad)"/>
            <path :d="trendLinePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in trendPoints" :key="'tp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <g v-for="(m,i) in monthLabels" :key="'tml'+i">
              <text :x="m.x" y="195" text-anchor="middle" class="axis-label">{{ m.label }}</text>
            </g>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-line blue"></span>工单量</span>
            <span class="leg-item right"><span class="leg-peak">↑ 峰值月</span> <b>{{ peakMonth }}</b></span>
          </div>
        </div>
      </div>

      <!-- 饼图：工单分类（首件/重复件） -->
      <div class="chart-card chart-side">
        <div class="chart-header">
          <span class="chart-title">工单分类</span>
          <span class="chart-sub">首件 / 重复件</span>
        </div>
        <div class="chart-body pie-body">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="48" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
              <text y="-4" text-anchor="middle" class="pie-total-num">{{ kpiData.totalOrders }}</text>
              <text y="12" text-anchor="middle" class="pie-total-label">总工单</text>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in orderClassPieSlices" :key="'ocs'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(d,i) in orderClassDistribution" :key="'ocl'+i">
              <span class="leg-dot" :style="{background: orderClassColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
              <span class="leg-pct">{{ d.percent }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 饼图：紧急程度 -->
      <div class="chart-card chart-side">
        <div class="chart-header">
          <span class="chart-title">紧急程度</span>
          <span class="chart-sub">工单紧迫度分布</span>
        </div>
        <div class="chart-body pie-body">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="48" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
              <text y="-4" text-anchor="middle" class="pie-total-num">{{ kpiData.totalOrders }}</text>
              <text y="12" text-anchor="middle" class="pie-total-label">总工单</text>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in urgencyPieSlices" :key="'us'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(d,i) in urgencyDistribution" :key="'ul'+i">
              <span class="leg-dot" :style="{background: urgencyColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
              <span class="leg-pct">{{ d.percent }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二行：诉求目的 + 科室分类 -->
    <div class="charts-row charts-row-2">
      <!-- 饼图：诉求目的 -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title">诉求目的分布</span>
          <span class="chart-sub">投诉/求助/表扬/举报/建议/咨询</span>
        </div>
        <div class="chart-body pie-body">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="42" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
              <text y="-2" text-anchor="middle" class="pie-total-num">{{ kpiData.totalOrders }}</text>
              <text y="12" text-anchor="middle" class="pie-total-label">总工单</text>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in purposePieSlices" :key="'ps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(d,i) in purposeDistribution" :key="'pl'+i">
              <span class="leg-dot" :style="{background: purposeColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
              <span class="leg-pct">{{ d.percent }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 柱状图：科室分类 -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title">科室分类</span>
          <span class="chart-sub">各科室工单量排名</span>
        </div>
        <div class="chart-body">
          <svg class="bar-svg-h" viewBox="0 0 460 240" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'dcgl'+i" x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [400,300,200,100,0]" :key="'dcyl'+i" x="75" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(item,i) in deptBarData" :key="'dbg'+i" :transform="'translate(0,'+(25+i*22)+')'">
              <text x="75" y="6" text-anchor="end" class="axis-label" font-size="11">{{ item.label }}</text>
              <rect x="80" y="0" :width="item.w" height="14" rx="3" :fill="deptColors[i]"/>
              <text :x="80+item.w+6" y="11" class="axis-label" font-size="11" font-weight="600" fill="#1f2937">{{ item.count }}</text>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- 第三行：涉及环节 -->
    <div class="chart-card chart-full">
      <div class="chart-header">
        <span class="chart-title">涉及环节</span>
        <span class="chart-sub">各类环节工单量分布</span>
      </div>
      <div class="chart-body">
        <svg class="bar-svg-h" viewBox="0 0 920 320" preserveAspectRatio="none">
          <line v-for="i in 4" :key="'eggl'+i" x1="120" x2="910" :y1="20+i*60" :y2="20+i*60" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
          <text v-for="(v,i) in [300,225,150,75,0]" :key="'egyl'+i" x="115" :y="25+i*60" text-anchor="end" class="axis-label">{{ v }}</text>
          <g v-for="(item,i) in linkBarData" :key="'elg'+i" :transform="'translate(0,'+(30+i*22)+')'">
            <text x="115" y="6" text-anchor="end" class="axis-label" font-size="11">{{ item.label }}</text>
            <rect x="120" y="0" :width="item.w" height="14" rx="3" :fill="linkColors[i]"/>
            <text :x="120+item.w+6" y="11" class="axis-label" font-size="11" font-weight="600" fill="#1f2937">{{ item.count }}</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- 详细数据明细 -->
    <div class="data-card">
      <div class="card-header">
        <h3 class="card-title">详细数据明细</h3>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>月份</th>
              <th>工单总量</th>
              <th>首件</th>
              <th>重复件</th>
              <th>加急</th>
              <th>已完结</th>
              <th>处理中</th>
              <th>完结率</th>
              <th>主要诉求目的</th>
              <th>主要涉及环节</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,idx) in detailTable" :key="idx">
              <td>{{ idx+1 }}</td>
              <td>{{ row.month }}</td>
              <td class="text-primary">{{ row.total }}</td>
              <td class="text-blue">{{ row.first }}</td>
              <td class="text-orange">{{ row.repeat }}</td>
              <td class="text-red">{{ row.urgent }}</td>
              <td class="text-success">{{ row.resolved }}</td>
              <td class="text-warn">{{ row.pending }}</td>
              <td>{{ row.rate }}%</td>
              <td>{{ row.purpose }}</td>
              <td>{{ row.link }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const goBack = () => { window.history.back() }
const activeTime = ref('month')
const startDate = ref('2026-01-01')
const endDate = ref('2026-06-18')
const deptFilter = ref('')

const refreshData = () => {}

// KPI数据
const kpiData = ref({
  totalOrders: 1846,
  resolved: 1602,
  resolveRate: 86.8,
  pending: 244,
  avgTime: '2.5天',
  firstOrders: 1428,
  firstRate: 77.4,
  repeatOrders: 418,
  repeatRate: 22.6,
  urgentOrders: 186
})

// 配色方案
const orderClassColors = ['#1890ff', '#fa8c16']
const urgencyColors = ['#52c41a', '#1890ff', '#fa8c16', '#ff4d4f']
const purposeColors = ['#ff4d4f', '#fa8c16', '#52c41a', '#722ed1', '#1890ff', '#13c2c2']
const deptColors = ['#1890ff', '#40a9ff', '#69c0ff', '#91d5ff', '#bae7ff', '#ff7a45', '#fa8c16', '#ffc53d', '#a0d911', '#52c41a']
const linkColors = ['#1890ff', '#40a9ff', '#69c0ff', '#91d5ff', '#bae7ff', '#ff7a45', '#fa8c16', '#ffc53d', '#a0d911', '#52c41a', '#722ed1', '#13c2c2', '#eb2f96']

// 月度趋势数据（近12个月）
const trendData = ref([
  { month: '2025-07', value: 118 }, { month: '2025-08', value: 125 },
  { month: '2025-09', value: 132 }, { month: '2025-10', value: 128 },
  { month: '2025-11', value: 138 }, { month: '2025-12', value: 145 },
  { month: '2026-01', value: 142 }, { month: '2026-02', value: 156 },
  { month: '2026-03', value: 168 }, { month: '2026-04', value: 175 },
  { month: '2026-05', value: 182 }, { month: '2026-06', value: 178 }
])

const trendPoints = computed(() => {
  const max = 200, xS = 45, xE = 525, yB = 180, yT = 20
  const scale = (yB - yT) / max
  return trendData.value.map((d,i) => ({
    x: xS + i * (xE - xS) / (trendData.value.length - 1),
    y: yB - d.value * scale
  }))
})

const trendLinePath = computed(() => {
  return trendPoints.value.map((p,i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ')
})

const trendAreaPath = computed(() => {
  const pts = trendPoints.value
  if (!pts.length) return ''
  return `${trendLinePath.value} L ${pts[pts.length-1].x} 180 L ${pts[0].x} 180 Z`
})

const monthLabels = computed(() => {
  const xS = 45, xE = 525
  return trendData.value.map((d,i) => ({
    x: xS + i * (xE - xS) / (trendData.value.length - 1),
    label: d.month.slice(5) + '月'
  }))
})

const peakMonth = computed(() => {
  const max = Math.max(...trendData.value.map(d => d.value))
  return trendData.value.find(d => d.value === max)?.month?.slice(0, 7) || '-'
})

// 工单分类（首件/重复件）
const orderClassDistribution = ref([
  { name: '首件', count: 1428, percent: 77.4 },
  { name: '重复件', count: 418, percent: 22.6 }
])

const orderClassPieSlices = computed(() => {
  const r = 78, total = kpiData.value.totalOrders
  let start = -Math.PI / 2, slices = []
  orderClassDistribution.value.forEach((d,i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({ path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`, color: orderClassColors[i] })
    start = end
  })
  return slices
})

// 紧急程度
const urgencyDistribution = ref([
  { name: '常态', count: 1286, percent: 69.7 },
  { name: '关注', count: 312, percent: 16.9 },
  { name: '加急', count: 186, percent: 10.1 },
  { name: '舆情提醒', count: 62, percent: 3.3 }
])

const urgencyPieSlices = computed(() => {
  const r = 78, total = kpiData.value.totalOrders
  let start = -Math.PI / 2, slices = []
  urgencyDistribution.value.forEach((d,i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({ path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`, color: urgencyColors[i] })
    start = end
  })
  return slices
})

// 诉求目的
const purposeDistribution = ref([
  { name: '投诉', count: 612, percent: 33.2 },
  { name: '求助', count: 386, percent: 20.9 },
  { name: '表扬', count: 286, percent: 15.5 },
  { name: '举报', count: 168, percent: 9.1 },
  { name: '建议', count: 224, percent: 12.1 },
  { name: '咨询', count: 170, percent: 9.2 }
])

const purposePieSlices = computed(() => {
  const r = 72, total = kpiData.value.totalOrders
  let start = -Math.PI / 2, slices = []
  purposeDistribution.value.forEach((d,i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({ path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`, color: purposeColors[i] })
    start = end
  })
  return slices
})

// 科室分类
const deptDistribution = ref([
  { name: '门诊', count: 386, label: '门诊' },
  { name: '急诊', count: 312, label: '急诊' },
  { name: '内科', count: 258, label: '内科' },
  { name: '外科', count: 216, label: '外科' },
  { name: '儿科', count: 168, label: '儿科' },
  { name: '妇产科', count: 132, label: '妇产' },
  { name: '骨科', count: 112, label: '骨科' },
  { name: '眼科', count: 86, label: '眼科' },
  { name: '口腔科', count: 76, label: '口腔' },
  { name: '其他', count: 100, label: '其他' }
])

const deptBarData = computed(() => {
  const max = 400, xS = 80, xE = 450, scale = (xE - xS) / max
  return deptDistribution.value.map(d => ({
    label: d.label,
    w: Math.max(3, d.count * scale),
    count: d.count
  }))
})

// 涉及环节
const linkDistribution = ref([
  { name: '诊断水平', count: 286 },
  { name: '治疗水平', count: 258 },
  { name: '检查质量', count: 224 },
  { name: '护理质量', count: 198 },
  { name: '合理用药', count: 176 },
  { name: '医疗文书', count: 156 },
  { name: '就诊制度/流程', count: 142 },
  { name: '医疗安排', count: 128 },
  { name: '过程延迟', count: 112 },
  { name: '医疗费用', count: 98 },
  { name: '医保政策', count: 76 },
  { name: '药品政策', count: 58 },
  { name: '后勤服务', count: 34 }
])

const linkBarData = computed(() => {
  const max = 300, xS = 120, xE = 910, scale = (xE - xS) / max
  return linkDistribution.value.map(d => ({
    label: d.name,
    w: Math.max(3, d.count * scale),
    count: d.count
  }))
})

// 详细表格
const detailTable = ref([
  { month: '2026-01', total: 142, first: 108, repeat: 34, urgent: 16, resolved: 122, pending: 20, rate: 85.9, purpose: '投诉', link: '诊断水平' },
  { month: '2026-02', total: 156, first: 122, repeat: 34, urgent: 18, resolved: 134, pending: 22, rate: 85.9, purpose: '求助', link: '治疗水平' },
  { month: '2026-03', total: 168, first: 132, repeat: 36, urgent: 22, resolved: 146, pending: 22, rate: 86.9, purpose: '投诉', link: '检查质量' },
  { month: '2026-04', total: 175, first: 136, repeat: 39, urgent: 26, resolved: 152, pending: 23, rate: 86.9, purpose: '建议', link: '护理质量' },
  { month: '2026-05', total: 182, first: 138, repeat: 44, urgent: 28, resolved: 158, pending: 24, rate: 86.8, purpose: '表扬', link: '合理用药' },
  { month: '2026-06', total: 178, first: 142, repeat: 36, urgent: 24, resolved: 152, pending: 26, rate: 85.4, purpose: '咨询', link: '就诊制度/流程' }
])

const exportReport = () => {
  const csv = [
    ['月份','工单总量','首件','重复件','加急','已完结','处理中','完结率','主要诉求目的','主要涉及环节'],
    ...detailTable.value.map(r => [r.month, r.total, r.first, r.repeat, r.urgent, r.resolved, r.pending, r.rate, r.purpose, r.link])
  ].map(row => row.join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `民生诉求数据统计_${new Date().toISOString().slice(0,10)}.csv`
  link.click()
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

.breadcrumb-arrow svg { width: 16px; height: 16px; }
.breadcrumb-item { color: #333; font-size: 14px; }
.breadcrumb-item.active { color: #666; }
.breadcrumb-separator { margin: 0 8px; color: #999; }

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title { font-size: 18px; font-weight: 600; color: #333; margin: 0; }

.header-actions { display: flex; gap: 12px; }

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px 20px;
  border-radius: 10px;
  margin-bottom: 16px;
  border: 1px solid #eef0f4;
  flex-wrap: wrap;
  gap: 12px;
}

.quick-btns { display: flex; gap: 6px; flex-wrap: wrap; }

.quick-btn {
  padding: 6px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  font-size: 13px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.quick-btn:hover { color: #1890ff; border-color: #1890ff; background: #f0f9ff; }
.quick-btn.active { background: linear-gradient(135deg, #1890ff, #096dd9); color: #fff; border-color: transparent; box-shadow: 0 2px 8px rgba(24,144,255,0.25); }

.date-range { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.date-sep { color: #9ca3af; font-size: 13px; }

.form-input, .form-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  background: #fafbfc;
}

.form-select { width: 120px; cursor: pointer; background: #fff; }
.form-input:focus, .form-select:focus { border-color: #1890ff; background: #fff; }

.btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 16px; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
.btn-primary { background: linear-gradient(135deg, #1890ff, #096dd9); color: #fff; box-shadow: 0 2px 8px rgba(24,144,255,0.2); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(24,144,255,0.3); }
.btn-outline { background: #fff; color: #1890ff; border: 1px solid #1890ff; }
.btn-outline:hover { background: #e6f7ff; }
.btn-icon { width: 14px; height: 14px; }

/* KPI */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
  margin-bottom: 16px;
}

.kpi-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  border: 1px solid #eef0f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 88px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.kpi-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.06); }

.kpi-label { font-size: 12px; color: #6b7280; margin-bottom: 6px; font-weight: 500; }
.kpi-value { font-size: 22px; font-weight: 700; color: #1f2937; letter-spacing: -0.5px; line-height: 1.1; margin-bottom: 4px; }
.kpi-compare { display: flex; gap: 10px; }
.compare-item { display: flex; flex-direction: column; gap: 1px; }
.compare-label { font-size: 9px; color: #9ca3af; }
.compare-value { font-size: 11px; font-weight: 600; }
.compare-item.up .compare-value { color: #389e0d; }
.compare-item.down .compare-value { color: #cf1322; }

.text-primary { color: #1890ff !important; }
.text-success { color: #389e0d !important; }
.text-warn { color: #fa541c !important; }
.text-blue { color: #1890ff !important; }
.text-green { color: #52c41a !important; }
.text-orange { color: #fa8c16 !important; }
.text-red { color: #ff4d4f !important; }

/* 图表行 */
.charts-row {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

.charts-row-2 {
  grid-template-columns: 1fr 1fr;
}

.chart-card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #eef0f4;
  overflow: hidden;
  margin-bottom: 14px;
}

.chart-full { margin-bottom: 14px; }

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
}

.chart-title { font-size: 14px; font-weight: 600; color: #1f2937; }
.chart-sub { font-size: 11px; color: #9ca3af; background: #f3f4f6; padding: 3px 8px; border-radius: 4px; font-weight: 500; }

.chart-body { padding: 12px 16px; }

.pie-body { display: flex; align-items: center; gap: 12px; }
.pie-svg { width: 150px; height: 150px; flex-shrink: 0; }
.pie-total-num { font-size: 20px; font-weight: 700; fill: #1f2937; }
.pie-total-label { font-size: 10px; fill: #9ca3af; }

.line-svg { width: 100%; height: 180px; }
.bar-svg-h { width: 100%; height: 240px; }
.axis-label { font-size: 10px; fill: #9ca3af; font-weight: 500; }

.chart-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.leg-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7280; }
.leg-item b { color: #1f2937; font-weight: 700; }
.leg-item.right { margin-left: auto; }
.leg-peak { color: #ff4d4f; font-weight: 600; }

.pie-legend { flex: 1; }
.leg-row { display: flex; align-items: center; gap: 6px; padding: 3px 0; font-size: 11px; }
.leg-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
.leg-name { flex: 1; color: #374151; font-weight: 500; }
.leg-val { font-weight: 700; color: #1f2937; }
.leg-pct { color: #9ca3af; font-size: 10px; }

.leg-line { display: inline-block; width: 14px; height: 3px; border-radius: 2px; vertical-align: middle; }
.leg-line.blue { background: #1890ff; }
.leg-line.red { background: #ff4d4f; }
.leg-line.green { background: #52c41a; }

/* 表格 */
.data-card { background: #fff; border-radius: 10px; border: 1px solid #eef0f4; overflow: hidden; margin-bottom: 14px; }
.card-header { padding: 12px 20px; border-bottom: 1px solid #f3f4f6; }
.card-title { font-size: 14px; font-weight: 600; color: #1f2937; margin: 0; }

.table-container { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th,
.data-table td {
  padding: 10px 12px;
  text-align: left;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  white-space: nowrap;
}
.data-table th {
  background: #f9fafb;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}
.data-table th:first-child,
.data-table td:first-child { width: 50px; }
.data-table th:nth-child(2),
.data-table td:nth-child(2) { width: 80px; }
.data-table th:nth-child(3),
.data-table td:nth-child(3) { width: 90px; }
.data-table th:nth-child(4),
.data-table td:nth-child(4) { width: 70px; }
.data-table th:nth-child(5),
.data-table td:nth-child(5) { width: 80px; }
.data-table th:nth-child(6),
.data-table td:nth-child(6) { width: 70px; }
.data-table th:nth-child(7),
.data-table td:nth-child(7) { width: 80px; }
.data-table th:nth-child(8),
.data-table td:nth-child(8) { width: 80px; }
.data-table th:nth-child(9),
.data-table td:nth-child(9) { width: 80px; }
.data-table th:nth-child(10),
.data-table td:nth-child(10) { width: 120px; }
.data-table th:last-child,
.data-table td:last-child { 
  width: auto; 
  min-width: 140px;
  white-space: normal;
}
.data-table tbody tr:hover { background: #f9fafb; }

@media (max-width: 1400px) {
  .kpi-grid { grid-template-columns: repeat(3, 1fr); }
  .charts-row { grid-template-columns: 1fr 1fr; }
  .chart-main { grid-column: 1 / -1; }
}

@media (max-width: 1000px) {
  .charts-row-3, .charts-row-2 { grid-template-columns: 1fr; }
  .charts-row { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .filter-bar { flex-direction: column; align-items: flex-start; }
}
</style>
