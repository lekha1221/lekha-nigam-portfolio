const state = {
  tab: "leads",
  meta: null,
  problemStatus: "active",
  selectedLead: null,
  selectedOwner: null,
  selectedExec: "",
};

const $ = (id) => document.getElementById(id);

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function stamp(text, extra) {
  if (!text) return "";
  const cls = String(text).toLowerCase().replace(/\s+/g, "_");
  return `<span class="stamp ${cls} ${extra || ""}">${escapeHtml(text)}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function n(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return num.toLocaleString("en-IN");
}

function checkedValues(rootId) {
  return [...document.querySelectorAll(`#${rootId} input:checked`)].map((el) => el.value);
}

function filterParams(extra = {}) {
  const params = new URLSearchParams();
  const start = $("start").value;
  const end = $("end").value;
  if (start) params.set("start", start);
  if (end) params.set("end", end);
  if ($("red").checked) params.set("red", "true");
  const flat = $("flat").value.trim();
  if (flat) params.set("flat", flat);
  for (const value of checkedValues("milestones")) params.append("milestone", value);
  for (const value of checkedValues("statuses")) params.append("thread_status", value);
  for (const value of checkedValues("issue-statuses")) params.append("issue_status", value);
  for (const value of checkedValues("awaiting")) params.append("awaiting", value);
  for (const [key, value] of Object.entries(extra)) {
    if (value == null || value === "") continue;
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, item);
    } else {
      params.set(key, value);
    }
  }
  return params;
}

async function getJson(path) {
  const res = await fetch(path);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.detail;
    const message =
      typeof detail === "string"
        ? detail
        : detail?.build_hint
          ? detail.build_hint
          : res.statusText;
    throw new Error(message || `Request failed (${res.status})`);
  }
  return data;
}

function setStatus(text) {
  $("status").textContent = text || "";
}

function fillChecks(id, options) {
  const root = $(id);
  root.innerHTML = (options || [])
    .map(
      (opt) =>
        `<label><input type="checkbox" value="${escapeHtml(opt)}" /> ${escapeHtml(opt)}</label>`
    )
    .join("");
}

function kpis(pairs) {
  return pairs
    .map(
      ([label, value]) =>
        `<div class="kpi"><span class="label">${escapeHtml(label)}</span><span class="value">${value}</span></div>`
    )
    .join("");
}

function table(columns, rows, { selectedKey, rowKey } = {}) {
  if (!rows.length) return `<p class="empty">Nothing in this window.</p>`;
  const head = columns.map((col) => `<th>${escapeHtml(col.label)}</th>`).join("");
  const body = rows
    .map((row, index) => {
      const key = rowKey ? rowKey(row) : String(index);
      const selected = selectedKey && key === selectedKey ? ' aria-selected="true"' : "";
      const cells = columns
        .map((col) => `<td>${col.render ? col.render(row) : escapeHtml(row[col.key] ?? "")}</td>`)
        .join("");
      return `<tr tabindex="0" data-key="${escapeHtml(key)}"${selected}>${cells}</tr>`;
    })
    .join("");
  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function bindRowClicks(root, onPick) {
  root.querySelectorAll("tbody tr").forEach((tr) => {
    const pick = () => onPick(tr.dataset.key);
    tr.addEventListener("click", pick);
    tr.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        pick();
      }
    });
  });
}

