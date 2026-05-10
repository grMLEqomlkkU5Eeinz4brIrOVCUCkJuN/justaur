#!/bin/bash
OUT="shapes"
mkdir -p "$OUT"

# -Si: sync info (repo package, key:value format)
pacman -Si firefox > "$OUT/si-single.txt" 2>&1

# -Si: multiple packages at once
pacman -Si firefox chromium git > "$OUT/si-multi.txt" 2>&1

# -Qi: local query info (installed package, has Install Date/Reason)
pacman -Qi chromium > "$OUT/qi-single.txt" 2>&1

# -Qi: multiple
pacman -Qi chromium bash > "$OUT/qi-multi.txt" 2>&1

# -Ss: search (repo/name version + description pairs)
pacman -Ss firefox > "$OUT/ss-search.txt" 2>&1

# -Q: list installed (name version, one per line)
pacman -Q | head -30 > "$OUT/q-list.txt" 2>&1

# -Qm: foreign/AUR-installed packages
pacman -Qm > "$OUT/qm-foreign.txt" 2>&1

# -Qs: search installed
pacman -Qs chromium > "$OUT/qs-search.txt" 2>&1

# AUR RPC: search
curl -s "https://aur.archlinux.org/rpc/v5/search/yay?by=name" | python3 -m json.tool > "$OUT/aur-search.json" 2>&1

# AUR RPC: info
curl -s "https://aur.archlinux.org/rpc/v5/info?arg[]=yay&arg[]=paru" | python3 -m json.tool > "$OUT/aur-info.json" 2>&1

echo "Dumped to $OUT/"
ls -1 "$OUT/"
