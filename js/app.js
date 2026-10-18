/**
 * AI 销售作战室 - 应用逻辑层
 */

// ===== Clock =====
function updateTime() {
  const n = new Date();
  document.getElementById('clock').textContent =
    `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`;
}

// ===== Fact Source Toggle =====
function toggleSource(headEl) {
  const src = headEl.closest('.fact-source');
  src.classList.toggle('open');
}

// ===== Evidence Jump (回溯事实源) =====
function jumpToFact(sourceId, factId) {
  const source = document.getElementById(sourceId);
  if (!source) return;
  source.classList.add('open');
  document.querySelectorAll('.fact-item.highlighted').forEach(el => el.classList.remove('highlighted'));
  setTimeout(() => {
    const fact = document.getElementById(factId);
    if (fact) {
      fact.classList.add('highlighted');
      fact.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast('已跳转至事实源：' + (fact.querySelector('.fi-label')?.textContent || ''));
    }
  }, 100);
}

// ===== Perspective Toggle =====
function togglePersp(card) {
  card.classList.toggle('exp');
}

// ===== Role Switching (角色视图切换) =====
function switchRole(role) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.toggle('active', b.dataset.role === role));

  const sales = document.getElementById('persp-sales');
  const sup = document.getElementById('persp-supervisor');
  const tech = document.getElementById('persp-tech');
  [sales, sup, tech].forEach(c => { c.classList.remove('dimmed', 'hl'); });

  const focus = document.getElementById('role-focus');

  if (role === 'overview') {
    [sales, sup, tech].forEach(c => { c.classList.remove('dimmed', 'hl'); c.classList.add('exp'); });
  } else if (role === 'sales') {
    sales.classList.add('hl', 'exp'); sup.classList.add('dimmed'); tech.classList.add('dimmed');
    showToast('已切换至销售视角：聚焦客户价值与推进节奏');
  } else if (role === 'supervisor') {
    sup.classList.add('hl', 'exp'); sales.classList.add('dimmed'); tech.classList.add('dimmed');
    showToast('已切换至主管视角：聚焦风险控制与资源分配');
  } else if (role === 'tech') {
    tech.classList.add('hl', 'exp'); sales.classList.add('dimmed'); sup.classList.add('dimmed');
    showToast('已切换至技术负责人视角：聚焦数据质量与可行性');
  }

  const items = MOCK_DATA.roleFocusContent[role] || [];
  focus.innerHTML = items.map(item =>
    `<div class="rf-item"><div class="rf-dot" style="background:${item.dot}"></div><div>${item.text}</div></div>`
  ).join('');

  focus.classList.remove('fade-in');
  void focus.offsetWidth;
  focus.classList.add('fade-in');
}

// ===== Action Items / Task Flow (任务渲染与流转) =====
function renderActions() {
  const list = document.getElementById('action-list');
  list.innerHTML = ACTIONS.map(a => `
    <div class="action-item" id="action-${a.id}">
      <div class="action-num">${a.num}</div>
      <div class="action-content">
        <div class="action-title">${a.title}</div>
        <div class="action-desc">${a.desc}</div>
        <div class="action-meta">${a.meta.map(m => `<span>${m}</span>`).join('')}</div>
      </div>
      <div class="task-assign">
        <select class="task-select" onchange="assignTask('${a.id}',this.value)" ${a.status !== 'unassigned' ? 'disabled' : ''}>
          <option value="">分派给...</option>
          ${TASK_ROLES.map(r => `<option value="${r}" ${a.assignee === r ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
        <span class="task-status ${TASK_STATUS.classes[a.status]}" id="status-${a.id}">${TASK_STATUS.labels[a.status]}</span>
        <button class="task-btn" onclick="advanceTask('${a.id}')" id="btn-${a.id}" ${a.status === 'unassigned' || a.status === 'done' ? 'disabled' : ''}>
          ${a.status === 'unassigned' ? '待分派' : a.status === 'done' ? '已完成' : '推进 →'}
        </button>
      </div>
    </div>
  `).join('');
}

function assignTask(id, role) {
  const a = ACTIONS.find(x => x.id === id);
  if (!a || !role) return;
  a.assignee = role;
  if (a.status === 'unassigned') { a.status = 'assigned'; }
  renderActions();
  showToast(`任务"${a.title}"已分派给 ${role}`);
}

function advanceTask(id) {
  const a = ACTIONS.find(x => x.id === id);
  if (!a) return;
  a.status = TASK_STATUS.flow[a.status];
  renderActions();
  if (a.status === 'done') {
    showToast(`任务"${a.title}"已完成 ✓`);
  } else {
    showToast(`任务"${a.title}"状态更新为：${TASK_STATUS.labels[a.status]}`);
  }
}

// ===== Toast =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== Init =====
function init() {
  updateTime();
  setInterval(updateTime, 1000);
  renderActions();
}

document.addEventListener('DOMContentLoaded', init);