function analysisHtml(thread) {
  const blocks = [];
  if (thread.conversation_flow) {
    blocks.push(`<p class="cap">Conversation</p><p>${escapeHtml(thread.conversation_flow)}</p>`);
  }
  if (thread.actual_issue) {
    blocks.push(`<p class="cap">Actual issue</p><p>${escapeHtml(thread.actual_issue)}</p>`);
  }
  if (thread.issue_category && thread.issue_category !== "Other") {
    blocks.push(`<p class="cap">Issue category</p><p>${escapeHtml(thread.issue_category)}</p>`);
  }
  if (thread.customer_request) {
    blocks.push(`<p class="cap">Customer request</p><p>${escapeHtml(thread.customer_request)}</p>`);
  }
  if (thread.issue_evidence) {
    blocks.push(`<p class="cap">Issue evidence</p><p>${escapeHtml(thread.issue_evidence)}</p>`);
  }
  if (thread.issue_status) {
    const cls = thread.issue_status === "CLOSED" ? "ok" : "warn";
    blocks.push(
      `<p class="cap">Status</p><p class="${cls}">${stamp(thread.issue_status)} ${escapeHtml(thread.issue_status_reason || "")}</p>`
    );
  }
  if (thread.resolution_summary) {
    blocks.push(`<p class="cap">Resolution</p><p>${escapeHtml(thread.resolution_summary)}</p>`);
  }
  if (thread.resolution_source) {
    blocks.push(`<p class="cap">Resolution source</p><p>${escapeHtml(thread.resolution_source)}</p>`);
  }
  if (thread.issue_resolution_match) {
    blocks.push(`<p class="cap">Issue–resolution match</p><p>${escapeHtml(thread.issue_resolution_match)}</p>`);
  }
  if (thread.resolution_evidence) {
    blocks.push(`<p class="cap">Resolution evidence</p><p>${escapeHtml(thread.resolution_evidence)}</p>`);
  } else if (thread.issue_status === "OPEN") {
    blocks.push(`<p class="cap">Resolution evidence</p><p>none</p>`);
  }
  if (thread.awaiting_on) {
    blocks.push(`<p class="cap">Awaiting on</p><p>${escapeHtml(thread.awaiting_on)}</p>`);
  }
  if (thread.customer_confirmed_resolution) {
    blocks.push(
      `<p class="cap">Customer confirmation</p><p>${escapeHtml(thread.customer_confirmed_resolution)}</p>`
    );
  }
  if (thread.problem_labels) {
    blocks.push(`<p class="cap">Problem tags</p><p>${escapeHtml(thread.problem_labels)}</p>`);
  }
  if (thread.last_customer_summary) {
    blocks.push(`<p class="cap">Last customer message</p><p>${escapeHtml(thread.last_customer_summary)}</p>`);
  }
  if (thread.last_team_summary) {
    blocks.push(`<p class="cap">Last team response</p><p>${escapeHtml(thread.last_team_summary)}</p>`);
  }
  if ((thread.issues || []).length) {
    blocks.push(
      thread.issues
        .map(
          (issue) =>
            `<p class="cap">${escapeHtml(issue.issue_id)} · ${escapeHtml(issue.issue_status)}</p><p>${escapeHtml(issue.actual_issue)}</p>`
        )
        .join("")
    );
  }
  return `<div class="analysis"><h3>Thread</h3>${blocks.join("")}</div>`;
}

function spineHtml(threads) {
  if (!threads.length) return `<p class="empty">No correspondence in this window.</p>`;
  return `<div class="spine">${threads
    .map((thread, index) => {
      const title = `Conversation ${index + 1} · ${thread.milestone || "No milestone"} · ${thread.issue_status || thread.status || ""} · ${fmtDate(thread.latest_activity)}`;
      const mails = (thread.mails || [])
        .map((mail) => {
          const way = (mail.direction || "").includes("Owner →")
            ? "in"
            : (mail.direction || "").includes("CRM →")
              ? "out"
              : "other";
          return `<article class="mail ${way}">
            <header>
              <time datetime="${escapeHtml(mail.datetime || "")}">${fmtDateTime(mail.datetime)}</time>
              <span class="dir">${escapeHtml(mail.direction)}</span>
              ${mail.problem_mail ? `<span class="dir">problem mail</span>` : ""}
            </header>
            <p>${escapeHtml(mail.summary)}</p>
            ${mail.evidence ? `<p class="meta">Evidence · ${escapeHtml(mail.evidence)}</p>` : ""}
            ${mail.response_delay_hours != null ? `<p class="meta">CRM response gap · ${mail.response_delay_hours} hours</p>` : ""}
          </article>`;
        })
        .join("");
      const log = mails
        ? `<div class="mail-log"><h3>Mails</h3>${mails}</div>`
        : `<p class="empty">No mail summaries in the filtered period for this thread.</p>`;
      return `<details>
        <summary>${escapeHtml(title)} ${thread.issue_status ? stamp(thread.issue_status) : ""}</summary>
        ${analysisHtml(thread)}
        ${log}
      </details>`;
    })
    .join("")}</div>`;
}

