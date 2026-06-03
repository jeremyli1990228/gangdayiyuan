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
      <span class="breadcrumb-item active">反馈类型</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">反馈类型</h1>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">类型名称</label>
          <input type="text" class="form-input" placeholder="请输入类型名称">
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
        新增类型
      </button>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <div class="table-header">
        <div class="table-cell" style="width: 60px;">序号</div>
        <div class="table-cell" style="width: 200px;">类型名称</div>
        <div class="table-cell" style="width: 250px;">管理员</div>
        <div class="table-cell" style="width: 80px;">状态</div>
        <div class="table-cell" style="flex: 1;">描述</div>
        <div class="table-cell" style="width: 160px;">创建时间</div>
        <div class="table-cell" style="width: 180px;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in typeList" :key="item.id">
          <div class="table-cell" style="width: 60px;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 200px;">{{ item.name }}</div>
          <div class="table-cell" style="width: 250px;">
            <div class="admin-tags">
              <span class="admin-tag" v-for="admin in item.admins" :key="admin">{{ admin }}</span>
            </div>
          </div>
          <div class="table-cell" style="width: 80px;">
            <span :class="['status-tag', item.status ? 'active' : 'inactive']">
              {{ item.status ? '启用' : '禁用' }}
            </span>
          </div>
          <div class="table-cell" style="flex: 1;">{{ item.description }}</div>
          <div class="table-cell" style="width: 160px;">{{ item.createTime }}</div>
          <div class="table-cell" style="width: 180px;">
            <a href="#" class="action-link" @click.prevent="editType(item)">编辑</a>
            <a href="#" class="action-link" @click.prevent="toggleStatus(item)">
              {{ item.status ? '禁用' : '启用' }}
            </a>
            <a href="#" class="action-link delete" @click.prevent="deleteType(item)">删除</a>
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
          <h3 class="drawer-title">{{ isEdit ? '编辑类型' : '新增类型' }}</h3>
          <button class="drawer-close" @click="showAddDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="form-item required">
            <label class="form-label">类型名称</label>
            <input type="text" class="form-input" v-model="formData.name" placeholder="请输入类型名称" maxlength="50">
          </div>
          <div class="form-item required">
            <label class="form-label">管理员</label>
            <div class="admin-select">
              <div class="selected-admins">
                <span class="admin-tag" v-for="admin in formData.admins" :key="admin">
                  {{ admin }}
                  <button class="remove-btn" @click="removeAdmin(admin)">×</button>
                </span>
              </div>
              <select class="form-select" @change="addAdmin($event)">
                <option value="">请选择管理员</option>
                <option v-for="user in userList" :key="user" :value="user">{{ user }}</option>
              </select>
            </div>
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
          <div class="form-item">
            <label class="form-label">描述</label>
            <textarea class="form-textarea" v-model="formData.description" placeholder="请输入描述" rows="4"></textarea>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn btn-secondary" @click="showAddDrawer = false">取消</button>
          <button class="btn btn-primary" @click="saveType">保存</button>
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
const totalPages = ref(2)
const total = ref(8)

const formData = ref({
  name: '',
  admins: [],
  status: true,
  description: ''
})

const userList = ref(['付世平', '张三', '李四', '王五', '赵六', '钱七'])

const typeList = ref([
  { id: 1, name: '服务态度', admins: ['付世平', '张三'], status: true, description: '涉及医护人员服务态度方面的投诉', createTime: '2026-05-01 10:00:00' },
  { id: 2, name: '医疗质量', admins: ['李四', '王五'], status: true, description: '涉及医疗技术、诊断治疗质量方面的投诉', createTime: '2026-05-01 10:05:00' },
  { id: 3, name: '就医流程', admins: ['赵六'], status: true, description: '涉及挂号、缴费、检查等流程方面的投诉', createTime: '2026-05-01 10:10:00' },
  { id: 4, name: '环境卫生', admins: ['钱七', '付世平'], status: true, description: '涉及医院环境卫生、设施设备方面的投诉', createTime: '2026-05-01 10:15:00' },
  { id: 5, name: '收费问题', admins: ['张三', '李四'], status: true, description: '涉及医疗收费、退费等方面的投诉', createTime: '2026-05-01 10:20:00' },
  { id: 6, name: '医德医风', admins: ['王五'], status: false, description: '涉及医务人员职业道德方面的投诉', createTime: '2026-05-01 10:25:00' }
])

const editType = (item) => {
  isEdit.value = true
  formData.value = { ...item, admins: [...item.admins] }
  showAddDrawer.value = true
}

const toggleStatus = (item) => {
  item.status = !item.status
}

const deleteType = (item) => {
  if (confirm('确定要删除该类型吗？')) {
    const index = typeList.value.findIndex(t => t.id === item.id)
    if (index > -1) {
      typeList.value.splice(index, 1)
    }
  }
}

const addAdmin = (event) => {
  const admin = event.target.value
  if (admin && !formData.value.admins.includes(admin)) {
    formData.value.admins.push(admin)
  }
  event.target.value = ''
}

const removeAdmin = (admin) => {
  const index = formData.value.admins.indexOf(admin)
  if (index > -1) {
    formData.value.admins.splice(index, 1)
  }
}

const saveType = () => {
  if (!formData.value.name || formData.value.admins.length === 0) {
    alert('请填写完整信息')
    return
  }
  if (isEdit.value) {
    const index = typeList.value.findIndex(t => t.id === formData.value.id)
    if (index > -1) {
      typeList.value[index] = { ...formData.value }
    }
  } else {
    typeList.value.unshift({
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
    name: '',
    admins: [],
    status: true,
    description: ''
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

.admin-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.admin-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 2px;
  font-size: 12px;
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
  min-height: 100px;
}

.form-textarea:focus {
  border-color: #1890ff;
}

.admin-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.selected-admins {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.selected-admins .admin-tag {
  padding: 4px 8px;
}

.remove-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
  font-size: 14px;
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
