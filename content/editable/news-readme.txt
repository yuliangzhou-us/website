NEWS (news.txt + news-image-paths.txt)

news.txt — one item per block, blocks separated by a line containing only ---

Each block has exactly this shape:
  Line 1: date (e.g. 2026-03)
  Line 2: Y or N  →  Y = show an image for this item; N = text only
  Line 3+: the news text (can be several lines; they are joined into one paragraph)

You only edit Y/N and the text (and dates). Do not type image URLs here.

news-image-paths.txt — one image path per line, in order, ONLY for items that use Y in news.txt (from top to bottom).

Example: if the first three blocks are Y, Y, N, Y, this file should have exactly three lines for those three Y items (first line → first Y, second line → second Y, third line → fourth Y).

Paths are under public/, e.g. /news/my-photo.svg

When you add a new Y item, add a new line here (or ask in Cursor to set the path). When you change an item from Y to N, remove the matching line from this file so counts stay aligned.
