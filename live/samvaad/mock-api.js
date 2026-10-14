/* Public demo API. Synthetic LOFT-style units. No real CRM mail. */
const UNITS = [
  {
    owner_key: "own-1042|A-1204",
    ownership_id: "OWN-1042",
    flat: "A-1204",
    executive: "Desk A",
    red: true,
    risk: "Red",
    experience: "Unhappy",
    score: 31,
    confidence: "high",
    reasons: "Open snag plus 46h unanswered wait",
    current_unanswered: 2,
    followups_in_seq: 3,
    longest_wait_hours: 46,
    historical_unanswered: 1,
    problem: "Snag, Water seepage",
    problem_category: "Quality",
    issue_status: "OPEN",
    problem_status: "active",
    latest_activity: "2026-03-18T11:20:00",
    latest_mail_summary: "Owner sent photos of seepage in the guest bath",
    actual_issue: "Recurring seepage in guest bathroom after second snag visit",
    evidence: "Two owner mails with photos; no closure mail",
    milestone: "Possession",
    thread_status: "Open",
    awaiting: "CRM",
    thread_count: 2,
    unpaid_milestones: 0,
    paid_late: 1,
    threads: [
      {
        milestone: "Possession",
        latest_activity: "2026-03-18T11:20:00",
        issue_status: "OPEN",
        status: "Open",
        conversation_flow: "Owner reported seepage → CRM promised a visit → owner followed up twice",
        actual_issue: "Recurring seepage in guest bathroom after second snag visit",
        issue_category: "Quality",
        customer_request: "Fix the leak and confirm in writing",
        issue_evidence: "Photos attached on 12 Mar and 18 Mar",
        issue_status_reason: "No matched resolution mail",
        awaiting_on: "CRM",
        problem_labels: "Snag, Water seepage",
        last_customer_summary: "Sharing a fresh photo. The wall is still wet.",
        last_team_summary: "Raised to snag desk. Visit scheduled.",
        mails: [
          {
            datetime: "2026-03-12T09:10:00",
            direction: "Owner → CRM",
            summary: "Guest bath wall is damp again after the last snag visit.",
            evidence: "Photo of wet wall",
            problem_mail: true,
            response_delay_hours: 6.5,
          },
          {
            datetime: "2026-03-12T15:40:00",
            direction: "CRM → Owner",
            summary: "Logged as SNAG-441. Vendor visit this week.",
            problem_mail: false,
            response_delay_hours: null,
          },
          {
            datetime: "2026-03-18T11:20:00",
            direction: "Owner → CRM",
            summary: "Visit happened. Wall is still wet. Please reopen.",
            evidence: "Second photo",
            problem_mail: true,
            response_delay_hours: 46,
          },
        ],
      },
    ],
    timeline: [
      {
        date: "2025-11-02T10:00:00",
        event: "Demand",
        amount: "₹2,40,000",
        milestone: "Possession",
        payment_after_days: 18,
        payment_status: "Paid late",
      },
    ],
    payments: [
      {
        txn_date: "2025-11-20",
        status: "Credited",
        amount: "₹2,40,000",
        milestone: "Possession",
        towards: "Possession",
        partial: false,
      },
    ],
  },
  {
    owner_key: "own-1188|B-2407",
    ownership_id: "OWN-1188",
    flat: "B-2407",
    executive: "Desk B",
    red: true,
    risk: "Amber",
    experience: "At Risk",
    score: 44,
    confidence: "medium",
    reasons: "Possession date slipped once; CRM last replied",
    current_unanswered: 1,
    followups_in_seq: 1,
    longest_wait_hours: 20,
    historical_unanswered: 0,
    problem: "Possession delay",
    problem_category: "Handover",
    issue_status: "PARTIALLY_RESOLVED",
    problem_status: "active",
    latest_activity: "2026-03-16T16:05:00",
    latest_mail_summary: "CRM shared a revised possession window",
    actual_issue: "Possession moved from Feb to April without a written reason",
    evidence: "Owner asked for a dated letter",
    milestone: "Possession",
    thread_status: "Waiting",
    awaiting: "Owner",
    thread_count: 1,
    unpaid_milestones: 1,
    paid_late: 0,
    threads: [
      {
        milestone: "Possession",
        latest_activity: "2026-03-16T16:05:00",
        issue_status: "PARTIALLY_RESOLVED",
        status: "Waiting",
        conversation_flow: "Owner asked why possession slipped → CRM sent a new window",
        actual_issue: "Possession moved from Feb to April without a written reason",
        issue_category: "Handover",
        customer_request: "Dated possession letter",
        issue_evidence: "Feb brochure date vs March mail",
        issue_status_reason: "New date sent, letter still pending",
        resolution_summary: "CRM committed to April 20 window",
        awaiting_on: "Owner",
        problem_labels: "Possession delay",
        last_customer_summary: "Please send the letter on letterhead.",
        last_team_summary: "April 20 is the current window. Letter in draft.",
        mails: [
          {
            datetime: "2026-03-10T08:30:00",
            direction: "Owner → CRM",
            summary: "Brochure said February. What is the new date?",
            problem_mail: true,
            response_delay_hours: 9,
          },
          {
            datetime: "2026-03-16T16:05:00",
            direction: "CRM → Owner",
            summary: "Revised window is 20 April. Letter follows.",
            problem_mail: false,
            response_delay_hours: null,
          },
        ],
      },
    ],
    timeline: [
      {
        date: "2026-01-15T10:00:00",
        event: "Demand",
        amount: "₹3,10,000",
        milestone: "Possession",
        payment_after_days: null,
        payment_status: "Unpaid",
      },
    ],
    payments: [],
  },
  {
    owner_key: "own-0901|C-0801",
    ownership_id: "OWN-0901",
    flat: "C-0801",
    executive: "Desk A",
    red: false,
    risk: "Green",
    experience: "Happy",
    score: 82,
    confidence: "high",
    reasons: "Payment query closed same day",
    current_unanswered: 0,
    followups_in_seq: 0,
    longest_wait_hours: 0,
    historical_unanswered: 0,
    problem: "Payment receipt",
    problem_category: "Payments",
    issue_status: "CLOSED",
    problem_status: "closed",
    latest_activity: "2026-02-28T14:00:00",
    latest_mail_summary: "Receipt shared. Owner confirmed.",
    actual_issue: "Owner asked for a receipt on the third-slab payment",
    evidence: "Receipt mail plus owner thank-you",
    milestone: "Slab 3",
    thread_status: "Closed",
    awaiting: "None",
    thread_count: 1,
    unpaid_milestones: 0,
    paid_late: 0,
    threads: [
      {
        milestone: "Slab 3",
        latest_activity: "2026-02-28T14:00:00",
        issue_status: "CLOSED",
        status: "Closed",
        conversation_flow: "Owner asked for receipt → CRM sent it → owner confirmed",
        actual_issue: "Owner asked for a receipt on the third-slab payment",
        issue_category: "Payments",
        customer_request: "Receipt for slab 3",
        resolution_summary: "Receipt mailed the same afternoon",
        resolution_source: "CRM template",
        issue_resolution_match: "Same problem, same milestone",
        customer_confirmed_resolution: "YES",
        awaiting_on: "None",
        problem_labels: "Payment receipt",
        last_customer_summary: "Received, thank you.",
        last_team_summary: "Receipt attached.",
        mails: [
          {
            datetime: "2026-02-28T09:15:00",
            direction: "Owner → CRM",
            summary: "Please share the slab 3 receipt.",
            problem_mail: true,
            response_delay_hours: 4.5,
          },
          {
            datetime: "2026-02-28T13:50:00",
            direction: "CRM → Owner",
            summary: "Receipt attached for slab 3.",
            problem_mail: false,
            response_delay_hours: null,
          },
        ],
      },
    ],
    timeline: [
      {
        date: "2026-02-20T10:00:00",
        event: "Demand",
        amount: "₹1,80,000",
        milestone: "Slab 3",
        payment_after_days: 4,
        payment_status: "Paid",
      },
    ],
    payments: [
      {
        txn_date: "2026-02-24",
        status: "Credited",
        amount: "₹1,80,000",
        milestone: "Slab 3",
        towards: "Slab",
        partial: false,
      },
    ],
  },
  {
    owner_key: "own-2210|D-0512",
    ownership_id: "OWN-2210",
    flat: "D-0512",
    executive: "Desk B",
    red: false,
    risk: "Green",
    experience: "Neutral",
    score: 58,
    confidence: "low",
    reasons: "One closed query, then silence",
    current_unanswered: 0,
    followups_in_seq: 0,
    longest_wait_hours: 0,
    historical_unanswered: 0,
    problem: "Car park allotment",
    problem_category: "Allotment",
    issue_status: "CLOSED",
    problem_status: "closed",
    latest_activity: "2026-01-22T12:00:00",
    latest_mail_summary: "Allotment note sent",
    actual_issue: "Owner asked which basement slot was allotted",
    evidence: "Allotment note in reply",
    milestone: "Handover",
    thread_status: "Closed",
    awaiting: "None",
    thread_count: 1,
    unpaid_milestones: 0,
    paid_late: 0,
    threads: [
      {
        milestone: "Handover",
        latest_activity: "2026-01-22T12:00:00",
        issue_status: "CLOSED",
        status: "Closed",
        actual_issue: "Owner asked which basement slot was allotted",
        issue_category: "Allotment",
        resolution_summary: "Slot B2-19 confirmed",
        customer_confirmed_resolution: "UNKNOWN",
        awaiting_on: "None",
        problem_labels: "Car park allotment",
        mails: [
          {
            datetime: "2026-01-21T11:00:00",
            direction: "Owner → CRM",
            summary: "Which car park number is mine?",
            problem_mail: true,
            response_delay_hours: 25,
          },
          {
            datetime: "2026-01-22T12:00:00",
            direction: "CRM → Owner",
            summary: "Allotted B2-19. Note attached.",
            problem_mail: false,
            response_delay_hours: null,
          },
        ],
      },
    ],
    timeline: [],
    payments: [],
  },
];

