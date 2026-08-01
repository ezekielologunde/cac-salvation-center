import { SITE, SITE_URL, CACNA_URL, CAC_CONVENTION_URL, CAC_WORLDWIDE_URL } from "@/lib/site";
import { specialEvents, splitByDate } from "@/lib/events";

export const revalidate = 3600;

function formatUpcomingEvent(ev: { title: string; dateLabel: string }): string {
  return `- ${ev.title} — ${ev.dateLabel}`;
}

export async function GET() {
  const { upcoming } = splitByDate(specialEvents);
  const upcomingLines = upcoming.slice(0, 5).map(formatUpcomingEvent).join("\n");
  const fullAddress = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

  const body = `# ${SITE.name}

> ${SITE.description}

## About
- Full name: ${SITE.name} (${SITE.shortName})
- Location: ${fullAddress}, USA
- Superintendent: Pastor Dr. Hezekiah O. Ilufoye, PhD (Baltimore DCC Superintendent)
- Parent assembly: CAC Salvation Centre, Ilorin, Kwara State, Nigeria (established July 6, 1997)
- Languages: English, Yoruba

## Service times (Eastern Time)
- Sunday Worship: 10:30 AM (Sunday School 9:25 AM)
- Wednesday Bible Study: 7:00 PM
- Friday Service: 7:00 PM
- Daily Prayer Line: 5:00 AM

## Key pages
- [Home](${SITE_URL}/)
- [About](${SITE_URL}/about): Church history and mission
- [Plan a Visit](${SITE_URL}/visit)
- [Watch Online / Live Stream](${SITE_URL}/online)
- [Giving](${SITE_URL}/giving)
- [Prayer Requests](${SITE_URL}/prayer)
- [Ministries & Groups](${SITE_URL}/ministries)
- [Events](${SITE_URL}/events)
- [Leadership](${SITE_URL}/leadership)
- [Resources & Store](${SITE_URL}/store): Books, sermon series, and digital resources
- [Salvation City (sister assembly)](${SITE_URL}/salvationcity)
- [Ilorin parent assembly](https://ilorin.cacsalvationcenter.org/)

## Sister assembly
- Name: CAC Salvation City
- Location: 8330 Pulaski Hwy Suite F, Rosedale, MD 21237, USA
- [Salvation City page](${SITE_URL}/salvationcity)

## CAC family
This assembly is a member church of Christ Apostolic Church North America (CACNA), the regional body governing CAC assemblies across the United States, Canada, and South America. This church's own Superintendent, Pastor Dr. Hezekiah O. Ilufoye, PhD, also serves as CACNA's Baltimore DCC Superintendent.
- [CAC North America (CACNA)](${CACNA_URL}): the regional body — leadership, zones/DCCs, ministries, and the wider CAC North America family.
- [CACNA Annual Convention](${CAC_CONVENTION_URL}): the yearly national gathering of every CACNA member church.
- [CAC Worldwide](${CAC_WORLDWIDE_URL}): the global Christ Apostolic Church denomination, headquartered in Nigeria.

## Upcoming events
${upcomingLines || "- See " + SITE_URL + "/events for the current schedule."}

## Contact
- Phone / WhatsApp: ${SITE.telephone}
- Email: ${SITE.email}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
