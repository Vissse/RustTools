#!/usr/bin/env bash
set -euo pipefail

SRC="public/images/fluid.combiner.png"
OUT="public/images/fluid.combiner.webp"

cwebp -q 100 -resize 64 64 "$SRC" -o "$OUT"
echo "Wrote $OUT"