function ownerDrillHtml(data) {
  const metrics = [
    ["Ownership ID", data.ownership_id],
    ["Unit", data.flat],
    ["Executive", data.executive],
    ["Threads", n(data.threads_count)],
    ["Unpaid milestones", n(data.unpaid_milestones)],
    ["Paid late", n(data.paid_late)],
    ["Risk", data.risk],
    ["Experience", data.experience],
  ]
    .map(
      ([label, value]) =>
        `<div class="metric"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(String(value ?? "—"))}</dd></div>`
    )
    .join("");
  const timeline = table(
    [
      { key: "date", label: "Date", render: (row) => escapeHtml(fmtDateTime(row.date)) },
      { key: "event", label: "Event" },
      { key: "amount", label: "Amount" },
      { key: "milestone", label: "Milestone" },
      {
        key: "payment_after_days",
        label: "Payment after days",
        render: (row) => {
          const days = Number(row.payment_after_days);
          return Number.isFinite(days) ? String(Math.round(days)) : "";
        },
      },
      {
        key: "payment_status",
        label: "Payment status",
        render: (row) => (row.payment_status ? stamp(row.payment_status) : ""),
      },
    ],
    data.timeline || []
  );
  const payments = table(
    [
      { key: "txn_date", label: "Txn date", render: (row) => escapeHtml(fmtDate(row.txn_date)) },
      { key: "status", label: "Status" },
      { key: "amount", label: "Amount" },
      { key: "milestone", label: "Milestone" },
      { key: "towards", label: "Towards" },
      { key: "partial", label: "Partial", render: (row) => (row.partial ? "Yes" : "") },
    ],
    data.payments || []
  );
  return `
    <dl class="metrics">${metrics}</dl>
    ${data.risk_reasons ? `<p class="note">Risk reasons: ${escapeHtml(data.risk_reasons)}</p>` : ""}
    ${data.experience_reasons ? `<p class="note">Experience: ${escapeHtml(data.experience_reasons)} (${escapeHtml(data.experience_confidence || "")})</p>` : ""}
    ${data.active_problem_labels ? `<p class="warn">Active problems: ${escapeHtml(data.active_problem_labels)}</p>` : ""}
    <h2>Conversations</h2>
    ${spineHtml(data.threads || [])}
    <h2>Demand and payment timeline</h2>
    ${data.unpaid_count ? `<p class="warn">${data.unpaid_count} milestone(s) have no payment receipt after the first demand.</p>` : ""}
    ${data.late_count ? `<p class="note">${data.late_count} milestone(s) were paid more than ${data.threshold_days} days after the first demand.</p>` : ""}
    ${timeline}
    <h2>CRM payments made</h2>
    <p class="note">Live credited CRM collection logs in the selected activity period. Bank mode, source, and reference numbers are omitted.</p>
    ${payments}
  `;
}

function bars(rows, labelKey, valueKey) {
  if (!rows.length) return `<p class="empty">No series to plot.</p>`;
  const max = Math.max(...rows.map((row) => Number(row[valueKey]) || 0), 1);
  return rows
    .map((row) => {
      const value = Number(row[valueKey]) || 0;
      const pct = Math.round((value / max) * 100);
      return `<div class="bar-row"><span>${escapeHtml(row[labelKey] || "—")}</span><div class="track"><div class="fill" style="width:${pct}%"></div></div><span class="n">${escapeHtml(String(value))}</span></div>`;
    })
    .join("");
}

async function loadMeta() {
  const meta = await getJson("/api/meta");
  if (!meta.ready) {
    $("app").hidden = true;
    $("missing").hidden = false;
    $("build-hint").textContent = meta.build_hint || "uv run python build.py";
    return false;
  }
  state.meta = meta;
  $("missing").hidden = true;
  $("app").hidden = false;
  $("rev").textContent = fmtDateTime(meta.as_of);
  $("mail-count").textContent = n(meta.canonical_messages);
  $("owner-count").textContent = n(meta.owners);
  $("start").min = meta.date_min;
  $("start").max = meta.date_max;
  $("end").min = meta.date_min;
  $("end").max = meta.date_max;
  $("start").value = meta.date_min;
  $("end").value = meta.date_max;
  fillChecks("milestones", meta.milestones);
  fillChecks("statuses", meta.statuses);
  fillChecks("issue-statuses", meta.issue_statuses);
  fillChecks("awaiting", meta.awaiting);
  $("exp-bands").innerHTML =
    `<option value="">All bands</option>` +
    (meta.experience_bands || [])
      .map((band) => `<option value="${escapeHtml(band)}">${escapeHtml(band)}</option>`)
      .join("");
  if (meta.missing_executive_rows) {
    $("banner").hidden = false;
    $("banner").textContent = `${n(meta.missing_executive_rows)} mail row(s) have no executive assignment.`;
  }
  return true;
}

