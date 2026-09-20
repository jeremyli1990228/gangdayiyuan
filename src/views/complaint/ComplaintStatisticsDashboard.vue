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
      <span class="breadcrumb-item active">案件统计看板</span>
    </div>

    <!-- 页面标题 & 导出 -->
    <div class="page-header">
      <h1 class="page-title">案件统计看板</h1>
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
          <option value="">全部门</option>
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
        <select class="form-select" v-model="typeFilter">
          <option value="">全部类型</option>
          <option value="投诉">投诉</option>
          <option value="表扬">表扬</option>
          <option value="建议">建议</option>
          <option value="咨询">咨询</option>
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
        <div class="kpi-label">投诉总量</div>
        <div class="kpi-value text-primary">{{ kpiData.totalComplaints }}</div>
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
        <div class="kpi-label">已处理</div>
        <div class="kpi-value text-success">{{ kpiData.resolved }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">处理率</span>
            <span class="compare-value text-success">{{ kpiData.resolveRate }}%</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">待处理</div>
        <div class="kpi-value text-warn">{{ kpiData.pending }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">平均处理时长</span>
            <span class="compare-value">{{ kpiData.avgTime }}</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">表扬总量</div>
        <div class="kpi-value text-green">{{ kpiData.praise }}</div>
        <div class="kpi-compare">
          <span class="compare-item up">
            <span class="compare-label">同比</span>
            <span class="compare-value">+15.6%</span>
          </span>
          <span class="compare-item down">
            <span class="compare-label">环比</span>
            <span class="compare-value">-3.1%</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">投诉/表扬率</div>
        <div class="kpi-value text-orange">{{ kpiData.complaintPraiseRatio }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">投诉占比率</span>
            <span class="compare-value">{{ kpiData.complaintPercent }}%</span>
          </span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">赔付总金额</div>
        <div class="kpi-value text-red">¥{{ kpiData.compensation }}</div>
        <div class="kpi-compare">
          <span class="compare-item">
            <span class="compare-label">同比</span>
            <span class="compare-value text-red">+5.2%</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 第一行：投诉趋势 + 科室分布 + 投诉类型 -->
    <div class="charts-row">
      <!-- 折线图：月度投诉趋势 -->
      <div class="chart-card chart-main">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">投诉趋势</span>
            <span class="chart-sub">近12个月投诉量走势</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: trendChartType==='pie'}]" @click="trendChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: trendChartType==='bar'}]" @click="trendChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: trendChartType==='hbar'}]" @click="trendChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: trendChartType==='line'}]" @click="trendChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="trendChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="40" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in trendPieSlices" :key="'trps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="1.5"/>
            </g>
          </svg>
          <div class="pie-legend pie-legend-grid">
            <div class="leg-row" v-for="(d,i) in trendData" :key="'trpl'+i">
              <span class="leg-dot" :style="{background: chartColors[i%chartColors.length]}"></span>
              <span class="leg-name">{{ d.month }}</span>
              <span class="leg-val">{{ d.value }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="trendChartType==='bar'">
          <svg class="line-svg" viewBox="0 0 540 200" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'tbgl'+i" x1="40" x2="525" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in trendVBarData.yLabels" :key="'tbyl'+i" x="35" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(b,i) in trendVBarData.bars" :key="'tbg'+i">
              <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="2" :fill="b.color"/>
              <text :x="b.x+b.w/2" :y="b.y-3" text-anchor="middle" class="axis-label" font-size="9">{{ b.value }}</text>
            </g>
            <text v-for="(b,i) in trendVBarData.bars" :key="'tblbl'+i" :x="b.x+b.w/2" y="195" text-anchor="middle" class="axis-label" font-size="9">{{ b.label }}</text>
          </svg>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="trendChartType==='hbar'">
          <svg class="line-svg" viewBox="0 0 540 200" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'thgl'+i" :x1="60" x2="525" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in trendHBarData.bars" :key="'thb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="55" y="9" text-anchor="end" class="axis-label" font-size="9">{{ b.label }}</text>
              <rect x="60" y="0" :width="b.w" :height="b.h" rx="2" :fill="b.color"/>
              <text :x="60+b.w+4" y="9" class="axis-label" font-size="9" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
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
            <span class="leg-item"><span class="leg-line blue"></span>投诉量</span>
            <span class="leg-item right"><span class="leg-peak">↑ 峰值月</span> <b>{{ peakMonth }}</b></span>
          </div>
        </div>
      </div>

      <!-- 饼图：科室分布 -->
      <div class="chart-card chart-side">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">科室投诉分布</span>
            <span class="chart-sub">各科室占比</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: deptChartType==='pie'}]" @click="deptChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: deptChartType==='bar'}]" @click="deptChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: deptChartType==='hbar'}]" @click="deptChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: deptChartType==='line'}]" @click="deptChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="deptChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="48" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
              <text y="-4" text-anchor="middle" class="pie-total-num">{{ kpiData.totalComplaints }}</text>
              <text y="12" text-anchor="middle" class="pie-total-label">总投诉</text>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in deptPieSlices" :key="'ds'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(d,i) in deptDistribution" :key="'dl'+i">
              <span class="leg-dot" :style="{background: chartColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
              <span class="leg-pct">{{ d.percent }}%</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="deptChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'dcbgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in deptVBarData.yLabels" :key="'dcbyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(b,i) in deptVBarData.bars" :key="'dcbg'+i">
              <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="3" :fill="b.color"/>
              <text :x="b.x+b.w/2" :y="b.y-3" text-anchor="middle" class="axis-label" font-size="9" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
            <text v-for="(b,i) in deptVBarData.bars" :key="'dclbl'+i" :x="b.x+b.w/2" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ b.label }}</text>
          </svg>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="deptChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'dchgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in deptHBarData.bars" :key="'dchb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="9" text-anchor="end" class="axis-label" font-size="10">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.w" :height="b.h" rx="3" :fill="b.color"/>
              <text :x="80+b.w+4" y="9" class="axis-label" font-size="9" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'dclgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in deptLineData.yLabels" :key="'dclyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="deptLineData.linePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in deptLineData.points" :key="'dclp'+i">
              <circle :cx="p.x" :cy="p.y" r="3.5" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in deptLineData.points" :key="'dcllbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ p.label }}</text>
          </svg>
        </div>
      </div>

      <!-- 饼图：投诉类型分布 -->
      <div class="chart-card chart-side">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">投诉类型分布</span>
            <span class="chart-sub">门急诊/住院分类</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: typeChartType==='pie'}]" @click="typeChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: typeChartType==='bar'}]" @click="typeChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: typeChartType==='hbar'}]" @click="typeChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: typeChartType==='line'}]" @click="typeChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="typeChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="48" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
              <text y="-4" text-anchor="middle" class="pie-total-num">{{ kpiData.totalComplaints }}</text>
              <text y="12" text-anchor="middle" class="pie-total-label">总投诉</text>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in typePieSlices" :key="'ts'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(t,i) in complaintTypeDistribution" :key="'tl'+i">
              <span class="leg-dot" :style="{background: typeColors[i]}"></span>
              <span class="leg-name">{{ t.name }}</span>
              <span class="leg-val">{{ t.count }}</span>
              <span class="leg-pct">{{ t.percent }}%</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="typeChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'tcbgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in typeVBarData.yLabels" :key="'tcbyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(b,i) in typeVBarData.bars" :key="'tcbg'+i">
              <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="3" :fill="b.color"/>
              <text :x="b.x+b.w/2" :y="b.y-3" text-anchor="middle" class="axis-label" font-size="10" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
            <text v-for="(b,i) in typeVBarData.bars" :key="'tclbl'+i" :x="b.x+b.w/2" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ b.label }}</text>
          </svg>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="typeChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'tchgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in typeHBarData.bars" :key="'tchb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="11" text-anchor="end" class="axis-label" font-size="11">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.w" height="20" rx="3" :fill="b.color"/>
              <text :x="80+b.w+6" y="14" class="axis-label" font-size="11" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'tclgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in typeLineData.yLabels" :key="'tclyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="typeLineData.linePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in typeLineData.points" :key="'tclp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in typeLineData.points" :key="'tcllbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label">{{ p.label }}</text>
          </svg>
        </div>
      </div>
    </div>

    <!-- 新增行：科室TOP排名 + 同比/环比对比 -->
    <div class="charts-row charts-row-2">
      <!-- 柱状图：科室TOP排名 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">科室TOP排名</span>
            <span class="chart-sub">科室投诉量TOP</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: topDeptChartType==='pie'}]" @click="topDeptChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: topDeptChartType==='bar'}]" @click="topDeptChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: topDeptChartType==='hbar'}]" @click="topDeptChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: topDeptChartType==='line'}]" @click="topDeptChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="topDeptChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="48" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in topDeptPieSlices" :key="'tdps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend pie-legend-grid">
            <div class="leg-row" v-for="(d,i) in topDeptRankData" :key="'tdpl'+i">
              <span class="leg-dot" :style="{background: topDeptColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="topDeptChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'tdbgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in topDeptVBarData.yLabels" :key="'tdbyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(b,i) in topDeptVBarData.bars" :key="'tdbg'+i">
              <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="3" :fill="b.color"/>
              <text :x="b.x+b.w/2" :y="b.y-3" text-anchor="middle" class="axis-label" font-size="9" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
            <text v-for="(b,i) in topDeptVBarData.bars" :key="'tdlbl'+i" :x="b.x+b.w/2" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ b.label }}</text>
          </svg>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="topDeptChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'tdhgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in topDeptHBarData.bars" :key="'tdhb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="9" text-anchor="end" class="axis-label" font-size="10">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.w" :height="b.h" rx="3" :fill="b.color"/>
              <text :x="80+b.w+4" y="9" class="axis-label" font-size="9" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'tdlgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in topDeptLineData.yLabels" :key="'tdlyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="topDeptLineData.linePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in topDeptLineData.points" :key="'tdlp'+i">
              <circle :cx="p.x" :cy="p.y" r="3.5" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in topDeptLineData.points" :key="'tdllbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ p.label }}</text>
          </svg>
        </div>
      </div>

      <!-- 同比/环比对比 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">同比/环比对比</span>
            <span class="chart-sub">案件总量/投诉量/表扬量</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: yoyChartType==='pie'}]" @click="yoyChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: yoyChartType==='bar'}]" @click="yoyChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: yoyChartType==='hbar'}]" @click="yoyChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: yoyChartType==='line'}]" @click="yoyChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="yoyChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="40" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in yoyPieSlices" :key="'yops'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(s,i) in yoyPieSlices" :key="'yopl'+i">
              <span class="leg-dot" :style="{background: s.color}"></span>
              <span class="leg-name">{{ s.name }}</span>
              <span class="leg-val">{{ s.count }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="yoyChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'yobgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in yoyBarData" :key="'yobg'+i">
              <rect :x="b.x" :y="b.yoyY" :width="b.bw" :height="b.yoyH" rx="3" fill="#1890ff"/>
              <rect :x="b.x+b.bw+2" :y="b.momY" :width="b.bw" :height="b.momH" rx="3" fill="#fa8c16"/>
              <text :x="b.x+b.bw" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ b.label }}</text>
            </g>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-dot-sm" style="background:#1890ff"></span>同比</span>
            <span class="leg-item"><span class="leg-dot-sm" style="background:#fa8c16"></span>环比</span>
          </div>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="yoyChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'yohgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in yoyHBarData" :key="'yohb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="9" text-anchor="end" class="axis-label" font-size="10">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.yoyW" :height="b.h" rx="3" fill="#1890ff"/>
              <rect x="80" :y="b.h+2" :width="b.momW" :height="b.h" rx="3" fill="#fa8c16"/>
            </g>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-dot-sm" style="background:#1890ff"></span>同比</span>
            <span class="leg-item"><span class="leg-dot-sm" style="background:#fa8c16"></span>环比</span>
          </div>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'yolgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in yoyLineData.yLabels" :key="'yolyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="yoyLineData.yoyPath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <path :d="yoyLineData.momPath" fill="none" stroke="#fa8c16" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in yoyLineData.yoyPoints" :key="'yolyp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <g v-for="(p,i) in yoyLineData.momPoints" :key="'yolmp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#fa8c16" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in yoyLineData.momPoints" :key="'yollbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ p.label }}</text>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-line blue"></span>同比</span>
            <span class="leg-item"><span class="leg-line" style="background:#fa8c16"></span>环比</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二行：投诉原因 + 门急诊/住院 + 年龄分布 -->
    <div class="charts-row charts-row-3">
      <!-- 柱状图：投诉原因TOP10 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">投诉原因分析</span>
            <span class="chart-sub">TOP10 原因排名</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: reasonChartType==='pie'}]" @click="reasonChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: reasonChartType==='bar'}]" @click="reasonChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: reasonChartType==='hbar'}]" @click="reasonChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: reasonChartType==='line'}]" @click="reasonChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="reasonChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="40" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in reasonPieSlices" :key="'rps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="1.5"/>
            </g>
          </svg>
          <div class="pie-legend pie-legend-grid">
            <div class="leg-row" v-for="(d,i) in reasonDistribution" :key="'rpl'+i">
              <span class="leg-dot" :style="{background: reasonColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="reasonChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 420 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'bgl'+i" x1="120" x2="410" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [80,60,40,20,0]" :key="'byl'+i" x="115" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(item,i) in reasonBarData" :key="'br'+i" :transform="'translate(125 + i*28, 0)'">
              <rect x="0" :y="item.y" width="18" :height="item.h" rx="3" :fill="reasonColors[i]" opacity="0.85"/>
              <text x="9" y="212" text-anchor="middle" class="axis-label" font-size="9">{{ item.label }}</text>
            </g>
          </svg>
          <div class="bar-legend">
            <span v-for="(r,i) in reasonDistribution.slice(0,5)" :key="'rl'+i" class="leg-tag" :style="{borderColor: reasonColors[i]}">
              {{ r.name }}
            </span>
          </div>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="reasonChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'rhgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in reasonHBarData.bars" :key="'rhb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="9" text-anchor="end" class="axis-label" font-size="9">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.w" :height="b.h" rx="2" :fill="b.color"/>
              <text :x="80+b.w+4" y="9" class="axis-label" font-size="9" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'rlgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in reasonLineData.yLabels" :key="'rlyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="reasonLineData.linePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in reasonLineData.points" :key="'rlp'+i">
              <circle :cx="p.x" :cy="p.y" r="3.5" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in reasonLineData.points" :key="'rllbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ p.label }}</text>
          </svg>
        </div>
      </div>

      <!-- 柱状图：门急诊 vs 住院 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">门急诊 / 住院投诉对比</span>
            <span class="chart-sub">按就诊类型分布</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: visitChartType==='pie'}]" @click="visitChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: visitChartType==='bar'}]" @click="visitChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: visitChartType==='hbar'}]" @click="visitChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: visitChartType==='line'}]" @click="visitChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="visitChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="48" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
              <text y="-4" text-anchor="middle" class="pie-total-num">{{ kpiData.totalComplaints }}</text>
              <text y="12" text-anchor="middle" class="pie-total-label">总投诉</text>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in visitPieSlices" :key="'vps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(s,i) in visitPieSlices" :key="'vpl'+i">
              <span class="leg-dot" :style="{background: s.color}"></span>
              <span class="leg-name">{{ s.name }}</span>
              <span class="leg-val">{{ s.count }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="visitChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 360 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'cgl'+i" x1="50" x2="350" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [120,90,60,30,0]" :key="'cyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(item,i) in visitTypeBarData" :key="'vg'+i" :transform="'translate('+(55+i*52)+',0)'">
              <rect x="0" :y="item.outpatientY" width="20" :height="item.outpatientH" rx="3" fill="url(#outpatientGrad)"/>
              <rect x="24" :y="item.inpatientY" width="20" :height="item.inpatientH" rx="3" fill="url(#inpatientGrad)"/>
              <text x="32" y="212" text-anchor="middle" class="axis-label">{{ item.label }}</text>
            </g>
            <defs>
              <linearGradient id="outpatientGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1890ff"/>
                <stop offset="100%" stop-color="#40a9ff"/>
              </linearGradient>
              <linearGradient id="inpatientGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#722ed1"/>
                <stop offset="100%" stop-color="#9254de"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-bar blue-grad"></span>门急诊 <b>{{ visitTypeData.outpatient }}</b></span>
            <span class="leg-item"><span class="leg-bar purple-grad"></span>住院 <b>{{ visitTypeData.inpatient }}</b></span>
          </div>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="visitChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'vhgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in visitHBarData" :key="'vhb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="9" text-anchor="end" class="axis-label" font-size="10">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.outW" :height="b.h" rx="3" fill="#1890ff"/>
              <rect x="80" :y="b.h+2" :width="b.inW" :height="b.h" rx="3" fill="#722ed1"/>
            </g>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-dot-sm" style="background:#1890ff"></span>门急诊</span>
            <span class="leg-item"><span class="leg-dot-sm" style="background:#722ed1"></span>住院</span>
          </div>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'vlgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in visitLineData.yLabels" :key="'vlyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="visitLineData.outPath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <path :d="visitLineData.inPath" fill="none" stroke="#722ed1" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in visitLineData.outPoints" :key="'vlop'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <g v-for="(p,i) in visitLineData.inPoints" :key="'vlip'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#722ed1" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in visitLineData.outPoints" :key="'vllbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ p.label }}</text>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-line blue"></span>门急诊</span>
            <span class="leg-item"><span class="leg-line" style="background:#722ed1"></span>住院</span>
          </div>
        </div>
      </div>

      <!-- 柱状图：年龄分布 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">患者年龄分布</span>
            <span class="chart-sub">各年龄段投诉量</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: ageChartType==='pie'}]" @click="ageChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: ageChartType==='bar'}]" @click="ageChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: ageChartType==='hbar'}]" @click="ageChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: ageChartType==='line'}]" @click="ageChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="ageChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="40" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in agePieSlices" :key="'aps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="1.5"/>
            </g>
          </svg>
          <div class="pie-legend pie-legend-grid">
            <div class="leg-row" v-for="(d,i) in ageDistribution" :key="'apl'+i">
              <span class="leg-dot" :style="{background: ageColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="ageChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 360 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'agl'+i" x1="50" x2="350" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [80,60,40,20,0]" :key="'ayl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(item,i) in ageBarData" :key="'ag'+i" :transform="'translate('+(55+i*45)+',0)'">
              <rect x="0" :y="item.y" width="28" :height="item.h" rx="3" :fill="ageColors[i]"/>
              <text x="14" y="212" text-anchor="middle" class="axis-label">{{ item.label }}</text>
            </g>
          </svg>
          <div class="chart-legend">
            <span v-for="(a,i) in ageDistribution" :key="'al'+i" class="leg-inline">
              <span class="leg-dot-sm" :style="{background: ageColors[i]}"></span>{{ a.name }}
            </span>
          </div>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="ageChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'ahgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in ageHBarData.bars" :key="'ahb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="11" text-anchor="end" class="axis-label" font-size="11">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.w" height="20" rx="3" :fill="b.color"/>
              <text :x="80+b.w+6" y="14" class="axis-label" font-size="11" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'algl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in ageLineData.yLabels" :key="'alyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="ageLineData.linePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in ageLineData.points" :key="'alp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in ageLineData.points" :key="'allbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ p.label }}</text>
          </svg>
        </div>
      </div>
    </div>

    <!-- 第三行：赔付金额分布 + 涉及人员分布 + 投诉表扬率 -->
    <div class="charts-row charts-row-3">
      <!-- 柱状图：赔付金额分布 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">赔付金额分布</span>
            <span class="chart-sub">按赔付金额区间统计</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: compChartType==='pie'}]" @click="compChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: compChartType==='bar'}]" @click="compChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: compChartType==='hbar'}]" @click="compChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: compChartType==='line'}]" @click="compChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="compChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="40" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in compensationPieSlices" :key="'cps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="1.5"/>
            </g>
          </svg>
          <div class="pie-legend pie-legend-grid">
            <div class="leg-row" v-for="(d,i) in compensationDistribution" :key="'cpl'+i">
              <span class="leg-dot" :style="{background: compensationColors[i]}"></span>
              <span class="leg-name">{{ d.name }}</span>
              <span class="leg-val">{{ d.count }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="compChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 420 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'mgl'+i" x1="50" x2="410" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [50,40,30,20,10,0]" :key="'myl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(item,i) in compensationBarData" :key="'mg'+i" :transform="'translate('+(55+i*50)+',0)'">
              <rect x="0" :y="item.y" width="32" :height="item.h" rx="3" fill="url(#moneyGrad)"/>
              <text x="16" y="212" text-anchor="middle" class="axis-label">{{ item.label }}</text>
            </g>
            <defs>
              <linearGradient id="moneyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fa8c16"/>
                <stop offset="100%" stop-color="#ff9c3d"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="chart-legend">
            <span class="leg-item" v-for="(c,i) in compensationDistribution" :key="'cl'+i">
              <span class="leg-dot-sm orange"></span>{{ c.name }}
            </span>
          </div>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="compChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'chgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in compensationHBarData.bars" :key="'chb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="11" text-anchor="end" class="axis-label" font-size="11">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.w" height="20" rx="3" :fill="b.color"/>
              <text :x="80+b.w+6" y="14" class="axis-label" font-size="11" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'clgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in compensationLineData.yLabels" :key="'clyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="compensationLineData.linePath" fill="none" stroke="#fa8c16" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in compensationLineData.points" :key="'clp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#fa8c16" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in compensationLineData.points" :key="'cllbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ p.label }}</text>
          </svg>
        </div>
      </div>

      <!-- 饼图：涉及人员分布 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">涉及人员分布</span>
            <span class="chart-sub">按人员角色统计</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: staffChartType==='pie'}]" @click="staffChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: staffChartType==='bar'}]" @click="staffChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: staffChartType==='hbar'}]" @click="staffChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: staffChartType==='line'}]" @click="staffChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="staffChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="42" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
              <text y="-2" text-anchor="middle" class="pie-total-num">{{ kpiData.totalComplaints }}</text>
              <text y="12" text-anchor="middle" class="pie-total-label">总投诉</text>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in staffPieSlices" :key="'ss'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(s,i) in staffDistribution" :key="'sl'+i">
              <span class="leg-dot" :style="{background: staffColors[i]}"></span>
              <span class="leg-name">{{ s.name }}</span>
              <span class="leg-val">{{ s.count }}</span>
              <span class="leg-pct">{{ s.percent }}%</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="staffChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'sbgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in staffVBarData.yLabels" :key="'sbyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(b,i) in staffVBarData.bars" :key="'sbg'+i">
              <rect :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="3" :fill="b.color"/>
              <text :x="b.x+b.w/2" :y="b.y-3" text-anchor="middle" class="axis-label" font-size="10" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
            <text v-for="(b,i) in staffVBarData.bars" :key="'slbl'+i" :x="b.x+b.w/2" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ b.label }}</text>
          </svg>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="staffChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'shgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in staffHBarData.bars" :key="'shb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="11" text-anchor="end" class="axis-label" font-size="11">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.w" height="20" rx="3" :fill="b.color"/>
              <text :x="80+b.w+6" y="14" class="axis-label" font-size="11" font-weight="600" fill="#1f2937">{{ b.value }}</text>
            </g>
          </svg>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'slgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in staffLineData.yLabels" :key="'slyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="staffLineData.linePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in staffLineData.points" :key="'slp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#1890ff" stroke-width="2"/>
            </g>
            <text v-for="(p,i) in staffLineData.points" :key="'sllbl'+i" :x="p.x" y="215" text-anchor="middle" class="axis-label">{{ p.label }}</text>
          </svg>
        </div>
      </div>

      <!-- 折线图：投诉/表扬率趋势 -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <span class="chart-title">投诉 / 表扬率趋势</span>
            <span class="chart-sub">近6个月变化</span>
          </div>
          <div class="chart-type-tabs">
            <button :class="['chart-type-tab', {active: ratioChartType==='pie'}]" @click="ratioChartType='pie'">饼图</button>
            <button :class="['chart-type-tab', {active: ratioChartType==='bar'}]" @click="ratioChartType='bar'">柱状</button>
            <button :class="['chart-type-tab', {active: ratioChartType==='hbar'}]" @click="ratioChartType='hbar'">条形</button>
            <button :class="['chart-type-tab', {active: ratioChartType==='line'}]" @click="ratioChartType='line'">折线</button>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="chart-body pie-body" v-if="ratioChartType==='pie'">
          <svg class="pie-svg" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              <circle r="48" fill="#fff" stroke="#eef0f4" stroke-width="1"/>
            </g>
            <g transform="translate(100,100)" v-for="(s,i) in ratioPieSlices" :key="'rps'+i">
              <path :d="s.path" :fill="s.color" stroke="#fff" stroke-width="2"/>
            </g>
          </svg>
          <div class="pie-legend">
            <div class="leg-row" v-for="(s,i) in ratioPieSlices" :key="'rpl'+i">
              <span class="leg-dot" :style="{background: s.color}"></span>
              <span class="leg-name">{{ s.name }}</span>
              <span class="leg-val">{{ s.count }}</span>
            </div>
          </div>
        </div>
        <!-- 柱状 -->
        <div class="chart-body" v-else-if="ratioChartType==='bar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'rbgl'+i" x1="50" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [10,7.5,5,2.5,0]" :key="'rbyl'+i" x="45" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <g v-for="(b,i) in ratioBarData" :key="'rbg'+i">
              <rect :x="b.x" :y="b.complaintY" :width="b.bw" :height="b.complaintH" rx="3" fill="#ff4d4f"/>
              <rect :x="b.x+b.bw+2" :y="b.praiseY" :width="b.bw" :height="b.praiseH" rx="3" fill="#52c41a"/>
              <text :x="b.x+b.bw" y="215" text-anchor="middle" class="axis-label" font-size="9">{{ b.label }}</text>
            </g>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-dot-sm" style="background:#ff4d4f"></span>投诉率</span>
            <span class="leg-item"><span class="leg-dot-sm" style="background:#52c41a"></span>表扬率</span>
          </div>
        </div>
        <!-- 条形 -->
        <div class="chart-body" v-else-if="ratioChartType==='hbar'">
          <svg class="bar-svg" viewBox="0 0 460 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'rhgl'+i" :x1="80" x2="450" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <g v-for="(b,i) in ratioHBarData" :key="'rhb'+i" :transform="'translate(0,'+b.y+')'">
              <text x="75" y="9" text-anchor="end" class="axis-label" font-size="10">{{ b.label }}</text>
              <rect x="80" y="0" :width="b.complaintW" :height="b.h" rx="3" fill="#ff4d4f"/>
              <rect x="80" :y="b.h+2" :width="b.praiseW" :height="b.h" rx="3" fill="#52c41a"/>
            </g>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-dot-sm" style="background:#ff4d4f"></span>投诉率</span>
            <span class="leg-item"><span class="leg-dot-sm" style="background:#52c41a"></span>表扬率</span>
          </div>
        </div>
        <!-- 折线 -->
        <div class="chart-body" v-else>
          <svg class="line-svg" viewBox="0 0 380 220" preserveAspectRatio="none">
            <line v-for="i in 4" :key="'rgl'+i" x1="40" x2="370" :y1="20+i*40" :y2="20+i*40" stroke="#f0f2f5" stroke-width="1" stroke-dasharray="3,3"/>
            <text v-for="(v,i) in [10,7.5,5,2.5,0]" :key="'ryl'+i" x="35" :y="25+i*40" text-anchor="end" class="axis-label">{{ v }}</text>
            <path :d="praiseAreaPath" fill="url(#praiseGrad)"/>
            <path :d="complaintRatioLinePath" fill="none" stroke="#ff4d4f" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <path :d="praiseRatioLinePath" fill="none" stroke="#52c41a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g v-for="(p,i) in complaintRatioPoints" :key="'crp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#ff4d4f" stroke-width="2"/>
            </g>
            <g v-for="(p,i) in praiseRatioPoints" :key="'prp'+i">
              <circle :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#52c41a" stroke-width="2"/>
            </g>
            <g v-for="(m,i) in ratioMonthLabels" :key="'rml'+i">
              <text :x="m.x" y="210" text-anchor="middle" class="axis-label">{{ m.label }}</text>
            </g>
            <defs>
              <linearGradient id="praiseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#52c41a" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="#52c41a" stop-opacity="0"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="chart-legend">
            <span class="leg-item"><span class="leg-line red"></span>投诉率 <b>{{ currentComplaintRatio }}</b></span>
            <span class="leg-item"><span class="leg-line green"></span>表扬率 <b>{{ currentPraiseRatio }}</b></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 明细表格 -->
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
              <th>投诉量</th>
              <th>已处理</th>
              <th>待处理</th>
              <th>表扬量</th>
              <th>投诉/表扬率</th>
              <th>赔付金额(元)</th>
              <th>门急诊</th>
              <th>住院</th>
              <th>主要投诉原因</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,idx) in detailTable" :key="idx">
              <td>{{ idx+1 }}</td>
              <td>{{ row.month }}</td>
              <td class="text-warn">{{ row.complaints }}</td>
              <td class="text-success">{{ row.resolved }}</td>
              <td class="text-orange">{{ row.pending }}</td>
              <td class="text-green">{{ row.praise }}</td>
              <td>{{ row.ratio }}</td>
              <td class="text-red">¥{{ row.compensation }}</td>
              <td>{{ row.outpatient }}</td>
              <td>{{ row.inpatient }}</td>
              <td>{{ row.topReason }}</td>
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
const typeFilter = ref('')

