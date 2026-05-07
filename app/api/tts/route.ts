import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase with Service Role Key for administrative storage access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { text, voiceId } = await req.json();
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY;

    if (!text) return NextResponse.json({ error: 'Text is required' }, { status: 400 });

    // 1. Generate a unique hash for this text + voice combination
    const hash = crypto.createHash('md5').update(`${voiceId}-${text}`).digest('hex');
    const fileName = `${hash}.mp3`;
    const bucketName = 'protocol-audio';

    // 2. Check if the file already exists in Supabase Storage
    const { data: existingFile } = await supabaseAdmin
      .storage
      .from(bucketName)
      .getPublicUrl(fileName);

    // Check if file actually exists by trying to fetch its metadata or just head request
    const { data: fileList } = await supabaseAdmin
      .storage
      .from(bucketName)
      .list('', { search: fileName });

    if (fileList && fileList.length > 0) {
      console.log('Serving cached audio from Supabase:', fileName);
      const { data: fileData, error: downloadError } = await supabaseAdmin
        .storage
        .from(bucketName)
        .download(fileName);

      if (!downloadError && fileData) {
        return new Response(fileData, {
          headers: { 'Content-Type': 'audio/mpeg', 'X-Cached': 'true' },
        });
      }
    }

    // 3. If not cached, call ElevenLabs
    if (!elevenLabsKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    console.log('Generating new audio from ElevenLabs...');
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || 'pNInz6obpgDQGcFmaJgB'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();

    // 4. Cache the new audio in Supabase for future use
    const { error: uploadError } = await supabaseAdmin
      .storage
      .from(bucketName)
      .upload(fileName, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (uploadError) {
      console.error('Failed to cache audio in Supabase:', uploadError);
      // We still return the audio even if caching fails
    }

    return new Response(audioBuffer, {
      headers: { 'Content-Type': 'audio/mpeg', 'X-Cached': 'false' },
    });
  } catch (error) {
    console.error('TTS Caching Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
