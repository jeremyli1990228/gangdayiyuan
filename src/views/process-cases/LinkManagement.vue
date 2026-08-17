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
      <span class="breadcrumb-item active">涉及环节管理</span>
    </div>

    <div class="page-header">
      <h1 class="page-title">涉及环节管理</h1>
      <button class="btn btn-primary" @click="openAddDrawer">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增涉及环节
      </button>
    </div>

    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 120px;">序号</div>
        <div class="table-cell" style="flex: 1;">涉及环节名称</div>
        <div class="table-cell" style="width: 120px;">排序</div>
        <div class="table-cell" style="width: 180px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="item in linkList" :key="item.id">
          <div class="table-cell" style="width: 120px;">{{ item.id }}</div>
          <div class="table-cell" style="flex: 1;">{{ item.name }}</div>
          <div class="table-cell" style="width: 120px;">{{ item.sort }}</div>
          <div class="table-cell" style="width: 180px;">
            <a href="#" class="action-link" @click.prevent="openEditDrawer(item)">
              <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              编辑
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <div class="pagination-info">共 {{ linkList.length }} 条记录</div>
      <div class="pagination-controls">
        <button class="pagination-btn" :disabled="currentPage === 1">上一页</button>
        <span class="pagination-page">{{ currentPage }} / {{ totalPages }}</span>
        <button class="pagination-btn" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>

    <div class="drawer-overlay" v-if="showDrawer" @click="closeDrawer">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">{{ isEdit ? '编辑涉及环节' : '新增涉及环节' }}</h3>
          <button class="drawer-close" @click="closeDrawer">×</button>
        </div>
        <div class="drawer-body">
          <div class="form-item required">
            <label class="form-label">环节名称</label>
            <input type="text" class="form-input" v-model="formData.name" placeholder="请输入涉及环节名称" maxlength="50">
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
          <button class="btn btn-primary" @click="saveLink">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showDrawer = ref(false)
const isEdit = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)

const formData = ref({
  id: null,
  name: '',
  sort: 0
})

const linkList = ref([
  { id: 100, name: '医疗质量类', sort: 1 },
  { id: 101, name: '医院管理类', sort: 2 },
  { id: 102, name: '医患关系类', sort: 3 }
])

const openAddDrawer = () => {
  isEdit.value = false
  formData.value = { id: null, name: '', sort: 0 }
  showDrawer.value = true
}

const openEditDrawer = (item) => {
  isEdit.value = true
  formData.value = { id: item.id, name: item.name, sort: item.sort }
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = { id: null, name: '', sort: 0 }
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

const saveLink = () => {
  if (!formData.value.name.trim()) {
    alert('请输入涉及环节名称')
    return
  }
  if (isEdit.value) {
    const index = linkList.value.findIndex(item => item.id === formData.value.id)
    if (index > -1) {
      linkList.value[index] = { ...formData.value }
    }
  } else {
    const newId = linkList.value.length > 0
      ? Math.max(...linkList.value.map(item => item.id)) + 1
      : 100
    linkList.value.push({
      id: newId,
      name: formData.value.name.trim(),
      sort: formData.value.sort
    })
  }
  linkList.value.sort((a, b) => a.sort - b.sort)
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
  padding: 14px 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.table-header .table-cell {
  font-weight: 600;
  color: #666;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
}

.action-link:hover {
  color: #40a9ff;
}

.action-icon {
  width: 14px;
  height: 14px;
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

.form-input {
  width: 100%;
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
