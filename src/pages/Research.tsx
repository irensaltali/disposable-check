import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Filler,
    TooltipItem
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { ArrowRight, ArrowDown } from "lucide-react";

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Filler,
    annotationPlugin
);

const researchArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is a Disposable Email and How Do You Detect It?",
    description: "A research-backed guide to disposable email abuse, sender reputation damage, and practical detection strategies.",
    mainEntityOfPage: "https://disposablecheck.com/the-disposable-email-epidemic",
    author: {
        "@type": "Organization",
        name: "DisposableCheck",
    },
    publisher: {
        "@type": "Organization",
        name: "DisposableCheck",
        logo: {
            "@type": "ImageObject",
            url: "https://disposablecheck.com/logo.png",
        },
    },
    image: "https://disposablecheck.com/og-image.png",
};

const researchFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How accurate is a disposable email checker?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Real-time MX and SMTP verification significantly improves accuracy compared with static blocklists.",
            },
        },
        {
            "@type": "Question",
            name: "Can I clean my existing list?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Bulk email checks can process historical CSV lists and identify disposable or invalid addresses.",
            },
        },
        {
            "@type": "Question",
            name: "Why isn't regex enough?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Regex validates format only. It cannot confirm mailbox reachability or whether a domain is temporary.",
            },
        },
        {
            "@type": "Question",
            name: "Does this help with sender reputation?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Blocking disposable and unreachable addresses lowers bounce rates and protects domain reputation.",
            },
        },
    ],
};

