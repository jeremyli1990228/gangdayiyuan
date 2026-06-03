<template>
  <div class="h5-page">
    <!-- 顶部导航 -->
    <div class="h5-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="h5-title">常见问题</h1>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <input type="text" v-model="searchKeyword" placeholder="搜索问题..." @input="searchFaq">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8" stroke-width="2"/>
        <path d="M21 21L16.65 16.65" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <button :class="['category-tab', activeCategory === '' ? 'active' : '']" @click="activeCategory = ''">全部</button>
      <button :class="['category-tab', activeCategory === cat ? 'active' : '']" 
              v-for="cat in categories" 
              :key="cat" 
              @click="activeCategory = cat">
        {{ cat }}
      </button>
    </div>

    <!-- 问题列表 -->
    <div class="h5-content">
      <div class="faq-list">
        <div class="faq-item" v-for="(item, index) in filteredFaqList" :key="index">
          <div class="faq-question" @click="toggleFaq(index)">
            <span class="faq-title">{{ item.title }}</span>
            <svg :class="['faq-arrow', item.expanded ? 'expanded' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="faq-answer" v-if="item.expanded">
            {{ item.content }}
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div class="empty-state" v-if="filteredFaqList.length === 0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>未找到相关问题</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchKeyword = ref('')
const activeCategory = ref('')

const categories = ['服务态度', '医疗质量', '就医流程', '环境卫生', '其他']

const faqList = ref([
  { category: '服务态度', title: '医护人员态度不好怎么办？', content: '如遇到医护人员态度不好的情况，请记录具体时间、地点和人员，可通过以下渠道进行反馈：\n\n1. 现场向科室主任或护士长反映\n2. 拨打医院投诉电话：0755-xxxxxxx\n3. 通过本系统提交投诉建议\n\n我们会在24小时内响应您的投诉，并在规定时限内处理完成。', expanded: false },
  { category: '就医流程', title: '如何预约挂号？', content: '您可以通过以下方式预约挂号：\n\n1. 微信公众号预约：关注"香港大学深圳医院"公众号，点击"预约挂号"\n2. 医院官网预约：访问医院官网，登录后选择科室和时间\n3. 现场自助机预约：医院各楼层设有自助挂号机\n4. 电话预约：拨打预约热线 0755-xxxxxxx\n\n建议提前3-7天预约，热门科室可能需要更长时间。', expanded: false },
  { category: '医疗质量', title: '对诊断结果有疑问怎么办？', content: '如对诊断结果有疑问，您可以：\n\n1. 向主治医生提出疑问，要求详细解释\n2. 申请专家会诊，获取第二诊疗意见\n3. 到上级医院进行复诊\n4. 通过医务处进行医疗咨询\n\n医院设有医疗质量投诉渠道，如确有医疗质量问题，可提交书面投诉。', expanded: false },
  { category: '环境卫生', title: '病房环境问题如何反映？', content: '如发现病房环境问题（如卫生不达标、设施损坏等），您可以：\n\n1. 向护士站反映情况\n2. 拨打后勤服务热线\n3. 通过本系统提交投诉建议\n\n后勤部门会在24小时内处理，紧急情况会立即响应。', expanded: false },
  { category: '就医流程', title: '如何办理退费？', content: '退费办理流程：\n\n1. 携带就诊卡、发票原件到收费窗口\n2. 填写退费申请表\n3. 科室医生签字确认\n4. 收费窗口办理退费\n\n注意：\n- 已使用的药品、检查无法退费\n- 退费需在缴费后30天内办理\n- 医保退费需到医保窗口办理', expanded: false },
  { category: '其他', title: '医院停车难怎么解决？', content: '医院停车场资源有限，建议您：\n\n1. 乘坐公共交通：地铁xx号线xx站直达\n2. 错峰就诊：避开上午8-10点高峰期\n3. 使用周边社会停车场：xx商场、xx小区提供停车服务\n4. 预约就诊：按预约时间到达，减少等候时间\n\n医院正在扩建停车场，预计年底投入使用。', expanded: false }
])

const filteredFaqList = computed(() => {
  let result = faqList.value
  if (activeCategory.value) {
    result = result.filter(item => item.category === activeCategory.value)
  }
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(item => 
      item.title.toLowerCase().includes(keyword) || 
      item.content.toLowerCase().includes(keyword)
    )
  }
  return result
})

const toggleFaq = (index) => {
  const item = filteredFaqList.value[index]
  item.expanded = !item.expanded
}

const searchFaq = () => {
  // 搜索逻辑已在computed中处理
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.h5-page {
  min-height: 100vh;
  background: #f5f5f5;
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
  margin-right: 32px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 8px 16px;
  gap: 8px;
}

.search-bar input {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  outline: none;
}

.search-bar svg {
  width: 20px;
  height: 20px;
  color: #999;
}

.category-tabs {
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  overflow-x: auto;
  border-bottom: 1px solid #f0f0f0;
}

.category-tab {
  flex-shrink: 0;
  padding: 6px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 16px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
}

.category-tab.active {
  background: #1890ff;
  color: #fff;
}

.h5-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.faq-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
}

.faq-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.faq-arrow {
  width: 16px;
  height: 16px;
  color: #999;
  transition: transform 0.3s;
}

.faq-arrow.expanded {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 16px 16px;
  font-size: 13px;
  color: #666;
  line-height: 1.8;
  white-space: pre-wrap;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-state svg {
  width: 64px;
  height: 64px;
}

.empty-state p {
  font-size: 14px;
  color: #999;
  margin: 16px 0 0;
}
</style>
