<template>
  <div class="page-container">
    <div class="breadcrumb">
      <div class="breadcrumb-arrow" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg">
          <polyline points="15 18 9 12 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="breadcrumb-item">社工管理</span>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-item active">招聘推广</span>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">招聘推广</h1>
    </div>
    
    <div class="content-section">
      <div class="section">
        <h3 class="section-title">链接推广</h3>
        <div class="section-content">
          <div class="tips">
            <div class="tip-item">1、复制链接：http://10.2.200.11:8081/#/recruit</div>
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
            <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" class="qrcode-svg">
              <rect width="150" height="150" fill="white"/>
              
              <rect x="10" y="10" width="30" height="30" fill="#000"/>
              <rect x="14" y="14" width="22" height="22" fill="white"/>
              <rect x="18" y="18" width="14" height="14" fill="#000"/>
              
              <rect x="110" y="10" width="30" height="30" fill="#000"/>
              <rect x="114" y="14" width="22" height="22" fill="white"/>
              <rect x="118" y="18" width="14" height="14" fill="#000"/>
              
              <rect x="10" y="110" width="30" height="30" fill="#000"/>
              <rect x="14" y="114" width="22" height="22" fill="white"/>
              <rect x="18" y="118" width="14" height="14" fill="#000"/>
              
              <rect x="50" y="10" width="8" height="8" fill="#000"/>
              <rect x="60" y="10" width="8" height="8" fill="#000"/>
              <rect x="70" y="10" width="8" height="8" fill="#000"/>
              <rect x="80" y="10" width="8" height="8" fill="#000"/>
              <rect x="90" y="10" width="8" height="8" fill="#000"/>
              
              <rect x="50" y="20" width="8" height="8" fill="#000"/>
              <rect x="70" y="20" width="8" height="8" fill="#000"/>
              <rect x="90" y="20" width="8" height="8" fill="#000"/>
              
              <rect x="50" y="30" width="8" height="8" fill="#000"/>
              <rect x="60" y="30" width="8" height="8" fill="#000"/>
              <rect x="70" y="30" width="8" height="8" fill="#000"/>
              <rect x="80" y="30" width="8" height="8" fill="#000"/>
              <rect x="90" y="30" width="8" height="8" fill="#000"/>
              
              <rect x="10" y="50" width="8" height="8" fill="#000"/>
              <rect x="20" y="50" width="8" height="8" fill="#000"/>
              <rect x="30" y="50" width="8" height="8" fill="#000"/>
              <rect x="50" y="50" width="8" height="8" fill="#000"/>
              <rect x="70" y="50" width="8" height="8" fill="#000"/>
              <rect x="90" y="50" width="8" height="8" fill="#000"/>
              <rect x="110" y="50" width="8" height="8" fill="#000"/>
              <rect x="120" y="50" width="8" height="8" fill="#000"/>
              <rect x="130" y="50" width="8" height="8" fill="#000"/>
              
              <rect x="10" y="60" width="8" height="8" fill="#000"/>
              <rect x="30" y="60" width="8" height="8" fill="#000"/>
              <rect x="50" y="60" width="8" height="8" fill="#000"/>
              <rect x="60" y="60" width="8" height="8" fill="#000"/>
              <rect x="70" y="60" width="8" height="8" fill="#000"/>
              <rect x="90" y="60" width="8" height="8" fill="#000"/>
              <rect x="100" y="60" width="8" height="8" fill="#000"/>
              <rect x="120" y="60" width="8" height="8" fill="#000"/>
              
              <rect x="10" y="70" width="8" height="8" fill="#000"/>
              <rect x="20" y="70" width="8" height="8" fill="#000"/>
              <rect x="30" y="70" width="8" height="8" fill="#000"/>
              <rect x="50" y="70" width="8" height="8" fill="#000"/>
              <rect x="70" y="70" width="8" height="8" fill="#000"/>
              <rect x="80" y="70" width="8" height="8" fill="#000"/>
              <rect x="100" y="70" width="8" height="8" fill="#000"/>
              <rect x="110" y="70" width="8" height="8" fill="#000"/>
              <rect x="130" y="70" width="8" height="8" fill="#000"/>
              
              <rect x="10" y="80" width="8" height="8" fill="#000"/>
              <rect x="20" y="80" width="8" height="8" fill="#000"/>
              <rect x="40" y="80" width="8" height="8" fill="#000"/>
              <rect x="50" y="80" width="8" height="8" fill="#000"/>
              <rect x="70" y="80" width="8" height="8" fill="#000"/>
              <rect x="90" y="80" width="8" height="8" fill="#000"/>
              <rect x="110" y="80" width="8" height="8" fill="#000"/>
              <rect x="130" y="80" width="8" height="8" fill="#000"/>
              
              <rect x="10" y="90" width="8" height="8" fill="#000"/>
              <rect x="30" y="90" width="8" height="8" fill="#000"/>
              <rect x="40" y="90" width="8" height="8" fill="#000"/>
              <rect x="60" y="90" width="8" height="8" fill="#000"/>
              <rect x="70" y="90" width="8" height="8" fill="#000"/>
              <rect x="80" y="90" width="8" height="8" fill="#000"/>
              <rect x="90" y="90" width="8" height="8" fill="#000"/>
              <rect x="100" y="90" width="8" height="8" fill="#000"/>
              <rect x="110" y="90" width="8" height="8" fill="#000"/>
              <rect x="130" y="90" width="8" height="8" fill="#000"/>
              
              <rect x="50" y="100" width="8" height="8" fill="#000"/>
              <rect x="60" y="100" width="8" height="8" fill="#000"/>
              <rect x="80" y="100" width="8" height="8" fill="#000"/>
              <rect x="100" y="100" width="8" height="8" fill="#000"/>
              <rect x="110" y="100" width="8" height="8" fill="#000"/>
              <rect x="120" y="100" width="8" height="8" fill="#000"/>
              <rect x="130" y="100" width="8" height="8" fill="#000"/>
              
              <rect x="50" y="110" width="8" height="8" fill="#000"/>
              <rect x="70" y="110" width="8" height="8" fill="#000"/>
              <rect x="80" y="110" width="8" height="8" fill="#000"/>
              <rect x="90" y="110" width="8" height="8" fill="#000"/>
              <rect x="110" y="110" width="8" height="8" fill="#000"/>
              <rect x="130" y="110" width="8" height="8" fill="#000"/>
              
              <rect x="50" y="120" width="8" height="8" fill="#000"/>
              <rect x="60" y="120" width="8" height="8" fill="#000"/>
              <rect x="70" y="120" width="8" height="8" fill="#000"/>
              <rect x="80" y="120" width="8" height="8" fill="#000"/>
              <rect x="90" y="120" width="8" height="8" fill="#000"/>
              <rect x="100" y="120" width="8" height="8" fill="#000"/>
              <rect x="120" y="120" width="8" height="8" fill="#000"/>
              <rect x="130" y="120" width="8" height="8" fill="#000"/>
              
              <rect x="50" y="130" width="8" height="8" fill="#000"/>
              <rect x="70" y="130" width="8" height="8" fill="#000"/>
              <rect x="90" y="130" width="8" height="8" fill="#000"/>
              <rect x="110" y="130" width="8" height="8" fill="#000"/>
              <rect x="130" y="130" width="8" height="8" fill="#000"/>
            </svg>
          </div>
          <div class="tips">
            <div class="tip-item">2、将打印的二维码张贴后，用户扫描二维码后可以选择岗位进行投递</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

.breadcrumb-item.active {
  color: #666;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.content-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
}

.section {
  margin-bottom: 40px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.section-content {
  padding-left: 8px;
}

.tips {
  margin-bottom: 24px;
}

.tip-item {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 8px;
}

.qrcode-box {
  display: inline-block;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin: 16px 0;
}

.qrcode-svg {
  width: 150px;
  height: 150px;
}
</style>
