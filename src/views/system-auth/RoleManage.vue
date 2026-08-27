<template>
  <div class="page-container">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">系统权限</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">角色管理</span>
    </div>
    
    <!-- 页面标题与操作 -->
    <div class="page-header">
      <h1 class="page-title">角色管理</h1>
      <div class="header-actions">
        <button class="btn btn-primary" @click="handleSearch">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2"/>
          </svg>
          查询
        </button>
        <button class="btn btn-success" @click="openRoleModal()">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          新增
        </button>
      </div>
    </div>
    
    <!-- 搜索栏 -->
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>角色名称</label>
          <input type="text" class="form-input" style="width: 250px;" v-model="searchKeyword" placeholder="请输入角色名称"/>
        </div>
      </div>
    </div>
    
    <!-- 表格 -->
    <div class="table-section">
      <div class="table-container">
        <div class="table-wrapper">
          <div class="table-header">
            <div class="table-cell" style="width: 80px;">序号</div>
            <div class="table-cell" style="width: 200px;">角色名称</div>
            <div class="table-cell" style="width: 200px;">角色标识</div>
            <div class="table-cell" style="width: 250px;">角色描述</div>
            <div class="table-cell" style="width: 200px;">创建时间</div>
            <div class="table-cell" style="width: 240px;">操作</div>
          </div>
          <div class="table-body">
            <div class="table-row" v-for="(role, index) in filteredRoles" :key="role.id">
              <div class="table-cell" style="width: 80px;">{{ index + 1 }}</div>
              <div class="table-cell" style="width: 200px;">{{ role.name }}</div>
              <div class="table-cell" style="width: 200px;">{{ role.code }}</div>
              <div class="table-cell" style="width: 250px;">{{ role.description }}</div>
              <div class="table-cell" style="width: 200px;">{{ role.createTime }}</div>
              <div class="table-cell" style="width: 240px;">
                <a href="#" class="action-link edit" @click.prevent="openRoleModal(role)">
                  <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  编辑
                </a>
                <a href="#" class="action-link delete" @click.prevent="deleteRole(role)">
                  <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  删除
                </a>
                <a href="#" class="action-link permission" @click.prevent="openPermissionDrawer(role)">
                  <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke-width="2"/>
                  </svg>
                  权限
                </a>
              </div>
            </div>
            <div class="table-row empty-row" v-if="filteredRoles.length === 0">
              <div class="table-cell" style="width: 100%; text-align: center; color: #999; padding: 40px;">暂无数据</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分页 -->
      <div class="pagination">
        <div class="pagination-info">共 {{ filteredRoles.length }} 条</div>
        <select class="pagination-select" v-model="pageSize">
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
          <option value="50">50条/页</option>
        </select>
        <div class="pagination-buttons">
          <button class="pagination-btn" :disabled="currentPage === 1" @click="currentPage--">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="pagination-btn active">{{ currentPage }}</button>
          <button class="pagination-btn" :disabled="currentPage >= Math.ceil(filteredRoles.length / pageSize)" @click="currentPage++">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9 18 15 12 9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="pagination-jump">
          前往
          <input type="text" class="jump-input" :value="currentPage" @blur="jumpPage"/>
          页
        </div>
      </div>
    </div>

    <!-- 角色新增/编辑弹窗 -->
    <div class="modal-overlay" v-if="showRoleModal" @click.self="closeRoleModal">
      <div class="modal-content role-modal">
        <div class="modal-header">
          <h3>{{ editingRole ? '编辑角色' : '新增角色' }}</h3>
          <button class="close-btn" @click="closeRoleModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label>角色名称 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="roleForm.name" placeholder="请输入角色名称"/>
          </div>
          <div class="form-item">
            <label>角色标识 <span class="required">*</span></label>
            <input type="text" class="form-input" v-model="roleForm.code" placeholder="请输入角色标识，如 STAFF"/>
          </div>
          <div class="form-item">
            <label>角色描述</label>
            <textarea class="form-textarea" v-model="roleForm.description" placeholder="请输入角色描述"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="closeRoleModal">取消</button>
          <button class="btn btn-primary" @click="saveRole">保存</button>
        </div>
      </div>
    </div>

    <!-- 分配权限抽屉 -->
    <div class="drawer-mask" v-if="showPermissionDrawer" @click="closePermissionDrawer"></div>
    <div class="drawer" :class="{ 'open': showPermissionDrawer }">
      <div class="drawer-header">
        <span class="drawer-title">分配权限</span>
        <button class="drawer-close" @click="closePermissionDrawer">×</button>
      </div>
      <div class="drawer-body">
        <div class="permission-tree">
          <div v-for="node in permissionTree" :key="node.key" class="tree-node">
            <PermissionTreeNode 
              :node="node" 
              :checked-nodes="checkedNodes"
              @toggle="handleNodeToggle"
              @check="handleNodeCheck"
            />
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <button class="btn btn-primary" @click="savePermissions">更新</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PermissionTreeNode from './PermissionTreeNode.vue'

