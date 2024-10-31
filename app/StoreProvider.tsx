"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
// load global functions for client
import "@/lib/globals";
import { createClient } from "@/utils/supabase/client";

import { Provider as ReactSupabaseProvider } from 'react-supabase'

persistStore(store);
  const supabase = createClient();
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactSupabaseProvider value={supabase}>
      <Provider store={store}>{children}</Provider>;
    </ReactSupabaseProvider>
  );
}
