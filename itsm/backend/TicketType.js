function getTypeTitleCounts(data) {
    return data.reduce((counts, record) => {
      const typetittle = record.typetittle;
      counts[typetittle] = (counts[typetittle] || 0) + 1;
      return counts;
    }, {});
  }
  
  module.exports = getTypeTitleCounts;
  