import { useState } from "react";
import LandingPage from "./LandingPage";
import AppFlow from "./AppFlow";

const RootApp = () => {
  const [showAppFlow, setShowAppFlow] = useState(false);

  const handleFindGroup = () => {
    setShowAppFlow(true);
  };

  return (
    <>
      {!showAppFlow ? (
        <LandingPage onFindGroup={handleFindGroup} />
      ) : (
        <AppFlow />
      )}
    </>
  );
};

export default RootApp;
