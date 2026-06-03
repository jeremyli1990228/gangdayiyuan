<template>
  <div class="search-modal" v-if="isVisible" @click="closeModal">
    <div class="search-container" @click.stop>
      <div class="search-header">
        <h2 class="search-title">多维度检索</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="search-content">
        <!-- 搜索框 -->
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="输入关键词搜索..."
            class="search-input"
            @input="handleSearch"
          >
          <button class="clear-btn" v-if="searchQuery" @click="clearSearch">×</button>
        </div>
        
        <!-- 快速筛选标签 -->
        <div class="quick-filters">
          <button 
            v-for="filter in quickFilters" 
            :key="filter.key"
            :class="['filter-tag', { active: activeFilters.includes(filter.key) }]"
            @click="toggleFilter(filter.key)"
          >
            {{ filter.label }}
          </button>
        </div>
        
        <!-- 搜索结果 -->
        <div class="search-results" v-if="searchQuery || activeFilters.length > 0">
          <div class="results-header">
            <span>找到 {{ results.length }} 条结果</span>
          </div>
          
          <div class="results-list" v-if="results.length > 0">
            <div 
              v-for="result in results" 
              :key="result.id"
              class="result-item"
              @click="viewDetail(result)"
            >
              <div class="result-main">
                <div class="result-title">{{ result.title }}</div>
                <div class="result-meta">
                  <span class="result-type">{{ result.type }}</span>
                  <span class="result-date">{{ result.date }}</span>
                </div>
              </div>
              <div class="result-tags">
                <span 
                  v-for="tag in result.tags" 
                  :key="tag"
                  class="result-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="no-results" v-else>
            <p>未找到相关结果</p>
          </div>
        </div>
        
        <!-- 高级筛选面板 -->
        <div class="advanced-filters" v-if="showAdvanced">
          <h3 class="advanced-title">高级筛选</h3>
          
          <div class="filter-group">
            <label class="filter-label">涉及人员</label>
            <input type="text" v-model="filters.involvedPerson" placeholder="输入人员姓名" class="filter-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">投诉人</label>
            <input type="text" v-model="filters.complainant" placeholder="输入投诉人姓名" class="filter-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">电话号码</label>
            <input type="tel" v-model="filters.phone" placeholder="输入电话号码" class="filter-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">病人号</label>
            <input type="text" v-model="filters.patientNo" placeholder="输入病人号" class="filter-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">时间范围</label>
            <div class="date-range">
              <input type="date" v-model="filters.startDate" class="filter-input">
              <span>至</span>
              <input type="date" v-model="filters.endDate" class="filter-input">
            </div>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">案件状态</label>
            <select v-model="filters.status" class="filter-input">
              <option value="">全部</option>
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="completed">已完成</option>
              <option value="closed">已关闭</option>
            </select>
          </div>
          
          <div class="filter-actions">
            <button class="btn-reset" @click="resetFilters">重置</button>
            <button class="btn-apply" @click="applyFilters">应用筛选</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isVisible = ref(false)
const searchQuery = ref('')
const activeFilters = ref([])
const showAdvanced = ref(false)

const filters = ref({
  involvedPerson: '',
  complainant: '',
  phone: '',
  patientNo: '',
  startDate: '',
  endDate: '',
  status: ''
})

const quickFilters = [
  { key: 'all', label: '全部' },
  { key: 'complaint', label: '投诉' },
  { key: 'suggestion', label: '建议' },
  { key: 'consult', label: '咨询' },
  { key: 'pending', label: '待处理' },
  { key: 'processing', label: '处理中' },
  { key: 'completed', label: '已完成' }
]

// 模拟搜索结果数据
const mockResults = [
  {
    id: 1,
    title: '关于门诊就诊等候时间过长的投诉',
    type: '投诉',
    date: '2024-01-15',
    tags: ['服务态度', '候诊时间'],
    involvedPerson: '张三',
    complainant: '李四',
    phone: '138****5678',
    patientNo: 'P20240001',
    status: 'processing'
  },
  {
    id: 2,
    title: '建议增加自助挂号机数量',
    type: '建议',
    date: '2024-01-14',
    tags: ['就医流程', '设备设施'],
    involvedPerson: '王五',
    complainant: '赵六',
    phone: '139****8765',
    patientNo: 'P20240002',
    status: 'pending'
  },
  {
    id: 3,
    title: '医生诊疗服务咨询',
    type: '咨询',
    date: '2024-01-13',
    tags: ['医疗质量'],
    involvedPerson: '孙七',
    complainant: '周八',
    phone: '137****2345',
    patientNo: 'P20240003',
    status: 'completed'
  }
]

