export type PostCategory = "Event Spotlight" | "Devotional" | "Ministry Update" | "Reflection";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateIso: string;
  category: PostCategory;
  categoryColor: string;
  accent: string;
  readTime: string;
  featured?: boolean;
  href?: string;
  body: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "good-women-anniversary-2026",
    title: '2026 Good Women Anniversary — "Who Are You?"',
    excerpt:
      "On Sunday, June 28 the Baltimore DCC Good Women gather under a theme drawn from 1 Kings 3:16–27. Here is everything you need to know before you come.",
    date: "June 22, 2026",
    dateIso: "2026-06-22",
    category: "Event Spotlight",
    categoryColor: "#D62828",
    accent: "linear-gradient(135deg,#9E1B1B,#D62828)",
    readTime: "3 min read",
    featured: true,
    href: "/events/good-women-anniversary",
    body: [
      "The Baltimore District Coordinating Council Good Women have chosen a theme that cuts straight to the heart: _Who Are You — Mother or Murderer?_ Drawn from Solomon's judgment in 1 Kings 3:16–27, the question is not about biology. It is about the posture of the soul.",
      "A mother gives. She intercedes, protects, and endures loss rather than see the child destroyed. The woman in that throne room was willing to lose custody rather than lose the child's life. Solomon saw it instantly — that readiness to suffer for another is the mark of genuine love.",
      "The Good Women of our district will spend one morning sitting with that question: in my home, in my church, in my community — am I giving life or taking it? The service begins at **11:00 AM on Sunday, June 28, 2026**. Pastor Dr. H.O. Ilufoye, Pastor S.O. Oladele (CAC President), and Pastor Dr. T.O.A. Agbeja will minister the Word. Evangelists Bisi Benson and Buky Awosanya come as guest ministers. All are welcome.",
    ],
  },
  {
    slug: "god-builds-the-house",
    title: "The God who builds the house.",
    excerpt:
      "On Psalm 127, the Building Project, and why every nail driven and every dollar given must begin in the Lord's hands.",
    date: "June 15, 2026",
    dateIso: "2026-06-15",
    category: "Devotional",
    categoryColor: "#F15F22",
    accent: "linear-gradient(135deg,#F15F22,#D62828)",
    readTime: "4 min read",
    body: [
      '_\"Unless the Lord builds the house, the builders labor in vain.\"_ — Psalm 127:1',
      "There is a temptation, in any building project, to treat prayer as the opening ceremony and the real work as everything that comes after. We ask God to bless the effort, then we step in and manage it ourselves. Psalm 127 will not allow this.",
      "The psalm belongs to Solomon — a man who literally built the most famous house of God the ancient world had seen, and who also wrote, later in life, that all his labor was _vanity_. He knew both sides of the warning.",
      "The Salvation Center's building initiative is not just a construction project. Every phase — the architectural plans, the fundraising, the permits, the congregation's sacrificial giving — is an act of worship or it is noise. What distinguishes them is whether the Lord is at the center or at the margins.",
      "This is not mystical passivity. Solomon also built. He organized labor, sourced cedar from Lebanon, oversaw artisans. The Psalm does not say \"unless the Lord builds, do nothing.\" It says that your labor, however skilled, however persistent, produces nothing that lasts unless it is aligned with what God is already doing.",
      "In your home, are you building something or merely occupying space? In your marriage, are you constructing a covenant or maintaining a contract? Psalm 127 begins with the house but it ends with children — the next generation is the fruit of a home the Lord has built. **Pray first. Give from trust, not obligation. And labor hard, knowing that the One who commanded you to build also guarantees the completion.**",
    ],
  },
  {
    slug: "cacna-2026-what-to-expect",
    title: "CACNA 2026 — what to expect.",
    excerpt:
      "Six days of worship and the Word at CAC Village, Blue Ridge Summit PA — July 13–18. Here is how to prepare, what to pack, and why you should not miss it.",
    date: "June 10, 2026",
    dateIso: "2026-06-10",
    category: "Ministry Update",
    categoryColor: "#E8A33D",
    accent: "linear-gradient(135deg,#E8A33D,#F15F22)",
    readTime: "4 min read",
    href: "/events/cacna-2026",
    body: [
      "The Christ Apostolic Church North America National Convention returns to CAC Village in Blue Ridge Summit, Pennsylvania from **July 13 to 18, 2026**. This is the gathering where the scattered family of CAC across North America becomes, for one week, a single congregation.",
      "**What to expect.** The convention runs morning and evening sessions, six days. Expect deep worship, extended prayer, and messages from pastors and evangelists across the CAC global fellowship. The village setting means you are not commuting to an arena — you are resident in a camp, taking meals together, going on prayer walks, staying in late-night worship that no one wants to end.",
      "**Who should come.** Everyone. The convention is not a pastors' retreat. Youth services run in parallel to the main sessions. Children's programming is provided. Singles, couples, the elderly — the village is full of people at every stage of life pressing into God together.",
      "**How to prepare.** Registration is open at the CACNA convention website. Secure your accommodation early — village beds are allocated first-come. If you are driving, Blue Ridge Summit is approximately two hours from Randallstown. Carpooling from Salvation Center will be coordinated — speak to any elder or contact the church office.",
      "Pack for outdoor Pennsylvania in July: warm mornings, hot afternoons, cool evenings. Bring a Bible with writing margins. Bring a journal. Leave your calendar empty for six days and come with open hands.",
    ],
  },
  {
    slug: "what-it-means-to-be-ambassadors",
    title: "What it means to be ambassadors.",
    excerpt:
      "2 Corinthians 5:17–20 and the daily call on every believer at the Salvation Center. We are not tourists in this world — we are representatives.",
    date: "May 25, 2026",
    dateIso: "2026-05-25",
    category: "Reflection",
    categoryColor: "#9E1B1B",
    accent: "linear-gradient(135deg,#9E1B1B,#D62828)",
    readTime: "4 min read",
    body: [
      '_\"We are therefore Christ\'s ambassadors, as though God were making his appeal through us.\"_ — 2 Corinthians 5:20',
      "An ambassador does not speak in their own name. They carry the authority of the one who sent them, the message of the one who sent them, and the reputation of the one who sent them. Their personal opinions are, in the formal moment, irrelevant.",
      "Paul's picture of the Christian life is astonishingly bold. God, he says, is making his appeal _through us_. The same God who spoke light into being, who parted the sea, who raised his Son — is now, in this age, choosing to make his appeal through people like us. Through the member who shows up to Tuesday night prayer even when tired. Through the one who forgives when they had every right to retaliate. Through the family that gives to the building fund not because they are wealthy but because they believe.",
      "The title comes with weight. Ambassadors can embarrass their country. They can misrepresent. They can go off-message. Paul knew this — the same letter is full of passages about his own weakness, his thorn, his afflictions. But the weakness of the vessel is not the end of the story. \"The power,\" he writes in chapter four, \"belongs to God.\"",
      "At the Salvation Center we carry this identity into Randallstown, into Baltimore, into Ilorin, into Rosedale. Everywhere a member of this house goes, an ambassador is present. The question worth sitting with is not whether you hold the title — you do, by virtue of your new creation in Christ — but **whether you are conscious of it when you wake up in the morning.**",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
