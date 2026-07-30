<template>
  <div class="page-container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item">处理案件</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">新增案件</span>
    </div>
    
    <!-- 自动保存提示 -->
    <div class="auto-save-bar" v-if="lastSaveTime">
      <div class="auto-save-info">
        <span class="save-icon">💾</span>
        <span>已自动保存于 {{ lastSaveTime }}</span>
      </div>
      <div class="auto-save-actions">
        <button class="btn-text" @click="manualSave">立即保存</button>
        <button class="btn-text" @click="clearDraft">清除草稿</button>
      </div>
    </div>
    
    <div id="auto-save-tip" class="save-toast" style="display: none;">
      <span>💾 已自动保存</span>
    </div>
    
    <div class="form-wrapper">
      <div id="section-1" class="form-section">
        <div class="section-title">01.患者信息</div>
        <div class="form-row">
          <div class="form-item required">
            <label>姓名</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>病人号</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>年龄</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>性别（选填）</label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" name="patient-gender" value="男">
                <span>男</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="patient-gender" value="女">
                <span>女</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="patient-gender" value="保密">
                <span>保密</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>联系方式</label>
            <input type="text" placeholder="请点击输入" class="form-input">
            <div class="input-hint">输入后点击回车保存，最多输入3个</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>邮箱/地址</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
      </div>

      <div id="section-2" class="form-section">
        <div class="section-title">02.反馈人信息</div>
        <div class="form-row">
          <div class="form-item required">
            <label>与患者关系</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>姓名</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>年龄</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>性别（选填）</label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" name="feedback-gender" value="男">
                <span>男</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="feedback-gender" value="女">
                <span>女</span>
              </label>
              <label class="radio-item">
                <input type="radio" name="feedback-gender" value="保密">
                <span>保密</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>联系方式</label>
            <input type="text" placeholder="请点击输入" class="form-input">
            <div class="input-hint">输入后点击回车保存，最多输入3个</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>邮箱/地址</label>
            <input type="text" placeholder="请点击输入" class="form-input">
          </div>
        </div>
      </div>

      <div id="section-3" class="form-section">
        <div class="section-title">03.受理信息</div>
        <div class="form-row">
          <div class="form-item required">
            <label>受理组</label>
            <select class="form-select">
              <option value="">测试服务组</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>受理人</label>
            <select class="form-select">
              <option value="">付世平</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>案件类型</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>回复类型</label>
            <select class="form-select">
              <option value="">无需回复反馈人</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>受理日期</label>
            <input type="text" placeholder="请选择日期" class="form-input date-input">
          </div>
        </div>
      </div>

      <div id="section-4" class="form-section">
        <div class="section-title">04.原因及其诉求</div>
        <div class="form-row">
          <div class="form-item required">
            <label>涉及环节</label>
            <select class="form-select">
              <option value="">请选择涉及环节</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>原因</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>诉求</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈时间</label>
            <input type="text" placeholder="请选择日期: yyyy-MM-dd" class="form-input date-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈内容</label>
            <textarea placeholder="请点击输入" class="form-textarea" rows="6"></textarea>
            <div class="textarea-footer">
              <span class="word-count">0/2000</span>
              <button class="btn-add">+ 添加</button>
            </div>
          </div>
        </div>
      </div>

      <div id="section-5" class="form-section">
        <div class="section-title">05.反馈方式与涉及人员</div>
        <div class="form-row">
          <div class="form-item required">
            <label>反馈方式</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>涉及科室</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item required">
            <label>科室类别</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>涉及人员</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>自定义涉及人员</label>
            <input type="text" placeholder="请填写自定义涉及对象，输入后点击回车保存" class="form-input">
          </div>
        </div>
      </div>

      <div id="section-6" class="form-section">
        <div class="section-title">06.病历摘要</div>
        <div class="form-row">
          <div class="form-item">
            <button class="btn-add-section">+ 添加</button>
          </div>
        </div>
      </div>

      <div id="section-7" class="form-section">
        <div class="section-title">07.跟进记录</div>
        <div class="section-desc">根据案件类型分别记录跟进情况，每类支持添加多条记录</div>
        <div class="followup-modules">
          <div
            v-for="module in followupModules"
            :key="module.key"
            class="followup-module"
            :class="'module-' + module.key"
            :style="{ '--module-color': module.color, '--module-bg': module.bg, '--module-border': module.border }"
          >
            <div class="module-header">
              <div class="module-title">
                <span class="module-dot"></span>
                <span class="module-name">{{ module.label }}跟进</span>
                <span class="module-count">{{ followupRecords[module.key].length }} 条</span>
              </div>
              <button class="btn-add-record" @click="addFollowupRecord(module.key)">
                <span class="add-icon">+</span>
                <span>添加</span>
              </button>
            </div>
            <div class="module-body" v-if="followupRecords[module.key].length > 0">
              <div
                v-for="(record, index) in followupRecords[module.key]"
                :key="record.id"
                class="record-item"
              >
                <div class="record-form-row">
                  <div class="form-item required">
                    <label>跟进类型</label>
                    <select class="form-select" v-model="record.type">
                      <option value="">请选择</option>
                      <option v-for="opt in module.typeOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                  </div>
                </div>
                <div class="record-form-row">
                  <div class="form-item required">
                    <label>跟进日期</label>
                    <input type="text" placeholder="请选择日期: yyyy-MM-dd" class="form-input date-input" v-model="record.date">
                  </div>
                </div>
                <div class="record-form-row">
                  <div class="form-item required">
                    <label>跟进描述</label>
                    <textarea
                      placeholder="请点击输入"
                      class="form-textarea"
                      rows="3"
                      maxlength="2000"
                      v-model="record.description"
                    ></textarea>
                    <div class="textarea-footer">
                      <span class="word-count">{{ (record.description || '').length }}/2000</span>
                      <button class="btn-delete" @click="removeFollowupRecord(module.key, index)">删除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="module-empty" v-else>
              <span>暂无跟进记录，点击右上角"添加"按钮新增</span>
            </div>
          </div>
        </div>
      </div>

      <div id="section-8" class="form-section">
        <div class="section-title">08.处理结果</div>
        <div class="section-desc">请按案件处理的实际情况进行勾选</div>
        <div class="form-row">
          <div class="form-item">
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" value="转诊">
                <span>转诊</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="病历质量改进">
                <span>病历质量改进</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="持续质量努力">
                <span>持续质量努力</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="有出现过医疗暴力">
                <span>有出现过医疗暴力</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="纠纷处理">
                <span>纠纷处理</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="经济损失">
                <span>经济损失</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="需进行鉴定">
                <span>需进行鉴定</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="存在行政处罚">
                <span>存在行政处罚</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" value="其他处理结果">
                <span>其他处理结果</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div id="section-9" class="form-section">
        <div class="section-title">09.上传附件（选填）</div>
        <div class="form-row">
          <div class="form-item">
            <label>类型</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <label>类型</label>
            <select class="form-select">
              <option value="">请选择</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <div class="upload-area">
              <span class="upload-hint">支持扩展名为: xls, doc, docx, pdf, jpg</span>
              <div class="upload-buttons">
                <button class="btn-upload">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:14px;height:14px;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2"/>
                    <polyline points="17 8 12 3 7 8" stroke-width="2"/>
                    <line x1="12" y1="3" x2="12" y2="15" stroke-width="2"/>
                  </svg>
                  附件上传
                </button>
                <button class="btn-upload-outline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:14px;height:14px;">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                    <path d="M3 9h18M9 21V9" stroke-width="2"/>
                  </svg>
                  拍照/相册
                </button>
                <button class="btn-add">+ 添加</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn-primary">生成案件</button>
      <button class="btn btn-outline">直接归档</button>
      <button class="btn btn-outline">保存为草稿</button>
    </div>

    <div class="sidebar-nav">
      <div class="nav-item active" @click="scrollToSection('section-1')">01.患者信息</div>
      <div class="nav-item" @click="scrollToSection('section-2')">02.反馈人信息</div>
      <div class="nav-item" @click="scrollToSection('section-3')">03.受理信息</div>
      <div class="nav-item" @click="scrollToSection('section-4')">04.原因及其诉求</div>
      <div class="nav-item" @click="scrollToSection('section-5')">05.反馈方式与涉及人员</div>
      <div class="nav-item" @click="scrollToSection('section-6')">06.病历摘要</div>
      <div class="nav-item" @click="scrollToSection('section-7')">07.跟进记录</div>
      <div class="nav-item" @click="scrollToSection('section-8')">08.处理结果</div>
      <div class="nav-item" @click="scrollToSection('section-9')">09.上传附件（选填）</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('section-1')
