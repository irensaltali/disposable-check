export interface GlossarySection {
  heading: string;
  paragraphs: string[];
}

export interface GlossaryFaq {
  question: string;
  answer: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  title: string;
  description: string;
  h1: string;
  definition: string;
  sections: GlossarySection[];
  faq: GlossaryFaq[];
  relatedTerms: string[];
  relatedBlogSlugs: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "disposable-email",
    term: "Disposable Email",
    title: "What Is a Disposable Email? Definition & Detection Guide",
    description:
      "Learn what disposable emails are, why people use them, how they affect your business, and how to detect them before they damage signup quality.",
    h1: "What Is a Disposable Email?",
    definition:
      "A disposable email is a temporary, self-destructing email address created for short-term use. Services like Mailinator, Guerrilla Mail, and 10MinuteMail generate these addresses instantly, requiring no registration. The inbox typically expires after minutes or hours, making the address unreachable for any follow-up communication.",
    sections: [
      {
        heading: "Why people use disposable emails",
        paragraphs: [
          "Privacy is the most common motivation. Users who want to download a whitepaper, test a product, or access gated content without risking spam to their primary inbox turn to disposable addresses as a low-commitment alternative. In many cases the intent is not malicious — they simply do not trust the site with a permanent address yet.",
          "The second driver is abuse. Fraudsters use disposable emails to create multiple free-trial accounts, exploit referral programs, claim duplicate promotions, or bypass bans. Because the address costs nothing and requires no identity verification, it enables low-friction account cycling at scale.",
        ],
      },
      {
        heading: "How disposable emails affect your business",
        paragraphs: [
          "Every disposable address that enters your database is a dead end for lifecycle communication. Onboarding sequences, product announcements, and renewal reminders will never reach the person. Over time these unreachable contacts inflate list size, suppress engagement rates, and distort funnel metrics that marketing and product teams rely on for planning.",
          "Deliverability damage is subtler but more costly. When a large share of your outbound mail bounces or goes to abandoned inboxes, email service providers may downgrade your sender reputation, which means legitimate messages to real users also start landing in spam folders.",
        ],
      },
      {
        heading: "How to detect disposable emails",
        paragraphs: [
          "Detection typically works at the domain level. A disposable email checker maintains a continuously updated database of known temporary-mail provider domains and matches incoming addresses against it. More advanced systems also inspect MX records and SMTP responses to catch new providers that are not yet cataloged.",
          "The best approach layers detection into your signup flow with clear fallback rules: block obvious disposable domains, flag uncertain ones for review, and let verified domains through. You can try this workflow with the [checker](/) or automate it through the [API](/docs).",
        ],
      },
    ],
    faq: [
      {
        question: "Is using a disposable email illegal?",
        answer:
          "No. Disposable email use is legal. However, using one to commit fraud, bypass terms of service, or create fake accounts may violate laws or platform policies depending on the jurisdiction and context.",
      },
      {
        question: "How many disposable email providers exist?",
        answer:
          "Thousands. New providers appear regularly, which is why static blocklists lose accuracy over time and continuously updated detection services provide better coverage.",
      },
      {
        question: "Can disposable emails receive replies?",
        answer:
          "Most can receive mail for a short window, but the inbox expires, so any message sent after that window bounces or is lost. Some providers allow replies during the active period.",
      },
    ],
    relatedTerms: ["throwaway-email", "temporary-email", "burner-email", "email-validation"],
    relatedBlogSlugs: ["check-email-disposability", "temporary-email-detector"],
  },
  {
    slug: "email-verification",
    term: "Email Verification",
    title: "What Is Email Verification? How It Works & Why It Matters",
    description:
      "Understand email verification — the process of confirming an email address is real, properly formatted, and capable of receiving mail before you send to it.",
    h1: "What Is Email Verification?",
    definition:
      "Email verification is the process of confirming that an email address exists, is correctly formatted, and can receive messages. It typically involves syntax checks, domain and MX record validation, and sometimes SMTP-level handshake probing to determine whether the mailbox is live without actually sending a message.",
    sections: [
      {
        heading: "The layers of email verification",
        paragraphs: [
          "Syntax validation is the first layer. It checks whether the address follows RFC 5322 format rules — a local part, an @ symbol, and a valid domain. This catches typos like missing dots or double @ signs but cannot tell you whether the address actually works.",
          "Domain and MX record verification is the second layer. The system queries DNS to confirm the domain exists and has mail exchange records configured to accept mail. A domain without MX records cannot receive email regardless of how valid the address looks.",
          "SMTP verification is the deepest layer. The system opens a connection to the mail server and simulates the beginning of a mail delivery without completing it. The server's response reveals whether the specific mailbox exists. This catches addresses where the domain is valid but the individual mailbox has been deleted or never existed.",
        ],
      },
      {
        heading: "Why email verification matters for senders",
        paragraphs: [
          "Hard bounces from invalid addresses directly damage your sender reputation. Email service providers track bounce rates, and once yours crosses their threshold, your sending IP or domain may be throttled or blocked. That affects deliverability for every message you send, not just the ones to bad addresses.",
          "Verification also protects revenue. Transactional emails — order confirmations, password resets, onboarding flows — fail silently when the address is wrong. The user blames your product, not their typo. Catching these at the point of entry prevents support tickets and lost conversions.",
        ],
      },
      {
        heading: "Email verification vs. disposable email detection",
        paragraphs: [
          "Verification confirms the address can receive mail. Disposable email detection determines whether the address is meant to last. A disposable address from Mailinator will pass verification — the domain has MX records and the mailbox temporarily exists — but it will expire within hours. That is why both checks are complementary, not interchangeable.",
          "Teams that only verify format and deliverability still let temporary addresses through. Adding a [disposable email check](/) catches the addresses that are technically valid but practically worthless for ongoing communication.",
        ],
      },
    ],
    faq: [
      {
        question: "Does email verification send a message to the address?",
        answer:
          "No. SMTP verification simulates the start of a delivery but disconnects before actually sending anything. The recipient never sees a message.",
      },
      {
        question: "Can email verification catch all invalid addresses?",
        answer:
          "Not always. Catch-all domains accept mail for any address, so the server will report the mailbox as valid even if it does not exist. Additional signals like domain reputation help in these cases.",
      },
      {
        question: "How often should I verify my email list?",
        answer:
          "At minimum before every major campaign. Addresses decay at roughly 2-3% per month as people change jobs, abandon accounts, or switch providers.",
      },
    ],
    relatedTerms: ["email-validation", "smtp-verification", "mx-record", "email-bounce"],
    relatedBlogSlugs: ["check-email-disposability", "disposable-email-detection-api"],
  },
  {
    slug: "mx-record",
    term: "MX Record",
    title: "What Is an MX Record? Mail Exchange Records Explained",
    description:
      "Learn what MX records are, how they route email to the correct mail server, and why they matter for email verification and disposable email detection.",
    h1: "What Is an MX Record?",
    definition:
      "An MX (Mail Exchange) record is a type of DNS record that specifies which mail servers are responsible for accepting email on behalf of a domain. When someone sends an email to user@example.com, the sending server looks up the MX records for example.com to find out where to deliver the message.",
    sections: [
      {
        heading: "How MX records work",
        paragraphs: [
          "MX records are stored in a domain's DNS zone file alongside A records, CNAME records, and other DNS entries. Each MX record contains two pieces of information: a priority value and a hostname of a mail server. Lower priority numbers indicate higher preference, so when multiple MX records exist, the sending server tries the lowest-priority server first and falls back to others if it is unavailable.",
          "For example, a domain might have an MX record pointing to mail.example.com with priority 10 and a backup record pointing to backup-mail.example.com with priority 20. This ensures mail delivery continues even if the primary server goes down.",
        ],
      },
      {
        heading: "MX records in email verification and disposable detection",
        paragraphs: [
          "MX record lookup is a core step in email verification. If a domain has no MX records, it cannot receive email, which means any address at that domain is automatically invalid. This catches domains that were registered but never configured for mail, as well as typo domains that do not exist.",
          "In disposable email detection, MX records provide an additional signal. Many disposable email providers share a small set of mail servers across dozens of domains. Recognizing these shared MX patterns helps detection systems identify new disposable domains even before they appear on known-provider lists. The [DisposableCheck API](/docs) uses MX analysis as one layer in its detection pipeline.",
        ],
      },
      {
        heading: "Common MX record issues",
        paragraphs: [
          "Misconfigured MX records cause silent mail loss. If the hostname in an MX record does not resolve to a valid IP address, or if the mail server at that IP is not running, inbound mail will bounce after the sending server exhausts its retry window. Organizations that migrate mail providers sometimes forget to update their MX records, which causes days of lost mail before anyone notices.",
          "Another common issue is missing MX records entirely. Some domain owners set up a website but never configure mail, yet users still try to email addresses at that domain. Verification systems catch this immediately through MX lookup.",
        ],
      },
    ],
    faq: [
      {
        question: "Can a domain work without MX records?",
        answer:
          "Technically, RFC 5321 allows fallback to the domain's A record if no MX records exist, but most modern mail systems require explicit MX records for reliable delivery.",
      },
      {
        question: "How do I check a domain's MX records?",
        answer:
          "You can use command-line tools like `dig example.com MX` or `nslookup -type=mx example.com`, or use an online DNS lookup tool to see the results in a browser.",
      },
      {
        question: "Do MX records affect email sending or only receiving?",
        answer:
          "MX records only control where inbound mail is delivered. Outbound sending is handled by the sending server's configuration, SPF records, and DKIM signatures.",
      },
    ],
    relatedTerms: ["smtp-verification", "email-verification", "spf-record", "dkim", "domain-reputation"],
    relatedBlogSlugs: ["disposable-email-detection-api"],
  },
  {
    slug: "smtp-verification",
    term: "SMTP Verification",
    title: "What Is SMTP Verification? Mailbox-Level Email Checking",
    description:
      "Understand SMTP verification — the technique that checks whether a specific mailbox exists by communicating directly with the recipient's mail server.",
    h1: "What Is SMTP Verification?",
    definition:
      "SMTP verification is a technique that checks whether a specific email mailbox exists by initiating a partial conversation with the recipient's mail server using the Simple Mail Transfer Protocol. The verifier connects to the server, issues EHLO, MAIL FROM, and RCPT TO commands, then disconnects before actually delivering a message. The server's response to the RCPT TO command reveals whether the mailbox is valid.",
    sections: [
      {
        heading: "How the SMTP handshake works for verification",
        paragraphs: [
          "The process begins with a TCP connection to the mail server identified by the domain's MX records. The verifier sends an EHLO command to introduce itself, followed by a MAIL FROM command with a sender address (often a null sender). Then it sends RCPT TO with the address being verified. If the server responds with a 250 status code, the mailbox exists. A 550 response means the mailbox does not exist or is not accepting mail.",
          "The verifier then sends QUIT to close the connection cleanly. No actual email is delivered — the conversation stops before the DATA command that would transmit a message body. This makes SMTP verification non-intrusive while still providing mailbox-level confirmation.",
        ],
      },
      {
        heading: "Limitations of SMTP verification",
        paragraphs: [
          "Catch-all servers accept mail for any address at the domain, returning 250 for every RCPT TO regardless of whether the specific mailbox exists. This makes SMTP verification unreliable for catch-all domains, which include many corporate mail systems configured to prevent information leakage about valid employee addresses.",
          "Greylisting is another obstacle. Some servers temporarily reject the first delivery attempt from unknown senders, returning a 4xx temporary error. A verifier that does not retry will incorrectly classify the address as undeliverable. Rate limiting by mail servers can also block or throttle verification attempts if too many checks are sent in a short window.",
        ],
      },
      {
        heading: "SMTP verification and disposable email detection",
        paragraphs: [
          "SMTP verification alone cannot distinguish a disposable email from a legitimate one. A temporary inbox at a disposable provider will respond with 250 during its active window, appearing perfectly valid. The address only becomes unreachable after the provider deletes the inbox, which may be minutes or hours later.",
          "That is why effective email quality workflows combine SMTP verification with domain-level disposable detection. The [DisposableCheck deep verification](/) uses both: it confirms the mailbox currently exists via SMTP and flags whether the domain is a known disposable provider.",
        ],
      },
    ],
    faq: [
      {
        question: "Does SMTP verification trigger spam filters?",
        answer:
          "Typically no, because no message body is sent. However, sending a high volume of verification requests to one server may be interpreted as reconnaissance and result in IP blocking.",
      },
      {
        question: "Is SMTP verification accurate for Gmail or Outlook addresses?",
        answer:
          "Large providers like Gmail and Outlook often respond with 250 for any address to prevent mailbox enumeration, making SMTP verification less reliable for these domains.",
      },
      {
        question: "How fast is SMTP verification?",
        answer:
          "A single check usually completes in 1-5 seconds, depending on the target server's response time. It is slower than syntax or MX checks because it requires a live network connection.",
      },
    ],
    relatedTerms: ["email-verification", "mx-record", "catch-all-email", "email-bounce"],
    relatedBlogSlugs: ["check-email-disposability", "check-disposable-email-address"],
  },
  {
    slug: "email-deliverability",
    term: "Email Deliverability",
    title: "What Is Email Deliverability? Inbox Placement Explained",
    description:
      "Learn what email deliverability means, what factors determine whether your messages reach the inbox, and how disposable emails hurt your sender reputation.",
    h1: "What Is Email Deliverability?",
    definition:
      "Email deliverability is the measure of how successfully your outbound emails reach recipients' inboxes rather than being filtered to spam, bounced, or silently dropped. It depends on sender reputation, authentication, content quality, list hygiene, and the receiving server's filtering policies.",
    sections: [
      {
        heading: "What determines email deliverability",
        paragraphs: [
          "Sender reputation is the strongest factor. Email service providers (ESPs) assign a reputation score to your sending IP and domain based on bounce rates, spam complaints, engagement patterns, and sending consistency. A high bounce rate from invalid or disposable addresses is one of the fastest ways to damage that score.",
          "Authentication records — SPF, DKIM, and DMARC — prove to receiving servers that your messages are legitimately from your domain and have not been tampered with in transit. Missing or misconfigured authentication is a common cause of inbox placement failures, especially with providers like Gmail and Microsoft that enforce strict checking.",
          "List quality ties everything together. A clean list with verified, engaged recipients generates positive signals. A list contaminated with disposable emails, role addresses, and abandoned mailboxes generates bounces and low engagement that erode reputation over time.",
        ],
      },
      {
        heading: "How disposable emails damage deliverability",
        paragraphs: [
          "Disposable addresses create a delayed-action problem. They pass validation at signup because the mailbox temporarily exists, but when you send an onboarding sequence or campaign days later, the address bounces. Those hard bounces accumulate and push your bounce rate above the thresholds that ESPs use to flag senders.",
          "The engagement damage is equally harmful. Disposable addresses never open, click, or reply. ESPs factor engagement into inbox placement decisions, so a large share of zero-engagement contacts drags down your overall metrics and makes it harder for messages to real users to reach the inbox.",
        ],
      },
      {
        heading: "Protecting deliverability with disposable detection",
        paragraphs: [
          "Blocking disposable addresses at the point of entry is the most effective protection. By checking each address against a disposable email database before it enters your system, you prevent the bounces and engagement holes that would otherwise accumulate. The [checker](/) does this in real time, and the [API](/docs) lets you build it into your signup flow.",
          "For existing lists, running a [bulk check](/bulk) identifies disposable and unreachable addresses so you can suppress them before your next campaign. This is especially important after list imports, migrations, or long periods without sends.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a good email deliverability rate?",
        answer:
          "Above 95% inbox placement is generally considered healthy. Below 90% indicates reputation or list quality issues that need immediate attention.",
      },
      {
        question: "How long does it take to recover from deliverability damage?",
        answer:
          "Recovery typically takes 2-4 weeks of consistent clean sending. Severe damage from blocklisting may take longer and may require direct remediation with ESPs.",
      },
      {
        question: "Does disposable email detection improve deliverability directly?",
        answer:
          "Yes. By preventing bounces and zero-engagement contacts from entering your list, you maintain the sender reputation metrics that ESPs use to determine inbox placement.",
      },
    ],
    relatedTerms: ["email-bounce", "spf-record", "dkim", "domain-reputation", "email-hygiene"],
    relatedBlogSlugs: ["check-email-disposability", "rate-limiting-as-an-anti-spam-tool"],
  },
  {
    slug: "catch-all-email",
    term: "Catch-All Email",
    title: "What Is a Catch-All Email? Wildcard Mail Configuration Explained",
    description:
      "Learn what catch-all email configuration means, why organizations use it, and how it complicates email verification and disposable detection.",
    h1: "What Is a Catch-All Email?",
    definition:
      "A catch-all email configuration (also called a wildcard or accept-all configuration) tells a mail server to accept messages sent to any address at a domain, regardless of whether a specific mailbox exists. Mail sent to typo@example.com, random@example.com, or anything-else@example.com all lands in a designated catch-all inbox.",
    sections: [
      {
        heading: "Why organizations use catch-all configurations",
        paragraphs: [
          "The primary reason is to prevent missed messages. Companies where customers may guess or mistype employee addresses — like sending to john@company.com when the actual address is john.smith@company.com — use catch-all to ensure nothing gets lost. A human or automated system reviews the catch-all inbox and routes messages to the right person.",
          "Some organizations also use it as a security measure to prevent mailbox enumeration. When a server accepts all addresses, an attacker cannot determine which employee email addresses are valid by checking SMTP responses. This makes social engineering and phishing target lists harder to build.",
        ],
      },
      {
        heading: "How catch-all affects email verification",
        paragraphs: [
          "Catch-all configurations make SMTP verification unreliable. During the RCPT TO step, the server returns a 250 OK for every address, so the verifier cannot distinguish between a real employee mailbox and a completely made-up address. The verification passes, but the address may still be undeliverable in practice if the catch-all inbox is unmonitored or routes to /dev/null.",
          "This is why verification tools report catch-all status as a separate signal rather than a simple valid/invalid answer. The [deep verification](/) feature in DisposableCheck flags catch-all domains so you can apply different business rules to those addresses instead of treating them the same as confirmed mailboxes.",
        ],
      },
      {
        heading: "Catch-all domains and disposable email detection",
        paragraphs: [
          "Some disposable email providers use catch-all configurations to create the illusion that every randomly generated address is valid. This is different from the corporate catch-all use case — the intent is to make automated creation of temporary addresses as seamless as possible.",
          "Detection systems handle this by looking beyond the SMTP response. Domain reputation, provider history, and MX record patterns help distinguish a legitimate corporate catch-all from a disposable provider's catch-all. This multi-signal approach is more reliable than any single check.",
        ],
      },
    ],
    faq: [
      {
        question: "Is a catch-all email address less trustworthy?",
        answer:
          "Not inherently. Many legitimate businesses use catch-all. However, you cannot confirm the specific mailbox exists, so verification confidence is lower than for a server that explicitly confirms the address.",
      },
      {
        question: "Should I block all emails from catch-all domains?",
        answer:
          "No. Blocking catch-all domains would reject addresses from many legitimate companies. Instead, treat catch-all as a risk signal and apply additional verification like domain reputation checking.",
      },
      {
        question: "How can I tell if a domain is catch-all?",
        answer:
          "Send an SMTP RCPT TO request for a deliberately invalid address at the domain. If the server accepts it, the domain is configured as catch-all. The DisposableCheck deep verification reports this automatically.",
      },
    ],
    relatedTerms: ["smtp-verification", "email-verification", "domain-reputation", "email-validation"],
    relatedBlogSlugs: ["check-disposable-email-address"],
  },
  {
    slug: "email-bounce",
    term: "Email Bounce",
    title: "What Is an Email Bounce? Hard vs. Soft Bounces Explained",
    description:
      "Understand email bounces — what causes them, the difference between hard and soft bounces, and how they relate to disposable email addresses.",
    h1: "What Is an Email Bounce?",
    definition:
      "An email bounce occurs when a message you send cannot be delivered to the recipient's mailbox and is returned to the sender. The receiving mail server generates a bounce notification (also called a Non-Delivery Report or NDR) explaining why delivery failed. Bounces are classified as hard (permanent failure) or soft (temporary failure).",
    sections: [
      {
        heading: "Hard bounces vs. soft bounces",
        paragraphs: [
          "A hard bounce means the address is permanently undeliverable. Common causes include a mailbox that does not exist, a domain with no mail servers, or a server that explicitly rejects the recipient. Hard bounces should be immediately removed from your list because repeated attempts damage sender reputation.",
          "A soft bounce indicates a temporary delivery failure. The mailbox may be full, the server may be temporarily unavailable, or the message may exceed size limits. Email systems typically retry soft bounces for 24-72 hours before treating them as permanent failures. Occasional soft bounces are normal, but consistently soft-bouncing addresses should be investigated.",
        ],
      },
      {
        heading: "How disposable emails cause bounces",
        paragraphs: [
          "Disposable emails create a specific type of delayed hard bounce. At signup, the address is valid — the temporary inbox exists and would accept mail. Hours or days later, the provider deletes the inbox. Your first onboarding email, welcome sequence, or campaign then hard bounces because the mailbox no longer exists.",
          "This pattern is particularly damaging because it is invisible at the point of collection. Format validation passes, MX checks pass, and even SMTP verification confirms the mailbox during its active window. Only a disposable email detection layer catches these addresses before they enter your database and later cause bounces.",
        ],
      },
      {
        heading: "Managing bounce rates to protect deliverability",
        paragraphs: [
          "Email service providers recommend keeping hard bounce rates below 2%. Above that threshold, ESPs may throttle your sending, flag your domain, or suspend your account. Since disposable addresses often represent a concentrated source of bounces, detecting and filtering them has an outsized impact on keeping bounce rates healthy.",
          "Process hard bounces immediately by removing or suppressing the address. Monitor soft bounce patterns to identify addresses or domains that consistently fail. And prevent future bounces by validating addresses at entry with a [disposable email check](/) and verification through the [API](/docs).",
        ],
      },
    ],
    faq: [
      {
        question: "What bounce rate is considered dangerous?",
        answer:
          "Most ESPs consider a hard bounce rate above 2% problematic. Above 5% is a serious deliverability risk that may trigger sending restrictions.",
      },
      {
        question: "Do bounces from disposable emails look different?",
        answer:
          "Not in the bounce message itself. They appear as standard hard bounces with mailbox-not-found errors. The difference is that the address was valid at collection time and became invalid later.",
      },
      {
        question: "Can I re-send to a soft-bounced address?",
        answer:
          "Yes, most email systems automatically retry soft bounces. If the address continues to soft bounce across multiple campaigns, treat it as a hard bounce and suppress it.",
      },
    ],
    relatedTerms: ["email-deliverability", "email-verification", "email-hygiene", "smtp-verification"],
    relatedBlogSlugs: ["check-email-disposability"],
  },
  {
    slug: "throwaway-email",
    term: "Throwaway Email",
    title: "What Is a Throwaway Email? Disposable Address Variants Explained",
    description:
      "Understand throwaway emails, how they differ from other temporary address types, and how to detect them in your signup and lead capture forms.",
    h1: "What Is a Throwaway Email?",
    definition:
      "A throwaway email is an email address created for one-time or short-term use with no intention of maintaining it. The term is used interchangeably with disposable email, though throwaway more specifically implies a single-use context — the person uses it once for a specific purpose and never checks it again.",
    sections: [
      {
        heading: "Throwaway emails vs. other temporary address types",
        paragraphs: [
          "Throwaway emails overlap with disposable emails but the intent is narrower. A disposable email might be used for a few days during a product trial. A throwaway email is typically used for a single transaction — filling out one form, accessing one download, or completing one registration — and then abandoned entirely.",
          "Alias-based throwaway patterns are also common. Services like Gmail allow users to add a +tag to their address (user+junk@gmail.com), creating an effective throwaway that still routes to their real inbox. These are harder to detect because the underlying mailbox is legitimate, but the tag pattern can signal low-commitment intent.",
        ],
      },
      {
        heading: "Why throwaway emails matter for data quality",
        paragraphs: [
          "Each throwaway address in your database represents a contact you cannot reach. Unlike a real address that might go stale over months, a throwaway is dead from the moment it is created. This means your contact list inflates without a corresponding increase in reachable audience, and every metric built on list size — from open rates to cost per lead — becomes less accurate.",
          "For teams that pay per contact in their CRM or email platform, throwaway addresses are also a direct cost. If 5% of your signups are throwaway addresses and you are on a tier-based pricing plan, you are paying for contacts that will never generate revenue.",
        ],
      },
      {
        heading: "Detecting throwaway emails in practice",
        paragraphs: [
          "Domain-level detection catches the majority of throwaway addresses because most come from known throwaway email providers. The [disposable email checker](/) maintains a continuously updated list of these providers and flags matches instantly.",
          "For alias-based throwaway patterns, you can normalize addresses by stripping +tags and dots (for Gmail) before storing them. This helps deduplicate accounts and identify users who are creating multiple signups with variations of the same address. Combining normalization with disposable detection covers both provider-based and alias-based throwaway patterns.",
        ],
      },
    ],
    faq: [
      {
        question: "Are throwaway emails the same as disposable emails?",
        answer:
          "They overlap significantly. Throwaway implies single-use intent, while disposable describes the technical characteristic of the provider. In practice, both terms refer to addresses that will not support ongoing communication.",
      },
      {
        question: "Can I detect Gmail alias throwaway patterns?",
        answer:
          "You can normalize Gmail addresses by removing +tags and dots to identify duplicates, but the underlying address is legitimate. Blocking all aliases would reject valid Gmail users.",
      },
      {
        question: "What should I do when I detect a throwaway email?",
        answer:
          "Ask for an alternative address rather than silently rejecting. A clear message explaining that disposable addresses are not accepted preserves the conversion opportunity for users willing to provide a permanent email.",
      },
    ],
    relatedTerms: ["disposable-email", "temporary-email", "burner-email", "email-hygiene"],
    relatedBlogSlugs: ["check-email-disposability", "temporary-email-detector"],
  },
  {
    slug: "email-validation",
    term: "Email Validation",
    title: "What Is Email Validation? Format, Syntax & Beyond",
    description:
      "Learn what email validation covers, from basic syntax checks to deep mailbox probing, and how it fits alongside disposable email detection.",
    h1: "What Is Email Validation?",
    definition:
      "Email validation is the process of checking whether an email address meets formatting standards and is likely to accept mail. It ranges from basic syntax checks (does the address have an @ symbol and a valid domain?) to deeper inspections including DNS lookup, MX record verification, and SMTP mailbox probing.",
    sections: [
      {
        heading: "Levels of email validation",
        paragraphs: [
          "Syntax validation is the first and fastest level. It checks the address against email format rules: a local part of acceptable characters, an @ separator, and a domain with at least one dot. This catches obvious typos and malformed input but tells you nothing about whether the address actually works.",
          "DNS and MX validation adds a second layer by confirming the domain exists and has mail servers configured. This catches addresses with fake, misspelled, or unregistered domains. It is fast — a DNS query typically completes in milliseconds — and significantly improves accuracy over syntax-only checks.",
          "Mailbox validation via SMTP probing is the deepest level. It contacts the mail server to check if the specific address exists. This catches cases where the domain is valid but the individual mailbox has been deleted. Combined with the earlier layers, it provides the most complete picture of whether an address can receive mail.",
        ],
      },
      {
        heading: "What email validation does not catch",
        paragraphs: [
          "Standard validation does not distinguish between permanent and temporary addresses. A fresh disposable email will pass all three validation levels because the domain exists, MX records are configured, and the mailbox is temporarily active. This is the gap that disposable email detection fills.",
          "Validation also cannot determine engagement likelihood. A real, verified address belonging to someone who will never open your emails is technically valid but practically useless. That is a list quality problem that validation alone cannot solve.",
        ],
      },
      {
        heading: "Combining validation with disposable detection",
        paragraphs: [
          "The strongest signup forms run validation and disposable detection together. Validation ensures the address is technically sound. Disposable detection ensures it belongs to a provider that supports ongoing communication. Together they reject both malformed addresses and technically valid but temporary ones.",
          "You can see both layers working together in the [DisposableCheck tool](/) — it validates the email format, checks MX records, and identifies disposable domains in a single pass. For programmatic use, the [API](/docs) returns all signals in one response.",
        ],
      },
    ],
    faq: [
      {
        question: "Is email validation the same as email verification?",
        answer:
          "The terms are often used interchangeably. When a distinction is made, validation usually refers to format and syntax checks, while verification includes deeper mailbox-level confirmation via SMTP.",
      },
      {
        question: "Should I validate emails on the client or server side?",
        answer:
          "Both. Client-side validation gives instant feedback on typos. Server-side validation with MX and SMTP checks catches addresses that look correct but cannot receive mail. Never rely on client-side alone.",
      },
      {
        question: "What percentage of form submissions have invalid emails?",
        answer:
          "Studies suggest 8-15% of email form submissions contain typos or intentionally fake addresses, depending on the form type and whether incentives are involved.",
      },
    ],
    relatedTerms: ["email-verification", "smtp-verification", "mx-record", "disposable-email"],
    relatedBlogSlugs: ["check-email-disposability", "check-disposable-email-address"],
  },
  {
    slug: "temporary-email",
    term: "Temporary Email",
    title: "What Is a Temporary Email? How Temp Mail Services Work",
    description:
      "Understand how temporary email services work, why they exist, and how to prevent them from degrading your signup quality and email deliverability.",
    h1: "What Is a Temporary Email?",
    definition:
      "A temporary email (also called temp mail) is an email address provided by a service that creates short-lived inboxes accessible without registration. The address works for a set duration — typically 10 minutes to 24 hours — then the inbox and all received messages are permanently deleted.",
    sections: [
      {
        heading: "How temporary email services work",
        paragraphs: [
          "Temporary email services operate a pool of domains with catch-all mail servers. When a user visits the service, it generates a random address at one of its domains and displays the inbox in the browser. Any mail sent to that address appears in real time. When the timer expires or the user closes the page, the inbox is destroyed.",
          "Some services let users choose custom local parts or extend the inbox duration. Others offer API access so developers can programmatically create and read temporary inboxes for testing. The common thread is that none of these addresses are intended for ongoing communication.",
        ],
      },
      {
        heading: "The scale of temporary email usage",
        paragraphs: [
          "Temporary email services handle millions of addresses daily. Popular providers like Guerrilla Mail, Temp-Mail, and 10MinuteMail each serve hundreds of thousands of users per day. The total number of temporary email domains across all providers numbers in the thousands, with new ones appearing regularly as providers add domains to evade detection.",
          "This scale means any business with a public signup form will encounter temporary emails. The question is not whether they appear in your data but whether you detect them before they affect your metrics, deliverability, and customer communications.",
        ],
      },
      {
        heading: "Detecting and handling temporary emails",
        paragraphs: [
          "Detection works primarily through domain intelligence. Services like [DisposableCheck](/) maintain continuously updated databases of known temporary email domains. When an address is submitted, the domain is checked against this database. Advanced detection also examines MX records, domain age, and provider patterns to catch newly created temporary email domains.",
          "The recommended handling is to ask users for a permanent address rather than silently rejecting them. A clear, friendly message explaining that temporary addresses are not supported preserves the conversion opportunity while keeping your data clean. For automated workflows, the [API](/docs) returns the detection result so your application can implement whatever policy fits your business context.",
        ],
      },
    ],
    faq: [
      {
        question: "How long do temporary emails last?",
        answer:
          "Most services offer 10 minutes to 1 hour by default, with some allowing extensions up to 24 hours. After expiration, the inbox and all messages are permanently deleted.",
      },
      {
        question: "Can I send mail to a temporary email address?",
        answer:
          "Yes, during the active window. The message will arrive and be visible to whoever has the inbox open. After expiration, the address bounces.",
      },
      {
        question: "Are temporary emails different from email aliases?",
        answer:
          "Yes. Email aliases (like Gmail's +tag feature) route to a real, permanent mailbox. Temporary emails route to a self-destructing inbox with no permanent identity behind it.",
      },
    ],
    relatedTerms: ["disposable-email", "throwaway-email", "burner-email", "email-hygiene"],
    relatedBlogSlugs: ["temporary-email-detector", "check-email-disposability"],
  },
  {
    slug: "domain-reputation",
    term: "Domain Reputation",
    title: "What Is Domain Reputation? Email Sender Scoring Explained",
    description:
      "Learn what domain reputation is, how email providers score your sending domain, and how disposable emails in your list can damage it.",
    h1: "What Is Domain Reputation?",
    definition:
      "Domain reputation is a score that email service providers assign to your sending domain based on your email sending history, bounce rates, spam complaints, engagement patterns, and authentication configuration. It determines whether your messages reach the inbox, land in spam, or get blocked entirely.",
    sections: [
      {
        heading: "How domain reputation is calculated",
        paragraphs: [
          "Email providers like Gmail, Microsoft, and Yahoo each maintain their own reputation models, but they evaluate similar signals. Bounce rate is a primary factor — a high percentage of undeliverable addresses suggests the sender does not maintain a clean list. Spam complaint rate matters equally — if recipients frequently mark your messages as spam, your domain's reputation drops.",
          "Engagement signals increasingly influence reputation. Providers track whether recipients open, click, reply to, or delete your messages. A domain that consistently generates engagement gets preferential inbox placement, while one whose messages are ignored or deleted trends toward spam classification.",
        ],
      },
      {
        heading: "How disposable emails damage domain reputation",
        paragraphs: [
          "Disposable addresses create two reputation problems simultaneously. First, they generate hard bounces when the temporary inbox expires, directly increasing your bounce rate. Second, during the brief window when the inbox exists, messages go unopened and unengaged, pulling down your engagement metrics.",
          "The damage compounds over time. If disposable signups represent even a small percentage of your list, the accumulated bounces and zero-engagement contacts steadily erode your domain reputation. Once your reputation drops below provider thresholds, even messages to legitimate, engaged recipients start landing in spam.",
        ],
      },
      {
        heading: "Protecting your domain reputation",
        paragraphs: [
          "Prevention is far easier than recovery. Filtering disposable addresses at signup with a [real-time check](/) stops the root cause before it enters your system. For existing lists, a [bulk cleanup](/bulk) removes addresses that are already damaging your metrics.",
          "Authentication is the other essential layer. Properly configured SPF, DKIM, and DMARC records prove your domain's legitimacy and protect against spoofing that could damage your reputation through no fault of your own. Combined with list hygiene, authentication forms a complete reputation defense.",
        ],
      },
    ],
    faq: [
      {
        question: "How can I check my domain's reputation?",
        answer:
          "Google Postmaster Tools shows your domain's reputation with Gmail. Microsoft SNDS provides similar data for Outlook. Third-party tools like Sender Score offer cross-provider estimates.",
      },
      {
        question: "How long does it take to build domain reputation?",
        answer:
          "New domains should warm up gradually over 2-4 weeks, starting with small volumes to engaged recipients. Established domains maintain reputation through consistent clean sending practices.",
      },
      {
        question: "Can one bad campaign ruin my domain reputation?",
        answer:
          "A single campaign to an uncleaned list can cause significant damage if it generates a spike in bounces or spam complaints. Recovery from a sudden reputation drop typically takes 2-4 weeks of disciplined sending.",
      },
    ],
    relatedTerms: ["email-deliverability", "spf-record", "dkim", "email-hygiene", "email-bounce"],
    relatedBlogSlugs: ["check-email-disposability", "rate-limiting-as-an-anti-spam-tool"],
  },
  {
    slug: "email-hygiene",
    term: "Email Hygiene",
    title: "What Is Email Hygiene? List Cleaning Best Practices",
    description:
      "Learn what email hygiene means, why regular list cleaning matters, and how removing disposable and invalid addresses protects your sender reputation.",
    h1: "What Is Email Hygiene?",
    definition:
      "Email hygiene is the practice of regularly cleaning and maintaining your email contact lists to remove invalid, unreachable, and low-quality addresses. It encompasses removing hard bounces, identifying disposable and temporary addresses, suppressing unengaged contacts, and correcting common typos to keep your list healthy and your sender reputation intact.",
    sections: [
      {
        heading: "Why email hygiene matters",
        paragraphs: [
          "Email lists degrade naturally. People change jobs, abandon old accounts, and switch providers. Industry estimates suggest 2-3% of email addresses become invalid every month. Without regular cleaning, a list that was accurate six months ago may now contain 15-20% undeliverable addresses — enough to trigger reputation damage with major email providers.",
          "The cost of poor hygiene goes beyond deliverability. Marketing teams make spending decisions based on list size and engagement rates. If a significant portion of the list is unreachable, cost-per-lead calculations, campaign ROI, and attribution models all produce misleading numbers that compound into larger planning errors.",
        ],
      },
      {
        heading: "Core email hygiene practices",
        paragraphs: [
          "Bounce management is the foundation. Process hard bounce notifications immediately and remove those addresses from all active lists. Track soft bounces over time and suppress addresses that consistently fail.",
          "Disposable email removal targets addresses that were never meant for ongoing communication. Running your list through a [disposable email checker](/bulk) identifies temporary addresses that may not have bounced yet but will never support engagement. This is especially important after importing lists from lead generation partners or event registrations.",
          "Engagement-based suppression removes contacts who have received multiple campaigns without opening or clicking. While these addresses may still be technically valid, continuing to mail unengaged contacts signals to providers that your content is not wanted, which hurts inbox placement for everyone on your list.",
        ],
      },
      {
        heading: "Building email hygiene into your workflow",
        paragraphs: [
          "The most effective approach validates at entry and cleans on a schedule. New addresses should pass a [disposable email check](/) and format validation before entering your database. Existing lists should be cleaned quarterly at minimum — or before every major campaign — using [bulk checking](/bulk) to catch addresses that have gone stale since the last clean.",
          "Automating hygiene through the [API](/docs) removes the manual overhead. When your CRM or marketing platform can programmatically validate addresses on import, you prevent bad data from entering the system in the first place rather than cleaning up after the damage is done.",
        ],
      },
    ],
    faq: [
      {
        question: "How often should I clean my email list?",
        answer:
          "At minimum quarterly and before every major campaign. High-volume senders or teams with active lead generation should clean monthly. Always clean imported or purchased lists before the first send.",
      },
      {
        question: "What percentage of my list is probably bad?",
        answer:
          "A typical list degrades 2-3% per month. If you have not cleaned in six months, expect 10-20% of addresses to be undeliverable. Lists from lead gen partners or events may have higher rates.",
      },
      {
        question: "Does email hygiene improve open rates?",
        answer:
          "Yes, significantly. Removing undeliverable and unengaged addresses from your denominator immediately improves open and click rates, and the deliverability improvement means more messages actually reach the inbox.",
      },
    ],
    relatedTerms: ["email-deliverability", "email-bounce", "email-verification", "domain-reputation"],
    relatedBlogSlugs: ["check-email-disposability", "check-disposable-email-address"],
  },
  {
    slug: "burner-email",
    term: "Burner Email",
    title: "What Is a Burner Email? One-Time Address Detection",
    description:
      "Learn what burner emails are, how they differ from other disposable types, and how to detect them to protect your signups and data quality.",
    h1: "What Is a Burner Email?",
    definition:
      "A burner email is a single-use email address created specifically to be discarded after one interaction. The term borrows from \"burner phone\" — a prepaid phone used briefly and then thrown away. Burner emails are a subset of disposable emails, distinguished by their explicitly one-time intent.",
    sections: [
      {
        heading: "How burner emails are created",
        paragraphs: [
          "Dedicated burner email services generate an address instantly with no registration. The user copies the address, pastes it into whatever form requires an email, receives the confirmation or content they need, and never returns. Unlike some disposable email services that maintain an inbox for hours, burner email services are optimized for the fastest possible use-and-discard cycle.",
          "Browser extensions and mobile apps have made burner emails even more accessible. Some tools generate a unique burner address for every site the user visits, automatically filling it into signup forms. The user may never even see the burner address — the tool handles creation, form filling, and forwarding any needed content in the background.",
        ],
      },
      {
        heading: "Burner emails in the context of abuse",
        paragraphs: [
          "The one-time nature of burner emails makes them a preferred tool for specific abuse patterns. Free-trial cycling — where someone creates multiple accounts to extend a trial indefinitely — relies on a fresh email for each signup. Referral fraud works similarly: each fake referral needs a unique address. Burner emails provide both cheaply and instantly.",
          "For businesses, the cost of burner email abuse is concrete. Each fake trial consumes infrastructure resources. Each fraudulent referral pays out a reward for a non-existent user. Each duplicate account skews your user metrics and may trigger pricing tier thresholds in your SaaS tools based on inflated user counts.",
        ],
      },
      {
        heading: "Detecting burner emails",
        paragraphs: [
          "Burner emails are detected through the same domain-intelligence approach as other disposable types. The [DisposableCheck service](/) maintains an updated database of known burner and disposable email provider domains. Since burner services typically operate multiple domains and rotate them when they get widely blocked, continuous database updates are essential for maintaining detection accuracy.",
          "For programmatic detection, the [API](/docs) returns a disposable flag that covers both burner and longer-lived temporary addresses. The distinction between burner and disposable is useful for understanding user intent, but from a detection standpoint, both should be caught at the same validation layer.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between a burner email and a disposable email?",
        answer:
          "A burner email is a type of disposable email with an explicitly single-use intent. All burner emails are disposable, but not all disposable emails are burner — some temporary inboxes last hours or days and may be checked multiple times.",
      },
      {
        question: "Can burner emails be traced?",
        answer:
          "Generally no. Burner email services do not require registration and most do not log user IP addresses. This anonymity is part of their design and a reason they are popular for abuse.",
      },
      {
        question: "How do I block burner emails on my signup form?",
        answer:
          "Add a disposable email check at the point of entry. The [DisposableCheck API](/docs) identifies burner and disposable domains in real time so your form can prompt users for a permanent address.",
      },
    ],
    relatedTerms: ["disposable-email", "throwaway-email", "temporary-email", "email-hygiene"],
    relatedBlogSlugs: ["check-email-disposability", "temporary-email-detector"],
  },
  {
    slug: "spf-record",
    term: "SPF Record",
    title: "What Is an SPF Record? Sender Policy Framework Explained",
    description:
      "Learn what SPF records are, how they authenticate email senders, and why they matter for email deliverability and domain reputation.",
    h1: "What Is an SPF Record?",
    definition:
      "An SPF (Sender Policy Framework) record is a DNS TXT record that specifies which mail servers are authorized to send email on behalf of your domain. When a receiving server gets a message claiming to be from your domain, it checks your SPF record to verify the sending server is on the authorized list. Messages from unauthorized servers can be flagged, quarantined, or rejected.",
    sections: [
      {
        heading: "How SPF authentication works",
        paragraphs: [
          "When your server sends an email, the receiving server extracts the domain from the MAIL FROM (envelope sender) address and queries DNS for that domain's SPF record. The SPF record contains a list of IP addresses, IP ranges, and included domains that are allowed to send for you.",
          "The receiving server checks whether the sending server's IP appears in that list. If it matches, the SPF check passes. If it does not match, the result is either a soft fail (~all) or a hard fail (-all), depending on your SPF record's policy. Most properly configured domains use -all to indicate that any server not in the list is definitely not authorized.",
        ],
      },
      {
        heading: "Why SPF matters for deliverability",
        paragraphs: [
          "Without SPF, anyone can send email that appears to come from your domain. Spammers and phishers exploit this to send malicious messages using your brand, which generates spam complaints and blocks against your domain even though you never sent the messages. SPF prevents this by giving receiving servers a way to verify legitimacy.",
          "SPF is also a prerequisite for DMARC, which combines SPF and DKIM results to provide a complete authentication policy. Major providers like Gmail and Yahoo now require SPF and DMARC for bulk senders. Domains without these records face increasingly aggressive filtering.",
        ],
      },
      {
        heading: "SPF in the context of disposable email detection",
        paragraphs: [
          "SPF records can be a signal in disposable email analysis. Legitimate email providers typically have well-configured SPF records that list their mail infrastructure. Some disposable providers have minimal or missing SPF configuration because they are not concerned about outbound reputation — they primarily receive rather than send.",
          "However, SPF alone is not a reliable disposable indicator. Many disposable providers do configure SPF properly, and some legitimate small providers have incomplete setups. SPF is most useful as one data point within a broader domain analysis that includes MX records, domain age, and provider reputation databases.",
        ],
      },
    ],
    faq: [
      {
        question: "What happens if I do not have an SPF record?",
        answer:
          "Without an SPF record, receiving servers cannot verify your authorized senders. Your messages are more likely to be filtered to spam, and your domain is vulnerable to spoofing.",
      },
      {
        question: "Can I have multiple SPF records?",
        answer:
          "No. A domain must have exactly one SPF record. Multiple SPF records cause authentication failures. If you need to authorize multiple services, combine them into a single record using include mechanisms.",
      },
      {
        question: "What does the 10 DNS lookup limit mean?",
        answer:
          "SPF evaluation allows a maximum of 10 DNS lookups (include, a, mx, redirect mechanisms). Exceeding this limit causes a permanent error (permerror), which means SPF authentication fails for all your mail.",
      },
    ],
    relatedTerms: ["dkim", "domain-reputation", "email-deliverability", "mx-record"],
    relatedBlogSlugs: ["rate-limiting-as-an-anti-spam-tool"],
  },
  {
    slug: "dkim",
    term: "DKIM",
    title: "What Is DKIM? DomainKeys Identified Mail Explained",
    description:
      "Understand DKIM — the email authentication method that uses cryptographic signatures to verify messages have not been altered in transit.",
    h1: "What Is DKIM?",
    definition:
      "DKIM (DomainKeys Identified Mail) is an email authentication method that attaches a cryptographic signature to outgoing messages. The sending server signs specified headers and the message body with a private key, and the corresponding public key is published in the sending domain's DNS. Receiving servers use this public key to verify the signature, confirming the message was sent by an authorized server and was not modified in transit.",
    sections: [
      {
        heading: "How DKIM signing and verification works",
        paragraphs: [
          "When your mail server sends a message, DKIM selects specific headers (typically From, To, Subject, Date, and the body hash) and generates a cryptographic hash. This hash is signed with your domain's private key and added as a DKIM-Signature header in the outgoing message.",
          "The receiving server extracts the DKIM-Signature, retrieves your public key from DNS using the selector and domain specified in the signature, and independently recalculates the hash. If the calculated hash matches the signed hash, the message is verified as authentic and unmodified. Any change to the signed headers or body — even adding a single character — causes verification to fail.",
        ],
      },
      {
        heading: "DKIM and email deliverability",
        paragraphs: [
          "DKIM is one of three pillars of email authentication alongside SPF and DMARC. Together they prove that a message is from who it claims to be from (SPF verifies the sending server, DKIM verifies the message integrity, and DMARC aligns them with a policy). Email providers increasingly use all three signals to make inbox placement decisions.",
          "DKIM provides protection that SPF cannot. SPF verifies the sending server's IP at the network level, but DKIM protects the message content through cryptography. This means DKIM still works when mail is forwarded through intermediate servers that would break SPF alignment. For businesses concerned with deliverability, implementing both provides the strongest authentication posture.",
        ],
      },
      {
        heading: "DKIM in disposable email context",
        paragraphs: [
          "Like SPF, DKIM configuration can serve as a minor signal in domain analysis. Well-established email providers publish DKIM keys and sign their outbound mail. Some disposable email providers skip DKIM entirely because their users are receiving, not sending, and the operational overhead of signing outbound messages is unnecessary for their use case.",
          "However, DKIM presence or absence is not a reliable disposable detection signal on its own. Detection systems like [DisposableCheck](/) use dedicated domain-reputation databases and MX analysis rather than relying on authentication records, which are more relevant to sender verification than provider classification.",
        ],
      },
    ],
    faq: [
      {
        question: "Does DKIM encrypt my emails?",
        answer:
          "No. DKIM signs a hash of the message for integrity verification, but the message content remains in plain text. For encryption in transit, TLS is used. For end-to-end encryption, S/MIME or PGP is needed.",
      },
      {
        question: "What is a DKIM selector?",
        answer:
          "A selector is a label that identifies which DKIM key to use for verification. It allows a domain to have multiple active DKIM keys, which is useful when rotating keys or using different keys for different mail systems.",
      },
      {
        question: "Can DKIM fail even if I configured it correctly?",
        answer:
          "Yes. Mailing list software, forwarding services, or security gateways that modify message headers or body content can break DKIM signatures. This is one reason DMARC policies should account for both SPF and DKIM alignment.",
      },
    ],
    relatedTerms: ["spf-record", "domain-reputation", "email-deliverability", "email-verification"],
    relatedBlogSlugs: ["rate-limiting-as-an-anti-spam-tool"],
  },
];

export const glossaryTermBySlug = glossaryTerms.reduce<Record<string, GlossaryTerm>>(
  (acc, term) => {
    acc[term.slug] = term;
    return acc;
  },
  {},
);

export const glossaryRouteLabels = glossaryTerms.reduce<Record<string, string>>(
  (acc, term) => {
    acc[`/glossary/${term.slug}`] = term.term;
    return acc;
  },
  { "/glossary": "Email Security Glossary" },
);

export const glossarySitemapRoutes = [
  "/glossary",
  ...glossaryTerms.map((term) => `/glossary/${term.slug}`),
];