async function loadLeads() {
  setStatus("Plotting leads…");
  const data = await getJson(`/api/leads?${filterParams({ problem_status: state.problemStatus })}`);
  $("leads-kpis").innerHTML = kpis([
    ["Issues", n(data.kpis.issues)],
    ["Open", n(data.kpis.open)],
    ["Partial", n(data.kpis.partial)],
    ["Closed", n(data.kpis.closed)],
  ]);
  const selected = state.selectedLead
    ? `${state.selectedLead.ownership_id}|${state.selectedLead.flat}`
    : "";
  $("leads-table").innerHTML = table(
    [
      { key: "ownership_id", label: "Ownership ID" },
      { key: "flat", label: "Unit" },
      { key: "executive", label: "Executive" },
      { key: "problem_category", label: "Category" },
      { key: "evidence", label: "Evidence" },
      { key: "actual_issue", label: "Actual issue" },
      {
        key: "issue_status",
        label: "Issue status",
        render: (row) => stamp(row.issue_status),
      },
      { key: "problem", label: "Problem" },
      { key: "thread_count", label: "Threads" },
      { key: "latest_activity", label: "Latest", render: (row) => escapeHtml(fmtDate(row.latest_activity)) },
      { key: "latest_mail_summary", label: "Latest mail" },
    ],
    data.rows,
    { selectedKey: selected, rowKey: (row) => `${row.ownership_id}|${row.flat}` }
  );
  bindRowClicks($("leads-table"), async (key) => {
    const [ownership_id, ...rest] = key.split("|");
    const owner_flat = rest.join("|");
    state.selectedLead = { ownership_id, flat: owner_flat };
    await loadLeadDetail();
  });
  setStatus(`${n(data.count)} leads`);
  if (state.selectedLead) await loadLeadDetail();
}

async function loadLeadDetail() {
  if (!state.selectedLead) {
    $("leads-drill").innerHTML = `<p class="empty">Select a lead to open the correspondence.</p>`;
    return;
  }
  setStatus("Opening correspondence…");
  const data = await getJson(
    `/api/leads/detail?${filterParams({
      problem_status: state.problemStatus,
      ownership_id: state.selectedLead.ownership_id,
      owner_flat: state.selectedLead.flat,
    })}`
  );
  $("leads-drill").innerHTML = `
    <dl class="metrics">
      <div class="metric"><dt>Ownership ID</dt><dd>${escapeHtml(data.ownership_id)}</dd></div>
      <div class="metric"><dt>Unit</dt><dd>${escapeHtml(data.flat)}</dd></div>
      <div class="metric"><dt>Executive</dt><dd>${escapeHtml(data.executive)}</dd></div>
      <div class="metric"><dt>Threads</dt><dd>${n(data.thread_count)}</dd></div>
    </dl>
    ${data.problem_category ? `<p class="cap">Problem category</p><p>${escapeHtml(data.problem_category)}</p>` : ""}
    ${data.evidence ? `<p class="cap">Evidence</p><p>${escapeHtml(data.evidence)}</p>` : ""}
    <p class="cap">Actual issue</p><p>${escapeHtml(data.actual_issue)}</p>
    <p>${stamp(data.issue_status)}</p>
    <p class="cap">Problem tags</p><p>${escapeHtml(data.problem)}</p>
    <details><summary class="cap">Latest mail summary (secondary)</summary><p>${escapeHtml(data.latest_mail_summary)}</p></details>
    <h2>Conversations</h2>
    ${spineHtml(data.threads || [])}
  `;
  setStatus("");
}

