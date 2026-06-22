# Mini-CTF Answer Key

This document contains the step-by-step solution to the mini-CTF web application puzzle.

## Phase 1: The Gate (SQL Injection)

1. Navigate to the root URL (`/`).
2. You will see a terminal-like login screen asking for a `USER_ID` and `AUTH_KEY`.
3. Standard credentials will fail with an "Access Denied" error.
4. To bypass the login, enter a basic SQL Injection payload into either the username or password field.
   - Example 1: `' OR 1=1 --`
   - Example 2: `" OR "1"="1`
5. Click **[ EXECUTE LOGIN ]**. The system will route you to the dashboard.

## Phase 2 & 3: The Broken Dashboard & Network Puzzle

1. You will be routed to the `/dashboard` page, which visually hangs at "Fetching Payload Data... 99%".
2. The UI will simulate error logs and will not display any more information on the screen.
3. Open your browser's **Developer Tools** (usually `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`).
4. Navigate to the **Network** tab and refresh the page if necessary.
5. Look for the `fetch` request made to `/api/sys-dump`.
6. Inspect the **Response** of this request. You will find a JSON payload containing various hints and hex codes (e.g., memory addresses corresponding to Thai character unicode points).

## Phase 4: Final Submission

1. Once you have deduced the final answer from the payload or the hints (The expected answer is **Nattapong นัทธพงศ์**).
2. Go back to the `/dashboard` UI.
3. At the very bottom of the screen, there is a discreet input terminal (`root@sys:~$`).
4. Type `Nattapong นัทธพงศ์` into the input field (English characters are case-insensitive).
5. Press **Enter**.
6. A success overlay will appear with ASCII art, a "SYSTEM OVERRIDE SUCCESS" message, and the admin contact information.