// ============ 角色数据 ============
const roles = ref([
  { id: 1, name: 'PRO员工', code: 'PRO_STAFF', description: 'PRO员工', createTime: '2020-05-15 21:38:40' },
  { id: 2, name: '普通科室员工', code: 'STAFF', description: '普通科室员工', createTime: '2020-05-15 21:41:14' },
  { id: 3, name: '科室主任', code: 'DEPT_DIRECTOR', description: '科室主任', createTime: '2020-09-15 15:04:16' },
  { id: 4, name: '院领导', code: 'LEADER', description: '院领导', createTime: '2020-09-15 15:04:55' },
  { id: 5, name: '管理员', code: 'ROLE_ADMIN', description: '管理员', createTime: '2017-10-29 15:45:51' },
  { id: 6, name: 'PRO管理员', code: 'PRO_ADMIN', description: 'PRO管理员', createTime: '2020-05-15 21:38:01' }
])

// ============ 搜索与分页 ============
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const filteredRoles = computed(() => {
  if (!searchKeyword.value) return roles.value
  return roles.value.filter(r => r.name.includes(searchKeyword.value))
})

const handleSearch = () => {
  currentPage.value = 1
}

const jumpPage = () => {
  // 简化处理
}

// ============ 角色弹窗 ============
const showRoleModal = ref(false)
const editingRole = ref(null)
const roleForm = ref({ name: '', code: '', description: '' })

const openRoleModal = (role = null) => {
  editingRole.value = role
  if (role) {
    roleForm.value = { name: role.name, code: role.code, description: role.description }
  } else {
    roleForm.value = { name: '', code: '', description: '' }
  }
  showRoleModal.value = true
}

const closeRoleModal = () => {
  showRoleModal.value = false
  editingRole.value = null
  roleForm.value = { name: '', code: '', description: '' }
}

const saveRole = () => {
  if (!roleForm.value.name.trim()) {
    alert('请输入角色名称')
    return
  }
  if (!roleForm.value.code.trim()) {
    alert('请输入角色标识')
    return
  }
  if (editingRole.value) {
    const index = roles.value.findIndex(r => r.id === editingRole.value.id)
    if (index > -1) {
      roles.value[index] = { ...roles.value[index], ...roleForm.value }
    }
  } else {
    roles.value.push({
      id: Date.now(),
      ...roleForm.value,
      createTime: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
    })
  }
  closeRoleModal()
}

const deleteRole = (role) => {
  if (confirm(`确定要删除角色"${role.name}"吗？`)) {
    roles.value = roles.value.filter(r => r.id !== role.id)
  }
}

const goBack = () => {
  window.history.back()
}