function paramsFrom(url) {
  const query = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
  const search = new URLSearchParams(query);
  const all = (key) => search.getAll(key);
  return {
    start: search.get("start") || "",
    end: search.get("end") || "",
    red: search.get("red") === "true",
    flat: (search.get("flat") || "").toLowerCase(),
    q: (search.get("q") || "").toLowerCase(),
    problem_status: search.get("problem_status") || "active",
    ownership_id: search.get("ownership_id") || "",
    owner_flat: search.get("owner_flat") || "",
    owner_key: search.get("owner_key") || "",
    executive: search.get("executive") || "",
    experience_band: all("experience_band"),
    milestone: all("milestone"),
    thread_status: all("thread_status"),
    issue_status: all("issue_status"),
    awaiting: all("awaiting"),
  };
}

function inWindow(unit, filters) {
  if (!filters.start && !filters.end) return true;
  const day = unit.latest_activity.slice(0, 10);
  if (filters.start && day < filters.start) return false;
  if (filters.end && day > filters.end) return false;
  return true;
}

function filterUnits(filters) {
  return UNITS.filter((unit) => {
    if (!inWindow(unit, filters)) return false;
    if (filters.red && !unit.red) return false;
    if (filters.flat && !unit.flat.toLowerCase().includes(filters.flat)) return false;
    if (filters.q && !`${unit.ownership_id} ${unit.flat}`.toLowerCase().includes(filters.q)) {
      return false;
    }
    if (filters.milestone.length && !filters.milestone.includes(unit.milestone)) return false;
    if (filters.thread_status.length && !filters.thread_status.includes(unit.thread_status)) {
      return false;
    }
    if (filters.issue_status.length && !filters.issue_status.includes(unit.issue_status)) {
      return false;
    }
    if (filters.awaiting.length && !filters.awaiting.includes(unit.awaiting)) return false;
    if (filters.experience_band.length && !filters.experience_band.includes(unit.experience)) {
      return false;
    }
    return true;
  });
}

