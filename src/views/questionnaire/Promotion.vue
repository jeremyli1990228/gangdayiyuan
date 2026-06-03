<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">问卷调查</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">问卷推广</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">问卷推广</h1>
    </div>
    
    <div class="content-wrapper">
      <div class="section">
        <h3 class="section-title">链接推广</h3>
        <div class="section-content">
          <div class="link-box">
            <span class="label">复制链接:</span>
            <div class="link-content">https://pro.hku-szh.org:9990/#/questionnaire</div>
          </div>
          <div class="tips">
            <div class="tip-item">1、复制链接</div>
            <div class="tip-item">2、将链接插入到网站相应渠道，如公众号、官网</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">二维码推广</h3>
        <div class="section-content">
          <div class="tips">
            <div class="tip-item">1、下载下方二维码并打印</div>
          </div>
          <div class="qrcode-box">
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" fill="#fff"/>
              <rect x="5" y="5" width="110" height="110" fill="#fff" stroke="#333" stroke-width="2"/>
              <rect x="15" y="15" width="25" height="25" fill="#333"/>
              <rect x="15" y="15" width="15" height="15" fill="#fff"/>
              <rect x="80" y="15" width="25" height="25" fill="#333"/>
              <rect x="85" y="20" width="15" height="15" fill="#fff"/>
              <rect x="15" y="80" width="25" height="25" fill="#333"/>
              <rect x="20" y="85" width="15" height="15" fill="#fff"/>
              <rect x="25" y="25" width="5" height="5" fill="#fff"/>
              <rect x="30" y="25" width="5" height="5" fill="#333"/>
              <rect x="25" y="30" width="5" height="5" fill="#333"/>
              <rect x="30" y="30" width="5" height="5" fill="#333"/>
              <rect x="45" y="15" width="5" height="5" fill="#333"/>
              <rect x="50" y="15" width="5" height="5" fill="#fff"/>
              <rect x="55" y="15" width="5" height="5" fill="#fff"/>
              <rect x="60" y="15" width="5" height="5" fill="#333"/>
              <rect x="45" y="20" width="5" height="5" fill="#fff"/>
              <rect x="50" y="20" width="5" height="5" fill="#333"/>
              <rect x="55" y="20" width="5" height="5" fill="#333"/>
              <rect x="60" y="20" width="5" height="5" fill="#fff"/>
              <rect x="45" y="25" width="5" height="5" fill="#333"/>
              <rect x="50" y="25" width="5" height="5" fill="#333"/>
              <rect x="55" y="25" width="5" height="5" fill="#fff"/>
              <rect x="60" y="25" width="5" height="5" fill="#333"/>
              <rect x="70" y="15" width="5" height="5" fill="#fff"/>
              <rect x="75" y="15" width="5" height="5" fill="#333"/>
              <rect x="70" y="20" width="5" height="5" fill="#333"/>
              <rect x="75" y="20" width="5" height="5" fill="#fff"/>
              <rect x="70" y="25" width="5" height="5" fill="#333"/>
              <rect x="75" y="25" width="5" height="5" fill="#fff"/>
              <rect x="15" y="40" width="5" height="5" fill="#fff"/>
              <rect x="20" y="40" width="5" height="5" fill="#333"/>
              <rect x="25" y="40" width="5" height="5" fill="#333"/>
              <rect x="30" y="40" width="5" height="5" fill="#fff"/>
              <rect x="15" y="45" width="5" height="5" fill="#fff"/>
              <rect x="20" y="45" width="5" height="5" fill="#333"/>
              <rect x="25" y="45" width="5" height="5" fill="#fff"/>
              <rect x="30" y="45" width="5" height="5" fill="#333"/>
              <rect x="15" y="50" width="5" height="5" fill="#333"/>
              <rect x="20" y="50" width="5" height="5" fill="#fff"/>
              <rect x="25" y="50" width="5" height="5" fill="#333"/>
              <rect x="30" y="50" width="5" height="5" fill="#333"/>
              <rect x="35" y="40" width="5" height="5" fill="#333"/>
              <rect x="40" y="40" width="5" height="5" fill="#333"/>
              <rect x="45" y="40" width="5" height="5" fill="#fff"/>
              <rect x="50" y="40" width="5" height="5" fill="#333"/>
              <rect x="35" y="45" width="5" height="5" fill="#fff"/>
              <rect x="40" y="45" width="5" height="5" fill="#fff"/>
              <rect x="45" y="45" width="5" height="5" fill="#333"/>
              <rect x="50" y="45" width="5" height="5" fill="#fff"/>
              <rect x="35" y="50" width="5" height="5" fill="#333"/>
              <rect x="40" y="50" width="5" height="5" fill="#333"/>
              <rect x="45" y="50" width="5" height="5" fill="#fff"/>
              <rect x="50" y="50" width="5" height="5" fill="#333"/>
              <rect x="55" y="40" width="5" height="5" fill="#333"/>
              <rect x="60" y="40" width="5" height="5" fill="#fff"/>
              <rect x="65" y="40" width="5" height="5" fill="#333"/>
              <rect x="70" y="40" width="5" height="5" fill="#333"/>
              <rect x="55" y="45" width="5" height="5" fill="#fff"/>
              <rect x="60" y="45" width="5" height="5" fill="#333"/>
              <rect x="65" y="45" width="5" height="5" fill="#fff"/>
              <rect x="70" y="45" width="5" height="5" fill="#fff"/>
              <rect x="55" y="50" width="5" height="5" fill="#333"/>
              <rect x="60" y="50" width="5" height="5" fill="#fff"/>
              <rect x="65" y="50" width="5" height="5" fill="#333"/>
              <rect x="70" y="50" width="5" height="5" fill="#fff"/>
              <rect x="75" y="40" width="5" height="5" fill="#fff"/>
              <rect x="80" y="40" width="5" height="5" fill="#333"/>
              <rect x="85" y="40" width="5" height="5" fill="#fff"/>
              <rect x="90" y="40" width="5" height="5" fill="#333"/>
              <rect x="75" y="45" width="5" height="5" fill="#333"/>
              <rect x="80" y="45" width="5" height="5" fill="#fff"/>
              <rect x="85" y="45" width="5" height="5" fill="#333"/>
              <rect x="90" y="45" width="5" height="5" fill="#fff"/>
              <rect x="75" y="50" width="5" height="5" fill="#333"/>
              <rect x="80" y="50" width="5" height="5" fill="#fff"/>
              <rect x="85" y="50" width="5" height="5" fill="#fff"/>
              <rect x="90" y="50" width="5" height="5" fill="#333"/>
              <rect x="95" y="40" width="5" height="5" fill="#fff"/>
              <rect x="100" y="40" width="5" height="5" fill="#fff"/>
              <rect x="95" y="45" width="5" height="5" fill="#333"/>
              <rect x="100" y="45" width="5" height="5" fill="#333"/>
              <rect x="95" y="50" width="5" height="5" fill="#333"/>
              <rect x="100" y="50" width="5" height="5" fill="#fff"/>
              <rect x="15" y="55" width="5" height="5" fill="#333"/>
              <rect x="20" y="55" width="5" height="5" fill="#fff"/>
              <rect x="25" y="55" width="5" height="5" fill="#333"/>
              <rect x="30" y="55" width="5" height="5" fill="#333"/>
              <rect x="15" y="60" width="5" height="5" fill="#333"/>
              <rect x="20" y="60" width="5" height="5" fill="#333"/>
              <rect x="25" y="60" width="5" height="5" fill="#fff"/>
              <rect x="30" y="60" width="5" height="5" fill="#fff"/>
              <rect x="15" y="65" width="5" height="5" fill="#fff"/>
              <rect x="20" y="65" width="5" height="5" fill="#fff"/>
              <rect x="25" y="65" width="5" height="5" fill="#333"/>
              <rect x="30" y="65" width="5" height="5" fill="#333"/>
              <rect x="35" y="55" width="5" height="5" fill="#fff"/>
              <rect x="40" y="55" width="5" height="5" fill="#333"/>
              <rect x="45" y="55" width="5" height="5" fill="#333"/>
              <rect x="50" y="55" width="5" height="5" fill="#fff"/>
              <rect x="35" y="60" width="5" height="5" fill="#fff"/>
              <rect x="40" y="60" width="5" height="5" fill="#fff"/>
              <rect x="45" y="60" width="5" height="5" fill="#fff"/>
              <rect x="50" y="60" width="5" height="5" fill="#333"/>
              <rect x="35" y="65" width="5" height="5" fill="#333"/>
              <rect x="40" y="65" width="5" height="5" fill="#333"/>
              <rect x="45" y="65" width="5" height="5" fill="#333"/>
              <rect x="50" y="65" width="5" height="5" fill="#fff"/>
              <rect x="55" y="55" width="5" height="5" fill="#333"/>
              <rect x="60" y="55" width="5" height="5" fill="#333"/>
              <rect x="65" y="55" width="5" height="5" fill="#333"/>
              <rect x="70" y="55" width="5" height="5" fill="#fff"/>
              <rect x="55" y="60" width="5" height="5" fill="#fff"/>
              <rect x="60" y="60" width="5" height="5" fill="#fff"/>
              <rect x="65" y="60" width="5" height="5" fill="#fff"/>
              <rect x="70" y="60" width="5" height="5" fill="#333"/>
              <rect x="55" y="65" width="5" height="5" fill="#333"/>
              <rect x="60" y="65" width="5" height="5" fill="#333"/>
              <rect x="65" y="65" width="5" height="5" fill="#333"/>
              <rect x="70" y="65" width="5" height="5" fill="#333"/>
              <rect x="75" y="55" width="5" height="5" fill="#fff"/>
              <rect x="80" y="55" width="5" height="5" fill="#fff"/>
              <rect x="85" y="55" width="5" height="5" fill="#333"/>
              <rect x="90" y="55" width="5" height="5" fill="#333"/>
              <rect x="75" y="60" width="5" height="5" fill="#333"/>
              <rect x="80" y="60" width="5" height="5" fill="#333"/>
              <rect x="85" y="60" width="5" height="5" fill="#fff"/>
              <rect x="90" y="60" width="5" height="5" fill="#fff"/>
              <rect x="75" y="65" width="5" height="5" fill="#fff"/>
              <rect x="80" y="65" width="5" height="5" fill="#fff"/>
              <rect x="85" y="65" width="5" height="5" fill="#333"/>
              <rect x="90" y="65" width="5" height="5" fill="#333"/>
              <rect x="95" y="55" width="5" height="5" fill="#333"/>
              <rect x="100" y="55" width="5" height="5" fill="#fff"/>
              <rect x="95" y="60" width="5" height="5" fill="#fff"/>
              <rect x="100" y="60" width="5" height="5" fill="#333"/>
              <rect x="95" y="65" width="5" height="5" fill="#333"/>
              <rect x="100" y="65" width="5" height="5" fill="#fff"/>
              <rect x="15" y="70" width="5" height="5" fill="#333"/>
              <rect x="20" y="70" width="5" height="5" fill="#fff"/>
              <rect x="25" y="70" width="5" height="5" fill="#333"/>
              <rect x="30" y="70" width="5" height="5" fill="#333"/>
              <rect x="15" y="75" width="5" height="5" fill="#333"/>
              <rect x="20" y="75" width="5" height="5" fill="#333"/>
              <rect x="25" y="75" width="5" height="5" fill="#fff"/>
              <rect x="30" y="75" width="5" height="5" fill="#fff"/>
              <rect x="15" y="80" width="5" height="5" fill="#fff"/>
              <rect x="20" y="80" width="5" height="5" fill="#333"/>
              <rect x="25" y="80" width="5" height="5" fill="#333"/>
              <rect x="30" y="80" width="5" height="5" fill="#333"/>
              <rect x="35" y="70" width="5" height="5" fill="#fff"/>
              <rect x="40" y="70" width="5" height="5" fill="#333"/>
              <rect x="45" y="70" width="5" height="5" fill="#333"/>
              <rect x="50" y="70" width="5" height="5" fill="#fff"/>
              <rect x="35" y="75" width="5" height="5" fill="#fff"/>
              <rect x="40" y="75" width="5" height="5" fill="#333"/>
              <rect x="45" y="75" width="5" height="5" fill="#fff"/>
              <rect x="50" y="75" width="5" height="5" fill="#333"/>
              <rect x="35" y="80" width="5" height="5" fill="#333"/>
              <rect x="40" y="80" width="5" height="5" fill="#fff"/>
              <rect x="45" y="80" width="5" height="5" fill="#333"/>
              <rect x="50" y="80" width="5" height="5" fill="#333"/>
              <rect x="55" y="70" width="5" height="5" fill="#333"/>
              <rect x="60" y="70" width="5" height="5" fill="#fff"/>
              <rect x="65" y="70" width="5" height="5" fill="#333"/>
              <rect x="70" y="70" width="5" height="5" fill="#333"/>
              <rect x="55" y="75" width="5" height="5" fill="#fff"/>
              <rect x="60" y="75" width="5" height="5" fill="#333"/>
              <rect x="65" y="75" width="5" height="5" fill="#fff"/>
              <rect x="70" y="75" width="5" height="5" fill="#fff"/>
              <rect x="55" y="80" width="5" height="5" fill="#333"/>
              <rect x="60" y="80" width="5" height="5" fill="#fff"/>
              <rect x="65" y="80" width="5" height="5" fill="#333"/>
              <rect x="70" y="80" width="5" height="5" fill="#fff"/>
              <rect x="75" y="70" width="5" height="5" fill="#333"/>
              <rect x="80" y="70" width="5" height="5" fill="#333"/>
              <rect x="85" y="70" width="5" height="5" fill="#333"/>
              <rect x="90" y="70" width="5" height="5" fill="#fff"/>
              <rect x="75" y="75" width="5" height="5" fill="#fff"/>
              <rect x="80" y="75" width="5" height="5" fill="#fff"/>
              <rect x="85" y="75" width="5" height="5" fill="#fff"/>
              <rect x="90" y="75" width="5" height="5" fill="#333"/>
              <rect x="75" y="80" width="5" height="5" fill="#333"/>
              <rect x="80" y="80" width="5" height="5" fill="#333"/>
              <rect x="85" y="80" width="5" height="5" fill="#333"/>
              <rect x="90" y="80" width="5" height="5" fill="#333"/>
              <rect x="95" y="70" width="5" height="5" fill="#fff"/>
              <rect x="100" y="70" width="5" height="5" fill="#333"/>
              <rect x="95" y="75" width="5" height="5" fill="#333"/>
              <rect x="100" y="75" width="5" height="5" fill="#fff"/>
              <rect x="95" y="80" width="5" height="5" fill="#fff"/>
              <rect x="100" y="80" width="5" height="5" fill="#333"/>
              <rect x="45" y="85" width="5" height="5" fill="#333"/>
              <rect x="50" y="85" width="5" height="5" fill="#333"/>
              <rect x="55" y="85" width="5" height="5" fill="#333"/>
              <rect x="60" y="85" width="5" height="5" fill="#fff"/>
              <rect x="45" y="90" width="5" height="5" fill="#fff"/>
              <rect x="50" y="90" width="5" height="5" fill="#fff"/>
              <rect x="55" y="90" width="5" height="5" fill="#fff"/>
              <rect x="60" y="90" width="5" height="5" fill="#333"/>
              <rect x="45" y="95" width="5" height="5" fill="#333"/>
              <rect x="50" y="95" width="5" height="5" fill="#333"/>
              <rect x="55" y="95" width="5" height="5" fill="#333"/>
              <rect x="60" y="95" width="5" height="5" fill="#333"/>
              <rect x="65" y="85" width="5" height="5" fill="#fff"/>
              <rect x="70" y="85" width="5" height="5" fill="#fff"/>
              <rect x="75" y="85" width="5" height="5" fill="#333"/>
              <rect x="80" y="85" width="5" height="5" fill="#333"/>
              <rect x="65" y="90" width="5" height="5" fill="#333"/>
              <rect x="70" y="90" width="5" height="5" fill="#333"/>
              <rect x="75" y="90" width="5" height="5" fill="#fff"/>
              <rect x="80" y="90" width="5" height="5" fill="#fff"/>
              <rect x="65" y="95" width="5" height="5" fill="#fff"/>
              <rect x="70" y="95" width="5" height="5" fill="#fff"/>
              <rect x="75" y="95" width="5" height="5" fill="#333"/>
              <rect x="80" y="95" width="5" height="5" fill="#333"/>
              <rect x="85" y="85" width="5" height="5" fill="#333"/>
              <rect x="90" y="85" width="5" height="5" fill="#333"/>
              <rect x="85" y="90" width="5" height="5" fill="#fff"/>
              <rect x="90" y="90" width="5" height="5" fill="#333"/>
              <rect x="85" y="95" width="5" height="5" fill="#333"/>
              <rect x="90" y="95" width="5" height="5" fill="#fff"/>
              <rect x="45" y="100" width="5" height="5" fill="#333"/>
              <rect x="50" y="100" width="5" height="5" fill="#fff"/>
              <rect x="55" y="100" width="5" height="5" fill="#333"/>
              <rect x="60" y="100" width="5" height="5" fill="#333"/>
              <rect x="45" y="105" width="5" height="5" fill="#fff"/>
              <rect x="50" y="105" width="5" height="5" fill="#333"/>
              <rect x="55" y="105" width="5" height="5" fill="#fff"/>
              <rect x="60" y="105" width="5" height="5" fill="#fff"/>
              <rect x="65" y="100" width="5" height="5" fill="#fff"/>
              <rect x="70" y="100" width="5" height="5" fill="#333"/>
              <rect x="65" y="105" width="5" height="5" fill="#333"/>
              <rect x="70" y="105" width="5" height="5" fill="#fff"/>
            </svg>
          </div>
          <div class="tips">
            <div class="tip-item">2、将打印的二维码张贴，用户扫码二维码后可以进行答卷</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">短信推广</h3>
        <div class="section-content">
          <div class="tips">
            <div class="tip-item">1、准备需推广的成员名单</div>
            <div class="tip-item">2、点击群发短信，导入推广人员名单</div>
            <div class="tip-item">3、点击管理后台消息菜单可以查看短信记录</div>
          </div>
          <button class="btn btn-primary btn-sms">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2"/>
            </svg>
            群发短信
          </button>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">系统自动发送短信</h3>
        <div class="section-content">
          <div class="auto-sms-desc">患者产生门诊或住院记录时自动发送问卷推广短信</div>
          <div class="toggle-wrapper">
            <span class="toggle-label">关闭</span>
            <label class="toggle-switch">
              <input type="checkbox" v-model="autoSmsEnabled">
              <span class="slider"></span>
            </label>
            <span class="toggle-label">开启</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const autoSmsEnabled = ref(false)

const goBack = () => {
  window.history.back()
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
  text-decoration: none;
  font-size: 14px;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.content-wrapper {
  max-width: 800px;
}

.section {
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.section-content {
  padding-top: 8px;
}

.link-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.link-box .label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.link-content {
  flex: 1;
  padding: 8px 12px;
  background-color: #fafafa;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  font-family: monospace;
}

.tips {
  margin-bottom: 16px;
}

.tip-item {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

.qrcode-box {
  margin: 16px 0;
  width: 120px;
  height: 120px;
}

.qrcode-box svg {
  width: 100%;
  height: 100%;
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

.btn-sms {
  margin-top: 8px;
}

.auto-sms-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-label {
  font-size: 14px;
  color: #666;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 26px;
}

.toggle-switch .slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

.toggle-switch input:checked + .slider {
  background-color: #1890ff;
}

.toggle-switch input:checked + .slider:before {
  transform: translateX(22px);
}
</style>