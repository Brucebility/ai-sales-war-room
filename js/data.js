/**
 * AI 销售作战室 - Mock 数据层
 * 所有业务数据集中管理，便于后续替换为真实API
 */

const MOCK_DATA = {
  customer: {
    name: '锐捷科技',
    id: 'CRM-2024-0817-A',
    tag: '高意向 · 待决策',
    meta: 'CRM-2024-0817-A | 企业服务 | 对接人：王总（采购总监）',
    metrics: {
      budget: { value: '30-50万', label: '预算范围', color: 'm-green' },
      timeline: { value: '2个月', label: '期望上线', color: 'm-orange' },
      risk: { value: '高风险', label: 'AI风险评估', color: 'm-red' },
      kpi: { value: '2/5', label: 'KPI占用', color: 'm-blue' }
    }
  },

  riskWarnings: [
    '知识库数据质量未评估（阻塞项）',
    '2/3 类似客户 Demo 失败（67%失败率）',
    'Demo 名额仅剩 2 个（资源瓶颈）'
  ],

  perspectives: {
    sales: {
      role: '销售 · 李明',
      dotColor: 'var(--cyan)',
      stance: '推进 GO',
      stanceClass: 's-go',
      concerns: [
        { icon: '✓', bg: 'var(--glow-g)', color: 'var(--green)', text: '<b>预算明确：</b>30-50万已审批，高价值客户' },
        { icon: '✓', bg: 'var(--glow-g)', color: 'var(--green)', text: '<b>时间紧迫：</b>2个月内上线，犹豫期窗口短' },
        { icon: '✓', bg: 'var(--glow-g)', color: 'var(--green)', text: '<b>配合度高：</b>愿安排客服+IT负责人参会' },
        { icon: '!', bg: 'var(--glow-o)', color: 'var(--orange)', text: '<b>目标压力：</b>本月需推进5个高意向客户' }
      ]
    },
    supervisor: {
      role: '主管 · 张华',
      dotColor: 'var(--orange)',
      stance: '谨慎 CAUTION',
      stanceClass: 's-caution',
      concerns: [
        { icon: '!', bg: 'var(--glow-r)', color: 'var(--red)', text: '<b>准确率敏感：</b>客户特别关注AI准确率，Demo不好直接丢单' },
        { icon: '!', bg: 'var(--glow-r)', color: 'var(--red)', text: '<b>失败率高：</b>3个类似客户中2个因数据质量差失败' },
        { icon: '!', bg: 'var(--glow-o)', color: 'var(--orange)', text: '<b>资源稀缺：</b>仅2个Demo名额，必须用在最有把握的客户' },
        { icon: '!', bg: 'var(--glow-o)', color: 'var(--orange)', text: '<b>品牌风险：</b>丢单影响行业口碑和后续获客' }
      ]
    },
    tech: {
      role: '技术负责人 · 陈工',
      dotColor: 'var(--purple)',
      stance: '暂缓 STOP',
      stanceClass: 's-stop',
      concerns: [
        { icon: '✕', bg: 'var(--glow-r)', color: 'var(--red)', text: '<b>数据未知：</b>知识库数据质量未评估，无法预估准确率' },
        { icon: '✕', bg: 'var(--glow-r)', color: 'var(--red)', text: '<b>承诺困难：</b>2个月上线需先评估→清洗→调优→测试，周期不确定' },
        { icon: '!', bg: 'var(--glow-o)', color: 'var(--orange)', text: '<b>建议前置：</b>先花3-5天做数据质量审计再决定' },
        { icon: '✓', bg: 'var(--glow-g)', color: 'var(--green)', text: '<b>有利条件：</b>客户IT负责人愿参会，可加速评估' }
      ]
    }
  },

  conflictMatrix: [
    { item: '立即安排Demo', sales: { label: '赞成', cls: 's-go' }, supervisor: { label: '反对', cls: 's-caution' }, tech: { label: '反对', cls: 's-stop' } },
    { item: '承诺2月上线', sales: { label: '赞成', cls: 's-go' }, supervisor: { label: '观望', cls: 's-caution' }, tech: { label: '反对', cls: 's-stop' } },
    { item: '优先投入资源', sales: { label: '赞成', cls: 's-go' }, supervisor: { label: '谨慎', cls: 's-caution' }, tech: { label: '谨慎', cls: 's-caution' } },
    { item: '先评估数据', sales: { label: '可接受', cls: 's-caution' }, supervisor: { label: '赞成', cls: 's-go' }, tech: { label: '赞成', cls: 's-go' } }
  ],

  aiScores: [
    { label: '客户价值', value: 85, color: 'var(--green)' },
    { label: '落地风险', value: 72, color: 'var(--red)' },
    { label: '签约概率', value: 45, color: 'var(--orange)' }
  ],

  evidenceChain: [
    {
      title: '证据1：客户预算已审批',
      desc: 'A客户预算30-50万已通过内部审批，中等偏上规模，具备签约价值。',
      sourceLink: { icon: '📁', text: '客户档案库 · CRM-2024-0817-A', sourceId: 'src-customer', factId: 'fact-customer-a' },
      type: ''
    },
    {
      title: '证据2：2/3 类似客户Demo失败',
      desc: '3个类似客户中，2个因知识库数据质量差导致Demo翻车丢单，失败率67%。这是当前最大风险信号。',
      sourceLink: { icon: '📚', text: '历史案例库 · 客户B/C/D', sourceId: 'src-cases', factId: 'fact-case-b' },
      type: 'warning'
    },
    {
      title: '证据3：客户对准确率高度敏感',
      desc: '客户明确将"准确率"列为第一关注点。结合证据2，若数据质量不足，Demo翻车概率极高。',
      sourceLink: { icon: '📁', text: '客户档案库 · 核心关注点', sourceId: 'src-customer', factId: 'fact-customer-a' },
      type: 'warning'
    },
    {
      title: '证据4：知识库数据质量未评估',
      desc: '技术负责人指出知识库数据质量未知，无法承诺2个月上线。这是阻塞项，必须先解决。',
      sourceLink: { icon: '⚙️', text: '内部资源池 · 技术团队排期', sourceId: 'src-resources', factId: 'fact-tech-capacity' },
      type: ''
    },
    {
      title: '证据5：客户配合意愿高',
      desc: '客户愿安排客服负责人和IT负责人参加技术评估会，配合度高，有利于快速完成数据质量评估。',
      sourceLink: { icon: '📁', text: '客户档案库 · 技术评估会', sourceId: 'src-customer', factId: 'fact-customer-a' },
      type: ''
    },
    {
      title: '证据6：Demo名额仅剩2个',
      desc: '技术团队下周仅能支持2场售前Demo。本月需推进5个高意向客户。资源稀缺，必须用在最有把握的场景。',
      sourceLink: { icon: '⚙️', text: '内部资源池 · Demo名额', sourceId: 'src-resources', factId: 'fact-demo-slots' },
      extraLink: { icon: '🎯', text: 'KPI目标库 · 本月目标', sourceId: 'src-kpi', factId: 'fact-kpi-target' },
      type: ''
    },
    {
      title: '⚠ 冲突识别：时间承诺 vs 数据风险',
      desc: '销售希望快速推进（2个月上线），技术认为数据质量未知无法承诺，主管担心Demo翻车。三方在"是否立即安排Demo"上存在直接冲突。',
      sourceLink: { icon: '📚', text: '历史案例库 · AI模式识别', sourceId: 'src-cases', factId: 'fact-pattern' },
      type: 'danger'
    },
    {
      title: '✓ AI结论：前置数据评估 → 条件式推进',
      desc: '建议不立即安排Demo，先3天内完成知识库数据质量审计。若准确率≥85%则安排Demo并承诺2个月上线；若<85%则与客户协商调整为2.5个月（参考客户D成功案例），避免Demo翻车。',
      sourceLink: { icon: '📚', text: '历史案例库 · 客户D成功案例', sourceId: 'src-cases', factId: 'fact-case-d' },
      type: 'conclusion'
    }
  ],

  agentCapabilities: [
    { icon: '🔍', name: '信息感知', desc: '自动采集CRM、历史案例、技术评估、KPI数据' },
    { icon: '⚖️', name: '冲突识别', desc: '识别多方立场冲突，不掩盖分歧' },
    { icon: '🔗', name: '证据推理', desc: '每个判断附带证据链，可回溯事实源' },
    { icon: '📋', name: '行动生成', desc: '自动生成决策建议和可分派行动项' },
    { icon: '⚠️', name: '风险预警', desc: '实时检测风险信号并主动推送' },
    { icon: '🔄', name: '任务流转', desc: '行动项可分派给不同角色，支持状态流转' }
  ],

  roleFocusContent: {
    overview: [
      { dot: 'var(--red)', text: '<b>核心冲突：</b>是否立即安排Demo — 销售赞成，主管和技术反对' },
      { dot: 'var(--orange)', text: '<b>关键瓶颈：</b>知识库数据质量未知 — 技术负责人阻塞项' },
      { dot: 'var(--green)', text: '<b>共识方向：</b>先评估数据再决策 — 三方在此达成一致' },
      { dot: 'var(--blue)', text: '<b>AI建议：</b>3天数据审计 → 条件式推进（准确率≥85%排Demo）' }
    ],
    sales: [
      { dot: 'var(--green)', text: '<b>推进信号：</b>预算30-50万已审批，客户上线意愿强烈' },
      { dot: 'var(--green)', text: '<b>推进信号：</b>客户配合度高，愿意安排IT负责人参会' },
      { dot: 'var(--orange)', text: '<b>注意：</b>本月需推进5个高意向客户，A客户转化概率最高' },
      { dot: 'var(--blue)', text: '<b>AI建议：</b>3天数据审计不影响推进节奏，可同步跟进其他4个客户。避免Demo翻车导致丢单才是最大风险。' }
    ],
    supervisor: [
      { dot: 'var(--red)', text: '<b>风险信号：</b>2/3类似客户Demo失败，失败率67%' },
      { dot: 'var(--red)', text: '<b>风险信号：</b>客户对准确率高度敏感，Demo不好直接丢单' },
      { dot: 'var(--orange)', text: '<b>资源风险：</b>仅2个Demo名额，不可浪费在高风险场景' },
      { dot: 'var(--green)', text: '<b>AI建议：</b>数据审计作为风控前置条件，通过后再排Demo。暂时释放1个Demo名额给低风险客户。' }
    ],
    tech: [
      { dot: 'var(--red)', text: '<b>阻塞项：</b>知识库数据质量未评估，无法预估准确率' },
      { dot: 'var(--red)', text: '<b>阻塞项：</b>2个月上线承诺需数据验证后才能确认' },
      { dot: 'var(--orange)', text: '<b>评估周期：</b>数据审计需3-5天，客户配合度高可压缩至3天' },
      { dot: 'var(--green)', text: '<b>有利条件：</b>客户IT负责人愿参会，可加速评估' },
      { dot: 'var(--blue)', text: '<b>AI建议：</b>准确率≥85%可承诺2个月上线，否则建议2.5个月（参考客户D案例）。' }
    ]
  }
};