// ============ 权限树数据 ============
const permissionTree = ref([
  {
    key: 'home',
    title: '首页',
    children: []
  },
  {
    key: 'my-cases',
    title: '我的案件',
    children: [
      { key: 'my-cases-following', title: '我跟进的' },
      { key: 'my-cases-transfer-notice', title: '转办知悉' },
      { key: 'my-cases-opinions', title: '出具科室意见' },
      { key: 'my-cases-validity', title: '有效性判定' },
      { key: 'my-cases-archive', title: '完结归档判定' },
      { key: 'my-cases-transferred-out', title: '我移交的' },
      { key: 'my-cases-transferred-in', title: '移交我的' },
      { key: 'my-cases-initiated-transfer', title: '我发起的转办' },
      { key: 'my-cases-initiated-application', title: '我发起的申请' },
      { key: 'my-cases-copy-to-me', title: '抄送我的' },
      { key: 'my-cases-my-created', title: '我创建的' },
      { key: 'my-cases-all', title: '所有案件' }
    ]
  },
  {
    key: 'complaint',
    title: '投诉管理',
    children: [
      { key: 'complaint-faq', title: '常见问题' },
      { key: 'complaint-wechat-feedback', title: '公众号反馈管理' },
      { key: 'complaint-web-feedback', title: '网站反馈管理' },
      { key: 'complaint-feedback-type', title: '反馈类型' },
      { key: 'complaint-statistics', title: '数据统计' },
      { key: 'complaint-settings', title: '反馈设置' },
      { key: 'complaint-my-feedback', title: '我的反馈' }
    ]
  },
  {
    key: 'petition',
    title: '民生诉求',
    children: [
      { key: 'petition-add', title: '新增案件' },
      { key: 'petition-following', title: '我跟进的' },
      { key: 'petition-transfer-notice', title: '转办知悉' },
      { key: 'petition-opinions', title: '出具科室意见' },
      { key: 'petition-validity', title: '有效性判定' },
      { key: 'petition-archive', title: '完结归档判定' },
      { key: 'petition-transferred-out', title: '我移交的' },
      { key: 'petition-transferred-in', title: '移交我的' },
      { key: 'petition-initiated-transfer', title: '我发起的转办' },
      { key: 'petition-initiated-application', title: '我发起的申请' },
      { key: 'petition-copy-to-me', title: '抄送我的' },
      { key: 'petition-my-created', title: '我创建的' },
      { key: 'petition-all', title: '所有案件' }
    ]
  },
  {
    key: 'process-cases',
    title: '处理案件',
    children: [
      { key: 'process-add', title: '新增案件' },
      { key: 'process-all', title: '所有案件' },
      { key: 'process-drafts', title: '草稿箱' },
      { key: 'process-link', title: '涉及环节管理' },
      { key: 'process-reason', title: '原因管理' },
      { key: 'process-field', title: '案件字段配置' }
    ]
  },
  {
    key: 'report-cases',
    title: '案件报备',
    children: [
      { key: 'report-add', title: '新增报备案件' },
      { key: 'report-mine', title: '我的报备' },
      { key: 'report-all', title: '所有报备' }
    ]
  },
  {
    key: 'questionnaire',
    title: '问卷调查',
    children: [
      { key: 'questionnaire-satisfaction', title: '满意度调查' },
      { key: 'questionnaire-promotion', title: '问卷推广' }
    ]
  },
  {
    key: 'learning',
    title: '学习资料',
    children: [
      { key: 'learning-doc', title: '文档中心' }
    ]
  },
  {
    key: 'statistics',
    title: '数据统计',
    children: [
      { key: 'statistics-trend', title: '案件变化趋势' },
      { key: 'statistics-type', title: '案件受理类型分布' },
      { key: 'statistics-status', title: '案件状态分布' },
      { key: 'statistics-feedback', title: '案件反馈分布' },
      { key: 'statistics-workload', title: '工作量统计' },
      { key: 'statistics-duration', title: '结案时长统计' },
      { key: 'statistics-sample', title: '满意度样本数统计' },
      { key: 'statistics-indicators', title: '满意度分项指标' },
      { key: 'statistics-dashboard', title: '满意度调查看板' },
      { key: 'statistics-complaint-dashboard', title: '案件统计看板' }
    ]
  },
  {
    key: 'social-work',
    title: '社工管理',
    children: [
      { key: 'social-recruitment', title: '招聘管理' },
      { key: 'social-worker', title: '社工管理' },
      { key: 'social-work-time', title: '工时管理' },
      { key: 'social-recruitment-promo', title: '招聘推广' }
    ]
  },
  {
    key: 'contacts',
    title: '通讯录',
    children: [
      { key: 'contacts-employee', title: '员工列表' },
      { key: 'contacts-group', title: '员工组' },
      { key: 'contacts-org', title: '组织关系' },
      { key: 'contacts-feedback', title: '反馈人名单' },
      { key: 'contacts-patient', title: '患者名单' }
    ]
  },
  {
    key: 'messages',
    title: '消息',
    children: [
      { key: 'messages-inbox', title: '站内信' },
      { key: 'messages-email', title: '邮件记录' },
      { key: 'messages-sms', title: '短信记录' },
      { key: 'messages-system-log', title: '系统日志' }
    ]
  },
  {
    key: 'settings',
    title: '设置',
    children: [
      { key: 'settings-public', title: '公共词库' },
      { key: 'settings-personal', title: '个人词库' },
      { key: 'settings-approval', title: '审批设置' },
      { key: 'settings-feedback', title: '反馈配置' }
    ]
  },
  {
    key: 'memo',
    title: '个人备忘录',
    children: [
      { key: 'memo-list', title: '备忘录列表' }
    ]
  },
  {
    key: 'system-auth',
    title: '系统权限',
    children: [
      {
        key: 'system-auth-user',
        title: '用户管理',
        children: [
          { key: 'user-delete', title: '用户删除' },
          { key: 'user-update', title: '用户修改' },
          { key: 'user-add', title: '用户新增' },
          { key: 'user-assign', title: '分配权限' }
        ]
      },
      {
        key: 'system-auth-role',
        title: '角色管理',
        children: [
          { key: 'role-delete', title: '角色删除' },
          { key: 'role-update', title: '角色修改' },
          { key: 'role-add', title: '角色新增' }
        ]
      },
      {
        key: 'system-auth-menu',
        title: '菜单管理',
        children: [
          { key: 'menu-delete', title: '菜单删除' },
          { key: 'menu-update', title: '菜单修改' },
          { key: 'menu-add', title: '菜单新增' }
        ]
      }
    ]
  },
  {
    key: 'system-manage',
    title: '系统管理',
    children: [
      {
        key: 'system-log',
        title: '日志管理',
        children: [
          { key: 'log-delete', title: '日志删除' }
        ]
      },
      {
        key: 'system-dictionary',
        title: '字典管理',
        children: [
          { key: 'dict-update', title: '字典修改' },
          { key: 'dict-add', title: '字典新增' },
          { key: 'dict-delete', title: '字典删除' }
        ]
      },
      {
        key: 'system-terminal',
        title: '终端管理',
        children: [
          { key: 'terminal-update', title: '客户端修改' },
          { key: 'terminal-delete', title: '客户端删除' },
          { key: 'terminal-add', title: '客户端新增' }
        ]
      },
      {
        key: 'system-key',
        title: '密钥管理',
        children: [
          { key: 'key-add', title: '密钥新增' },
          { key: 'key-update', title: '密钥修改' },
          { key: 'key-delete', title: '密钥删除' }
        ]
      },
      {
        key: 'system-token',
        title: '令牌管理',
        children: [
          { key: 'token-delete', title: '令牌删除' }
        ]
      },
      { key: 'system-dynamic-route', title: '动态路由' }
    ]
  }
])

