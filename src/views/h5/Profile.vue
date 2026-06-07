<template>
  <div class="h5-page">
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <h1 class="h5-title">个人中心</h1>
      <div style="width: 32px;"></div>
    </div>

    <div class="h5-content">
      <!-- 用户信息卡片 -->
      <div class="profile-card">
        <div class="profile-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 0016 0" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="profile-info">
          <div class="profile-name">{{ userInfo.name }}</div>
          <div class="profile-phone">{{ userInfo.phone }}</div>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="stats-card">
        <div class="stat-item" @click="goToMyFeedback">
          <div class="stat-value">{{ userStats.total }}</div>
          <div class="stat-label">总反馈</div>
        </div>
        <div class="stat-item" @click="goToMyFeedback">
          <div class="stat-value">{{ userStats.processing }}</div>
          <div class="stat-label">处理中</div>
        </div>
        <div class="stat-item" @click="goToMyFeedback">
          <div class="stat-value">{{ userStats.resolved }}</div>
          <div class="stat-label">已解决</div>
        </div>
      </div>

      <!-- 功能列表 -->
      <div class="menu-card">
        <div class="menu-item" @click="goToMyFeedback">
          <div class="menu-icon list">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12h6M9 8h6M9 16h6M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="menu-text">我的反馈</span>
          <span class="menu-arrow">></span>
        </div>
        <div class="menu-item" @click="goToFaq">
          <div class="menu-icon faq">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.5 9a2.5 2.5 0 114.2 1.8c-1 .8-1.7 1.5-1.7 2.7M12 17h.01" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="menu-text">常见问题</span>
          <span class="menu-arrow">></span>
        </div>
      </div>

      <div class="menu-card">
        <div class="menu-item" @click="showSettings = true">
          <div class="menu-icon settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke-width="2" stroke-linecap="round"/>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="menu-text">设置</span>
          <span class="menu-arrow">></span>
        </div>
        <div class="menu-item" @click="showAbout = true">
          <div class="menu-icon about">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="menu-text">关于我们</span>
          <span class="menu-arrow">></span>
        </div>
      </div>

      <!-- 退出登录 -->
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSettings = ref(false)
const showAbout = ref(false)

const userInfo = ref({
  name: '张先生',
  phone: '138****8888'
})

const userStats = ref({
  total: 12,
  processing: 3,
  resolved: 9
})

const goBack = () => {
  router.push('/h5/home')
}

const goToMyFeedback = () => {
  router.push('/h5/complaint/list')
}

const goToFaq = () => {
  router.push('/h5/faq')
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    alert('已退出登录')
  }
}
</script>

<style scoped>
.h5-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.h5-header {
  height: 44px;
  background: #1890ff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  color: #fff;
}

.h5-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  margin: 0;
}

.h5-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 用户信息卡片 */
.profile-card {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border-radius: 12px;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar svg {
  width: 36px;
  height: 36px;
  color: white;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.profile-phone {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

/* 统计卡片 */
.stats-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-around;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

/* 菜单卡片 */
.menu-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.menu-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.menu-icon.list { background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); }
.menu-icon.faq { background: linear-gradient(135deg, #faad14 0%, #d48806 100%); }
.menu-icon.settings { background: linear-gradient(135deg, #722ed1 0%, #531dab 100%); }
.menu-icon.about { background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%); }

.menu-text {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.menu-arrow {
  font-size: 14px;
  color: #999;
}

/* 退出按钮 */
.logout-btn {
  margin-top: 12px;
  width: 100%;
  height: 44px;
  background: white;
  color: #ff4d4f;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}
</style>