// 各图表类型切换状态
const trendChartType = ref('line')
const deptChartType = ref('pie')
const typeChartType = ref('pie')
const reasonChartType = ref('bar')
const visitChartType = ref('bar')
const ageChartType = ref('bar')
const compChartType = ref('bar')
const staffChartType = ref('pie')
const ratioChartType = ref('line')
const topDeptChartType = ref('bar')
const yoyChartType = ref('line')

const refreshData = () => {}

// KPI数据
const kpiData = ref({
  totalComplaints: 1248,
  resolved: 1086,
  resolveRate: 87.0,
  pending: 162,
  avgTime: '2.3天',
  praise: 386,
  complaintPraiseRatio: '3.23:1',
  complaintPercent: 76.4,
  compensation: '186,500'
})

// 配色方案
const chartColors = ['#1890ff', '#52c41a', '#fa8c16', '#ff4d4f', '#722ed1', '#13c2c2', '#faad14', '#eb2f96', '#52c41a', '#1890ff']
const typeColors = ['#1890ff', '#722ed1', '#13c2c2', '#fa8c16']
const reasonColors = ['#ff4d4f', '#ff7a45', '#fa8c16', '#ffc53d', '#a0d911', '#52c41a', '#1890ff', '#722ed1', '#13c2c2', '#faad14']
const ageColors = ['#1890ff', '#40a9ff', '#69c0ff', '#91d5ff', '#bae7ff', '#d9d9d9', '#8c8c8c']
const staffColors = ['#1890ff', '#52c41a', '#fa8c16', '#ff4d4f', '#722ed1', '#13c2c2']
const compensationColors = ['#fa8c16', '#ffa940', '#ffc53d', '#faad14', '#d48806']
const topDeptColors = ['#E91E63', '#9C27B0', '#F44336', '#FF9800', '#4CAF50', '#2196F3', '#FFC107', '#00BCD4']