// ============ 权限抽屉 ============
const showPermissionDrawer = ref(false)
const currentRole = ref(null)
const checkedNodes = ref(new Set())

// 预设角色权限：管理员默认全选，其他角色部分
const defaultRolePermissions = {
  'ROLE_ADMIN': 'all',
  'PRO_ADMIN': 'all',
  'PRO_STAFF': ['home', 'my-cases', 'complaint', 'petition', 'process-cases', 'report-cases', 'questionnaire', 'learning', 'statistics', 'social-work', 'contacts', 'messages', 'settings', 'memo'],
  'STAFF': ['home', 'my-cases', 'complaint', 'petition', 'process-cases', 'report-cases', 'questionnaire', 'learning', 'statistics', 'social-work', 'contacts', 'messages', 'settings', 'memo'],
  'DEPT_DIRECTOR': ['home', 'my-cases', 'complaint', 'petition', 'process-cases', 'report-cases', 'questionnaire', 'learning', 'statistics', 'social-work', 'contacts', 'messages', 'settings', 'memo'],
  'LEADER': ['home', 'my-cases', 'complaint', 'petition', 'process-cases', 'report-cases', 'questionnaire', 'learning', 'statistics', 'social-work', 'contacts', 'messages', 'settings', 'memo']
}

// 递归收集所有 key
const collectAllKeys = (nodes) => {
  const keys = []
  const walk = (items) => {
    items.forEach(item => {
      keys.push(item.key)
      if (item.children) walk(item.children)
    })
  }
  walk(nodes)
  return keys
}

