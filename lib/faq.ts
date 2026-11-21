// Frequently asked questions for the /faq page and its FAQPage JSON-LD.
// Single source of truth for both, so the visible answers and the structured
// data cannot drift apart.
//
// RULE: every answer is restated from a fact already published elsewhere in
// this repo. The comment above each entry names the exact file and field it
// came from. Do not add a fact here that is not already on the site; if the
// church has not said it anywhere, ask the owner first.

import { SITE } from "@/lib/site";

export interface FaqLink {
  label: string;
  href: `/${string}`;
}

export interface FaqItem {
  id: string;
  question: string;
  /** Plain text. Used verbatim for both the page and the JSON-LD answer. */
  answer: string;
  /** Internal pages that go deeper. Shown on the page only. */
  links?: FaqLink[];
}

const ADDRESS = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

export const FAQ_ITEMS: FaqItem[] = [
  // Source: lib/site.ts SITE.address (street, city, region, postalCode);
  // app/visit/page.tsx info card "Sunday Service" ("Sunday School 9:25 AM",
  // "Service 10:30 AM ET") and faqs[1] ("about 2 hours (10:30 AM – 12:30 PM ET)").
  {
    id: "services",
    question: "When and where are your Sunday services?",
    answer: `We meet at ${ADDRESS}. Sunday School begins at 9:25 AM and the main service starts at 10:30 AM ET. Sunday services typically run about 2 hours, until around 12:30 PM ET.`,
    links: [{ label: "Plan your visit", href: "/visit" }],
  },

  // Source: app/online/page.tsx `schedule` (Wednesday Bible Study 7:00 PM ET
  // "Online Only"; Friday Wakati Itusile 7:00 PM ET "Online Only"; Daily
  // Morning Prayer Line 5:00 AM ET, (857) 216-6700, code 531312);
  // app/visit/page.tsx faqs[3] ("Wednesday and Friday services are online-only").
  {
    id: "midweek",
    question: "Do you meet during the week?",
    answer:
      "Yes, online. Bible Study is on Wednesdays at 7:00 PM ET and Wakati Itusile is on Fridays at 7:00 PM ET. Both are online only. There is also a daily Morning Prayer Line at 5:00 AM ET, open to everyone: call (857) 216-6700 and enter access code 531312.",
    links: [
      { label: "Watch online", href: "/online" },
      { label: "Prayer line", href: "/prayer" },
    ],
  },

  // Source: app/online/page.tsx `platforms` (Zoom "Our online room for every
  // service"; YouTube "Live every Sunday & replays"; Facebook "Stream +
  // community discussion") and `schedule`; app/visit/page.tsx faqs[3]
  // ("All Sunday services are streamed live").
  {
    id: "watch-online",
    question: "Can I watch the service online?",
    answer:
      "Yes. Every Sunday service is streamed live at 10:30 AM ET. Watch on YouTube (live, with replays) or Facebook, or join us on Zoom, our online room for every service. The Wednesday and Friday services are online only.",
    links: [{ label: "Watch online", href: "/online" }],
  },

  // Source: app/visit/page.tsx faqs[4] ("It's primarily in Yoruba, our mother
  // tongue..."); app/online/page.tsx `schedule` (Friday, Wakati Itusile, 7:00
  // PM ET, Online Only); app/calendar/page.tsx (Friday, "High-energy Yoruba
  // worship in our mother tongue. Online."); app/layout.tsx description
  // ("with Yoruba worship").
  {
    id: "yoruba",
    question: "Is there Yoruba worship? Do I need to speak Yoruba?",
    answer:
      "Yes. Wakati Itusile, on Fridays at 7:00 PM ET, is high-energy worship primarily in Yoruba, our mother tongue, and it is held online. You do not need to speak the language: even without it, the worship and the presence of God carry across.",
    links: [{ label: "Watch online", href: "/online" }],
  },

  // Source: app/about/page.tsx "Our Story" paragraph ("Part of the worldwide
  // Christ Apostolic Church — one of Africa's largest Pentecostal
  // denominations — and its North American body, CAC North America (CACNA).");
  // app/about/page.tsx hero + "Our Mandate" (mandate, purpose, promise).
  {
    id: "what-is-cac",
    question: "What is Christ Apostolic Church (CAC)?",
    answer:
      "Christ Apostolic Church is a worldwide Pentecostal denomination, one of the largest in Africa. CAC Salvation Center is part of it and of its North American body, CAC North America (CACNA). Our mandate is to preach the whole Gospel in a clear and undiluted manner, and our purpose is to build God's ambassadors here on earth.",
    links: [{ label: "About us", href: "/about" }],
  },

  // Source: app/about/page.tsx "Our Story" ("Founded in Baltimore in 2002 ...
  // parent assembly — C.A.C Salvation Centre, Ilorin, Nigeria — established
  // on July 6, 1997, under Pastor Dr. H.O. Ilufoye") and "Heritage" ("The
  // Baltimore-Maryland DCC was planted in the United States").
  {
    id: "history",
    question: "How did the church begin?",
    answer:
      "CAC Salvation Center was founded in Baltimore in 2002. It grew from the vision of its parent assembly, C.A.C Salvation Centre, Ilorin, Nigeria, which was established on July 6, 1997, under Pastor Dr. H.O. Ilufoye.",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our roots in Ilorin", href: "/ilorin" },
    ],
  },

  // Source: app/visit/page.tsx faqs[0] ("Come as you are. Some members dress
  // formally, others casually"), faqs[2] ("we have a dedicated Kids Ministry
  // for children during Sunday service"), "Your First Sunday" step 02 ("Our
  // welcome team greets you at the door. Parking is available.") and step 04
  // ("Stay for coffee and conversation"); app/ministries/page.tsx Children's
  // Ministry ("Sunday School begins at 9:25 AM").
  {
    id: "first-visit",
    question: "What should I expect on my first visit?",
    answer:
      "Come as you are: some members dress formally, others casually, and all are equally welcome. Our welcome team greets you at the door, and parking is available. There is a dedicated Kids Ministry for children during Sunday service. Stay afterwards for coffee and conversation, and fill out the connect card if you would like us to welcome you properly.",
    links: [{ label: "Plan your visit", href: "/visit" }],
  },

  // Source: lib/site.ts SITE.telephone ("+1-443-272-6794"), SITE.email
  // ("info@cacsalvationcenter.org"), SITE.address; app/visit/page.tsx info
  // card "Phone" (second number +1 410-701-8315); app/contact/page.tsx
  // (contact form with subjects such as "First Visit" and "Prayer Request").
  {
    id: "contact",
    question: "How do I contact the church?",
    answer: `Call (443) 272-6794 or (410) 701-8315, email ${SITE.email}, or use the contact form on our Contact page. You can also visit us at ${ADDRESS}.`,
    links: [{ label: "Contact us", href: "/contact" }],
  },

  // Source: app/giving/page.tsx: ZELLE constant ("(443) 675-8889") and the
  // Zelle card ("add your name + fund ... in the memo"); `funds` ("Tithes &
  // Offerings", "Missions", "Building Fund"); the Tithe.ly "Give online
  // securely" section; the Givelify card (search "CAC Salvation Center ·
  // Randallstown"); "More ways to give" > "In person" ("Cash or check
  // (payable to CAC Salvation Center) during any Sunday service").
  {
    id: "giving",
    question: "How do I give?",
    answer:
      'You can give by Zelle to (443) 675-8889, adding your name and the fund (Tithes & Offerings, Missions, or Building Fund) in the memo. You can also give by card online through Tithe.ly, or on Givelify by searching for "CAC Salvation Center · Randallstown". In person, give cash or a check payable to CAC Salvation Center during any Sunday service.',
    links: [{ label: "Give", href: "/giving" }],
  },

  // Source: app/building/page.tsx hero paragraph ("a permanent home for the
  // Salvation Center family — a sanctuary for worship, a hall for discipleship,
  // a wing for youth, and a base for missions"); app/giving/page.tsx building
  // band ("multi-million dollar building project ... in Randallstown. Every
  // gift to the Building Fund").
  {
    id: "building-project",
    question: "What is the building project?",
    answer:
      "It is a multi-million dollar project to build a permanent home for the Salvation Center family in Randallstown: a sanctuary for worship, a hall for discipleship, a wing for youth, and a base for missions. Gifts can be directed to the Building Fund.",
    links: [
      { label: "Building project", href: "/building" },
      { label: "Give", href: "/giving" },
    ],
  },

  // Source: app/leadership/page.tsx `featured` (Pastor Dr. Hezekiah O.
  // Ilufoye, PhD; "Baltimore DCC Superintendent · First Lady"; partner Evang.
  // Mrs Victoria Ilufoye) and `team` (Felix Osunkiyesi, Curate; Alfred Aremo,
  // Oludapo Eludoyin, Oyedeji Ojo, Associate Pastors; Enoch Ilufoye, Assembly
  // Pastor, CAC Kingdom Embassy). Same list as lib/site.ts churchJsonLd() employee.
  {
    id: "pastors",
    question: "Who are the pastors?",
    answer:
      "Pastor Dr. Hezekiah O. Ilufoye, PhD, is the Baltimore DCC Superintendent, and he leads the family together with the First Lady, Evang. Mrs Victoria Ilufoye. Pastor Felix Osunkiyesi is the Curate. Pastor Alfred Aremo, Pastor Oludapo Eludoyin and Pastor Oyedeji Ojo are Associate Pastors. Pastor Enoch Ilufoye is the Assembly Pastor of CAC Kingdom Embassy, part of the Baltimore DCC family.",
    links: [{ label: "Meet our pastors", href: "/leadership" }],
  },

  // Source: app/ministries/page.tsx `ministries` (Worship & Choir; Women's
  // Fellowship; Youth & Young Adults; Children's Ministry; Prayer &
  // Intercession; Media & Online; Macedonia Outreach) and `groupCategories`
  // (Brothers' Fellowships, Sisters' Fellowships, Service & Departments).
  {
    id: "ministries",
    question: "What ministries and groups are there?",
    answer:
      "Worship & Choir, Women's Fellowship, Youth & Young Adults, Children's Ministry, Prayer & Intercession, Media & Online, and Macedonia Outreach, an annual mission to rural ministers in hard-to-reach places. There are also brothers' and sisters' fellowships, and service teams such as Ushers and Protocols.",
    links: [{ label: "Ministries", href: "/ministries" }],
  },

  // Source: app/prayer/page.tsx metadata.description ("Share a prayer request
  // with the pastoral team ... Confidential, personal, and covered in prayer")
  // and the Daily Prayer Line band (5:00 AM ET, (857) 216-6700).
  {
    id: "prayer-request",
    question: "How can I send a prayer request?",
    answer:
      "Use the prayer request form on our Prayer page to share a request with the pastoral team. It is confidential, personal, and covered in prayer. You can also join the daily prayer line at 5:00 AM ET on (857) 216-6700.",
    links: [{ label: "Prayer requests", href: "/prayer" }],
  },

  // Source: app/salvation/page.tsx `steps` (Acknowledge, Believe, Confess,
  // Connect) and the closing band ("If you just prayed this prayer sincerely,
  // we would love to celebrate with you and walk with you").
  {
    id: "salvation",
    question: "How do I give my life to Christ?",
    answer:
      "Acknowledge that you are a sinner in need of God's grace, believe that Jesus Christ died for your sins and rose again, confess Jesus as Lord, and join a community of believers. If you pray that prayer sincerely, let us know and we will celebrate with you and walk with you in your new faith journey.",
    links: [{ label: "Salvation", href: "/salvation" }],
  },

  // Source: app/venue/page.tsx metadata.description ("Rent our hall and
  // on-site parking lot ... Contact us for pricing and availability.") and
  // `SPACES` (Main Hall, Parking Lots); lib/site.ts SITE.email.
  {
    id: "hall-rental",
    question: "Can I rent the hall for an event?",
    answer: `Yes. The church rents its main hall and on-site parking lots for weddings, birthdays, conferences, seminars and community events. Contact us for pricing and availability at ${SITE.email}.`,
    links: [{ label: "Hall rental", href: "/venue" }],
  },
];

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
