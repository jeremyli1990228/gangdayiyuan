<template>
  <div class="h5-home">
    <!-- 顶部医院Logo和标题 -->
    <div class="home-header">
      <div class="hospital-logo">
        <svg viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#1890ff"/>
          <path d="M24 12v24M12 24h24" stroke="white" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
      <h1 class="hospital-name">香港大学深圳医院</h1>
      <p class="hospital-slogan">患者至上 · 质量第一</p>
    </div>

    <!-- 快捷功能入口 -->
    <div class="home-section">
      <h2 class="section-title">快捷服务</h2>
      <div class="quick-grid">
        <div class="quick-item" @click="goToSubmit">
          <div class="quick-icon submit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="quick-text">提交反馈</span>
        </div>
        <div class="quick-item" @click="goToMyFeedback">
          <div class="quick-icon list">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12h6M9 8h6M9 16h6M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="quick-text">我的反馈</span>
          <div class="quick-badge" v-if="pendingCount > 0">{{ pendingCount }}</div>
        </div>
        <div class="quick-item" @click="goToFaq">
          <div class="quick-icon faq">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.5 9a2.5 2.5 0 114.2 1.8c-1 .8-1.7 1.5-1.7 2.7M12 17h.01" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="quick-text">常见问题</span>
        </div>
        <div class="quick-item" @click="goToProfile">
          <div class="quick-icon profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 0116 0" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="quick-text">个人中心</span>
        </div>
      </div>
    </div>

    <!-- 最近反馈（快速查看） -->
    <div class="home-section" v-if="recentFeedback.length > 0">
      <div class="section-header">
        <h2 class="section-title">最近反馈</h2>
        <span class="section-more" @click="goToMyFeedback">查看全部 ></span>
      </div>
      <div class="recent-list">
        <div class="recent-item" v-for="item in recentFeedback" :key="item.id" @click="goToDetail(item.id)">
          <div class="recent-left">
            <div class="recent-type" :class="item.category">{{ item.categoryText }}</div>
            <div class="recent-title">{{ item.title }}</div>
            <div class="recent-time">{{ item.createTime }}</div>
          </div>
          <div class="recent-right">
            <div class="recent-status" :class="item.statusClass">{{ item.statusText }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="home-section">
      <h2 class="section-title">服务数据</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ totalFeedback }}</div>
          <div class="stat-label">总反馈数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ resolvedRate }}%</div>
          <div class="stat-label">已解决</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ avgReplyTime }}h</div>
          <div class="stat-label">平均回复</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ satisfactionRate }}%</div>
          <div class="stat-label">满意度</div>
        </div>
      </div>
    </div>

    <!-- 公告栏 -->
    <div class="home-notice" v-if="notice">
      <div class="notice-icon">📢</div>
      <div class="notice-text">{{ notice }}</div>
    </div>

    <!-- 底部版权 -->
    <div class="home-footer">
      <p>© 2024 香港大学深圳医院</p>
      <p>客服热线：400-xxx-xxxx</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟数据 - 最近反馈
const recentFeedback = ref([
  { id: 1, category: 'suggestion', categoryText: '建议', title: '希望增加夜间门诊', status: 'resolved', statusText: '已解决', statusClass: 'success', createTime: '2024-06-05 14:30' },
  { id: 2, category: 'complaint', categoryText: '投诉', title: '候诊时间过长', status: 'processing', statusText: '处理中', statusClass: 'processing', createTime: '2024-06-04 09:15' },
  { id: 3, category: 'consult', categoryText: '咨询', title: '门诊预约问题', status: 'resolved', statusText: '已解决', statusClass: 'success', createTime: '2024-06-03 16:45' }
])

// 模拟统计数据
const totalFeedback = ref(1286)
const resolvedRate = ref(95.2)
const avgReplyTime = ref(4.5)
const satisfactionRate = ref(92.8)

// 待处理数量
const pendingCount = computed(() => {
  return recentFeedback.value.filter(f => f.status === 'processing' || f.status === 'pending').length
})

// 公告
const notice = ref('欢迎使用医院反馈系统！我们致力于为您提供更好的服务体验。')

const goToSubmit = () => {
  router.push('/h5/complaint/submit')
}

const goToMyFeedback = () => {
  router.push('/h5/complaint/list')
}

const goToDetail = (id) => {
  router.push(`/h5/complaint/detail/${id}`)
}

const goToFaq = () => {
  router.push('/h5/faq')
}

const goToProfile = () => {
  router.push('/h5/profile')
}

onMounted(() => {
  // 检查是否已登录（微信授权）
  // 如果未登录，先进行授权
})
</script>

<style scoped>
.h5-home {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 20px;
}

/* 顶部头部 */
.home-header {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  padding: 32px 20px 28px;
  text-align: center;
}

.hospital-logo {
  width: 64px;
  height: 64px;
  margin: 0 auto 12px;
}

.hospital-name {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0 0 4px;
}

.hospital-slogan {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

/* 通用区块 */
.home-section {
  margin: 12px;
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-more {
  font-size: 13px;
  color: #1890ff;
}

/* 快捷入口 */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
}

.quick-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.quick-icon.submit { background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%); }
.quick-icon.list { background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); }
.quick-icon.faq { background: linear-gradient(135deg, #faad14 0%, #d48806 100%); }
.quick-icon.profile { background: linear-gradient(135deg, #722ed1 0%, #531dab 100%); }

.quick-text {
  font-size: 12px;
  color: #333;
}

.quick-badge {
  position: absolute;
  top: -4px;
  right: 12px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #ff4d4f;
  color: white;
  font-size: 11px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 最近反馈 */
.recent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
}

.recent-left {
  flex: 1;
}

.recent-type {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-bottom: 6px;
}

.recent-type.suggestion { background: #e6f7ff; color: #1890ff; }
.recent-type.complaint { background: #fff1f0; color: #ff4d4f; }
.recent-type.consult { background: #f6ffed; color: #52c41a; }

.recent-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-time {
  font-size: 12px;
  color: #999;
}

.recent-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.recent-status.success { background: #f6ffed; color: #52c41a; }
.recent-status.processing { background: #fff7e6; color: #fa8c16; }
.recent-status.pending { background: #f0f0f0; color: #999; }

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.stat-item {
  text-align: center;
  padding: 12px 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: #999;
}

/* 公告 */
.home-notice {
  margin: 12px;
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.notice-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.notice-text {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

/* 底部 */
.home-footer {
  text-align: center;
  padding: 20px;
}

.home-footer p {
  font-size: 11px;
  color: #999;
  margin: 4px 0;
}
</style>