// 月度趋势数据（近12个月）
const trendData = ref([
  { month: '2025-07', value: 78 }, { month: '2025-08', value: 85 },
  { month: '2025-09', value: 92 }, { month: '2025-10', value: 88 },
  { month: '2025-11', value: 96 }, { month: '2025-12', value: 105 },
  { month: '2026-01', value: 98 }, { month: '2026-02', value: 112 },
  { month: '2026-03', value: 118 }, { month: '2026-04', value: 125 },
  { month: '2026-05', value: 132 }, { month: '2026-06', value: 128 }
])

const trendPoints = computed(() => {
  const max = 150, xS = 45, xE = 525, yB = 180, yT = 20
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

// 科室分布
const deptDistribution = ref([
  { name: '门诊', count: 312, percent: 25 },
  { name: '急诊', count: 248, percent: 20 },
  { name: '内科', count: 187, percent: 15 },
  { name: '外科', count: 156, percent: 12 },
  { name: '儿科', count: 125, percent: 10 },
  { name: '妇产科', count: 87, percent: 7 },
  { name: '骨科', count: 75, percent: 6 },
  { name: '其他', count: 58, percent: 5 }
])

const deptPieSlices = computed(() => {
  const r = 78, total = kpiData.value.totalComplaints
  let start = -Math.PI / 2, slices = []
  deptDistribution.value.forEach((d,i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({ path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`, color: chartColors[i] })
    start = end
  })
  return slices
})

// 投诉类型分布
const complaintTypeDistribution = ref([
  { name: '服务态度', count: 486, percent: 39 },
  { name: '医疗质量', count: 312, percent: 25 },
  { name: '就医流程', count: 224, percent: 18 },
  { name: '收费问题', count: 226, percent: 18 }
])

const typePieSlices = computed(() => {
  const r = 78, total = kpiData.value.totalComplaints
  let start = -Math.PI / 2, slices = []
  complaintTypeDistribution.value.forEach((d,i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({ path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`, color: typeColors[i] })
    start = end
  })
  return slices
})

// 投诉原因TOP10
const reasonDistribution = ref([
  { name: '服务态度差', count: 286 }, { name: '等候时间长', count: 224 },
  { name: '沟通不足', count: 186 }, { name: '诊疗效果不理想', count: 158 },
  { name: '收费不透明', count: 124 }, { name: '环境嘈杂', count: 98 },
  { name: '用药说明不清', count: 76 }, { name: '隐私保护不足', count: 52 },
  { name: '投诉处理慢', count: 28 }, { name: '其他', count: 16 }
])

const reasonBarData = computed(() => {
  const max = 300, yB = 180, yT = 20, scale = (yB - yT) / max
  return reasonDistribution.value.map(r => ({
    label: r.name.slice(0, 2),
    h: Math.max(3, r.count * scale),
    y: yB - r.count * scale
  }))
})

// 门急诊 vs 住院
const visitTypeData = ref({ outpatient: 892, inpatient: 356 })
const visitTypeBarData = computed(() => {
  const months = ['1月','2月','3月','4月','5月','6月']
  const outData = [120, 138, 152, 148, 162, 172]
  const inData = [38, 42, 56, 62, 68, 90]
  const max = 180, yB = 180, yT = 20, scale = (yB - yT) / max
  return months.map((label, i) => ({
    label,
    outpatientH: Math.max(3, outData[i] * scale),
    outpatientY: yB - outData[i] * scale,
    inpatientH: Math.max(3, inData[i] * scale),
    inpatientY: yB - inData[i] * scale
  }))
})

// 年龄分布
const ageDistribution = ref([
  { name: '0-18岁', count: 112 }, { name: '18-30岁', count: 248 },
  { name: '30-40岁', count: 312 }, { name: '40-50岁', count: 268 },
  { name: '50-60岁', count: 186 }, { name: '60岁以上', count: 122 }
])

const ageBarData = computed(() => {
  const max = 320, yB = 180, yT = 20, scale = (yB - yT) / max
  return ageDistribution.value.map(a => ({
    label: a.name.split('-')[0].replace('岁',''),
    h: Math.max(3, a.count * scale),
    y: yB - a.count * scale
  }))
})

// 赔付金额分布
const compensationDistribution = ref([
  { name: '0-1千', count: 42 }, { name: '1千-5千', count: 28 },
  { name: '5千-1万', count: 15 }, { name: '1万-5万', count: 8 },
  { name: '5万以上', count: 3 }
])

const compensationBarData = computed(() => {
  const max = 50, yB = 180, yT = 20, scale = (yB - yT) / max
  return compensationDistribution.value.map(c => ({
    label: c.name.split('-')[0].replace('万','w').replace('千','k'),
    h: Math.max(3, c.count * scale),
    y: yB - c.count * scale
  }))
})

// 涉及人员分布
const staffDistribution = ref([
  { name: '医生', count: 486, percent: 39 },
  { name: '护士', count: 312, percent: 25 },
  { name: '药师', count: 156, percent: 12 },
  { name: '技师', count: 124, percent: 10 },
  { name: '行政', count: 94, percent: 8 },
  { name: '其他', count: 76, percent: 6 }
])

const staffPieSlices = computed(() => {
  const r = 72, total = kpiData.value.totalComplaints
  let start = -Math.PI / 2, slices = []
  staffDistribution.value.forEach((d,i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({ path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`, color: staffColors[i] })
    start = end
  })
  return slices
})

// 投诉/表扬率趋势
const ratioData = ref([
  { month: '2026-01', complaint: 6.2, praise: 2.8 },
  { month: '2026-02', complaint: 5.8, praise: 3.1 },
  { month: '2026-03', complaint: 7.1, praise: 2.5 },
  { month: '2026-04', complaint: 6.5, praise: 3.0 },
  { month: '2026-05', complaint: 8.2, praise: 2.2 },
  { month: '2026-06', complaint: 7.6, praise: 2.6 }
])

const ratioMonthLabels = computed(() => {
  const xS = 40, xE = 370
  return ratioData.value.map((d,i) => ({
    x: xS + i * (xE - xS) / (ratioData.value.length - 1),
    label: d.month.slice(5) + '月'
  }))
})

const complaintRatioPoints = computed(() => {
  const max = 10, xS = 40, xE = 370, yB = 180, yT = 20, scale = (yB - yT) / max
  return ratioData.value.map((d,i) => ({
    x: xS + i * (xE - xS) / (ratioData.value.length - 1),
    y: yB - d.complaint * scale
  }))
})

const praiseRatioPoints = computed(() => {
  const max = 10, xS = 40, xE = 370, yB = 180, yT = 20, scale = (yB - yT) / max
  return ratioData.value.map((d,i) => ({
    x: xS + i * (xE - xS) / (ratioData.value.length - 1),
    y: yB - d.praise * scale
  }))
})

const complaintRatioLinePath = computed(() => complaintRatioPoints.value.map((p,i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' '))
const praiseRatioLinePath = computed(() => praiseRatioPoints.value.map((p,i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' '))
const praiseAreaPath = computed(() => {
  const pts = praiseRatioPoints.value
  if (!pts.length) return ''
  return `${praiseRatioLinePath.value} L ${pts[pts.length-1].x} 180 L ${pts[0].x} 180 Z`
})

const currentComplaintRatio = computed(() => ratioData.value[ratioData.value.length - 1]?.complaint + '%')
const currentPraiseRatio = computed(() => ratioData.value[ratioData.value.length - 1]?.praise + '%')

// === 图表类型切换：新增计算属性 ===

// 投诉趋势 - 饼图切片
const trendPieSlices = computed(() => {
  const r = 78
  const total = trendData.value.reduce((s, d) => s + d.value, 0)
  let start = -Math.PI / 2, slices = []
  trendData.value.forEach((d, i) => {
    const angle = (d.value / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: chartColors[i % chartColors.length]
    })
    start = end
  })
  return slices
})
const trendVBarData = computed(() => buildVBarData(trendData.value, 'value', chartColors, { xS: 45, xE: 525, yT: 20, yB: 180 }, 'month'))
const trendHBarData = computed(() => buildHBarData(trendData.value, 'value', 'month', chartColors, { xS: 60, xE: 525, yT: 15, yB: 195 }))

// 科室投诉分布 - 柱状/条形/折线
const deptVBarData = computed(() => buildVBarData(deptDistribution.value, 'count', chartColors, { xS: 50, xE: 450, yT: 20, yB: 200 }, 'name'))
const deptHBarData = computed(() => buildHBarData(deptDistribution.value, 'count', 'name', chartColors, { xS: 80, xE: 450, yT: 15, yB: 195 }))
const deptLineData = computed(() => buildLineData(deptDistribution.value, 'count', 'name', { xS: 50, xE: 450, yT: 20, yB: 200 }))

// 投诉类型分布 - 柱状/条形/折线
const typeVBarData = computed(() => buildVBarData(complaintTypeDistribution.value, 'count', typeColors, { xS: 50, xE: 450, yT: 20, yB: 200 }, 'name'))
const typeHBarData = computed(() => buildHBarData(complaintTypeDistribution.value, 'count', 'name', typeColors, { xS: 80, xE: 450, yT: 30, yB: 190 }))
const typeLineData = computed(() => buildLineData(complaintTypeDistribution.value, 'count', 'name', { xS: 50, xE: 450, yT: 20, yB: 200 }))

// 投诉原因分析 - 饼图/条形/折线
const reasonPieSlices = computed(() => {
  const r = 78
  const total = reasonDistribution.value.reduce((s, d) => s + d.count, 0)
  let start = -Math.PI / 2, slices = []
  reasonDistribution.value.forEach((d, i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: reasonColors[i]
    })
    start = end
  })
  return slices
})
const reasonHBarData = computed(() => buildHBarData(reasonDistribution.value, 'count', 'name', reasonColors, { xS: 80, xE: 450, yT: 10, yB: 200 }))
const reasonLineData = computed(() => buildLineData(reasonDistribution.value, 'count', 'name', { xS: 50, xE: 450, yT: 20, yB: 200 }))

// 门急诊/住院 - 饼图（2 slices：门诊总量 vs 住院总量）
const visitPieSlices = computed(() => {
  const r = 78
  const total = visitTypeData.value.outpatient + visitTypeData.value.inpatient
  const data = [
    { name: '门急诊', count: visitTypeData.value.outpatient, color: '#1890ff' },
    { name: '住院', count: visitTypeData.value.inpatient, color: '#722ed1' }
  ]
  let start = -Math.PI / 2, slices = []
  data.forEach((d) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: d.color,
      name: d.name,
      count: d.count
    })
    start = end
  })
  return slices
})
// 门急诊/住院 - 条形图（grouped horizontal）
const visitHBarData = computed(() => {
  const months = ['1月','2月','3月','4月','5月','6月']
  const outData = [120, 138, 152, 148, 162, 172]
  const inData = [38, 42, 56, 62, 68, 90]
  const max = 180
  const xS = 80, xE = 450, scale = (xE - xS) / max
  const yT = 15, yB = 195, n = months.length
  const slot = (yB - yT) / n
  const bh = slot * 0.35
  return months.map((label, i) => ({
    y: yT + i * slot + (slot - bh * 2) / 2,
    h: bh,
    label,
    outW: outData[i] * scale,
    inW: inData[i] * scale,
    outVal: outData[i],
    inVal: inData[i]
  }))
})
// 门急诊/住院 - 折线图（2 lines）
const visitLineData = computed(() => {
  const months = ['1月','2月','3月','4月','5月','6月']
  const outData = [120, 138, 152, 148, 162, 172]
  const inData = [38, 42, 56, 62, 68, 90]
  const max = 180
  const xS = 50, xE = 450, yT = 20, yB = 200, scale = (yB - yT) / max
  const n = months.length
  const slot = n > 1 ? (xE - xS) / (n - 1) : (xE - xS) / 2
  const outPoints = outData.map((v, i) => ({
    x: xS + (n > 1 ? i * slot : (xE - xS) / 2),
    y: yB - v * scale,
    label: months[i],
    value: v
  }))
  const inPoints = inData.map((v, i) => ({
    x: xS + (n > 1 ? i * slot : (xE - xS) / 2),
    y: yB - v * scale,
    label: months[i],
    value: v
  }))
  const outPath = outPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
  const inPath = inPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
  const yLabels = [180, 135, 90, 45, 0]
  return { outPoints, inPoints, outPath, inPath, yLabels }
})

// 年龄分布 - 饼图/条形/折线
const agePieSlices = computed(() => {
  const r = 78
  const total = ageDistribution.value.reduce((s, d) => s + d.count, 0)
  let start = -Math.PI / 2, slices = []
  ageDistribution.value.forEach((d, i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: ageColors[i]
    })
    start = end
  })
  return slices
})
const ageHBarData = computed(() => buildHBarData(ageDistribution.value, 'count', 'name', ageColors, { xS: 80, xE: 450, yT: 20, yB: 200 }))
const ageLineData = computed(() => buildLineData(ageDistribution.value, 'count', 'name', { xS: 50, xE: 450, yT: 20, yB: 200 }))

// 赔付金额分布 - 饼图/条形/折线
const compensationPieSlices = computed(() => {
  const r = 78
  const total = compensationDistribution.value.reduce((s, d) => s + d.count, 0)
  let start = -Math.PI / 2, slices = []
  compensationDistribution.value.forEach((d, i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: compensationColors[i]
    })
    start = end
  })
  return slices
})
const compensationHBarData = computed(() => buildHBarData(compensationDistribution.value, 'count', 'name', compensationColors, { xS: 80, xE: 450, yT: 30, yB: 190 }))
const compensationLineData = computed(() => buildLineData(compensationDistribution.value, 'count', 'name', { xS: 50, xE: 450, yT: 20, yB: 200 }))

// 涉及人员分布 - 柱状/条形/折线
const staffVBarData = computed(() => buildVBarData(staffDistribution.value, 'count', staffColors, { xS: 50, xE: 450, yT: 20, yB: 200 }, 'name'))
const staffHBarData = computed(() => buildHBarData(staffDistribution.value, 'count', 'name', staffColors, { xS: 80, xE: 450, yT: 30, yB: 190 }))
const staffLineData = computed(() => buildLineData(staffDistribution.value, 'count', 'name', { xS: 50, xE: 450, yT: 20, yB: 200 }))

// 投诉/表扬率 - 饼图（基于投诉/表扬率总和）
const ratioPieSlices = computed(() => {
  const r = 78
  const totalComplaint = ratioData.value.reduce((s, d) => s + d.complaint, 0)
  const totalPraise = ratioData.value.reduce((s, d) => s + d.praise, 0)
  const total = totalComplaint + totalPraise
  const data = [
    { name: '投诉率', count: totalComplaint, color: '#ff4d4f' },
    { name: '表扬率', count: totalPraise, color: '#52c41a' }
  ]
  let start = -Math.PI / 2, slices = []
  data.forEach((d) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: d.color,
      name: d.name,
      count: d.count
    })
    start = end
  })
  return slices
})
// 投诉/表扬率 - 柱状图（grouped bars per month）
const ratioBarData = computed(() => {
  const months = ratioData.value.map(d => d.month.slice(5) + '月')
  const complaintData = ratioData.value.map(d => d.complaint)
  const praiseData = ratioData.value.map(d => d.praise)
  const max = 10
  const xS = 50, xE = 450, yT = 20, yB = 200, scale = (yB - yT) / max
  const n = months.length
  const slot = (xE - xS) / n
  const bw = slot * 0.35
  return months.map((label, i) => ({
    label,
    x: xS + i * slot + (slot - bw * 2) / 2,
    bw,
    complaintY: yB - complaintData[i] * scale,
    complaintH: complaintData[i] * scale,
    praiseY: yB - praiseData[i] * scale,
    praiseH: praiseData[i] * scale,
    complaintVal: complaintData[i],
    praiseVal: praiseData[i]
  }))
})
// 投诉/表扬率 - 条形图（grouped horizontal）
const ratioHBarData = computed(() => {
  const months = ratioData.value.map(d => d.month.slice(5) + '月')
  const complaintData = ratioData.value.map(d => d.complaint)
  const praiseData = ratioData.value.map(d => d.praise)
  const max = 10
  const xS = 80, xE = 450, scale = (xE - xS) / max
  const yT = 15, yB = 195, n = months.length
  const slot = (yB - yT) / n
  const bh = slot * 0.35
  return months.map((label, i) => ({
    y: yT + i * slot + (slot - bh * 2) / 2,
    h: bh,
    label,
    complaintW: complaintData[i] * scale,
    praiseW: praiseData[i] * scale,
    complaintVal: complaintData[i],
    praiseVal: praiseData[i]
  }))
})

// === 新增：科室TOP排名 + 同比/环比对比 ===
const topDeptRankData = ref([
  { name: '门诊', count: 312 },
  { name: '急诊', count: 248 },
  { name: '内科', count: 187 },
  { name: '外科', count: 156 },
  { name: '儿科', count: 125 },
  { name: '妇产科', count: 87 },
  { name: '骨科', count: 75 },
  { name: '眼科', count: 42 }
])
const topDeptPieSlices = computed(() => {
  const r = 78
  const total = topDeptRankData.value.reduce((s, d) => s + d.count, 0)
  let start = -Math.PI / 2, slices = []
  topDeptRankData.value.forEach((d, i) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: topDeptColors[i]
    })
    start = end
  })
  return slices
})
const topDeptVBarData = computed(() => buildVBarData(topDeptRankData.value, 'count', topDeptColors, { xS: 50, xE: 450, yT: 20, yB: 200 }, 'name'))
const topDeptHBarData = computed(() => buildHBarData(topDeptRankData.value, 'count', 'name', topDeptColors, { xS: 80, xE: 450, yT: 15, yB: 195 }))
const topDeptLineData = computed(() => buildLineData(topDeptRankData.value, 'count', 'name', { xS: 50, xE: 450, yT: 20, yB: 200 }))

const yoyData = ref({
  categories: ['案件总量', '投诉量', '表扬量'],
  yoy: [1542, 1153, 334],
  mom: [1680, 1248, 386]
})
const yoyPieSlices = computed(() => {
  const r = 78
  const data = yoyData.value.categories.map((cat, i) => ({
    name: cat,
    count: yoyData.value.yoy[i] + yoyData.value.mom[i],
    color: topDeptColors[i]
  }))
  const total = data.reduce((s, d) => s + d.count, 0)
  let start = -Math.PI / 2, slices = []
  data.forEach((d) => {
    const angle = (d.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r, y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r, y2 = Math.sin(end) * r
    const la = angle > Math.PI ? 1 : 0
    slices.push({
      path: `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      color: d.color,
      name: d.name,
      count: d.count
    })
    start = end
  })
  return slices
})
// 同比/环比 - 柱状图（grouped）
const yoyBarData = computed(() => {
  const cats = yoyData.value.categories
  const yoy = yoyData.value.yoy
  const mom = yoyData.value.mom
  const max = Math.max(...mom, ...yoy) * 1.1
  const xS = 50, xE = 450, yT = 20, yB = 200, scale = (yB - yT) / max
  const n = cats.length
  const slot = (xE - xS) / n
  const bw = slot * 0.3
  return cats.map((label, i) => ({
    label,
    x: xS + i * slot + (slot - bw * 2) / 2,
    bw,
    yoyY: yB - yoy[i] * scale,
    yoyH: yoy[i] * scale,
    momY: yB - mom[i] * scale,
    momH: mom[i] * scale,
    yoyVal: yoy[i],
    momVal: mom[i]
  }))
})
// 同比/环比 - 条形图（grouped horizontal）
const yoyHBarData = computed(() => {
  const cats = yoyData.value.categories
  const yoy = yoyData.value.yoy
  const mom = yoyData.value.mom
  const max = Math.max(...mom, ...yoy) * 1.1
  const xS = 80, xE = 450, scale = (xE - xS) / max
  const yT = 30, yB = 210, n = cats.length
  const slot = (yB - yT) / n
  const bh = slot * 0.35
  return cats.map((label, i) => ({
    y: yT + i * slot + (slot - bh * 2) / 2,
    h: bh,
    label,
    yoyW: yoy[i] * scale,
    momW: mom[i] * scale,
    yoyVal: yoy[i],
    momVal: mom[i]
  }))
})
// 同比/环比 - 折线图（2 lines）
const yoyLineData = computed(() => {
  const cats = yoyData.value.categories
  const yoy = yoyData.value.yoy
  const mom = yoyData.value.mom
  const max = Math.max(...mom, ...yoy) * 1.1
  const xS = 50, xE = 450, yT = 20, yB = 200, scale = (yB - yT) / max
  const n = cats.length
  const slot = n > 1 ? (xE - xS) / (n - 1) : (xE - xS) / 2
  const yoyPoints = yoy.map((v, i) => ({
    x: xS + (n > 1 ? i * slot : (xE - xS) / 2),
    y: yB - v * scale,
    label: cats[i],
    value: v
  }))
  const momPoints = mom.map((v, i) => ({
    x: xS + (n > 1 ? i * slot : (xE - xS) / 2),
    y: yB - v * scale,
    label: cats[i],
    value: v
  }))
  const yoyPath = yoyPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
  const momPath = momPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
  const yLabels = Array.from({ length: 5 }, (_, i) => Math.round(max * (4 - i) / 4))
  return { yoyPoints, momPoints, yoyPath, momPath, yLabels }
})

// === 通用构建函数 ===
function buildVBarData (data, countKey, colors, opts, labelKey = null) {
  const { xS, xE, yT = 20, yB = 200 } = opts
  const vals = data.map(d => d[countKey])
  const max = Math.max(...vals) * 1.1
  const scale = (yB - yT) / Math.max(1, max)
  const n = data.length
  const slot = (xE - xS) / Math.max(1, n)
  const bw = slot * 0.55
  const bars = data.map((d, i) => ({
    x: xS + i * slot + (slot - bw) / 2,
    y: yB - d[countKey] * scale,
    w: bw,
    h: d[countKey] * scale,
    label: labelKey ? d[labelKey] : (d.label || d.name),
    value: d[countKey],
    color: colors[i % colors.length]
  }))
  const yLabels = Array.from({ length: 5 }, (_, i) => Math.round(max * (4 - i) / 4))
  return { bars, yLabels }
}

function buildHBarData (data, countKey, labelKey, colors, opts) {
  const { xS, xE, yT = 20, yB = 200 } = opts
  const vals = data.map(d => d[countKey])
  const max = Math.max(...vals) * 1.1
  const scale = (xE - xS) / Math.max(1, max)
  const n = data.length
  const slot = (yB - yT) / Math.max(1, n)
  const bh = slot * 0.6
  const bars = data.map((d, i) => ({
    y: yT + i * slot + (slot - bh) / 2,
    h: bh,
    w: d[countKey] * scale,
    label: d[labelKey] || d.label || d.name,
    value: d[countKey],
    color: colors[i % colors.length]
  }))
  return { bars }
}

function buildLineData (data, countKey, labelKey, opts) {
  const { xS, xE, yT = 20, yB = 200 } = opts
  const vals = data.map(d => d[countKey])
  const max = Math.max(...vals) * 1.1
  const scale = (yB - yT) / Math.max(1, max)
  const n = data.length
  const slot = n > 1 ? (xE - xS) / (n - 1) : (xE - xS) / 2
  const points = data.map((d, i) => ({
    x: xS + (n > 1 ? i * slot : (xE - xS) / 2),
    y: yB - d[countKey] * scale,
    label: d[labelKey] || d.label || d.name,
    value: d[countKey]
  }))
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
  const yLabels = Array.from({ length: 5 }, (_, i) => Math.round(max * (4 - i) / 4))
  return { points, linePath, yLabels }
}

// 详细表格
const detailTable = ref([
  { month: '2026-01', complaints: 98, resolved: 86, pending: 12, praise: 38, ratio: '2.58:1', compensation: '12,500', outpatient: 72, inpatient: 26, topReason: '服务态度差' },
  { month: '2026-02', complaints: 112, resolved: 96, pending: 16, praise: 42, ratio: '2.67:1', compensation: '15,800', outpatient: 82, inpatient: 30, topReason: '等候时间长' },
  { month: '2026-03', complaints: 118, resolved: 102, pending: 16, praise: 35, ratio: '3.37:1', compensation: '18,200', outpatient: 88, inpatient: 30, topReason: '沟通不足' },
  { month: '2026-04', complaints: 125, resolved: 108, pending: 17, praise: 44, ratio: '2.84:1', compensation: '16,500', outpatient: 92, inpatient: 33, topReason: '服务态度差' },
  { month: '2026-05', complaints: 132, resolved: 114, pending: 18, praise: 32, ratio: '4.13:1', compensation: '21,300', outpatient: 98, inpatient: 34, topReason: '诊疗效果不理想' },
  { month: '2026-06', complaints: 128, resolved: 98, pending: 30, praise: 38, ratio: '3.37:1', compensation: '18,600', outpatient: 94, inpatient: 34, topReason: '等候时间长' }
])

const exportReport = () => {
  const csv = [
    ['月份','投诉量','已处理','待处理','表扬量','投诉/表扬率','赔付金额(元)','门急诊','住院','主要投诉原因'],
    ...detailTable.value.map(r => [r.month, r.complaints, r.resolved, r.pending, r.praise, r.ratio, r.compensation, r.outpatient, r.inpatient, r.topReason])
  ].map(row => row.join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `案件统计看板_${new Date().toISOString().slice(0,10)}.csv`
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

.charts-row-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.chart-card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #eef0f4;
  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  flex-wrap: wrap;
  gap: 8px;
}

.chart-title { font-size: 14px; font-weight: 600; color: #1f2937; }
.chart-sub { font-size: 11px; color: #9ca3af; background: #f3f4f6; padding: 3px 8px; border-radius: 4px; font-weight: 500; }

.chart-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.chart-type-tabs {
  display: inline-flex;
  gap: 4px;
}
.chart-type-tab {
  padding: 3px 10px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #fff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}
.chart-type-tab:hover {
  color: #1890ff;
  border-color: #1890ff;
}
.chart-type-tab.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}
.charts-row-2 {
  grid-template-columns: 1fr 1fr;
}
.pie-legend-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 12px;
  align-content: center;
}

.chart-body { padding: 12px 16px; }

.pie-body { display: flex; align-items: center; gap: 12px; }
.pie-svg { width: 150px; height: 150px; flex-shrink: 0; }
.pie-total-num { font-size: 20px; font-weight: 700; fill: #1f2937; }
.pie-total-label { font-size: 10px; fill: #9ca3af; }

.line-svg { width: 100%; height: 180px; }
.bar-svg { width: 100%; height: 180px; }
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

.leg-bar { display: inline-block; width: 14px; height: 10px; border-radius: 2px; vertical-align: middle; }
.leg-bar.blue-grad { background: linear-gradient(180deg, #40a9ff, #1890ff); }
.leg-bar.purple-grad { background: linear-gradient(180deg, #9254de, #722ed1); }

.leg-tag { display: inline-block; padding: 2px 8px; border: 1px solid; border-radius: 4px; font-size: 10px; margin: 2px; color: #374151; }

.leg-inline { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: #6b7280; margin-right: 8px; }
.leg-dot-sm { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.leg-dot-sm.orange { background: #fa8c16; }

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
.data-table td:nth-child(3) { width: 70px; }
.data-table th:nth-child(4),
.data-table td:nth-child(4) { width: 70px; }
.data-table th:nth-child(5),
.data-table td:nth-child(5) { width: 70px; }
.data-table th:nth-child(6),
.data-table td:nth-child(6) { width: 70px; }
.data-table th:nth-child(7),
.data-table td:nth-child(7) { width: 100px; }
.data-table th:nth-child(8),
.data-table td:nth-child(8) { width: 110px; }
.data-table th:nth-child(9),
.data-table td:nth-child(9) { width: 70px; }
.data-table th:nth-child(10),
.data-table td:nth-child(10) { width: 70px; }
.data-table th:last-child,
.data-table td:last-child { 
  width: auto; 
  min-width: 120px;
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
