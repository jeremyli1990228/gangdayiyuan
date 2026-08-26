<template>
  <div class="case-detail-wrapper">
    <!-- 顶部面包屑导航 -->
    <div class="page-header-bar">
      <div class="breadcrumb">
        <button class="back-btn" @click="$router.back()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <router-link to="/petition/all" class="breadcrumb-item">民生诉求</router-link>
        <span class="breadcrumb-separator">›</span>
        <router-link to="/petition/all" class="breadcrumb-item">所有案件</router-link>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item active">案件详情</span>
      </div>
      <div class="header-actions">
        <div class="user-area">
          <div class="avatar">付</div>
          <div class="user-name">付世平</div>
          <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6 9 12 15 18 9" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="case-detail-container">
      <!-- 进度区 -->
      <div class="progress-card">
        <div class="progress-card-header">
          <span class="progress-title">工单进度及基本信息</span>
        </div>
        <div class="progress-stepper">
          <div v-for="(step, idx) in progressSteps" :key="idx" class="stepper-item" :class="step.status">
            <div class="step-node">
              <svg v-if="step.status === 'done'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17L4 12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span v-else class="step-number">{{ idx + 1 }}</span>
            </div>
            <div class="step-label">{{ step.label }}</div>
            <div class="step-time" v-if="step.time">{{ step.time }}</div>
            <div class="step-connector" v-if="idx < progressSteps.length - 1" :class="{ done: step.status === 'done' }"></div>
          </div>
        </div>
        <div class="progress-meta">
          <div class="meta-item">
            <span class="meta-label">工单编号：</span>
            <span class="meta-value">{{ caseInfo.caseNo }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">创建人：</span>
            <span class="meta-value">{{ caseInfo.creator }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">签收时间：</span>
            <span class="meta-value">{{ caseInfo.signTime }}</span>
          </div>
        </div>
      </div>

      <!-- 患者信息 -->
      <div class="info-card">
        <div class="info-card-title">患者信息</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>患者姓名</th>
              <td>{{ patientInfo.name }}</td>
            </tr>
            <tr>
              <th>病人号</th>
              <td>{{ patientInfo.patientNo }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 反馈人信息 -->
      <div class="info-card">
        <div class="info-card-title">反馈人信息</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>反馈人（信访人）</th>
              <td>{{ feedbackInfo.name }}</td>
            </tr>
            <tr>
              <th>反馈人手机号</th>
              <td>{{ feedbackInfo.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 工单信息 -->
      <div class="info-card">
        <div class="info-card-title">工单信息</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>签收日期</th>
              <td>{{ workOrderInfo.signDate }}</td>
            </tr>
            <tr>
              <th>工单平台来源</th>
              <td>{{ workOrderInfo.source }}</td>
            </tr>
            <tr>
              <th>工单编号</th>
              <td>{{ workOrderInfo.orderNo }}</td>
            </tr>
            <tr>
              <th>工单分类</th>
              <td>{{ workOrderInfo.category }}</td>
            </tr>
            <tr>
              <th>紧急程度情况</th>
              <td>
                <span class="urgency-tag" :class="workOrderInfo.urgencyClass">{{ workOrderInfo.urgency }}</span>
              </td>
            </tr>
            <tr>
              <th>诉求目的</th>
              <td>{{ workOrderInfo.purpose }}</td>
            </tr>
            <tr>
              <th>问题来源</th>
              <td>{{ workOrderInfo.problemSource }}</td>
            </tr>
            <tr>
              <th>诉求（问题描述）</th>
              <td>{{ workOrderInfo.description }}</td>
            </tr>
            <tr>
              <th>涉及科室</th>
              <td>{{ workOrderInfo.department }}</td>
            </tr>
            <tr>
              <th>涉及环节</th>
              <td>{{ workOrderInfo.link }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 答复与评价 -->
      <div class="info-card">
        <div class="info-card-title">答复与评价</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>工单答复时间</th>
              <td>{{ replyInfo.replyTime }}</td>
            </tr>
            <tr>
              <th>答复内容</th>
              <td>{{ replyInfo.replyContent }}</td>
            </tr>
            <tr>
              <th>是否差评</th>
              <td>
                <span v-if="replyInfo.isBadReview" class="bad-review-tag">是</span>
                <span v-else class="normal-review-tag">否</span>
              </td>
            </tr>
            <tr>
              <th>差评内容</th>
              <td>{{ replyInfo.badReviewContent || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 病历摘要 -->
      <div class="info-card">
        <div class="info-card-title">病历摘要</div>
        <div class="empty-placeholder">暂无内容</div>
      </div>

      <!-- 跟进记录 -->
      <div class="info-card">
        <div class="info-card-title">跟进记录</div>
        <div class="empty-placeholder">暂无内容</div>
      </div>

      <!-- 处理结果 -->
      <div class="info-card">
        <div class="info-card-title">处理结果</div>
        <div class="empty-placeholder">暂无内容</div>
      </div>

      <!-- 底部按钮 -->
      <div class="detail-footer">
        <button class="footer-btn primary" @click="onEditCase">案件编辑</button>
        <button class="footer-btn primary" @click="openInfoDrawer = true">录入案件信息</button>
        <button class="footer-btn outline">联系反馈人</button>
        <button class="footer-btn primary">案件转办</button>
        <button class="footer-btn primary">更多</button>
      </div>
    </div>

    <!-- 录入案件信息 抽屉 -->
    <transition name="fade">
      <div class="drawer-mask" v-if="openInfoDrawer" @click.self="openInfoDrawer = false"></div>
    </transition>
    <transition name="slide-right">
      <div class="info-drawer" v-if="openInfoDrawer">
        <div class="drawer-header">
          <span class="drawer-title">录入案件信息</span>
          <button class="drawer-close" @click="openInfoDrawer = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="drawer-body">
          <!-- 病历摘要 -->
          <div class="drawer-section">
            <div class="drawer-section-title">病历摘要</div>
            <textarea class="drawer-textarea" placeholder="请输入病历摘要信息" v-model="drawerForm.summaryContent"></textarea>
          </div>

          <!-- 跟进信息 -->
          <div class="drawer-section">
            <div class="drawer-section-title">跟进信息</div>
            <textarea class="drawer-textarea" placeholder="请输入跟进信息" v-model="drawerForm.followContent"></textarea>
          </div>

          <!-- 处理结果 -->
          <div class="drawer-section">
            <div class="drawer-section-title">处理结果</div>
            <textarea class="drawer-textarea" placeholder="请输入处理结果" v-model="drawerForm.resultContent"></textarea>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="footer-btn-outline" @click="openInfoDrawer = false">取消</button>
          <button class="footer-btn-primary" @click="onSubmitDrawer">提交</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const progressSteps = ref([
  { label: '创建工单', status: 'done', time: '2026-08-01 09:30:00' },
  { label: '处理中', status: 'current' },
  { label: '答复中', status: 'pending' },
  { label: '已结案', status: 'pending' }
])

const caseInfo = ref({
  caseNo: 'MZSS20260801001',
  creator: '付世平',
  signTime: '2026-08-01 09:30:00'
})

const patientInfo = ref({
  name: '张三',
  patientNo: 'P20260801001'
})

const feedbackInfo = ref({
  name: '张三',
  phone: '138****1234'
})

const workOrderInfo = ref({
  signDate: '2026-08-01',
  source: '政府平台',
  orderNo: 'MZSS20260801001',
  category: '医疗服务',
  urgency: '紧急',
  urgencyClass: 'urgent',
  purpose: '投诉医疗服务态度问题',
  problemSource: '12345热线',
  description: '患者反映在就诊过程中，医护人员态度恶劣，沟通不畅，希望得到妥善处理。',
  department: '门诊部',
  link: '临床诊疗'
})

const replyInfo = ref({
  replyTime: '2026-08-10 15:00:00',
  replyContent: '已与相关科室沟通，对当事人进行批评教育，并向反馈人致歉，反馈人表示满意。',
  isBadReview: false,
  badReviewContent: ''
})

const openInfoDrawer = ref(false)

const drawerForm = ref({
  summaryContent: '',
  followContent: '',
  resultContent: ''
})

const onSubmitDrawer = () => {
  alert('已提交录入案件信息')
  openInfoDrawer.value = false
}

const onEditCase = () => {
  alert('跳转至案件编辑页')
}

onMounted(() => {
  const id = route.params.id || route.query.id
  if (id) caseInfo.value.caseNo = id
})
</script>

<style scoped>
.case-detail-wrapper {
  min-height: 100vh;
  background-color: #f0f2f5;
  padding-bottom: 80px;
}

.page-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 24px;
  position: sticky;
  top: 0;
  z-index: 20;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.back-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6f7ff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
  margin-right: 4px;
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

.breadcrumb-item {
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  color: #999;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1890ff, #722ed1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.user-name {
  font-size: 14px;
  color: #333;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
  color: #666;
}

.case-detail-container {
  padding: 20px 24px 0;
  max-width: 1440px;
  margin: 0 auto;
}

.progress-card {
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 16px;
}

.progress-card-header {
  margin-bottom: 24px;
}

.progress-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.progress-stepper {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 40px 32px 40px;
}

.stepper-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  z-index: 2;
}

.step-node {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid #f0f0f0;
}

.stepper-item.done .step-node {
  background: #f6ffed;
  border-color: #52c41a;
  color: #52c41a;
}

.stepper-item.current .step-node {
  background: #fff;
  border-color: #333;
  color: #333;
}

.step-node svg {
  width: 20px;
  height: 20px;
}

.step-label {
  margin-top: 8px;
  font-size: 14px;
  color: #999;
  font-weight: 500;
}

.stepper-item.done .step-label,
.stepper-item.current .step-label {
  color: #333;
}

.step-time {
  margin-top: 4px;
  font-size: 12px;
  color: #52c41a;
}

.step-connector {
  position: absolute;
  top: 18px;
  left: calc(50% + 26px);
  width: calc(100% - 52px);
  height: 2px;
  background: #f0f0f0;
}

.step-connector.done {
  background: #52c41a;
}

.progress-meta {
  display: flex;
  gap: 80px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.meta-label {
  color: #666;
  font-size: 14px;
}

.meta-value {
  color: #333;
  font-size: 14px;
}

.info-card {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 20px 24px;
}

.info-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 3px solid #f0f2f5;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  max-width: 900px;
}

.info-table th {
  width: 180px;
  padding: 12px 16px;
  text-align: right;
  font-weight: 500;
  font-size: 14px;
  color: #333;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  vertical-align: top;
}

.info-table td {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  border: 1px solid #f0f0f0;
  vertical-align: top;
  line-height: 1.6;
}

.urgency-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.urgency-tag.normal {
  background-color: #f0f0f0;
  color: #666;
  border: 1px solid #d9d9d9;
}

.urgency-tag.urgent {
  background-color: #fff7e6;
  color: #fa8c16;
  border: 1px solid #ffd591;
}

.urgency-tag.critical {
  background-color: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffa39e;
}

.bad-review-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffa39e;
}

.normal-review-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.empty-placeholder {
  color: #999;
  font-size: 14px;
  padding: 12px 0;
}

.detail-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 12px 24px;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  z-index: 15;
  padding-left: calc(50% - 720px + 24px);
}

.footer-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.footer-btn.primary {
  background: #1890ff;
  color: #fff;
  border: 1px solid #1890ff;
}

.footer-btn.primary:hover {
  background: #40a9ff;
  border-color: #40a9ff;
}

.footer-btn.outline {
  background: #fff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.footer-btn.outline:hover {
  background: #e6f7ff;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s ease; }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

.drawer-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 100;
}

.info-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 540px;
  height: 100vh;
  background: #fff;
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -6px 0 16px rgba(0,0,0,0.08);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #404e67;
  color: #fff;
}

.drawer-title {
  font-size: 16px;
  font-weight: 600;
}

.drawer-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  padding: 4px;
}

.drawer-close svg {
  width: 18px;
  height: 18px;
}

.drawer-body {
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
}

.drawer-section {
  margin-bottom: 20px;
}

.drawer-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.drawer-textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  font-family: inherit;
  background: #fafafa;
}

.drawer-textarea:focus {
  border-color: #1890ff;
  background: #fff;
}

.drawer-footer {
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.footer-btn-outline {
  background: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  cursor: pointer;
}

.footer-btn-primary {
  background: #1890ff;
  color: #fff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  cursor: pointer;
}

.footer-btn-primary:hover {
  background: #40a9ff;
}

@media (max-width: 768px) {
  .progress-stepper { margin: 0 0 24px 0; }
  .progress-meta { flex-direction: column; gap: 8px; }
  .info-drawer { width: 100%; }
  .detail-footer { padding-left: 24px; }
}
</style>
