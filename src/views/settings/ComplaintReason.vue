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
      <span class="breadcrumb-item">设置</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">投诉原因</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">投诉原因分类</h1>
      <div class="page-tip">
        <svg viewBox="0 0 24 24" fill="none" stroke="#faad14">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path d="M12 8V12M12 16H12.01" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>投诉原因已改为单选模式，便于统计分析</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-bar">
      <button class="btn btn-primary" @click="addReason">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
        </svg>
        新增原因
      </button>
    </div>

    <!-- 树形结构 -->
    <div class="tree-container">
      <div class="tree-node" v-for="reason in reasonTree" :key="reason.id">
        <div class="node-content">
          <span class="expand-icon" @click="toggleExpand(reason)">
            <svg v-if="reason.children && reason.children.length" :class="['arrow', reason.expanded ? 'expanded' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18L15 12L9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="node-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="node-name">{{ reason.name }}</span>
          <span class="node-count">({{ reason.count || 0 }}次)</span>
          <span class="node-level">Level {{ reason.level }}</span>
          <div class="node-actions">
            <button class="action-btn" @click="addChildReason(reason)" v-if="reason.level < 3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="action-btn" @click="editReason(reason)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="action-btn delete" @click="deleteReason(reason)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 6H5H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="node-children" v-if="reason.expanded && reason.children && reason.children.length">
          <div class="tree-node" v-for="child in reason.children" :key="child.id">
            <div class="node-content">
              <span class="expand-icon" @click="toggleExpand(child)">
                <svg v-if="child.children && child.children.length" :class="['arrow', child.expanded ? 'expanded' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18L15 12L9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="node-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="node-name">{{ child.name }}</span>
              <span class="node-count">({{ child.count || 0 }}次)</span>
              <span class="node-level">Level {{ child.level }}</span>
              <div class="node-actions">
                <button class="action-btn" @click="addChildReason(child)" v-if="child.level < 3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
                <button class="action-btn" @click="editReason(child)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="action-btn delete" @click="deleteReason(child)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 6H5H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="node-children" v-if="child.expanded && child.children && child.children.length">
              <div class="tree-node" v-for="grandChild in child.children" :key="grandChild.id">
                <div class="node-content">
                  <span class="expand-icon"></span>
                  <span class="node-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span class="node-name">{{ grandChild.name }}</span>
                  <span class="node-count">({{ grandChild.count || 0 }}次)</span>
                  <span class="node-level">Level {{ grandChild.level }}</span>
                  <div class="node-actions">
                    <button class="action-btn" @click="editReason(grandChild)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button class="action-btn delete" @click="deleteReason(grandChild)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 6H5H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <div class="drawer-overlay" v-if="showDrawer" @click="showDrawer = false">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">{{ isEdit ? '编辑投诉原因' : '新增投诉原因' }}</h3>
          <button class="drawer-close" @click="showDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="form-item required">
            <label class="form-label">原因名称</label>
            <input type="text" class="form-input" v-model="formData.name" placeholder="请输入原因名称">
          </div>
          <div class="form-item">
            <label class="form-label">描述</label>
            <textarea class="form-textarea" v-model="formData.description" placeholder="请输入描述" rows="3"></textarea>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn btn-secondary" @click="showDrawer = false">取消</button>
          <button class="btn btn-primary" @click="saveReason">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showDrawer = ref(false)
const isEdit = ref(false)

const formData = ref({
  name: '',
  description: ''
})