const autoSaveTimer = ref(null)
const lastSaveTime = ref('')
const formData = ref({})

// 跟进记录 4 个模块定义
const followupModules = ref([
  {
    key: 'complaint',
    label: '投诉',
    color: '#1890ff',
    bg: '#e6f7ff',
    border: '#91d5ff',
    typeOptions: ['电话沟通', '现场协调', '面谈约谈', '书面回复', '其他']
  },
  {
    key: 'petition',
    label: '信访',
    color: '#722ed1',
    bg: '#f9f0ff',
    border: '#d3adf7',
    typeOptions: ['接待来访', '电话回复', '书面答复', '实地走访', '其他']
  },
  {
    key: 'claim',
    label: '理赔',
    color: '#fa8c16',
    bg: '#fff7e6',
    border: '#ffd591',
    typeOptions: ['案件审核', '协商谈判', '协议签订', '款项支付', '其他']
  },
  {
    key: 'investigation',
    label: '行政调查',
    color: '#52c41a',
    bg: '#f6ffed',
    border: '#b7eb8f',
    typeOptions: ['现场调查', '资料调取', '询问笔录', '专家评审', '其他']
  }
])

// 各模块跟进记录数据
const followupRecords = ref({
  complaint: [],
  petition: [],
  claim: [],
  investigation: []
})

