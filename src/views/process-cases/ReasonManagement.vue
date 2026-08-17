<template>
  <div class="page-container">
    <div class="breadcrumb">
      <span class="breadcrumb-item">
        <svg class="breadcrumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">处理案件</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">原因管理</span>
    </div>

    <div class="page-header">
      <h1 class="page-title">原因管理</h1>
      <button class="btn btn-primary" @click="openAddDrawer">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增原因
      </button>
    </div>

    <div class="main-layout">
      <div class="sidebar-panel">
        <div class="sidebar-title">涉及环节</div>
        <div class="sidebar-list">
          <div 
            v-for="link in linkList" 
            :key="link.id"
            class="sidebar-item"
            :class="{ 'active': currentLinkId === link.id }"
            @click="currentLinkId = link.id"
          >
            <span class="arrow">→</span>
            <span class="link-name">{{ link.name }}</span>
          </div>
        </div>
      </div>

      <div class="content-panel">
        <div class="content-header">
          <h2 class="content-title">{{ currentLinkName }}</h2>
        </div>

        <div class="reason-list">
          <div v-for="reason in filteredReasonList" :key="reason.id" class="reason-item">
            <div class="reason-info">
              <div class="reason-name-row">
                <svg class="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="reason-name">{{ reason.name }}</span>
                <span class="level-tag">{{ reason.level === 1 ? '一级' : '二级' }}</span>
              </div>
            </div>
            <div class="reason-actions">
              <span class="sort-text">排序：{{ reason.sort }}</span>
              <a href="#" class="action-link" @click.prevent="openEditDrawer(reason)">
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                编辑
              </a>
              <a href="#" class="action-link delete" @click.prevent="deleteReason(reason)">
                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                删除
              </a>
            </div>
          </div>
          <div v-if="filteredReasonList.length === 0" class="empty-state">
            <p>暂无原因数据</p>
          </div>
        </div>
      </div>
    </div>

    <div class="drawer-overlay" v-if="showDrawer" @click="closeDrawer">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">{{ isEdit ? '编辑原因' : '新增原因' }}</h3>
          <button class="drawer-close" @click="closeDrawer">×</button>
        </div>
        <div class="drawer-body">
          <div class="form-item">
            <label class="form-label">涉及环节</label>
            <select class="form-select" v-model="formData.linkId" :disabled="isEdit">
              <option v-for="link in linkList" :key="link.id" :value="link.id">{{ link.name }}</option>
            </select>
          </div>
          <div class="form-item required">
            <label class="form-label">原因名称</label>
            <input type="text" class="form-input" v-model="formData.name" placeholder="请输入原因名称" maxlength="50">
          </div>
          <div class="form-item">
            <label class="form-label">原因层级</label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" v-model="formData.level" :value="1">
                <span>一级原因</span>
              </label>
              <label class="radio-item">
                <input type="radio" v-model="formData.level" :value="2">
                <span>二级原因</span>
              </label>
            </div>
          </div>
          <div class="form-item" v-if="formData.level === 2">
            <label class="form-label required">上级原因</label>
            <select class="form-select" v-model="formData.parentId">
              <option value="">请选择上级一级原因</option>
              <option 
                v-for="parent in parentOptions" 
                :key="parent.id" 
                :value="parent.id"
              >{{ parent.name }}</option>
            </select>
          </div>
          <div class="form-item">
            <label class="form-label">排序</label>
            <div class="sort-input-wrapper">
              <button class="sort-btn" @click="decreaseSort">-</button>
              <input type="number" class="sort-input" v-model.number="formData.sort" min="0">
              <button class="sort-btn" @click="increaseSort">+</button>
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn btn-secondary" @click="closeDrawer">取消</button>
          <button class="btn btn-primary" @click="saveReason">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showDrawer = ref(false)
const isEdit = ref(false)
const currentLinkId = ref(100)

const formData = ref({
  id: null,
  linkId: 100,
  name: '',
  level: 1,
  parentId: null,
  sort: 0
})

const linkList = ref([
  { id: 100, name: '医疗质量类', sort: 1 },
  { id: 101, name: '医院管理类', sort: 2 },
  { id: 102, name: '医患关系类', sort: 3 }
])

const reasonList = ref([
  // 医疗质量类 - 一级
  { id: 200, linkId: 100, name: '诊断水平', level: 1, parentId: null, sort: 0 },
  { id: 201, linkId: 100, name: '治疗水平', level: 1, parentId: null, sort: 0 },
  { id: 202, linkId: 100, name: '检查质量', level: 1, parentId: null, sort: 0 },
  { id: 203, linkId: 100, name: '护理质量', level: 1, parentId: null, sort: 0 },
  { id: 204, linkId: 100, name: '合理用药', level: 1, parentId: null, sort: 0 },
  { id: 205, linkId: 100, name: '医疗文书', level: 1, parentId: null, sort: 0 },
  // 医院管理类 - 一级
  { id: 210, linkId: 101, name: '就诊制度/流程', level: 1, parentId: null, sort: 0 },
  { id: 211, linkId: 101, name: '医疗安排', level: 1, parentId: null, sort: 0 },
  { id: 212, linkId: 101, name: '过程延迟', level: 1, parentId: null, sort: 0 },
  { id: 213, linkId: 101, name: '医疗费用', level: 1, parentId: null, sort: 0 },
  { id: 214, linkId: 101, name: '医保政策', level: 1, parentId: null, sort: 0 },
  { id: 215, linkId: 101, name: '药品政策', level: 1, parentId: null, sort: 0 },
  { id: 216, linkId: 101, name: '后勤服务', level: 1, parentId: null, sort: 0 },
  // 医患关系类 - 一级
  { id: 220, linkId: 102, name: '沟通不畅', level: 1, parentId: null, sort: 0 },
  { id: 221, linkId: 102, name: '服务态度', level: 1, parentId: null, sort: 0 },
  { id: 222, linkId: 102, name: '患者隐私', level: 1, parentId: null, sort: 0 },
  { id: 223, linkId: 102, name: '知情告知', level: 1, parentId: null, sort: 0 }
])

