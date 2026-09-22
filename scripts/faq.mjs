import { download } from "./components.mjs";
export const faqGroups = [
  [
    "The calendar trick",
    [
      [
        "What is Otter Day?",
        "Otter Day is a calendar logic game for iPhone and Android. It teaches you to work out the day of the week for a date using a mental calculation method, then turns practice into a puzzle game with guided tutorials, levels and progress.",
      ],
      [
        "How can I find the weekday of any date in my head?",
        'Give the day, month and year a small code, add the codes, then remove complete groups of seven. The remainder tells you the weekday. Start with our <a href="/guide/">step-by-step calendar calculation guide</a>, including month codes, year codes and worked examples.',
      ],
      [
        "Is this the Doomsday algorithm?",
        "It solves the same problem as John Conway’s Doomsday algorithm, but Otter Day teaches a code-based calculation: day code + month code + year code. Doomsday instead uses memorable anchor dates. Both use the repeating seven-day week; their tables and steps should not be mixed.",
      ],
      [
        "Do I need to be good at maths?",
        "You need small additions, division with a remainder and some practice remembering codes. You do not need advanced maths. Learn one part at a time, then put the pieces together.",
      ],
      [
        "Can I really name a weekday in five seconds?",
        "Five seconds is a training goal, not a promise. Start with accurate answers and a familiar year. Recognition and shortcuts can make the calculation quicker with practice; your pace will be your own.",
      ],
      [
        "Which dates and calendar does the method use?",
        'The method uses the Gregorian calendar. Six game levels widen the range from the current year to 1700–2099 in Level 6. For older dates, the calculation treats the Gregorian rules as extending backwards; a historical local calendar may give a different result. The <a href="/guide/#centuries">guide explains century and leap-year rules</a>.',
      ],
    ],
  ],
  [
    "Learning and playing",
    [
      [
        "How do the tutorials and levels work?",
        "The guided learning path introduces the pieces of the weekday calculation. Game levels then expand your date range, from this year through neighbouring years and into other centuries. Practice the method before chasing speed.",
      ],
      [
        "What is Speed Academy?",
        "Speed Academy helps you combine the method with mental shortcuts. It focuses on recognizing patterns and reducing the amount of calculation, so you can work toward faster answers. Month Codes and Year Codes practice help you rehearse individual parts.",
      ],
      [
        "Can I read dates, hear dates, or say the answer out loud?",
        "Yes. The app offers written dates and audio date challenges, with touch or voice input. Combine spoken dates and spoken answers for hands-free play. Audio and voice features are part of Pro and depend on supported device speech features and permissions. The small website challenge uses text only; Liv never plays audio here.",
      ],
      [
        "What is Otter IQ?",
        "Otter IQ is an in-game progress score that reflects your learning and play. It gives your calendar practice a visible sense of progress. It is not a clinical IQ score or a measure of general intelligence.",
      ],
      [
        "What are streaks and the otter crystal?",
        "Streaks reward returning to your practice. The otter crystal gives that daily habit a visual home. Open the streak area in the app to see your current progress and the rules for keeping it going.",
      ],
      [
        "Does Otter Day have home-screen widgets?",
        "The upcoming version adds an otter companion and streak information to your home screen. Widget availability depends on your platform and installed app version. Feature previews on this website show the upcoming experience.",
      ],
      [
        "Can I play on this website?",
        'Try six sample dates on the <a href="/#try">homepage</a>. Tap Ask Liv for a hint, or choose a weekday yourself. The full tutorials, progression and game modes live in the mobile app.',
      ],
    ],
  ],
  [
    "Getting the app",
    [
      [
        "Is Otter Day free?",
        "Otter Day is free to download, with optional in-app purchases. Core and Pro unlock additional features; Pro includes audio and voice play. Prices and available offers are shown in your local App Store, Google Play and the app before purchase.",
      ],
      [
        "Is it available for iPhone and Android?",
        'Yes. Download Otter Day from the <a href="https://apps.apple.com/us/app/otterday-calendar-logic-game/id6747994124">App Store</a> or <a href="https://play.google.com/store/apps/details?id=fpdigitallabs.otter">Google Play</a>. The store listing shows current device and operating-system requirements.',
      ],
      [
        "Which languages are supported?",
        "The current store release supports English, German, French, Spanish and Portuguese. Available speech features can vary by device and language. This website and its calendar guide are available in all five languages. Use the language menu to switch.",
      ],
      [
        "Does it need an internet connection?",
        "Some services, including store purchases, advertisements and connected features, require internet access. Speech availability also depends on your device. Do not assume every feature will work offline.",
      ],
      [
        "How do I restore a purchase or get help?",
        'Use the restore-purchases option in the app while signed in to the store account used for the original purchase. For further help, email <a href="mailto:felix.digitallabs@proton.me">felix.digitallabs@proton.me</a> with your device, app version and a description of the issue. Do not include passwords or payment details.',
      ],
      [
        "What information does the app collect?",
        'See the <a href="/privacypolicy/">privacy policy</a> for the app’s data practices, optional analytics and third-party services. This website’s date challenge runs locally in your browser; it does not request microphone access.',
      ],
      [
        "Did Otter Day win Shipaton 2025?",
        'Yes. Otter Day won first place in the Best Vibes category at RevenueCat’s Shipaton 2025. Read the <a href="https://www.revenuecat.com/blog/company/shipaton-2025-winners/#best-vibes-award">official winner announcement</a> and <a href="https://felixplagge.dev/#/about/otter">Felix’s account of the award and his trip to New York</a>.',
      ],
    ],
  ],
];
export const faq = `<div class="wrap"><header class="page-head"><p class="breadcrumb"><a href="/">Otter Day</a> / FAQ</p><span class="eyebrow">A LITTLE CLARITY</span><h1>Curious?<br>You’re in the right place.</h1><p class="lead">The calendar trick, the game, and everything around it.</p></header><div class="faq-list">${faqGroups.map(([title, items]) => `<section class="faq-group"><h2>${title}</h2>${items.map(([question, answer]) => `<details class="faq-item"><summary>${question}</summary><div><p>${answer}</p></div></details>`).join("")}</section>`).join("")}</div></div>${download}`;
