# Ripple Brief

Daily briefing: world politics → world economy → Lebanon's economy, with impact scores, sources, trends and a personal wallet.
Developer: SCK

- **Use it:** open https://nadermazbouh.github.io on your phone and choose **Install app**. It works offline with the last briefing it loaded.
- **Updates:** the briefing data in `data/` is refreshed every day.
- **Privacy:** the wallet, price alerts and settings you enter stay on your phone. Nothing you type is uploaded. If you turn on the morning notification, your browser's notification address (a random code) and your language are stored in Google Firebase only so the notification can be sent; turning it off deletes them.
- **Morning notification:** one per day, sent by `.github/workflows/morning-push.yml` (`tools/send_push.py`) right after the day's brief is published.
- **Accuracy:** briefings are researched and written by AI (Claude) from the linked news sources. Impact scores, scenario probabilities and lines marked "Analysis" are judgments, not facts. This is information only, not financial, investment or security advice.

`tools/` holds the scripts used to build the site and refresh the data.
