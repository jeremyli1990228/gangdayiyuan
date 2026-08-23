import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/my-cases/following',
    name: 'myCasesFollowing',
    component: () => import('../views/my-cases/Following.vue')
  },
  {
    path: '/my-cases/transfer-notice',
    name: 'myCasesTransferNotice',
    component: () => import('../views/my-cases/TransferNotice.vue')
  },
  {
    path: '/my-cases/opinions',
    name: 'myCasesOpinions',
    component: () => import('../views/my-cases/Opinions.vue')
  },
  {
    path: '/my-cases/validity',
    name: 'myCasesValidity',
    component: () => import('../views/my-cases/Validity.vue')
  },
  {
    path: '/my-cases/archive',
    name: 'myCasesArchive',
    component: () => import('../views/my-cases/Archive.vue')
  },
  {
    path: '/my-cases/transferred-out',
    name: 'myCasesTransferredOut',
    component: () => import('../views/my-cases/TransferredOut.vue')
  },
  {
    path: '/my-cases/transferred-in',
    name: 'myCasesTransferredIn',
    component: () => import('../views/my-cases/TransferredIn.vue')
  },
  {
    path: '/my-cases/initiated-transfer',
    name: 'myCasesInitiatedTransfer',
    component: () => import('../views/my-cases/InitiatedTransfer.vue')
  },
  {
    path: '/my-cases/initiated-application',
    name: 'myCasesInitiatedApplication',
    component: () => import('../views/my-cases/InitiatedApplication.vue')
  },
  {
    path: '/my-cases/copy-to-me',
    name: 'myCasesCopyToMe',
    component: () => import('../views/my-cases/CopyToMe.vue')
  },
  {
    path: '/my-cases/my-created',
    name: 'myCasesMyCreated',
    component: () => import('../views/my-cases/MyCreated.vue')
  },
  {
    path: '/my-cases/all',
    name: 'myCasesAll',
    component: () => import('../views/my-cases/All.vue')
  },
  {
    path: '/process-cases/add',
    name: 'processCasesAdd',
    component: () => import('../views/process-cases/Add.vue')
  },
  {
    path: '/process-cases/all',
    name: 'processCasesAll',
    component: () => import('../views/process-cases/All.vue')
  },
  {
    path: '/process-cases/detail/:id?',
    name: 'processCasesDetail',
    component: () => import('../views/process-cases/CaseDetail.vue')
  },
  {
    path: '/process-cases/drafts',
    name: 'processCasesDrafts',
    component: () => import('../views/process-cases/Drafts.vue')
  },
  {
    path: '/report-cases/add',
    name: 'reportCasesAdd',
    component: () => import('../views/report-cases/Add.vue')
  },
  {
    path: '/report-cases/mine',
    name: 'reportCasesMine',
    component: () => import('../views/report-cases/Mine.vue')
  },
  {
    path: '/report-cases/all',
    name: 'reportCasesAll',
    component: () => import('../views/report-cases/All.vue')
  },
  {
    path: '/questionnaire/satisfaction',
    name: 'questionnaireSatisfaction',
    component: () => import('../views/questionnaire/Satisfaction.vue')
  },
  {
    path: '/questionnaire/promotion',
    name: 'questionnairePromotion',
    component: () => import('../views/questionnaire/Promotion.vue')
  },
  {
    path: '/questionnaire/survey-records',
    name: 'questionnaireSurveyRecords',
    component: () => import('../views/questionnaire/SurveyRecords.vue')
  },
  {
    path: '/learning/document-center',
    name: 'learningDocumentCenter',
    component: () => import('../views/learning/DocumentCenter.vue')
  },
  {
    path: '/statistics/case-trend',
    name: 'statisticsCaseTrend',
    component: () => import('../views/statistics/CaseTrend.vue')
  },
  {
    path: '/statistics/case-type-distribution',
    name: 'statisticsCaseTypeDistribution',
    component: () => import('../views/statistics/CaseTypeDistribution.vue')
  },
  {
    path: '/statistics/case-status-distribution',
    name: 'statisticsCaseStatusDistribution',
    component: () => import('../views/statistics/CaseStatusDistribution.vue')
  },
  {
    path: '/statistics/case-feedback-distribution',
    name: 'statisticsCaseFeedbackDistribution',
    component: () => import('../views/statistics/CaseFeedbackDistribution.vue')
  },
  {
    path: '/statistics/workload-statistics',
    name: 'statisticsWorkloadStatistics',
    component: () => import('../views/statistics/WorkloadStatistics.vue')
  },
  {
    path: '/statistics/case-duration',
    name: 'statisticsCaseDuration',
    component: () => import('../views/statistics/CaseDuration.vue')
  },
  {
    path: '/statistics/satisfaction-sample',
    name: 'statisticsSatisfactionSample',
    component: () => import('../views/statistics/SatisfactionSample.vue')
  },
  {
    path: '/statistics/satisfaction-indicators',
    name: 'statisticsSatisfactionIndicators',
    component: () => import('../views/statistics/SatisfactionIndicators.vue')
  },
  {
    path: '/social-work/recruitment-manage',
    name: 'socialWorkRecruitmentManage',
    component: () => import('../views/social-work/RecruitmentManage.vue')
  },
  {
    path: '/social-work/social-worker-manage',
    name: 'socialWorkerManage',
    component: () => import('../views/social-work/SocialWorkerManage.vue')
  },
  {
    path: '/social-work/work-time-manage',
    name: 'socialWorkWorkTimeManage',
    component: () => import('../views/social-work/WorkTimeManage.vue')
  },
  {
    path: '/social-work/recruitment-promotion',
    name: 'socialWorkRecruitmentPromotion',
    component: () => import('../views/social-work/RecruitmentPromotion.vue')
  },
  {
    path: '/contacts/employee-list',
    name: 'contactsEmployeeList',
    component: () => import('../views/contacts/EmployeeList.vue')
  },
  {
    path: '/contacts/employee-group',
    name: 'contactsEmployeeGroup',
    component: () => import('../views/contacts/EmployeeGroup.vue')
  },
  {
    path: '/contacts/organization',
    name: 'contactsOrganization',
    component: () => import('../views/contacts/Organization.vue')
  },
  {
    path: '/contacts/feedback-list',
    name: 'contactsFeedbackList',
    component: () => import('../views/contacts/FeedbackList.vue')
  },
  {
    path: '/contacts/patient-list',
    name: 'contactsPatientList',
    component: () => import('../views/contacts/PatientList.vue')
  },
  {
    path: '/messages/inbox',
    name: 'messagesInbox',
    component: () => import('../views/messages/Inbox.vue')
  },
  {
    path: '/messages/email-records',
    name: 'messagesEmailRecords',
    component: () => import('../views/messages/EmailRecords.vue')
  },
  {
    path: '/messages/sms-records',
    name: 'messagesSmsRecords',
    component: () => import('../views/messages/SmsRecords.vue')
  },
  {
    path: '/messages/system-log',
    name: 'messagesSystemLog',
    component: () => import('../views/messages/SystemLog.vue')
  },
  {
    path: '/settings/public-thesaurus',
    name: 'settingsPublicThesaurus',
    component: () => import('../views/settings/PublicThesaurus.vue')
  },
  {
    path: '/settings/personal-thesaurus',
    name: 'settingsPersonalThesaurus',
    component: () => import('../views/settings/PersonalThesaurus.vue')
  },
  {
    path: '/settings/approval-settings',
    name: 'settingsApprovalSettings',
    component: () => import('../views/settings/ApprovalSettings.vue')
  },
  {
    path: '/settings/feedback-config',
    name: 'settingsFeedbackConfig',
    component: () => import('../views/settings/FeedbackConfig.vue')
  },
  {
    path: '/system-auth/user-manage',
    name: 'systemAuthUserManage',
    component: () => import('../views/system-auth/UserManage.vue')
  },
  {
    path: '/system-auth/role-manage',
    name: 'systemAuthRoleManage',
    component: () => import('../views/system-auth/RoleManage.vue')
  },
  {
    path: '/system-auth/menu-manage',
    name: 'systemAuthMenuManage',
    component: () => import('../views/system-auth/MenuManage.vue')
  },
  {
    path: '/system-manage/log-manage',
    name: 'systemManageLogManage',
    component: () => import('../views/system-manage/LogManage.vue')
  },
  {
    path: '/system-manage/dictionary-manage',
    name: 'systemManageDictionaryManage',
    component: () => import('../views/system-manage/DictionaryManage.vue')
  },
  {
    path: '/system-manage/terminal-manage',
    name: 'systemManageTerminalManage',
    component: () => import('../views/system-manage/TerminalManage.vue')
  },
  {
    path: '/system-manage/key-manage',
    name: 'systemManageKeyManage',
    component: () => import('../views/system-manage/KeyManage.vue')
  },
  {
    path: '/system-manage/token-manage',
    name: 'systemManageTokenManage',
    component: () => import('../views/system-manage/TokenManage.vue')
  },
  {
    path: '/system-manage/dynamic-route',
    name: 'systemManageDynamicRoute',
    component: () => import('../views/system-manage/DynamicRoute.vue')
  },
  // 投诉管理模块
  {
    path: '/complaint/faq',
    name: 'complaintFaq',
    component: () => import('../views/complaint/Faq.vue')
  },
  {
    path: '/complaint/wechat-feedback',
    name: 'complaintWechatFeedback',
    component: () => import('../views/complaint/WechatFeedback.vue')
  },
  {
    path: '/complaint/web-feedback',
    name: 'complaintWebFeedback',
    component: () => import('../views/complaint/WebFeedback.vue')
  },
  {
    path: '/complaint/feedback-manage',
    name: 'complaintFeedbackManage',
    component: () => import('../views/complaint/FeedbackManage.vue')
  },
  {
    path: '/complaint/feedback-type',
    name: 'complaintFeedbackType',
    component: () => import('../views/complaint/FeedbackType.vue')
  },
  {
    path: '/complaint/statistics',
    name: 'complaintStatistics',
    component: () => import('../views/complaint/Statistics.vue')
  },
  {
    path: '/complaint/settings',
    name: 'complaintSettings',
    component: () => import('../views/complaint/Settings.vue')
  },
  {
    path: '/complaint/my-feedback',
    name: 'complaintMyFeedback',
    component: () => import('../views/complaint/MyFeedback.vue')
  },
  // 移动端H5页面
  {
    path: '/h5/home',
    name: 'h5Home',
    component: () => import('../views/h5/Home.vue')
  },
  {
    path: '/h5/complaint/submit',
    name: 'h5ComplaintSubmit',
    component: () => import('../views/h5/ComplaintSubmit.vue')
  },
  {
    path: '/h5/complaint/list',
    name: 'h5ComplaintList',
    component: () => import('../views/h5/ComplaintList.vue')
  },
  {
    path: '/h5/complaint/detail/:id',
    name: 'h5ComplaintDetail',
    component: () => import('../views/h5/ComplaintDetail.vue')
  },
  {
    path: '/h5/faq',
    name: 'h5Faq',
    component: () => import('../views/h5/Faq.vue')
  },
  {
    path: '/h5/satisfaction',
    name: 'h5Satisfaction',
    component: () => import('../views/h5/Satisfaction.vue')
  },
  {
    path: '/h5/profile',
    name: 'h5Profile',
    component: () => import('../views/h5/Profile.vue')
  },
  // 个人备忘录
  {
    path: '/memo',
    name: 'memo',
    component: () => import('../views/memo/Index.vue')
  },
  // 涉及环节管理
  {
    path: '/process-cases/link-management',
    name: 'processCasesLinkManagement',
    component: () => import('../views/process-cases/LinkManagement.vue')
  },
  // 原因管理
  {
    path: '/process-cases/reason-management',
    name: 'processCasesReasonManagement',
    component: () => import('../views/process-cases/ReasonManagement.vue')
  },
  // 案件字段配置
  {
    path: '/process-cases/field-management',
    name: 'processCasesFieldManagement',
    component: () => import('../views/process-cases/FieldManagement.vue')
  },
  // 满意度调查看板
  {
    path: '/statistics/satisfaction-dashboard',
    name: 'statisticsSatisfactionDashboard',
    component: () => import('../views/complaint/SatisfactionDashboard.vue')
  },
  // 案件统计看板
  {
    path: '/statistics/complaint-dashboard',
    name: 'statisticsComplaintDashboard',
    component: () => import('../views/complaint/ComplaintStatisticsDashboard.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
