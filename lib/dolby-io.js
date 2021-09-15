const APIS = {
  diagnose: "media/diagnose",
};

const JOB_STATES = {
  submitted: "submitted",
  inProgress: "inProgress",
  complete: "complete",
};

function getAuthCredentials() {
  return process.env.NEXT_PUBLIC_API_KEY || "";
}

async function fetchApi(api, method, payload = "") {
  const url = `https://api.dolby.com/${api}`;
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": getAuthCredentials(),
    },
    body: method === "POST" ? payload : null,
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function submitJob(api, inputUrl) {
  const payload = JSON.stringify({
    input: inputUrl,
  });
  const { job_id } = await fetchApi(api, "POST", payload);
  return job_id;
}

async function getJobProgress(api, jobId) {
  const data = await fetchApi(`${api}?job_id=${jobId}`, "GET");
  return data;
}

async function getQualityAssessment(jobId) {
  const { result } = await getJobProgress(APIS.diagnose, jobId);
  return {
    duration: result.media_info.container.duration,
    audioQuality: result.audio.quality_score.average,
    worstSegment: result.audio.quality_score.worst_segment,
    speechQuality: result.audio.speech.percentage,
  };
}

export { JOB_STATES, APIS, submitJob, getJobProgress, getQualityAssessment };
