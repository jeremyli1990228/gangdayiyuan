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
    <div class="filter-card">
      <div class="quick-btns">
        <button :class="['quick-btn', activeTime === 'today' ? 'active' : '']" @click="activeTime = 'today'">今日</button>
        <button :class="['quick-btn', activeTime === 'week' ? 'active' : '']" @click="activeTime = 'week'">本周</button>
        <button :class="['quick-btn', activeTime === 'month' ? 'active' : '']" @click="activeTime = 'month'">本月</button>
        <button :class="['quick-btn', activeTime === 'quarter' ? 'active' : '']" @click="activeTime = 'quarter'">本季度</button>
      </div>
      <div class="date-range">
        <input type="date" class="form-input" style="width: 140px;">
        <span class="date-sep">至</span>
        <input type="date" class="form-input" style="width: 140px;">
        <button class="btn btn-primary">查询</button>
      </div>
    </div>

    <!-- 核心指标概览 -->
    <div class="summary-grid">
      <div class="summary-card summary-primary">
        <div class="summary-label">总提交次数</div>
        <div class="summary-value">256</div>
        <div class="summary-trend up">
          <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          12.5%
        </div>
        <div class="summary-sub">较上周期</div>
      </div>
      <div class="summary-card summary-warn">
        <div class="summary-label">待处理次数</div>
        <div class="summary-value">48</div>
        <div class="summary-trend down">
          <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 7L17 17M17 17H9M17 17V9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          3.2%
        </div>
        <div class="summary-sub">较上周期</div>
      </div>
      <div class="summary-card summary-success">
        <div class="summary-label">已处理次数</div>
        <div class="summary-value">198</div>
        <div class="summary-trend up">
          <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          18.7%
        </div>
        <div class="summary-sub">较上周期</div>
      </div>
      <div class="summary-card summary-orange">
        <div class="summary-label">评价次数</div>
        <div class="summary-value">156</div>
        <div class="summary-trend up">
          <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          8.3%
        </div>
        <div class="summary-sub">较上周期</div>
      </div>
    </div>

    <!-- 反馈类型分布 + 提交趋势 -->
    <div class="content-row">
      <!-- 反馈类型分布 -->
      <div class="data-card">
        <div class="card-header">
          <h3 class="card-title">反馈类型分布</h3>
          <span class="card-total">合计 256</span>
        </div>
        <div class="card-body">
          <div class="type-list">
            <div class="type-item" v-for="(item, idx) in typeDistribution" :key="idx">
              <div class="type-row">
                <span class="type-name" :class="'type-' + (idx + 1)">{{ item.name }}</span>
                <span class="type-count">{{ item.count }}</span>
              </div>
              <div class="type-progress-wrap">
                <div class="type-progress-bar" :style="{ width: item.percent + '%' }" :class="'bar-' + (idx + 1)"></div>
              </div>
              <div class="type-meta">
                <span class="type-percent">{{ item.percent }}%</span>
                <span class="type-ratio">{{ item.count }} / 256</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 提交趋势 -->
      <div class="data-card">
        <div class="card-header">
          <h3 class="card-title">一周提交趋势</h3>
          <div class="legend-inline">
            <span class="legend-dot dot-blue"></span>投诉
            <span class="legend-dot dot-green"></span>建议
          </div>
        </div>
        <div class="card-body">
          <div class="trend-grid">
            <div class="trend-cell" v-for="(day, idx) in weekTrend" :key="idx">
              <div class="trend-day">{{ day.label }}</div>
              <div class="trend-bars">
                <div class="mini-bar" :style="{ height: day.complaint * 2 + 'px' }">
                  <span class="mini-val">{{ day.complaint }}</span>
                </div>
                <div class="mini-bar bar-green" :style="{ height: day.suggestion * 2 + 'px' }">
                  <span class="mini-val">{{ day.suggestion }}</span>
                </div>
              </div>
              <div class="trend-total">{{ day.complaint + day.suggestion }}</div>
            </div>
          </div>
          <!-- 快速统计 -->
          <div class="quick-stats">
            <div class="quick-stat">
              <div class="quick-label">本周总提交</div>
              <div class="quick-value">89<span class="quick-unit">件</span></div>
            </div>
            <div class="quick-stat">
              <div class="quick-label">日均提交</div>
              <div class="quick-value">12.7<span class="quick-unit">件</span></div>
            </div>
            <div class="quick-stat">
              <div class="quick-label">峰值日</div>
              <div class="quick-value emphasis">周六</div>
            </div>
            <div class="quick-stat">
              <div class="quick-label">投诉占比</div>
              <div class="quick-value">62<span class="quick-unit">%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 处理效率 -->
    <div class="data-card">
      <div class="card-header">
        <h3 class="card-title">处理效率统计</h3>
        <span class="card-total">平均满意度 4.23</span>
      </div>
      <div class="card-body">
        <div class="efficiency-grid">
          <div class="eff-card" v-for="(item, idx) in efficiencyData" :key="idx">
            <div class="eff-head">
              <span class="eff-name">{{ item.name }}</span>
              <span class="eff-score" :class="'score-' + item.scoreLevel">{{ item.score }}</span>
            </div>
            <div class="eff-row">
              <div class="eff-cell">
                <div class="eff-num">{{ item.submit }}</div>
                <div class="eff-sub">提交</div>
              </div>
              <div class="eff-cell eff-pending">
                <div class="eff-num">{{ item.pending }}</div>
                <div class="eff-sub">待处理</div>
              </div>
              <div class="eff-cell eff-done">
                <div class="eff-num">{{ item.resolved }}</div>
                <div class="eff-sub">已处理</div>
              </div>
            </div>
            <div class="eff-rate-wrap">
              <div class="eff-rate-bar">
                <div class="eff-rate-fill" :style="{ width: item.rate + '%' }"></div>
              </div>
              <span class="eff-rate-text">处理率 {{ item.rate }}%</span>
            </div>
            <div class="eff-footer">
              <span class="eff-time">
                <svg class="mini-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke-width="2"/>
                  <path d="M12 6V12L16 14" stroke-width="2" stroke-linecap="round"/>
                </svg>
                {{ item.avgTime }}
              </span>
              <span class="eff-sat">满意度 {{ item.satisfaction }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细数据表格 -->
    <div class="data-card">
      <div class="card-header">
        <h3 class="card-title">详细数据明细</h3>
      </div>
      <div class="table-container">
        <div class="table-header">
          <div class="table-cell cell-idx">序号</div>
          <div class="table-cell cell-type">反馈类型</div>
          <div class="table-cell">提交次数</div>
          <div class="table-cell">待处理次数</div>
          <div class="table-cell">已处理次数</div>
          <div class="table-cell">评价次数</div>
          <div class="table-cell">平均处理时长</div>
          <div class="table-cell">满意度评分</div>
        </div>
        <div class="table-body">
          <div class="table-row" v-for="(item, index) in statisticsData" :key="index">
            <div class="table-cell cell-idx">{{ index + 1 }}</div>
            <div class="table-cell cell-type">
              <span class="type-tag" :class="'tag-' + (index + 1)">{{ item.type }}</span>
            </div>
            <div class="table-cell">{{ item.submitCount }}</div>
            <div class="table-cell">
              <span class="pending-tag">{{ item.pendingCount }}</span>
            </div>
            <div class="table-cell">{{ item.resolvedCount }}</div>
            <div class="table-cell">{{ item.ratedCount }}</div>
            <div class="table-cell">{{ item.avgTime }}</div>
            <div class="table-cell">
              <span class="rating-value">{{ item.satisfaction }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTime = ref('month')

// 反馈类型分布
const typeDistribution = ref([
  { name: '服务态度', count: 64, percent: 25 },
  { name: '医疗质量', count: 51, percent: 20 },
  { name: '就医流程', count: 38, percent: 15 },
  { name: '环境卫生', count: 26, percent: 10 },
  { name: '收费问题', count: 32, percent: 12 },
  { name: '医德医风', count: 18, percent: 8 },
  { name: '其他', count: 27, percent: 10 }
])

// 一周趋势
const weekTrend = ref([
  { label: '周一', complaint: 8, suggestion: 4 },
  { label: '周二', complaint: 10, suggestion: 5 },
  { label: '周三', complaint: 12, suggestion: 7 },
  { label: '周四', complaint: 14, suggestion: 8 },
  { label: '周五', complaint: 13, suggestion: 7 },
  { label: '周六', complaint: 18, suggestion: 10 },
  { label: '周日', complaint: 20, suggestion: 11 }
])

// 处理效率数据
const efficiencyData = ref([
  { name: '服务态度', score: 4.2, scoreLevel: 'good', submit: 64, pending: 12, resolved: 48, rate: 81, avgTime: '2.5小时', satisfaction: 4.2 },
  { name: '医疗质量', score: 4.5, scoreLevel: 'excellent', submit: 51, pending: 8, resolved: 40, rate: 84, avgTime: '3.2小时', satisfaction: 4.5 },
  { name: '就医流程', score: 4.0, scoreLevel: 'good', submit: 38, pending: 10, resolved: 26, rate: 72, avgTime: '1.8小时', satisfaction: 4.0 },
  { name: '环境卫生', score: 4.3, scoreLevel: 'good', submit: 26, pending: 5, resolved: 20, rate: 77, avgTime: '1.5小时', satisfaction: 4.3 },
  { name: '收费问题', score: 4.1, scoreLevel: 'good', submit: 32, pending: 6, resolved: 24, rate: 75, avgTime: '2.0小时', satisfaction: 4.1 },
  { name: '医德医风', score: 4.6, scoreLevel: 'excellent', submit: 18, pending: 4, resolved: 12, rate: 67, avgTime: '4.0小时', satisfaction: 4.6 },
  { name: '其他', score: 3.9, scoreLevel: 'normal', submit: 27, pending: 3, resolved: 22, rate: 81, avgTime: '2.8小时', satisfaction: 3.9 },
  { name: '总计', score: 4.23, scoreLevel: 'good', submit: 256, pending: 48, resolved: 192, rate: 77, avgTime: '2.5小时', satisfaction: 4.2 }
])

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
  margin-bottom: 16px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  letter-spacing: 0.2px;
}

/* 筛选卡片 */
.filter-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px 20px;
  border-radius: 10px;
  margin-bottom: 16px;
  border: 1px solid #eef0f4;
}

