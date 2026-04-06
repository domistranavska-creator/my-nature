-- Moja zahrada
-- Doplnok pre bucket mojazahrada-images, aby prijal aj videa z dennika.

update storage.buckets
set
  file_size_limit = 104857600,
  allowed_mime_types = array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
where id = 'mojazahrada-images';
