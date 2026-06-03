<template>
  <div class="home-container">
    <div class="main-panel">
      <div class="card-wrapper">
        <div class="tabs-header">
          <div 
            class="tab-item" 
            :class="{ 'active': activeTab === 'opinion' }"
            @click="activeTab = 'opinion'"
          >
            出具科室意见
          </div>
          <div 
            class="tab-item" 
            :class="{ 'active': activeTab === 'validity' }"
            @click="activeTab = 'validity'"
          >
            有效性判定
          </div>
          <div 
            class="tab-item" 
            :class="{ 'active': activeTab === 'archive' }"
            @click="activeTab = 'archive'"
          >
            完结归档判定
          </div>
          <button class="view-all-btn">
            <span>查看全部</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="table-container">
          <div v-if="currentTableData.length > 0" class="table-content">
            <div class="table-header">
              <div 
                v-for="(col, index) in currentColumns" 
                :key="index"
                class="table-cell"
                :style="{ width: col.width }"
              >
                {{ col.title }}
              </div>
            </div>
            <div class="table-body">
              <div class="table-row" v-for="(item, index) in currentTableData" :key="index">
                <div 
                  v-for="(col, colIndex) in currentColumns" 
                  :key="colIndex"
                  class="table-cell"
                  :style="{ width: col.width }"
                >
                  <template v-if="col.key === 'index'">
                    {{ index + 1 }}
                  </template>
                  <template v-else-if="col.key === 'status'">
                    <span class="status-tag" :class="item.statusClass">
                      {{ item[col.key] }}
                    </span>
                  </template>
                  <template v-else-if="col.key === 'caseNo'">
                    <span class="case-no">{{ item[col.key] }}</span>
                  </template>
                  <template v-else-if="col.key === 'actions'">
                    <template v-if="activeTab === 'opinion'">
                      <button class="btn btn-primary">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>回复</span>
                      </button>
                      <button class="btn btn-outline">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>案件详情</span>
                      </button>
                    </template>
                    <template v-else-if="activeTab === 'archive'">
                      <button class="btn btn-outline">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>审批</span>
                      </button>
                    </template>
                  </template>
                  <template v-else>
                    {{ item[col.key] }}
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <svg class="empty-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="20" width="100" height="80" rx="8" stroke="#E5E7EB" stroke-width="2"/>
              <rect x="20" y="35" width="60" height="8" rx="2" fill="#E5E7EB"/>
              <rect x="20" y="50" width="80" height="6" rx="2" fill="#F3F4F6"/>
              <rect x="20" y="62" width="70" height="6" rx="2" fill="#F3F4F6"/>
              <rect x="20" y="74" width="50" height="6" rx="2" fill="#F3F4F6"/>
              <path d="M90 45L100 35V55L90 45Z" fill="#1890ff"/>
            </svg>
            <div class="empty-text">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <div class="side-panel">
      <div class="side-panel-header">
        <h3>未读消息</h3>
        <button class="side-view-all">全部通知</button>
      </div>
      <div class="message-list">
        <div class="message-item" v-for="(msg, index) in messages" :key="index">
          <div class="message-time">{{ msg.time }}</div>
          <div class="message-content">{{ msg.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('opinion')

const columnsConfig = {
  opinion: [
    { key: 'index', title: '序号', width: '80px' },
    { key: 'transferTime', title: '转办时间', width: '160px' },
    { key: 'initiator', title: '发起人', width: '120px' },
    { key: 'patientName', title: '患者姓名', width: '120px' },
    { key: 'patientNo', title: '患者病号', width: '140px' },
    { key: 'validity', title: '回复剩余有效期', width: '160px' },
    { key: 'actions', title: '操作', width: 'auto' }
  ],
  validity: [
    { key: 'index', title: '序号', width: '80px' },
    { key: 'caseNo', title: '案件编号', width: '160px' },
    { key: 'originalGroup', title: '原受理组', width: '140px' },
    { key: 'originalHandler', title: '原受理人', width: '120px' },
    { key: 'transferNote', title: '移交说明', width: '200px' },
    { key: 'transferTime', title: '移交时间', width: '160px' }
  ],
  archive: [
    { key: 'index', title: '序号', width: '80px' },
    { key: 'caseNo', title: '案件编号', width: '160px' },
    { key: 'initiator', title: '发起人', width: '100px' },
    { key: 'patientName', title: '患者姓名', width: '100px' },
    { key: 'applyType', title: '申请类型', width: '120px' },
    { key: 'status', title: '申请状态', width: '100px' },
    { key: 'approvalOpinion', title: '审批意见', width: '120px' },
    { key: 'submitTime', title: '提交时间', width: '140px' },
    { key: 'approvalTime', title: '审批时间', width: '140px' },
    { key: 'actions', title: '操作', width: 'auto' }
  ]
}

const tableDataConfig = {
  opinion: [
    {
      transferTime: '2023-10-22 16:38:37',
      initiator: '付世平',
      patientName: '张小明',
      patientNo: 'NO2350',
      validity: ''
    },
    {
      transferTime: '2023-10-22 16:38:20',
      initiator: '付世平',
      patientName: '张小明',
      patientNo: 'NO2350',
      validity: ''
    },
    {
      transferTime: '2023-10-22 16:37:56',
      initiator: '付世平',
      patientName: '张小明',
      patientNo: 'NO2350',
      validity: ''
    }
  ],
  validity: [],
  archive: [
    {
      caseNo: '000157420231022002',
      initiator: '付世平',
      patientName: '宁小刀',
      applyType: '案件完结申请',
      status: '待审核',
      statusClass: 'pending',
      approvalOpinion: '',
      submitTime: '2023-10-22 14:17:15',
      approvalTime: ''
    }
  ]
}

const currentColumns = computed(() => columnsConfig[activeTab.value])
const currentTableData = computed(() => tableDataConfig[activeTab.value])

const messages = [
  {
    time: '2026-06-01 01:15:51',
    content: '你提交的案件申请已被通过，请查看详情'
  },
  {
    time: '2023-10-22 13:20:05',
    content: '你提交的案件申请已被通过，请查看详情'
  },
  {
    time: '2023-10-22 12:40:10',
    content: '你有新的案件等待审批，请及时处理'
  },
  {
    time: '2023-10-22 12:38:30',
    content: '你有新的案件等待审批，请及时处理'
  }
]
</script>

<style scoped>
.home-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 56px);
}

