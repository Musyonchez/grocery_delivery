import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Check if error is an instance of Error or has the expected properties
  let errorMessage = "";
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "statusText" in error &&
    "message" in error
  ) {
    errorMessage = `${error.statusText} ${error.message}`;
  } else {
    errorMessage = "An unknown error occurred.";
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
