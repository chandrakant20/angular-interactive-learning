import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { Communicate } from 'edge-tts.js';
import { detailedLessonContent } from '../src/app/lesson-sections';

const outputDir = join(process.cwd(), 'public', 'audio');
const voice = process.env.EDGE_TTS_VOICE ?? 'en-US-EmmaMultilingualNeural';
const rate = process.env.EDGE_TTS_RATE ?? '-8%';

async function generateAudio() {
  mkdirSync(outputDir, { recursive: true });

  for (const [lessonId, content] of Object.entries(detailedLessonContent)) {
    for (const [sectionIndex, section] of content.sections.entries()) {
      const output = join(outputDir, `lesson-${lessonId}-section-${sectionIndex}.mp3`);
      const text = `${section.title}. ${section.explanation}. Example. ${section.example}`;
      await new Communicate(text, voice, { rate }).save(output);
      console.log(`Generated ${output}`);
    }
  }
}

generateAudio().catch((error: unknown) => {
  console.error('Audio generation failed:', error);
  process.exitCode = 1;
});
