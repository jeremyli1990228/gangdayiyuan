<template>
  <div class="h5-page">
    <!-- 顶部导航 -->
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <h1 class="h5-title">反馈详情</h1>
      <button class="header-btn" @click="showShare = true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v16" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="h5-content">
      <!-- 案件信息卡片 -->
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-title">
            <span class="detail-type" :class="feedbackData.category">{{ feedbackData.categoryText }}</span>
            <span class="detail-no">{{ feedbackData.caseNo }}</span>
          </div>
          <div class="detail-status" :class="feedbackData.statusClass">{{ feedbackData.statusText }}</div>
        </div>
        
        <div class="detail-subject">{{ feedbackData.subject }}</div>
        <div class="detail-desc">{{ feedbackData.description }}</div>
        
        <div class="detail-images" v-if="feedbackData.images?.length">
          <img v-for="(img, idx) in feedbackData.images" :key="idx" :src="img" alt="反馈图片" @click="previewImage(idx)">
        </div>
        
        <div class="detail-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ feedbackData.createTime }}</span>
          </div>
          <div class="meta-item" v-if="feedbackData.patientName">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ feedbackData.patientName }}</span>
          </div>
        </div>
      </div>

      <!-- 处理进度时间线 -->
      <div class="timeline-card">
        <div class="timeline-header">
          <span class="timeline-title">处理进度</span>
          <span class="timeline-count">{{ timelineData.length }}条记录</span>
        </div>
        
        <div class="timeline-list">
          <div class="timeline-item" v-for="(item, idx) in timelineData" :key="idx">
            <div class="timeline-left">
              <div class="timeline-dot" :class="item.type"></div>
              <div class="timeline-line" v-if="idx < timelineData.length - 1"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-user">
                <span class="user-name">{{ item.userName }}</span>
                <span class="user-role" v-if="item.userRole">{{ item.userRole }}</span>
              </div>
              <div class="timeline-text">{{ item.content }}</div>
              <div class="timeline-images" v-if="item.images?.length">
                <img v-for="(img, imgIdx) in item.images" :key="imgIdx" :src="img" alt="回复图片">
              </div>
              <div class="timeline-time">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 满意度评价 -->
      <div class="satisfaction-card" v-if="feedbackData.status === 'resolved' && !hasEvaluated">
        <div class="satisfaction-header">
          <span class="satisfaction-title">满意度评价</span>
          <span class="satisfaction-tip">您的评价将帮助我们改进服务</span>
        </div>
        
        <div class="satisfaction-stars">
          <div class="star-item" v-for="n in 5" :key="n" @click="satisfaction = n">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" :fill="n <= satisfaction ? '#faad14' : 'none'"/>
            </svg>
            <span>{{ starText[n-1] }}</span>
          </div>
        </div>
        
        <div class="satisfaction-content">
          <textarea class="satisfaction-input" v-model="satisfactionComment" placeholder="请输入您的评价（选填）" maxlength="200"></textarea>
          <div class="satisfaction-count">{{ satisfactionComment.length }}/200</div>
        </div>
        
        <button class="satisfaction-btn" @click="submitSatisfaction" :disabled="satisfaction === 0">提交评价</button>
      </div>

      <!-- 补充留言 -->
      <div class="reply-card">
        <div class="reply-header">
          <span class="reply-title">补充留言</span>
        </div>
        
        <div class="reply-content">
          <textarea class="reply-input" v-model="replyText" placeholder="请输入您的补充说明..." maxlength="300"></textarea>
          <div class="reply-footer">
            <div class="reply-actions">
              <button class="action-btn" @click="chooseImage">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <div class="reply-count">{{ replyText.length }}/300</div>
          </div>
          
          <div class="reply-preview" v-if="replyImages.length">
            <div class="preview-item" v-for="(img, idx) in replyImages" :key="idx">
              <img :src="img" alt="上传图片">
              <button class="preview-remove" @click="removeReplyImage(idx)">×</button>
            </div>
          </div>
        </div>
        
        <button class="reply-btn" @click="submitReply" :disabled="!replyText && replyImages.length === 0">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const showShare = ref(false)
const hasEvaluated = ref(false)
const satisfaction = ref(0)
const satisfactionComment = ref('')
const replyText = ref('')
const replyImages = ref([])

const starText = ['非常不满意', '不满意', '一般', '满意', '非常满意']

// 模拟反馈详情数据
const feedbackData = ref({
  id: 1,
  caseNo: 'TS20240605001',
  category: 'suggestion',
  categoryText: '建议',
  subject: '希望增加夜间门诊服务',
  description: '由于工作原因，白天没有时间看病，希望医院能开设夜间门诊，方便上班族就诊。晚上就诊也可以分散白天的人流压力。',
  images: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'],
  status: 'resolved',
  statusText: '已解决',
  statusClass: 'success',
  createTime: '2024-06-05 14:30',
  patientName: '张先生',
  patientNo: 'P202406001'
})