const Research = () => {
    // --- Utility: Label Wrapping Logic ---
    const wrapLabel = (str: string, maxChars: number) => {
        if (str.length <= maxChars) return str;
        const words = str.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            if (currentLine.length + 1 + words[i].length <= maxChars) {
                currentLine += ' ' + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
        return lines;
    };

    // --- Utility: Common Tooltip Configuration ---
    const commonTooltipConfig = {
        callbacks: {
            title: function (tooltipItems: TooltipItem<any>[]) {
                const item = tooltipItems[0];
                const label = item.chart.data.labels?.[item.dataIndex];
                if (Array.isArray(label)) {
                    return label.join(' ');
                } else {
                    return label as string;
                }
            }
        }
    };

    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () => {
            if (theme === "dark") return true;
            if (theme === "light") return false;
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        };
        setIsDark(checkDark());
    }, [theme]);

    // Consistent amber/orange color palette for charts
    // Light mode colors
    const primaryColor = isDark ? '#F59E0B' : '#D97706';      // Amber-500 / Amber-600
    const secondaryColor = isDark ? '#FBBF24' : '#F59E0B';   // Amber-400 / Amber-500
    const accentColor = isDark ? '#F97316' : '#EA580C';      // Orange-500 / Orange-600
    const mutedColor = isDark ? '#A1A1AA' : '#71717A';       // Zinc-400 / Zinc-500
    const dangerColor = isDark ? '#EF4444' : '#DC2626';      // Red-500 / Red-600
    const successColor = isDark ? '#22C55E' : '#16A34A';     // Green-500 / Green-600

    // Chart backgrounds with opacity
    const primaryBg = isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(217, 119, 6, 0.1)';

    // Chart 1: Donut - List Composition
    const compositionData = {
        labels: ['Valid Corporate/Personal', 'Disposable (Temporary)', 'Spam Traps / Invalid'],
        datasets: [{
            data: [70, 25, 5],
            backgroundColor: [primaryColor, dangerColor, mutedColor],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    const compositionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    color: isDark ? '#E4E4E7' : '#3F3F46'
                }
            },
            tooltip: commonTooltipConfig
        },
        cutout: '60%'
    };

    // Chart 2: Bar - Impact on Metrics
    const barLabels = [
        wrapLabel('Hard Bounce Rate', 16),
        wrapLabel('Open Rate', 16),
        wrapLabel('Click Through Rate', 16)
    ];

    const impactData = {
        labels: barLabels,
        datasets: [
            {
                label: 'Clean List',
                data: [1.2, 28, 4.5],
                backgroundColor: primaryColor,
                borderRadius: 4
            },
            {
                label: 'List with DEAs',
                data: [12.5, 14, 1.8],
                backgroundColor: dangerColor,
                borderRadius: 4
            }
        ]
    };

    const impactOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Percentage (%)',
                    color: isDark ? '#A1A1AA' : '#71717A'
                },
                ticks: {
                    color: isDark ? '#A1A1AA' : '#71717A'
                },
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                ticks: {
                    color: isDark ? '#A1A1AA' : '#71717A'
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            tooltip: commonTooltipConfig,
            legend: {
                position: 'top' as const,
                labels: {
                    color: isDark ? '#E4E4E7' : '#3F3F46'
                }
            }
        }
    };

    // Chart 3: Line - Reputation Decay
    const reputationData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
            label: 'Sender Score (0-100)',
            data: [98, 92, 85, 72, 60, 45],
            borderColor: primaryColor,
            backgroundColor: primaryBg,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: isDark ? '#27272A' : '#FFFFFF',
            pointBorderColor: primaryColor
        }]
    };

    const reputationOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                min: 40,
                max: 100,
                title: {
                    display: true,
                    text: 'Sender Score',
                    color: isDark ? '#A1A1AA' : '#71717A'
                },
                ticks: {
                    color: isDark ? '#A1A1AA' : '#71717A'
                },
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                ticks: {
                    color: isDark ? '#A1A1AA' : '#71717A'
                },
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                }
            }
        },
        plugins: {
            tooltip: commonTooltipConfig,
            legend: {
                labels: {
                    color: isDark ? '#E4E4E7' : '#3F3F46'
                }
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line' as const,
                        yMin: 80,
                        yMax: 80,
                        borderColor: dangerColor,
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: {
                            content: 'Safe Threshold',
                            display: true,
                            position: 'start' as const,
                            color: isDark ? '#E4E4E7' : '#3F3F46',
                            backgroundColor: isDark ? 'rgba(39, 39, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'
                        }
                    }
                }
            }
        }
    };

    // Chart 4: Horizontal Bar - Solution Comparison
    const solLabels = [
        wrapLabel('Detection Accuracy', 16),
        wrapLabel('Update Speed (New Domains)', 16),
        wrapLabel('Integration Ease', 16)
    ];

    const solutionData = {
        labels: solLabels,
        datasets: [
            {
                label: 'Static Blacklists',
                data: [60, 20, 50],
                backgroundColor: mutedColor,
                barPercentage: 0.5
            },
            {
                label: 'Real-time API',
                data: [99, 95, 90],
                backgroundColor: primaryColor,
                barPercentage: 0.5
            }
        ]
    };

    const solutionOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    color: isDark ? '#A1A1AA' : '#71717A'
                }
            },
            y: {
                grid: { display: false },
                ticks: {
                    color: isDark ? '#E4E4E7' : '#3F3F46'
                }
            }
        },
        plugins: {
            tooltip: commonTooltipConfig,
            legend: {
                labels: {
                    color: isDark ? '#E4E4E7' : '#3F3F46'
                }
            }
        }
    };

    return (
        <Layout>
            <SeoHead
                title="What Is a Disposable Email and How Do You Detect It? | DisposableCheck"
                description="Learn what disposable emails are, why they hurt sender reputation, and how to detect temporary addresses before signup."
                type="article"
                schema={[researchArticleSchema, researchFaqSchema]}
            />
            {/* Header / Hero - Updated to use amber gradient */}
            <header className="bg-primary-gradient dark:bg-primary-gradient-dark text-white py-12 sm:py-16 lg:py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        Research Report: Email Security
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight">
                        What Is a <span className="underline decoration-white/30 underline-offset-8">Disposable Email</span> and How Do You Detect It?
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed px-4">
                        Why &quot;burn&quot; addresses are silently draining marketing budgets, skewing analytics, and damaging sender reputation.
                    </p>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 lg:py-16 grid grid-cols-1 gap-8 sm:gap-12">

                {/* Section 1: Definition & Context */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 border-l-4 border-primary pl-4">
                            What is a Disposable Email?
                        </h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            A Disposable Email Address (DEA) is a temporary mailbox created instantly for a single purpose—usually to bypass registration requirements without revealing a real identity.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            While useful for user privacy, they are catastrophic for businesses. A <strong>temporary email detector</strong> is crucial because these emails self-destruct after a short period (10 minutes to a few days), leaving your database filled with &quot;ghost&quot; users who never engage, never buy, and bounce your future emails.
                        </p>
                    </div>

                    {/* Process Diagram */}
                    <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm border">
                        <h3 className="text-center font-bold text-muted-foreground mb-4 sm:mb-6 uppercase text-xs sm:text-sm tracking-wider">
                            The Lifecycle of a Fake User
                        </h3>
                        <div className="flex flex-col sm:flex-row items-center justify-between text-center space-y-4 sm:space-y-0">

                            <div className="flex flex-col items-center group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl sm:text-2xl mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    ⚡
                                </div>
                                <span className="font-semibold text-sm">Created</span>
                                <span className="text-xs text-muted-foreground">Instantly generated</span>
                            </div>

                            <ArrowRight className="hidden sm:block w-6 h-6 text-muted-foreground/50" />
                            <ArrowDown className="sm:hidden w-6 h-6 text-muted-foreground/50" />

                            <div className="flex flex-col items-center group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xl sm:text-2xl mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    🔓
                                </div>
                                <span className="font-semibold text-sm">Used</span>
                                <span className="text-xs text-muted-foreground">Access content/trial</span>
                            </div>

                            <ArrowRight className="hidden sm:block w-6 h-6 text-muted-foreground/50" />
                            <ArrowDown className="sm:hidden w-6 h-6 text-muted-foreground/50" />

                            <div className="flex flex-col items-center group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-xl sm:text-2xl mb-2 group-hover:bg-destructive group-hover:text-destructive-foreground transition-colors">
                                    💣
                                </div>
                                <span className="font-semibold text-sm">Destroyed</span>
                                <span className="text-xs text-muted-foreground">Bounces permanently</span>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Section 2: Data Composition */}
                <section className="bg-card rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 border-t-4 border-primary">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4">The Invisible Clutter</h2>
                            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                                Research suggests that in unverified B2C signup lists, a significant portion of users employ DEAs. This distorts your understanding of your customer base. If 20% of your list is fake, your calculated conversion rates are artificially depressed, leading to incorrect strategic decisions.
                            </p>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-muted p-3 sm:p-4 rounded-lg text-center">
                                    <span className="block text-2xl sm:text-3xl font-bold text-primary">~28%</span>
                                    <span className="text-xs text-muted-foreground uppercase font-semibold">B2C Abuse Rate</span>
                                </div>
                                <div className="bg-muted p-3 sm:p-4 rounded-lg text-center">
                                    <span className="block text-2xl sm:text-3xl font-bold text-destructive">0%</span>
                                    <span className="text-xs text-muted-foreground uppercase font-semibold">LTV of DEA User</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Container */}
                        <div className="flex flex-col justify-center items-center w-full">
                            <h3 className="text-center font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Typical Unverified List Composition</h3>
                            <div className="w-full h-64 sm:h-72 lg:h-80 max-w-[400px]">
                                <Doughnut data={compositionData} options={compositionOptions} />
                            </div>
                            <p className="text-center text-xs text-muted-foreground mt-3 sm:mt-4">Source: Aggregated Industry Data Simulations</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: The Consequences */}
                <section>
                    <div className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">The Cost of Inaction</h2>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Accepting disposable emails isn&apos;t just about &quot;dead leads.&quot; It actively harms your infrastructure. Failing to <strong>detect disposable emails</strong> leads to high bounce rates, signaling to Email Service Providers (Gmail, Outlook) that you are a spammer.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {/* Bar Chart Container */}
                        <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm border">
                            <div className="mb-3 sm:mb-4">
                                <h3 className="text-lg sm:text-xl font-bold">Impact on Campaign Metrics</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Comparing clean lists vs. lists polluted with DEAs.</p>
                            </div>
                            <div className="h-64 sm:h-72 lg:h-80 w-full">
                                <Bar data={impactData} options={impactOptions} />
                            </div>
                        </div>

                        {/* Line Chart Container */}
                        <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm border">
                            <div className="mb-3 sm:mb-4">
                                <h3 className="text-lg sm:text-xl font-bold">Sender Reputation Decay</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Sender score drops rapidly as hard bounce rates increase.</p>
                            </div>
                            <div className="h-64 sm:h-72 lg:h-80 w-full">
                                <Line data={reputationData} options={reputationOptions} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Key Risks Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Card 1 */}
                    <div className="bg-card p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-destructive">
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💸</div>
                        <h3 className="font-bold text-base sm:text-lg mb-2">Free Trial Abuse</h3>
                        <p className="text-sm text-muted-foreground">
                            Users create infinite accounts to exploit &quot;New User&quot; coupons or free SaaS trials (Freemium abuse), driving up server costs with zero revenue.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-card p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-primary">
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
                        <h3 className="font-bold text-base sm:text-lg mb-2">Skewed Analytics</h3>
                        <p className="text-sm text-muted-foreground">
                            Marketing teams optimize for &quot;signups&quot; rather than &quot;customers.&quot; DEAs inflate signup numbers, hiding the true acquisition cost (CAC).
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-card p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-accent sm:col-span-2 lg:col-span-1">
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🛡️</div>
                        <h3 className="font-bold text-base sm:text-lg mb-2">Security Vulnerabilities</h3>
                        <p className="text-sm text-muted-foreground">
                            Malicious actors use DEAs to hide their tracks while testing credit cards (carding), injecting scripts, or spamming your forums.
                        </p>
                    </div>
                </section>

                {/* Section 5: The Solution */}
                <section className="bg-card rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden border">
                    {/* Decorative circle */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 sm:w-64 sm:h-64 bg-primary/10 rounded-full opacity-50 filter blur-3xl"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Stop Them at the Gate</h2>
                            <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                The only effective defense is <strong className="text-foreground">real-time detection</strong>. You must identify if an email domain belongs to a disposable provider <em>before</em> the user completes registration.
                            </p>
                            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                                Manual blacklists fail because hundreds of new disposable domains are created daily. You need an automated API that tracks these changes instantly.
                            </p>

                            <div className="bg-muted p-4 sm:p-6 rounded-lg border">
                                <h4 className="font-semibold text-primary mb-2 text-xs sm:text-sm uppercase">Recommended Solution</h4>
                                <p className="text-foreground text-base sm:text-lg font-medium mb-3 sm:mb-4">
                                    DisposableCheck API
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                                    A robust, real-time API specifically designed to distinguish legitimate users from temporary bots.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    Try the Solution
                                    <span className="ml-2">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Solution Comparison Chart */}
                        <div className="bg-muted/50 p-4 sm:p-6 rounded-xl border">
                            <h3 className="text-center font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Effectiveness: Static Lists vs. API</h3>
                            <div className="h-64 sm:h-72 lg:h-80 w-full">
                                <Bar data={solutionData} options={solutionOptions} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-card rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12 border-t-4 border-secondary">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Common Questions About Email Security</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-2">How accurate is a disposable email checker?</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Modern APIs like DisposableCheck use real-time MX and SMTP verification to prevent false positives. This is far more accurate than static lists when you need to <strong>check disposable email address</strong> validity.
                            </p>
                            <h3 className="font-bold text-lg mb-2">Can I clean my existing list?</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Yes. The <Link to="/bulk" className="text-primary hover:underline font-medium">bulkcheck</Link> feature allows you to upload large CSV files and identify temporary addresses in your historical data.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Why isn't regex enough?</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Regex only checks formatting. It cannot <strong>detect disposable emails</strong> that use custom domains or look legitimate. Only a dedicated <strong>temp mail detector</strong> with deep network checks can catch these.
                            </p>
                            <h3 className="font-bold text-lg mb-2">Does this help with sender reputation?</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Absolutely. By blocking bounces before they happen, you protect your domain's health. Learn more about the <Link to="/value-proposition" className="text-primary hover:underline font-medium">value proposition</Link> of deep verification.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </Layout >
    );
};

export default Research;
