<template>
  <div class="notification-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">消息通知</span>
    </div>
    
    <div class="content-grid">
      <!-- 左侧导航 -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">消息中心</h2>
          <span class="unread-badge">{{ totalUnread }}</span>
        </div>
        <div class="menu-list">
          <div v-for="menu in menuList" 
               :key="menu.key"
               :class="['menu-item', {active: activeMenu === menu.key}]"
               @click="activeMenu = menu.key">
            <span class="menu-icon">{{ menu.icon }}</span>
            <span class="menu-name">{{ menu.name }}</span>
            <span v-if="menu.unread > 0" class="menu-unread">{{ menu.unread }}</span>
          </div>
        </div>
        <div class="sidebar-footer">
          <button class="btn btn-outline" @click="markAllRead">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            全部标为已读
          </button>
        </div>
      </div>
      
      <!-- 右侧内容 -->
      <div class="main-content">
        <!-- 头部操作 -->
        <div class="content-header">
          <div class="header-tabs">
            <button v-for="tab in tabs" 
                    :key="tab.key"
                    :class="['tab-btn', {active: activeTab === tab.key}]"
                    @click="activeTab = tab.key">
              {{ tab.name }}
            </button>
          </div>
          <div class="header-actions">
            <div class="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" stroke-width="2"/>
                <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <input type="text" placeholder="搜索消息..." />
            </div>
            <button class="btn-icon" title="设置">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" stroke-width="2"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 消息列表 -->
        <div class="message-list">
          <div v-for="msg in filteredMessages" 
               :key="msg.id"
               :class="['message-item', {unread: !msg.read}]"
               @click="viewMessage(msg)">
            <div class="message-avatar" :style="{background: msg.avatarBg}">
              <span>{{ msg.avatar }}</span>
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="message-sender">{{ msg.sender }}</span>
                <span class="message-time">{{ msg.time }}</span>
              </div>
              <h4 class="message-title">{{ msg.title }}</h4>
              <p class="message-desc">{{ msg.desc }}</p>
              <div v-if="msg.tags" class="message-tags">
                <span v-for="tag in msg.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="message-actions">
              <div v-if="!msg.read" class="unread-dot"></div>
              <button class="action-btn" @click.stop="toggleStar(msg)">
                <svg :class="['star-icon', {starred: msg.starred}]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="action-btn more-btn" @click.stop>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="1" stroke-width="2"/>
                  <circle cx="19" cy="12" r="1" stroke-width="2"/>
                  <circle cx="5" cy="12" r="1" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-if="filteredMessages.length === 0" class="empty-state">
            <div class="empty-icon">📭</div>
            <h3 class="empty-title">暂无消息</h3>
            <p class="empty-desc">这里会显示您的所有通知消息</p>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="pagination">
          <button class="page-btn" disabled>上一页</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">下一页</button>
        </div>
      </div>
    </div>
    
    <!-- 消息详情弹窗 -->
    <div class="modal-overlay" v-if="showDetail" @click.self="showDetail = false">
      <div class="modal detail-modal">
        <div class="modal-header">
          <h3 class="modal-title">{{ currentMessage.title }}</h3>
          <button class="modal-close" @click="showDetail = false">×</button>
        </div>
        <div class="modal-body">
          <div class="detail-meta">
            <div class="detail-avatar" :style="{background: currentMessage.avatarBg}">
              <span>{{ currentMessage.avatar }}</span>
            </div>
            <div class="detail-info">
              <span class="detail-sender">{{ currentMessage.sender }}</span>
              <span class="detail-time">{{ currentMessage.time }}</span>
            </div>
          </div>
          <div class="detail-content">
            <p>{{ currentMessage.fullContent }}</p>
            <div v-if="currentMessage.attachments" class="detail-attachments">
              <h5 class="attachments-title">附件</h5>
              <div class="attachment-list">
                <div v-for="file in currentMessage.attachments" :key="file.name" class="attachment-item">
                  <span class="file-icon">{{ file.icon }}</span>
                  <span class="file-name">{{ file.name }}</span>
                  <button class="download-btn">下载</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="footer-actions">
            <button class="btn btn-secondary" @click="showDetail = false">关闭</button>
            <button v-if="currentMessage.showReply" class="btn btn-primary">回复</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeMenu = ref('all')
const activeTab = ref('all')
const showDetail = ref(false)
const currentMessage = ref({})

