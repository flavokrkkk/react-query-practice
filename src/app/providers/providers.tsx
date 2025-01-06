import { FC, PropsWithChildren } from "react";
import { queryClient } from "../../shared/api/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { persister } from "../../main";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      <Provider store={store}>
        <ReactQueryDevtools />
        {children}
      </Provider>
    </PersistQueryClientProvider>
  );
};

export default Providers;
