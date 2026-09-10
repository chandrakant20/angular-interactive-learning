export interface LessonGuide {
  deepDive: string;
  steps: string[];
  deepExample: string;
  pitfalls: string[];
}

export const lessonGuides: Record<number, LessonGuide> = {
  1: {
    deepDive: 'Angular is a framework, not only a collection of UI widgets. It gives you conventions for components, dependency injection, routing, forms, HTTP, and testing. An Angular application starts at a bootstrap component and grows as a tree: a parent owns a section of the page, then composes child components for smaller responsibilities. The compiler checks templates, which catches many mistakes before a user sees them.',
    steps: ['Install the Angular CLI and create a standalone application.', 'Find the bootstrap call in main.ts: this is where the component tree begins.', 'Open app.ts to see the class and metadata, then app.html to see its template.', 'Change one class property and bind it in the template to observe the data flow.'],
    deepExample: `import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: '<h1>Hello, {{ name }}!</h1>'
})
export class GreetingComponent {
  name = 'Ada';
}`,
    pitfalls: ['Treating Angular as a jQuery replacement instead of a component system.', 'Putting all application logic in one root component.', 'Skipping template compiler errors instead of learning what they point to.']
  },
  2: {
    deepDive: 'Component metadata is the contract between a class and Angular. The selector is normally used as a custom HTML element, while templateUrl and styleUrl keep larger components readable. A component should have one clear reason to change. When a template becomes difficult to read, split out a child component and pass data through inputs rather than reaching into the child internals.',
    steps: ['Generate a component with ng generate component counter.', 'Add state as class properties and render it with interpolation.', 'Listen to a user event with event binding.', 'Extract a repeated visual region into a child component when the parent starts doing too much.'],
    deepExample: `@Component({
  selector: 'app-counter',
  standalone: true,
  template: '<button (click)="increase()">Clicked {{ count }} times</button>'
})
export class CounterComponent {
  count = 0;
  increase() { this.count += 1; }
}`,
    pitfalls: ['Making one giant component because splitting feels slower at first.', 'Using direct DOM APIs for normal UI changes.', 'Giving selectors generic names that can collide with other components.']
  },
  3: {
    deepDive: 'Angular has four common binding shapes. Interpolation produces text. Property binding writes a value to a DOM property or component input. Event binding sends an event into your class. Two-way binding combines a value and an event, but it should be used intentionally because it hides two directions in one expression. Component inputs and outputs use these same ideas across component boundaries.',
    steps: ['Start with interpolation for text content.', 'Use property binding for disabled, src, value, and child inputs.', 'Use event binding for clicks, typing, and form submissions.', 'Only use two-way binding when the control truly owns an editable value.'],
    deepExample: `<label>Search courses
  <input [value]="searchTerm" (input)="updateSearch($event)" />
</label>
<p>Showing results for: {{ searchTerm || 'everything' }}</p>

searchTerm = '';
updateSearch(event: Event) {
  this.searchTerm = (event.target as HTMLInputElement).value;
}`,
    pitfalls: ['Using interpolation where a property binding is required, such as disabled.', 'Calling expensive methods directly from a template on every check.', 'Forgetting that DOM events are objects and need a typed target.']
  },
  4: {
    deepDive: 'Modern Angular control flow is part of the template language. @if expresses a visible state, while @for expresses a collection. Keep conditions easy to read by computing complicated decisions in the class. The track expression tells Angular which data item owns each DOM block, so Angular can preserve focus and reuse existing elements.',
    steps: ['List every visible state: loading, error, empty, and success.', 'Write one @if branch for each state that a user can encounter.', 'Use @for to render a collection and track by a stable id.', 'Add @empty when an empty collection needs a helpful message.'],
    deepExample: `@if (loading()) {
  <app-spinner />
} @else if (error()) {
  <p role="alert">Could not load courses.</p>
} @else {
  @for (course of courses(); track course.id) {
    <app-course-card [course]="course" />
  } @empty {
    <p>No courses match your search.</p>
  }
}`,
    pitfalls: ['Nesting conditions until the template becomes a second application.', 'Tracking by array index when items can be inserted or removed.', 'Forgetting the empty and error states.']
  },
  5: {
    deepDive: 'Signals make state dependencies explicit. A writable signal owns a value, computed derives a read-only value, and effect is for synchronizing with an outside system such as logging or browser storage. Reading a signal in a template registers that template as a consumer. When the signal changes, Angular knows exactly which consumers may need to update.',
    steps: ['Use signal for local writable state.', 'Read it with parentheses in TypeScript and templates.', 'Use update when the new value depends on the previous value.', 'Use computed for derived data instead of storing duplicate state.', 'Reserve effect for side effects, not normal data derivation.'],
    deepExample: `readonly quantity = signal(1);
readonly price = signal(24);
readonly total = computed(() => this.quantity() * this.price());

addOne() { this.quantity.update(value => value + 1); }
setQuantity(value: number) { this.quantity.set(Math.max(1, value)); }`,
    pitfalls: ['Forgetting the parentheses when reading a signal.', 'Writing to a computed signal.', 'Using effects to copy one piece of state into another.']
  },
  6: {
    deepDive: 'Dependency injection separates a class from the way its collaborators are created. A component can ask for a CourseService without knowing whether that service uses HTTP, a cache, or test data. Angular resolves the dependency from an injector hierarchy. Root providers live for the application lifetime; component providers create a scoped instance for that component subtree.',
    steps: ['Identify work that is reused or unrelated to rendering.', 'Move it to an injectable service with a focused public API.', 'Inject the service with inject or constructor injection.', 'Provide a different implementation in tests when the real dependency is not useful.'],
    deepExample: `@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);
  readonly courses$ = this.http.get<Course[]>('/api/courses');
  save(course: Course) { return this.http.post('/api/courses', course); }
}

export class CourseList { readonly service = inject(CourseService); }`,
    pitfalls: ['Creating services manually with new, which bypasses injection.', 'Using a service as a dumping ground for unrelated logic.', 'Making every service root-scoped when a local lifetime is more appropriate.']
  },
  7: {
    deepDive: 'Routing turns an application into navigable screens. A route has a URL pattern and a component or lazy loader. Route parameters identify a resource, query parameters describe a view, and guards protect navigation decisions. Lazy routes create boundaries that Angular can download only when a user needs them. A router-outlet is the place where the active route renders.',
    steps: ['List the real screens and give each a stable URL.', 'Create a route configuration and place router-outlet in the shell.', 'Use routerLink for links so Angular navigates without a full reload.', 'Read route parameters with ActivatedRoute or router input binding.', 'Lazy-load larger feature areas and add a not-found route.'],
    deepExample: `export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', loadComponent: () => import('./course-list').then(m => m.CourseList) },
  { path: 'courses/:id', loadComponent: () => import('./course-page').then(m => m.CoursePage) },
  { path: '**', component: NotFound }
];`,
    pitfalls: ['Using hard-coded href values that reload the whole app.', 'Putting a wildcard route before specific routes.', 'Making guards responsible for business logic instead of access decisions.']
  },
  8: {
    deepDive: 'Reactive forms represent a form as a tree of FormControl, FormGroup, and FormArray objects. The model lives in TypeScript, so you can test validation without a browser. Validators return either null or an error object. The template decides how to explain those errors and when to show them, usually after a control is touched or the form has been submitted.',
    steps: ['Create controls with their initial values and validators.', 'Group related controls into a FormGroup.', 'Bind the group with formGroup and fields with formControlName.', 'Show messages from control.errors after interaction.', 'Submit only when the form is valid and disable duplicate submissions.'],
    deepExample: `profile = new FormGroup({
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  displayName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] })
});

submit() {
  if (this.profile.invalid) { this.profile.markAllAsTouched(); return; }
  this.save(this.profile.getRawValue());
}`,
    pitfalls: ['Showing every error before the user interacts.', 'Trusting client validation as a replacement for server validation.', 'Reading raw input values instead of the form model.']
  },
  9: {
    deepDive: 'Network code has more states than success or failure. HttpClient requests are cold Observables, so the request starts when something subscribes. The async pipe is usually the safest template boundary because it subscribes and unsubscribes with the view. Keep transport models separate from view models when the API shape is not the shape your UI needs.',
    steps: ['Configure provideHttpClient in the application providers.', 'Create a service method with a typed response.', 'Expose loading, data, error, and empty states in the component.', 'Use the async pipe or a signal boundary to connect the stream to the view.', 'Add an interceptor for cross-cutting concerns such as auth or logging.'],
    deepExample: `readonly courses$ = this.courseService.getAll().pipe(
  tap(() => this.loading.set(true)),
  finalize(() => this.loading.set(false)),
  catchError(() => { this.error.set('Courses are unavailable.'); return of([]); })
);

@if (loading()) { <app-spinner /> }
@else if (error()) { <p>{{ error() }}</p> }
@else { <app-course-list [courses]="courses$ | async" /> }`,
    pitfalls: ['Subscribing manually in every component without cleanup.', 'Ignoring cancellation when the user changes a search quickly.', 'Only designing the happy path.']
  },
  10: {
    deepDive: 'RxJS is useful when values arrive over time: keystrokes, route changes, HTTP responses, timers, and user actions. Operators create a readable pipeline. map changes each value, filter removes values, debounceTime waits for a quiet period, and switchMap cancels the previous inner stream when a new outer value arrives. Choose an operator based on business meaning.',
    steps: ['Name an Observable with a $ suffix so its nature is visible.', 'Start with the source stream, such as valueChanges.', 'Add small operators in the order a reader expects.', 'Choose switchMap for replacement work, concatMap for ordered work, and mergeMap for concurrent work.', 'Subscribe at the edge with async or takeUntilDestroyed.'],
    deepExample: `readonly results$ = this.search.valueChanges.pipe(
  map(value => value.trim()),
  debounceTime(250),
  distinctUntilChanged(),
  filter(term => term.length >= 2),
  switchMap(term => this.api.search(term)),
  shareReplay({ bufferSize: 1, refCount: true })
);`,
    pitfalls: ['Using nested subscriptions instead of composing streams.', 'Using mergeMap when old requests should be cancelled.', 'Forgetting that an Observable may emit zero, one, or many values.']
  },
  11: {
    deepDive: 'Performance starts with a product question: what feels slow? Measure bundle size, rendering work, network timing, and interaction latency before changing code. Signals make updates local, OnPush-style checking rewards immutable input changes, and track expressions preserve DOM work. Lazy loading, deferrable views, image sizing, and avoiding repeated computation in templates complete the picture.',
    steps: ['Use browser and Angular tooling to find the actual bottleneck.', 'Keep component inputs stable and prefer immutable updates.', 'Track repeated blocks by a stable identity.', 'Lazy-load routes and defer below-the-fold UI.', 'Move expensive calculations out of templates and cache derived results.'],
    deepExample: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` + "`" + `
    @defer (on viewport) {
      <app-analytics-chart [data]="data()" />
    } @placeholder { <app-chart-skeleton /> }
  ` + "`" + `
})
export class Dashboard { data = input.required<Point[]>(); }`,
    pitfalls: ['Optimizing by instinct instead of measuring.', 'Using index as a track key for editable lists.', 'Adding memoization everywhere and making data flow harder to follow.']
  },
  12: {
    deepDive: 'A useful test suite has layers. Pure functions are fast unit tests. Component tests verify inputs, visible output, and user actions. Service tests verify requests and transformations with HTTP testing utilities. End-to-end tests cover a few critical journeys. Good architecture makes these tests natural because responsibilities have clear boundaries and dependencies can be replaced.',
    steps: ['Start with a behavior list: what must a user be able to do?', 'Extract pure transformations and test edge cases cheaply.', 'Test component states through inputs and DOM events.', 'Use dependency injection to provide fakes or HTTP test controllers.', 'Keep end-to-end tests focused on the highest-value journeys.'],
    deepExample: `it('submits a valid profile', () => {
  const fixture = TestBed.createComponent(ProfileForm);
  const component = fixture.componentInstance;
  const save = spyOn(component, 'save');
  component.profile.setValue({ email: 'ada@example.com', displayName: 'Ada' });
  component.submit();
  expect(save).toHaveBeenCalledWith({ email: 'ada@example.com', displayName: 'Ada' });
});`,
    pitfalls: ['Testing private implementation details that users cannot observe.', 'Making tests depend on real network services.', 'Writing only happy-path tests and skipping loading, empty, and error states.']
  }
};