let recordIdCounter = 0
const createEmptyRecord = () => {
  recordIdCounter += 1
  return {
    id: `rec_${Date.now()}_${recordIdCounter}`,
    type: '',
    date: '',
    description: ''
  }
}

// 添加跟进记录
const addFollowupRecord = (key) => {
  followupRecords.value[key].push(createEmptyRecord())
}

// 删除跟进记录
const removeFollowupRecord = (key, index) => {
  followupRecords.value[key].splice(index, 1)
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const handleScroll = () => {
  const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8', 'section-9']
  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i])
    if (element && element.getBoundingClientRect().top <= 150) {
      activeSection.value = sections[i]
      break
    }
  }
}

// 收集所有表单数据
const collectFormData = () => {
  const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea')
  const data = {}
  inputs.forEach(input => {
    if (input.name) {
      data[input.name] = input.value
    }
  })
  return data
}

// 保存到本地存储
const saveToLocalStorage = () => {
  const data = {
    formData: collectFormData(),
    lastSaveTime: new Date().toLocaleString('zh-CN'),
    caseType: 'process-cases-add'
  }
  localStorage.setItem('process_cases_add_draft', JSON.stringify(data))
  lastSaveTime.value = data.lastSaveTime
  
  // 显示保存提示
  const saveTip = document.getElementById('auto-save-tip')
  if (saveTip) {
    saveTip.style.display = 'block'
    setTimeout(() => {
      saveTip.style.display = 'none'
    }, 3000)
  }
}

// 从本地存储恢复数据
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('process_cases_add_draft')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      if (data.formData) {
        // 恢复表单数据
        Object.keys(data.formData).forEach(key => {
          const input = document.querySelector(`[name="${key}"]`)
          if (input) {
            input.value = data.formData[key]
          }
        })
      }
      if (data.lastSaveTime) {
        lastSaveTime.value = data.lastSaveTime
      }
      return true
    } catch (e) {
      console.error('加载保存数据失败:', e)
    }
  }
  return false
}

// 清除本地存储
const clearLocalStorage = () => {
  localStorage.removeItem('process_cases_add_draft')
}

// 自动保存定时器
const startAutoSave = () => {
  autoSaveTimer.value = setInterval(() => {
    saveToLocalStorage()
  }, 120000) // 2分钟自动保存一次
}

// 手动保存
const manualSave = () => {
  saveToLocalStorage()
  alert('保存成功')
}

// 清除草稿
const clearDraft = () => {
  if (confirm('确定要清除已保存的草稿吗？')) {
    clearLocalStorage()
    lastSaveTime.value = ''
    location.reload()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadFromLocalStorage()
  startAutoSave()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (autoSaveTimer.value) {
    clearInterval(autoSaveTimer.value)
  }
})
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  position: relative;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  position: sticky;
  top: 56px;
  background-color: #f0f2f5;
  z-index: 10;
}

