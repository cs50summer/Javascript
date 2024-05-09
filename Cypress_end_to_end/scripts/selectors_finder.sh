#!/bin/sh

SRC_SELECTORS=$(grep -hro -e 'data-cy="[^"]*"' -e 'dataCy="[^"]*"' ../../pages ../../src | cut -d \" -f2 | sort | uniq)
# echo $SRC_SELECTORS | sed "s/ /'\n| '/g; s/^/&| '/; s/.$/&'/;" | cat > ../support/@types/selectors.d.ts

MANUAL_SRC_SELECTORS=$(grep -hro -e '"[^"]*"' ../support/@types/manualSelectors.txt | cut -d \" -f2 | sort | uniq)
ALL_SELECTORS="$SRC_SELECTORS $MANUAL_SRC_SELECTORS"
ALL_SELECTORS=$(echo $ALL_SELECTORS | xargs -n1 | sort | xargs)
echo $ALL_SELECTORS | sed "s/ /'\n| '/g; s/^/&| '/; s/.$/&'/;" | cat > ../support/@types/selectors.d.ts

ex ../support/@types/selectors.d.ts <<eof
1 insert
export type Selectors =
.
xit
eof