async function loadIntel() {
  setStatus("Scoring units…");
  const band = $("exp-bands").value;
  const extra = band ? { experience_band: [band] } : {};
  const data = await getJson(`/api/intelligence?${filterParams(extra)}`);
  if (!data.ready) {
    $("intel-kpis").innerHTML = "";
    $("intel-experience").innerHTML = `<p class="empty">Owner intelligence not in this build. ${escapeHtml(data.hint || "")}</p>`;
    setStatus("");
    return;
  }
  $("intel-kpis").innerHTML = kpis([
    ["Red", n(data.kpis.red)],
    ["Amber", n(data.kpis.amber)],
    ["Green", n(data.kpis.green)],
    ["Units", n(data.kpis.owner_flats)],
    ["Legacy open", n(data.kpis.legacy_open)],
  ]);
  $("exp-kpis").innerHTML = kpis([
    ["Happy", n(data.kpis.happy)],
    ["Neutral", n(data.kpis.neutral)],
    ["Unhappy", n(data.kpis.unhappy)],
    ["At Risk", n(data.kpis.at_risk)],
    ["Insufficient", n(data.kpis.insufficient)],
  ]);
  const pickKey = state.selectedOwner
    ? state.selectedOwner.owner_key || `${state.selectedOwner.ownership_id}|${state.selectedOwner.flat}`
    : "";
  const waiting = Object.fromEntries((data.attention || []).map((row) => [row.owner_key, row]));
  const rows = (data.experience || [])
    .map((row) => {
      const att = waiting[row.owner_key] || {};
      return {
        ...row,
        current_unanswered: att.current_unanswered ?? 0,
        followups_in_seq: att.followups_in_seq ?? "",
        longest_wait_hours: att.longest_wait_hours ?? "",
        historical_unanswered: att.historical_unanswered ?? "",
      };
    })
    .sort(
      (a, b) =>
        Number(b.current_unanswered || 0) - Number(a.current_unanswered || 0) ||
        Number(b.score || 0) - Number(a.score || 0)
    );
  $("intel-experience").innerHTML = table(
    [
      { key: "ownership_id", label: "Ownership ID" },
      { key: "flat", label: "Unit" },
      { key: "executive", label: "Executive" },
      { key: "experience", label: "Experience", render: (row) => stamp(row.experience) },
      { key: "score", label: "Score" },
      { key: "risk", label: "Risk", render: (row) => stamp(row.risk) },
      { key: "current_unanswered", label: "Unanswered" },
      { key: "followups_in_seq", label: "Follow-ups" },
      { key: "longest_wait_hours", label: "Longest wait (hrs)" },
      { key: "historical_unanswered", label: "Historical unanswered" },
      { key: "reasons", label: "Reasons" },
    ],
    rows,
    { selectedKey: pickKey, rowKey: (row) => row.owner_key }
  );
  bindRowClicks($("intel-experience"), async (owner_key) => {
    state.selectedOwner = { owner_key };
    await loadOwnerDrill($("intel-drill"));
  });
  setStatus(`${n(rows.length)} units`);
  if (state.selectedOwner) await loadOwnerDrill($("intel-drill"));
  else $("intel-drill").innerHTML = `<p class="empty">Select a unit to open conversations and mails.</p>`;
}

async function loadOwnerDrill(target) {
  if (!state.selectedOwner) return;
  setStatus("Opening unit…");
  const extra = state.selectedOwner.owner_key
    ? { owner_key: state.selectedOwner.owner_key }
    : { ownership_id: state.selectedOwner.ownership_id, owner_flat: state.selectedOwner.flat };
  const data = await getJson(`/api/owner?${filterParams(extra)}`);
  target.innerHTML = ownerDrillHtml(data);
  setStatus("");
}

async function loadOwners() {
  setStatus("Looking up units…");
  const data = await getJson(`/api/owners?${filterParams({ q: $("owner-q").value.trim() })}`);
  const selected = state.selectedOwner?.owner_key || "";
  $("owners-table").innerHTML = table(
    [
      { key: "ownership_id", label: "Ownership ID" },
      { key: "flat", label: "Unit" },
      { key: "executive", label: "Executive" },
      { key: "problem", label: "Problem" },
      { key: "risk", label: "Risk", render: (row) => stamp(row.risk) },
      { key: "experience", label: "Experience", render: (row) => stamp(row.experience) },
      { key: "latest_activity", label: "Latest", render: (row) => escapeHtml(fmtDate(row.latest_activity)) },
    ],
    data.rows,
    { selectedKey: selected, rowKey: (row) => row.owner_key }
  );
  bindRowClicks($("owners-table"), async (owner_key) => {
    state.selectedOwner = { owner_key };
    await loadOwnerDrill($("owners-drill"));
  });
  setStatus(`${n(data.count)} units`);
  if (state.selectedOwner) await loadOwnerDrill($("owners-drill"));
  else $("owners-drill").innerHTML = `<p class="empty">Select a unit to open conversations.</p>`;
}