const menuList = ref([
  { key: 'all', name: '全部消息', icon: '📥', unread: 12 },
  { key: 'case', name: '案件通知', icon: '📋', unread: 5 },
  { key: 'task', name: '任务提醒', icon: '✅', unread: 3 },
  { key: 'system', name: '系统公告', icon: '📢', unread: 2 },
  { key: 'approval', name: '审批消息', icon: '📝', unread: 2 },
  { key: 'starred', name: '星标消息', icon: '⭐', unread: 0 }
])

const totalUnread = computed(() => {
  return menuList.value.filter(m => m.key !== 'starred').reduce((sum, m) => sum + m.unread, 0)
})

const tabs = ref([
  { key: 'all', name: '全部' },
  { key: 'unread', name: '未读' },
  { key: 'today', name: '今天' },
  { key: 'week', name: '本周' }
])

const messages = ref([
  {
    id: 1,
    sender: '系统通知',
    avatar: '系',
    avatarBg: 'linear-gradient(135deg, #1890ff, #69c0ff)',
    title: '案件 TS2024010089 即将超时',
    desc: '您负责的案件 TS2024010089 还有2小时就要超时，请尽快处理。',
    fullContent: '您负责的案件 TS2024010089 还有2小时就要超时，请尽快处理。\n\n案件信息：\n- 案件编号：TS2024010089\n- 投诉人：王先生\n- 涉及科室：门诊部\n- 截止时间：2024-01-15 18:00\n\n请及时跟进处理进度，确保案件按时结案。',
    time: '刚刚',
    tags: ['紧急', '案件'],
    read: false,
    starred: false,
    type: 'case',
    showReply: false,
    attachments: [
      { name: '案件详情.pdf', icon: '📄' },
      { name: '处理记录.xlsx', icon: '📊' }
    ]
  },
  {
    id: 2,
    sender: '李主管',
    avatar: '李',
    avatarBg: 'linear-gradient(135deg, #52c41a, #95de64)',
    title: '请审批：新员工入职申请',
    desc: '李主管提交了新员工入职审批申请，请您尽快处理。',
    fullContent: '李主管提交了新员工入职审批申请，请您尽快处理。\n\n申请人：张三\n申请部门：医务科\n申请日期：2024-01-15\n\n请登录系统进行审批操作。',
    time: '10分钟前',
    tags: ['审批'],
    read: false,
    starred: true,
    type: 'approval',
    showReply: true
  },
  {
    id: 3,
    sender: '任务中心',
    avatar: '任',
    avatarBg: 'linear-gradient(135deg, #faad14, #ffc53d)',
    title: '您有3个待处理任务',
    desc: '今日待处理：案件回访、满意度调查、报告撰写。',
    fullContent: '今日待处理任务提醒：\n1. 案件回访 - 10:00\n2. 满意度调查 - 14:00  \n3. 月度报告撰写 - 17:00\n\n请合理安排时间完成各项任务。',
    time: '30分钟前',
    tags: ['任务', '今日'],
    read: false,
    starred: false,
    type: 'task',
    showReply: false
  },
  {
    id: 4,
    sender: '系统管理员',
    avatar: '管',
    avatarBg: 'linear-gradient(135deg, #722ed1, #b37feb)',
    title: '系统将于今晚进行维护',
    desc: '系统将于今晚22:00-次日02:00进行系统维护升级，请提前做好数据保存。',
    fullContent: '系统维护通知：\n\n维护时间：2024-01-15 22:00 - 2024-01-16 02:00\n维护内容：\n1. 数据库优化\n2. 安全补丁更新\n3. 性能提升\n\n请提前保存好正在进行的工作，避免数据丢失。维护期间系统将无法访问。',
    time: '1小时前',
    tags: ['系统', '维护'],
    read: true,
    starred: false,
    type: 'system',
    showReply: false
  },
  {
    id: 5,
    sender: '张小明',
    avatar: '张',
    avatarBg: 'linear-gradient(135deg, #13c2c2, #6eddd5)',
    title: '案件 TS2024010088 已处理完成',
    desc: '张小明已完成案件 TS2024010088 的处理，请您确认。',
    fullContent: '案件处理完成通知：\n\n案件编号：TS2024010088\n处理人：张小明\n完成时间：2024-01-15 11:30\n处理结果：已与投诉人达成和解，投诉人表示满意。\n\n请查看详情并确认结案。',
    time: '2小时前',
    tags: ['案件', '完成'],
    read: true,
    starred: false,
    type: 'case',
    showReply: true
  }
])

