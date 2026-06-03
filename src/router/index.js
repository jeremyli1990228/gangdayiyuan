import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