const currentLinkName = computed(() => {
  const link = linkList.value.find(l => l.id === currentLinkId.value)
  return link ? link.name : ''
})

const filteredReasonList = computed(() => {
  return reasonList.value
    .filter(r => r.linkId === currentLinkId.value)
    .sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level
      if (a.sort !== b.sort) return a.sort - b.sort
      return a.id - b.id
    })
})

const parentOptions = computed(() => {
  return reasonList.value.filter(r => r.linkId === formData.value.linkId && r.level === 1)
})

const openAddDrawer = () => {
  isEdit.value = false
  formData.value = {
    id: null,
    linkId: currentLinkId.value,
    name: '',
    level: 1,
    parentId: null,
    sort: 0
  }
  showDrawer.value = true
}

const openEditDrawer = (item) => {
  isEdit.value = true
  formData.value = {
    id: item.id,
    linkId: item.linkId,
    name: item.name,
    level: item.level,
    parentId: item.parentId,
    sort: item.sort
  }
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    id: null,
    linkId: currentLinkId.value,
    name: '',
    level: 1,
    parentId: null,
    sort: 0
  }
  isEdit.value = false
}

const decreaseSort = () => {
  if (formData.value.sort > 0) {
    formData.value.sort--
  }
}

const increaseSort = () => {
  formData.value.sort++
}

const deleteReason = (item) => {
  if (confirm(`确定要删除原因"${item.name}"吗？`)) {
    const index = reasonList.value.findIndex(r => r.id === item.id)
    if (index > -1) {
      reasonList.value.splice(index, 1)
    }
  }
}

const saveReason = () => {
  if (!formData.value.name.trim()) {
    alert('请输入原因名称')
    return
  }
  if (formData.value.level === 2 && !formData.value.parentId) {
    alert('请选择上级一级原因')
    return
  }
  if (isEdit.value) {
    const index = reasonList.value.findIndex(r => r.id === formData.value.id)
    if (index > -1) {
      reasonList.value[index] = { ...formData.value, name: formData.value.name.trim() }
    }
  } else {
    const newId = reasonList.value.length > 0
      ? Math.max(...reasonList.value.map(r => r.id)) + 1
      : 200
    reasonList.value.push({
      id: newId,
      linkId: formData.value.linkId,
      name: formData.value.name.trim(),
      level: formData.value.level,
      parentId: formData.value.level === 2 ? formData.value.parentId : null,
      sort: formData.value.sort
    })
  }
  closeDrawer()
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
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

.main-layout {
  display: flex;
  gap: 16px;
  min-height: calc(100vh - 180px);
}

.sidebar-panel {
  width: 200px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  padding: 0 16px 12px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 8px;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-item:hover {
  background: #f5f7fa;
}

.sidebar-item.active {
  background: #e6f7ff;
  border-left-color: #1890ff;
  color: #1890ff;
}

.sidebar-item.active .arrow {
  color: #1890ff;
}

.arrow {
  width: 16px;
  color: #999;
  font-size: 12px;
  margin-right: 8px;
  flex-shrink: 0;
}

.link-name {
  font-size: 14px;
  color: #333;
}

.sidebar-item.active .link-name {
  color: #1890ff;
}

.content-panel {
  flex: 1;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.content-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.content-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.reason-list {
  padding: 8px 0;
}

.reason-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.reason-item:hover {
  background: #f5f7fa;
}

.reason-info {
  flex: 1;
}

.reason-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reason-icon {
  width: 16px;
  height: 16px;
  color: #1890ff;
  flex-shrink: 0;
}

.reason-name {
  font-size: 14px;
  color: #333;
}

.level-tag {
  display: inline-block;
  padding: 2px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 2px;
  font-size: 12px;
}

.reason-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.sort-text {
  font-size: 13px;
  color: #999;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #1890ff;
  text-decoration: none;
  font-size: 13px;
  cursor: pointer;
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

.action-icon {
  width: 14px;
  height: 14px;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: #999;
}

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
  width: 480px;
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

.form-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #1890ff;
}

.form-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background: #fff;
  transition: border-color 0.3s;
}

.form-select:focus {
  border-color: #1890ff;
}

.form-select:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.radio-item input[type="radio"] {
  margin: 0;
}

.sort-input-wrapper {
  display: flex;
  align-items: center;
  width: 160px;
}

.sort-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  background: #fafafa;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.sort-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.sort-input {
  flex: 1;
  height: 32px;
  text-align: center;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-left: none;
  border-right: none;
  font-size: 14px;
  outline: none;
  -moz-appearance: textfield;
}

.sort-input::-webkit-outer-spin-button,
.sort-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}
</style>