const reasonTree = ref([
  {
    id: 1, name: '服务态度', level: 1, count: 64, expanded: true,
    children: [
      { id: 11, name: '医护态度', level: 2, count: 28, expanded: true, children: [
        { id: 111, name: '沟通不耐心', level: 3, count: 15 },
        { id: 112, name: '态度冷漠', level: 3, count: 8 },
        { id: 113, name: '言语不当', level: 3, count: 5 }
      ]},
      { id: 12, name: '护士态度', level: 2, count: 20, expanded: false, children: [
        { id: 121, name: '护理不周', level: 3, count: 12 },
        { id: 122, name: '回应不及时', level: 3, count: 8 }
      ]},
      { id: 13, name: '行政人员态度', level: 2, count: 16, expanded: false, children: [] }
    ]
  },
  {
    id: 2, name: '医疗质量', level: 1, count: 51, expanded: false,
    children: [
      { id: 21, name: '诊断问题', level: 2, count: 22, expanded: false, children: [] },
      { id: 22, name: '治疗效果', level: 2, count: 18, expanded: false, children: [] },
      { id: 23, name: '用药问题', level: 2, count: 11, expanded: false, children: [] }
    ]
  },
  {
    id: 3, name: '就医流程', level: 1, count: 38, expanded: false,
    children: [
      { id: 31, name: '挂号困难', level: 2, count: 15, expanded: false, children: [] },
      { id: 32, name: '候诊时间长', level: 2, count: 12, expanded: false, children: [] },
      { id: 33, name: '缴费不便', level: 2, count: 11, expanded: false, children: [] }
    ]
  },
  {
    id: 4, name: '环境卫生', level: 1, count: 26, expanded: false,
    children: [
      { id: 41, name: '病房卫生', level: 2, count: 10, expanded: false, children: [] },
      { id: 42, name: '公共区域', level: 2, count: 8, expanded: false, children: [] },
      { id: 43, name: '设施设备', level: 2, count: 8, expanded: false, children: [] }
    ]
  },
  {
    id: 5, name: '收费问题', level: 1, count: 32, expanded: false,
    children: [
      { id: 51, name: '收费过高', level: 2, count: 15, expanded: false, children: [] },
      { id: 52, name: '收费不透明', level: 2, count: 10, expanded: false, children: [] },
      { id: 53, name: '退费困难', level: 2, count: 7, expanded: false, children: [] }
    ]
  }
])

const toggleExpand = (reason) => {
  reason.expanded = !reason.expanded
}

const addReason = () => {
  isEdit.value = false
  formData.value = { name: '', description: '' }
  showDrawer.value = true
}

const addChildReason = (parent) => {
  isEdit.value = false
  formData.value = { name: '', description: '', parentId: parent.id }
  showDrawer.value = true
}

const editReason = (reason) => {
  isEdit.value = true
  formData.value = { ...reason }
  showDrawer.value = true
}

const deleteReason = (reason) => {
  if (reason.children && reason.children.length) {
    alert('请先删除子原因')
    return
  }
  if (confirm('确定要删除该投诉原因吗？')) {
    // 删除逻辑
  }
}

const saveReason = () => {
  if (!formData.value.name) {
    alert('请输入原因名称')
    return
  }
  showDrawer.value = false
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

.page-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 13px;
  color: #fa8c16;
}

.page-tip svg {
  width: 16px;
  height: 16px;
}

.action-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
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

.btn-icon {
  width: 14px;
  height: 14px;
}

.tree-container {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.tree-node {
  margin-bottom: 4px;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s;
}

.node-content:hover {
  background: #f5f7fa;
}

.expand-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.expand-icon .arrow {
  width: 14px;
  height: 14px;
  color: #999;
  transition: transform 0.3s;
}

.expand-icon .arrow.expanded {
  transform: rotate(90deg);
}

.node-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: #1890ff;
}

.node-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.node-count {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.node-level {
  font-size: 12px;
  color: #1890ff;
  background: #e6f7ff;
  padding: 2px 6px;
  border-radius: 2px;
  margin-left: 12px;
}

.node-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

.action-btn {
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  border-radius: 4px;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #f0f0f0;
  color: #1890ff;
}

.action-btn.delete:hover {
  color: #ff4d4f;
}

.action-btn svg {
  width: 14px;
  height: 14px;
}

.node-children {
  margin-left: 40px;
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
}

.form-input:focus {
  border-color: #1890ff;
}

.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
}
</style>
