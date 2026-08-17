<template>
  <div class="page-container">
    <div class="breadcrumb">
      <span class="breadcrumb-item">
        <svg class="breadcrumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">投诉管理</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">公众号反馈管理</span>
    </div>

    <div class="page-header">
      <h1 class="page-title">公众号反馈管理</h1>
      <div class="channel-tag">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c4.801 0 8.692-3.287 8.692-7.342 0-4.054-3.89-7.339-8.692-7.339z" stroke-width="2" stroke-linecap="round"/>
          <path d="M16.71 16.784c-1.175.653-2.484 1.05-3.862 1.05-1.379 0-2.687-.398-3.862-1.05a.72.72 0 01-.258-.976l.68-1.87a.48.48 0 01.424-.276c.827 0 1.622.276 2.256.796.635.52.994 1.238.994 2.013 0 .775-.36 1.492-.994 2.013-.317.21-.663.39-1.032.525l-.25.118.374 1.018a.24.24 0 00.212.132c1.044 0 2.053-.326 2.887-.924.834-.6 1.38-1.447 1.38-2.392 0-.946-.547-1.793-1.381-2.392-.833-.598-1.842-.924-2.886-.924a.48.48 0 01-.424.277l-.68 1.868a.72.72 0 01-.258.976z" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>微信公众号渠道</span>
      </div>
    </div>

    <!-- 预警提示框 -->
    <div class="warning-alert" v-if="showWarningAlert && warningList.length > 0">
      <div class="warning-alert-header">
        <div class="warning-title">
          <svg class="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>案件到期预警</span>
          <span class="warning-count">共 {{ warningList.length }} 条待处理案件即将到期</span>
        </div>
        <button class="warning-close" @click="showWarningAlert = false">×</button>
      </div>
      <div class="warning-alert-body">
        <div class="warning-list">
          <div class="warning-item" v-for="item in warningList" :key="item.id">
            <div class="warning-case-info">
              <span class="warning-case-no">案件 #{{ item.id }}</span>
              <span class="warning-case-submitter">{{ item.submitterName }}</span>
              <span class="warning-case-type">{{ item.feedbackType }}</span>
            </div>
            <div class="warning-case-time">
              <span :class="['warning-time-tag', item.isOverdue ? 'overdue' : '']">
                {{ item.isOverdue ? '即将超期' : item.remainingText }}
              </span>
              <span class="warning-deadline">截止：{{ item.deadlineTime }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="warning-alert-footer">
        <button class="btn btn-warning-dismiss" @click="showWarningAlert = false">取消</button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">提交人姓名</label>
          <input type="text" class="form-input" placeholder="请输入姓名" v-model="filterForm.submitterName">
        </div>
        <div class="filter-item">
          <label class="filter-label">分类</label>
          <select class="form-select" v-model="filterForm.category">
            <option value="">全部</option>
            <option value="complaint">投诉</option>
            <option value="suggestion">意见</option>
            <option value="consult">咨询</option>
            <option value="thanks">表扬</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">反馈类型</label>
          <select class="form-select" v-model="filterForm.feedbackType">
            <option value="">全部</option>
            <option value="1">服务态度</option>
            <option value="2">医疗质量</option>
            <option value="3">就医流程</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">反馈人与就诊人关系</label>
          <select class="form-select" v-model="filterForm.relation">
            <option value="">全部</option>
            <option value="self">本人</option>
            <option value="family">家属</option>
            <option value="friend">朋友</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">状态</label>
          <select class="form-select" v-model="filterForm.status">
            <option value="">全部</option>
            <option value="0">待处理</option>
            <option value="1">处理中</option>
            <option value="2">已处理</option>
            <option value="3">已评价</option>
          </select>
        </div>
      </div>
      <div class="filter-row" style="margin-top: 12px;">
        <div class="filter-item">
          <label class="filter-label">所在省</label>
          <select class="form-select" v-model="filterForm.province" @change="onProvinceChange">
            <option value="">全部</option>
            <option v-for="p in regionData" :key="p.name" :value="p.name">{{ p.name }}</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">所在市</label>
          <select class="form-select" v-model="filterForm.city" :disabled="!filterForm.province" @change="onCityChange">
            <option value="">全部</option>
            <option v-for="c in cityOptions" :key="c.name" :value="c.name">{{ c.name }}</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">所在街道(乡镇)</label>
          <select class="form-select" v-model="filterForm.district" :disabled="!filterForm.city">
            <option value="">全部</option>
            <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">被反馈人员科室</label>
          <input type="text" class="form-input" placeholder="请输入科室" v-model="filterForm.staffDept">
        </div>
        <div class="filter-item">
          <label class="filter-label">被反馈人员姓名</label>
          <input type="text" class="form-input" placeholder="请输入姓名" v-model="filterForm.staffName">
        </div>
      </div>
      <div class="filter-row" style="margin-top: 12px;">
        <div class="filter-item">
          <label class="filter-label">被反馈人员类别</label>
          <select class="form-select" v-model="filterForm.staffCategory">
            <option value="">全部</option>
            <option value="doctor">医生</option>
            <option value="nurse">护士</option>
            <option value="technician">医技</option>
            <option value="logistics">后勤</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">联系方式</label>
          <input type="text" class="form-input" placeholder="请输入手机号" v-model="filterForm.phone">
        </div>
        <div class="filter-item">
          <label class="filter-label">性别</label>
          <select class="form-select" v-model="filterForm.gender">
            <option value="">全部</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-label">年龄</label>
          <input type="number" class="form-input age-input" placeholder="最小年龄" v-model="filterForm.minAge" min="0" max="150">
          <span style="margin: 0 4px; color: #999;">至</span>
          <input type="number" class="form-input age-input" placeholder="最大年龄" v-model="filterForm.maxAge" min="0" max="150">
        </div>
        <div class="filter-item">
          <label class="filter-label">提交时间</label>
          <input type="date" class="form-input date-input" v-model="filterForm.startDate">
          <span style="margin: 0 4px; color: #999;">至</span>
          <input type="date" class="form-input date-input" v-model="filterForm.endDate">
        </div>
        <button class="btn btn-primary" @click="handleSearch">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke-width="2" stroke-linecap="round"/>
          </svg>
          搜索
        </button>
        <button class="btn btn-secondary" @click="handleReset">重置</button>
      </div>
    </div>

    <div class="action-bar">
      <button class="btn btn-primary">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 8L12 3L7 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 3V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        批量导入
      </button>
      <button class="btn btn-secondary">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15V3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        导出Excel
      </button>
    </div>

    <div class="table-container table-horizontal-scroll">
      <div class="table-header">
        <div class="table-cell" style="width: 60px; flex-shrink: 0;">
          <input type="checkbox" class="checkbox">
        </div>
        <div class="table-cell" style="width: 60px; flex-shrink: 0;">序号</div>
        <div class="table-cell" style="width: 100px; flex-shrink: 0;">提交人</div>
        <div class="table-cell" style="width: 80px; flex-shrink: 0;">分类</div>
        <div class="table-cell" style="width: 100px; flex-shrink: 0;">反馈类型</div>
        <div class="table-cell" style="width: 120px; flex-shrink: 0;">反馈人与就诊人关系</div>
        <div class="table-cell" style="width: 100px; flex-shrink: 0;">所在省</div>
        <div class="table-cell" style="width: 100px; flex-shrink: 0;">所在市</div>
        <div class="table-cell" style="width: 120px; flex-shrink: 0;">所在街道(乡镇)</div>
        <div class="table-cell" style="width: 120px; flex-shrink: 0;">被反馈人员科室</div>
        <div class="table-cell" style="width: 100px; flex-shrink: 0;">被反馈人员姓名</div>
        <div class="table-cell" style="width: 100px; flex-shrink: 0;">被反馈人员类别</div>
        <div class="table-cell" style="width: 80px; flex-shrink: 0;">性别</div>
        <div class="table-cell" style="width: 80px; flex-shrink: 0;">年龄</div>
        <div class="table-cell" style="width: 150px; flex-shrink: 0;">提交时间</div>
        <div class="table-cell" style="flex: 1; min-width: 200px;">问题描述</div>
        <div class="table-cell" style="width: 80px; flex-shrink: 0;">状态</div>
        <div class="table-cell" style="width: 150px; flex-shrink: 0;">结束时间</div>
        <div class="table-cell" style="width: 100px; flex-shrink: 0;">评价</div>
        <div class="table-cell" style="width: 180px; flex-shrink: 0;">操作</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="(item, index) in feedbackList" :key="item.id">
          <div class="table-cell" style="width: 60px; flex-shrink: 0;">
            <input type="checkbox" class="checkbox">
          </div>
          <div class="table-cell" style="width: 60px; flex-shrink: 0;">{{ index + 1 }}</div>
          <div class="table-cell" style="width: 100px; flex-shrink: 0;">{{ item.submitterName }}</div>
          <div class="table-cell" style="width: 80px; flex-shrink: 0;">{{ getCategoryText(item.category) }}</div>
          <div class="table-cell" style="width: 100px; flex-shrink: 0;">{{ item.feedbackType }}</div>
          <div class="table-cell" style="width: 120px; flex-shrink: 0;">{{ getRelationText(item.relation) }}</div>
          <div class="table-cell" style="width: 100px; flex-shrink: 0;">{{ item.province || '-' }}</div>
          <div class="table-cell" style="width: 100px; flex-shrink: 0;">{{ item.city || '-' }}</div>
          <div class="table-cell" style="width: 120px; flex-shrink: 0;">{{ item.district || '-' }}</div>
          <div class="table-cell" style="width: 120px; flex-shrink: 0;">{{ item.staffDept || '-' }}</div>
          <div class="table-cell" style="width: 100px; flex-shrink: 0;">{{ item.staffName || '-' }}</div>
          <div class="table-cell" style="width: 100px; flex-shrink: 0;">{{ getStaffCategoryText(item.staffCategory) }}</div>
          <div class="table-cell" style="width: 80px; flex-shrink: 0;">{{ getGenderText(item.gender) }}</div>
          <div class="table-cell" style="width: 80px; flex-shrink: 0;">{{ item.age || '-' }}</div>
          <div class="table-cell" style="width: 150px; flex-shrink: 0;">{{ item.submitTime }}</div>
          <div class="table-cell" style="flex: 1; min-width: 200px;">
            <span class="content-preview" @click="showDetail(item)">{{ item.description }}</span>
          </div>
          <div class="table-cell" style="width: 80px; flex-shrink: 0;">
            <span :class="['status-tag', getStatusClass(item.status)]">
              {{ getStatusText(item.status) }}
            </span>
          </div>
          <div class="table-cell" style="width: 150px; flex-shrink: 0;">{{ item.endTime || '-' }}</div>
          <div class="table-cell" style="width: 100px; flex-shrink: 0;">
            <div class="rating" v-if="item.rating">
              <span class="rating-stars">{{ '★'.repeat(item.rating) }}</span>
            </div>
            <span v-else>-</span>
          </div>
          <div class="table-cell" style="width: 180px; flex-shrink: 0;">
            <a href="#" class="action-link" @click.prevent="showDetail(item)">详情</a>
            <a href="#" class="action-link" @click.prevent="handleFeedback(item)" v-if="item.status < 2">处理</a>
            <a href="#" class="action-link" @click.prevent="replyFeedback(item)" v-if="item.status === 2">回复</a>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <div class="pagination-info">共 {{ total }} 条记录</div>
      <div class="pagination-controls">
        <button class="pagination-btn" :disabled="currentPage === 1">上一页</button>
        <span class="pagination-page">{{ currentPage }} / {{ totalPages }}</span>
        <button class="pagination-btn" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>

    <div class="drawer-overlay" v-if="showDetailDrawer" @click="showDetailDrawer = false">
      <div class="drawer drawer-wide" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">反馈详情</h3>
          <button class="drawer-close" @click="showDetailDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="detail-section">
            <div class="detail-title">基本信息</div>
            <div class="detail-grid detail-grid-3">
              <div class="detail-item">
                <span class="detail-label">提交人：</span>
                <span class="detail-value">{{ currentFeedback.submitterName }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">联系方式：</span>
                <span class="detail-value">{{ currentFeedback.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">患者号：</span>
                <span class="detail-value">{{ currentFeedback.patientNo }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">分类：</span>
                <span class="detail-value">{{ getCategoryText(currentFeedback.category) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">反馈类型：</span>
                <span class="detail-value">{{ currentFeedback.feedbackType }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">反馈人与就诊人关系：</span>
                <span class="detail-value">{{ getRelationText(currentFeedback.relation) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">所在省：</span>
                <span class="detail-value">{{ currentFeedback.province || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">所在市：</span>
                <span class="detail-value">{{ currentFeedback.city || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">所在街道(乡镇)：</span>
                <span class="detail-value">{{ currentFeedback.district || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">性别：</span>
                <span class="detail-value">{{ getGenderText(currentFeedback.gender) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">年龄：</span>
                <span class="detail-value">{{ currentFeedback.age || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">提交时间：</span>
                <span class="detail-value">{{ currentFeedback.submitTime }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">状态：</span>
                <span :class="['status-tag', getStatusClass(currentFeedback.status)]">
                  {{ getStatusText(currentFeedback.status) }}
                </span>
              </div>
            </div>
          </div>
          <div class="detail-section">
            <div class="detail-title">被反馈人员信息</div>
            <div class="detail-grid detail-grid-3">
              <div class="detail-item">
                <span class="detail-label">被反馈人员科室：</span>
                <span class="detail-value">{{ currentFeedback.staffDept || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">被反馈人员姓名：</span>
                <span class="detail-value">{{ currentFeedback.staffName || '-' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">被反馈人员类别：</span>
                <span class="detail-value">{{ getStaffCategoryText(currentFeedback.staffCategory) }}</span>
              </div>
            </div>
          </div>
          <div class="detail-section">
            <div class="detail-title">问题描述</div>
            <div class="detail-content">{{ currentFeedback.description }}</div>
          </div>
          <div class="detail-section" v-if="currentFeedback.images && currentFeedback.images.length">
            <div class="detail-title">上传图片</div>
            <div class="image-preview">
              <img v-for="(img, idx) in currentFeedback.images" :key="idx" :src="img" alt="反馈图片">
            </div>
          </div>
          <div class="detail-section" v-if="currentFeedback.handleResult">
            <div class="detail-title">处理结果</div>
            <div class="detail-content">{{ currentFeedback.handleResult }}</div>
          </div>
          <div class="detail-section" v-if="currentFeedback.rating">
            <div class="detail-title">评价信息</div>
            <div class="detail-content">
              <div class="rating-display">
                <span class="rating-stars">{{ '★'.repeat(currentFeedback.rating) }}{{ '☆'.repeat(5 - currentFeedback.rating) }}</span>
                <span class="rating-text">{{ currentFeedback.ratingContent }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="drawer-overlay" v-if="showHandleDrawer" @click="showHandleDrawer = false">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h3 class="drawer-title">处理反馈</h3>
          <button class="drawer-close" @click="showHandleDrawer = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="form-item required">
            <label class="form-label">处理结果</label>
            <select class="form-select" v-model="handleForm.result">
              <option value="">请选择处理结果</option>
              <option value="resolved">已解决</option>
              <option value="processing">处理中</option>
              <option value="rejected">不予受理</option>
            </select>
          </div>
          <div class="form-item required">
            <label class="form-label">处理意见</label>
            <textarea class="form-textarea" v-model="handleForm.opinion" placeholder="请输入处理意见" rows="6"></textarea>
          </div>
          <div class="form-item">
            <label class="form-label">附件上传</label>
            <div class="upload-area">
              <input type="file" id="file-upload-wechat" style="display: none;">
              <label for="file-upload-wechat" class="upload-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17 8L12 3L7 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 3V15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                点击上传
              </label>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">发送通知</label>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" v-model="handleForm.notifyWechat">
                <span>微信通知</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="handleForm.notifySms">
                <span>短信通知</span>
              </label>
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn btn-secondary" @click="showHandleDrawer = false">取消</button>
          <button class="btn btn-primary" @click="submitHandle">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { regionData, getCitiesByProvince, getDistrictsByCity } from '../../utils/regionData'

const showWarningAlert = ref(true)
const warningConfig = ref({
  complaintDeadline: 7,
  autoWarning: true,
  warningTime: 30
})
let warningTimer = null

const warningList = computed(() => {
  const now = new Date()
  const result = []
  for (const item of feedbackList.value) {
    if (item.status >= 2) continue
    const submitDate = new Date(item.submitTime.replace(/-/g, '/'))
    const deadline = new Date(submitDate.getTime() + warningConfig.value.complaintDeadline * 24 * 60 * 60 * 1000)
    const warningThreshold = new Date(deadline.getTime() - warningConfig.value.warningTime * 60 * 1000)
    if (now >= warningThreshold) {
      const diffMs = deadline.getTime() - now.getTime()
      const isOverdue = diffMs <= 0
      const remainingMinutes = Math.abs(Math.floor(diffMs / (1000 * 60)))
      let remainingText = ''
      if (isOverdue) {
        const overdueDays = Math.floor(remainingMinutes / (60 * 24))
        const overdueHours = Math.floor((remainingMinutes % (60 * 24)) / 60)
        remainingText = overdueDays > 0 ? `即将超期 ${overdueDays}天${overdueHours}小时` : `即将超期 ${overdueHours}小时`
      } else {
        const days = Math.floor(remainingMinutes / (60 * 24))
        const hours = Math.floor((remainingMinutes % (60 * 24)) / 60)
        const mins = remainingMinutes % 60
        if (days > 0) {
          remainingText = `剩余 ${days}天${hours}小时`
        } else if (hours > 0) {
          remainingText = `剩余 ${hours}小时${mins}分钟`
        } else {
          remainingText = `剩余 ${mins}分钟`
        }
      }
      result.push({
        ...item,
        isOverdue,
        remainingText,
        deadlineTime: deadline.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      })
    }
  }
  return result.sort((a, b) => {
    const aTime = new Date(a.submitTime.replace(/-/g, '/')).getTime() + warningConfig.value.complaintDeadline * 24 * 60 * 60 * 1000
    const bTime = new Date(b.submitTime.replace(/-/g, '/')).getTime() + warningConfig.value.complaintDeadline * 24 * 60 * 60 * 1000
    return aTime - bTime
  })
})

onMounted(() => {
  warningTimer = setInterval(() => {
    showWarningAlert.value = showWarningAlert.value
  }, 60000)
})

onUnmounted(() => {
  if (warningTimer) clearInterval(warningTimer)
})

const showDetailDrawer = ref(false)
const showHandleDrawer = ref(false)
const currentPage = ref(1)
const totalPages = ref(5)
const total = ref(36)

const currentFeedback = ref({})
const handleForm = ref({
  result: '',
  opinion: '',
  notifyWechat: false,
  notifySms: false
})

const filterForm = ref({
  submitterName: '',
  category: '',
  feedbackType: '',
  relation: '',
  province: '',
  city: '',
  district: '',
  staffDept: '',
  staffName: '',
  staffCategory: '',
  phone: '',
  gender: '',
  minAge: '',
  maxAge: '',
  startDate: '',
  endDate: '',
  status: ''
})

const cityOptions = computed(() => {
  return getCitiesByProvince(filterForm.value.province)
})

const districtOptions = computed(() => {
  return getDistrictsByCity(filterForm.value.province, filterForm.value.city)
})

const onProvinceChange = () => {
  filterForm.value.city = ''
  filterForm.value.district = ''
}

const onCityChange = () => {
  filterForm.value.district = ''
}

const handleSearch = () => {
  console.log('搜索条件:', filterForm.value)
}

const handleReset = () => {
  filterForm.value = {
    submitterName: '',
    category: '',
    feedbackType: '',
    relation: '',
    province: '',
    city: '',
    district: '',
    staffDept: '',
    staffName: '',
    staffCategory: '',
    phone: '',
    gender: '',
    minAge: '',
    maxAge: '',
    startDate: '',
    endDate: '',
    status: ''
  }
}

const feedbackList = ref([
  { id: 1, submitterName: '张先生', wechatNickname: '张***', phone: '13800138001', patientNo: 'P202606001', category: 'complaint', feedbackType: '服务态度', relation: 'self', province: '广东省', city: '深圳市', district: '福田区', staffDept: '内科', staffName: '李医生', staffCategory: 'doctor', gender: 'male', age: 35, submitTime: '2026-06-07 14:30:00', description: '门诊挂号处工作人员态度冷漠，排队等候时间过长，希望改进服务流程。', status: 0, endTime: null, rating: null, handleResult: '', images: [] },
  { id: 2, submitterName: '李女士', wechatNickname: '幸福***', phone: '13800138002', patientNo: 'P202606002', category: 'suggestion', feedbackType: '就医流程', relation: 'family', province: '广东省', city: '广州市', district: '天河区', staffDept: '门诊', staffName: '王护士', staffCategory: 'nurse', gender: 'female', age: 28, submitTime: '2026-06-06 10:20:00', description: '建议增加自助挂号机数量，减少排队等候时间。', status: 1, endTime: null, rating: null, handleResult: '', images: ['https://via.placeholder.com/100'] },
  { id: 3, submitterName: '王阿姨', wechatNickname: '健康***', phone: '13800138003', patientNo: 'P202605003', category: 'complaint', feedbackType: '医疗质量', relation: 'self', province: '北京市', city: '北京市', district: '海淀区', staffDept: '外科', staffName: '张主任', staffCategory: 'doctor', gender: 'female', age: 56, submitTime: '2026-06-05 15:15:00', description: '对检查结果有疑问，医生解释不够详细，希望得到更专业的解答。', status: 2, endTime: '2026-06-06 10:00:00', rating: null, handleResult: '已安排专家进行详细解答，患者表示满意。', images: [] },
  { id: 4, submitterName: '陈先生', wechatNickname: '阳光***', phone: '13800138004', patientNo: 'P202605004', category: 'consult', feedbackType: '其他', relation: 'friend', province: '上海市', city: '上海市', district: '浦东新区', staffDept: '', staffName: '', staffCategory: '', gender: 'male', age: 42, submitTime: '2026-06-04 09:30:00', description: '请问周末是否可以做体检？需要提前预约吗？', status: 3, endTime: '2026-06-04 11:00:00', rating: 5, ratingContent: '回复很及时，解答很详细，非常满意！', handleResult: '周末可以进行体检，建议提前一周预约。', images: [] },
  { id: 5, submitterName: '刘女士', wechatNickname: '平安***', phone: '13800138005', patientNo: 'P202605005', category: 'thanks', feedbackType: '服务态度', relation: 'self', province: '广东省', city: '深圳市', district: '南山区', staffDept: '内科', staffName: '陈医生', staffCategory: 'doctor', gender: 'female', age: 32, submitTime: '2026-06-03 16:45:00', description: '感谢陈医生的耐心诊治，服务态度非常好，病情得到了有效控制。', status: 3, endTime: '2026-06-04 10:00:00', rating: 5, ratingContent: '非常满意，医生很专业', handleResult: '已转达感谢，继续保持优质服务。', images: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'] }
])

const getStatusClass = (status) => {
  const classes = ['pending', 'processing', 'resolved', 'rated']
  return classes[status] || 'pending'
}

const getStatusText = (status) => {
  const texts = ['待处理', '处理中', '已处理', '已评价']
  return texts[status] || '待处理'
}

const getCategoryText = (category) => {
  const map = {
    complaint: '投诉',
    suggestion: '意见',
    consult: '咨询',
    thanks: '表扬',
    other: '其他'
  }
  return map[category] || '-'
}

const getRelationText = (relation) => {
  const map = {
    self: '本人',
    family: '家属',
    friend: '朋友',
    other: '其他'
  }
  return map[relation] || '-'
}

const getStaffCategoryText = (category) => {
  const map = {
    doctor: '医生',
    nurse: '护士',
    technician: '医技',
    logistics: '后勤',
    other: '其他'
  }
  return map[category] || '-'
}

const getGenderText = (gender) => {
  const map = {
    male: '男',
    female: '女'
  }
  return map[gender] || '-'
}

const showDetail = (item) => {
  currentFeedback.value = { ...item }
  showDetailDrawer.value = true
}

const handleFeedback = (item) => {
  currentFeedback.value = { ...item }
  handleForm.value = {
    result: '',
    opinion: '',
    notifyWechat: false,
    notifySms: false
  }
  showHandleDrawer.value = true
}

const replyFeedback = (item) => {
  currentFeedback.value = { ...item }
  showHandleDrawer.value = true
}

const submitHandle = () => {
  if (!handleForm.value.result || !handleForm.value.opinion) {
    alert('请填写完整信息')
    return
  }
  const index = feedbackList.value.findIndex(f => f.id === currentFeedback.value.id)
  if (index > -1) {
    feedbackList.value[index].status = 2
    feedbackList.value[index].handleResult = handleForm.value.opinion
    feedbackList.value[index].endTime = new Date().toLocaleString()
  }
  showHandleDrawer.value = false
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.channel-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #e6f7ff;
  border-radius: 4px;
  font-size: 12px;
  color: #1890ff;
}

.channel-tag svg {
  width: 16px;
  height: 16px;
}

.filter-bar {
  background: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.form-select,
.form-input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.form-select:focus,
.form-input:focus {
  border-color: #1890ff;
}

.form-select {
  width: 150px;
  background: #fff;
}

.form-input {
  width: 150px;
}

.form-input.age-input {
  width: 80px;
}

.form-input.date-input {
  width: 130px;
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

.btn-secondary:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.action-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.table-container {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-horizontal-scroll {
  overflow-x: auto;
}

.table-header {
  display: flex;
  background: #fafafa;
  border-bottom: 1px solid #e8e8e8;
  min-width: max-content;
}

.table-body {
  max-height: 500px;
  overflow-y: auto;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s;
  min-width: max-content;
}

.table-row:hover {
  background: #f5f7fa;
}

.table-cell {
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.table-header .table-cell {
  font-weight: 600;
  color: #666;
}

.checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.content-preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: #1890ff;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
}

.status-tag.pending {
  background: #fff1f0;
  color: #ff4d4f;
}

.status-tag.processing {
  background: #fff7e6;
  color: #fa8c16;
}

.status-tag.resolved {
  background: #f6ffed;
  color: #52c41a;
}

.status-tag.rated {
  background: #e6f7ff;
  color: #1890ff;
}

.rating {
  display: flex;
  align-items: center;
}

.rating-stars {
  color: #faad14;
  font-size: 14px;
}

.action-link {
  color: #1890ff;
  text-decoration: none;
  margin-right: 12px;
  font-size: 14px;
}

.action-link:hover {
  color: #40a9ff;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
  margin-top: 16px;
  border-radius: 4px;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pagination-btn {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
}

.pagination-btn:disabled {
  color: #d9d9d9;
  cursor: not-allowed;
}

.pagination-page {
  font-size: 14px;
  color: #666;
}

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
  width: 600px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

.drawer-wide {
  width: 750px;
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

.detail-section {
  margin-bottom: 24px;
}

.detail-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.detail-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-label {
  color: #666;
  font-size: 14px;
}

.detail-value {
  color: #333;
  font-size: 14px;
}

.detail-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.image-preview img {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;
}

.rating-display {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rating-text {
  color: #666;
  font-size: 14px;
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

.form-item .form-select {
  width: 100%;
}

.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 120px;
}

.form-textarea:focus {
  border-color: #1890ff;
}

.upload-area {
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  padding: 24px;
  text-align: center;
}

.upload-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
}

.upload-btn svg {
  width: 32px;
  height: 32px;
}

.checkbox-group {
  display: flex;
  gap: 24px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-item input {
  width: 16px;
  height: 16px;
}

.warning-alert {
  background: #fff7e6;
  border: 1px solid #ffd591;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.15);
}

.warning-alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: linear-gradient(135deg, #fff1b8 0%, #fff7e6 100%);
  border-bottom: 1px solid #ffd591;
}

.warning-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #d46b08;
}

.warning-icon {
  width: 22px;
  height: 22px;
  color: #fa8c16;
}

.warning-count {
  font-size: 13px;
  font-weight: normal;
  color: #ad6800;
  background: rgba(255, 140, 0, 0.1);
  padding: 2px 10px;
  border-radius: 10px;
}

.warning-close {
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  font-size: 18px;
  color: #8c8c8c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.warning-close:hover {
  background: #ff4d4f;
  color: #fff;
}

.warning-alert-body {
  padding: 16px 20px;
}

.warning-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.warning-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #ffe7ba;
  border-radius: 6px;
  transition: all 0.2s;
}

.warning-item:hover {
  border-color: #ffbb96;
  box-shadow: 0 2px 6px rgba(255, 140, 0, 0.1);
}

.warning-case-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.warning-case-no {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.warning-case-submitter {
  font-size: 13px;
  color: #666;
  padding: 2px 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.warning-case-type {
  font-size: 13px;
  color: #fa8c16;
  padding: 2px 8px;
  background: #fff7e6;
  border-radius: 4px;
}

.warning-case-time {
  display: flex;
  align-items: center;
  gap: 12px;
}

.warning-time-tag {
  font-size: 13px;
  font-weight: 600;
  color: #fa8c16;
  padding: 4px 12px;
  background: #fff7e6;
  border-radius: 12px;
}

.warning-time-tag.overdue {
  color: #fff;
  background: #fa8c16;
}

.warning-deadline {
  font-size: 12px;
  color: #999;
}

.warning-alert-footer {
  display: flex;
  justify-content: flex-end;
  padding: 12px 20px;
  background: #fffbe6;
  border-top: 1px solid #ffd591;
}

.btn-warning-dismiss {
  background: #fff;
  color: #8c8c8c;
  border: 1px solid #d9d9d9;
}

.btn-warning-dismiss:hover {
  color: #fa8c16;
  border-color: #fa8c16;
}
</style>
