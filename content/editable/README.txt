Editable site copy (UTF-8)

biography.txt
  Separate paragraphs with one or more blank lines. Each block becomes one paragraph on the home page.

research-interests.txt
  One bullet per line. Empty lines are ignored.

news.txt
  News blocks separated by a line containing only ---. Each block: line 1 = date, line 2 = Y (with image) or N (text only), following lines = news text.
  Dates written as YYYY-MM (e.g. 2026-04) display as "Apr 2026" and are grouped by year.
  Each item gets a filter category from its wording (first match wins; rules in content/news.ts):
    Publication  "Our paper", "accepted for publication", "published"
    Grant        "funded", "grant", "launched a new"
    Talk         "Presented", "Reported", "keynote", "invited talk"
    Outreach     "Organized", "site visit", "seminar", "student chapter"
    Milestone    "Joined", "Earned", "graduated", "appointed", "award"
    Update       anything else

news-image-paths.txt
  One image path per line (under public/), only for items marked Y in news.txt, in the same top-to-bottom order. See news-readme.txt.

publications.txt
  One publication citation per paragraph; separate citations with a blank line.

students-home.txt
  Short text for the home-page Students section (paragraphs separated by blank lines).

students-recruitment.txt
  Full /students page. Separate blocks with one blank line. Plain blocks are paragraphs. For a titled section, start the block with a line like ## How to apply, then continue on the next lines with the body (no blank line between the ## line and the body).

Research projects live in: ../research-projects/ (numbered folders 01, 02, …)
See ../research-projects/README.txt for file names in each project folder.

After saving .txt files, save the file and refresh the site (dev) or rebuild (production).