const TASK_ROLES = ['销售·李明', '主管·张华', '技术·陈工', '系统自动'];

const TASK_STATUS = {
  labels: { unassigned: '待分派', assigned: '已分派', progress: '进行中', done: '已完成' },
  classes: { unassigned: 'ts-unassigned', assigned: 'ts-assigned', progress: 'ts-progress', done: 'ts-done' },
  flow: { unassigned: 'assigned', assigned: 'progress', progress: 'done', done: 'done' }
};

const ACTIONS = [
  { id: 'a1', num: 1, title: '发起知识库数据质量审计', desc: '技术团队在3天内完成A客户知识库数据质量评估，输出准确率报告。', meta: ['截止：3天内', '前置条件', '来源：AI证据4'], assignee: '', status: 'unassigned' },
  { id: 'a2', num: 2, title: '安排技术评估会（客户参与）', desc: '邀请A客户客服负责人和IT负责人参加技术评估会，同步数据评估结果，确认知识库接入方案。', meta: ['截止：第4天', '客户配合', '来源：AI证据5'], assignee: '', status: 'unassigned' },
  { id: 'a3', num: 3, title: '条件式Demo排期', desc: '若数据准确率≥85%：安排下周Demo（占用1/2名额），承诺2个月上线。若<85%：与客户协商2.5个月上线方案。', meta: ['条件触发', '决策分支', '来源：AI结论'], assignee: '', status: 'unassigned' },
  { id: 'a4', num: 4, title: '同步本月客户推进大盘', desc: '将A客户标记为"数据评估中"状态，暂时移出Demo排期，释放1个Demo名额给已验证客户。', meta: ['立即执行', '资源优化', '来源：AI证据6'], assignee: '', status: 'unassigned' }
];
