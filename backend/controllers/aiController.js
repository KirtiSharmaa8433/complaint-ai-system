function analyzeText({ title = '', description = '', category = '' }) {
  const text = `${title} ${description} ${category}`.toLowerCase();

  let priority = 'Medium';
  let department = 'General Administration';

  if (/electric|fire|accident|danger|shock|emergency|sewage overflow/.test(text)) {
    priority = 'High';
  }

  if (/water|leak|pipeline|drain/.test(text)) {
    department = 'Water Department';
  } else if (/electric|power|street light|transformer/.test(text)) {
    department = 'Electricity Department';
  } else if (/garbage|waste|sanitation|clean/.test(text)) {
    department = 'Sanitation Department';
  } else if (/road|pothole|traffic/.test(text)) {
    department = 'Public Works Department';
  }

  const words = description.split(/\s+/).filter(Boolean);
  const summary = words.length > 22
    ? words.slice(0, 22).join(' ') + '...'
    : description;

  const response = `Your complaint has been received. It is marked ${priority} priority and forwarded to ${department}.`;

  return { priority, department, summary, response };
}

exports.analyzeComplaint = async (req, res) => {
  const result = analyzeText(req.body || {});
  res.json({ success: true, analysis: result });
};

exports.analyzeText = analyzeText;