import { useEffect, useState } from "react";
import { JOB_STATES, APIS, submitJob, getJobProgress } from "../lib/dolby-io";
import styles from "../styles/Form.module.css";
import Loader from "./Loader";

export default function SubmitJobForm() {
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const [jobState, setJobState] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobInfo, setJobInfo] = useState({ progress: 0, status: "Pending", error: { title: "" } });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setJobState(JOB_STATES.submitted);

    try {
      const job = await submitJob(APIS.diagnose, inputUrl);
      setJobId(job);
      setJobState(JOB_STATES.inProgress);
    } catch (err) {
      const { title } = JSON.parse(err.message);
      setError(title);
      setJobState("");
    }
  };

  useEffect(() => {
    async function updateJobInfo() {
      const jobInfo = await getJobProgress(APIS.diagnose, jobId);
      if (jobInfo.status !== "Pending" && jobInfo.status !== "Running") {
        setJobState(JOB_STATES.complete);
      }

      setJobInfo(jobInfo);
    }

    if (jobState === JOB_STATES.inProgress) {
      updateJobInfo();
    }
  });

  if (error) {
    return (
      <p>
        Job failed: <b>{error}</b>
      </p>
    );
  }

  if (jobState === JOB_STATES.submitted) {
    return <Loader />;
  } else if (jobState === JOB_STATES.inProgress) {
    return (
      <>
        <Loader />
        <p>
          Job submitted successfully. Your job ID is <b>{jobId}</b>
        </p>
        <p>
          Status: <b>{jobInfo.status}</b>
        </p>
        <p>
          Progress: <b>{jobInfo.progress}</b>
        </p>
      </>
    );
  } else if (jobState === JOB_STATES.complete) {
    if (jobInfo.status === "Failed") {
      setError(jobInfo.error.title);
    }

    return (
      <>
        <p>
          Job <b>{jobId}</b> is complete.{" "}
        </p>
        <p>
          Status: <b>{jobInfo.status}</b>
        </p>
        <p>
          Progress: <b>{jobInfo.progress}</b>
        </p>
      </>
    );
  }

  return (
    <form className={styles.group} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Input URL:
        <input type="text" name="input" onChange={(event) => setInputUrl(event.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
