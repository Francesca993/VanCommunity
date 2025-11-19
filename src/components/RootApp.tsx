import { useState } from "react";
import LandingPage from "./LandingPage";
import AppFlow from "./AppFlow";
import NewTripPage from "./NewTripPage";

type View = "landing" | "appflow" | "newtrip";

const RootApp = () => {
  const [view, setView] = useState<View>("landing");

  return (
    <>
      {view === "landing" && (
        <LandingPage
          onFindGroup={() => setView("appflow")}
          onCreateTrip={() => setView("newtrip")}
        />
      )}

      {view === "appflow" && <AppFlow />}

      {view === "newtrip" && (
        <NewTripPage onDone={() => setView("landing")} />
      )}
    </>
  );
};

export default RootApp;
