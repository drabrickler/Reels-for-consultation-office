#!/usr/bin/env bash
# Ensambla slides/*.png en un reel MP4 1080x1920, 30 fps, con zoom suave y fundidos.
set -euo pipefail
cd "$(dirname "$0")/.."
DUR=(5 26)   # segundos por slide (tiempo de lectura)
FADE=0.5; FPS=30
inputs=(); filt=""; 
for i in "${!DUR[@]}"; do
  n=$(printf "%02d" $((i+1))); d=${DUR[$i]}
  frames=$(python3 -c "print(int(($d+$FADE)*$FPS))")
  inputs+=(-framerate $FPS -loop 1 -t $(python3 -c "print($d+$FADE)") -i slides/slide-$n.png)
  filt+="[$i:v]scale=2160:3840:flags=lanczos,zoompan=z='1+0.035*on/$frames':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=$FPS,format=yuv420p[v$i];"
done
prev="v0"; off=0
for i in $(seq 1 $((${#DUR[@]}-1))); do
  off=$(python3 -c "print($off+${DUR[$((i-1))]})")
  filt+="[$prev][v$i]xfade=transition=fade:duration=$FADE:offset=$off[x$i];"; prev="x$i"
done
ffmpeg -y -loglevel error "${inputs[@]}" -filter_complex "${filt%;}" -map "[$prev]" \
  -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart quien-es-la-dra-brickler.mp4
