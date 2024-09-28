import { useEffect, useState } from "react";

import "./App.css";
import Engine from "@src/lib/engine";
import { User } from "@src/types";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ListView } from "@src/screens/users";
// mock api calls

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="layout">
                <ListView />
            </div>
        </QueryClientProvider>
    );
}

export default App;
