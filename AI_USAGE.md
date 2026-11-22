# AI tool usage disclosure

AI assistance: ChatGPT was used to help scaffold the React/Vite project, propose component structure, write initial UI styles, and draft documentation.

Representative prompts:
1. Create a responsive React task dashboard with task CRUD, status tabs, search and priority filtering.
2. Derive dashboard statistics from task state and persist task updates in localStorage.
3. Implement a three-slide Focus Notes carousel with previous/next controls and active indicators.

AI-assisted areas: initial React component implementation, CSS styling, README documentation and this disclosure.

Verification / correction: The implementation was structured to use immutable React state updates and derive counts from the task array rather than hardcoding them. Before submission, the candidate should run the app locally, test all controls and viewport sizes, compare against the live Figma design, and make any needed corrections. The candidate should be able to explain each feature and make a small code change during review.
