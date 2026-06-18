<template>
  <div class="dashboard-container">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <span class="breadcrumb-item">投诉管理</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">满意度调查看板</span>
    </div>

    <!-- 页面标题 + 操作 -->
    <div class="page-header-row">
      <div>
        <h1 class="page-title">满意度调查看板</h1>
        <div class="page-subtitle">多维度满意度统计 · 同比环比分析 · 智能文本分类 · 一键导出</div>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" @click="refreshData">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M23 4v6h-6M1 20v-6h6" stroke-width="2" stroke-linecap="round"/>
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke-width="2" stroke-linecap="round"/>
          </svg>
          刷新数据
        </button>
        <button class="btn btn-outline" @click="exportExcel">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-width="2"/>
            <polyline points="14 2 14 8 20 8" stroke-width="2"/>
            <line x1="8" y1="13" x2="16" y2="13" stroke-width="2"/>
            <line x1="8" y1="17" x2="16" y2="17" stroke-width="2"/>
          </svg>
          导出 Excel
        </button>
        <button class="btn btn-primary" @click="generateReport">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 11H7v6h2v-6zM13 11h-2v6h2v-6zM17 11h-2v6h2v-6z" stroke-width="2"/>
            <path d="M21 4v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2z" stroke-width="2"/>
          </svg>
          生成分析报告
        </button>
      </div>
    </div>

    <!-- 多维度筛选 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label>时间范围</label>
          <div class="btn-group">
            <button :class="['tab-btn', activeTime === 'quarter' ? 'active' : '']" @click="activeTime = 'quarter'">季度</button>
            <button :class="['tab-btn', activeTime === 'month' ? 'active' : '']" @click="activeTime = 'month'">月度</button>
            <button :class="['tab-btn', activeTime === 'custom' ? 'active' : '']" @click="activeTime = 'custom'">自定义</button>
          </div>
        </div>
        <div class="filter-item" v-if="activeTime === 'custom'">
          <label>日期区间</label>
          <input type="date" class="form-input" style="width: 140px;">
          <span class="sep">至</span>
          <input type="date" class="form-input" style="width: 140px;">
        </div>
        <div class="filter-item">
          <label>就诊类型</label>
          <select class="form-input" v-model="selectedVisitType">
            <option value="all">全部</option>
            <option value="outpatient">门诊</option>
            <option value="inpatient">住院</option>
          </select>
        </div>
        <div class="filter-item">
          <label>科室</label>
          <select class="form-input" v-model="selectedDept">
            <option value="all">全部科室</option>
            <option v-for="d in deptOptions" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
        <div class="filter-item">
          <label>病区</label>
          <select class="form-input" v-model="selectedWard">
            <option value="all">全部病区</option>
            <option v-for="w in wardOptions" :key="w" :value="w">{{ w }}</option>
          </select>
        </div>
        <div class="filter-item">
          <label>医生</label>
          <select class="form-input" v-model="selectedDoctor">
            <option value="all">全部医生</option>
            <option v-for="d in doctorOptions" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
      </div>
      <div class="filter-summary">
        <span class="summary-dot"></span>
        当前筛选条件下共 <b>{{ totalResponses }}</b> 份有效答卷 · 覆盖 <b>{{ deptCount }}</b> 个科室
      </div>
    </div>

    <!-- 核心指标卡 -->
    <div class="kpi-grid">
      <div class="kpi-card kpi-main">
        <div class="kpi-header">
          <span class="kpi-label">综合满意度评分</span>
          <span class="kpi-tag">Overall</span>
        </div>
        <div class="kpi-main-score">
          <span class="score-value">{{ overallScore }}</span>
          <span class="score-unit">/ 5.00</span>
        </div>
        <div class="kpi-meta">
          <div class="meta-item">
            <span class="meta-label">同比</span>
            <span class="meta-value up">+{{ yoyChange }}%</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-label">环比</span>
            <span class="meta-value down">-{{ momChange }}%</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-label">目标值</span>
            <span class="meta-value target">4.50</span>
          </div>
        </div>
        <div class="score-bar-wrap">
          <div class="score-bar-bg">
            <div class="score-bar-fill" :style="{ width: (overallScore / 5 * 100) + '%' }"></div>
            <div class="score-bar-target" :style="{ left: '90%' }"></div>
          </div>
          <div class="score-bar-labels">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">总答卷数</div>
        <div class="kpi-value">{{ totalResponses }}</div>
        <div class="kpi-trend up">↑ 较上期 +12.3%</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">门诊满意度</div>
        <div class="kpi-value blue">{{ outpatientScore }}</div>
        <div class="kpi-trend up">↑ +2.1% vs 上期</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">住院满意度</div>
        <div class="kpi-value green">{{ inpatientScore }}</div>
        <div class="kpi-trend up">↑ +1.5% vs 上期</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">反馈有效率</div>
        <div class="kpi-value orange">{{ feedbackValidRate }}%</div>
        <div class="kpi-trend down">↓ 较上期 -0.8%</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">文字反馈数</div>
        <div class="kpi-value purple">{{ textFeedbackCount }}</div>
        <div class="kpi-trend up">↑ 较上期 +35</div>
      </div>
    </div>

    <!-- 图表区：饼图 + 折线图 + 柱状图 -->
    <div class="chart-row">
      <!-- 饼图：各维度占比 / 满意度分布 -->
      <div class="chart-card">
        <div class="card-head">
          <h3 class="card-title-sm">满意度评分分布</h3>
          <span class="card-tag">饼图</span>
        </div>
        <div class="pie-chart-area">
          <svg viewBox="0 0 320 220" class="pie-svg">
            <defs>
              <linearGradient id="pieGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#52c41a"/>
                <stop offset="100%" stop-color="#389e0d"/>
              </linearGradient>
              <linearGradient id="pieGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#1890ff"/>
                <stop offset="100%" stop-color="#0050b3"/>
              </linearGradient>
              <linearGradient id="pieGrad3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fa8c16"/>
                <stop offset="100%" stop-color="#d46b08"/>
              </linearGradient>
              <linearGradient id="pieGrad4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ff4d4f"/>
                <stop offset="100%" stop-color="#cf1322"/>
              </linearGradient>
              <linearGradient id="pieGrad5" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#722ed1"/>
                <stop offset="100%" stop-color="#531dab"/>
              </linearGradient>
            </defs>
            <g transform="translate(110, 110)">
              <!-- 各扇区：基于比例数据 -->
              <path :d="pieSlices[0].d" fill="url(#pieGrad1)" stroke="#fff" stroke-width="2"/>
              <path :d="pieSlices[1].d" fill="url(#pieGrad2)" stroke="#fff" stroke-width="2"/>
              <path :d="pieSlices[2].d" fill="url(#pieGrad3)" stroke="#fff" stroke-width="2"/>
              <path :d="pieSlices[3].d" fill="url(#pieGrad4)" stroke="#fff" stroke-width="2"/>
              <path :d="pieSlices[4].d" fill="url(#pieGrad5)" stroke="#fff" stroke-width="2"/>
              <circle r="50" fill="#fff"/>
              <text text-anchor="middle" y="-5" class="pie-center-num">{{ totalResponses }}</text>
              <text text-anchor="middle" y="15" class="pie-center-label">总答卷</text>
            </g>
          </svg>
          <div class="pie-legend-list">
            <div class="legend-row" v-for="(item, i) in distributionData" :key="'dl-' + i">
              <span class="legend-dot" :style="{ background: pieColors[i] }"></span>
              <span class="legend-name">{{ item.name }}</span>
              <span class="legend-num">{{ item.count }} <span class="legend-pct">({{ item.percent }}%)</span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 折线图：月度趋势 -->
      <div class="chart-card chart-card-wide">
        <div class="card-head">
          <h3 class="card-title-sm">满意度月度趋势</h3>
          <div class="legend-inline">
            <span class="legend-line line-blue"></span>本期
            <span class="legend-line line-gray"></span>去年同期
            <span class="legend-dot dot-orange"></span>目标线
          </div>
        </div>
        <div class="line-chart-area">
          <svg viewBox="0 0 560 260" preserveAspectRatio="none" class="line-svg">
            <defs>
              <linearGradient id="lineGradBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1890ff" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#1890ff" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <!-- 网格线 -->
            <g stroke="#f0f2f5" stroke-width="1">
              <line v-for="i in 5" :key="'g-' + i" :x1="50" :x2="540" :y1="20 + (i-1) * 44" :y2="20 + (i-1) * 44" stroke-dasharray="3,3"/>
            </g>
            <!-- Y轴标签 -->
            <g font-size="10" fill="#9ca3af">
              <text v-for="(val, i) in ['5.0','4.5','4.0','3.5','3.0']" :key="'y-' + i" x="44" :y="28 + i*44" text-anchor="end">{{ val }}</text>
            </g>
            <!-- 目标线 -->
            <line x1="50" y1="42" x2="540" y2="42" stroke="#fa8c16" stroke-width="1.5" stroke-dasharray="6,4"/>
            <text x="542" y="46" font-size="10" fill="#fa8c16">目标 4.50</text>

            <!-- 面积（本期） -->
            <path :d="currentAreaPath" fill="url(#lineGradBlue)"/>
            <!-- 折线 - 本期 -->
            <path :d="currentLinePath" fill="none" stroke="#1890ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- 折线 - 去年同期 -->
            <path :d="lastYearPath" fill="none" stroke="#bfbfbf" stroke-width="1.8" stroke-dasharray="5,4" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- 数据点 -->
            <g v-for="(p, i) in currentPoints" :key="'cp-' + i">
              <circle :cx="p.x" :cy="p.y" r="5" fill="#fff" stroke="#1890ff" stroke-width="2"/>
              <text :x="p.x" :y="p.y - 10" text-anchor="middle" font-size="11" font-weight="600" fill="#1890ff">{{ p.val }}</text>
            </g>
            <!-- X轴 -->
            <g font-size="11" fill="#6b7280">
              <text v-for="(lbl, i) in monthLabels" :key="'x-' + i" :x="60 + i*48" y="250" text-anchor="middle">{{ lbl }}</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- 柱状图：各维度得分 -->
      <div class="chart-card">
        <div class="card-head">
          <h3 class="card-title-sm">各维度得分对比</h3>
          <span class="card-tag">柱状图</span>
        </div>
        <div class="bar-chart-area">
          <svg viewBox="0 0 320 260" preserveAspectRatio="none" class="bar-svg">
            <defs>
              <linearGradient id="barGradBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#40a9ff"/>
                <stop offset="100%" stop-color="#1890ff"/>
              </linearGradient>
              <linearGradient id="barGradGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#73d13d"/>
                <stop offset="100%" stop-color="#52c41a"/>
              </linearGradient>
            </defs>
            <g v-for="(d, i) in dimensionData" :key="'barg-' + i" :transform="'translate(' + (25 + i * 48) + ', 0)'">
              <rect x="0" :y="d.currentY" width="18" :height="d.currentH" rx="3" fill="url(#barGradBlue)"/>
              <rect x="22" :y="d.lastY" width="18" :height="d.lastH" rx="3" fill="url(#barGradGreen)" opacity="0.5"/>
              <text x="9" :y="d.currentY - 6" text-anchor="middle" font-size="10" font-weight="600" fill="#1890ff">{{ d.current }}</text>
              <text x="20" y="240" text-anchor="middle" font-size="10" fill="#6b7280" :transform="'translate(11,0)'">{{ d.name }}</text>
            </g>
          </svg>
          <div class="chart-legend-row">
            <span><span class="legend-dot dot-blue"></span>本期</span>
            <span><span class="legend-dot dot-green"></span>上期</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 科室排名 + 病区排名 -->
    <div class="chart-row">
      <div class="chart-card chart-card-xl">
        <div class="card-head">
          <h3 class="card-title-sm">科室满意度排名 TOP</h3>
          <div class="legend-inline">
            <span class="legend-dot dot-blue"></span>本期评分
            <span class="legend-dot dot-orange"></span>较上期变化
          </div>
        </div>
        <div class="rank-list">
          <div class="rank-row" v-for="(dept, idx) in deptRanking" :key="'rank-' + idx">
            <div class="rank-num" :class="'rank-' + (idx+1)">{{ idx+1 }}</div>
            <div class="rank-name">
              <span>{{ dept.name }}</span>
              <span class="rank-tag">{{ dept.type }}</span>
            </div>
            <div class="rank-bar-wrap">
              <div class="rank-bar-bg">
                <div class="rank-bar-fill" :class="idx < 3 ? 'gold' : (idx < deptRanking.length - 2 ? 'normal' : 'warn')" :style="{ width: (dept.score / 5 * 100) + '%' }"></div>
              </div>
            </div>
            <div class="rank-score">{{ dept.score }}</div>
            <div class="rank-change" :class="dept.change >= 0 ? 'up' : 'down'">
              {{ dept.change >= 0 ? '↑' : '↓' }} {{ Math.abs(dept.change) }}
            </div>
            <div class="rank-count">{{ dept.responses }} 份</div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="card-head">
          <h3 class="card-title-sm">病区满意度</h3>
          <span class="card-tag">排序</span>
        </div>
        <div class="ward-compact-list">
          <div class="ward-row" v-for="(w, i) in wardRanking" :key="'ward-' + i">
            <span class="ward-index">{{ i+1 }}</span>
            <span class="ward-name">{{ w.name }}</span>
            <div class="ward-bar-wrap">
              <div class="ward-bar-bg">
                <div class="ward-bar-fill" :style="{ width: (w.score / 5 * 100) + '%' }" :class="w.score >= 4.5 ? 'gold' : 'normal'"></div>
              </div>
            </div>
            <span class="ward-score">{{ w.score }}</span>
            <span class="ward-change" :class="w.change >= 0 ? 'up' : 'down'">{{ w.change >= 0 ? '+' : '' }}{{ w.change }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 医生排名（紧凑卡片网格） -->
    <div class="chart-card">
      <div class="card-head">
        <h3 class="card-title-sm">医生满意度排名 TOP 12</h3>
        <span class="card-tag">个人维度</span>
      </div>
      <div class="doctor-grid">
        <div class="doctor-card" v-for="(doc, i) in doctorRanking" :key="'doc-' + i">
          <div class="doctor-rank" :class="'dr-' + (i+1)">{{ i+1 }}</div>
          <div class="doctor-info">
            <div class="doctor-name">{{ doc.name }}</div>
            <div class="doctor-dept">{{ doc.dept }}</div>
          </div>
          <div class="doctor-score">{{ doc.score }}</div>
          <div class="doctor-sub">{{ doc.responses }} 份评价</div>
          <div class="doctor-change" :class="doc.change >= 0 ? 'up' : 'down'">
            {{ doc.change >= 0 ? '+' : '' }}{{ doc.change }}
          </div>
        </div>
      </div>
    </div>

    <!-- 问卷条目得分 + 文字反馈分类 + 低分项关联 -->
    <div class="chart-row">
      <!-- 问卷条目得分条形图 -->
      <div class="chart-card chart-card-xl">
        <div class="card-head">
          <h3 class="card-title-sm">问卷条目得分统计</h3>
          <span class="card-tag">横向条形图</span>
        </div>
        <div class="item-score-list">
          <div class="item-score-row" v-for="(item, i) in itemScores" :key="'item-' + i">
            <div class="item-index">{{ i+1 }}</div>
            <div class="item-name-wrap">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-desc">{{ item.desc }}</div>
            </div>
            <div class="item-bar-wrap">
              <div class="item-bar-bg">
                <div class="item-bar-fill" :class="item.score >= 4.5 ? 'high' : (item.score >= 4.0 ? 'mid' : 'low')" :style="{ width: (item.score / 5 * 100) + '%' }"></div>
                <div class="item-bar-target" style="left: 90%"></div>
              </div>
              <div class="item-bar-scale">
                <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>
            <div class="item-score-val" :class="item.score >= 4.5 ? 'high' : (item.score >= 4.0 ? 'mid' : 'low')">{{ item.score }}</div>
            <div class="item-change" :class="item.change >= 0 ? 'up' : 'down'">{{ item.change >= 0 ? '+' : '' }}{{ item.change }}</div>
            <div class="item-count">{{ item.count }} 评</div>
          </div>
        </div>
      </div>

      <!-- 文字反馈智能分类 -->
      <div class="chart-card">
        <div class="card-head">
          <h3 class="card-title-sm">文字反馈智能分类</h3>
          <span class="card-tag">AI 分析</span>
        </div>

        <div class="text-stats">
          <div class="text-stat-item praise">
            <div class="ts-num">{{ textStats.praise.count }}</div>
            <div class="ts-label">表扬</div>
            <div class="ts-pct">{{ textStats.praise.percent }}%</div>
          </div>
          <div class="text-stat-item suggest">
            <div class="ts-num">{{ textStats.suggest.count }}</div>
            <div class="ts-label">建议</div>
            <div class="ts-pct">{{ textStats.suggest.percent }}%</div>
          </div>
          <div class="text-stat-item critic">
            <div class="ts-num">{{ textStats.critic.count }}</div>
            <div class="ts-label">批评</div>
            <div class="ts-pct">{{ textStats.critic.percent }}%</div>
          </div>
        </div>

        <div class="text-category-title">按医疗维度归类</div>
        <div class="text-category-list">
          <div class="text-category-row" v-for="(c, i) in textCategories" :key="'tc-' + i">
            <span class="tc-dot" :style="{ background: c.color }"></span>
            <span class="tc-name">{{ c.name }}</span>
            <div class="tc-bar">
              <div class="tc-bar-fill" :style="{ width: c.percent + '%', background: c.color }"></div>
            </div>
            <span class="tc-num">{{ c.count }}</span>
          </div>
        </div>

        <div class="text-category-title">关键词提取（高频）</div>
        <div class="keyword-cloud">
          <span class="keyword" v-for="(k, i) in keywords" :key="'kw-' + i" :style="{ fontSize: k.size + 'px', color: k.color }">{{ k.word }}</span>
        </div>
      </div>
    </div>

    <!-- 低分项关联分析 -->
    <div class="chart-card">
      <div class="card-head">
        <h3 class="card-title-sm">低分项 - 问题反馈关联分析</h3>
        <div class="legend-inline">
          <span class="legend-dot dot-red"></span>关联负面反馈
          <span class="legend-dot dot-orange"></span>低于目标值
        </div>
      </div>
      <div class="low-score-list">
        <div class="low-score-card" v-for="(ls, i) in lowScoreItems" :key="'ls-' + i">
          <div class="ls-head">
            <div class="ls-rank">#{{ i+1 }}</div>
            <div class="ls-title">{{ ls.item }}</div>
            <div class="ls-score">{{ ls.score }}</div>
            <div class="ls-badges">
              <span class="badge badge-red">低于目标</span>
              <span class="badge badge-orange" v-if="ls.hasNegFeedback">关联负面反馈</span>
            </div>
          </div>
          <div class="ls-body">
            <div class="ls-summary">
              <b>问题摘要：</b>{{ ls.summary }}
            </div>
            <div class="ls-feedback">
              <div class="ls-feedback-label">关联文字反馈（{{ ls.feedbacks.length }} 条）</div>
              <div class="ls-feedback-list">
                <div class="feedback-quote" v-for="(f, j) in ls.feedbacks" :key="'fb-' + j">
                  <span class="quote-mark">"</span>
                  <span class="quote-text">{{ f.content }}</span>
                  <span class="quote-meta">— {{ f.dept }} · {{ f.date }}</span>
                </div>
              </div>
            </div>
            <div class="ls-insights">
              <div class="insight-item insight-red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <b>主要问题：</b>{{ ls.mainIssue }}
              </div>
              <div class="insight-item insight-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11H7v6h2v-6zM13 11h-2v6h2v-6zM17 11h-2v6h2v-6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <b>改进建议：</b>{{ ls.suggestion }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结构化分析报告 -->
    <div class="report-card">
      <div class="card-head">
        <h3 class="card-title-sm">结构化满意度分析报告</h3>
        <div class="report-actions">
          <button class="btn btn-outline btn-sm" @click="exportReport('pdf')">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-width="2"/><polyline points="14 2 14 8 20 8" stroke-width="2"/></svg>
            导出 PDF
          </button>
          <button class="btn btn-outline btn-sm" @click="exportReport('excel')">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><path d="M9 9l6 6M15 9l-6 6" stroke-width="2"/></svg>
            导出 Excel
          </button>
        </div>
      </div>

      <div class="report-content">
        <div class="report-section">
          <h4 class="report-h">一、总体概况</h4>
          <p class="report-p">
            在 <b>{{ reportTimeRange }}</b> 期间，本院共收集有效满意度问卷 <b>{{ totalResponses }}</b> 份，综合满意度评分为 <b class="score-mark">{{ overallScore }}</b> 分（满分 5.0 分），较上周期 <b class="up-mark">同比 +{{ yoyChange }}%</b>，较上月 <b class="down-mark">环比 -{{ momChange }}%</b>。
          </p>
          <p class="report-p">
            其中，门诊患者平均满意度为 <b>{{ outpatientScore }}</b> 分，住院患者平均满意度为 <b>{{ inpatientScore }}</b> 分，住院患者整体评价略高于门诊患者。
          </p>
        </div>

        <div class="report-section">
          <h4 class="report-h">二、时间分布趋势</h4>
          <p class="report-p">
            从近 12 个月数据来看，满意度整体呈<b class="up-mark">稳步上升</b>趋势，但在节假日高峰期出现短暂波动。主要风险点：<b>3 月、7 月</b>因就诊量激增，服务响应速度下降明显。
          </p>
        </div>

        <div class="report-section">
          <h4 class="report-h">三、科室排名与差距分析</h4>
          <p class="report-p">
            <b class="up-mark">满意度 TOP3：</b>
            <span v-for="(d, i) in deptRanking.slice(0,3)" :key="'top-' + i">{{ d.name }}（{{ d.score }}分）{{ i < 2 ? '、' : '' }}</span>。
          </p>
          <p class="report-p">
            <b class="down-mark">待改进 TOP3：</b>
            <span v-for="(d, i) in deptRanking.slice(-3)" :key="'low-' + i">{{ d.name }}（{{ d.score }}分）{{ i < 2 ? '、' : '' }}</span>。
            建议针对低分科室开展专项改进调研，重点关注「<b>等待时间</b>」「<b>沟通解释</b>」两个维度。
          </p>
        </div>

        <div class="report-section">
          <h4 class="report-h">四、条目维度关键发现</h4>
          <div class="report-item-grid">
            <div class="report-item item-highlight-blue">
              <span class="report-item-icon">✓</span>
              <div>
                <div class="report-item-label">亮点项目</div>
                <div class="report-item-val"><b>医护人员服务态度</b>（4.68 分），持续保持高位</div>
              </div>
            </div>
            <div class="report-item item-highlight-orange">
              <span class="report-item-icon">!</span>
              <div>
                <div class="report-item-label">关注项目</div>
                <div class="report-item-val"><b>挂号/缴费便捷性</b>（3.85 分），较上期下降 0.12</div>
              </div>
            </div>
            <div class="report-item item-highlight-red">
              <span class="report-item-icon">!</span>
              <div>
                <div class="report-item-label">预警项目</div>
                <div class="report-item-val"><b>食堂餐饮质量</b>（3.42 分），关联 18 条负面反馈</div>
              </div>
            </div>
            <div class="report-item item-highlight-green">
              <span class="report-item-icon">↑</span>
              <div>
                <div class="report-item-label">最大进步</div>
                <div class="report-item-val"><b>住院环境整洁度</b>（+0.25 分），整改效果显著</div>
              </div>
            </div>
          </div>
        </div>

        <div class="report-section">
          <h4 class="report-h">五、患者文字反馈分析</h4>
          <p class="report-p">
            本期共收到文字反馈 <b>{{ textFeedbackCount }}</b> 条，经智能分类：<b class="up-mark">表扬 {{ textStats.praise.count }} 条（{{ textStats.praise.percent }}%）</b>、<b>建议 {{ textStats.suggest.count }} 条（{{ textStats.suggest.percent }}%）</b>、<b class="down-mark">批评 {{ textStats.critic.count }} 条（{{ textStats.critic.percent }}%）</b>。
          </p>
          <p class="report-p">
            高频关键词：<span v-for="(k, i) in keywords.slice(0, 8)" :key="'kwrep-' + i" class="kw-inline">{{ k.word }}</span>
          </p>
        </div>

        <div class="report-section">
          <h4 class="report-h">六、改进建议与下一步行动</h4>
          <ol class="report-ol">
            <li><b>短期（1 个月内）：</b>优化挂号/缴费流程，部署自助机高峰时段引导员；提升食堂餐品质量与温度控制。</li>
            <li><b>中期（3-6 个月）：</b>对低分科室开展专项访谈调研，建立「满意度 - 服务质量」联动改进机制。</li>
            <li><b>长期（年度规划）：</b>持续推进医院整体服务体系建设，结合满意度数据与投诉管理、问卷反馈形成闭环。</li>
          </ol>
        </div>

        <div class="report-footer">
          <span>— 报告生成时间：{{ reportGeneratedTime }} —</span>
        </div>
      </div>
    </div>

    <div class="footer-note">
      数据基于内部满意度问卷系统 · 如需更细粒度数据或自定义报表，请联系系统管理员
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTime = ref('quarter')
const selectedVisitType = ref('all')
const selectedDept = ref('all')
const selectedWard = ref('all')
const selectedDoctor = ref('all')

const totalResponses = ref(2856)
const overallScore = ref(4.42)
const outpatientScore = ref(4.38)
const inpatientScore = ref(4.48)
const feedbackValidRate = ref(96.8)
const textFeedbackCount = ref(1284)
const yoyChange = ref(3.2)
const momChange = ref(0.8)
const deptCount = ref(24)

const deptOptions = ref(['内科', '外科', '妇产科', '儿科', '骨科', '急诊科', '放射科', '检验科', '眼科', '皮肤科', '心血管内科', '肿瘤科'])
const wardOptions = ref(['住院一区', '住院二区', '住院三区', 'ICU', '产科病区', '儿科病区'])
const doctorOptions = ref(['王医生', '李医生', '张医生', '刘医生', '陈医生', '杨医生'])

// 饼图数据：满意度分布（非常满意/满意/一般/不满意/非常不满意）
const distributionData = ref([
  { name: '非常满意 (5分)', count: 1142, percent: 40 },
  { name: '满意 (4分)', count: 857, percent: 30 },
  { name: '一般 (3分)', count: 428, percent: 15 },
  { name: '不满意 (2分)', count: 286, percent: 10 },
  { name: '非常不满意 (1分)', count: 143, percent: 5 }
])

const pieColors = ['#52c41a', '#1890ff', '#fa8c16', '#ff4d4f', '#722ed1']

// 计算饼图扇区（SVG path）
const pieSlices = computed(() => {
  const r = 90
  const total = distributionData.value.reduce((s, i) => s + i.count, 0)
  let start = -Math.PI / 2
  return distributionData.value.map((item) => {
    const angle = (item.count / total) * Math.PI * 2
    const end = start + angle
    const x1 = Math.cos(start) * r
    const y1 = Math.sin(start) * r
    const x2 = Math.cos(end) * r
    const y2 = Math.sin(end) * r
    const largeArc = angle > Math.PI ? 1 : 0
    const d = `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
    start = end
    return { d, color: '' }
  })
})

// 月度趋势
const monthLabels = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
const currentPoints = computed(() => {
  const vals = [4.21, 4.28, 4.15, 4.32, 4.38, 4.41, 4.30, 4.35, 4.42, 4.45, 4.48, 4.42]
  const yMin = 3.0, yMax = 5.0
  return vals.map((v, i) => ({
    x: 60 + i * 48,
    y: 20 + (1 - (v - yMin) / (yMax - yMin)) * 176,
    val: v
  }))
})

const currentLinePath = computed(() => {
  return currentPoints.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

const currentAreaPath = computed(() => {
  const pts = currentPoints.value
  if (!pts.length) return ''
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  return `${line} L ${pts[pts.length-1].x} 196 L ${pts[0].x} 196 Z`
})

const lastYearPath = computed(() => {
  const vals = [4.10, 4.15, 4.05, 4.22, 4.28, 4.32, 4.22, 4.25, 4.30, 4.35, 4.38, 4.28]
  const yMin = 3.0, yMax = 5.0
  const pts = vals.map((v, i) => ({
    x: 60 + i * 48,
    y: 20 + (1 - (v - yMin) / (yMax - yMin)) * 176
  }))
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

// 各维度得分对比（双柱）
const dimensionData = computed(() => {
  const items = [
    { name: '服务态度', current: 4.68, last: 4.55 },
    { name: '医疗技术', current: 4.52, last: 4.45 },
    { name: '就医流程', current: 3.85, last: 3.97 },
    { name: '环境设施', current: 4.18, last: 3.93 },
    { name: '收费合理', current: 4.25, last: 4.10 },
    { name: '医德医风', current: 4.60, last: 4.58 }
  ]
  const yMin = 3.0, yMax = 5.0
  const baseY = 30
  const maxH = 180
  return items.map((it) => {
    const currentH = ((it.current - yMin) / (yMax - yMin)) * maxH
    const lastH = ((it.last - yMin) / (yMax - yMin)) * maxH
    return {
      name: it.name,
      current: it.current,
      last: it.last,
      currentY: baseY + (maxH - currentH),
      currentH,
      lastY: baseY + (maxH - lastH),
      lastH
    }
  })
})

// 科室排名
const deptRanking = ref([
  { name: '心血管内科', type: '住院', score: 4.72, change: 0.15, responses: 285 },
  { name: '眼科', type: '门诊', score: 4.68, change: 0.08, responses: 198 },
  { name: '儿科', type: '门诊', score: 4.65, change: 0.21, responses: 342 },
  { name: '妇产科', type: '门诊/住院', score: 4.58, change: 0.12, responses: 268 },
  { name: '骨科', type: '住院', score: 4.52, change: 0.05, responses: 156 },
  { name: '皮肤科', type: '门诊', score: 4.48, change: -0.08, responses: 128 },
  { name: '内科', type: '门诊', score: 4.45, change: 0.03, responses: 412 },
  { name: '外科', type: '门诊/住院', score: 4.38, change: 0.10, responses: 298 },
  { name: '放射科', type: '辅助', score: 4.32, change: -0.05, responses: 165 },
  { name: '检验科', type: '辅助', score: 4.25, change: -0.12, responses: 208 },
  { name: '急诊科', type: '急诊', score: 3.95, change: -0.18, responses: 156 },
  { name: '肿瘤科', type: '住院', score: 3.82, change: -0.22, responses: 140 }
])

// 病区排名
const wardRanking = ref([
  { name: '住院一区（内科）', score: 4.62, change: 0.12 },
  { name: '产科病区', score: 4.55, change: 0.08 },
  { name: '住院二区（外科）', score: 4.48, change: 0.15 },
  { name: '儿科病区', score: 4.42, change: -0.05 },
  { name: 'ICU', score: 4.35, change: 0.02 },
  { name: '住院三区（综合）', score: 4.28, change: -0.10 }
])

// 医生排名
const doctorRanking = ref([
  { name: '王医生', dept: '心血管内科', score: 4.82, responses: 128, change: 0.12 },
  { name: '李医生', dept: '眼科', score: 4.78, responses: 98, change: 0.08 },
  { name: '张医生', dept: '儿科', score: 4.75, responses: 156, change: 0.15 },
  { name: '刘医生', dept: '妇产科', score: 4.68, responses: 112, change: 0.05 },
  { name: '陈医生', dept: '骨科', score: 4.62, responses: 88, change: 0.03 },
  { name: '杨医生', dept: '皮肤科', score: 4.58, responses: 72, change: -0.05 },
  { name: '周医生', dept: '内科', score: 4.55, responses: 135, change: 0.02 },
  { name: '吴医生', dept: '外科', score: 4.48, responses: 108, change: 0.10 },
  { name: '郑医生', dept: '肿瘤科', score: 4.35, responses: 68, change: -0.08 },
  { name: '冯医生', dept: '急诊科', score: 4.12, responses: 82, change: -0.15 },
  { name: '何医生', dept: '放射科', score: 4.05, responses: 55, change: -0.12 },
  { name: '林医生', dept: '检验科', score: 3.92, responses: 48, change: -0.18 }
])

// 问卷条目得分（条形）
const itemScores = ref([
  { name: '医护人员服务态度', desc: '门诊/住院接诊时医护人员的礼貌与耐心', score: 4.68, change: 0.08, count: 2856 },
  { name: '医生专业水平与解释', desc: '医生的专业能力及对病情的解释清晰度', score: 4.62, change: 0.05, count: 2856 },
  { name: '医德医风与职业道德', desc: '医护人员廉洁行医、尊重患者的表现', score: 4.60, change: 0.02, count: 2856 },
  { name: '护士护理响应速度', desc: '呼叫护士后的响应时间与处理效率', score: 4.48, change: 0.10, count: 1428 },
  { name: '住院环境整洁度', desc: '病房卫生、床品更换、公共区域清洁', score: 4.45, change: 0.25, count: 1428 },
  { name: '检查/检验流程效率', desc: '从开单到完成检查的等待时间与指引', score: 4.35, change: -0.03, count: 2580 },
  { name: '药师用药指导质量', desc: '药房取药时用药说明的清楚度', score: 4.28, change: 0.05, count: 2580 },
  { name: '收费合理与透明度', desc: '对费用合理性、透明度的评价', score: 4.20, change: -0.02, count: 2580 },
  { name: '预约挂号便捷性', desc: '电话/APP/现场挂号的便利程度', score: 3.85, change: -0.12, count: 2856 },
  { name: '食堂餐饮质量（住院）', desc: '住院患者对餐食口味、温度、多样性的评价', score: 3.42, change: -0.18, count: 1428 }
])

// 文字反馈分类统计
const textStats = ref({
  praise: { count: 642, percent: 50 },
  suggest: { count: 450, percent: 35 },
  critic: { count: 192, percent: 15 }
})

const textCategories = ref([
  { name: '服务态度', count: 385, percent: 30, color: '#1890ff' },
  { name: '医疗质量', count: 285, percent: 22, color: '#52c41a' },
  { name: '就医流程', count: 218, percent: 17, color: '#fa8c16' },
  { name: '环境设施', count: 185, percent: 14, color: '#722ed1' },
  { name: '收费问题', count: 110, percent: 9, color: '#13c2c2' },
  { name: '医德医风', count: 101, percent: 8, color: '#fa541c' }
])

const keywords = ref([
  { word: '态度好', size: 18, color: '#52c41a' },
  { word: '专业', size: 16, color: '#389e0d' },
  { word: '耐心', size: 17, color: '#73d13d' },
  { word: '等待时间长', size: 15, color: '#ff4d4f' },
  { word: '环境整洁', size: 14, color: '#1890ff' },
  { word: '挂号麻烦', size: 13, color: '#fa541c' },
  { word: '收费清晰', size: 12, color: '#13c2c2' },
  { word: '解释清楚', size: 15, color: '#52c41a' },
  { word: '餐饮质量', size: 13, color: '#ff4d4f' },
  { word: '护士温柔', size: 14, color: '#722ed1' },
  { word: '响应快', size: 12, color: '#1890ff' },
  { word: '排队久', size: 13, color: '#fa8c16' },
  { word: '自助机', size: 11, color: '#8c8c8c' },
  { word: '检查预约', size: 12, color: '#8c8c8c' },
  { word: '停车', size: 11, color: '#fa541c' },
  { word: '交通便利', size: 10, color: '#52c41a' }
])

// 低分项关联分析
const lowScoreItems = ref([
  {
    item: '食堂餐饮质量（住院）',
    score: 3.42,
    hasNegFeedback: true,
    summary: '住院患者对医院食堂餐饮评价普遍偏低，主要集中在「口味单一」「温度不够」「品种重复」三类问题。',
    mainIssue: '口味单一、温度控制不佳、菜单长期未更新',
    suggestion: '建议引入市场化餐饮承包商竞争机制，建立「每周菜单公示+患者反馈」闭环，24小时内响应调整',
    feedbacks: [
      { content: '住院期间饭菜温度不够，术后病人希望能吃到温热的餐食。', dept: '住院二区', date: '2026-06-08' },
      { content: '菜单连续一周几乎一样，主食单一缺乏选择，希望增加粥类、面食等易消化食物。', dept: '住院三区', date: '2026-06-10' },
      { content: '病房餐食送达时间不固定，有时错过饭点。', dept: '儿科病区', date: '2026-06-11' }
    ]
  },
  {
    item: '预约挂号便捷性',
    score: 3.85,
    hasNegFeedback: true,
    summary: '门诊患者普遍反映挂号流程不够顺畅，自助机高峰期排队严重，APP 预约操作繁琐。',
    mainIssue: '自助机数量及位置不合理、APP 流程较复杂、高峰时段缺乏引导',
    suggestion: '在高峰时段（上午 7:30-9:30）部署流动引导员；简化 APP 预约流程至「3步以内」，增加语音预约',
    feedbacks: [
      { content: '自助机经常打不出挂号单，来回折腾半小时才看上病，希望安排专人引导。', dept: '门诊大厅', date: '2026-06-05' },
      { content: '挂号 APP 操作太复杂，老年人不会用。', dept: '内科门诊', date: '2026-06-07' },
      { content: '预约号经常被抢满，现场又只能挂后面的号，体验很差。', dept: '眼科门诊', date: '2026-06-09' }
    ]
  },
  {
    item: '急诊科响应体验',
    score: 3.95,
    hasNegFeedback: true,
    summary: '夜间与节假日急诊等待时间过长，分诊评估与信息沟通需提升。',
    mainIssue: '夜间急诊医生配置不足、候诊区信息公开不够、家属情绪安抚不到位',
    suggestion: '优化夜间急诊轮班配置；在急诊候诊区增设屏幕显示当前就诊进度与预计等待时间',
    feedbacks: [
      { content: '晚上 11 点急诊等了一个多小时才看上，期间完全无人告知进度。', dept: '急诊科', date: '2026-06-06' },
      { content: '急诊态度太急躁，能理解忙但希望多一点沟通。', dept: '急诊科', date: '2026-06-08' }
    ]
  },
  {
    item: '检查/检验流程效率',
    score: 4.35,
    hasNegFeedback: false,
    summary: '整体评分中上，但部分检查科室预约周期较长，存在二次返院的不便。',
    mainIssue: '部分影像检查预约需等待 3-5 天，跨楼层指引不足',
    suggestion: '优化检查科排班与设备时段调度；推进「医技预约平台」让预约情况更透明',
    feedbacks: [
      { content: '做 CT 需要等 3 天，能否当日完成？对上班族来说不太方便。', dept: '放射科', date: '2026-06-09' },
      { content: '一楼抽血三楼拍片来回跑，希望能在每层楼都有清晰的指引图。', dept: '检验科', date: '2026-06-10' }
    ]
  }
])

const reportTimeRange = ref('2026 年 Q2（4 月 - 6 月）')
const reportGeneratedTime = computed(() => new Date().toLocaleString('zh-CN'))

// 操作
const refreshData = () => {
  totalResponses.value = Math.floor(2800 + Math.random() * 100)
  overallScore.value = (4.3 + Math.random() * 0.2).toFixed(2)
}

const exportExcel = () => {
  alert('已生成 Excel 报表文件（模拟）：满意度统计_' + new Date().toISOString().slice(0,10) + '.xlsx')
}

const generateReport = () => {
  alert('满意度结构化分析报告生成完成！可在下方查看完整报告内容')
  document.querySelector('.report-card')?.scrollIntoView({ behavior: 'smooth' })
}

const exportReport = (fmt) => {
  alert('正在导出为 ' + fmt.toUpperCase() + ' 格式：满意度分析报告_' + new Date().toISOString().slice(0,10) + '.' + fmt)
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f0f2f5;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6b7280;
}

.breadcrumb-separator { color: #9ca3af; }
.breadcrumb-item.active { color: #1890ff; font-weight: 500; }

.page-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 6px 0;
  letter-spacing: 0.5px;
}

.page-subtitle {
  font-size: 12px;
  color: #6b7280;
}

.page-actions {
  display: flex;
  gap: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 14px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  white-space: nowrap;
}

.btn-icon { width: 14px; height: 14px; }

.btn-primary {
  background: linear-gradient(135deg, #1890ff 0%, #0050b3 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.25);
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(24,144,255,0.35); }

.btn-outline {
  background: #fff;
  border: 1px solid #d9d9d9;
  color: #374151;
}
.btn-outline:hover {
  border-color: #1890ff;
  color: #1890ff;
  background: #e6f7ff;
}

.btn-sm {
  height: 28px;
  padding: 0 10px;
  font-size: 12px;
}

/* 筛选卡片 */
.filter-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-item label {
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  white-space: nowrap;
}

.btn-group {
  display: inline-flex;
  background: #f3f4f6;
  border-radius: 6px;
  padding: 2px;
}

.tab-btn {
  padding: 5px 14px;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  font-weight: 500;
}

.tab-btn.active {
  background: #fff;
  color: #1890ff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.form-input {
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  background: #fff;
  color: #374151;
  min-width: 100px;
}

.form-input:focus { border-color: #1890ff; }

.sep {
  font-size: 12px;
  color: #6b7280;
}

.filter-summary {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #e5e7eb;
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-summary b { color: #1890ff; font-weight: 600; }

.summary-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #52c41a;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* KPI 网格 */
.kpi-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
}

.kpi-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px 18px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #eef0f4;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

.kpi-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
}

.kpi-value {
  font-size: 26px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.kpi-value.blue { color: #1890ff; }
.kpi-value.green { color: #52c41a; }
.kpi-value.orange { color: #fa8c16; }
.kpi-value.purple { color: #722ed1; }

.kpi-trend {
  font-size: 11px;
  margin-top: 6px;
  font-weight: 500;
}
.kpi-trend.up { color: #389e0d; }
.kpi-trend.down { color: #cf1322; }

/* 主卡 */
.kpi-main {
  background: linear-gradient(135deg, #fff 0%, #f0f9ff 100%);
  border: 1px solid #bae7ff;
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kpi-tag {
  padding: 2px 10px;
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
  font-size: 11px;
  border-radius: 20px;
  font-weight: 600;
}

.kpi-main-score {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 8px 0 12px 0;
}

.score-value {
  font-size: 48px;
  font-weight: 700;
  color: #1890ff;
  letter-spacing: -1.5px;
  line-height: 1;
  background: linear-gradient(135deg, #1890ff 0%, #0050b3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-unit {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.kpi-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 10px;
  border-top: 1px dashed #d9ecff;
  border-bottom: 1px dashed #d9ecff;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-size: 10px;
  color: #9ca3af;
}

.meta-value {
  font-size: 14px;
  font-weight: 700;
}

.meta-value.up { color: #389e0d; }
.meta-value.down { color: #cf1322; }
.meta-value.target { color: #fa8c16; }

.meta-divider {
  width: 1px;
  height: 24px;
  background: #e5e7eb;
}

.score-bar-wrap { margin-top: 4px; }

.score-bar-bg {
  position: relative;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: visible;
}

.score-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%);
  border-radius: 4px;
  transition: width 0.6s;
}

.score-bar-target {
  position: absolute;
  top: -3px;
  width: 2px;
  height: 14px;
  background: #fa8c16;
  border-radius: 1px;
}

.score-bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #9ca3af;
  margin-top: 4px;
}

/* 图表行 */
.chart-row {
  display: grid;
  gap: 12px;
  margin-bottom: 14px;
}

.chart-row:first-of-type {
  grid-template-columns: 1fr 1.6fr 1fr;
}

.chart-row:nth-of-type(2) {
  grid-template-columns: 2fr 1fr;
}

.chart-row:nth-of-type(4) {
  grid-template-columns: 2fr 1fr;
}

.chart-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px 18px;
  border: 1px solid #eef0f4;
}

.chart-card-wide { min-width: 0; }
.chart-card-xl { min-width: 0; }

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f4f6;
}

.card-title-sm {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-tag {
  font-size: 11px;
  padding: 2px 8px;
  background: #f0f9ff;
  color: #1890ff;
  border-radius: 4px;
  font-weight: 500;
}

.legend-inline {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: #6b7280;
}

.legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  vertical-align: middle;
  margin-right: 3px;
}

.dot-blue { background: #1890ff; }
.dot-green { background: #52c41a; }
.dot-orange { background: #fa8c16; }
.dot-red { background: #ff4d4f; }

.legend-line {
  display: inline-block;
  width: 14px;
  height: 3px;
  border-radius: 2px;
  vertical-align: middle;
  margin-right: 3px;
}
.line-blue { background: #1890ff; }
.line-gray { background: #bfbfbf; }
.bar-blue { background: linear-gradient(180deg, #40a9ff, #1890ff); }
.bar-green { background: linear-gradient(180deg, #73d13d, #52c41a); }

/* 饼图 */
.pie-chart-area {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 12px;
  align-items: center;
}

.pie-svg {
  width: 100%;
  height: 220px;
}

.pie-center-num {
  font-size: 28px;
  font-weight: 700;
  fill: #1890ff;
}
.pie-center-label {
  font-size: 10px;
  fill: #9ca3af;
}

.pie-legend-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-name {
  color: #374151;
  flex: 1;
}

.legend-num {
  font-weight: 600;
  color: #1f2937;
}

.legend-pct {
  color: #9ca3af;
  font-size: 11px;
  font-weight: 500;
}

/* 折线图 */
.line-chart-area { width: 100%; }
.line-svg { width: 100%; height: 260px; }

/* 柱状图 */
.bar-chart-area { width: 100%; }
.bar-svg { width: 100%; height: 260px; }

.chart-legend-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 11px;
  color: #6b7280;
  margin-top: 8px;
}

/* 科室排名 */
.rank-list { display: flex; flex-direction: column; gap: 6px; }

.rank-row {
  display: grid;
  grid-template-columns: 32px 120px 1fr 60px 80px 70px;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  transition: background 0.2s;
  font-size: 12px;
}

.rank-row:hover { background: #f9fafb; }

.rank-num {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  color: #fff;
  background: #d9d9d9;
}

.rank-1 { background: linear-gradient(135deg, #faad14, #d48806); }
.rank-2 { background: linear-gradient(135deg, #bfbfbf, #8c8c8c); }
.rank-3 { background: linear-gradient(135deg, #d48806, #ad6800); }
.rank-4, .rank-5, .rank-6, .rank-7, .rank-8 { background: #52c41a; }
.rank-9, .rank-10 { background: #fa8c16; }
.rank-11, .rank-12 { background: #ff4d4f; }

.rank-name {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rank-name > span:first-child {
  font-weight: 600;
  color: #1f2937;
  font-size: 13px;
}

.rank-tag {
  font-size: 10px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 1px 6px;
  border-radius: 3px;
  display: inline-block;
  width: fit-content;
}

.rank-bar-wrap { padding: 0 6px; }
.rank-bar-bg { height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden; }

.rank-bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s; }
.rank-bar-fill.gold { background: linear-gradient(90deg, #faad14, #d48806); }
.rank-bar-fill.normal { background: linear-gradient(90deg, #1890ff, #40a9ff); }
.rank-bar-fill.warn { background: linear-gradient(90deg, #fa541c, #ff7a45); }

.rank-score { font-size: 14px; font-weight: 700; color: #1890ff; text-align: center; }
.rank-change { font-size: 12px; font-weight: 600; text-align: center; }
.rank-change.up { color: #389e0d; }
.rank-change.down { color: #cf1322; }
.rank-count { font-size: 11px; color: #9ca3af; text-align: right; }

/* 病区简洁排名 */
.ward-compact-list { display: flex; flex-direction: column; gap: 6px; }
.ward-row {
  display: grid;
  grid-template-columns: 28px 100px 1fr 50px 50px;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 12px;
  transition: background 0.2s;
}
.ward-row:hover { background: #f9fafb; }

.ward-index {
  font-weight: 700;
  color: #1890ff;
  text-align: center;
}

.ward-name { color: #374151; font-weight: 500; font-size: 12px; }
.ward-bar-wrap { min-width: 0; }
.ward-bar-bg { height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden; }
.ward-bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s; }
.ward-bar-fill.gold { background: linear-gradient(90deg, #faad14, #d48806); }
.ward-bar-fill.normal { background: linear-gradient(90deg, #1890ff, #40a9ff); }

.ward-score { font-size: 13px; font-weight: 700; color: #1f2937; text-align: center; }
.ward-change { font-size: 11px; font-weight: 600; text-align: center; }
.ward-change.up { color: #389e0d; }
.ward-change.down { color: #cf1322; }

/* 医生卡片网格 */
.doctor-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.doctor-card {
  background: linear-gradient(135deg, #fafbfc 0%, #fff 100%);
  border: 1px solid #eef0f4;
  border-radius: 8px;
  padding: 12px;
  position: relative;
  transition: all 0.2s;
}

.doctor-card:hover {
  border-color: #91d5ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
}

.doctor-rank {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8c8c8c;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

.dr-1 { background: linear-gradient(135deg, #faad14, #d48806); }
.dr-2 { background: linear-gradient(135deg, #bfbfbf, #595959); }
.dr-3 { background: linear-gradient(135deg, #d48806, #ad6800); }

.doctor-info { margin-bottom: 8px; padding-left: 6px; }
.doctor-name { font-size: 14px; font-weight: 700; color: #1f2937; }
.doctor-dept { font-size: 11px; color: #9ca3af; margin-top: 2px; }
.doctor-score { font-size: 22px; font-weight: 700; color: #1890ff; text-align: center; letter-spacing: -0.5px; }
.doctor-sub { font-size: 11px; color: #9ca3af; text-align: center; margin-top: 2px; }

.doctor-change {
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  padding: 3px 0;
  margin-top: 8px;
  border-top: 1px dashed #e5e7eb;
}
.doctor-change.up { color: #389e0d; }
.doctor-change.down { color: #cf1322; }

/* 条目得分条形图 */
.item-score-list {
  display: flex;
  flex-direction: column;
}

.item-score-row {
  display: grid;
  grid-template-columns: 30px 220px 1fr 50px 60px 70px;
  gap: 12px;
  align-items: center;
  padding: 10px 6px;
  border-bottom: 1px dashed #f3f4f6;
  font-size: 12px;
  transition: background 0.2s;
}

.item-score-row:hover { background: #fafbfc; }
.item-score-row:last-child { border-bottom: none; }

.item-index {
  font-size: 13px;
  font-weight: 700;
  color: #9ca3af;
  text-align: center;
}

.item-name-wrap { min-width: 0; }
.item-name { font-weight: 600; color: #1f2937; font-size: 13px; margin-bottom: 2px; }
.item-desc { font-size: 11px; color: #9ca3af; line-height: 1.4; }

.item-bar-wrap { padding: 0 8px; }
.item-bar-bg {
  position: relative;
  height: 10px;
  background: #f3f4f6;
  border-radius: 5px;
  overflow: visible;
  margin-bottom: 3px;
}

.item-bar-fill { height: 100%; border-radius: 5px; transition: width 0.6s; }
.item-bar-fill.high { background: linear-gradient(90deg, #52c41a, #73d13d); }
.item-bar-fill.mid { background: linear-gradient(90deg, #1890ff, #40a9ff); }
.item-bar-fill.low { background: linear-gradient(90deg, #fa541c, #ff7a45); }

.item-bar-target {
  position: absolute;
  top: -3px;
  width: 2px;
  height: 16px;
  background: #fa8c16;
  border-radius: 1px;
}

.item-bar-scale {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: #bfbfbf;
}

.item-score-val {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
.item-score-val.high { color: #52c41a; }
.item-score-val.mid { color: #1890ff; }
.item-score-val.low { color: #fa541c; }

.item-change { font-size: 12px; font-weight: 600; text-align: center; }
.item-change.up { color: #389e0d; }
.item-change.down { color: #cf1322; }

.item-count { font-size: 11px; color: #9ca3af; text-align: right; }

/* 文字反馈 */
.text-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.text-stat-item {
  padding: 14px 10px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  transition: transform 0.2s;
}
.text-stat-item:hover { transform: translateY(-2px); }

.text-stat-item.praise { background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%); border: 1px solid #b7eb8f; }
.text-stat-item.suggest { background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%); border: 1px solid #91d5ff; }
.text-stat-item.critic { background: linear-gradient(135deg, #fff1f0 0%, #ffccc7 100%); border: 1px solid #ffa39e; }

.ts-num { font-size: 22px; font-weight: 700; color: #1f2937; }
.ts-label { font-size: 12px; color: #6b7280; margin-top: 2px; font-weight: 500; }
.ts-pct { font-size: 11px; color: #374151; margin-top: 4px; font-weight: 600; }

.text-category-title {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin: 12px 0 8px 0;
  padding-left: 8px;
  border-left: 3px solid #1890ff;
}

.text-category-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px; }

.text-category-row {
  display: grid;
  grid-template-columns: 12px 80px 1fr 40px;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  padding: 4px 6px;
  border-radius: 4px;
}
.text-category-row:hover { background: #f9fafb; }

.tc-dot { width: 8px; height: 8px; border-radius: 50%; margin: 0 auto; display: block; }
.tc-name { color: #374151; font-weight: 500; }
.tc-bar { height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden; }
.tc-bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s; }
.tc-num { font-size: 11px; font-weight: 600; color: #1f2937; text-align: right; }

/* 关键词云 */
.keyword-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px;
  background: #fafbfc;
  border-radius: 6px;
}

.keyword {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  font-weight: 500;
  cursor: default;
  transition: all 0.2s;
}

.keyword:hover {
  border-color: #1890ff;
  color: #1890ff !important;
  transform: scale(1.05);
}

/* 低分项 */
.low-score-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.low-score-card {
  background: linear-gradient(135deg, #fffbe6 0%, #fff 100%);
  border: 1px solid #ffe58f;
  border-radius: 8px;
  padding: 14px 16px;
}

.ls-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ffe58f;
}

.ls-rank {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #fa541c, #d4380d);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.ls-title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  flex: 1;
}

.ls-score {
  font-size: 24px;
  font-weight: 700;
  color: #fa541c;
  letter-spacing: -0.5px;
}

.ls-badges { display: flex; gap: 6px; }
.badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}
.badge-red { background: #fff1f0; color: #cf1322; border: 1px solid #ffa39e; }
.badge-orange { background: #fff7e6; color: #d46b08; border: 1px solid #ffd591; }

.ls-summary {
  font-size: 12px;
  color: #374151;
  line-height: 1.7;
  margin-bottom: 10px;
}
.ls-summary b { color: #d4380d; }

.ls-feedback {
  background: #fff;
  border: 1px solid #ffe58f;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 10px;
}

.ls-feedback-label {
  font-size: 11px;
  font-weight: 600;
  color: #d46b08;
  margin-bottom: 8px;
}

.ls-feedback-list { display: flex; flex-direction: column; gap: 8px; }

.feedback-quote {
  position: relative;
  padding: 8px 10px 8px 20px;
  background: #fffbe6;
  border-left: 3px solid #faad14;
  border-radius: 0 4px 4px 0;
  font-size: 12px;
  line-height: 1.6;
}

.quote-mark {
  position: absolute;
  left: 4px;
  top: 2px;
  font-size: 24px;
  color: #ffd666;
  font-family: Georgia, serif;
  line-height: 1;
}

.quote-text { color: #374151; }

.quote-meta {
  display: block;
  font-size: 10px;
  color: #8c8c8c;
  margin-top: 4px;
  font-style: italic;
}

.ls-insights { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.insight-item {
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.insight-item svg { width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px; }
.insight-item b { color: inherit; }

.insight-red { background: #fff1f0; border: 1px solid #ffccc7; color: #cf1322; }
.insight-red svg { color: #cf1322; }
.insight-blue { background: #e6f7ff; border: 1px solid #bae7ff; color: #0050b3; }
.insight-blue svg { color: #0050b3; }

/* 报告 */
.report-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px 26px;
  border: 1px solid #eef0f4;
  margin-top: 4px;
}

.report-actions { display: flex; gap: 8px; }

.report-content { font-size: 13px; line-height: 1.8; color: #374151; }

.report-section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}
.report-section:last-of-type { border-bottom: none; margin-bottom: 0; }

.report-h {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  padding-left: 12px;
  border-left: 4px solid #1890ff;
  line-height: 1.5;
}

.report-p { margin: 6px 0; }

.score-mark { color: #1890ff; font-weight: 700; }
.up-mark { color: #389e0d; }
.down-mark { color: #cf1322; }

.report-item-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}

.report-item {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  align-items: flex-start;
}

.item-highlight-blue { background: #e6f7ff; border: 1px solid #bae7ff; color: #0050b3; }
.item-highlight-orange { background: #fff7e6; border: 1px solid #ffd591; color: #ad6800; }
.item-highlight-red { background: #fff1f0; border: 1px solid #ffccc7; color: #cf1322; }
.item-highlight-green { background: #f6ffed; border: 1px solid #b7eb8f; color: #389e0d; }

.report-item-icon {
  font-size: 18px;
  font-weight: 700;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.report-item-label {
  font-size: 11px;
  opacity: 0.8;
  font-weight: 500;
  margin-bottom: 2px;
}

.report-item-val {
  font-size: 13px;
  line-height: 1.5;
  color: #1f2937;
}
.report-item-val b { color: inherit; font-weight: 700; }

.report-ol {
  padding-left: 20px;
  margin: 8px 0;
  line-height: 1.9;
  color: #374151;
}

.report-ol li { margin-bottom: 4px; }

.kw-inline {
  display: inline-block;
  padding: 1px 8px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 4px;
  margin-bottom: 4px;
}

.report-footer {
  text-align: center;
  font-size: 11px;
  color: #9ca3af;
  padding-top: 10px;
  margin-top: 10px;
  font-style: italic;
}

.footer-note {
  margin-top: 20px;
  text-align: center;
  font-size: 11px;
  color: #9ca3af;
  padding: 14px;
  border-top: 1px dashed #d9d9d9;
}

/* 响应式 */
@media (max-width: 1400px) {
  .kpi-grid { grid-template-columns: 2fr 1fr 1fr; }
  .doctor-grid { grid-template-columns: repeat(4, 1fr); }
  .chart-row:first-of-type { grid-template-columns: 1fr 1fr; }
  .chart-row:first-of-type > .chart-card:first-child { grid-column: 1 / -1; }
}

@media (max-width: 1100px) {
  .kpi-grid { grid-template-columns: 2fr 1fr 1fr; }
  .chart-row:first-of-type,
  .chart-row:nth-of-type(2),
  .chart-row:nth-of-type(4) {
    grid-template-columns: 1fr;
  }
  .item-score-row {
    grid-template-columns: 30px 180px 1fr 40px 50px 60px;
  }
  .doctor-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .kpi-main { grid-column: 1 / -1; }
  .doctor-grid { grid-template-columns: repeat(2, 1fr); }
  .report-item-grid { grid-template-columns: 1fr; }
  .rank-row { grid-template-columns: 28px 1fr 2fr 50px 60px; font-size: 11px; }
  .rank-count { display: none; }
  .item-score-row { grid-template-columns: 30px 1fr; grid-template-rows: auto auto; }
  .item-bar-wrap, .item-score-val, .item-change, .item-count { grid-column: 2 / -1; }
}

@media (max-width: 600px) {
  .dashboard-container { padding: 12px; }
  .page-header-row { flex-direction: column; align-items: flex-start; gap: 12px; }
  .kpi-grid { grid-template-columns: 1fr; }
  .doctor-grid { grid-template-columns: 1fr; }
  .filter-row { gap: 10px; }
  .pie-chart-area { grid-template-columns: 1fr; }
}
</style>