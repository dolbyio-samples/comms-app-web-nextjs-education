import { useEffect } from "react";

const Example = () => {
  const url = "https://api.dolby.com/media/analyze";
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      input: "dlb://test_file",
      output: "dlb://example_out",
    }),
  };

  useEffect(() => {
    async function exampleApiCall() {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    }

    exampleApiCall();
  });

  return <></>;
};

export default Example;
