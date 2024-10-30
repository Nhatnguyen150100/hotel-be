function groupAndMerge(results, groupField, mergeField) {
  console.log("🚀 ~ groupAndMerge ~ results:", results);
  return results.reduce((acc, current) => {
    const existing = acc.find(
      (item) => item[groupField] === current[groupField]
    );

    if (existing) {
      existing[mergeField].push(current[mergeField]);
    } else {
      acc.push({
        ...current,
        [mergeField]: current[mergeField].id ? [current[mergeField]] : [],
      });
    }

    return acc;
  }, []);
}

export default groupAndMerge;