function findUnit(filters) {
  return UNITS.find((unit) => {
    if (filters.owner_key) return unit.owner_key === filters.owner_key;
    return unit.ownership_id === filters.ownership_id && unit.flat === filters.owner_flat;
  });
}

function leadRow(unit) {
  return {
    ownership_id: unit.ownership_id,
    flat: unit.flat,
    executive: unit.executive,
    problem_category: unit.problem_category,
    evidence: unit.evidence,
    actual_issue: unit.actual_issue,
    issue_status: unit.issue_status,
    problem: unit.problem,
    thread_count: unit.thread_count,
    latest_activity: unit.latest_activity,
    latest_mail_summary: unit.latest_mail_summary,
  };
}

function route(path) {
  const pathname = path.split("?")[0];
  const filters = paramsFrom(path);
  const view = filterUnits(filters);

  if (pathname === "/api/meta") {
    return {
      ready: true,
      project: "LOFT (demo)",
      as_of: "2026-03-20T09:00:00",
      canonical_messages: 18,
      owners: UNITS.length,
      threads: UNITS.reduce((n, unit) => n + unit.threads.length, 0),
      date_min: "2026-01-01",
      date_max: "2026-03-20",
      milestones: ["Possession", "Slab 3", "Handover"],
      statuses: ["Open", "Waiting", "Closed"],
      issue_statuses: ["OPEN", "PARTIALLY_RESOLVED", "CLOSED"],
      awaiting: ["CRM", "Owner", "None"],
      executives: ["Desk A", "Desk B"],
      experience_bands: ["Happy", "Neutral", "Unhappy", "At Risk"],
      missing_executive_rows: 0,
      threshold_days: 15,
      sla_hours: 24,
      legacy_open_issue_owner_flats: 1,
      executive_attribution_note:
        "Demo slice. Production reads the full CRM parquet and never ships raw mail bodies.",
      build_hint: "sample data",
    };
  }

  if (pathname === "/api/leads") {
    const rows = view.filter((unit) => unit.problem_status === filters.problem_status);
    const pool = UNITS.filter((unit) => inWindow(unit, filters));
    return {
      kpis: {
        issues: pool.length,
        open: pool.filter((unit) => unit.issue_status === "OPEN").length,
        partial: pool.filter((unit) => unit.issue_status === "PARTIALLY_RESOLVED").length,
        closed: pool.filter((unit) => unit.issue_status === "CLOSED").length,
      },
      red_owners: pool.filter((unit) => unit.red).length,
      status: filters.problem_status,
      count: rows.length,
      rows: rows.map(leadRow),
    };
  }

  if (pathname === "/api/leads/detail") {
    const unit = findUnit(filters);
    if (!unit) return { found: false };
    return {
      found: true,
      ownership_id: unit.ownership_id,
      flat: unit.flat,
      executive: unit.executive,
      thread_count: unit.thread_count,
      problem_category: unit.problem_category,
      evidence: unit.evidence,
      actual_issue: unit.actual_issue,
      issue_status: unit.issue_status,
      problem: unit.problem,
      latest_mail_summary: unit.latest_mail_summary,
      threads: unit.threads,
    };
  }

  if (pathname === "/api/intelligence") {
    return {
      ready: true,
      kpis: {
        red: view.filter((unit) => unit.risk === "Red").length,
        amber: view.filter((unit) => unit.risk === "Amber").length,
        green: view.filter((unit) => unit.risk === "Green").length,
        owner_flats: view.length,
        legacy_open: 1,
        happy: view.filter((unit) => unit.experience === "Happy").length,
        neutral: view.filter((unit) => unit.experience === "Neutral").length,
        unhappy: view.filter((unit) => unit.experience === "Unhappy").length,
        at_risk: view.filter((unit) => unit.experience === "At Risk").length,
        insufficient: 0,
      },
      red_only: filters.red,
      risk_count: view.length,
      experience: view.map((unit) => ({
        ownership_id: unit.ownership_id,
        flat: unit.flat,
        executive: unit.executive,
        experience: unit.experience,
        score: unit.score,
        confidence: unit.confidence,
        risk: unit.risk,
        reasons: unit.reasons,
        owner_key: unit.owner_key,
      })),
      attention: view
        .filter((unit) => unit.current_unanswered > 0)
        .map((unit) => ({
          owner_key: unit.owner_key,
          ownership_id: unit.ownership_id,
          flat: unit.flat,
          current_unanswered: unit.current_unanswered,
          followups_in_seq: unit.followups_in_seq,
          longest_wait_hours: unit.longest_wait_hours,
          historical_unanswered: unit.historical_unanswered,
        })),
      risk: view.map((unit) => ({
        ownership_id: unit.ownership_id,
        flat: unit.flat,
        executive: unit.executive,
        risk: unit.risk,
        score: unit.score,
        owner_key: unit.owner_key,
        reasons: unit.reasons,
      })),
    };
  }

  if (pathname === "/api/owners") {
    return {
      count: view.length,
      red_only: filters.red,
      rows: view.map((unit) => ({
        owner_key: unit.owner_key,
        ownership_id: unit.ownership_id,
        flat: unit.flat,
        executive: unit.executive,
        problem: unit.problem,
        risk: unit.risk,
        experience: unit.experience,
        latest_activity: unit.latest_activity,
        red: unit.red,
      })),
    };
  }

  if (pathname === "/api/owner") {
    const unit = findUnit(filters) || view[0];
    if (!unit) return { found: false };
    return {
      found: true,
      owner_key: unit.owner_key,
      ownership_id: unit.ownership_id,
      flat: unit.flat,
      executive: unit.executive,
      threads_count: unit.thread_count,
      unpaid_milestones: unit.unpaid_milestones,
      paid_late: unit.paid_late,
      risk: unit.risk,
      experience: unit.experience,
      risk_reasons: unit.reasons,
      experience_reasons: unit.reasons,
      experience_confidence: unit.confidence,
      active_problem_labels: unit.red ? unit.problem : "",
      threads: unit.threads,
      timeline: unit.timeline,
      unpaid_count: unit.unpaid_milestones,
      late_count: unit.paid_late,
      threshold_days: 15,
      payments: unit.payments,
    };
  }

  if (pathname === "/api/executives") {
    const desks = ["Desk A", "Desk B"].map((name) => {
      const held = view.filter((unit) => unit.executive === name);
      return {
        Executive: name,
        "Owners (current)": held.length,
        "Threads (current)": held.reduce((n, unit) => n + unit.thread_count, 0),
        "CRM replies (event)": name === "Desk A" ? 8 : 5,
        "Threads replied to (event)": name === "Desk A" ? 4 : 3,
        "Owner mails answered (event)": name === "Desk A" ? 6 : 4,
        "Avg reply (hrs, event)": name === "Desk A" ? 9.2 : 14.1,
        "Median reply (hrs, event)": name === "Desk A" ? 6.5 : 12,
        "SLA met % (event)": name === "Desk A" ? 75 : 60,
        "Awaiting CRM (current)": held.filter((unit) => unit.awaiting === "CRM").length,
      };
    });
    return {
      pulse: {
        crm_replies: 13,
        threads_replied_to: 7,
        avg_reply_hours: 11.2,
        sla_met: 68.5,
        awaiting_crm: view.filter((unit) => unit.awaiting === "CRM").length,
      },
      sla_hours: 24,
      attribution_note:
        "Demo slice. Owners/Threads/Awaiting = current desk; reply metrics are sample event counts.",
      comparison: desks,
      problems_by_milestone: [
        { milestone: "Possession", problem: "Snag", cases: 1 },
        { milestone: "Possession", problem: "Possession delay", cases: 1 },
        { milestone: "Slab 3", problem: "Payment receipt", cases: 1 },
        { milestone: "Handover", problem: "Car park allotment", cases: 1 },
      ],
      executives: ["Desk A", "Desk B"],
    };
  }

  if (pathname === "/api/executives/detail") {
    const rows = view
      .filter((unit) => !filters.executive || unit.executive === filters.executive)
      .map((unit) => ({
        Milestone: unit.milestone,
        "Latest activity": unit.latest_activity,
        Status: unit.thread_status,
        "Awaiting CRM": unit.awaiting === "CRM",
        "Max reply (hrs)": unit.longest_wait_hours,
        "CRM replies": unit.thread_count,
        Problems: unit.problem,
        Mails: unit.threads.reduce((n, thread) => n + (thread.mails || []).length, 0),
      }));
    return { executive: filters.executive, rows };
  }

  return { error: "not found" };
}

if (typeof window !== "undefined") {
  const realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : input.url;
    if (!url.includes("/api/")) return realFetch(input, init);
    const path = url.startsWith("http") ? new URL(url).pathname + new URL(url).search : url;
    const body = route(path);
    const ok = !body.error && body.found !== false;
    return Promise.resolve({
      ok,
      status: body.error ? 404 : body.found === false ? 404 : 200,
      json: () => Promise.resolve(body),
    });
  };
}

if (typeof module !== "undefined") module.exports = { filterUnits, paramsFrom, route, UNITS };