async function loadDesk() {
  setStatus("Measuring the desk…");
  const data = await getJson(`/api/executives?${filterParams()}`);
  $("desk-kpis").innerHTML = kpis([
    ["CRM replies", n(data.pulse.crm_replies)],
    ["Threads replied to", n(data.pulse.threads_replied_to)],
    ["Avg reply", data.pulse.avg_reply_hours == null ? "—" : `${data.pulse.avg_reply_hours} hrs`],
    ["SLA met", data.pulse.sla_met == null ? "—" : `${data.pulse.sla_met}%`],
    ["Awaiting CRM", n(data.pulse.awaiting_crm)],
  ]);
  $("desk-note").textContent =
    `${data.attribution_note} Reply SLA target: ${data.sla_hours} hours from owner mail to next CRM reply.`;
  $("desk-table").innerHTML = table(
    [
      { key: "Executive", label: "Executive" },
      { key: "Owners (current)", label: "Owners" },
      { key: "Threads (current)", label: "Threads" },
      { key: "CRM replies (event)", label: "CRM replies" },
      { key: "Threads replied to (event)", label: "Threads replied" },
      { key: "Owner mails answered (event)", label: "Mails answered" },
      { key: "Avg reply (hrs, event)", label: "Avg hrs" },
      { key: "Median reply (hrs, event)", label: "Median hrs" },
      { key: "SLA met % (event)", label: "SLA %" },
      { key: "Awaiting CRM (current)", label: "Awaiting" },
    ],
    data.comparison || []
  );
  $("desk-bars").innerHTML = bars(
    (data.comparison || []).map((row) => ({
      label: row.Executive,
      value: row["CRM replies (event)"],
    })),
    "label",
    "value"
  );
  const grouped = {};
  for (const row of data.problems_by_milestone || []) {
    const key = row.milestone || "No milestone";
    grouped[key] = (grouped[key] || 0) + Number(row.cases || 0);
  }
  $("desk-milestones").innerHTML = bars(
    Object.entries(grouped).map(([label, value]) => ({ label, value })),
    "label",
    "value"
  );
  const execs = data.executives || [];
  if (!state.selectedExec) state.selectedExec = execs[0] || "";
  $("desk-exec").innerHTML = execs
    .map(
      (name) =>
        `<option value="${escapeHtml(name)}" ${name === state.selectedExec ? "selected" : ""}>${escapeHtml(name)}</option>`
    )
    .join("");
  if (state.selectedExec) await loadExecDetail();
  setStatus("");
}

async function loadExecDetail() {
  if (!state.selectedExec) {
    $("desk-drill").innerHTML = "";
    return;
  }
  const data = await getJson(
    `/api/executives/detail?${filterParams({ executive: state.selectedExec })}`
  );
  $("desk-drill").innerHTML = table(
    [
      { key: "Milestone", label: "Milestone" },
      { key: "Latest activity", label: "Latest", render: (row) => escapeHtml(fmtDate(row["Latest activity"])) },
      { key: "Status", label: "Status" },
      { key: "Awaiting CRM", label: "Awaiting CRM", render: (row) => (row["Awaiting CRM"] ? "Yes" : "") },
      { key: "Max reply (hrs)", label: "Max reply (hrs)" },
      { key: "CRM replies", label: "CRM replies" },
      { key: "Problems", label: "Problems" },
      { key: "Mails", label: "Mails" },
    ],
    data.rows || []
  );
}

async function loadTab() {
  try {
    if (state.tab === "leads") await loadLeads();
    else if (state.tab === "intel") await loadIntel();
    else if (state.tab === "owners") await loadOwners();
    else await loadDesk();
  } catch (err) {
    setStatus(err.message || "Could not load this sheet.");
  }
}

function showTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".layers button").forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.tab === tab));
  });
  document.querySelectorAll(".layer").forEach((section) => {
    section.hidden = section.dataset.layer !== tab;
  });
  loadTab();
}

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function bind() {
  document.querySelectorAll(".layers button").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
  document.querySelectorAll("[data-problem]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.problemStatus = btn.dataset.problem;
      document.querySelectorAll("[data-problem]").forEach((other) => {
        other.setAttribute("aria-pressed", String(other === btn));
      });
      state.selectedLead = null;
      loadLeads();
    });
  });
  $("filters").addEventListener("change", () => loadTab());
  $("flat").addEventListener("input", debounce(() => loadTab(), 280));
  $("owner-q").addEventListener("input", debounce(() => loadOwners(), 280));
  $("exp-bands").addEventListener("change", () => loadIntel());
  $("desk-exec").addEventListener("change", () => {
    state.selectedExec = $("desk-exec").value;
    loadExecDetail();
  });
}

async function boot() {
  bind();
  try {
    const ok = await loadMeta();
    if (ok) await loadTab();
  } catch (err) {
    $("app").hidden = true;
    $("missing").hidden = false;
    $("missing-title").textContent = "Could not reach the API.";
    $("build-hint").textContent = err.message || "Is uvicorn running on port 8000?";
  }
}

boot();