const filteredMessages = computed(() => {
  let result = messages.value
  
  if (activeMenu.value !== 'all' && activeMenu.value !== 'starred') {
    result = result.filter(m => m.type === activeMenu.value)
  }
  
  if (activeMenu.value === 'starred') {
    result = result.filter(m => m.starred)
  }
  
  if (activeTab.value === 'unread') {
    result = result.filter(m => !m.read)
  }
  
  return result
})

const markAllRead = () => {
  messages.value.forEach(m => m.read = true)
  menuList.value.forEach(m => m.unread = 0)
  alert('已全部标为已读')
}

const toggleStar = (msg) => {
  msg.starred = !msg.starred
}

const viewMessage = (msg) => {
  msg.read = true
  const menuItem = menuList.value.find(m => m.key === msg.type)
  if (menuItem && menuItem.unread > 0) {
    menuItem.unread--
  }
  const allMenu = menuList.value.find(m => m.key === 'all')
  if (allMenu && allMenu.unread > 0) {
    allMenu.unread--
  }
  currentMessage.value = msg
  showDetail.value = true
}
</script>

<style scoped>
.notification-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.breadcrumb-item.active {
  color: #333;
}

.content-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  height: calc(100vh - 100px);
}

/* 侧边栏 */
.sidebar {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.unread-badge {
  background: linear-gradient(135deg, #ff4d4f, #ff7875);
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.menu-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item.active {
  background: #e6f7ff;
}

.menu-icon {
  font-size: 18px;
}

.menu-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.menu-item.active .menu-name {
  color: #1890ff;
  font-weight: 500;
}

.menu-unread {
  background: #ff4d4f;
  color: #fff;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.sidebar-footer {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.btn-outline {
  width: 100%;
  height: 44px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 10px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-outline svg {
  width: 18px;
  height: 18px;
}

/* 主内容 */
.main-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.header-tabs {
  display: flex;
  gap: 8px;
}

.tab-btn {
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.tab-btn.active {
  background: #1890ff;
  color: #fff;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0 12px;
}

.search-box svg {
  width: 18px;
  height: 18px;
  color: #999;
  margin-right: 8px;
}

.search-box input {
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  width: 200px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border: none;
  background: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #e5e5e5;
}

.btn-icon svg {
  width: 20px;
  height: 20px;
  color: #666;
}

/* 消息列表 */
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}

.message-item {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.message-item:hover {
  background: #fafafa;
}

.message-item.unread {
  background: #f0f7ff;
}

.message-item.unread:hover {
  background: #e6f7ff;
}

.message-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.message-sender {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.message-time {
  font-size: 13px;
  color: #999;
}

.message-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 6px 0;
}

.message-item.unread .message-title {
  font-weight: 600;
}

.message-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 2px 8px;
  background: #f5f5f5;
  color: #666;
  border-radius: 4px;
  font-size: 12px;
}

.tag:nth-child(1) {
  background: #fff1f0;
  color: #ff4d4f;
}

.message-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #ff4d4f;
  border-radius: 50%;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f5f5f5;
}

.star-icon {
  width: 18px;
  height: 18px;
  color: #d9d9d9;
  stroke-width: 2;
}

.star-icon.starred {
  color: #faad14;
  fill: #faad14;
}

.more-btn svg {
  width: 18px;
  height: 18px;
  color: #999;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.empty-desc {
  font-size: 14px;
  color: #999;
  margin: 0;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.page-btn.active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
  padding-right: 20px;
}

.modal-close {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.modal-close:hover {
  background: #e5e5e5;
  color: #666;
}

.modal-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.detail-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.detail-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

.detail-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.detail-sender {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.detail-time {
  font-size: 13px;
  color: #999;
}

.detail-content {
  font-size: 15px;
  line-height: 1.8;
  color: #333;
  white-space: pre-line;
}

.detail-attachments {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.attachments-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.attachment-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 10px;
}

.file-icon {
  font-size: 24px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.download-btn {
  padding: 6px 16px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  height: 40px;
  padding: 0 24px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

/* 响应式 */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none;
  }
}

@media (max-width: 640px) {
  .content-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .search-box input {
    width: 150px;
  }
}
</style>