// 根据角色生成初始选中状态
const initCheckedNodes = (role) => {
  const preset = defaultRolePermissions[role.code]
  const allKeys = collectAllKeys(permissionTree.value)
  
  if (preset === 'all') {
    return new Set(allKeys)
  }
  
  const checked = new Set()
  if (Array.isArray(preset)) {
    // 选中预设模块及其所有子节点
    const selectModuleAndChildren = (moduleKey) => {
      const findAndSelect = (nodes) => {
        for (const node of nodes) {
          if (node.key === moduleKey) {
            const selectAll = (n) => {
              checked.add(n.key)
              if (n.children) n.children.forEach(selectAll)
            }
            selectAll(node)
            return true
          }
          if (node.children && findAndSelect(node.children)) return true
        }
        return false
      }
      findAndSelect(permissionTree.value)
    }
    preset.forEach(selectModuleAndChildren)
  }
  
  // 管理员角色默认选中系统权限按钮权限
  if (role.code === 'ROLE_ADMIN' || role.code === 'PRO_ADMIN') {
    checked.add('user-delete')
    checked.add('user-update')
    checked.add('user-add')
    checked.add('user-assign')
    checked.add('role-delete')
    checked.add('role-update')
    checked.add('role-add')
    checked.add('menu-delete')
    checked.add('menu-update')
    checked.add('menu-add')
  }
  
  return checked
}

const openPermissionDrawer = (role) => {
  currentRole.value = role
  checkedNodes.value = initCheckedNodes(role)
  showPermissionDrawer.value = true
}

const closePermissionDrawer = () => {
  showPermissionDrawer.value = false
  currentRole.value = null
}

// 递归获取节点及其所有子 key
const getNodeAndChildrenKeys = (node) => {
  const keys = [node.key]
  if (node.children) {
    node.children.forEach(child => {
      keys.push(...getNodeAndChildrenKeys(child))
    })
  }
  return keys
}

// 递归获取节点直接子 key
const getDirectChildrenKeys = (node) => {
  if (!node.children || node.children.length === 0) return []
  return node.children.map(c => c.key)
}

// 检查节点所有子节点是否都被选中
const areAllChildrenChecked = (node) => {
  if (!node.children || node.children.length === 0) return false
  return node.children.every(child => {
    if (child.children && child.children.length > 0) {
      return areAllChildrenChecked(child) && checkedNodes.value.has(child.key)
    }
    return checkedNodes.value.has(child.key)
  })
}

