import { useContext } from "react";

import { AuthContext } from "auth/AuthProvider";

const useSession = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth context is not available.");
  }

  return context;
};

export default useSession;
