import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FC, PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Loader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              There was an error!
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="animate-spin fixed inset-0 bg-white justify-center items-center flex">
                <div className="text-teal-700 font-bold">Loading...</div>
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Loader;
