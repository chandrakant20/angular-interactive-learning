import { LessonQuestion } from './lesson.model';

const question = (text: string, options: string[], answer: number, explanation: string): LessonQuestion => ({ question: text, options, answer, explanation });

export const realInterviewQuestions: Record<number, LessonQuestion[]> = {
  1: [
    question('A team wants to put every API call in the root component. What would you recommend?', ['Move reusable data access into feature services and keep components focused on coordination', 'Put all calls in a global utility with no types', 'Call the API directly from every template'], 0, 'Feature services create a clear boundary for API access, caching, errors, and tests while components focus on the view.'),
    question('A new Angular developer asks whether to learn every decorator before building. What is your answer?', ['Learn the component, template, data-flow, service, and routing foundations by building small features', 'Memorize all decorators first', 'Skip templates and start with global state'], 0, 'Angular becomes understandable through connected practice, not isolated API memorization.'),
    question('A production page is blank after a deployment. What do you check first?', ['Browser console, network response, build configuration, and the first failing route', 'Rewrite the entire component', 'Change random CSS values'], 0, 'Start with observable evidence: runtime errors, failed assets, API responses, and route configuration.'),
    question('When should a feature become its own route boundary?', ['When it represents a user capability that can be loaded and owned independently', 'When it has exactly two files', 'Only after performance fails'], 0, 'Feature boundaries improve ownership, lazy loading, testing, and change isolation.')
  ],
  2: [
    question('A component has 900 lines and handles a list, modal, form, and API calls. What is the first refactor?', ['Separate responsibilities into page/container, presentational, form, and data-access pieces', 'Add more private methods to the same file', 'Move the template into one giant string'], 0, 'Split by responsibility and public contracts so each component has a reason to change.'),
    question('A reusable card needs data and must tell the parent which card was clicked. Which API fits?', ['A required input for data and an output for the selected id', 'A global variable', 'Direct access to the parent class'], 0, 'Explicit input/output APIs preserve ownership and make the card reusable and testable.'),
    question('A child component modifies an object received from its parent and another screen changes unexpectedly. Why?', ['The child mutated state it does not own', 'Angular cloned the object incorrectly', 'CSS inheritance changed the object'], 0, 'Inputs should be treated as read-only; emit intent and let the owner create the next state.'),
    question('When would you use a container component?', ['When a page needs to coordinate services, state, loading, and child inputs', 'For every icon', 'Only to add CSS'], 0, 'Container components are useful at a feature boundary, while presentational children stay focused on display and events.')
  ],
  3: [
    question('A button should be disabled while saving, but disabled="false" still disables it. Why?', ['HTML attributes are strings; use property binding for the boolean value', 'Angular treats every string as false', 'The browser does not support disabled'], 0, 'Use [disabled]="isSaving()" so Angular writes a real boolean DOM property.'),
    question('A template calls calculateTotal() from a large list and the page feels slow. What would you change?', ['Derive the value with computed state or prepare it before rendering', 'Call the method more often', 'Put the method in CSS'], 0, 'Template expressions can run repeatedly; stable derived state makes the work explicit and cheaper.'),
    question('A custom dropdown works with a mouse but not a keyboard. What is wrong?', ['The interaction uses a non-semantic element or lacks keyboard behavior and focus management', 'The color contrast is too high', 'Interpolation is disabled'], 0, 'Prefer native select/button elements or implement the complete keyboard and ARIA contract.'),
    question('A child output emits a value but the parent mutates several unrelated things in the template. How can it improve?', ['Handle the event in a named parent method that expresses the business action', 'Add more template operators', 'Emit from the child again'], 0, 'Named methods make event intent readable, testable, and easier to change.')
  ],
  5: [
    question('A developer uses an effect to copy filteredItems into another signal. What is the better design?', ['Use computed for the filtered value and keep one source of truth', 'Add a second effect that copies it back', 'Use localStorage for the filter'], 0, 'Derived state should be computed, not synchronized with effects.'),
    question('A signal contains an array and a developer calls items().push(newItem). What is the risk?', ['The signal may not be notified because the array reference was not replaced', 'Signals only store strings', 'Push triggers a route change'], 0, 'Use update(items => [...items, newItem]) to create a new reference and notify consumers.'),
    question('A search filter needs both the selected category and the search text. Where should the result live?', ['A computed signal that reads both source signals', 'A manually synchronized third signal', 'A DOM data attribute'], 0, 'Computed values make dependencies and recalculation automatic.'),
    question('A service store exposes writable signals directly to every component. What is safer?', ['Expose read-only signals and keep mutation methods inside the store', 'Make every field global', 'Copy state into localStorage only'], 0, 'A narrow store API protects ownership and makes state transitions easier to audit.')
  ],
  6: [
    question('A service creates its HttpClient with new HttpClient(). What is the problem?', ['It bypasses Angular’s injector, configuration, interceptors, and test replacement', 'It makes HTTP faster', 'It creates a component'], 0, 'Inject dependencies so Angular can configure and replace them consistently.'),
    question('A service is provided at component level and two sibling components disagree about its state. Why?', ['Each provider scope can create a separate service instance', 'Signals cannot be shared', 'The router deletes state'], 0, 'Provider scope determines instance lifetime and sharing; root or a shared parent scope may be appropriate.'),
    question('How would you test a component that depends on a payment service?', ['Provide a fake or spy service through Angular’s testing injector', 'Call the real payment API in every unit test', 'Disable dependency injection'], 0, 'Replace collaborators at the boundary so tests are safe, fast, and deterministic.')
  ],
  7: [
    question('Users can open /admin by typing the URL even though the menu hides it. What protects the data?', ['Server-side authorization; a client guard is only a navigation aid', 'A CSS display rule', 'The hidden menu'], 0, 'The server must authorize every protected request because the browser is controlled by the user.'),
    question('A resolver makes a page show a blank screen for ten seconds. What alternative might improve UX?', ['Load the page shell immediately and show a component-level loading state', 'Increase the resolver timeout', 'Remove the route URL'], 0, 'Resolvers are useful for critical prerequisites, but component loading often gives faster feedback.'),
    question('A wildcard route catches /courses/42 before the course route. What should you inspect?', ['Route order and specificity', 'The CSS cascade', 'The package lock'], 0, 'Angular matches routes in configuration order, so specific routes should appear before the wildcard.')
  ],
  8: [
    question('A form submits twice when a user taps quickly. How do you prevent it?', ['Track submitting state, disable the submit button, and guard the handler', 'Add a second submit handler', 'Hide the button with CSS after submit only'], 0, 'Submission state should be explicit and should prevent duplicate requests.'),
    question('A required error appears before the user has touched a field. How can UX improve?', ['Show errors after touched or submit, then explain how to fix them', 'Remove validation', 'Show every server stack trace'], 0, 'Validation should guide the user at the moment they can act on it.'),
    question('An API rejects a valid-looking form value. What is missing?', ['Server validation and a mapping from server errors to useful field or form messages', 'More CSS', 'A second HTML form'], 0, 'Client validation improves UX but the server remains the authority for accepted data.')
  ],
  9: [
    question('A request succeeds but the UI stays on a spinner after an exception. What state is missing?', ['A reliable error/finalize path that clears loading and exposes recovery', 'A second spinner', 'A route guard'], 0, 'Loading must end on both success and failure, usually with finalize or explicit state transitions.'),
    question('A user changes search terms quickly and old results replace newer results. What solves it?', ['switchMap to cancel stale requests', 'mergeMap for every request', 'setTimeout without cleanup'], 0, 'switchMap makes the latest search term own the visible result.'),
    question('Where should an auth header be added for every API request?', ['A narrow HTTP interceptor', 'Every button click', 'The CSS file'], 0, 'Cross-cutting transport policy belongs in an interceptor, while feature decisions stay in features.')
  ],
  10: [
    question('A save button can be tapped five times and creates five records. Which RxJS strategy fits?', ['exhaustMap or explicit submitting state to ignore duplicate work', 'switchMap if every save must be kept', 'map alone'], 0, 'exhaustMap ignores new triggers while the current save is active.'),
    question('A typeahead should wait until the user pauses typing. Which operator belongs in the pipeline?', ['debounceTime', 'reduce', 'concat'], 0, 'debounceTime prevents a request for every keystroke.'),
    question('A stream errors once and no longer emits values. What should you decide?', ['Whether to recover with a fallback, retry, or surface the error deliberately', 'Always swallow it', 'Subscribe again recursively'], 0, 'Error handling is part of the stream’s contract and should match the user action.')
  ],
  11: [
    question('A dashboard is slow, but the team wants to add memoization everywhere. What do you ask first?', ['What do profiling and bundle/network measurements identify as the bottleneck?', 'Which variable name is shortest?', 'Can all CSS be removed?'], 0, 'Measure rendering, network, bundle, and interaction cost before choosing an optimization.'),
    question('A long list loses input focus after sorting. What is the likely issue?', ['The list is tracked by index instead of stable item identity', 'The font is too large', 'The service is root-scoped'], 0, 'Stable track identity lets Angular reuse the correct DOM nodes.'),
    question('What is a good candidate for @defer?', ['A below-the-fold chart that is not needed for first interaction', 'The page heading', 'The submit button for the primary task'], 0, 'Defer optional UI while keeping the first useful interaction immediate.')
  ],
  12: [
    question('A component test breaks after changing a private method name even though the UI behavior is unchanged. What should improve?', ['Test visible behavior and user actions rather than private implementation', 'Add more private-field assertions', 'Remove the test'], 0, 'Behavior-focused tests protect the contract users depend on and tolerate refactoring.'),
    question('A test calls a real API and fails randomly in CI. What boundary is missing?', ['A fake service or HTTP test controller', 'A larger timeout only', 'A CSS reset'], 0, 'Tests should control collaborators and network responses.'),
    question('Which test should cover login, navigation, and checkout together?', ['A small end-to-end journey test', 'Every unit test', 'A CSS snapshot'], 0, 'End-to-end tests are valuable for a few critical user journeys.')
  ],
  101: [
    question('A heading jumps from h1 to h4 because the designer chose a smaller font. What should change?', ['Keep heading levels semantic and style size with CSS', 'Use h4 everywhere', 'Replace headings with divs'], 0, 'HTML heading level communicates document structure; visual size belongs to CSS.'),
    question('A link says “click here” ten times on a page. Why is that weak?', ['Link text does not describe the destination out of context', 'Links cannot contain text', 'Browsers cannot style links'], 0, 'Descriptive link text helps scanning, screen readers, and search engines.'),
    question('A form works visually but screen readers announce no field name. What should you inspect?', ['The label-for and input-id connection', 'The border radius', 'The JavaScript bundle'], 0, 'A connected label supplies the accessible name and click target.')
  ],
  201: [
    question('A grid overflows only when a code string is long. What CSS rule often fixes the track?', ['min-width: 0 on the grid child and controlled overflow on the code block', 'More margin-left', 'position: absolute on every child'], 0, 'Grid children can have an intrinsic minimum; min-width: 0 lets them shrink within the track.'),
    question('A modal appears behind the header despite a high z-index. What should you inspect?', ['Stacking contexts created by position, transform, opacity, or isolation', 'The HTML title', 'The API response'], 0, 'z-index values only compete within their stacking context hierarchy.'),
    question('A hover animation makes a card unusable for keyboard users. What is missing?', ['Equivalent focus-visible styling and reduced-motion consideration', 'A darker hover color only', 'More keyframes'], 0, 'Interactive state must be visible for keyboard users and motion should respect preferences.')
  ],
  301: [
    question('A shared module accidentally changes an object used by several features. What design helps?', ['Treat shared data as immutable and return new objects from transformations', 'Mutate it earlier', 'Store it in a DOM attribute'], 0, 'Immutable transformations make ownership and changes easier to reason about.'),
    question('A callback loses the class’s this value. What should you consider?', ['How the function is called and whether an arrow function or bind preserves context', 'Changing the CSS selector', 'Adding a database index'], 0, 'this is determined by call site for normal functions; arrow functions capture lexical this.'),
    question('A long synchronous JSON transformation freezes the page. What is the first production concern?', ['Move or split expensive work so the main thread can render and respond', 'Add more event listeners', 'Use localStorage for the loop'], 0, 'Long main-thread tasks block input and rendering; measure and move/split the work.')
  ],
  401: [
    question('An API response is typed as Course but sometimes lacks title. What is the correct boundary?', ['Treat it as unknown, validate/narrow it, then create a trusted Course', 'Use any everywhere', 'Trust the interface at runtime'], 0, 'TypeScript types do not validate JSON; runtime checks are needed for untrusted data.'),
    question('A generic utility is so complex that teammates cannot understand it. What should you do?', ['Prefer a simpler concrete type or name the complex transformation clearly', 'Add more conditional types', 'Disable strict mode'], 0, 'Type safety is useful only when the model remains understandable to the team.'),
    question('A new RequestState variant compiles without updating a switch. What can improve this?', ['Use exhaustive narrowing with a never check', 'Use any for the state', 'Remove the discriminant'], 0, 'An exhaustive check makes the compiler point to unhandled states.'),
    question('A library has no types and its values are trusted incorrectly. What is safer?', ['Write a small accurate declaration or wrap and validate the library boundary', 'Declare every value as any', 'Disable noImplicitAny globally'], 0, 'A narrow, accurate boundary preserves safety without pretending unknown data is safe.')
  ]
};
