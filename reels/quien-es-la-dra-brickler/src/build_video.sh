#!/usr/bin/env bash
# 2 slides -> reel MP4 1080x1920, 30 fps. Slide 1 con zoom suave; slide 2 fijo. Fundido entre ambos.
set -euo pipefail
cd "$(dirname "$0")/.."
FPS=30; FADE=0.5; D1=5; D2=45   # segundos por slide
f1=$(python3 -c "print(int(($D1+$FADE)*$FPS))")
f2=$(python3 -c "print(int(($D2+$FADE)*$FPS))")
ffmpeg -y -loglevel error \
 -framerate $FPS -loop 1 -t $(python3 -c "print($D1+$FADE)") -i slides/slide-01.png \
 -framerate $FPS -loop 1 -t $(python3 -c "print($D2+$FADE)") -i slides/slide-02.png \
 -filter_complex "
 [0:v]scale=2160:3840:flags=lanczos,zoompan=z='1+0.035*on/$f1':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=$FPS,format=yuv420p[a];
 [1:v]format=yuv420p[b];
 [a][b]xfade=transition=fade:duration=$FADE:offset=$D1[o]" \
 -map "[o]" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart quien-es-la-dra-brickler.mp4
