import { useState } from "react";
import { getQualityAssessment } from "../lib/dolby-io";
import styles from "../styles/Form.module.css";

export default function QualityAssessment() {
  const [jobId, setJobId] = useState("");
  const [assessment, setAssessment] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const qa = await getQualityAssessment(jobId);
    setAssessment(qa);
  };

  if (assessment !== undefined) {
    return (
      <>
        <p>Your results:</p>
        <ul>
          <li>
            Duration: <b>{assessment.duration}</b> seconds
          </li>
          <li>
            Average audio quality: <b>{assessment.audioQuality}/10</b>
          </li>
          <li>
            The segment with the worst audio quality was between <b>{assessment.worstSegment.start}</b> and <b>{assessment.worstSegment.end}</b> seconds, with a
            score of <b>{assessment.worstSegment.score}/10</b>
          </li>
          <li>
            Percentage of video that was speech: <b>{assessment.speechQuality}</b>%
          </li>
        </ul>
        <p>
          For more information on interpreting the quality score, visit the{" "}
          <a href="https://docs.dolby.io/media-processing/docs/audio-quality#how-to-interpret-the-quality-score">Dolby.io website</a>
        </p>
      </>
    );
  }

  return (
    <form className={styles.group} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Job ID:
        <input type="text" name="input" onChange={(event) => setJobId(event.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