.main-panel {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.card-wrapper {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs-header {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #E5E7EB;
  padding: 0 20px;
  position: relative;
}

.tab-item {
  padding: 16px 24px;
  font-size: 15px;
  color: #6B7280;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab-item:hover {
  color: #374151;
}

.tab-item.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
  font-weight: 500;
}

.view-all-btn {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: transparent;
  border: none;
  color: #1890ff;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.view-all-btn:hover {
  background-color: #e6f7ff;
}

.view-all-btn svg {
  width: 14px;
  height: 14px;
}

.table-container {
  width: 100%;
  min-height: 300px;
}

.table-content {
  width: 100%;
}

.table-header {
  display: flex;
  background-color: #FAFAFA;
  border-bottom: 1px solid #E5E7EB;
  padding: 12px 20px;
}

.table-cell {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  text-align: left;
  flex-shrink: 0;
}

.table-body {
  background-color: #FFFFFF;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #F3F4F6;
  padding: 14px 20px;
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #FAFAFA;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .table-cell {
  font-weight: 400;
  color: #374151;
  display: flex;
  align-items: center;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.pending {
  background-color: #FFF7ED;
  color: #C2410C;
}

.case-no {
  color: #1890ff;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  margin-right: 8px;
}

.btn svg {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background-color: #1890ff;
  color: #FFFFFF;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn-outline {
  background-color: #FFFFFF;
  color: #1890ff;
  border: 1px solid #1890ff;
}

.btn-outline:hover {
  background-color: #e6f7ff;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #9CA3AF;
}

.side-panel {
  width: 320px;
  background-color: #FFFFFF;
  border-left: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.side-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
}

.side-panel-header h3 {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.side-view-all {
  background: transparent;
  border: none;
  color: #1890ff;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}

.side-view-all:hover {
  text-decoration: underline;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
}

.message-item {
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;
}

.message-item:last-child {
  border-bottom: none;
}

.message-time {
  font-size: 12px;
  color: #9CA3AF;
  margin-bottom: 8px;
}

.message-content {
  font-size: 13px;
  color: #4B5563;
  line-height: 1.5;
}
</style>
