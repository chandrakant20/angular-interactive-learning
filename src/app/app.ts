import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { lessonGuides } from './lesson-guides';
import { additionalLessons } from './additional-lessons';
import { detailedLessonContent, DetailedLessonContent } from './lesson-sections';
import { Lesson, LessonQuestion } from './lesson.model';
import { interviewQuestions } from './interview-questions';
import { webLessons } from './web-lessons';
import { webTopicLessons } from './web-topic-lessons';
import { realInterviewQuestions } from './real-interview-questions';

const baseLessons: Lesson[] = [
  { id: 1, level: 'Start here', title: 'What is Angular?', summary: 'Meet the framework and learn how an Angular app is assembled.', duration: '8 min', tag: 'Foundations', accent: 'coral', concept: 'Angular is a toolkit for building web applications with components, templates, and services. A component owns one small piece of the screen. Angular connects your TypeScript logic to HTML and keeps the view updated when data changes.', analogy: 'Think of an Angular app like a studio set. Components are the set pieces, templates are the stage directions, and the framework coordinates when everything should change.', example: `@Component({\n  selector: 'app-greeting',\n  template: '<h1>Hello, {{ name }}!</h1>'\n})\nexport class Greeting {\n  name = 'Ada';\n}`, takeaway: 'Angular gives structure to UI code so large apps stay understandable.', quiz: { question: 'What is the smallest reusable building block in Angular?', options: ['A component', 'A database', 'A route'], answer: 0 } },
  { id: 2, level: 'Start here', title: 'Your first component', summary: 'Create a component with a class, a selector, and a template.', duration: '12 min', tag: 'Foundations', accent: 'gold', concept: 'A component is a TypeScript class decorated with metadata. The selector tells Angular where it can appear. The template describes what the user sees. Keep a component focused on one job.', analogy: 'A component is like a labeled drawer: it has a name, it stores a few related things, and you can place it anywhere that label is used.', example: `@Component({\n  selector: 'app-counter',\n  template: \`<button (click)="count += 1">\n    Clicked {{ count }} times\n  </button>\`\n})\nexport class Counter {\n  count = 0;\n}`, takeaway: 'Class = behavior. Template = presentation. Selector = where it lives.', quiz: { question: 'Which decorator gives a class component metadata?', options: ['@Injectable', '@Component', '@Route'], answer: 1 } },
  { id: 3, level: 'Build the basics', title: 'Templates & binding', summary: 'Move data between your class and the page with Angular template syntax.', duration: '18 min', tag: 'Essentials', accent: 'blue', concept: 'Interpolation shows a value with {{ value }}. Property binding controls an element with [property]. Event binding listens with (event). Two-way binding combines both using [(ngModel)] when forms are imported.', analogy: 'Binding is a two-way conversation: your class can speak to the template, and user events can speak back to the class.', example: `<input [value]="searchTerm" (input)="searchTerm = $any($event.target).value">\n<p>You are searching for: {{ searchTerm }}</p>`, takeaway: 'Use the simplest binding that expresses the relationship clearly.', quiz: { question: 'Which syntax listens to a click?', options: ['[click]', '{{ click }}', '(click)'], answer: 2 } },
  { id: 4, level: 'Build the basics', title: 'Control flow', summary: 'Show, hide, and repeat UI with modern Angular control flow.', duration: '16 min', tag: 'Essentials', accent: 'mint', concept: 'Angular templates can make decisions and repeat blocks. Use @if for conditional content and @for for lists. A track expression helps Angular update only the item that changed.', analogy: 'Control flow is the stage manager: “show this scene if the actor is ready” and “repeat this chair for every guest.”', example: `@if (isLoggedIn) {\n  <p>Welcome back!</p>\n} @else {\n  <p>Please sign in.</p>\n}\n\n@for (item of items; track item.id) {\n  <li>{{ item.name }}</li>\n}`, takeaway: 'Control flow belongs in templates because it describes what the user should see.', quiz: { question: 'Why use track in an @for block?', options: ['To style rows', 'To identify items efficiently', 'To call an API'], answer: 1 } },
  { id: 5, level: 'Build the basics', title: 'Signals & reactive state', summary: 'Model changing data with Angular signals and computed values.', duration: '20 min', tag: 'Essentials', accent: 'violet', concept: 'A signal is a reactive value. Read it by calling it: count(). Update it with set or update. A computed signal derives a value from other signals and recalculates when its dependencies change.', analogy: 'A signal is a small newsroom ticker. Anyone reading it gets the latest headline, and computed values are reporters that react when the headline changes.', example: `count = signal(0);\ndouble = computed(() => this.count() * 2);\n\nincrease() {\n  this.count.update(value => value + 1);\n}`, takeaway: 'Keep state close to where it belongs, then derive rather than duplicate values.', quiz: { question: 'How do you read a signal named score?', options: ['score', 'score()', 'read(score)'], answer: 1 } },
  { id: 6, level: 'Build real apps', title: 'Services & dependency injection', summary: 'Share logic cleanly without stuffing everything into a component.', duration: '22 min', tag: 'Architecture', accent: 'coral', concept: 'A service is a class for reusable logic such as data access or formatting. Angular’s dependency injection system creates it and supplies it where needed. providedIn: root makes one app-wide instance.', analogy: 'Components are front desks. Services are the back office: one reliable place handles the work that many desks need.', example: `@Injectable({ providedIn: 'root' })\nexport class CourseService {\n  getLessons() {\n    return this.http.get<Lesson[]>('/api/lessons');\n  }\n}`, takeaway: 'Components coordinate. Services do the reusable work.', quiz: { question: 'What problem does dependency injection solve?', options: ['It supplies required collaborators', 'It writes CSS', 'It creates HTML tags'], answer: 0 } },
  { id: 7, level: 'Build real apps', title: 'Routing & navigation', summary: 'Give your app screens, URLs, and lazy-loaded boundaries.', duration: '24 min', tag: 'Architecture', accent: 'gold', concept: 'The router maps URL paths to components. Links use routerLink. Route parameters carry identity, while guards can decide whether navigation is allowed. Lazy loading keeps initial bundles small.', analogy: 'A router is a train map: the URL is the station, the route is the track, and the component is what you find when you arrive.', example: `export const routes: Routes = [\n  { path: '', component: HomePage },\n  { path: 'courses/:id', loadComponent: () =>\n      import('./course-page').then(m => m.CoursePage) }\n];`, takeaway: 'URLs are part of your product design, not just an implementation detail.', quiz: { question: 'What does lazy loading help with?', options: ['Smaller initial downloads', 'Faster CSS colors', 'More database rows'], answer: 0 } },
  { id: 8, level: 'Build real apps', title: 'Forms & validation', summary: 'Build friendly forms that explain mistakes and protect your data.', duration: '26 min', tag: 'User input', accent: 'blue', concept: 'Reactive forms define controls in TypeScript and connect them to a template. Validators describe rules. A useful form shows errors after interaction, not before the user has had a chance to type.', analogy: 'A form is a conversation, not a gate. It should guide a person toward a valid answer instead of simply saying “wrong.”', example: `profile = new FormGroup({\n  email: new FormControl('', [\n    Validators.required, Validators.email\n  ])\n});`, takeaway: 'Validate close to the input, explain what to fix, and keep submission predictable.', quiz: { question: 'Where are reactive form controls created?', options: ['Only in CSS', 'In TypeScript', 'Inside index.html'], answer: 1 } },
  { id: 9, level: 'Go further', title: 'HTTP & async data', summary: 'Load remote data and handle loading, success, and error states.', duration: '28 min', tag: 'Production', accent: 'mint', concept: 'HttpClient returns Observables for asynchronous work. Use the async pipe or convert at a deliberate boundary. Every request needs a loading state, an error state, and a useful empty state.', analogy: 'An HTTP request is ordering something from another kitchen. You need a “coming soon” sign, a meal, or an explanation when the kitchen cannot deliver.', example: `lessons$ = this.http.get<Lesson[]>('/api/lessons');\n\n// template\n@if (lessons$ | async; as lessons) {\n  <app-list [items]="lessons" />\n}`, takeaway: 'Async UX is part of correctness. Users need to know what the app is doing.', quiz: { question: 'What does the async pipe help with?', options: ['Subscribing and cleaning up', 'Writing SQL', 'Compiling CSS'], answer: 0 } },
  { id: 10, level: 'Go further', title: 'RxJS thinking', summary: 'Compose streams instead of manually juggling subscriptions.', duration: '30 min', tag: 'Production', accent: 'violet', concept: 'RxJS represents values over time as Observables. Operators such as map, filter, switchMap, and debounceTime transform those streams. switchMap is useful for search because a new term can replace an old request.', analogy: 'An Observable is a conveyor belt of events. Operators are stations that shape each package as it passes by.', example: `results$ = this.search.valueChanges.pipe(\n  debounceTime(250),\n  distinctUntilChanged(),\n  switchMap(term => this.api.search(term))\n);`, takeaway: 'Name streams with a $ suffix and let composition tell the story.', quiz: { question: 'Which operator replaces an older in-flight search?', options: ['switchMap', 'reduce', 'sortBy'], answer: 0 } },
  { id: 11, level: 'Go further', title: 'Performance & change detection', summary: 'Keep large Angular applications quick as they grow.', duration: '25 min', tag: 'Advanced', accent: 'coral', concept: 'OnPush-style change detection and signals help Angular check only what can have changed. Stable list tracking, lazy routes, image discipline, and avoiding unnecessary work in templates all matter.', analogy: 'Performance is an editing desk: only reprint the paragraph that changed instead of photocopying the entire book.', example: `@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  ...\n})\nexport class ResultList {\n  results = input.required<Result[]>();\n}`, takeaway: 'Measure first, then make data flow explicit and updates local.', quiz: { question: 'What does tracking a list item help Angular do?', options: ['Reuse DOM nodes', 'Encrypt the list', 'Create routes'], answer: 0 } },
  { id: 12, level: 'Go further', title: 'Testing & architecture', summary: 'Design boundaries you can trust and change with confidence.', duration: '32 min', tag: 'Advanced', accent: 'gold', concept: 'Test behavior at the level users experience it. Keep pure logic easy to test, use focused component tests for UI states, and use a small number of end-to-end tests for critical journeys.', analogy: 'A test suite is a rehearsal schedule: practice the important scenes, isolate tricky moves, and make failures easy to understand.', example: `it('shows the empty state', () => {\n  const fixture = TestBed.createComponent(ResultList);\n  fixture.componentRef.setInput('results', []);\n  fixture.detectChanges();\n  expect(fixture.nativeElement.textContent)\n    .toContain('No results yet');\n});`, takeaway: 'Architecture is the shape that makes the next change easier.', quiz: { question: 'What should a good UI test focus on?', options: ['Private implementation details', 'User-visible behavior', 'Random timing'], answer: 1 } }
];

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly lessons: Lesson[] = [
    ...baseLessons.map((lesson) => ({ ...lesson, track: 'Angular' as const })),
    ...additionalLessons.map((lesson) => ({ ...lesson, track: 'Angular' as const })),
    ...webLessons,
    ...webTopicLessons
  ];
  readonly selectedId = signal(1);
  readonly activeTrack = signal<Lesson['track']>('Angular');
  readonly expandedLessonId = signal<number | null>(null);
  readonly expandedQuestionKey = signal<string | null>(null);
  readonly activeFilter = signal('All');
  readonly searchTerm = signal('');
  readonly completed = signal<number[]>(this.loadCompleted());
  readonly quizChoice = signal<number | null>(null);
  readonly quizChecked = signal(false);
  readonly answers = signal<Record<string, number | null>>({});
  readonly checkedAnswers = signal<Record<string, boolean>>({});
  readonly showInterview = signal(false);
  readonly expandedInterviewTopic = signal<number | null>(null);
  readonly interviewTrack = signal<Lesson['track']>('Angular');
  readonly liveInterview = signal(false);
  readonly liveQuestionIndex = signal(0);
  readonly liveChoice = signal<number | null>(null);
  readonly liveAnswered = signal(false);
  readonly liveScore = signal(0);
  readonly liveSeconds = signal(30);
  readonly tracks: Lesson['track'][] = ['Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript'];
  readonly filters = ['All', 'Start here', 'Build the basics', 'Build real apps', 'Go further'];
  readonly trackLessons = computed(() => this.lessons.filter((lesson) => lesson.track === this.activeTrack()));
  readonly completedInTrack = computed(() => this.trackLessons().filter((lesson) => this.completed().includes(lesson.id)).length);
  readonly selectedLesson = computed(() => {
    const lesson = this.lessons.find((item) => item.id === this.selectedId()) ?? this.lessons[0];
    return { ...lesson, ...lessonGuides[lesson.id], ...this.contentFor(lesson) };
  });
  readonly visibleLessons = computed(() => {
    const filter = this.activeFilter();
    const query = this.searchTerm().trim().toLowerCase();
    return this.trackLessons().filter((lesson) => {
      const matchesChapter = filter === 'All' || lesson.level === filter;
      const matchesSearch = !query || `${lesson.title} ${lesson.summary} ${lesson.tag}`.toLowerCase().includes(query);
      return matchesChapter && matchesSearch;
    });
  });
  readonly progress = computed(() => {
    return Math.round((this.completedInTrack() / this.trackLessons().length) * 100);
  });
  readonly interviewItems = computed(() => this.lessons.filter((lesson) => lesson.track === this.interviewTrack()).map((lesson) => ({ lesson, questions: [...(interviewQuestions[lesson.id] ?? this.contentFor(lesson).questions), ...(realInterviewQuestions[lesson.id] ?? [])] })));
  readonly liveQuestions = computed(() => this.interviewItems().flatMap((item) => item.questions.map((question) => ({ ...question, topic: item.lesson.title }))));
  readonly liveQuestion = computed(() => this.liveQuestions()[this.liveQuestionIndex()] ?? this.liveQuestions()[0]);

  constructor() {
    effect(() => {
      localStorage.setItem('angular-atlas-completed', JSON.stringify(this.completed()));
    });
    effect((onCleanup) => {
      if (!this.liveInterview()) return;
      const timer = window.setInterval(() => {
        if (this.liveAnswered()) return;
        this.liveSeconds.update((seconds) => seconds > 0 ? seconds - 1 : 0);
        if (this.liveSeconds() === 0) this.liveAnswered.set(true);
      }, 1000);
      onCleanup(() => window.clearInterval(timer));
    });
  }

  selectLesson(id: number) {
    this.selectedId.set(id);
    this.quizChoice.set(null);
    this.quizChecked.set(false);
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches) {
      window.setTimeout(() => document.getElementById(`inline-lesson-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }
  }

  selectTrack(track: Lesson['track']) {
    this.activeTrack.set(track);
    this.activeFilter.set('All');
    this.searchTerm.set('');
    this.expandedLessonId.set(null);
    const firstLesson = this.lessons.find((lesson) => lesson.track === track);
    if (firstLesson) this.selectedId.set(firstLesson.id);
  }

  toggleLesson(id: number) {
    const willOpen = this.expandedLessonId() !== id;
    this.selectedId.set(id);
    this.quizChoice.set(null);
    this.quizChecked.set(false);
    this.expandedQuestionKey.set(null);
    this.expandedLessonId.set(willOpen ? id : null);
    if (willOpen && typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches) {
      window.setTimeout(() => document.getElementById(`inline-lesson-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }
  }

  backToTopics() {
    this.expandedLessonId.set(null);
    document.getElementById('lesson-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  updateSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  private loadCompleted(): number[] {
    try {
      const stored = localStorage.getItem('angular-atlas-completed');
      return stored ? JSON.parse(stored) as number[] : [];
    } catch {
      return [];
    }
  }

  toggleComplete() {
    const id = this.selectedLesson().id;
    this.completed.update((done) => done.includes(id) ? done.filter((item) => item !== id) : [...done, id]);
  }

  checkQuiz() {
    if (this.quizChoice() !== null) this.quizChecked.set(true);
  }

  chooseAnswer(key: string, answer: number) {
    this.answers.update((answers) => ({ ...answers, [key]: answer }));
    this.checkedAnswers.update((answers) => ({ ...answers, [key]: false }));
  }

  checkAnswer(key: string) {
    if (this.answers()[key] !== null && this.answers()[key] !== undefined) {
      this.checkedAnswers.update((answers) => ({ ...answers, [key]: true }));
    }
  }

  toggleAnswer(key: string) {
    this.checkedAnswers.update((answers) => ({ ...answers, [key]: !(answers[key] ?? false) }));
  }

  toggleInterviewTopic(id: number) {
    this.expandedInterviewTopic.update((current) => current === id ? null : id);
  }

  selectInterviewTrack(track: Lesson['track']) {
    this.interviewTrack.set(track);
    this.expandedInterviewTopic.set(null);
    this.stopLiveInterview();
  }

  startLiveInterview() {
    this.liveQuestionIndex.set(0);
    this.liveChoice.set(null);
    this.liveAnswered.set(false);
    this.liveScore.set(0);
    this.liveSeconds.set(30);
    this.liveInterview.set(true);
  }

  stopLiveInterview() {
    this.liveInterview.set(false);
    this.liveChoice.set(null);
    this.liveAnswered.set(false);
  }

  submitLiveAnswer() {
    if (this.liveChoice() === null || this.liveAnswered()) return;
    this.liveAnswered.set(true);
    if (this.liveChoice() === this.liveQuestion().answer) this.liveScore.update((score) => score + 1);
  }

  nextLiveQuestion() {
    const next = this.liveQuestionIndex() + 1;
    if (next >= this.liveQuestions().length) {
      this.stopLiveInterview();
      return;
    }
    this.liveQuestionIndex.set(next);
    this.liveChoice.set(null);
    this.liveAnswered.set(false);
    this.liveSeconds.set(30);
  }

  interviewCount(track: Lesson['track']) {
    return this.lessons.filter((lesson) => lesson.track === track).length;
  }

  toggleQuestion(key: string) {
    this.expandedQuestionKey.update((current) => current === key ? null : key);
  }

  answerFor(key: string) {
    return this.answers()[key] ?? null;
  }

  isAnswerChecked(key: string) {
    return this.checkedAnswers()[key] ?? false;
  }

  questionKey(index: number) {
    return `${this.selectedLesson().id}-${index}`;
  }

  sectionQuestion(sectionIndex: number) {
    const questions = this.selectedLesson().questions;
    return questions[sectionIndex % questions.length];
  }

  sectionQuestionKey(sectionIndex: number) {
    return `section-${this.selectedLesson().id}-${sectionIndex}`;
  }

  interviewKey(lessonId: number, index: number) {
    return `interview-${lessonId}-${index}`;
  }

  private contentFor(lesson: Lesson): DetailedLessonContent {
    if (detailedLessonContent[lesson.id]) return detailedLessonContent[lesson.id];
    const guide = lessonGuides[lesson.id];
    const questions: LessonQuestion[] = [
      { ...lesson.quiz, explanation: 'The correct answer follows from the core concept in this lesson. Re-read the explanation and connect the syntax to the behavior it produces.' },
      { question: `What is the best way to learn ${lesson.title.toLowerCase()}?`, options: ['Read the idea, run the example, then change it', 'Memorize the API without trying it', 'Skip the example and copy a library'], answer: 0, explanation: 'Angular becomes easier when you connect the concept to a small working experiment and then observe what changes.' },
      { question: `Which habit helps when using ${lesson.title.toLowerCase()} in a real application?`, options: ['Model loading, error, and edge states', 'Only design the happy path', 'Put all logic in one component'], answer: 0, explanation: 'Production code needs explicit states, clear ownership, and small responsibilities.' }
    ];
    return {
      sections: [
        { title: 'Core concept', explanation: lesson.concept, example: lesson.example },
        { title: 'Detailed explanation', explanation: guide?.deepDive ?? lesson.concept, example: guide?.deepExample ?? lesson.example, notes: guide?.pitfalls },
        { title: 'Step-by-step practice', explanation: 'Work through these steps in a small Angular feature. Pause after each step and run the app so you can see the connection between the code and the screen.', example: guide?.steps.map((step, index) => `${index + 1}. ${step}`).join('\n') ?? '1. Read the example.\n2. Run it.\n3. Change one value.\n4. Test an edge case.' },
        { title: 'Common mistakes', explanation: 'These are the mistakes that commonly make this topic confusing or fragile. Treat them as a debugging checklist when your feature behaves unexpectedly.', example: (guide?.pitfalls ?? ['Skipping the edge cases.', 'Putting unrelated work in the component.', 'Testing only the happy path.']).map((pitfall) => `• ${pitfall}`).join('\n') }
      ],
      questions
    };
  }

  isComplete(id: number) {
    return this.completed().includes(id);
  }
}