.auto-save-bar {
  position: fixed;
  top: 56px;
  left: 220px;
  right: 0;
  background-color: #e6f7ff;
  border-bottom: 1px solid #91d5ff;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  z-index: 20;
}

.auto-save-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1890ff;
}

.auto-save-actions {
  display: flex;
  gap: 16px;
}

.btn-text {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 8px;
}

.btn-text:hover {
  text-decoration: underline;
}

.save-toast {
  position: fixed;
  top: 100px;
  right: 20px;
  background-color: #52c41a;
  color: #fff;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
}

@media (max-width: 768px) {
  .auto-save-bar {
    left: 0;
    flex-direction: column;
    gap: 8px;
    padding: 8px 12px;
  }
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #333;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.form-wrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  max-width: 800px;
  margin-right: 220px;
  margin-bottom: 100px;
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 3px solid #1890ff;
}

.section-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
}

.form-row {
  margin-bottom: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-item.required label::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

.form-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890ff;
}

.form-input.date-input {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Crect x='3' y='4' width='18' height='18' rx='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6'/%3E%3Cline x1='8' y1='2' x2='8' y2='6'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.form-select {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
  box-sizing: border-box;
}

.form-select:focus {
  border-color: #1890ff;
}

.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-textarea:focus {
  border-color: #1890ff;
}

.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.word-count {
  font-size: 12px;
  color: #999;
}

.input-hint {
  font-size: 12px;
  color: #999;
  margin-top: -4px;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.radio-item input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.checkbox-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.btn-add {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
}

.btn-add:hover {
  text-decoration: underline;
}

.btn-add-section {
  width: 100%;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  background-color: #fafafa;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-section:hover {
  border-color: #1890ff;
  color: #1890ff;
  background-color: #e6f7ff;
}

.upload-area {
  padding: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  background-color: #fafafa;
}

.upload-hint {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  display: block;
}

.upload-buttons {
  display: flex;
  gap: 12px;
}

.btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-upload:hover {
  background-color: #40a9ff;
}

.btn-upload-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 16px;
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-upload-outline:hover {
  background-color: #e6f7ff;
}

.form-actions {
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 40px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  z-index: 50;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn-outline {
  background-color: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
}

.btn-outline:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.sidebar-nav {
  position: fixed;
  right: 20px;
  top: 120px;
  width: 180px;
  background-color: #fff;
  border-radius: 4px;
  padding: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-item {
  padding: 10px 16px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}

.nav-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
}

/* ==================== 跟进记录 4 模块样式 ==================== */
.followup-modules {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.followup-module {
  border: 1px solid var(--module-border, #d9d9d9);
  border-left: 4px solid var(--module-color, #1890ff);
  border-radius: 6px;
  background-color: #fff;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.followup-module:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--module-bg, #fafafa);
  border-bottom: 1px solid var(--module-border, #f0f0f0);
}

.module-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--module-color, #333);
}

.module-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--module-color, #1890ff);
  box-shadow: 0 0 0 3px var(--module-bg, #fafafa), 0 0 0 4px var(--module-color, #1890ff);
}

.module-name {
  font-size: 15px;
  font-weight: 600;
}

.module-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--module-color, #1890ff);
  background-color: #fff;
  border: 1px solid var(--module-border, #d9d9d9);
  border-radius: 10px;
}

.btn-add-record {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 0 12px;
  background-color: var(--module-color, #1890ff);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-record:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.add-icon {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}

.module-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-item {
  position: relative;
  padding: 16px;
  background-color: var(--module-bg, #fafafa);
  border: 1px dashed var(--module-border, #d9d9d9);
  border-radius: 4px;
}

.record-item::before {
  content: '';
  position: absolute;
  top: 16px;
  left: -1px;
  width: 3px;
  height: 20px;
  background-color: var(--module-color, #1890ff);
  border-radius: 0 2px 2px 0;
}

.record-form-row {
  margin-bottom: 12px;
}

.record-form-row:last-child {
  margin-bottom: 0;
}

.btn-delete {
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.btn-delete:hover {
  color: #cf1322;
  text-decoration: underline;
}

.module-empty {
  padding: 24px 16px;
  text-align: center;
  font-size: 13px;
  color: #999;
  background-color: #fafafa;
}
</style>