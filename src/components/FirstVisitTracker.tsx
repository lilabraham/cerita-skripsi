// src/components/FirstVisitTracker.tsx
"use client";

import { useEffect } from "react";

export default function FirstVisitTracker() {
    useEffect(() => {
        if (!localStorage.getItem("_crt_init_ts")) {
            localStorage.setItem("_crt_init_ts", btoa(Date.now().toString()));
        }
    }, []);

    return null; // tidak render apapun
}