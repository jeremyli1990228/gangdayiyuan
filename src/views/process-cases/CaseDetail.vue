<template>
  <div class="case-detail-wrapper">
    <!-- 顶部面包屑导航 -->
    <div class="page-header-bar">
      <div class="breadcrumb">
        <button class="back-btn" @click="$router.back()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <router-link to="/" class="breadcrumb-item">处理案件</router-link>
        <span class="breadcrumb-separator">›</span>
        <router-link to="/process-cases/all" class="breadcrumb-item">所有案件</router-link>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item active">案件详情</span>
      </div>
      <div class="header-actions">
        <button class="shortcut-btn">
          <svg class="shortcut-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          新建快捷导航
        </button>
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
          <span class="progress-title">案件进度及基本信息</span>
          <span class="progress-note">（前回复客户）</span>
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
            <span class="meta-label">案件编号：</span>
            <span class="meta-value">{{ caseInfo.caseNo }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">创建人：</span>
            <span class="meta-value">{{ caseInfo.creator }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">受理时间：</span>
            <span class="meta-value">{{ caseInfo.acceptTime }}</span>
          </div>
        </div>
      </div>

      <!-- 患者信息 -->
      <div class="info-card">
        <div class="info-card-title">患者信息</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>姓名</th>
              <td>{{ patientInfo.name }}</td>
            </tr>
            <tr>
              <th>病人号</th>
              <td>{{ patientInfo.patientNo }}</td>
            </tr>
            <tr>
              <th>年龄</th>
              <td>{{ patientInfo.age }}</td>
            </tr>
            <tr>
              <th>性别</th>
              <td>{{ patientInfo.gender }}</td>
            </tr>
            <tr>
              <th>联系方式</th>
              <td>{{ patientInfo.contact }}</td>
            </tr>
            <tr>
              <th>邮箱/地址</th>
              <td>{{ patientInfo.emailAddress }}</td>
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
              <th>与患者关系</th>
              <td>{{ feedbackPerson.relation }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ feedbackPerson.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 受理信息 -->
      <div class="info-card">
        <div class="info-card-title">受理信息</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>受理组</th>
              <td>{{ acceptInfo.acceptGroup }}</td>
            </tr>
            <tr>
              <th>受理人</th>
              <td>{{ acceptInfo.acceptPerson }}</td>
            </tr>
            <tr>
              <th>案件类型</th>
              <td>{{ acceptInfo.caseType }}</td>
            </tr>
            <tr>
              <th>回复类型</th>
              <td>{{ acceptInfo.replyType }}</td>
            </tr>
            <tr>
              <th>回复日期</th>
              <td>{{ acceptInfo.replyDate }}</td>
            </tr>
            <tr>
              <th>受理日期</th>
              <td>{{ acceptInfo.acceptDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 原因与诉求 -->
      <div class="info-card">
        <div class="info-card-title">原因与诉求</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>涉及环节</th>
              <td>
                <span v-for="(tag, i) in reasonAppeal.links" :key="i" class="link-tag">{{ tag }}</span>
              </td>
            </tr>
            <tr>
              <th>原因</th>
              <td>{{ reasonAppeal.reason }}</td>
            </tr>
            <tr>
              <th>诉求</th>
              <td>{{ reasonAppeal.appeal }}</td>
            </tr>
            <tr>
              <th>反馈简述</th>
              <td>{{ reasonAppeal.summary }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 反馈方式及涉及人员 -->
      <div class="info-card">
        <div class="info-card-title">反馈方式及涉及人员</div>
        <table class="info-table">
          <tbody>
            <tr>
              <th>反馈方式</th>
              <td>
                <span class="link-tag">{{ involveInfo.feedbackMethod }}</span>
              </td>
            </tr>
            <tr>
              <th>涉及科室</th>
              <td>
                <span class="link-tag">{{ involveInfo.department }}</span>
              </td>
            </tr>
            <tr>
              <th>科室类别</th>
              <td>{{ involveInfo.deptCategory }}</td>
            </tr>
            <tr>
              <th>涉及人员</th>
              <td>{{ involveInfo.personnel }}</td>
            </tr>
            <tr>
              <th>涉及自定义人员</th>
              <td>{{ involveInfo.customPersonnel }}</td>
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
        <div class="dropdown-wrapper">
          <button class="footer-btn primary">
            案件转办
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="btn-arrow">
              <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="dropdown-wrapper">
          <button class="footer-btn primary">
            更多
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="btn-arrow">
              <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
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
            <div class="drawer-date-picker">
              <svg viewBox="0 0 24 24" fill="none" stroke="#999" class="date-svg">
                <circle cx="11" cy="11" r="8" stroke-width="2"/>
                <path d="M21 21L16.65 16.65" stroke-width="2"/>
              </svg>
              <input type="text" class="drawer-input" v-model="drawerForm.summaryDate" placeholder="选择日期时间">
            </div>
            <textarea
              class="drawer-textarea"
              placeholder="请输入摘要信息"
              v-model="drawerForm.summaryContent"
            ></textarea>
          </div>

          <!-- 审查例会意见 -->
          <div class="drawer-section">
            <div class="drawer-section-title">审查例会意见</div>
            <div class="drawer-date-picker">
              <svg viewBox="0 0 24 24" fill="none" stroke="#999" class="date-svg">
                <circle cx="11" cy="11" r="8" stroke-width="2"/>
                <path d="M21 21L16.65 16.65" stroke-width="2"/>
              </svg>
              <input type="text" class="drawer-input" v-model="drawerForm.reviewDate" placeholder="选择日期时间">
            </div>
            <textarea
              class="drawer-textarea"
              placeholder="请输入审查例会意见"
              v-model="drawerForm.reviewContent"
            ></textarea>
          </div>

          <!-- 跟进信息 -->
          <div class="drawer-section">
            <div class="drawer-section-title">跟进信息</div>
            <div class="followup-modules-drawer">
              <div
                v-for="module in activeFollowupModules"
                :key="module.key"
                class="followup-module-drawer"
                :class="'module-' + module.key"
                :style="{ '--module-color': module.color, '--module-bg': module.bg, '--module-border': module.border }"
              >
                <div class="drawer-module-header">
                  <div class="module-title-inline">
                    <span class="module-dot-inline" :style="{ background: module.color }"></span>
                    <span class="module-name-inline" :style="{ color: module.color }">{{ module.label }}</span>
                  </div>
                  <button class="btn-add-record-mini" :style="{ background: module.color }" @click="addDrawerRecord(module.key)">
                    <span>+ 添加</span>
                  </button>
                </div>
                <div v-if="drawerFollowup[module.key].length > 0" class="drawer-module-body">
                  <div v-for="(rec, idx) in drawerFollowup[module.key]" :key="rec.id" class="drawer-record-item">
                    <div class="drawer-date-picker">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" class="date-svg">
                        <circle cx="11" cy="11" r="8" stroke-width="2"/>
                        <path d="M21 21L16.65 16.65" stroke-width="2"/>
                      </svg>
                      <input type="text" class="drawer-input" v-model="rec.date" placeholder="选择日期时间">
                    </div>
                    <select class="drawer-select" v-model="rec.personType">
                      <option value="">请选择人员属性</option>
                      <option value="internal">内部人员</option>
                      <option value="external">外部人员</option>
                      <option value="patient">患者方</option>
                    </select>
                    <textarea class="drawer-textarea small" v-model="rec.content" placeholder="请输入跟进信息"></textarea>
                    <div class="record-footer-row">
                      <span class="word-count-mini">{{ (rec.content || '').length }}/2000</span>
                      <button class="btn-delete-mini" @click="removeDrawerRecord(module.key, idx)">删除</button>
                    </div>
                  </div>
                </div>
                <div v-else class="drawer-module-empty">暂无跟进信息，点击"+ 添加"新增</div>
              </div>
            </div>
          </div>

          <!-- 上传附件 -->
          <div class="drawer-section">
            <div class="upload-area">
              <span class="upload-hint">上传附件支持扩展名：xls、doc、docx、pdf、jpg......</span>
              <button class="btn-upload">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="upload-icon">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="17 8 12 3 7 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke-width="2" stroke-linecap="round"/>
                </svg>
                附件上传
              </button>
            </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 模块基础定义
const ALL_MODULES = [
  {
    key: 'complaint',
    label: '投诉',
    color: '#1890ff',
    bg: '#e6f7ff',
    border: '#91d5ff'
  },
  {
    key: 'petition',
    label: '信访',
    color: '#722ed1',
    bg: '#f9f0ff',
    border: '#d3adf7'
  },
  {
    key: 'claim',
    label: '理赔',
    color: '#fa8c16',
    bg: '#fff7e6',
    border: '#ffd591'
  },
  {
    key: 'investigation',
    label: '行政调查',
    color: '#52c41a',
    bg: '#f6ffed',
    border: '#b7eb8f'
  }
]

// 模拟根据案件选择的模块（新建案件时选择了3个：投诉、理赔、行政调查）
// 可根据路由参数或 mock 数据动态调整
const SELECTED_MODULE_KEYS = ['complaint', 'claim', 'investigation']

const activeFollowupModules = computed(() =>
  ALL_MODULES.filter(m => SELECTED_MODULE_KEYS.includes(m.key))
)

// 进度步骤
const progressSteps = ref([
  { label: '创建案件', status: 'done', time: '2026-07-30 15:12:53' },
  { label: '跟进中', status: 'current' },
  { label: '审批中', status: 'pending' },
  { label: '已结案', status: 'pending' }
])

const caseInfo = ref({
  caseNo: '0001582220260730006',
  creator: '付世平',
  acceptTime: '2026-07-30 15:12:53'
})

const patientInfo = ref({
  name: '匿名（电话139F015B2）',
  patientNo: 'F015T2',
  age: '-',
  gender: '保密',
  contact: '139F015B2',
  emailAddress: '-'
})

const feedbackPerson = ref({
  relation: '父母',
  name: '匿名（电话139F015B2）'
})

const acceptInfo = ref({
  acceptGroup: '',
  acceptPerson: '付世平',
  caseType: '建议',
  replyType: '无需回复反馈人',
  replyDate: '-',
  acceptDate: '2026-07-30 15:12:53'
})

const reasonAppeal = ref({
  links: ['临床'],
  reason: '满意度低分（综合1.67分）：医生讲解不清(2分)；3(1分)；护士技术差(2分)',
  appeal: '针对低分项进行整改并回复',
  summary: '2026-07-30:    【满意度闭环案件】综合评分1.67分 低分项: 医生讲解不清(2分); 3(1分); 护士技术差(2分).患者文字反馈: 医生态度需改善 涉及科室: 服务测试'
})

const involveInfo = ref({
  feedbackMethod: '3',
  department: '服务测试',
  deptCategory: '门诊',
  personnel: '',
  customPersonnel: ''
})

const openInfoDrawer = ref(false)

const drawerForm = ref({
  summaryDate: '',
  summaryContent: '',
  reviewDate: '',
  reviewContent: ''
})

const drawerFollowup = ref({
  complaint: [],
  petition: [],
  claim: [],
  investigation: []
})

let rid = 0
const makeRecord = () => ({
  id: `dr_${Date.now()}_${++rid}`,
  date: '',
  personType: '',
  content: ''
})

const addDrawerRecord = (key) => {
  drawerFollowup.value[key].push(makeRecord())
}
const removeDrawerRecord = (key, idx) => {
  drawerFollowup.value[key].splice(idx, 1)
}

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

.shortcut-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.shortcut-icon {
  width: 16px;
  height: 16px;
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

/* 进度卡片 */
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

.progress-note {
  color: #1890ff;
  font-size: 14px;
  margin-left: 8px;
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

/* 信息卡片 */
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
  width: 160px;
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

.link-tag {
  display: inline-block;
  background: #e6f7ff;
  color: #1890ff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 3px;
  margin-right: 6px;
}

.empty-placeholder {
  color: #999;
  font-size: 14px;
  padding: 12px 0;
}

/* 底部操作栏 */
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

.btn-arrow {
  width: 14px;
  height: 14px;
}

.dropdown-wrapper {
  position: relative;
}

/* 抽屉样式 */
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

.drawer-date-picker {
  position: relative;
  margin-bottom: 10px;
}

.date-svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  pointer-events: none;
}

.drawer-input {
  width: 100%;
  height: 36px;
  padding: 0 12px 0 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  background: #fff;
}

.drawer-input:focus {
  border-color: #1890ff;
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

.drawer-textarea.small {
  min-height: 80px;
}

.drawer-textarea:focus {
  border-color: #1890ff;
  background: #fff;
}

.drawer-select {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background: #fff;
  cursor: pointer;
  margin-bottom: 10px;
}

/* 抽屉跟进模块 */
.followup-modules-drawer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.followup-module-drawer {
  border: 1px solid var(--module-border, #d9d9d9);
  border-left: 3px solid var(--module-color, #1890ff);
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.drawer-module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--module-bg, #fafafa);
}

.module-title-inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.module-dot-inline {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.module-name-inline {
  font-weight: 600;
  font-size: 14px;
}

.btn-add-record-mini {
  border: none;
  color: #fff;
  padding: 4px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  opacity: 0.95;
}

.btn-add-record-mini:hover {
  opacity: 1;
}

.drawer-module-body {
  padding: 12px;
}

.drawer-record-item {
  background: var(--module-bg, #fafafa);
  border: 1px dashed var(--module-border, #d9d9d9);
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 10px;
}

.drawer-record-item:last-child {
  margin-bottom: 0;
}

.record-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}

.word-count-mini {
  font-size: 12px;
  color: #999;
}

.btn-delete-mini {
  color: #ff4d4f;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.btn-delete-mini:hover {
  text-decoration: underline;
}

.drawer-module-empty {
  padding: 16px;
  text-align: center;
  color: #999;
  font-size: 12px;
}

/* 上传 */
.upload-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upload-hint {
  font-size: 12px;
  color: #999;
}

.btn-upload {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.upload-icon {
  width: 14px;
  height: 14px;
}

/* 抽屉底部 */
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
