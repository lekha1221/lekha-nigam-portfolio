const { filterUnits, paramsFrom, route } = require("./mock-api.js");

const red = filterUnits(paramsFrom("/api/leads?red=true&problem_status=active"));
console.assert(red.every((unit) => unit.red), "red filter leaked a green unit");
console.assert(red.some((unit) => unit.flat === "A-1204"), "missing red unit A-1204");

const unit = filterUnits(paramsFrom("/api/leads?flat=2407"));
console.assert(unit.length === 1 && unit[0].flat === "B-2407", "flat search missed B-2407");

const detail = route("/api/leads/detail?ownership_id=OWN-1042&owner_flat=A-1204");
console.assert(detail.found && detail.threads[0].mails.length === 3, "lead detail missing thread");

const closed = route("/api/leads?problem_status=closed");
console.assert(closed.rows.every((row) => row.issue_status === "CLOSED"), "closed tab showed open work");

console.log("samvaad demo filters ok");
