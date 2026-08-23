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
      <span class="breadcrumb-item active">我的反馈</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">我的反馈</h1>
    </div>

    <!-- 标签切换 -->
    <div class="tab-bar">
      <button :class="['tab-btn', activeTab === 'pending' ? 'active' : '']" @click="activeTab = 'pending'">
        待处理
        <span class="tab-badge">{{ pendingCount }}</span>
      </button>
      <button :class="['tab-btn', activeTab === 'processed' ? 'active' : '']" @click="activeTab = 'processed'">
        已处理
      </button>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">分类</label>
          <select class="form-select">
            <option value="">全部</option>
            <option value="complaint">投诉</option>
            <option value="suggestion">建议</option>
            <option value="consult">咨询</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">时间范围</label>
          <input type="date" class="form-input" style="width: 140px;">
          <span style="margin: 0 8px; color: #999;">至</span>
          <input type="date" class="form-input" style="width: 140px;">
        </div>
        <div class="filter-item">
          <label class="filter-label">关键词</label>
          <input type="text" class="form-input" placeholder="请输入关键词">
        </div>
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2" stroke-linecap="round"/>
          </svg>
          搜索
        </button>
      </div>
    </div>

    <!-- 待处理列表 -->
    <div class="feedback-list" v-if="activeTab === 'pending'">
      <div class="feedback-card" v-for="item in pendingList" :key="item.id">
        <div class="card-header">
          <div class="card-info">
            <span class="feedback-type">{{ item.category }}</span>
            <span class="feedback-submitter">{{ item.submitterName }}</span>
            <span class="feedback-time">{{ item.submitTime }}</span>
          </div>
          <div class="card-status">
            <span class="countdown" :class="{ 'warning': item.remainingHours < 24 }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <path d="M12 6V12L16 14" stroke-width="2" stroke-linecap="round"/>
              </svg>
              剩余 {{ item.remainingHours }} 小时
            </span>
          </div>
        </div>
        <div class="card-body">
          <div class="feedback-title">{{ item.feedbackType }}</div>
          <div class="feedback-desc">{{ item.description }}</div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-sm" @click="handleFeedback(item)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="2"/>
              <path d="M12 6V12L16 14" stroke-width="2" stroke-linecap="round"/>
            </svg>
            立即处理
          </button>
          <button class="btn btn-secondary btn-sm" @click="viewDetail(item)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" stroke-width="2"/>
            </svg>
            查看详情
          </button>
        </div>
      </div>
      <div class="empty-state" v-if="pendingList.length === 0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 2V8H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>暂无待处理的反馈</p>
      </div>
    </div>

    <!-- 已处理列表 -->
    <div class="feedback-list" v-if="activeTab === 'processed'">
      <div class="feedback-card" v-for="item in processedList" :key="item.id">
        <div class="card-header">
          <div class="card-info">
            <span class="feedback-type">{{ item.category }}</span>
            <span class="feedback-submitter">{{ item.submitterName }}</span>
            <span class="feedback-time">{{ item.submitTime }}</span>
          </div>
          <div class="card-status">
            <span class="status-tag resolved">已处理</span>
          </div>
        </div>
        <div class="card-body">
          <div class="feedback-title">{{ item.feedbackType }}</div>
          <div class="feedback-desc">{{ item.description }}</div>
          <div class="handle-result">
            <span class="result-label">处理结果：</span>
            <span class="result-content">{{ item.handleResult }}</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="handle-info">
            <span>处理时间：{{ item.handleTime }}</span>
          </div>
          <button class="btn btn-secondary btn-sm" @click="viewDetail(item)">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" stroke-width="2"/>
            </svg>
            查看详情
          </button>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <div class="pagination-info">共 {{ total }} 条记录</div>
      <div class="pagination-controls">
        <button class="pagination-btn" :disabled="currentPage === 1">上一页</button>
        <span class="pagination-page">{{ currentPage }} / {{ totalPages }}</span>
        <button class="pagination-btn" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>

    <!-- 处理抽屉 -->
    <div class="drawer-overlay" v-if="showHandleDrawer" @click="showHandleDrawer = false">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">处理反馈</h3>
          <button class="drawer-close" @click="showHandleDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="feedback-preview">
            <div class="preview-row">
              <span class="preview-label">提交人：</span>
              <span>{{ currentFeedback.submitterName }}</span>
            </div>
            <div class="preview-row">
              <span class="preview-label">问题描述：</span>
              <span>{{ currentFeedback.description }}</span>
            </div>
          </div>
          <div class="form-item required">
            <label class="form-label">处理结果</label>
            <select class="form-select" v-model="handleForm.result" @change="onResultChange">
              <option value="">请选择</option>
              <option value="resolved">已解决</option>
              <option value="processing">处理中</option>
              <option value="rejected">不予受理</option>
            </select>
          </div>
          <div class="form-item" v-if="handleForm.result && availableTemplates.length > 0">
            <label class="form-label">快捷模板</label>
            <select class="form-select" v-model="selectedTemplateId" @change="applyTemplate">
              <option value="">请选择模板（可选）</option>
              <option v-for="tpl in availableTemplates" :key="tpl.id" :value="tpl.id">{{ tpl.name }}</option>
            </select>
          </div>
          <div class="form-item required">
            <label class="form-label">处理意见</label>
            <textarea class="form-textarea" v-model="handleForm.opinion" placeholder="请输入处理意见" rows="6"></textarea>
          </div>
          <div class="form-item">
            <label class="form-label">发送通知</label>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" v-model="handleForm.notifySms">
                <span>短信通知</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="handleForm.notifyEmail">
                <span>邮件通知</span>
              </label>
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn btn-secondary" @click="showHandleDrawer = false">取消</button>
          <button class="btn btn-primary" @click="submitHandle">提交</button>
        </div>
      </div>
    </div>

    <!-- 详情抽屉 -->
    <div class="drawer-overlay" v-if="showDetailDrawer" @click="showDetailDrawer = false">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">反馈详情</h3>
          <button class="drawer-close" @click="showDetailDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="detail-section">
            <div class="detail-title">基本信息</div>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">提交人：</span>
                <span>{{ currentFeedback.submitterName }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">联系方式：</span>
                <span>{{ currentFeedback.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">分类：</span>
                <span>{{ currentFeedback.category }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">反馈类型：</span>
                <span>{{ currentFeedback.feedbackType }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">提交时间：</span>
                <span>{{ currentFeedback.submitTime }}</span>
              </div>
            </div>
          </div>
          <div class="detail-section">
            <div class="detail-title">问题描述</div>
            <div class="detail-content">{{ currentFeedback.description }}</div>
          </div>
          <div class="detail-section" v-if="currentFeedback.handleResult">
            <div class="detail-title">处理结果</div>
            <div class="detail-content">{{ currentFeedback.handleResult }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHandleResultTemplates } from '../../composables/useHandleResultTemplates'

const activeTab = ref('pending')
const showHandleDrawer = ref(false)
const showDetailDrawer = ref(false)
const currentPage = ref(1)
const totalPages = ref(2)

const currentFeedback = ref({})
const handleForm = ref({
  result: '',
  opinion: '',
  notifySms: true,
  notifyEmail: false
})

const { getEnabledTemplates } = useHandleResultTemplates()
const selectedTemplateId = ref('')

const availableTemplates = computed(() => {
  return getEnabledTemplates(handleForm.value.result)
})

const applyTemplate = () => {
  if (selectedTemplateId.value) {
    const tpl = availableTemplates.value.find(t => t.id === selectedTemplateId.value)
    if (tpl) {
      handleForm.value.opinion = tpl.content
    }
  }
}

const onResultChange = () => {
  selectedTemplateId.value = ''
}

const pendingList = ref([
  { id: 1, submitterName: '张三', phone: '13800138001', category: '投诉', feedbackType: '服务态度', submitTime: '2026-06-01 09:30:00', description: '门诊挂号处工作人员态度冷漠，排队等候时间过长，希望改进服务流程。', remainingHours: 48 },
  { id: 2, submitterName: '李四', phone: '13800138002', category: '建议', feedbackType: '就医流程', submitTime: '2026-05-30 14:20:00', description: '建议增加自助挂号机数量，减少排队等候时间。', remainingHours: 12 },
  { id: 3, submitterName: '王五', phone: '13800138003', category: '投诉', feedbackType: '医疗质量', submitTime: '2026-05-28 10:15:00', description: '对检查结果有疑问，医生解释不够详细，希望得到更专业的解答。', remainingHours: 6 }
])

const processedList = ref([
  { id: 4, submitterName: '赵六', phone: '13800138004', category: '咨询', feedbackType: '其他', submitTime: '2026-05-25 11:30:00', description: '请问周末是否可以做体检？需要提前预约吗？', handleResult: '周末可以进行体检，建议提前一周预约。', handleTime: '2026-05-26 09:00:00' },
  { id: 5, submitterName: '钱七', phone: '13800138005', category: '投诉', feedbackType: '环境卫生', submitTime: '2026-05-20 15:45:00', description: '住院部3楼卫生间卫生状况较差，希望加强清洁频率。', handleResult: '已通知后勤部门加强清洁，并增加清洁频次。', handleTime: '2026-05-22 10:00:00' }
])

const pendingCount = computed(() => pendingList.value.length)
const total = computed(() => activeTab.value === 'pending' ? pendingList.value.length : processedList.value.length)

const handleFeedback = (item) => {
  currentFeedback.value = { ...item }
  handleForm.value = {
    result: '',
    opinion: '',
    notifySms: true,
    notifyEmail: false
  }
  selectedTemplateId.value = ''
  showHandleDrawer.value = true
}

const viewDetail = (item) => {
  currentFeedback.value = { ...item }
  showDetailDrawer.value = true
}

const submitHandle = () => {
  if (!handleForm.value.result || !handleForm.value.opinion) {
    alert('请填写完整信息')
    return
  }
  const index = pendingList.value.findIndex(f => f.id === currentFeedback.value.id)
  if (index > -1) {
    const item = pendingList.value[index]
    processedList.value.unshift({
      ...item,
      handleResult: handleForm.value.opinion,
      handleTime: new Date().toLocaleString()
    })
    pendingList.value.splice(index, 1)
  }
  showHandleDrawer.value = false
}
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

.tab-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  color: #1890ff;
}

.tab-btn.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
}

.tab-badge {
  padding: 2px 8px;
  background: #ff4d4f;
  color: #fff;
  border-radius: 10px;
  font-size: 12px;
}

.filter-bar {
  background: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.form-select,
.form-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.form-select:focus,
.form-input:focus {
  border-color: #1890ff;
}

.form-select {
  width: 120px;
  background: #fff;
}

.form-input {
  width: 150px;
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

.btn-sm {
  height: 28px;
  padding: 0 12px;
  font-size: 13px;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  background: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-secondary:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feedback-card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.card-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.feedback-type {
  padding: 4px 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 2px;
  font-size: 13px;
}

.feedback-submitter {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.feedback-time {
  font-size: 13px;
  color: #999;
}

.countdown {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #52c41a;
}

.countdown.warning {
  color: #ff4d4f;
}

.countdown svg {
  width: 16px;
  height: 16px;
}

.status-tag {
  padding: 4px 12px;
  border-radius: 2px;
  font-size: 13px;
}

.status-tag.resolved {
  background: #f6ffed;
  color: #52c41a;
}

.card-body {
  padding: 20px;
}

.feedback-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.feedback-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.handle-result {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.result-label {
  font-size: 13px;
  color: #999;
}

.result-content {
  font-size: 14px;
  color: #333;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
}

.handle-info {
  font-size: 13px;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 4px;
}

.empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
  margin-top: 16px;
  border-radius: 4px;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pagination-btn {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.pagination-btn:disabled {
  color: #d9d9d9;
  cursor: not-allowed;
}

.pagination-page {
  font-size: 14px;
  color: #666;
}

/* 抽屉样式 */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.drawer {
  width: 500px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.drawer-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.drawer-close {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.drawer-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}

.feedback-preview {
  background: #fafafa;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.preview-row {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
}

.preview-row:last-child {
  margin-bottom: 0;
}

.preview-label {
  color: #666;
  width: 80px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item.required .form-label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-item .form-select {
  width: 100%;
}

.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 120px;
}

.checkbox-group {
  display: flex;
  gap: 24px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-item input {
  width: 16px;
  height: 16px;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.detail-label {
  color: #666;
}

.detail-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}
</style>
