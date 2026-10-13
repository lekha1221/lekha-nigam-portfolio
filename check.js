function matchesFilter(types, filter) {
  return filter === "all" || types.includes(filter);
}

console.assert(matchesFilter(["market"], "all") === true);
console.assert(matchesFilter(["market", "models"], "models") === true);
console.assert(matchesFilter(["language"], "market") === false);
console.assert(matchesFilter(["analytics"], "analytics") === true);
console.log("check ok");