// 时间线数据
const timelineData = ref([
  {
    type: 'create',
    userName: '张先生',
    content: '提交了反馈建议',
    time: '2024-06-05 14:30'
  },
  {
    type: 'system',
    userName: '系统',
    userRole: '自动通知',
    content: '已分配至门诊部处理',
    time: '2024-06-05 14:32'
  },
  {
    type: 'reply',
    userName: '王医生',
    userRole: '门诊部主任',
    content: '非常感谢您的建议！我们正在研究开设夜间门诊的可行性。',
    images: [],
    time: '2024-06-05 15:20'
  },
  {
    type: 'reply',
    userName: '李院长',
    userRole: '分管院长',
    content: '经过医院研究决定，我们将从7月1日开始开设夜间门诊，时间为18:00-21:00，欢迎您前来就诊！',
    images: [],
    time: '2024-06-05 16:45'
  },
  {
    type: 'close',
    userName: '系统',
    userRole: '自动',
    content: '反馈已标记为已解决',
    time: '2024-06-05 16:45'
  }
])

const goBack = () => {
  router.back()
}

const previewImage = (index) => {
  // 图片预览功能
  console.log('Preview image:', index)
}

const chooseImage = () => {
  // 模拟选择图片
  if (replyImages.value.length < 3) {
    replyImages.value.push('https://via.placeholder.com/100')
  }
}

const removeReplyImage = (index) => {
  replyImages.value.splice(index, 1)
}

const submitReply = () => {
  if (!replyText.value && replyImages.value.length === 0) {
    return
  }
  
  // 添加到时间线
  timelineData.value.push({
    type: 'user',
    userName: '张先生',
    userRole: '反馈人',
    content: replyText.value,
    images: [...replyImages.value],
    time: new Date().toLocaleString('zh-CN')
  })
  
  replyText.value = ''
  replyImages.value = []
}

const submitSatisfaction = () => {
  if (satisfaction.value === 0) {
    return
  }
  
  hasEvaluated.value = true
  
  // 模拟提交成功提示
  alert('感谢您的评价！')
}

onMounted(() => {
  // 获取详情数据
  const id = route.params.id
  console.log('Load feedback detail:', id)
})
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

.back-btn, .header-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn svg, .header-btn svg {
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

/* 详情卡片 */
.detail-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.detail-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-type {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.detail-type.suggestion { background: #e6f7ff; color: #1890ff; }
.detail-type.complaint { background: #fff1f0; color: #ff4d4f; }
.detail-type.consult { background: #f6ffed; color: #52c41a; }

.detail-no {
  font-size: 12px;
  color: #999;
}

.detail-status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.detail-status.success { background: #f6ffed; color: #52c41a; }
.detail-status.processing { background: #fff7e6; color: #fa8c16; }
.detail-status.pending { background: #f5f5f5; color: #999; }

.detail-subject {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.detail-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.detail-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.detail-images img {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
}

.detail-meta {
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #f5f5f5;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.meta-item svg {
  width: 14px;
  height: 14px;
}

/* 时间线卡片 */
.timeline-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.timeline-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.timeline-count {
  font-size: 12px;
  color: #999;
}

.timeline-list {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: 12px;
  padding-bottom: 16px;
}

.timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.timeline-dot.create { background: #1890ff; }
.timeline-dot.reply { background: #52c41a; }
.timeline-dot.system { background: #faad14; }
.timeline-dot.close { background: #999; }
.timeline-dot.user { background: #722ed1; }

.timeline-line {
  width: 2px;
  flex: 1;
  background: #f0f0f0;
  margin-top: 4px;
}

.timeline-content {
  flex: 1;
}

.timeline-user {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.user-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.user-role {
  padding: 1px 6px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 11px;
  color: #999;
}

.timeline-text {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 8px;
}

.timeline-images {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.timeline-images img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
}

.timeline-time {
  font-size: 11px;
  color: #999;
}

/* 满意度评价 */
.satisfaction-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.satisfaction-header {
  margin-bottom: 16px;
}

.satisfaction-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.satisfaction-tip {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.satisfaction-stars {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}

.star-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.star-item svg {
  width: 28px;
  height: 28px;
  color: #faad14;
}

.star-item span {
  font-size: 11px;
  color: #666;
}

.satisfaction-content {
  margin-bottom: 16px;
}

.satisfaction-input {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  resize: none;
  outline: none;
  box-sizing: border-box;
}

.satisfaction-count {
  text-align: right;
  font-size: 11px;
  color: #999;
  margin-top: 4px;
}

.satisfaction-btn {
  width: 100%;
  height: 40px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
}

.satisfaction-btn:disabled {
  background: #d9d9d9;
}

/* 回复卡片 */
.reply-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.reply-header {
  margin-bottom: 12px;
}

.reply-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.reply-content {
  margin-bottom: 12px;
}

.reply-input {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  resize: none;
  outline: none;
  box-sizing: border-box;
}

.reply-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.action-btn {
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn svg {
  width: 20px;
  height: 20px;
  color: #666;
}

.reply-count {
  font-size: 11px;
  color: #999;
}

.reply-preview {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.preview-item {
  position: relative;
}

.preview-item img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
}

.preview-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  line-height: 1;
}

.reply-btn {
  width: 100%;
  height: 40px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
}

.reply-btn:disabled {
  background: #d9d9d9;
}
</style>
