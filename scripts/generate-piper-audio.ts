import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { detailedLessonContent } from '../src/app/lesson-sections';

const root = process.cwd();
const outputDir = join(root, 'public', 'audio');
const voiceDir = join(root, '.tools', 'piper-voices');
const piper = join(root, '.tts-env', 'bin', 'python');

mkdirSync(outputDir, { recursive: true });

for (const [lessonId, content] of Object.entries(detailedLessonContent)) {
  content.sections.forEach((section, sectionIndex) => {
    const output = join(outputDir, `lesson-${lessonId}-section-${sectionIndex}.wav`);
    const text = `${section.title}. ${section.explanation}. Example. ${section.example}`;
    const result = spawnSync(piper, ['-m', 'piper', '-m', 'en_US-lessac-medium', '--data-dir', voiceDir, '--output_file', output], {
      input: `${text}\n`,
      encoding: 'utf8',
      stdio: ['pipe', 'inherit', 'inherit']
    });
    if (result.status !== 0) throw new Error(`Piper failed for lesson ${lessonId}, section ${sectionIndex}`);
    console.log(`Generated ${output}`);
  });
}