const results = computed(() => {
  let filtered = [...mockResults]
  
  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.involvedPerson.toLowerCase().includes(query) ||
      item.complainant.toLowerCase().includes(query) ||
      item.phone.includes(query) ||
      item.patientNo.toLowerCase().includes(query)
    )
  }
  
  // 按快速筛选过滤
  if (activeFilters.value.length > 0) {
    if (activeFilters.value.includes('complaint')) {
      filtered = filtered.filter(item => item.type === '投诉')
    }
    if (activeFilters.value.includes('suggestion')) {
      filtered = filtered.filter(item => item.type === '建议')
    }
    if (activeFilters.value.includes('consult')) {
      filtered = filtered.filter(item => item.type === '咨询')
    }
    if (activeFilters.value.includes('pending')) {
      filtered = filtered.filter(item => item.status === 'pending')
    }
    if (activeFilters.value.includes('processing')) {
      filtered = filtered.filter(item => item.status === 'processing')
    }
    if (activeFilters.value.includes('completed')) {
      filtered = filtered.filter(item => item.status === 'completed')
    }
  }
  
  // 按高级筛选过滤
  if (filters.value.involvedPerson) {
    filtered = filtered.filter(item => 
      item.involvedPerson.includes(filters.value.involvedPerson)
    )
  }
  if (filters.value.complainant) {
    filtered = filtered.filter(item => 
      item.complainant.includes(filters.value.complainant)
    )
  }
  if (filters.value.phone) {
    filtered = filtered.filter(item => 
      item.phone.includes(filters.value.phone)
    )
  }
  if (filters.value.patientNo) {
    filtered = filtered.filter(item => 
      item.patientNo.toLowerCase().includes(filters.value.patientNo.toLowerCase())
    )
  }
  if (filters.value.status) {
    filtered = filtered.filter(item => item.status === filters.value.status)
  }
  
  return filtered
})

const toggleFilter = (key) => {
  if (key === 'all') {
    activeFilters.value = []
  } else {
    const index = activeFilters.value.indexOf(key)
    if (index > -1) {
      activeFilters.value.splice(index, 1)
    } else {
      activeFilters.value.push(key)
    }
  }
}

const handleSearch = () => {
  // 搜索防抖
}

const clearSearch = () => {
  searchQuery.value = ''
}

const resetFilters = () => {
  filters.value = {
    involvedPerson: '',
    complainant: '',
    phone: '',
    patientNo: '',
    startDate: '',
    endDate: '',
    status: ''
  }
  activeFilters.value = []
}

const applyFilters = () => {
  showAdvanced.value = false
}

const viewDetail = (result) => {
  console.log('查看详情:', result)
  closeModal()
  // 可以跳转到详情页
  // router.push(`/case/detail/${result.id}`)
}

const openModal = () => {
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
}

// 暴露方法供外部调用
defineExpose({
  openModal,
  closeModal
})
</script>

<style scoped>
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
  z-index: 2000;
}

.search-container {
  width: 600px;
  max-width: 90%;
  max-height: 80vh;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.search-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #666;
}

.search-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0 12px;
  margin-bottom: 16px;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  height: 44px;
  border: none;
  background: none;
  padding: 0 12px;
  font-size: 15px;
  outline: none;
}

.clear-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: #d9d9d9;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;
}

.quick-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-tag {
  padding: 6px 14px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 16px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tag:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.filter-tag.active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.search-results {
  margin-top: 20px;
}

.results-header {
  font-size: 13px;
  color: #999;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.result-item:hover {
  background: #f0f7ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}

.result-main {
  margin-bottom: 8px;
}

.result-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}

.result-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #999;
}

.result-type {
  padding: 2px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.result-tag {
  font-size: 11px;
  padding: 2px 8px;
  background: #f5f5f5;
  color: #666;
  border-radius: 4px;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.advanced-filters {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.advanced-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
}

.filter-group {
  margin-bottom: 16px;
}

.filter-label {
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
}

.filter-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.filter-input:focus {
  border-color: #1890ff;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-range .filter-input {
  flex: 1;
}

.date-range span {
  color: #999;
  font-size: 13px;
}

.filter-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-reset,
.btn-apply {
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-reset {
  background: #f5f5f5;
  color: #666;
}

.btn-reset:hover {
  background: #e5e5e5;
}

.btn-apply {
  background: #1890ff;
  color: #fff;
}

.btn-apply:hover {
  background: #40a9ff;
}

@media (max-width: 768px) {
  .search-modal {
    padding-top: 0;
  }
  
  .search-container {
    width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .search-header {
    padding: 16px;
  }
  
  .search-content {
    padding: 16px;
  }
  
  .filter-actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: #fff;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
