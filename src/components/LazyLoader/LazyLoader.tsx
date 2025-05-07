// components/LazyLoader.tsx
import React, { Suspense } from "react";
import { Loader, Center } from "@mantine/core";

const LazyLoader = (importFunc: () => Promise<any>) => {
  const Component = React.lazy(importFunc);

  return (props: any) => (
    <Suspense
      fallback={
        <Center style={{ height: "100vh" }}>
          <Loader size="lg" variant="dots" />
        </Center>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoader;
