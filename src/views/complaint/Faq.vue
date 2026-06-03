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
      <span class="breadcrumb-item active">常见问题</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">常见问题</h1>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">问题分类</label>
          <select class="form-select">
            <option value="">全部</option>
            <option value="1">服务态度</option>
            <option value="2">医疗质量</option>
            <option value="3">就医流程</option>
            <option value="4">环境卫生</option>
            <option value="5">其他</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">关键词</label>
          <input type="text" class="form-input" placeholder="请输入关键词搜索">
        </div>
        <div class="filter-item">
          <label class="filter-label">状态</label>
          <select class="form-select">
            <option value="">全部</option>
            <option value="1">启用</option>
            <option value="0">禁用</option>
          </select>
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
      <button class="btn btn-primary" @click="showAddDrawer = true">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增问题
      </button>
      <button class="btn btn-secondary">
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
        导出
      </button>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 120px;">问题分类</div>
        <div class="table-cell" style="width: 250px;">问题标题</div>
        <div class="table-cell" style="flex: 1;">问题内容</div>
        <div class="table-cell" style="width: 80px;">排序</div>
        <div class="table-cell" style="width: 80px;">状态</div>
        <div class="table-cell" style="width: 160px;">创建时间</div>
        <div class="table-cell" style="width: 180px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in faqList" :key="item.id">
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.category }}</div>
          <div class="table-cell" style="width: 250px;">{{ item.title }}</div>
          <div class="table-cell" style="flex: 1;">
            <span class="content-preview">{{ item.content }}</span>
          </div>
          <div class="table-cell" style="width: 80px;">{{ item.sort }}</div>
          <div class="table-cell" style="width: 80px;">
            <span :class="['status-tag', item.status ? 'active' : 'inactive']">
              {{ item.status ? '启用' : '禁用' }}
            </span>
          </div>
          <div class="table-cell" style="width: 160px;">{{ item.createTime }}</div>
          <div class="table-cell" style="width: 180px;">
            <a href="#" class="action-link" @click.prevent="editFaq(item)">编辑</a>
            <a href="#" class="action-link" @click.prevent="toggleStatus(item)">
              {{ item.status ? '禁用' : '启用' }}
            </a>
            <a href="#" class="action-link delete" @click.prevent="deleteFaq(item)">删除</a>
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

    <!-- 新增/编辑抽屉 -->
    <div class="drawer-overlay" v-if="showAddDrawer" @click="showAddDrawer = false">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">{{ isEdit ? '编辑问题' : '新增问题' }}</h3>
          <button class="drawer-close" @click="showAddDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="form-item required">
            <label class="form-label">问题分类</label>
            <select class="form-select" v-model="formData.category">
              <option value="">请选择分类</option>
              <option value="服务态度">服务态度</option>
              <option value="医疗质量">医疗质量</option>
              <option value="就医流程">就医流程</option>
              <option value="环境卫生">环境卫生</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-item required">
            <label class="form-label">问题标题</label>
            <input type="text" class="form-input" v-model="formData.title" placeholder="请输入问题标题" maxlength="200">
            <div class="form-tip">{{ formData.title.length }}/200</div>
          </div>
          <div class="form-item required">
            <label class="form-label">问题内容</label>
            <textarea class="form-textarea" v-model="formData.content" placeholder="请输入问题内容" rows="6"></textarea>
          </div>
          <div class="form-item">
            <label class="form-label">排序</label>
            <input type="number" class="form-input" v-model="formData.sort" placeholder="数字越小越靠前">
          </div>
          <div class="form-item">
            <label class="form-label">状态</label>
            <div class="switch-wrapper">
              <span :class="['switch', formData.status ? 'active' : '']" @click="formData.status = !formData.status">
                <span class="switch-dot"></span>
              </span>
              <span class="switch-text">{{ formData.status ? '启用' : '禁用' }}</span>
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn btn-secondary" @click="showAddDrawer = false">取消</button>
          <button class="btn btn-primary" @click="saveFaq">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAddDrawer = ref(false)
const isEdit = ref(false)
const currentPage = ref(1)
const totalPages = ref(3)
const total = ref(25)

const formData = ref({
  category: '',
  title: '',
  content: '',
  sort: 0,
  status: true
})

const faqList = ref([
  { id: 1, category: '服务态度', title: '医护人员态度不好怎么办？', content: '如遇到医护人员态度不好的情况，请记录具体时间、地点和人员，可通过投诉渠道进行反馈...', sort: 1, status: true, createTime: '2026-05-15 10:30:00' },
  { id: 2, category: '就医流程', title: '如何预约挂号？', content: '您可以通过以下方式预约挂号：1. 微信公众号预约 2. 医院官网预约 3. 现场自助机预约...', sort: 2, status: true, createTime: '2026-05-14 15:20:00' },
  { id: 3, category: '医疗质量', title: '对诊断结果有疑问怎么办？', content: '如对诊断结果有疑问，可申请专家会诊或到上级医院进行复诊，也可通过医务处进行咨询...', sort: 3, status: true, createTime: '2026-05-13 09:45:00' },
  { id: 4, category: '环境卫生', title: '病房环境问题如何反映？', content: '如发现病房环境问题（如卫生不达标、设施损坏等），可向护士站或后勤部门反映...', sort: 4, status: true, createTime: '2026-05-12 14:10:00' },
  { id: 5, category: '其他', title: '医院停车难怎么解决？', content: '医院停车场资源有限，建议：1. 乘坐公共交通 2. 错峰就诊 3. 使用周边社会停车场...', sort: 5, status: false, createTime: '2026-05-11 11:30:00' }
])

const editFaq = (item) => {
  isEdit.value = true
  formData.value = { ...item }
  showAddDrawer.value = true
}

const toggleStatus = (item) => {
  item.status = !item.status
}

const deleteFaq = (item) => {
  if (confirm('确定要删除该问题吗？')) {
    const index = faqList.value.findIndex(f => f.id === item.id)
    if (index > -1) {
      faqList.value.splice(index, 1)
    }
  }
}

const saveFaq = () => {
  if (!formData.value.category || !formData.value.title || !formData.value.content) {
    alert('请填写完整信息')
    return
  }
  if (isEdit.value) {
    const index = faqList.value.findIndex(f => f.id === formData.value.id)
    if (index > -1) {
      faqList.value[index] = { ...formData.value }
    }
  } else {
    faqList.value.unshift({
      ...formData.value,
      id: Date.now(),
      createTime: new Date().toLocaleString()
    })
  }
  showAddDrawer.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    category: '',
    title: '',
    content: '',
    sort: 0,
    status: true
  }
  isEdit.value = false
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
  width: 180px;
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

.content-preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.status-tag.active {
  background: #e6f7ff;
  color: #1890ff;
}

.status-tag.inactive {
  background: #fff1f0;
  color: #ff4d4f;
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

.action-link.delete {
  color: #ff4d4f;
}

.action-link.delete:hover {
  color: #ff7875;
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

.form-item .form-select,
.form-item .form-input {
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

.form-tip {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}

.switch-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch {
  width: 44px;
  height: 22px;
  background: #bfbfbf;
  border-radius: 11px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.switch.active {
  background: #1890ff;
}

.switch-dot {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}

.switch.active .switch-dot {
  transform: translateX(22px);
}

.switch-text {
  font-size: 14px;
  color: #666;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}
</style>
