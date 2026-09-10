import { LessonQuestion } from './lesson.model';

export const interviewQuestions: Record<number, LessonQuestion[]> = {
  1: [
    { question: 'What problem does Angular solve compared with writing DOM code by hand?', options: ['It provides a structured component, template, routing, forms, and testing model', 'It replaces the need for a backend', 'It automatically designs every screen'], answer: 0, explanation: 'Angular gives a complete application structure and coordinates UI updates, dependencies, navigation, forms, and testing.' },
    { question: 'Explain the path from index.html to a visible Angular component.', options: ['main.ts bootstraps the root component, which renders a component tree', 'The browser reads every TypeScript file in alphabetical order', 'The router creates the first component even without configuration'], answer: 0, explanation: 'The browser loads index.html, main.ts calls bootstrapApplication, and the root template begins the component tree.' },
    { question: 'Why would a team choose Angular for a large product?', options: ['Shared conventions reduce architectural disagreement', 'It prevents developers from using TypeScript', 'It removes the need to test'], answer: 0, explanation: 'Angular provides conventions and first-party solutions that help teams build and maintain complete applications consistently.' },
    { question: 'What is the difference between Angular and AngularJS?', options: ['Angular is the modern TypeScript framework; AngularJS is the older 1.x framework', 'They are the same package with different names', 'AngularJS is the mobile-only version'], answer: 0, explanation: 'Angular is a later framework with a different architecture and APIs; AngularJS refers to the original 1.x framework.' }
  ],
  2: [
    { question: 'What should a presentational component know about its parent?', options: ['Only its public inputs and outputs', 'The parent’s private fields and services', 'Every route in the application'], answer: 0, explanation: 'A small public API keeps the component reusable and makes its behavior easier to test.' },
    { question: 'When should you split a component into a child component?', options: ['When a visual or behavioral responsibility is repeated or has a clear boundary', 'Whenever the file reaches exactly ten lines', 'Only when Angular throws an error'], answer: 0, explanation: 'Split by responsibility and reuse, not arbitrary file size.' },
    { question: 'What does standalone: true change?', options: ['The component declares its own imports instead of being declared in an NgModule', 'It makes the component global CSS', 'It removes the need for a template'], answer: 0, explanation: 'Standalone components make dependencies local and support simpler lazy-loaded boundaries.' },
    { question: 'Where should a component-owned timer be cleaned up?', options: ['When the component is destroyed', 'In the root route only', 'In a CSS animation'], answer: 0, explanation: 'Timers, subscriptions, observers, and third-party widgets must be released with the component lifetime.' }
  ],
  3: [
    { question: 'What is the difference between interpolation and property binding?', options: ['Interpolation creates text; property binding passes a live value to a DOM property or input', 'Interpolation is for services; property binding is for routes', 'There is no difference'], answer: 0, explanation: 'Use interpolation for text and property binding for booleans, objects, numbers, DOM properties, and component inputs.' },
    { question: 'Why can disabled="false" still behave as disabled in HTML?', options: ['HTML attributes are strings; the presence of disabled matters', 'Angular converts false to true', 'CSS always disables buttons'], answer: 0, explanation: 'Use [disabled]="false" for a real boolean property value.' },
    { question: 'How does a child communicate user intent to its parent?', options: ['It emits an output event', 'It edits the parent’s private field', 'It reloads the page'], answer: 0, explanation: 'The child emits a typed event and the parent decides how state should change.' },
    { question: 'When is two-way binding a poor choice?', options: ['When explicit ownership and validation are easier to understand as separate input and output', 'When editing one simple input', 'When using a native checkbox'], answer: 0, explanation: 'Two-way binding is convenient, but explicit data flow can be clearer for complex state.' }
  ],
  4: [
    { question: 'Why is track important in @for?', options: ['It lets Angular match data items to existing DOM nodes', 'It sorts the collection automatically', 'It validates each item'], answer: 0, explanation: 'Stable identity lets Angular reuse DOM nodes, preserving focus and reducing rendering work.' },
    { question: 'What states should an HTTP-backed list normally model?', options: ['Loading, error, empty, and ready', 'Only ready', 'Only loading and ready'], answer: 0, explanation: 'Explicit states prevent blank screens and give users useful feedback during failure or empty results.' },
    { question: 'When is @switch preferable to several @if blocks?', options: ['When one discriminant has several mutually exclusive cases', 'For every boolean condition', 'Only inside a service'], answer: 0, explanation: '@switch communicates that one state value selects one of several views.' },
    { question: 'Why should you avoid track $index for editable lists?', options: ['Inserted or reordered items can receive the wrong DOM identity', 'Indexes are not valid TypeScript', 'It disables CSS'], answer: 0, explanation: 'Use a stable item identity such as an id when list membership or order can change.' }
  ],
  5: [
    { question: 'What is the difference between signal and computed?', options: ['signal owns writable state; computed derives read-only state', 'computed changes values; signal only logs them', 'They are unrelated to reactivity'], answer: 0, explanation: 'Keep source state writable and derive totals, filters, and labels with computed.' },
    { question: 'Why do signal reads use parentheses?', options: ['The read registers a reactive dependency', 'It converts the value to a string', 'It calls the server'], answer: 0, explanation: 'Calling a signal lets Angular track where its value is consumed.' },
    { question: 'When is effect appropriate?', options: ['Synchronizing Angular state with an external system', 'Replacing every computed value', 'Validating every input in the template'], answer: 0, explanation: 'Use effects for localStorage, analytics, logging, or third-party APIs, not ordinary derivation.' },
    { question: 'How should a child update state owned by its parent?', options: ['Emit an event describing the user intent', 'Mutate the input signal', 'Create a second hidden copy'], answer: 0, explanation: 'The parent owns the state; the child reports intent through an output.' }
  ],
  6: [
    { question: 'What does dependency injection improve?', options: ['It separates a class from how its collaborators are constructed', 'It makes every service global', 'It replaces TypeScript types'], answer: 0, explanation: 'DI makes dependencies explicit and replaceable in tests and different environments.' },
    { question: 'What does providedIn: root usually mean?', options: ['One application-wide injectable instance', 'A new instance per button click', 'A browser global variable'], answer: 0, explanation: 'Root scope gives the service an application lifetime unless another provider overrides it.' },
    { question: 'Why avoid putting all logic in a component?', options: ['Services can own reusable data and business operations', 'Components cannot contain TypeScript', 'Angular forbids methods'], answer: 0, explanation: 'Small components coordinate UI while services own reusable work and data access.' }
  ],
  7: [
    { question: 'What is the purpose of lazy loading a route?', options: ['Download feature code when it is needed', 'Prevent the route from ever rendering', 'Cache user passwords'], answer: 0, explanation: 'Lazy loading reduces the initial JavaScript needed to display the first screen.' },
    { question: 'Why use routerLink instead of a normal href for internal navigation?', options: ['It lets Angular navigate without a full document reload', 'It encrypts the URL', 'It bypasses route configuration'], answer: 0, explanation: 'routerLink works with the Angular router and preserves the single-page application experience.' },
    { question: 'What should a route guard decide?', options: ['Whether navigation is allowed', 'How to render every child element', 'Whether an API user is authorized on the server'], answer: 0, explanation: 'Guards improve navigation UX, but server authorization is still required for protected data.' }
  ],
  8: [
    { question: 'Why are reactive forms useful for complex forms?', options: ['The form model and validation rules live in testable TypeScript', 'They remove the need for labels', 'They validate data on the server automatically'], answer: 0, explanation: 'Reactive forms give you explicit controls, groups, arrays, validators, and predictable submission state.' },
    { question: 'When should validation messages appear?', options: ['After interaction or submit, when the user can act on them', 'Before the form is visible', 'Never'], answer: 0, explanation: 'Showing errors too early is noisy; showing them after touch or submit is more helpful.' },
    { question: 'What is FormArray used for?', options: ['A variable-length group of controls', 'A list of routes', 'A CSS grid'], answer: 0, explanation: 'FormArray models repeatable fields such as line items, phone numbers, or skills.' }
  ],
  9: [
    { question: 'Why is the async pipe usually preferred to a manual subscription in a template component?', options: ['It subscribes and cleans up with the view', 'It makes HTTP requests synchronous', 'It hides all errors'], answer: 0, explanation: 'The async pipe manages the subscription lifecycle and exposes emitted values to the template.' },
    { question: 'What states should a network request expose?', options: ['Loading, success, empty, and error', 'Only success', 'Only a spinner'], answer: 0, explanation: 'A complete async experience explains what is happening and what the user can do next.' },
    { question: 'What belongs in an HTTP interceptor?', options: ['Cross-cutting transport policy such as auth headers or logging', 'Feature-specific display decisions', 'Private component state'], answer: 0, explanation: 'Interceptors are a narrow global boundary for repeated request and response behavior.' }
  ],
  10: [
    { question: 'Which operator is appropriate when a new search should cancel the old search?', options: ['switchMap', 'concatMap', 'mergeMap'], answer: 0, explanation: 'switchMap replaces the previous inner Observable when a new source value arrives.' },
    { question: 'Which operator queues saves in order?', options: ['concatMap', 'switchMap', 'exhaustMap'], answer: 0, explanation: 'concatMap waits for one inner operation to finish before starting the next.' },
    { question: 'Which operator ignores clicks while a request is active?', options: ['exhaustMap', 'mergeMap', 'map'], answer: 0, explanation: 'exhaustMap is useful for preventing duplicate submits while work is in progress.' },
    { question: 'Where should an Observable normally be subscribed?', options: ['At the edge such as async pipe or a deliberate effect/service boundary', 'Inside every operator', 'Inside a type declaration'], answer: 0, explanation: 'Keeping subscription at the edge preserves composability and makes cleanup clear.' }
  ],
  11: [
    { question: 'What should you do before optimizing change detection?', options: ['Measure the actual rendering, network, or bundle bottleneck', 'Add memoization everywhere', 'Remove all templates'], answer: 0, explanation: 'Performance work should respond to evidence, not assumptions.' },
    { question: 'Why do stable input references matter with OnPush-style checking?', options: ['They make meaningful updates explicit', 'They make every event global', 'They disable signals'], answer: 0, explanation: 'Immutable updates and explicit signals help Angular know which parts can have changed.' },
    { question: 'What does @defer help with?', options: ['Loading non-critical UI later', 'Making an API secure', 'Replacing tests'], answer: 0, explanation: 'Deferrable views can move below-the-fold or optional code out of the initial work.' }
  ],
  12: [
    { question: 'What should a component test verify?', options: ['Visible behavior from inputs and user actions', 'Private implementation details', 'The exact number of helper methods'], answer: 0, explanation: 'Behavior-focused tests survive refactoring and match what users depend on.' },
    { question: 'What is a good testing pyramid?', options: ['Many fast unit tests, focused component tests, and fewer E2E tests', 'Only E2E tests', 'One giant snapshot test'], answer: 0, explanation: 'Different layers provide speed, confidence, and realistic journey coverage.' },
    { question: 'Why inject dependencies in services and components?', options: ['Tests can replace real collaborators with controlled fakes', 'It prevents all errors', 'It makes the browser faster automatically'], answer: 0, explanation: 'Replaceable dependencies make tests deterministic and focused.' }
  ],
  13: [
    { question: 'What is the role of angular.json?', options: ['It describes Angular project build and serve configuration', 'It stores user passwords', 'It defines database tables'], answer: 0, explanation: 'angular.json contains project targets, assets, styles, scripts, and build configurations.' },
    { question: 'What does ng generate provide?', options: ['Consistent code scaffolding', 'A production database', 'Automatic product requirements'], answer: 0, explanation: 'The CLI generates files using Angular conventions and reduces repetitive setup.' }
  ],
  14: [
    { question: 'What does strict TypeScript help reveal?', options: ['Possible invalid or missing values before runtime', 'Slow network requests only', 'CSS specificity'], answer: 0, explanation: 'Strict types make assumptions explicit, especially around nullability and object shapes.' },
    { question: 'Do TypeScript interfaces validate API JSON at runtime?', options: ['No, runtime validation is still needed for untrusted data', 'Yes, interfaces execute in the browser', 'Only when using CSS'], answer: 0, explanation: 'Interfaces disappear at runtime; validate external data when correctness or security requires it.' }
  ],
  16: [
    { question: 'When is ngOnChanges useful?', options: ['When a component must react to input changes', 'For every click event', 'Only for routing'], answer: 0, explanation: 'ngOnChanges receives input change information and is useful when a new input requires work.' },
    { question: 'What is a common reason to use ngOnDestroy?', options: ['Release component-owned resources', 'Create a new route', 'Format currency'], answer: 0, explanation: 'Cleanup prevents subscriptions, timers, and external widgets from outliving the component.' }
  ],
  17: [
    { question: 'What is a pipe primarily for?', options: ['Presentation formatting in a template', 'Changing database records', 'Authorizing a user'], answer: 0, explanation: 'Pipes transform values for display while leaving the source model unchanged.' },
    { question: 'Why should business rules not be hidden inside a pipe?', options: ['Pipes should remain predictable presentation helpers', 'Pipes cannot be tested', 'Angular does not support strings'], answer: 0, explanation: 'Business decisions belong in domain logic or services where they can be reused and tested.' }
  ],
  24: [
    { question: 'What should you prefer before adding ARIA?', options: ['Semantic HTML elements', 'A div for every control', 'Mouse-only handlers'], answer: 0, explanation: 'Native elements provide keyboard and assistive technology behavior by default.' },
    { question: 'What should an accessible custom control support?', options: ['Keyboard operation, visible focus, name, role, and state', 'Only a hover color', 'Only a click listener'], answer: 0, explanation: 'Accessible controls must communicate and operate their state beyond a mouse pointer.' }
  ],
  26: [
    { question: 'What does hydration do in an SSR Angular app?', options: ['Attaches Angular behavior to server-rendered HTML', 'Deletes server HTML', 'Turns TypeScript into CSS'], answer: 0, explanation: 'Hydration reuses the HTML already delivered by the server and connects it to Angular behavior.' },
    { question: 'What must be guarded in SSR code?', options: ['Browser-only APIs such as window and localStorage', 'All TypeScript classes', 'Static HTML headings'], answer: 0, explanation: 'The server does not have browser globals, so browser-only work needs a platform check or browser boundary.' }
  ],
  27: [
    { question: 'Where must authorization ultimately be enforced?', options: ['On the server for every protected operation', 'Only in an Angular route guard', 'Only in a hidden button'], answer: 0, explanation: 'Client checks improve UX but cannot protect an API from a crafted request.' },
    { question: 'Why is bypassSecurityTrust dangerous?', options: ['It tells Angular to trust content that may be unsafe', 'It encrypts HTML twice', 'It only changes CSS'], answer: 0, explanation: 'Only use trusted values when you fully control and understand their source and context.' }
  ],
  29: [
    { question: 'Why is a browser environment file not secret storage?', options: ['Its values are shipped to users in the JavaScript bundle', 'Angular encrypts it publicly', 'It only exists on the server'], answer: 0, explanation: 'Anything in a browser bundle can be inspected; private keys belong on a server.' },
    { question: 'Why does an SPA server need a fallback to index.html?', options: ['Deep links must load the application shell', 'It makes CSS smaller', 'It replaces the API'], answer: 0, explanation: 'The server must return the app shell for client-side routes such as /courses/42.' }
  ],
  30: [
    { question: 'What is a useful feature boundary?', options: ['A user capability with owned routes, data access, UI, and tests', 'A folder containing every service in the app', 'A random group of files'], answer: 0, explanation: 'Feature boundaries make ownership and change impact easier to reason about.' },
    { question: 'What should a code review ask about a new Angular feature?', options: ['Is data ownership clear, are states complete, and is behavior tested?', 'Does it use the newest API regardless of need?', 'Can all logic be moved into one file?'], answer: 0, explanation: 'Good reviews examine behavior, boundaries, accessibility, failure states, and maintainability.' }
  ]
};
