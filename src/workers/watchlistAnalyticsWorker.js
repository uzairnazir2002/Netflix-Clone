self.onmessage = (event) => {
  const items = Array.isArray(event.data?.items) ? event.data.items : [];
  const statusCounts = items.reduce((acc, item) => {
    const status = item.status || "Plan to Watch";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const averageTitleLength = items.length
    ? Math.round(
        items.reduce((sum, item) => sum + String(item.title || "").length, 0) / items.length,
      )
    : 0;

  self.postMessage({
    total: items.length,
    statusCounts,
    averageTitleLength,
  });
};