// 检查节点是否部分子节点被选中（半选状态）
const isNodeIndeterminate = (node) => {
  if (!node.children || node.children.length === 0) return false
  const hasChecked = node.children.some(child => {
    if (child.children && child.children.length > 0) {
      return checkedNodes.value.has(child.key) || isNodeIndeterminate(child)
    }
    return checkedNodes.value.has(child.key)
  })
  const allChecked = areAllChildrenChecked(node)
  return hasChecked && !allChecked
}

// 勾选/取消勾选节点（级联）
const handleNodeCheck = ({ keys, checked }) => {
  const newSet = new Set(checkedNodes.value)
  
  if (checked) {
    keys.forEach(k => newSet.add(k))
  } else {
    keys.forEach(k => newSet.delete(k))
  }
  
  checkedNodes.value = newSet
}

// 展开/收起节点
const expandedNodes = ref(new Set())
const handleNodeToggle = (nodeKey) => {
  const newSet = new Set(expandedNodes.value)
  if (newSet.has(nodeKey)) {
    newSet.delete(nodeKey)
  } else {
    newSet.add(nodeKey)
  }
  expandedNodes.value = newSet
}

const savePermissions = () => {
  alert(`角色"${currentRole.value.name}"的权限已更新，共 ${checkedNodes.value.size} 项权限`)
  closePermissionDrawer()
}
</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: 100%;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb-arrow {
  width: 32px;
  height: 32px;
  background-color: #e6f7ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  cursor: pointer;
}

.breadcrumb-arrow svg {
  width: 16px;
  height: 16px;
}

.breadcrumb-item {
  color: #333;
  font-size: 14px;
}

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn-success {
  background-color: #10b981;
  color: #fff;
}

.btn-success:hover {
  background-color: #13c2c2;
}

.btn-default {
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn-default:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.search-form {
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 40px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-item label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  font-weight: 500;
}

.form-input {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.form-textarea {
  width: 100%;
  min-height: 80px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
}

.form-textarea:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.required {
  color: #f5222d;
}

.table-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
}

.table-container {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow-x: auto;
}

.table-wrapper {
  min-width: 1100px;
}

.table-header {
  display: flex;
  background-color: #fafafa;
  padding: 12px 16px;
}

.table-cell {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: left;
  flex-shrink: 0;
}

.table-body {
  padding: 0;
}

.table-row {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #fafafa;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .table-cell {
  font-weight: normal;
  color: #666;
}

.empty-row:hover {
  background-color: transparent !important;
}

.action-link {
  font-size: 14px;
  text-decoration: none;
  margin-right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.link-icon {
  width: 13px;
  height: 13px;
}

.action-link.edit {
  color: #1890ff;
}

.action-link.edit:hover {
  color: #40a9ff;
}

.action-link.delete {
  color: #f5222d;
}

.action-link.delete:hover {
  color: #ff4d4f;
}

.action-link.permission {
  color: #1890ff;
}

.action-link.permission:hover {
  color: #40a9ff;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

.pagination-buttons {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.pagination-btn.active {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn svg {
  width: 14px;
  height: 14px;
}

.pagination-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.jump-input {
  width: 56px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

/* ============ 弹窗 ============ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.role-modal {
  width: 480px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  font-size: 22px;
  color: #999;
  cursor: pointer;
  line-height: 1;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: #f5f5f5;
  color: #333;
}

.modal-body {
  padding: 24px;
}

.modal-body .form-item {
  margin-bottom: 20px;
  display: block;
}

.modal-body .form-item:last-child {
  margin-bottom: 0;
}

.modal-body .form-item label {
  display: block;
  margin-bottom: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
}

/* ============ 抽屉 ============ */
.drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 90vw;
  background: #fff;
  z-index: 1001;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.08);
}

.drawer.open {
  transform: translateX(0);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #3a4a5c;
  color: #fff;
  flex-shrink: 0;
}

.drawer-title {
  font-size: 16px;
  font-weight: 500;
}

.drawer-close {
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.drawer-footer {
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

.permission-tree {
  padding: 0 8px;
}
</style>
