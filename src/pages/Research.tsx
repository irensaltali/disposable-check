import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
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

    // Colors
    // Light: Indigo-600 (#4F46E5), Dark: Blue-400 (#60A5FA)
    const primaryColor = isDark ? '#60A5FA' : '#4F46E5';
    const primaryBg = isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(79, 70, 229, 0.1)';

    // Chart 1: Donut - List Composition

    const compositionData = {
        labels: ['Valid Corporate/Personal', 'Disposable (Temporary)', 'Spam Traps / Invalid'],
        datasets: [{
            data: [70, 25, 5],
            backgroundColor: [primaryColor, '#F43F5E', '#94A3B8'], // Primary, Rose, Slate
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
                labels: { padding: 20, usePointStyle: true }
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
                backgroundColor: '#06B6D4', // Cyan
                borderRadius: 4
            },
            {
                label: 'List with DEAs',
                data: [12.5, 14, 1.8],
                backgroundColor: '#F43F5E', // Rose
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
                title: { display: true, text: 'Percentage (%)' }
            }
        },
        plugins: {
            tooltip: commonTooltipConfig,
            legend: { position: 'top' as const }
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
            pointBackgroundColor: '#fff',
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
                title: { display: true, text: 'Sender Score' }
            }
        },
        plugins: {
            tooltip: commonTooltipConfig,
            annotation: {
                annotations: {
                    line1: {
                        type: 'line' as const,
                        yMin: 80,
                        yMax: 80,
                        borderColor: '#F43F5E',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: {
                            content: 'Safe Threshold',
                            display: true,
                            position: 'start' as const
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
                backgroundColor: '#94A3B8', // Slate-400
                barPercentage: 0.5
            },
            {
                label: 'Real-time API',
                data: [99, 95, 90],
                backgroundColor: '#22D3EE', // Cyan Bright
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
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#ccc' }
            },
            y: {
                grid: { display: false },
                ticks: { color: '#fff' }
            }
        },
        plugins: {
            tooltip: commonTooltipConfig,
            legend: {
                labels: { color: '#fff' }
            }
        }
    };

    return (
        <Layout>
            {/* Header / Hero */}
            <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        Research Report: Email Security
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">The Disposable Email Epidemic</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
                        Why "burn" addresses are silently draining marketing budgets, skewing analytics, and damaging sender reputation.
                    </p>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 gap-12 text-slate-800 dark:text-slate-200">

                {/* Section 1: Definition & Context */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 text-gray-800 dark:text-white">What is a Disposable Email?</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            A Disposable Email Address (DEA) is a temporary mailbox created instantly for a single purpose—usually to bypass registration requirements without revealing a real identity.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            While useful for user privacy, they are catastrophic for businesses. They self-destruct after a short period (10 minutes to a few days), leaving your database filled with "ghost" users who never engage, never buy, and bounce your future emails.
                        </p>
                    </div>

                    {/* Process Diagram */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                        <h3 className="text-center font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase text-sm tracking-wider">The Lifecycle of a Fake User</h3>
                        <div className="flex flex-col md:flex-row items-center justify-between text-center space-y-4 md:space-y-0">

                            <div className="flex flex-col items-center group">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-2xl mb-2 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                    ⚡
                                </div>
                                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Created</span>
                                <span className="text-xs text-gray-400">Instantly generated</span>
                            </div>

                            <ArrowRight className="hidden md:block w-6 h-6 text-gray-300" />
                            <ArrowDown className="md:hidden w-6 h-6 text-gray-300" />

                            <div className="flex flex-col items-center group">
                                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-300 flex items-center justify-center text-2xl mb-2 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                    🔓
                                </div>
                                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Used</span>
                                <span className="text-xs text-gray-400">Access content/trial</span>
                            </div>

                            <ArrowRight className="hidden md:block w-6 h-6 text-gray-300" />
                            <ArrowDown className="md:hidden w-6 h-6 text-gray-300" />

                            <div className="flex flex-col items-center group">
                                <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 flex items-center justify-center text-2xl mb-2 group-hover:bg-rose-600 dark:group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                    💣
                                </div>
                                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Destroyed</span>
                                <span className="text-xs text-gray-400">Bounces permanently</span>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Section 2: Data Composition */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border-t-8 border-cyan-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">The Invisible Clutter</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Research suggests that in unverified B2C signup lists, a significant portion of users employ DEAs. This distorts your understanding of your customer base. If 20% of your list is fake, your calculated conversion rates are artificially depressed, leading to incorrect strategic decisions.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg text-center">
                                    <span className="block text-3xl font-bold text-indigo-600 dark:text-indigo-400">~28%</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">B2C Abuse Rate</span>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg text-center">
                                    <span className="block text-3xl font-bold text-rose-500 dark:text-rose-400">0%</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">LTV of DEA User</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Container */}
                        <div className="flex flex-col justify-center items-center w-full">
                            <h3 className="text-center font-semibold text-gray-700 dark:text-gray-200 mb-4">Typical Unverified List Composition</h3>
                            <div className="w-full h-80 max-w-[500px]">
                                <Doughnut data={compositionData} options={compositionOptions} />
                            </div>
                            <p className="text-center text-xs text-gray-400 mt-4">Source: Aggregated Industry Data Simulations</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: The Consequences */}
                <section>
                    <div className="mb-8 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">The Cost of Inaction</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Accepting disposable emails isn't just about "dead leads." It actively harms your infrastructure. High bounce rates signal to Email Service Providers (Gmail, Outlook) that you are a spammer.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bar Chart Container */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Impact on Campaign Metrics</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Comparing clean lists vs. lists polluted with DEAs.</p>
                            </div>
                            <div className="h-80 w-full">
                                <Bar data={impactData} options={impactOptions} />
                            </div>
                        </div>

                        {/* Line Chart Container */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Sender Reputation Decay</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Sender score drops rapidly as hard bounce rates increase.</p>
                            </div>
                            <div className="h-80 w-full">
                                <Line data={reputationData} options={reputationOptions} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Key Risks Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow hover:shadow-lg transition-shadow border-l-4 border-rose-500">
                        <div className="text-4xl mb-4">💸</div>
                        <h3 className="font-bold text-lg mb-2 dark:text-white">Free Trial Abuse</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Users create infinite accounts to exploit "New User" coupons or free SaaS trials (Freemium abuse), driving up server costs with zero revenue.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow hover:shadow-lg transition-shadow border-l-4 border-indigo-500 dark:border-indigo-400">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="font-bold text-lg mb-2 dark:text-white">Skewed Analytics</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Marketing teams optimize for "signups" rather than "customers." DEAs inflate signup numbers, hiding the true acquisition cost (CAC).
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow hover:shadow-lg transition-shadow border-l-4 border-cyan-500">
                        <div className="text-4xl mb-4">🛡️</div>
                        <h3 className="font-bold text-lg mb-2 dark:text-white">Security Vulnerabilities</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Malicious actors use DEAs to hide their tracks while testing credit cards (carding), injecting scripts, or spamming your forums.
                        </p>
                    </div>
                </section>

                {/* Section 5: The Solution */}
                <section className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative circle */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-600 rounded-full opacity-20 filter blur-3xl"></div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Stop Them at the Gate</h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                The only effective defense is <strong>real-time detection</strong>. You must identify if an email domain belongs to a disposable provider <em>before</em> the user completes registration.
                            </p>
                            <p className="text-gray-300 mb-8">
                                Manual blacklists fail because hundreds of new disposable domains are created daily. You need an automated API that tracks these changes instantly.
                            </p>

                            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                                <h4 className="font-semibold text-cyan-400 mb-2 text-sm uppercase">Recommended Solution</h4>
                                <p className="text-white text-lg font-medium mb-4">
                                    DisposableCheck API
                                </p>
                                <p className="text-sm text-gray-400 mb-6">
                                    A robust, real-time API specifically designed to distinguish legitimate users from temporary bots.
                                </p>
                                <a href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-cyan-400 hover:bg-cyan-500 transition-colors">
                                    Try the Solution
                                    <span className="ml-2">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Solution Comparison Chart */}
                        <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                            <h3 className="text-center font-semibold text-gray-200 mb-4">Effectiveness: Static Lists vs. API</h3>
                            <div className="h-80 w-full">
                                <Bar data={solutionData} options={solutionOptions} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default Research;
