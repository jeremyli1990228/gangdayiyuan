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
      <span class="breadcrumb-item active">反馈管理</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">反馈管理</h1>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">提交人姓名</label>
          <input type="text" class="form-input" placeholder="请输入姓名">
        </div>
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
          <label class="filter-label">反馈类型</label>
          <select class="form-select">
            <option value="">全部</option>
            <option value="1">服务态度</option>
            <option value="2">医疗质量</option>
            <option value="3">就医流程</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">状态</label>
          <select class="form-select">
            <option value="">全部</option>
            <option value="0">待处理</option>
            <option value="1">处理中</option>
            <option value="2">已处理</option>
            <option value="3">已评价</option>
          </select>
        </div>
      </div>
      <div class="filter-row" style="margin-top: 12px;">
        <div class="filter-item">
          <label class="filter-label">提交时间</label>
          <input type="date" class="form-input" style="width: 140px;">
          <span style="margin: 0 8px; color: #999;">至</span>
          <input type="date" class="form-input" style="width: 140px;">
        </div>
        <button class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2" stroke-linecap="round"/>
          </svg>
          搜索
        </button>
        <button class="btn btn-secondary">重置</button>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-bar">
      <button class="btn btn-primary">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 8L12 3L7 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 3V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        批量导入
      </button>
      <button class="btn btn-secondary">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15V3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        导出Excel
      </button>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">
          <input type="checkbox" class="checkbox">
        </div>
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 100px;">提交人</div>
        <div class="table-cell" style="width: 80px;">分类</div>
        <div class="table-cell" style="width: 100px;">反馈类型</div>
        <div class="table-cell" style="width: 150px;">提交时间</div>
        <div class="table-cell" style="flex: 1;">问题描述</div>
        <div class="table-cell" style="width: 80px;">状态</div>
        <div class="table-cell" style="width: 150px;">结束时间</div>
        <div class="table-cell" style="width: 100px;">评价</div>
        <div class="table-cell" style="width: 180px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in feedbackList" :key="item.id">
          <div class="table-cell" style="width: 60px;">
            <input type="checkbox" class="checkbox">
          </div>
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.submitterName }}</div>
          <div class="table-cell" style="width: 80px;">{{ item.category }}</div>
          <div class="table-cell" style="width: 100px;">{{ item.feedbackType }}</div>
          <div class="table-cell" style="width: 150px;">{{ item.submitTime }}</div>
          <div class="table-cell" style="flex: 1;">
            <span class="content-preview" @click="showDetail(item)">{{ item.description }}</span>
          </div>
          <div class="table-cell" style="width: 80px;">
            <span :class="['status-tag', getStatusClass(item.status)]">
              {{ getStatusText(item.status) }}
            </span>
          </div>
          <div class="table-cell" style="width: 150px;">{{ item.endTime || '-' }}</div>
          <div class="table-cell" style="width: 100px;">
            <div class="rating" v-if="item.rating">
              <span class="rating-stars">{{ '★'.repeat(item.rating) }}</span>
            </div>
            <span v-else>-</span>
          </div>
          <div class="table-cell" style="width: 180px;">
            <a href="#" class="action-link" @click.prevent="showDetail(item)">详情</a>
            <a href="#" class="action-link" @click.prevent="handleFeedback(item)" v-if="item.status < 2">处理</a>
            <a href="#" class="action-link" @click.prevent="replyFeedback(item)" v-if="item.status === 2">回复</a>
          </div>
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
                <span class="detail-value">{{ currentFeedback.submitterName }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">联系方式：</span>
                <span class="detail-value">{{ currentFeedback.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">分类：</span>
                <span class="detail-value">{{ currentFeedback.category }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">反馈类型：</span>
                <span class="detail-value">{{ currentFeedback.feedbackType }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">提交时间：</span>
                <span class="detail-value">{{ currentFeedback.submitTime }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">状态：</span>
                <span :class="['status-tag', getStatusClass(currentFeedback.status)]">
                  {{ getStatusText(currentFeedback.status) }}
                </span>
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
          <div class="detail-section" v-if="currentFeedback.rating">
            <div class="detail-title">评价信息</div>
            <div class="detail-content">
              <div class="rating-display">
                <span class="rating-stars">{{ '★'.repeat(currentFeedback.rating) }}{{ '☆'.repeat(5 - currentFeedback.rating) }}</span>
                <span class="rating-text">{{ currentFeedback.ratingContent }}</span>
              </div>
            </div>
          </div>
        </div>
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
          <div class="form-item required">
            <label class="form-label">处理结果</label>
            <select class="form-select" v-model="handleForm.result" @change="onResultChange">
              <option value="">请选择处理结果</option>
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
            <label class="form-label">附件上传</label>
            <div class="upload-area">
              <input type="file" id="file-upload" style="display: none;">
              <label for="file-upload" class="upload-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17 8L12 3L7 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 3V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                点击上传
              </label>
            </div>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHandleResultTemplates } from '../../composables/useHandleResultTemplates'

const showDetailDrawer = ref(false)
const showHandleDrawer = ref(false)
const currentPage = ref(1)
const totalPages = ref(5)
const total = ref(48)

const currentFeedback = ref({})
const handleForm = ref({
  result: '',
  opinion: '',
  notifySms: false,
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

const feedbackList = ref([
  { id: 1, submitterName: '张三', phone: '13800138001', category: '投诉', feedbackType: '服务态度', submitTime: '2026-06-01 09:30:00', description: '门诊挂号处工作人员态度冷漠，排队等候时间过长，希望改进服务流程。', status: 0, endTime: null, rating: null, handleResult: '' },
  { id: 2, submitterName: '李四', phone: '13800138002', category: '建议', feedbackType: '就医流程', submitTime: '2026-05-30 14:20:00', description: '建议增加自助挂号机数量，减少排队等候时间。', status: 1, endTime: null, rating: null, handleResult: '' },
  { id: 3, submitterName: '王五', phone: '13800138003', category: '投诉', feedbackType: '医疗质量', submitTime: '2026-05-28 10:15:00', description: '对检查结果有疑问，医生解释不够详细，希望得到更专业的解答。', status: 2, endTime: '2026-05-30 16:00:00', rating: null, handleResult: '已安排专家进行详细解答，患者表示满意。' },
  { id: 4, submitterName: '赵六', phone: '13800138004', category: '咨询', feedbackType: '其他', submitTime: '2026-05-25 11:30:00', description: '请问周末是否可以做体检？需要提前预约吗？', status: 3, endTime: '2026-05-26 09:00:00', rating: 5, ratingContent: '回复很及时，解答很详细，非常满意！', handleResult: '周末可以进行体检，建议提前一周预约。' },
  { id: 5, submitterName: '钱七', phone: '13800138005', category: '投诉', feedbackType: '环境卫生', submitTime: '2026-05-20 15:45:00', description: '住院部3楼卫生间卫生状况较差，希望加强清洁频率。', status: 3, endTime: '2026-05-22 10:00:00', rating: 4, ratingContent: '处理及时，后续有改善', handleResult: '已通知后勤部门加强清洁，并增加清洁频次。' }
])

const getStatusClass = (status) => {
  const classes = ['pending', 'processing', 'resolved', 'rated']
  return classes[status] || 'pending'
}

const getStatusText = (status) => {
  const texts = ['待处理', '处理中', '已处理', '已评价']
  return texts[status] || '待处理'
}

const showDetail = (item) => {
  currentFeedback.value = { ...item }
  showDetailDrawer.value = true
}

const handleFeedback = (item) => {
  currentFeedback.value = { ...item }
  handleForm.value = {
    result: '',
    opinion: '',
    notifySms: false,
    notifyEmail: false
  }
  selectedTemplateId.value = ''
  showHandleDrawer.value = true
}

const replyFeedback = (item) => {
  currentFeedback.value = { ...item }
  selectedTemplateId.value = ''
  showHandleDrawer.value = true
}

const submitHandle = () => {
  if (!handleForm.value.result || !handleForm.value.opinion) {
    alert('请填写完整信息')
    return
  }
  const index = feedbackList.value.findIndex(f => f.id === currentFeedback.value.id)
  if (index > -1) {
    feedbackList.value[index].status = 2
    feedbackList.value[index].handleResult = handleForm.value.opinion
    feedbackList.value[index].endTime = new Date().toLocaleString()
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
  transition: border-color 0.3s;
}

.form-select:focus,
.form-input:focus {
  border-color: #1890ff;
}

.form-select {
  width: 150px;
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

.action-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
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
  max-height: 500px;
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

.checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.content-preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: #1890ff;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.status-tag.pending {
  background: #fff1f0;
  color: #ff4d4f;
}

.status-tag.processing {
  background: #fff7e6;
  color: #fa8c16;
}

.status-tag.resolved {
  background: #f6ffed;
  color: #52c41a;
}

.status-tag.rated {
  background: #e6f7ff;
  color: #1890ff;
}

.rating {
  display: flex;
  align-items: center;
}

.rating-stars {
  color: #faad14;
  font-size: 14px;
}

.action-link {
  color: #1890ff;
  text-decoration: none;
  margin-right: 12px;
  font-size: 14px;
}

.action-link:hover {
  color: #40a9ff;
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
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
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
  width: 600px;
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
}

.detail-label {
  color: #666;
  font-size: 14px;
}

.detail-value {
  color: #333;
  font-size: 14px;
}

.detail-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.rating-display {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rating-text {
  color: #666;
  font-size: 14px;
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

.form-textarea:focus {
  border-color: #1890ff;
}

.upload-area {
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  padding: 24px;
  text-align: center;
}

.upload-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
}

.upload-btn svg {
  width: 32px;
  height: 32px;
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
</style>