.quick-btns {
  display: flex;
  gap: 6px;
}

.quick-btn {
  padding: 6px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  font-size: 13px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.quick-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
  background: #f0f9ff;
}

.quick-btn.active {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.25);
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-sep {
  color: #9ca3af;
  font-size: 13px;
}

.form-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  color: #4b5563;
  background: #fafbfc;
  transition: border 0.2s;
}

.form-input:focus {
  border-color: #1890ff;
  background: #fff;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-primary {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

/* 核心指标概览 */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 14px;
}

.summary-card {
  background: #fff;
  border-radius: 10px;
  padding: 18px 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid #eef0f4;
  transition: transform 0.2s, box-shadow 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.summary-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
}

.summary-primary::before {
  background: linear-gradient(180deg, #1890ff 0%, #096dd9 100%);
}

.summary-warn::before {
  background: linear-gradient(180deg, #ff7a45 0%, #fa541c 100%);
}

.summary-success::before {
  background: linear-gradient(180deg, #52c41a 0%, #389e0d 100%);
}

.summary-orange::before {
  background: linear-gradient(180deg, #fa8c16 0%, #d46b08 100%);
}

.summary-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
}

.summary-value {
  font-size: 30px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.1;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}

.summary-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.summary-trend.up {
  color: #389e0d;
  background: #f6ffed;
}

.summary-trend.down {
  color: #cf1322;
  background: #fff1f0;
}

.trend-icon {
  width: 12px;
  height: 12px;
}

.summary-sub {
  margin-top: 4px;
  font-size: 11px;
  color: #9ca3af;
}

/* 内容行 */
.content-row {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 14px;
  margin-bottom: 14px;
}

/* 通用卡片 */
.data-card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #eef0f4;
  overflow: hidden;
  margin-bottom: 14px;
}

.card-header {
  padding: 14px 20px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-total {
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
}

.card-body {
  padding: 18px 20px;
}

.legend-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
}

.legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  margin-right: 4px;
  margin-left: 6px;
  vertical-align: middle;
}

.dot-blue {
  background: #1890ff;
}

.dot-green {
  background: #52c41a;
}

/* 类型列表 */
.type-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.type-item + .type-item {
  padding-top: 14px;
  border-top: 1px dashed #f0f2f5;
}

.type-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.type-name {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.type-name.type-1 { color: #1890ff; }
.type-name.type-2 { color: #52c41a; }
.type-name.type-3 { color: #fa8c16; }
.type-name.type-4 { color: #ff4d4f; }
.type-name.type-5 { color: #722ed1; }
.type-name.type-6 { color: #13c2c2; }
.type-name.type-7 { color: #8c8c8c; }

.type-count {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
}

.type-progress-wrap {
  height: 6px;
  background: #f3f4f6;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.type-progress-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.bar-1 { background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%); }
.bar-2 { background: linear-gradient(90deg, #52c41a 0%, #73d13d 100%); }
.bar-3 { background: linear-gradient(90deg, #fa8c16 0%, #ffc069 100%); }
.bar-4 { background: linear-gradient(90deg, #ff4d4f 0%, #ff7875 100%); }
.bar-5 { background: linear-gradient(90deg, #722ed1 0%, #9254de 100%); }
.bar-6 { background: linear-gradient(90deg, #13c2c2 0%, #36cfc9 100%); }
.bar-7 { background: linear-gradient(90deg, #8c8c8c 0%, #adadad 100%); }

.type-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #9ca3af;
}

.type-percent {
  font-weight: 600;
  color: #6b7280;
}

/* 趋势网格 */
.trend-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.trend-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 6px;
  border-radius: 8px;
  background: #fafbfc;
  transition: background 0.2s;
}

.trend-cell:hover {
  background: #f0f9ff;
}

.trend-day {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 8px;
}

.trend-bars {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  justify-content: center;
  height: 70px;
}

.mini-bar {
  width: 10px;
  background: linear-gradient(180deg, #1890ff 0%, #40a9ff 100%);
  border-radius: 3px 3px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 12px;
  position: relative;
}

.mini-bar.bar-green {
  background: linear-gradient(180deg, #52c41a 0%, #73d13d 100%);
}

.mini-val {
  font-size: 9px;
  color: #fff;
  font-weight: 700;
  padding-top: 2px;
}

.trend-total {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #1f2937;
}

/* 快速统计 */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding-top: 16px;
  border-top: 1px dashed #e5e7eb;
}

.quick-stat {
  text-align: center;
  padding: 10px 6px;
  background: #fafbfc;
  border-radius: 6px;
}

.quick-label {
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.quick-value {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.quick-value.emphasis {
  color: #fa8c16;
  font-size: 14px;
}

.quick-unit {
  font-size: 10px;
  font-weight: 500;
  color: #9ca3af;
  margin-left: 2px;
}

/* 处理效率网格 */
.efficiency-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.eff-card {
  background: #fafbfc;
  border-radius: 8px;
  padding: 14px;
  border: 1px solid #f0f2f5;
  transition: all 0.2s;
}

.eff-card:hover {
  background: #fff;
  border-color: #d9e4f5;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.08);
}

.eff-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.eff-name {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.eff-score {
  font-size: 13px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.eff-score.score-excellent {
  color: #389e0d;
  background: #f6ffed;
}

.eff-score.score-good {
  color: #fa8c16;
  background: #fff7e6;
}

.eff-score.score-normal {
  color: #4b5563;
  background: #f3f4f6;
}

.eff-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-bottom: 10px;
}

.eff-cell {
  text-align: center;
  padding: 6px 2px;
  border-radius: 4px;
  background: #fff;
}

.eff-num {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
}

.eff-cell.eff-pending .eff-num {
  color: #fa541c;
}

.eff-cell.eff-done .eff-num {
  color: #389e0d;
}

.eff-sub {
  font-size: 10px;
  color: #9ca3af;
  margin-top: 2px;
}

.eff-rate-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.eff-rate-bar {
  flex: 1;
  height: 4px;
  background: #f0f2f5;
  border-radius: 2px;
  overflow: hidden;
}

.eff-rate-fill {
  height: 100%;
  background: linear-gradient(90deg, #1890ff 0%, #52c41a 100%);
  border-radius: 2px;
  transition: width 0.6s;
}

.eff-rate-text {
  font-size: 11px;
  color: #4b5563;
  font-weight: 500;
  white-space: nowrap;
}

.eff-footer {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #6b7280;
  padding-top: 8px;
  border-top: 1px dashed #e5e7eb;
}

.eff-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.mini-icon {
  width: 11px;
  height: 11px;
}

.eff-sat {
  font-weight: 500;
}

/* 表格 */
.table-container {
  overflow: hidden;
}

.table-header {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.table-body {
  max-height: 400px;
  overflow-y: auto;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.2s;
}

.table-row:hover {
  background: #f9fafb;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 12px 16px;
  font-size: 13px;
  color: #374151;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 100px;
}

.table-header .table-cell {
  font-weight: 600;
  color: #6b7280;
  font-size: 12px;
}

.cell-idx {
  flex: 0 0 60px;
  min-width: 60px;
  max-width: 60px;
}

.cell-type {
  flex: 0 0 150px;
  min-width: 150px;
  max-width: 150px;
}

.type-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.tag-1 { background: #e6f7ff; color: #1890ff; }
.tag-2 { background: #f6ffed; color: #52c41a; }
.tag-3 { background: #fff7e6; color: #fa8c16; }
.tag-4 { background: #fff1f0; color: #ff4d4f; }
.tag-5 { background: #f9f0ff; color: #722ed1; }
.tag-6 { background: #e6fffb; color: #13c2c2; }
.tag-7 { background: #f5f5f5; color: #8c8c8c; }

.pending-tag {
  display: inline-block;
  padding: 2px 8px;
  background: #fff7e6;
  color: #fa8c16;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
}

.rating-value {
  color: #fa8c16;
  font-weight: 700;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .efficiency-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .content-row {
    grid-template-columns: 1fr;
  }
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
  .efficiency-grid {
    grid-template-columns: 1fr;
  }
  .filter-card {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
